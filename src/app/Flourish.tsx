import type { CSSProperties, ReactNode } from 'react';
import { RED, LEMON } from './Layout';
import horseImage from "../imports/galop-horse.png";

/** Hairline — horse mark — hairline section divider. */
export const Divider = ({ className = '' }: { className?: string }) => (
  <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
    <span style={{ height: '1px', width: 'clamp(3rem, 12vw, 8rem)', background: 'rgba(239, 42, 48, 0.35)' }} />
    <img src={horseImage} alt="" style={{ width: '2.1rem', height: 'auto', opacity: 0.9 }} />
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

/** Space each • evenly, including the one where the text loops back to its start. */
const BADGE_DOT = '   •   ';
const spaceDots = (text: string) =>
  text.split('•').map((s) => s.trim()).filter(Boolean).map((s) => s + BADGE_DOT).join('');

/** Slowly spinning circular text badge with the horse mark in the middle. */
export const SpinBadge = ({ text, size = '6.5rem', style }: { text: string; size?: string; style?: CSSProperties }) => (
  <div aria-hidden="true" style={{ position: 'relative', width: size, height: size, ...style }}>
    <svg viewBox="0 0 100 100" width="100%" height="100%" className="spin-slow" style={{ display: 'block' }}>
      <defs>
        <path id="galop-badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
      </defs>
      <circle cx="50" cy="50" r="49" fill={RED} />
      {/* textLength = the circle's circumference (2π·38), so the text wraps exactly once with no overlap */}
      <text fill="#ffffff" fontFamily="Inter, sans-serif" fontSize="7.6" fontWeight="700">
        <textPath href="#galop-badge-circle" textLength="238.7" lengthAdjust="spacing">{spaceDots(text)}</textPath>
      </text>
    </svg>
    <img src={horseImage} alt=""
         style={{
           position: 'absolute', left: '50%', top: '50%', width: '42%', height: 'auto',
           transform: 'translate(-50%, -50%)', filter: 'brightness(0) invert(1)'
         }} />
  </div>
);

/** A soft, diffuse glow of lemon light behind a word, like sun through a glass of lemonade. */
export const Lemon = ({ children }: { children: ReactNode }) => (
  <span style={{ position: 'relative', display: 'inline-block', isolation: 'isolate' }}>
    <span aria-hidden="true" style={{
      position: 'absolute', inset: '-0.35em -0.45em', zIndex: -1, borderRadius: '9999px', filter: 'blur(6px)',
      background: 'radial-gradient(ellipse at 50% 55%, rgba(255, 240, 122, 0.85) 0%, rgba(255, 244, 160, 0.45) 45%, rgba(255, 248, 194, 0) 72%)'
    }} />
    {children}
  </span>
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

// [left %, size px, duration s, delay s, sway px, rise px, opacity, lemon?]
const AMBIENT: [number, number, number, number, number, number, number, boolean][] = [
  [6, 14, 11, 0, 14, -420, 0.85, false], [14, 9, 9, 3.5, -10, -380, 0.8, true], [24, 18, 13, 1.2, 18, -460, 0.7, false],
  [38, 10, 10, 6, -12, -400, 0.8, true], [52, 13, 12, 2.4, 10, -440, 0.75, false], [63, 8, 8, 4.8, -8, -360, 0.85, true],
  [74, 16, 14, 0.6, -16, -470, 0.7, false], [84, 10, 9.5, 5.5, 12, -390, 0.8, true], [93, 12, 12.5, 2.9, -14, -430, 0.75, false],
];

/** Slow, faint bubbles drifting up behind a section, like a fresh glass. Place inside a `position: relative` box. */
export const AmbientFizz = () => (
  <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
    {AMBIENT.map(([left, size, dur, delay, sway, rise, op, lemon], i) => (
      <span key={i} className="ambient-bubble"
            style={{
              left: `${left}%`, width: `${size}px`, height: `${size}px`,
              background: lemon
                ? 'radial-gradient(circle at 32% 30%, #ffffff 0%, rgba(255, 244, 150, 0.85) 55%, rgba(255, 236, 110, 0.7) 100%)'
                : 'radial-gradient(circle at 32% 30%, #ffffff 0%, rgba(255, 255, 255, 0.35) 55%, rgba(255, 255, 255, 0.15) 100%)',
              ['--dur' as string]: `${dur}s`, ['--delay' as string]: `${delay}s`, ['--sway' as string]: `${sway}px`,
              ['--rise' as string]: `${rise}px`, ['--op' as string]: op,
            } as CSSProperties} />
    ))}
  </div>
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
