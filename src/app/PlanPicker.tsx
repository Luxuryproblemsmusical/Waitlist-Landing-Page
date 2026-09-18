import { useState } from 'react';
import { RED } from './Layout';
import { joinWaitlist } from './waitlist';

export type Plan = 'monthly' | 'onetime';

/**
 * Checkout is a placeholder until the Shopify store exists. Paste the real
 * checkout links here and the CTA flips from waitlist capture to checkout.
 */
export const CHECKOUT_URLS: Record<Plan, string | null> = {
  monthly: null, // TODO: Shopify selling-plan checkout link
  onetime: null, // TODO: Shopify one-time checkout link
};

const PLANS: { id: Plan; name: string; badge?: string; blurb: string; bullets: string[] }[] = [
  {
    id: 'monthly',
    name: 'The Monthly Ritual',
    badge: 'Most popular',
    blurb: '30 stick packs, delivered every month',
    bullets: [
      'Founding-member pricing, locked for life',
      'Pause, skip, or cancel anytime',
      'Free shipping',
      'First deliveries December',
    ],
  },
  {
    id: 'onetime',
    name: 'Single Pouch',
    blurb: '30 stick packs, one-time delivery',
    bullets: [
      'Try a full month, no commitment',
      'Launch pricing announced in December',
    ],
  },
];

const ctaStyle = {
  background: RED,
  color: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 700,
  fontSize: '0.95rem',
  letterSpacing: '0.18em',
  textTransform: 'uppercase' as const,
  border: 'none',
  borderRadius: '9999px',
  padding: '18px 36px',
  cursor: 'pointer',
  whiteSpace: 'nowrap' as const,
  textDecoration: 'none',
};

/** Subscribe & Save plan cards plus the pre-launch email capture. */
export function PlanPicker({ source }: { source: string }) {
  const [plan, setPlan] = useState<Plan>('monthly');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;
    setError('');
    setIsSubmitting(true);
    try {
      await joinWaitlist(email, { source, plan });
      setIsSubmitted(true);
      setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const checkoutUrl = CHECKOUT_URLS[plan];

  return (
    <div className="max-w-xl mx-auto">
      <div className="grid gap-4">
        {PLANS.map((p) => {
          const selected = plan === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setPlan(p.id)}
              aria-pressed={selected}
              className="text-left transition-all duration-200"
              style={{
                background: selected ? '#ffffff' : 'rgba(255,255,255,0.55)',
                border: selected ? `2px solid ${RED}` : '2px solid rgba(239, 42, 48, 0.2)',
                borderRadius: '22px',
                padding: '20px 24px',
                cursor: 'pointer',
                position: 'relative',
                boxShadow: selected ? '0 8px 20px rgba(239, 42, 48, 0.12)' : 'none'
              }}
            >
              {p.badge && (
                <span style={{
                  position: 'absolute',
                  top: '-11px',
                  right: '22px',
                  background: RED,
                  color: '#ffffff',
                  borderRadius: '9999px',
                  padding: '4px 14px',
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em'
                }}>
                  {p.badge}
                </span>
              )}
              <div className="flex items-center gap-3">
                <span aria-hidden="true"
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '9999px',
                        flexShrink: 0,
                        border: `2px solid ${RED}`,
                        background: selected ? RED : 'transparent',
                        boxShadow: selected ? 'inset 0 0 0 3px #ffffff' : 'none'
                      }} />
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(1.35rem, 3vw, 1.7rem)',
                  fontWeight: 600,
                  color: RED
                }}>
                  {p.name}
                </span>
              </div>
              <p className="mt-1"
                 style={{
                   marginLeft: '30px',
                   fontSize: '0.85rem',
                   fontWeight: 700,
                   color: RED,
                   opacity: 0.85,
                   textTransform: 'uppercase',
                   letterSpacing: '0.1em'
                 }}>
                {p.blurb}
              </p>
              <ul className="mt-3" style={{ marginLeft: '30px', padding: 0, listStyle: 'none' }}>
                {p.bullets.map((b) => (
                  <li key={b} style={{ fontSize: '0.85rem', color: RED, fontWeight: 500, lineHeight: 1.9 }}>
                    <span style={{ opacity: 0.7, marginRight: '0.5em' }}>◆</span>{b}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        {checkoutUrl ? (
          <a href={checkoutUrl} className="block text-center transition-all duration-300 hover:opacity-90" style={ctaStyle}>
            Continue to checkout
          </a>
        ) : !isSubmitted ? (
          <>
            <p className="text-center mb-4" style={{ fontSize: '0.9rem', fontWeight: 600, color: RED, lineHeight: 1.6 }}>
              Checkout opens in December. Join the list and we&rsquo;ll hold founding&#8209;member pricing for you.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-stretch">
              <input
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
                className="flex-1 focus:outline-none transition-all duration-300"
                style={{
                  background: '#ffffff',
                  borderRadius: '9999px',
                  border: '1px solid rgba(239, 42, 48, 0.15)',
                  padding: '18px 28px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1rem',
                  letterSpacing: '0.01em',
                  color: '#2d3748'
                }}
              />
              <button type="submit" disabled={isSubmitting}
                      className="transition-all duration-300 hover:opacity-90 disabled:opacity-60"
                      style={ctaStyle}>
                {isSubmitting ? 'Saving…' : 'Lock in my spot'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center animate-fade-in"
               style={{
                 background: '#ffffff',
                 borderRadius: '9999px',
                 padding: '18px 28px',
                 fontFamily: 'Inter, sans-serif',
                 fontSize: '0.95rem',
                 color: RED,
                 fontWeight: 700,
                 letterSpacing: '0.18em',
                 textTransform: 'uppercase',
                 border: '1px solid rgba(239, 42, 48, 0.2)'
               }}>
            You&rsquo;re in — see you in December
          </div>
        )}
        {error && (
          <p className="mt-3 text-center text-sm" style={{ color: RED, fontFamily: "'Cormorant Garamond', serif" }}>{error}</p>
        )}
      </div>
    </div>
  );
}
