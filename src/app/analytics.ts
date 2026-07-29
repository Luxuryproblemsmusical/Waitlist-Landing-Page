// Fires the waitlist-signup conversion on Meta, TikTok and GA4.
// Each call is guarded: if a pixel ID is blank in index.html the tag never
// loaded, so the global is undefined and that platform is skipped.
export function trackWaitlistSignup() {
  try {
    (window as any).fbq?.('track', 'Lead');
  } catch {}

  try {
    (window as any).ttq?.track?.('CompleteRegistration');
  } catch {}

  try {
    (window as any).gtag?.('event', 'sign_up', { method: 'waitlist' });
  } catch {}
}
