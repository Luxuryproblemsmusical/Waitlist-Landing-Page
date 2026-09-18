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

/**
 * Prices in USD. Leave null until Sydney sets them — the card then shows
 * "Launch price" instead of a number. `compareAt` renders struck-through.
 */
export const PRICING: Record<Plan, { price: number | null; compareAt?: number }> = {
  monthly: { price: null },
  onetime: { price: null },
};

const STICKS_PER_POUCH = 30;

const PLANS: { id: Plan; name: string; header?: string; blurb: string; bullets: string[] }[] = [
  {
    id: 'monthly',
    name: 'Subscribe & Save',
    header: 'Most popular · Launch pricing',
    blurb: `${STICKS_PER_POUCH} stick packs every month`,
    bullets: [
      'Launch price, locked for life',
      'Free shipping',
      'Pause, skip, or cancel anytime',
      'First deliveries December',
    ],
  },
  {
    id: 'onetime',
    name: 'One-Time Purchase',
    blurb: `${STICKS_PER_POUCH} stick packs, delivered once`,
    bullets: ['Try a full month, no commitment'],
  },
];

const money = (n: number) => `$${n.toFixed(n % 1 === 0 ? 0 : 2)}`;

const ctaStyle = {
  display: 'block',
  width: '100%',
  textAlign: 'center' as const,
  background: RED,
  color: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 700,
  fontSize: '1rem',
  letterSpacing: '0.16em',
  textTransform: 'uppercase' as const,
  border: 'none',
  borderRadius: '9999px',
  padding: '20px 36px',
  cursor: 'pointer',
  textDecoration: 'none',
};

const Check = () => (
  <svg viewBox="0 0 20 20" width="1em" height="1em" aria-hidden="true"
       style={{ flexShrink: 0, marginRight: '0.55em', marginTop: '0.2em' }}>
    <circle cx="10" cy="10" r="10" fill={RED} opacity="0.12" />
    <path d="M6 10.5l2.6 2.5L14 7.5" fill="none" stroke={RED} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PriceSlot = ({ plan }: { plan: Plan }) => {
  const { price, compareAt } = PRICING[plan];
  if (price == null) {
    return (
      <div className="text-right" style={{ color: RED, lineHeight: 1.15 }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.35rem', fontWeight: 600 }}>
          Launch price
        </div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', fontWeight: 700, opacity: 0.75, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          announced in December
        </div>
      </div>
    );
  }
  return (
    <div className="text-right" style={{ color: RED, lineHeight: 1.1 }}>
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.5rem', fontWeight: 700 }}>
        {money(price)}
        {compareAt && (
          <span style={{ marginLeft: '0.4em', fontSize: '0.95rem', fontWeight: 600, opacity: 0.55, textDecoration: 'line-through' }}>
            {money(compareAt)}
          </span>
        )}
      </div>
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 700, opacity: 0.75 }}>
        {money(price / STICKS_PER_POUCH)}/stick
      </div>
    </div>
  );
};

/** Gruns-style buy box: highlighted subscribe card, one-time card, CTA, pre-launch email capture. */
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
    <div>
      <div className="grid gap-3">
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
                background: selected ? '#ffffff' : 'rgba(255,255,255,0.6)',
                border: selected ? `2px solid ${RED}` : '2px solid rgba(239, 42, 48, 0.22)',
                borderRadius: '18px',
                padding: 0,
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: selected ? '0 10px 24px rgba(239, 42, 48, 0.12)' : 'none'
              }}
            >
              {p.header && (
                <div style={{
                  background: selected ? RED : 'rgba(239, 42, 48, 0.12)',
                  color: selected ? '#ffffff' : RED,
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.64rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  textAlign: 'center',
                  padding: '7px 12px'
                }}>
                  {p.header}
                </div>
              )}
              <div style={{ padding: '16px 18px 18px' }}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span aria-hidden="true"
                          style={{
                            width: '18px', height: '18px', borderRadius: '9999px', flexShrink: 0, marginTop: '4px',
                            border: `2px solid ${RED}`,
                            background: selected ? RED : 'transparent',
                            boxShadow: selected ? 'inset 0 0 0 3px #ffffff' : 'none'
                          }} />
                    <div>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.05rem', fontWeight: 700, color: RED, lineHeight: 1.2 }}>
                        {p.name}
                      </div>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 600, color: RED, opacity: 0.8, marginTop: '2px' }}>
                        {p.blurb}
                      </div>
                    </div>
                  </div>
                  <PriceSlot plan={p.id} />
                </div>
                {selected && (
                  <ul className="mt-3" style={{ marginLeft: '30px', padding: 0, listStyle: 'none' }}>
                    {p.bullets.map((b) => (
                      <li key={b} className="flex" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: RED, fontWeight: 600, lineHeight: 1.7 }}>
                        <Check />{b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-5">
        {checkoutUrl ? (
          <a href={checkoutUrl} className="transition-all duration-300 hover:opacity-90" style={ctaStyle}>
            Start now
          </a>
        ) : !isSubmitted ? (
          <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
                className="focus:outline-none transition-all duration-300"
                style={{
                  background: '#ffffff',
                  borderRadius: '9999px',
                  border: '1px solid rgba(239, 42, 48, 0.2)',
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
                {isSubmitting ? 'Saving…' : 'Lock in launch pricing'}
              </button>
            </form>
            <p className="text-center mt-3"
               style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 600, color: RED, opacity: 0.85, lineHeight: 1.5 }}>
              Checkout opens in December. Join the list and we&rsquo;ll hold your launch price.
            </p>
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
