import type { CSSProperties, ReactNode } from 'react';
import { RED } from './Layout';
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

/** Slowly spinning circular text badge with the horse mark in the middle. */
export const SpinBadge = ({ text, size = '6.5rem', style }: { text: string; size?: string; style?: CSSProperties }) => (
  <div aria-hidden="true" style={{ position: 'relative', width: size, height: size, ...style }}>
    <svg viewBox="0 0 100 100" width="100%" height="100%" className="spin-slow" style={{ display: 'block' }}>
      <defs>
        <path id="galop-badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
      </defs>
      <circle cx="50" cy="50" r="49" fill={RED} />
      <text fill="#ffffff" fontFamily="Inter, sans-serif" fontSize="9.2" fontWeight="700" letterSpacing="2.2">
        <textPath href="#galop-badge-circle">{text}</textPath>
      </text>
    </svg>
    <img src={horseImage} alt=""
         style={{
           position: 'absolute', left: '50%', top: '50%', width: '42%', height: 'auto',
           transform: 'translate(-50%, -50%)', filter: 'brightness(0) invert(1)'
         }} />
  </div>
);

/** Floating prop image (sticker) with a gentle bob. */
export const Sticker = ({ src, alt = '', width, rotate = -8, style }: { src: string; alt?: string; width: string; rotate?: number; style?: CSSProperties }) => (
  <img src={src} alt={alt} aria-hidden={alt ? undefined : true} className="float-slow"
       style={{ width, height: 'auto', transform: `rotate(${rotate}deg)`, filter: 'drop-shadow(0 10px 18px rgba(30, 60, 90, 0.18))', ...style }} />
);

/** Gift-wrap gloss sweep. Place inside any `position: relative` box; stagger with `delay`. */
export const Gloss = ({ delay = 0 }: { delay?: number }) => (
  <div aria-hidden="true" className="gloss-layer" style={{ ['--gloss-delay' as string]: `${delay}s` } as CSSProperties} />
);
