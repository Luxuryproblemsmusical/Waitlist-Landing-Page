import { useState, type CSSProperties } from 'react';
import { RED, INK, Kicker, Heading } from './Layout';

/** The five families, each with its own tile tint (all pale enough for oxblood text). */
const GROUPS = {
  hydration: { label: 'Hydration & electrolytes', tint: '#d3ecff' },
  bone: { label: 'Strength & bone support', tint: '#fff3a3' },
  energy: { label: 'Energy & metabolism', tint: '#ffdcc4' },
  glow: { label: 'Hair, skin & immunity', tint: '#ffd3da' },
  gut: { label: 'Digestive comfort', tint: '#dcefc8' },
} as const;
type Group = keyof typeof GROUPS;

// Wording from Sydney's "What's Inside" sheet. `short` is the name under the symbol on the tile.
const ELEMENTS: { sym: string; name: string; short?: string; amount: string; form?: string; group: Group; does: string }[] = [
  { sym: 'Na', name: 'Sodium', amount: '200 mg', form: 'from Himalayan pink salt', group: 'hydration',
    does: 'Helps your body hold on to the water you drink, which matters when a GLP-1 means you’re less thirsty.' },
  { sym: 'K', name: 'Potassium', amount: '100 mg', group: 'hydration',
    does: 'Works with sodium to keep fluids balanced and support normal muscle function.' },
  { sym: 'Mg', name: 'Magnesium', amount: '80 mg', form: 'as magnesium glycinate', group: 'hydration',
    does: 'Supports muscle function, energy and restful sleep, in a form known for being gentle on the stomach.' },
  { sym: 'Cw', name: 'Coconut water powder', short: 'Coconut', amount: '500 mg', group: 'hydration',
    does: 'A natural source of electrolytes for everyday hydration.' },

  { sym: 'D3', name: 'Vitamin D3', amount: '25 mcg', form: '1,000 IU', group: 'bone',
    does: 'Supports bone strength, muscle function and immunity.' },
  { sym: 'Ca', name: 'Calcium', amount: '200 mg', form: 'as calcium citrate', group: 'bone',
    does: 'Supports strong bones, in a form that’s easy to absorb even with less food.' },
  { sym: 'K1', name: 'Vitamin K1', amount: '90 mcg', group: 'bone',
    does: 'Works with vitamin D and calcium to support bone health.' },
  { sym: 'B', name: 'Boron', amount: '1 mg', group: 'bone',
    does: 'A trace mineral that supports how your body uses calcium and vitamin D.' },

  { sym: 'B12', name: 'Vitamin B12', amount: '20 mcg', form: 'as methylcobalamin', group: 'energy',
    does: 'Supports energy and nerve health, in its active form.' },
  { sym: 'B9', name: 'Folate', amount: '400 mcg DFE', form: 'as methylfolate', group: 'energy',
    does: 'Supports healthy cell function, in its active form.' },
  { sym: 'Bx', name: 'B-complex', amount: 'B1, B2, B3, B5, B6', group: 'energy',
    does: 'Helps turn the food you do eat into energy.' },
  { sym: 'Fe', name: 'Iron', amount: '8 mg', form: 'as iron bisglycinate', group: 'energy',
    does: 'Supports energy and healthy red blood cells, in a gentle form less likely to upset your stomach.' },
  { sym: 'Cr', name: 'Chromium', amount: '35 mcg', group: 'energy',
    does: 'Supports healthy carbohydrate metabolism.' },
  { sym: 'I', name: 'Iodine', amount: '150 mcg', group: 'energy',
    does: 'Supports healthy thyroid function.' },

  { sym: 'B7', name: 'Biotin', amount: '30 mcg', group: 'glow',
    does: 'Supports healthy hair, skin and nails.' },
  { sym: 'Zn', name: 'Zinc', amount: '8 mg', group: 'glow',
    does: 'Supports immunity, healthy hair and skin.' },
  { sym: 'C', name: 'Vitamin C', amount: '60 mg', group: 'glow',
    does: 'Supports immunity and collagen production for healthy skin.' },
  { sym: 'A', name: 'Vitamin A', amount: '1,500 mcg', form: 'from retinyl acetate and beta-carotene', group: 'glow',
    does: 'Supports healthy vision, skin and immunity.' },
  { sym: 'E', name: 'Vitamin E', amount: '15 mg', form: 'with mixed tocopherols', group: 'glow',
    does: 'Antioxidants that help protect your cells.' },
  { sym: 'Se', name: 'Selenium', amount: '55 mcg', group: 'glow',
    does: 'An antioxidant mineral that supports immunity and thyroid health.' },
  { sym: 'Cu', name: 'Copper', amount: '0.9 mg', group: 'glow',
    does: 'A trace mineral that helps your body make energy and protect cells.' },
  { sym: 'Mn', name: 'Manganese', amount: '2.3 mg', group: 'glow',
    does: 'A trace mineral that helps your body make energy and protect cells.' },
  { sym: 'Mo', name: 'Molybdenum', amount: '45 mcg', group: 'glow',
    does: 'A trace mineral that helps your body make energy and protect cells.' },

  { sym: 'Gi', name: 'Ginger root extract', short: 'Ginger', amount: '100 mg', form: 'standardized to 5% gingerols', group: 'gut',
    does: 'A time-tested botanical that supports digestive comfort.' },
  { sym: 'In', name: 'Inulin', amount: '2 g', group: 'gut',
    does: 'A prebiotic fiber that feeds good gut bacteria and supports regularity.' },
];

