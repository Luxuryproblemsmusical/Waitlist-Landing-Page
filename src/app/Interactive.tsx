import { useId, useRef, useState, type ReactNode } from 'react';
import { flushSync } from 'react-dom';
import type { CSSProperties } from 'react';
import { RED, INK } from './Layout';

/*
 * One turn of a flip card, run as two halves on the card itself: it speeds up to edge-on,
 * the sides swap while it's edge-on (so nothing can show through), then it slows to rest.
 * The two eases meet at the same speed, so there's no hitch at the swap. It always turns
 * the same way, like turning a card over in your hand. Only `transform` animates, so the
 * browser can run it off the main thread. Reduced motion: a quick crossfade instead.
 */
const HALF_TURN_MS = 290;
const EASE_TO_EDGE = 'cubic-bezier(0.55, 0, 0.75, 0.5)';
const EASE_FROM_EDGE = 'cubic-bezier(0.25, 0.5, 0.45, 1)';
const TURN: Keyframe[][] = [
  [{ transform: 'rotateY(0deg) scale(1)' }, { transform: 'rotateY(-90deg) scale(1.03)' }],
  [{ transform: 'rotateY(90deg) scale(1.03)' }, { transform: 'rotateY(0deg) scale(1)' }],
];
const FADE: Keyframe[][] = [[{ opacity: 1 }, { opacity: 0 }], [{ opacity: 0 }, { opacity: 1 }]];

/** Small turn-over arrow for the card's corner. */
const TurnIcon = () => (
  <svg viewBox="0 0 24 24" width="1.05em" height="1.05em" aria-hidden="true" fill="none" stroke="currentColor"
       strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M20.5 14.5a8.5 8.5 0 1 1-2.2-8.2L21 9" />
    <path d="M21 3.5V9h-5.5" />
  </svg>
);

/** One side of a flip card: numeral, then its title and text, and the turn-over line at the foot. */
const Face = ({ numeral, hidden, children }: { numeral: string; hidden: boolean; children: ReactNode }) => (
  <span className="flip-face" aria-hidden={hidden} style={{ visibility: hidden ? 'hidden' : 'visible' }}>
    <span className="cut" aria-hidden="true"
          style={{ position: 'absolute', inset: '7px', pointerEvents: 'none', ['--cut' as string]: '12px', ['--bw' as string]: '1px',
                   ['--line' as string]: 'rgba(236, 29, 39, 0.22)', ['--fill' as string]: '#ffffff' } as CSSProperties} />
    <span style={{ position: 'relative', display: 'block' }}>
      <CardKicker>{numeral}</CardKicker>
      {children}
    </span>
    <span className="flip-hint"><TurnIcon />Turn over</span>
  </span>
);

/**
 * A card that turns over on click / tap / Enter to show its other side. Both sides are
 * white tag-cut cards with the stationery keyline, set the same way (numeral, title,
 * text, "Turn over" at the foot), and share one grid cell, so the card is as tall as its
 * longer side and nothing jumps when it turns.
 */
export function FlipCard({ numeral, front, back }: { numeral: string; front: ReactNode; back: ReactNode }) {
  const [flipped, setFlipped] = useState(false);
  const card = useRef<HTMLSpanElement>(null);
  const turning = useRef(false);
  const queued = useRef(false);

  const turn = async () => {
    const el = card.current;
    if (!el) return;
    // a click mid-turn is kept and played straight after, so every click is exactly one turn
    if (turning.current) { queued.current = true; return; }
    if (!el.animate) { setFlipped((f) => !f); return; }
    turning.current = true;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const [toEdge, fromEdge] = still ? FADE : TURN;
    try {
      // `fill` holds it edge-on until the second half has started, so no frame shows the old side square-on.
      const first = el.animate(toEdge, { duration: still ? 120 : HALF_TURN_MS, easing: still ? 'ease-in' : EASE_TO_EDGE, fill: 'forwards' });
      await first.finished;
      flushSync(() => setFlipped((f) => !f));
      const second = el.animate(fromEdge, { duration: still ? 160 : HALF_TURN_MS, easing: still ? 'ease-out' : EASE_FROM_EDGE });
      first.cancel();
      await second.finished;
    } catch { /* interrupted, e.g. by leaving the page */ }
    turning.current = false;
    if (queued.current) { queued.current = false; turn(); }
  };

  return (
    <button type="button" className="flip-card" aria-pressed={flipped} onClick={turn}>
      <span className="flip-stage">
        <span ref={card} className="flip-turn">
          <span className="flip-shadow" aria-hidden="true" />
          <Face numeral={numeral} hidden={flipped}>{front}</Face>
          <Face numeral={numeral} hidden={!flipped}>{back}</Face>
        </span>
      </span>
    </button>
  );
}

