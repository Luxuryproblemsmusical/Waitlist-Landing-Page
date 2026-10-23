import { useState } from 'react';
import { RED, INK } from './Layout';
import { PlanPicker } from './PlanPicker';
import { Gloss, PackagingGlow } from './Flourish';
import { Accordion } from './Interactive';
import pouchImage from "../imports/pouch-lemonade-v2.webp";

/** `fill`: a full studio photo that runs edge to edge in the card instead of floating on white. */
const GALLERY: { src: string; alt: string; fill?: boolean }[] = [
  { src: pouchImage, alt: 'GALOP multivitamin drink mix pouch in lemonade, with a single stick pack beside it', fill: true },
];

// Worded as on the pouch.
const BENEFITS = [
  '30+ vitamins & minerals, plus electrolytes',
  'Helps support hair health, digestive comfort, energy, muscle maintenance & bone health*',
  'Zero sugar, sweetened with monkfruit & stevia',
];

// Sydney: edit freely — this is the "Why / Ingredients / Directions" accordion set.
const DETAILS: [string, string][] = [
  ['Why GALOP?', 'GLP-1 medications shrink your appetite, so you eat less — and fewer nutrients reach your body. Standard multivitamins weren’t built for that. GALOP is dosed for life on a GLP-1: higher levels of the vitamins, minerals, and electrolytes that tend to run low, in a once-a-day drink you’ll actually look forward to.'],
  ['What’s inside', '30+ vitamins and minerals plus electrolytes. Sweetened with monkfruit and stevia, zero sugar. Bright, classic lemonade.'],
  ['How to take it', 'Stir or shake one stick pack into 8–12 oz of cold water, once a day. Morning, afternoon, or whenever it fits your routine.'],
  ['Subscription details', 'A fresh 30-pack pouch ships every month with free shipping. Pause, skip, or cancel anytime — no calls, no hoops. New customers get 20% off their first order.'],
];

const Check = () => (
  <svg viewBox="0 0 20 20" width="1.1em" height="1.1em" aria-hidden="true" style={{ flexShrink: 0, marginRight: '0.6em', marginTop: '0.15em' }}>
    <circle cx="10" cy="10" r="10" fill={RED} opacity="0.12" />
    <path d="M6 10.5l2.6 2.5L14 7.5" fill="none" stroke={RED} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Product page block: gallery left, buy box right, accordions under. */
export function ProductSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="shop" className="mt-6" style={{ scrollMarginTop: '16px' }}>
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
               fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem', fontWeight: 600, color: INK,
               textTransform: 'uppercase', letterSpacing: '0.22em'
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
                textWrap: 'balance',
                margin: '6px 0 4px'
              }}>
            Multivitamin Drink Mix
          </h2>
          {/* the flavor, named the way the pouch names it */}
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(1.5rem, 3vw, 1.8rem)', color: RED, lineHeight: 1, margin: '0 0 14px' }}>
            Lemonade
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 500, color: INK, lineHeight: 1.55 }}>
            Sydney&rsquo;s doctor-formulated multivitamin for life on a GLP&#8209;1. One stick in cold water, once a day.
          </p>

          <ul className="mt-5 mb-5" style={{ padding: 0, listStyle: 'none' }}>
            {BENEFITS.map((b) => (
              <li key={b} className="flex" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', fontWeight: 500, color: INK, lineHeight: 1.6, marginBottom: '4px' }}>
                <Check />{b}
              </li>
            ))}
          </ul>

          <PlanPicker source="galoplife.com" />

          {/* Accordions */}
          <div className="mt-6">
            <Accordion items={DETAILS} />
          </div>
        </div>
      </div>
    </section>
  );
}
