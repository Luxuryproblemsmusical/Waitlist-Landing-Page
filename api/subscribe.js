// Waitlist signups → Shopify customers subscribed to email marketing, so the
// list lives in Shopify and launch emails go out from Shopify Messaging.
//
// Vercel env vars (Production + Preview):
//   SHOPIFY_STORE          the store's myshopify domain, e.g. galop-1234.myshopify.com
//   SHOPIFY_CLIENT_ID      from the Dev Dashboard app (scopes: read_customers, write_customers)
//   SHOPIFY_CLIENT_SECRET

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

const ADD_ADDRESS = `mutation ($id: ID!, $address: MailingAddressInput!) {
  customerAddressCreate(customerId: $id, address: $address, setAsDefault: true) { userErrors { field message } }
}`;

// Approximate location from Vercel's IP geolocation headers, saved as the new
// customer's address so it shows in Shopify's Location column. Province codes
// only where Vercel's region codes match Shopify's (US states, Canadian provinces).
function location(request) {
  const header = (name) => request.headers.get(name) || '';
  const countryCode = header('x-vercel-ip-country').toUpperCase();
  if (!/^[A-Z]{2}$/.test(countryCode)) return null;
  const address = { countryCode };
  try {
    const city = decodeURIComponent(header('x-vercel-ip-city')).trim();
    if (city) address.city = city.slice(0, 100);
  } catch {}
  const region = header('x-vercel-ip-country-region').toUpperCase();
  if ((countryCode === 'US' || countryCode === 'CA') && /^[A-Z]{2}$/.test(region)) address.provinceCode = region;
  return address;
}

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
      const address = location(request);
      const joined = new Date().toLocaleDateString('en-US', { timeZone: 'America/New_York', month: 'short', day: 'numeric', year: 'numeric' });
      const { customerCreate } = await shopify(CREATE, {
        input: {
          email,
          tags,
          note: `Joined the GALOP waitlist on ${joined}.` + (address ? ' Location is approximate.' : ''),
          emailMarketingConsent: { marketingState: 'SUBSCRIBED', marketingOptInLevel: 'SINGLE_OPT_IN' },
        },
      });
      // Best effort: the signup already counts even if the location can't be saved.
      if (address) {
        try {
          await shopify(ADD_ADDRESS, { id: customerCreate.customer.id, address });
        } catch (err) {
          console.error('Waitlist signup: location not saved:', err);
        }
      }
    }
    return reply(200, { ok: true });
  } catch (err) {
    console.error('Waitlist signup failed:', err);
    return reply(502, { error: "We couldn't add you just now. Please try again." });
  }
}
