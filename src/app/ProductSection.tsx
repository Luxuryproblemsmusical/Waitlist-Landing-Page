import { useState } from 'react';
import { RED } from './Layout';
import { PlanPicker } from './PlanPicker';
import { Note, SpinBadge } from './Flourish';
import heroImage from "../imports/hero-lemonade.png";
import pouchImage from "../imports/pouch-lemonade.png";

const GALLERY = [
  { src: pouchImage, alt: 'GALOP multivitamin drink mix pouch — lemonade with a hint of ginger, 30 stick packs' },
  { src: heroImage, alt: 'GALOP lemonade drink mix stick pack beside an iced glass of ginger lemonade' },
];

const BENEFITS = [
  '30+ vitamins & minerals for life on a GLP-1',
  'Electrolytes for hydration & energy',
  'Supports hair, digestion & nausea',
  'Zero sugar — monkfruit + stevia',
];

const TRUST = [
  { label: 'Doctor-formulated' },
  { label: 'Made in the USA' },
  { label: 'Cancel anytime' },
];

// Sydney: edit freely — this is the "Why / Ingredients / Directions" accordion set.
const DETAILS: [string, string][] = [
  ['Why GALOP?', 'GLP-1 medications shrink your appetite, so you eat less — and fewer nutrients reach your body. Standard multivitamins weren’t built for that. GALOP is dosed for life on a GLP-1: higher levels of the vitamins, minerals, and electrolytes that tend to run low, in a once-a-day drink you’ll actually look forward to.'],
  ['What’s inside', '30+ vitamins and minerals plus electrolytes. Sweetened with monkfruit and stevia, zero sugar. Lemonade with a hint of ginger. Full supplement facts will be posted before launch.'],
  ['How to take it', 'Stir or shake one stick pack into 8–12 oz of cold water, once a day. Morning, afternoon, or whenever it fits your routine.'],
  ['Subscription details', 'A fresh 30-pack pouch ships every month with free shipping. Pause, skip, or cancel anytime from your account — no calls, no hoops. Members keep their launch price for as long as they stay subscribed.'],
];

const Check = () => (
  <svg viewBox="0 0 20 20" width="1.1em" height="1.1em" aria-hidden="true" style={{ flexShrink: 0, marginRight: '0.6em', marginTop: '0.15em' }}>
    <circle cx="10" cy="10" r="10" fill={RED} opacity="0.12" />
    <path d="M6 10.5l2.6 2.5L14 7.5" fill="none" stroke={RED} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TrustIcon = () => (
  <svg viewBox="0 0 24 24" width="2rem" height="2rem" aria-hidden="true">
    <circle cx="12" cy="12" r="11" fill="none" stroke={RED} strokeWidth="1.6" />
    <path d="M7 12.5l3 3 7-7" fill="none" stroke={RED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Gruns-style product page block: gallery left, buy box right, trust row + accordions under. */
export function ProductSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="shop" className="mt-6">
      <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-start">
        {/* Gallery */}
        <div>
          <div style={{
            position: 'relative',
            background: '#ffffff',
            borderRadius: '24px',
            padding: 'clamp(30px, 4vw, 48px) clamp(20px, 4vw, 40px) clamp(20px, 4vw, 40px)',
            border: '1px solid rgba(239, 42, 48, 0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            minHeight: '320px'
          }}>
            <SpinBadge text="LAUNCHING DECEMBER • JOIN THE LIST • " size="clamp(5rem, 9vw, 6.25rem)"
                       style={{ position: 'absolute', top: '-3.6rem', right: '-1.4rem', filter: 'drop-shadow(0 8px 16px rgba(239, 42, 48, 0.3))' }} />
            <Note rotate={-7} style={{ position: 'absolute', left: '1rem', bottom: '0.9rem', fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}>
              30 sticks per pouch ↗
            </Note>
            <img
              src={GALLERY[active].src}
              alt={GALLERY[active].alt}
              className="w-full h-auto object-contain"
              style={{ maxHeight: '460px', filter: 'drop-shadow(0 10px 20px rgba(30, 60, 90, 0.14))' }}
            />
          </div>
          <div className="flex gap-3 mt-3">
            {GALLERY.map((g, i) => (
              <button key={g.alt} type="button" onClick={() => setActive(i)}
                      aria-label={`Show image ${i + 1}`} aria-pressed={active === i}
                      style={{
                        width: '72px', height: '72px', borderRadius: '14px', padding: '8px',
                        background: '#ffffff',
                        border: active === i ? `2px solid ${RED}` : '2px solid rgba(239, 42, 48, 0.15)',
                        cursor: 'pointer'
                      }}>
                <img src={g.src} alt="" className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* Buy box */}
        <div>
          <p style={{
               fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', fontWeight: 700, color: RED,
               textTransform: 'uppercase', letterSpacing: '0.22em', opacity: 0.85
             }}>
            Launching December
          </p>
          <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
                fontWeight: 600,
                color: RED,
                letterSpacing: '-0.01em',
                lineHeight: 1.05,
                margin: '6px 0 10px'
              }}>
            Multivitamin Drink Mix
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 600, color: RED, lineHeight: 1.5 }}>
            The daily multivitamin + electrolytes built for life on a GLP&#8209;1. Lemonade with a hint of ginger.
          </p>

          <ul className="mt-5" style={{ padding: 0, listStyle: 'none' }}>
            {BENEFITS.map((b) => (
              <li key={b} className="flex" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', fontWeight: 600, color: RED, lineHeight: 1.6, marginBottom: '4px' }}>
                <Check />{b}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 mt-5 mb-5">
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 700, color: RED, textTransform: 'uppercase', letterSpacing: '0.18em' }}>
              Flavor
            </span>
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 700, color: '#ffffff',
              background: RED, borderRadius: '9999px', padding: '6px 14px', letterSpacing: '0.08em'
            }}>
              Lemonade + Ginger
            </span>
          </div>

          <PlanPicker source="galoplife.com" />

          {/* Trust row */}
          <div className="grid grid-cols-3 gap-3 mt-6 text-center">
            {TRUST.map((t) => (
              <div key={t.label} className="flex flex-col items-center">
                <TrustIcon />
                <span className="mt-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', fontWeight: 700, color: RED, lineHeight: 1.3 }}>
                  {t.label}
                </span>
              </div>
            ))}
          </div>

          {/* Accordions */}
          <div className="mt-6">
            {DETAILS.map(([q, a]) => (
              <details key={q} className="galop-details"
                       style={{ borderTop: '1px solid rgba(239, 42, 48, 0.2)' }}>
                <summary className="flex items-center justify-between"
                         style={{
                           cursor: 'pointer', listStyle: 'none', padding: '14px 2px',
                           fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', fontWeight: 700, color: RED
                         }}>
                  {q}
                  <span className="plus" aria-hidden="true"
                        style={{ fontSize: '1.4rem', lineHeight: 1, fontWeight: 400, transition: 'transform 0.2s' }}>+</span>
                </summary>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: RED, opacity: 0.85, lineHeight: 1.65, padding: '0 2px 16px', margin: 0 }}>
                  {a}
                </p>
              </details>
            ))}
            <div style={{ borderTop: '1px solid rgba(239, 42, 48, 0.2)' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
