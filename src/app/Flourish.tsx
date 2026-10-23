import type { CSSProperties, ReactNode } from 'react';
import { RED, LEMON } from './Layout';
import horseImage from "../imports/galop-horse.png";

/** Hairline — horse mark — hairline section divider. */
export const Divider = ({ className = '' }: { className?: string }) => (
  <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
    <span style={{ height: '1px', width: 'clamp(3rem, 12vw, 8rem)', background: 'rgba(239, 42, 48, 0.35)' }} />
    <img src={horseImage} alt="" width={278} height={230} style={{ width: '2.1rem', height: 'auto', opacity: 0.9 }} />
    <span style={{ height: '1px', width: 'clamp(3rem, 12vw, 8rem)', background: 'rgba(239, 42, 48, 0.35)' }} />
  </div>
);

/** Handwritten Caveat aside — the "(with electrolytes!)" energy, reusable. */
export const Note = ({ children, rotate = -6, style }: { children: ReactNode; rotate?: number; style?: CSSProperties }) => (
  <span aria-hidden="true"
        style={{
          display: 'inline-block',
          fontFamily: "'Caveat', cursive",
          fontWeight: 600,
          fontSize: 'clamp(1.25rem, 2.6vw, 1.7rem)',
          lineHeight: 1,
          color: RED,
          transform: `rotate(${rotate}deg)`,
          whiteSpace: 'nowrap',
          ...style,
        }}>
    {children}
  </span>
);

/**
 * A soft pool of lemon light behind the packaging: no shapes, just glow.
 * Place as the first child of a `position: relative; isolation: isolate` box.
 */
export const PackagingGlow = () => (
  <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: -1, pointerEvents: 'none' }}>
    <span style={{
      position: 'absolute', left: '-14%', right: '-14%', top: '2%', bottom: '-10%', borderRadius: '9999px', filter: 'blur(36px)',
      background: 'radial-gradient(ellipse at 42% 58%, rgba(255, 240, 122, 0.6) 0%, rgba(255, 246, 170, 0.28) 45%, rgba(255, 248, 194, 0) 70%)'
    }} />
  </div>
);

/** Tiny lemon-slice icon. */
export const LemonSlice = ({ size = '1em' }: { size?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="11" fill="#FFE34D" />
    <circle cx="12" cy="12" r="9" fill="#FFF6B0" />
    {[0, 45, 90, 135].map((a) => (
      <line key={a} x1="12" y1="3.5" x2="12" y2="20.5" stroke="#FFE34D" strokeWidth="1.2" transform={`rotate(${a} 12 12)`} />
    ))}
    <circle cx="12" cy="12" r="1.4" fill="#ffffff" />
  </svg>
);

/** Floating prop image (sticker) with a gentle bob. */
export const Sticker = ({ src, alt = '', width, rotate = -8, style }: { src: string; alt?: string; width: string; rotate?: number; style?: CSSProperties }) => (
  <img src={src} alt={alt} aria-hidden={alt ? undefined : true} className="float-slow"
       style={{ width, height: 'auto', transform: `rotate(${rotate}deg)`, filter: 'drop-shadow(0 10px 18px rgba(30, 60, 90, 0.18))', ...style }} />
);

/** Soft gift-wrap glow: a broad highlight that slowly drifts and breathes. Place inside any `position: relative` box. */
export const Gloss = ({ delay = 0 }: { delay?: number }) => (
  <div aria-hidden="true" className="gloss-layer" style={{ ['--gloss-delay' as string]: `${delay}s` } as CSSProperties} />
);

/**
 * Gift-ribbon: a satin band running diagonally across a corner of its parent.
 * Parent must be `position: relative`; the ribbon clips itself to the parent's
 * rounded box without clipping the parent's other children.
 */
export const Ribbon = ({ corner = 'tl', tone = 'red', width = '20rem', offset = '2.6rem', className = '' }:
  { corner?: 'tl' | 'tr' | 'bl' | 'br'; tone?: 'red' | 'white'; width?: string; offset?: string; className?: string }) => (
  <div aria-hidden="true" className={className}
       style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 'inherit', pointerEvents: 'none', zIndex: 2 }}>
    <div style={{
      position: 'absolute', width,
      top: corner === 'tl' || corner === 'tr' ? offset : undefined,
      bottom: corner === 'bl' || corner === 'br' ? offset : undefined,
      left: corner === 'tl' || corner === 'bl' ? `calc(${width} / -2 + 1.2rem)` : undefined,
      right: corner === 'tr' || corner === 'br' ? `calc(${width} / -2 + 1.2rem)` : undefined,
      transform: corner === 'tl' || corner === 'br' ? 'rotate(-45deg)' : 'rotate(45deg)',
      background: tone === 'white'
        ? 'linear-gradient(180deg, #ffffff 0%, #fbfbfb 45%, #ececec 100%)'
        : 'linear-gradient(180deg, #f4444a 0%, #EF2A30 45%, #d81f25 100%)',
      height: '1.5rem', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.18)',
      overflow: 'hidden'
    }}>
      <Gloss delay={2} />
    </div>
  </div>
);
