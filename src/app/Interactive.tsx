import { useId, useState, type ReactNode } from 'react';
import { RED, BLUE, INK } from './Layout';

/**
 * Card that turns over on click / tap / Enter to show its back. No label: on
 * hover it starts to turn (and on touch screens it does one small peek), which
 * says "I flip" by itself. Both faces share one grid cell, so the card is as
 * tall as the taller face and nothing jumps. Reduced motion gets a crossfade.
 * Matte white paper on the front, page blue on the back.
 */
export function FlipCard({ front, back }: { front: ReactNode; back: ReactNode }) {
  const [flipped, setFlipped] = useState(false);
  const face = {
    gridArea: '1 / 1',
    position: 'relative' as const,
    borderRadius: '22px',
    padding: '26px 22px 28px',
    textAlign: 'left' as const,
  };
  return (
    <button type="button" className={`flip-card${flipped ? ' is-flipped' : ''}`} data-fizz="5"
            aria-pressed={flipped} onClick={() => setFlipped((f) => !f)}>
      <span className="flip-inner">
        <span className="flip-face" aria-hidden={flipped}
              style={{ ...face, background: '#ffffff', color: RED }}>
          <span style={{ position: 'relative', zIndex: 2, display: 'block' }}>{front}</span>
        </span>
        <span className="flip-face flip-back" aria-hidden={!flipped}
              style={{ ...face, background: BLUE, color: RED }}>
          <span style={{ position: 'relative', zIndex: 2, display: 'block' }}>{back}</span>
        </span>
      </span>
    </button>
  );
}

/** Shared type styles for flip-card faces. */
export const CardTitle = ({ children }: { children: ReactNode }) => (
  <span style={{ display: 'block', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 600, lineHeight: 1.1 }}>
    {children}
  </span>
);
export const CardText = ({ children }: { children: ReactNode }) => (
  <span style={{ display: 'block', marginTop: '0.6rem', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', fontWeight: 500, color: INK, lineHeight: 1.6 }}>
    {children}
  </span>
);
export const CardKicker = ({ children }: { children: ReactNode }) => (
  <span style={{ display: 'block', marginBottom: '0.35rem', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: '1.15rem', lineHeight: 1, color: INK }}>
    {children}
  </span>
);

/**
 * Smooth accordion. `cards`: each item is its own white rounded card (FAQ
 * page); `lines`: hairline-separated rows (product details).
 */
export function Accordion({ items, variant = 'lines', defaultOpen = -1 }:
  { items: [string, ReactNode][]; variant?: 'cards' | 'lines'; defaultOpen?: number }) {
  const [open, setOpen] = useState<Set<number>>(() => new Set(defaultOpen >= 0 ? [defaultOpen] : []));
  const baseId = useId();
  const toggle = (i: number) => setOpen((prev) => {
    const next = new Set(prev);
    if (next.has(i)) next.delete(i); else next.add(i);
    return next;
  });
  const cards = variant === 'cards';

  return (
    <div className={cards ? 'grid gap-3' : ''}>
      {items.map(([q, a], i) => {
        const isOpen = open.has(i);
        const panelId = `${baseId}-${i}`;
        return (
          <div key={q} className={`acc-item${cards ? ' acc-card' : ''}${isOpen ? ' is-open' : ''}`}
               style={cards
                 ? { background: isOpen ? '#ffffff' : 'rgba(255,255,255,0.65)', borderRadius: '18px',
                     border: `2px solid ${isOpen ? RED : 'rgba(239, 42, 48, 0.16)'}`, position: 'relative' }
                 : { borderTop: '1px solid rgba(239, 42, 48, 0.2)' }}>
            <button type="button" className="acc-trigger" aria-expanded={isOpen} aria-controls={panelId}
                    onClick={() => toggle(i)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
                      textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', color: INK,
                      padding: cards ? '20px 22px' : '14px 2px',
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: cards ? 'clamp(1.25rem, 2.6vw, 1.5rem)' : 'clamp(1.15rem, 2.4vw, 1.3rem)',
                      fontWeight: 600, lineHeight: 1.2,
                    }}>
              {q}
              <span className="acc-icon" aria-hidden="true"
                    style={{
                      flexShrink: 0, width: '1.9rem', height: '1.9rem', borderRadius: '9999px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: isOpen ? RED : 'rgba(239, 42, 48, 0.1)', color: isOpen ? '#ffffff' : RED,
                      fontFamily: 'Inter, sans-serif', fontSize: '1.15rem', fontWeight: 500, lineHeight: 1,
                    }}>
                +
              </span>
            </button>
            <div id={panelId} role="region" className="acc-panel" aria-hidden={!isOpen}>
              <div style={{ overflow: 'hidden' }}>
                <p style={{
                     fontFamily: 'Inter, sans-serif', fontSize: cards ? '0.95rem' : '0.9rem', fontWeight: 400,
                     color: INK, lineHeight: 1.65, margin: 0,
                     padding: cards ? '0 22px 22px' : '0 2px 16px',
                   }}>
                  {a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
      {!cards && <div style={{ borderTop: '1px solid rgba(239, 42, 48, 0.2)' }} />}
    </div>
  );
}