const sans = "'Montserrat', sans-serif";
const serif = "'Instrument Serif', serif";

/**
 * What's inside, set like a periodic table: one tile per ingredient, tinted by family.
 * Point at a tile (or tap it, or tab to it) and the card beside the table says how much
 * is in a stick and what it does.
 */
export function Elements() {
  const [picked, setPicked] = useState(2); // magnesium, to start
  const el = ELEMENTS[picked];

  return (
    <section className="max-w-4xl mx-auto mt-20 md:mt-24" aria-labelledby="inside-heading">
      <div className="text-center">
        <Kicker>What&rsquo;s inside</Kicker>
        <span id="inside-heading"><Heading>The GALOP table of elements.</Heading></span>
        <p style={{ fontFamily: sans, fontSize: '0.95rem', fontWeight: 500, color: INK, lineHeight: 1.6, margin: '-0.5rem auto 0', maxWidth: '34rem' }}>
          <span className="hidden md:inline">Hover over</span><span className="md:hidden">Tap</span> an ingredient to see what it does.
        </p>
      </div>

      {/* key */}
      <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-6" style={{ listStyle: 'none', padding: 0 }}>
        {Object.values(GROUPS).map((g) => (
          <li key={g.label} className="flex items-center"
              style={{ fontFamily: sans, fontSize: '0.7rem', fontWeight: 600, color: INK, letterSpacing: '0.04em' }}>
            <span aria-hidden="true" style={{ width: '0.85rem', height: '0.85rem', borderRadius: '3px', background: g.tint, border: '1px solid rgba(143, 18, 25, 0.25)', marginRight: '0.45rem' }} />
            {g.label}
          </li>
        ))}
      </ul>

      <div className="grid gap-6 md:gap-8 md:grid-cols-[minmax(0,1fr)_19rem] items-start mt-6">
        {/* the table */}
        <div className="grid" style={{ gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 'clamp(5px, 1.2vw, 9px)' }}>
          {ELEMENTS.map((e, i) => {
            const on = i === picked;
            return (
              <button key={e.sym} type="button" className="el-tile" aria-pressed={on}
                      aria-label={`${e.name}, ${e.amount}`}
                      onClick={() => setPicked(i)}
                      onFocus={() => setPicked(i)}
                      onPointerEnter={(ev) => { if (ev.pointerType === 'mouse') setPicked(i); }}
                      style={{
                        position: 'relative', aspectRatio: '1', minWidth: 0, padding: 0, cursor: 'pointer',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        borderRadius: '6px', border: `1.5px solid ${on ? RED : 'rgba(143, 18, 25, 0.22)'}`,
                        background: on ? RED : GROUPS[e.group].tint, color: on ? '#ffffff' : INK,
                        transform: on ? 'scale(1.06)' : 'none', zIndex: on ? 1 : 0,
                        boxShadow: on ? '0 8px 16px rgba(236, 29, 39, 0.28)' : 'none',
                        transition: 'transform 0.15s ease, background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease',
                      }}>
                <span aria-hidden="true" className="hidden sm:block"
                      style={{ position: 'absolute', top: '5px', left: '7px', fontFamily: sans, fontSize: '0.58rem', fontWeight: 600, opacity: 0.8, whiteSpace: 'nowrap' }}>
                  {e.amount.length > 11 ? '' : e.amount}
                </span>
                <span aria-hidden="true" style={{ fontFamily: serif, fontWeight: 600, fontSize: 'clamp(1.35rem, 5.2vw, 2.3rem)', lineHeight: 1 }}>
                  {e.sym}
                </span>
                <span aria-hidden="true"
                      style={{ marginTop: '0.2em', fontFamily: sans, fontWeight: 600, fontSize: 'clamp(0.5rem, 1.5vw, 0.68rem)', lineHeight: 1.1, maxWidth: '100%', padding: '0 1px', letterSpacing: '-0.03em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {e.short ?? e.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* what the picked one does */}
        <div className="md:sticky md:top-8">
        <div className="cut" aria-live="polite"
             style={{
               padding: 'clamp(22px, 4vw, 30px)', minHeight: '15.5rem',
               ['--cut' as string]: '20px', ['--bw' as string]: '1px',
               ['--line' as string]: 'rgba(236, 29, 39, 0.2)', ['--fill' as string]: '#ffffff',
             } as CSSProperties}>
          <span aria-hidden="true" className="cut-shadow"
                style={{ ['--shadow' as string]: '0 18px 30px rgba(30, 60, 90, 0.12), 0 2px 4px rgba(30, 60, 90, 0.05)' } as CSSProperties} />
          <p className="flex items-center"
             style={{ fontFamily: sans, fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.16em', color: INK, margin: 0 }}>
            <span aria-hidden="true" style={{ width: '0.85rem', height: '0.85rem', borderRadius: '3px', background: GROUPS[el.group].tint, border: '1px solid rgba(143, 18, 25, 0.25)', marginRight: '0.5rem', flexShrink: 0 }} />
            {GROUPS[el.group].label}
          </p>
          <h3 style={{ fontFamily: serif, fontWeight: 600, fontSize: 'clamp(1.9rem, 4vw, 2.3rem)', lineHeight: 1.05, color: RED, margin: '0.6rem 0 0.2rem' }}>
            {el.name}
          </h3>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: '1.15rem', lineHeight: 1.3, color: INK, margin: 0 }}>
            {el.amount}{el.form ? `, ${el.form}` : ''}
          </p>
          <span aria-hidden="true" style={{ display: 'block', width: '2.4rem', height: '1.5px', background: RED, margin: '0.9rem 0' }} />
          <p style={{ fontFamily: sans, fontSize: '0.95rem', fontWeight: 500, lineHeight: 1.6, color: INK, margin: 0 }}>
            {el.does}*
          </p>
        </div>
        </div>
      </div>

      <p className="text-center"
         style={{ fontFamily: sans, fontSize: '0.82rem', fontWeight: 500, color: INK, lineHeight: 1.6, margin: '1.75rem auto 0', maxWidth: '36rem' }}>
        Naturally sweetened with stevia and monk fruit, with natural lemon flavor. No sugar. No known major allergens.
      </p>
    </section>
  );
}
