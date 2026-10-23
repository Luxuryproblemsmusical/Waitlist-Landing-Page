import { trackWaitlistSignup } from './analytics';
import { getAttribution } from './attribution';

/**
 * Adds an email to the GALOP Shopify store as a customer subscribed to email
 * marketing (see api/subscribe.js), then fires the signup pixels. `source`
 * labels where on the site the signup happened and `plan` records which
 * subscription plan the visitor had selected; both become customer tags next
 * to the UTM ones, so launch emails can be tailored. `honeypot` is the hidden
 * galop_hp field, which only bots fill in.
 */
export async function joinWaitlist(
  email: string,
  opts: { source: string; plan?: string; honeypot?: string }
) {
  const attribution = getAttribution();
  const res = await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      galop_hp: opts.honeypot ?? '',
      source: opts.source,
      plan: opts.plan ?? '',
      ...attribution,
    }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Something went wrong. Please try again.');
  }
  trackWaitlistSignup(attribution.utm_campaign ?? opts.source, attribution.utm_content ?? opts.plan);
}
