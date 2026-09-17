import { useState } from 'react';
import { trackWaitlistSignup } from './analytics';
import { getAttribution } from './attribution';
import horseImage from "../imports/galop-horse.png";
import heroImage from "../imports/hero-lemonade.png";

const KLAVIYO_PUBLIC_KEY = 'XchVzP';
const KLAVIYO_LIST_ID = 'WNWyrF';

const RED = '#EF2A30';

type Plan = 'monthly' | 'onetime';

/**
 * Pre-launch Subscribe & Save page. Until checkout goes live in December,
 * the CTA captures emails to the same Klaviyo list as the homepage,
 * tagged with the plan the visitor picked. When the Shopify store is ready,
 * swap the form for checkout links (see CHECKOUT_URLS below).
 */
const CHECKOUT_URLS: Record<Plan, string | null> = {
  monthly: null, // TODO: Shopify selling-plan checkout link
  onetime: null, // TODO: Shopify one-time checkout link
};

const PLANS: {
  id: Plan;
  name: string;
  badge?: string;
  blurb: string;
  bullets: string[];
}[] = [
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

export default function SubscribePage() {
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
      const attribution = getAttribution();
      const fields: Record<string, string> = {
        $source: attribution.utm_source
          ? `${attribution.utm_source} / paid`
          : 'galoplife.com/subscribe',
        preferred_plan: plan,
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
      setIsSubmitted(true);
      setEmail('');
      trackWaitlistSignup('subscribe-page', plan);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-6 pt-0 pb-12"
         style={{ background: '#cbeafe', fontFamily: 'Inter, sans-serif' }}>

      {/* Static launch banner */}
      <div style={{
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        background: RED,
        color: '#ffffff',
        textAlign: 'center',
        padding: '9px 16px',
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '0.95rem',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        fontWeight: 500,
        marginBottom: 'clamp(20px, 3vw, 40px)'
      }}>
        Launching December
      </div>

      <div className="w-full max-w-3xl">
        {/* Compact logo lockup, links home */}
        <a href="/" style={{ textDecoration: 'none' }} className="flex flex-col items-center">
          <img src={horseImage} alt="" aria-hidden="true"
               style={{ width: 'clamp(3.5rem, 9vw, 5.5rem)', height: 'auto' }} />
          <span aria-label="GALOP"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 500,
                  color: RED,
                  fontSize: 'clamp(2.2rem, 7vw, 3.5rem)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.01em',
                }}>
            GALOP
          </span>
        </a>

        {/* Heading */}
        <div className="text-center mt-8 mb-4">
          <h1 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2.5rem, 7vw, 4.25rem)',
                fontWeight: 600,
                color: RED,
                letterSpacing: '-0.01em',
                lineHeight: 1.05,
                margin: 0
              }}>
            Subscribe &amp; save.
          </h1>
          <p className="mt-4"
             style={{
               fontFamily: 'Inter, sans-serif',
               fontSize: 'clamp(0.7rem, 1.3vw, 0.9rem)',
               fontWeight: 700,
               color: RED,
               textTransform: 'uppercase',
               letterSpacing: '0.22em'
             }}>
            Your monthly ritual for life on a GLP&#8209;1
          </p>
        </div>

        {/* Product image */}
        <div className="flex justify-center my-8">
          <img
            src={heroImage}
            alt="GALOP lemonade drink mix stick pack beside an iced glass of ginger lemonade"
            className="w-44 sm:w-56 h-auto object-contain"
            style={{ filter: 'drop-shadow(0 8px 16px rgba(30, 60, 90, 0.18))' }}
          />
        </div>

        {/* Plan picker */}
        <div className="max-w-xl mx-auto grid gap-4">
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
                    <li key={b}
                        style={{
                          fontSize: '0.85rem',
                          color: RED,
                          fontWeight: 500,
                          lineHeight: 1.9
                        }}>
                      <span style={{ opacity: 0.7, marginRight: '0.5em' }}>◆</span>{b}
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>

        {/* CTA — waitlist until checkout opens */}
        <div className="max-w-xl mx-auto mt-8">
          {CHECKOUT_URLS[plan] ? (
            <a href={CHECKOUT_URLS[plan]!}
               className="block text-center transition-all duration-300 hover:opacity-90"
               style={{
                 background: RED,
                 color: '#ffffff',
                 fontWeight: 700,
                 fontSize: '0.95rem',
                 letterSpacing: '0.18em',
                 textTransform: 'uppercase',
                 borderRadius: '9999px',
                 padding: '18px 36px',
                 textDecoration: 'none'
               }}>
              Continue to checkout
            </a>
          ) : !isSubmitted ? (
            <>
              <p className="text-center mb-4"
                 style={{
                   fontSize: '0.9rem',
                   fontWeight: 600,
                   color: RED,
                   lineHeight: 1.6
                 }}>
                Checkout opens in December. Join the list and we&rsquo;ll hold founding&#8209;member pricing for you.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-stretch">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
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
                    fontSize: '1rem',
                    color: '#2d3748'
                  }}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="transition-all duration-300 hover:opacity-90 disabled:opacity-60"
                  style={{
                    background: RED,
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    border: 'none',
                    borderRadius: '9999px',
                    padding: '18px 36px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {isSubmitting ? 'Saving…' : 'Lock in my spot'}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center"
                 style={{
                   background: '#ffffff',
                   borderRadius: '9999px',
                   padding: '18px 28px',
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
            <p className="mt-3 text-center text-sm"
               style={{ color: RED, fontFamily: "'Cormorant Garamond', serif" }}>{error}</p>
          )}
        </div>

        {/* Mini FAQ */}
        <div className="max-w-xl mx-auto mt-16">
          {[
            ['When does GALOP ship?', 'First orders ship in December. Subscribers on the founding list get first access.'],
            ['Can I pause or cancel?', 'Anytime, in one click — no calls, no hoops.'],
            ['What’s inside?', '30 stick packs of doctor-formulated multivitamin + electrolytes. Lemonade with a hint of ginger, zero sugar.'],
          ].map(([q, a]) => (
            <div key={q} className="mb-6">
              <p style={{
                   fontFamily: "'Cormorant Garamond', serif",
                   fontSize: '1.25rem',
                   fontWeight: 600,
                   color: RED,
                   margin: 0
                 }}>{q}</p>
              <p className="mt-1"
                 style={{ fontSize: '0.9rem', color: RED, opacity: 0.85, lineHeight: 1.6 }}>{a}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="max-w-2xl mx-auto mt-16 text-center"
                style={{
                  fontSize: '0.75rem',
                  lineHeight: 1.6,
                  color: 'rgba(239, 42, 48, 0.7)',
                  letterSpacing: '0.02em'
                }}>
          <p>© {new Date().getFullYear()} GALOP. All rights reserved.</p>
          <p style={{ marginTop: '0.5rem' }}>
            <a href="/" style={{ color: 'rgba(239, 42, 48, 0.85)', textDecoration: 'underline', textUnderlineOffset: '0.2em', marginRight: '1.25rem' }}>
              Home
            </a>
            <a href="/privacy.html" style={{ color: 'rgba(239, 42, 48, 0.85)', textDecoration: 'underline', textUnderlineOffset: '0.2em' }}>
              Privacy Policy
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
