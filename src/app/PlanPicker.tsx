import { useId, useState, type CSSProperties } from 'react';
import { RED, INK } from './Layout';
import { joinWaitlist } from './waitlist';
import { Gloss } from './Flourish';

export type Plan = 'monthly' | 'onetime';

/**
 * Checkout links. Until these are pasted in, the CTA captures an email for the
 * first-order discount instead of going to checkout.
 */
export const CHECKOUT_URLS: Record<Plan, string | null> = {
  monthly: null, // TODO: Shopify selling-plan checkout link
  onetime: null, // TODO: Shopify one-time checkout link
};

/**
 * Prices in USD. Leave null until Sydney sets them; the card then shows no
 * price. `compareAt` renders struck-through.
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
    blurb: `${STICKS_PER_POUCH} stick packs every month`,
    bullets: [
      '20% off your first order',
      'Free shipping',
      'Pause, skip, or cancel anytime',
    ],
  },
  {
    id: 'onetime',
    name: 'One-Time Purchase',
    blurb: `${STICKS_PER_POUCH} stick packs, delivered once`,
    bullets: ['20% off your first order', 'Try a full month, no commitment'],
  },
];

const money = (n: number) => `$${n.toFixed(n % 1 === 0 ? 0 : 2)}`;

const ctaStyle = {
  display: 'block',
  width: '100%',
  textAlign: 'center' as const,
  background: RED,
  color: '#ffffff',
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 700,
  fontSize: '1rem',
  letterSpacing: '0.16em',
  textTransform: 'uppercase' as const,
  border: 'none',
  padding: '20px 36px',
  cursor: 'pointer',
  textDecoration: 'none',
  position: 'relative' as const,
  overflow: 'hidden' as const,
};

/** List bullet: a short red rule, like the one under LEMONADE on the pouch. */
const Check = () => <span aria-hidden="true" style={{ flexShrink: 0, width: '0.7em', height: '1.5px', background: RED, marginRight: '0.7em', marginTop: '0.85em' }} />;

const PriceSlot = ({ plan }: { plan: Plan }) => {
  const { price, compareAt } = PRICING[plan];
  // No price set yet: show nothing rather than repeat the offer on every card.
  if (price == null) return null;
  return (
    <div className="text-right" style={{ color: RED, lineHeight: 1.1 }}>
      <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '1.5rem', fontWeight: 700 }}>
        {money(price)}
        {compareAt && (
          <span style={{ marginLeft: '0.4em', fontSize: '0.95rem', fontWeight: 600, opacity: 0.55, textDecoration: 'line-through' }}>
            {money(compareAt)}
          </span>
        )}
      </div>
      <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '0.72rem', fontWeight: 700, opacity: 0.75 }}>
        {money(price / STICKS_PER_POUCH)}/stick
      </div>
    </div>
  );
};

/** Buy box: subscribe card, one-time card, CTA (email capture until checkout links exist). */
export function PlanPicker({ source }: { source: string }) {
  const [plan, setPlan] = useState<Plan>('monthly');
  const [email, setEmail] = useState('');
  const emailId = useId();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || isSubmitting) return;
    setError('');
    setIsSubmitting(true);
    try {
      const honeypot = String(new FormData(e.currentTarget).get('galop_hp') ?? '');
      await joinWaitlist(email, { source, plan, honeypot });
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
              className="plan-card cut text-left"
              style={{
                ['--cut' as string]: '16px', ['--bw' as string]: '2px',
                ['--line' as string]: selected ? RED : 'rgba(236, 29, 39, 0.22)',
                ['--fill' as string]: selected ? '#ffffff' : 'rgba(255,255,255,0.6)',
                background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                filter: selected ? 'drop-shadow(0 10px 16px rgba(236, 29, 39, 0.12))' : 'none',
                transition: 'filter 0.2s ease, transform 0.25s ease'
              } as CSSProperties}
            >
              {p.header && (
                <div style={{
                  background: selected ? RED : 'rgba(236, 29, 39, 0.12)',
                  color: selected ? '#ffffff' : RED,
                  fontFamily: "'Montserrat', sans-serif",
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
                    <span aria-hidden="true" className="plan-dot"
                          style={{
                            width: '18px', height: '18px', borderRadius: '9999px', flexShrink: 0, marginTop: '4px',
                            border: `2px solid ${RED}`,
                            background: selected ? RED : 'transparent',
                            boxShadow: selected ? 'inset 0 0 0 3px #ffffff' : 'none'
                          }} />
                    <div>
                      <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.5rem', fontWeight: 600, color: RED, lineHeight: 1.1 }}>
                        {p.name}
                      </div>
                      <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '0.8rem', fontWeight: 500, color: INK, marginTop: '4px' }}>
                        {p.blurb}
                      </div>
                    </div>
                  </div>
                  <PriceSlot plan={p.id} />
                </div>
                {selected && (
                  <ul className="mt-3" style={{ marginLeft: '30px', padding: 0, listStyle: 'none' }}>
                    {p.bullets.map((b) => (
                      <li key={b} className="flex" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '0.85rem', color: INK, fontWeight: 500, lineHeight: 1.7 }}>
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
          <a href={checkoutUrl} className="btn-gallop cut-solid" style={ctaStyle}>
            <Gloss delay={6} /><span className="btn-label">Start now</span>
          </a>
        ) : !isSubmitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* Honeypot: hidden from people and screen readers, so only bots fill it in. */}
            <input
              type="text"
              name="galop_hp"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
            />
            <label htmlFor={emailId} className="sr-only">Email address for 20% off your first order</label>
            <span className="galop-field cut" style={{ display: 'block', ['--cut' as string]: '12px', ['--bw' as string]: '1px', ['--line' as string]: 'rgba(236, 29, 39, 0.28)', ['--fill' as string]: '#ffffff' } as CSSProperties}>
              <input
                id={emailId}
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
                className="galop-input focus:outline-none"
                style={{
                  display: 'block', width: '100%',
                  background: 'transparent',
                  border: 'none',
                  padding: '18px 28px',
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '1rem',
                  letterSpacing: '0.01em',
                  color: '#2d3748'
                }}
              />
            </span>
            <button type="submit" disabled={isSubmitting}
                    className="btn-gallop cut-solid disabled:opacity-60"
                    style={ctaStyle}>
              <Gloss delay={6} /><span className="btn-label">{isSubmitting ? 'Saving…' : 'Get 20% off'}</span>
            </button>
          </form>
        ) : (
          <div className="success-pill cut text-center animate-fade-in" role="status"
               style={{
                 ['--cut' as string]: '12px', ['--bw' as string]: '1px',
                 ['--line' as string]: 'rgba(236, 29, 39, 0.3)', ['--fill' as string]: '#ffffff',
                 padding: '18px 28px',
                 fontFamily: "'Montserrat', sans-serif",
                 fontSize: '0.95rem',
                 color: RED,
                 fontWeight: 700,
                 letterSpacing: '0.18em',
                 textTransform: 'uppercase'
               } as CSSProperties}>
            <span className="btn-label">Thank you &mdash; check your inbox.</span>
          </div>
        )}
        {error && (
          <p role="alert" className="mt-3 text-center text-sm" style={{ color: INK, fontFamily: "'Instrument Serif', serif" }}>{error}</p>
        )}
      </div>
    </div>
  );
}