/** Shared type styles for flip-card faces. */
export const CardTitle = ({ children }: { children: ReactNode }) => (
  <span style={{ display: 'block', fontFamily: "'Instrument Serif', serif", fontSize: '1.6rem', fontWeight: 600, lineHeight: 1.1 }}>
    {children}
  </span>
);
export const CardText = ({ children }: { children: ReactNode }) => (
  <span style={{ display: 'block', marginTop: '0.6rem', fontFamily: "'Montserrat', sans-serif", fontSize: '0.9rem', fontWeight: 500, color: INK, lineHeight: 1.6 }}>
    {children}
  </span>
);
export const CardKicker = ({ children }: { children: ReactNode }) => (
  <span style={{ display: 'block', marginBottom: '0.35rem', fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 500, fontSize: '1.15rem', lineHeight: 1, color: INK }}>
    {children}
  </span>
);

/**
 * Smooth accordion. `cards`: each item is its own tag-cut card (FAQ page);
 * `lines`: hairline-separated rows (product details). A fine plus closes to a minus when open.
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
          <div key={q} className={`acc-item${cards ? ' acc-card cut' : ''}${isOpen ? ' is-open' : ''}`}
               style={cards
                 ? { ['--cut' as string]: '16px', ['--bw' as string]: '2px',
                     ['--line' as string]: isOpen ? RED : 'rgba(236, 29, 39, 0.16)',
                     // opaque on purpose: a see-through fill lets the outline layer under it tint the card pink
                     ['--fill' as string]: isOpen ? '#ffffff' : '#f5faff' } as CSSProperties
                 : { borderTop: '1px solid rgba(236, 29, 39, 0.2)' }}>
            {cards && <span aria-hidden="true" className="cut-shadow"
                            style={{ ['--shadow' as string]: '0 8px 16px rgba(30, 60, 90, 0.1)' } as CSSProperties} />}
            <button type="button" className="acc-trigger" aria-expanded={isOpen} aria-controls={panelId}
                    onClick={() => toggle(i)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
                      textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', color: INK,
                      padding: cards ? '20px 22px' : '14px 2px',
                      fontFamily: "'Instrument Serif', serif",
                      fontSize: cards ? 'clamp(1.25rem, 2.6vw, 1.5rem)' : 'clamp(1.15rem, 2.4vw, 1.3rem)',
                      fontWeight: 600, lineHeight: 1.2,
                    }}>
              {q}
              <span aria-hidden="true"
                    style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '1.9rem', height: '1.9rem', color: RED }}>
                <span className="acc-icon" />
              </span>
            </button>
            <div id={panelId} role="region" className="acc-panel" aria-hidden={!isOpen}>
              <div style={{ overflow: 'hidden' }}>
                <p style={{
                     fontFamily: "'Montserrat', sans-serif", fontSize: cards ? '0.95rem' : '0.9rem', fontWeight: 400,
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
      {!cards && <div style={{ borderTop: '1px solid rgba(236, 29, 39, 0.2)' }} />}
    </div>
  );
}
