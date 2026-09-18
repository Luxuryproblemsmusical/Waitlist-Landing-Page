import { trackWaitlistSignup } from './analytics';
import { getAttribution } from './attribution';

const KLAVIYO_PUBLIC_KEY = 'XchVzP';
const KLAVIYO_LIST_ID = 'WNWyrF';

/**
 * Adds an email to the GALOP Klaviyo waitlist and fires the signup pixels.
 * `source` labels where on the site the signup happened (overridden by paid
 * UTM attribution when present); `plan` records which subscription plan the
 * visitor had selected, so launch emails can be tailored.
 */
export async function joinWaitlist(email: string, opts: { source: string; plan?: string }) {
  const attribution = getAttribution();
  const fields: Record<string, string> = {
    $source: attribution.utm_source ? `${attribution.utm_source} / paid` : opts.source,
    preferred_plan: opts.plan ?? '',
    utm_source: attribution.utm_source ?? '',
    utm_medium: attribution.utm_medium ?? '',
    utm_campaign: attribution.utm_campaign ?? '',
    utm_content: attribution.utm_content ?? '',
  };
  const body = new URLSearchParams({
    g: KLAVIYO_LIST_ID,
    email,
    $fields: Object.keys(fields).join(','),
    ...fields,
  });
  await fetch(
    `https://manage.kmail-lists.com/subscriptions/subscribe?a=${KLAVIYO_PUBLIC_KEY}&g=${KLAVIYO_LIST_ID}`,
    {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    }
  );
  trackWaitlistSignup(attribution.utm_campaign ?? opts.source, attribution.utm_content ?? opts.plan);
}
