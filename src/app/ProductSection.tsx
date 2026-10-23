import { useState } from 'react';
import { RED, LEMON } from './Layout';
import { PlanPicker } from './PlanPicker';
import { Note, Gloss, LemonSlice, PackagingGlow } from './Flourish';
import { Accordion } from './Interactive';
import pouchImage from "../imports/pouch-lemonade-v2.webp";

/** `fill`: a full studio photo that runs edge to edge in the card instead of floating on white. */
const GALLERY: { src: string; alt: string; fill?: boolean }[] = [
  { src: pouchImage, alt: 'GALOP multivitamin drink mix pouch in lemonade, with a single stick pack beside it', fill: true },
];

const BENEFITS = [
  '30+ vitamins & minerals for life on a GLP-1',
  'Electrolytes for hydration & energy',
  'Helps support hair, digestion, muscle & bone health*',
  'Zero sugar — monkfruit + stevia',
];

const TRUST = [
  { label: 'Doctor-formulated', detail: 'Built with a doctor for life on a GLP-1.' },
  { label: 'Made in the USA', detail: 'Produced and packed in the USA.' },
  { label: 'Cancel anytime', detail: 'Pause, skip, or cancel from your account.' },
];

// Sydney: edit freely — this is the "Why / Ingredients / Directions" accordion set.
const DETAILS: [string, string][] = [
  ['Why GALOP?', 'GLP-1 medications shrink your appetite, so you eat less — and fewer nutrients reach your body. Standard multivitamins weren’t built for that. GALOP is dosed for life on a GLP-1: higher levels of the vitamins, minerals, and electrolytes that tend to run low, in a once-a-day drink you’ll actually look forward to.'],
  ['What’s inside', '30+ vitamins and minerals plus electrolytes. Sweetened with monkfruit and stevia, zero sugar. Bright, classic lemonade.'],
  ['How to take it', 'Stir or shake one stick pack into 8–12 oz of cold water, once a day. Morning, afternoon, or whenever it fits your routine.'],
  ['Subscription details', 'A fresh 30-pack pouch ships every month with free shipping. Pause, skip, or cancel anytime from your account — no calls, no hoops. New customers get 20% off their first order.'],
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
    <path className="trust-check" d="M7 12.5l3 3 7-7" fill="none" stroke={RED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="15" />
  </svg>
);

/** Gruns-style product page block: gallery left, buy box right, trust row + accordions under. */
export function ProductSection() {
  const [active, setActive] = useState(0);
  const [trustOpen, setTrustOpen] = useState(-1);

  return (
    <section id="shop" className="mt-6">
      <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-start">
        {/* Gallery — a soft lemon glow sits behind the packaging */}
        <div style={{ position: 'relative', isolation: 'isolate' }}>
          <PackagingGlow />
          <div style={{
            position: 'relative',
            background: '#ffffff',
            borderRadius: '24px',
            padding: GALLERY[active].fill ? 0 : 'clamp(30px, 4vw, 48px) clamp(20px, 4vw, 40px) clamp(20px, 4vw, 40px)',
            border: '1px solid rgba(239, 42, 48, 0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            minHeight: '320px'
          }}>
            <Gloss delay={0} />
            {!GALLERY[active].fill && (
              <Note rotate={-7} style={{ position: 'absolute', left: '1rem', bottom: '0.9rem', fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}>
                30 sticks per pouch ↗
              </Note>
            )}
            <img
              src={GALLERY[active].src}
              alt={GALLERY[active].alt}
              className="w-full h-auto object-contain"
              style={GALLERY[active].fill
                ? { display: 'block', borderRadius: '23px' }
                : { maxHeight: '460px', filter: 'drop-shadow(0 10px 20px rgba(30, 60, 90, 0.14))' }}
            />
          </div>
          {GALLERY.length > 1 && <div className="flex gap-3 mt-3">
            {GALLERY.map((g, i) => (
              <button key={g.alt} type="button" onClick={() => setActive(i)}
                      aria-label={`Show image ${i + 1}`} aria-pressed={active === i}
                      style={{
                        width: '72px', height: '72px', borderRadius: '14px', padding: g.fill ? 0 : '8px', overflow: 'hidden',
                        background: '#ffffff',
                        border: active === i ? `2px solid ${RED}` : '2px solid rgba(239, 42, 48, 0.15)',
                        cursor: 'pointer'
                      }}>
                <img src={g.src} alt="" className={`w-full h-full ${g.fill ? 'object-cover' : 'object-contain'}`} />
              </button>
            ))}
          </div>}
        </div>

        {/* Buy box */}
        <div>
          <p style={{
               fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', fontWeight: 700, color: RED,
               textTransform: 'uppercase', letterSpacing: '0.22em', opacity: 0.85
             }}>
            Just Launched
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
            A lemonade drink mix with 30+ vitamins, minerals, and electrolytes, made for life on a GLP&#8209;1. One stick, once a day.
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
              display: 'inline-flex', alignItems: 'center', gap: '0.45em',
              fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 700, color: RED,
              background: LEMON, border: '1.5px solid rgba(239, 42, 48, 0.25)',
              borderRadius: '9999px', padding: '5px 14px 5px 7px', letterSpacing: '0.08em'
            }}>
              <LemonSlice size="1.35em" />
              Lemonade
            </span>
          </div>

          <PlanPicker source="galoplife.com" />

          {/* Trust row */}
          <div className="grid grid-cols-3 gap-3 mt-6 text-center items-start">
            {TRUST.map((t, i) => {
              const on = trustOpen === i;
              return (
                <button key={t.label} type="button" className="trust-card lift flex flex-col items-center"
                        aria-expanded={on} onClick={() => setTrustOpen(on ? -1 : i)}
                        style={{
                          background: on ? '#ffffff' : 'rgba(255,255,255,0.5)', borderRadius: '16px', cursor: 'pointer',
                          border: `2px solid ${on ? RED : 'rgba(239, 42, 48, 0.12)'}`, padding: '12px 8px',
                          transition: 'transform 0.25s ease, background 0.2s ease, border-color 0.2s ease'
                        }}>
                  <TrustIcon />
                  <span className="mt-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', fontWeight: 700, color: RED, lineHeight: 1.3 }}>
                    {t.label}
                  </span>
                  <span className="acc-panel" style={{ gridTemplateRows: on ? '1fr' : '0fr', width: '100%' }}>
                    <span style={{ overflow: 'hidden' }}>
                      <span style={{ display: 'block', paddingTop: '6px', fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', fontWeight: 500, color: RED, opacity: 0.85, lineHeight: 1.4 }}>
                        {t.detail}
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Accordions */}
          <div className="mt-6">
            <Accordion items={DETAILS} />
          </div>
        </div>
      </div>
    </section>
  );
}
