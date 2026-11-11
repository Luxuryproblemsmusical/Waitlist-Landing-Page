// Fires the waitlist-signup conversion on Meta, TikTok and GA4.
// Each call is guarded: if a pixel ID is blank in index.html the tag never
// loaded, so the global is undefined and that platform is skipped.

// One ID per signup, shared by the browser Pixel and the server-side
// Conversions API call (api/subscribe.js) so Meta counts the lead once.
export function newEventId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

function cookie(name: string): string {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : '';
}

// The Pixel's browser and click IDs, passed to the server so Meta can match
// the server event to the same person and ad click.
export function metaBrowserIds() {
  let fbc = cookie('_fbc');
  if (!fbc) {
    const fbclid = new URLSearchParams(window.location.search).get('fbclid');
    if (fbclid) fbc = `fb.1.${Date.now()}.${fbclid}`;
  }
  return { fbp: cookie('_fbp'), fbc, event_source_url: window.location.href };
}

export function trackWaitlistSignup(campaign?: string, creative?: string, eventId?: string) {
  const label = [campaign, creative].filter(Boolean).join(' / ') || 'direct';

  try {
    (window as any).fbq?.('track', 'Lead', { content_name: label }, eventId ? { eventID: eventId } : undefined);
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
