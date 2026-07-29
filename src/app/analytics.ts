// Fires the waitlist-signup conversion on Meta, TikTok and GA4.
// Each call is guarded: if a pixel ID is blank in index.html the tag never
// loaded, so the global is undefined and that platform is skipped.
export function trackWaitlistSignup(campaign?: string, creative?: string) {
  const label = [campaign, creative].filter(Boolean).join(' / ') || 'direct';

  try {
    (window as any).fbq?.('track', 'Lead', { content_name: label });
  } catch {}

  try {
    (window as any).ttq?.track?.('CompleteRegistration', { content_name: label });
  } catch {}

  try {
    (window as any).gtag?.('event', 'sign_up', {
      method: 'waitlist',
      campaign,
      creative,
    });
  } catch {}
}
