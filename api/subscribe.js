// Waitlist signups → Shopify customers subscribed to email marketing, so the
// list lives in Shopify and launch emails go out from Shopify Messaging.
//
// Vercel env vars (Production + Preview):
//   SHOPIFY_STORE          the store's myshopify domain, e.g. galop-1234.myshopify.com
//   SHOPIFY_CLIENT_ID      from the Dev Dashboard app (scopes: read_customers, write_customers)
//   SHOPIFY_CLIENT_SECRET
//
// Meta Conversions API (Production only; optional — skipped if unset):
//   META_PIXEL_ID          2104256736870821 ("Galop Pixel")
//   META_CAPI_TOKEN        Events Manager → Galop Pixel → Settings → Conversions API → Generate access token
//   META_TEST_EVENT_CODE   optional, from Events Manager → Test events, to check events arrive

import { createHash } from 'node:crypto';

const API_VERSION = '2026-07';
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

const FIND = `query ($email: String!) {
  customer: customerByIdentifier(identifier: { emailAddress: $email }) { id }
}`;

const CREATE = `mutation ($input: CustomerInput!) {
  customerCreate(input: $input) { customer { id } userErrors { field message } }
}`;

// Someone already in Shopify (a past buyer, or signing up twice): opt them back
// in and add the new tags without touching their existing ones.
const RESUBSCRIBE = `mutation ($id: ID!, $at: DateTime!, $tags: [String!]!) {
  customerEmailMarketingConsentUpdate(input: {
    customerId: $id
    emailMarketingConsent: { marketingState: SUBSCRIBED, marketingOptInLevel: SINGLE_OPT_IN, consentUpdatedAt: $at }
  }) { userErrors { field message } }
  tagsAdd(id: $id, tags: $tags) { userErrors { field message } }
}`;

// Tolerate the store pasted as a URL ("https://galop-1234.myshopify.com/").
const store = () => process.env.SHOPIFY_STORE.trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '');

// Client-credentials tokens last 24h; reuse one while the function stays warm.
let token = null;

async function accessToken() {
  if (token && token.expiresAt - Date.now() > 60_000) return token.value;
  const res = await fetch(`https://${store()}/admin/oauth/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.SHOPIFY_CLIENT_ID,
      client_secret: process.env.SHOPIFY_CLIENT_SECRET,
    }),
  });
  if (!res.ok) throw new Error(`Token request failed: ${res.status} ${await res.text()}`);
  const { access_token, expires_in } = await res.json();
  token = { value: access_token, expiresAt: Date.now() + expires_in * 1000 };
  return token.value;
}

async function shopify(query, variables) {
  const res = await fetch(`https://${store()}/admin/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': await accessToken() },
    body: JSON.stringify({ query, variables }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || body.errors) throw new Error(`Admin API ${res.status}: ${JSON.stringify(body.errors ?? body)}`);
  for (const result of Object.values(body.data ?? {})) {
    if (result?.userErrors?.length) throw new Error(`Admin API userErrors: ${JSON.stringify(result.userErrors)}`);
  }
  return body.data;
}

const reply = (status, data) => Response.json(data, { status });

const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const clean = (value, max = 500) => String(value ?? '').trim().slice(0, max);

// Sends the signup to Meta from the server as a Lead, with the same event_id
// the browser Pixel used, so Meta deduplicates and counts it once. Catches
// signups the browser Pixel misses (ad blockers, iOS privacy). Never blocks or
// fails the signup itself.
async function sendMetaLead(request, body, email) {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_TOKEN;
  // Only the live site: preview deploys would otherwise report test signups.
  if (!pixelId || !accessToken || process.env.VERCEL_ENV !== 'production') return;

  const ip = clean(request.headers.get('x-forwarded-for')).split(',')[0].trim();
  const userData = { em: [sha256(email)] };
  if (ip) userData.client_ip_address = ip;
  const ua = clean(request.headers.get('user-agent'));
  if (ua) userData.client_user_agent = ua;
  if (body.fbp) userData.fbp = clean(body.fbp, 200);
  if (body.fbc) userData.fbc = clean(body.fbc, 500);

  const event = {
    event_name: 'Lead',
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website',
    event_source_url: clean(body.event_source_url, 1000) || 'https://www.galoplife.com/',
    user_data: userData,
    custom_data: {
      content_name: [body.utm_campaign, body.utm_content].map((v) => clean(v, 100)).filter(Boolean).join(' / ') || 'direct',
    },
  };
  const eventId = clean(body.event_id, 100);
  if (eventId) event.event_id = eventId;

  const payload = { data: [event] };
  if (process.env.META_TEST_EVENT_CODE) payload.test_event_code = process.env.META_TEST_EVENT_CODE;

  try {
    const res = await fetch(`https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) console.error('Meta CAPI error:', res.status, await res.text());
  } catch (err) {
    console.error('Meta CAPI request failed:', err);
  }
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return reply(400, { error: 'Something went wrong. Please try again.' });
  }

  // Honeypot: the field is invisible to people, so only bots fill it in.
  if (body.galop_hp) return reply(200, { ok: true });

  const email = String(body.email ?? '').trim().toLowerCase();
  if (email.length > 254 || !EMAIL.test(email)) {
    return reply(400, { error: 'Please enter a valid email address.' });
  }

  // Tags carry the campaign/creative into Shopify, e.g. "utm_campaign:fall-launch".
  const tags = ['waitlist'];
  for (const key of UTM_KEYS) {
    const value = String(body[key] ?? '').replace(/[\s,]+/g, ' ').trim().slice(0, 100);
    if (value) tags.push(`${key}:${value}`);
  }

  if (!process.env.SHOPIFY_STORE || !process.env.SHOPIFY_CLIENT_ID || !process.env.SHOPIFY_CLIENT_SECRET) {
    console.error('Waitlist signup: Shopify env vars are not set');
    return reply(500, { error: "We couldn't add you just now. Please try again." });
  }

  try {
    const { customer } = await shopify(FIND, { email });
    if (customer) {
      await shopify(RESUBSCRIBE, { id: customer.id, at: new Date().toISOString(), tags });
    } else {
      await shopify(CREATE, {
        input: {
          email,
          tags,
          emailMarketingConsent: { marketingState: 'SUBSCRIBED', marketingOptInLevel: 'SINGLE_OPT_IN' },
        },
      });
    }
    await sendMetaLead(request, body, email);
    return reply(200, { ok: true });
  } catch (err) {
    console.error('Waitlist signup failed:', err);
    return reply(502, { error: "We couldn't add you just now. Please try again." });
  }
}
