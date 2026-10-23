import type { CSSProperties, ReactNode } from 'react';
import { RED } from './Layout';
import horseImage from "../imports/galop-horse.png";

/** Hairline — horse mark — hairline section divider. */
export const Divider = ({ className = '' }: { className?: string }) => (
  <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
    <span style={{ height: '1px', width: 'clamp(3rem, 12vw, 8rem)', background: 'rgba(236, 29, 39, 0.35)' }} />
    <img src={horseImage} alt="" width={278} height={230} style={{ width: '2.1rem', height: 'auto', opacity: 0.9 }} />
    <span style={{ height: '1px', width: 'clamp(3rem, 12vw, 8rem)', background: 'rgba(236, 29, 39, 0.35)' }} />
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
 * A pearly sheen round the pouch's arch: a soft white glow, and a glint that slowly travels
 * round the rim. Goes first inside the arch's position:relative wrapper, so the frame sits on it.
 */
export const ArchSheen = ({ radius }: { radius: string }) => (
  <div aria-hidden="true" className="arch-sheen" style={{ borderRadius: radius }} />
);

/**
 * House stationery: a white tag-cut card with a thin red keyline inside its edge. Used for
 * Sydney's note on the home page and her full letter, so the two always match.
 */
export const Stationery = ({ children, className = '', style }: { children: ReactNode; className?: string; style?: CSSProperties }) => (
  <div className={`founder-note cut ${className}`}
       style={{
         ['--cut' as string]: '26px', ['--line' as string]: '#ffffff', ['--fill' as string]: '#ffffff',
         filter: 'drop-shadow(0 22px 34px rgba(30, 60, 90, 0.12)) drop-shadow(0 2px 4px rgba(30, 60, 90, 0.05))',
         ...style,
       } as CSSProperties}>
    <span aria-hidden="true" className="cut"
          style={{ position: 'absolute', inset: '12px', pointerEvents: 'none',
                   ['--cut' as string]: '18px', ['--bw' as string]: '1px', ['--line' as string]: 'rgba(236, 29, 39, 0.2)', ['--fill' as string]: '#ffffff' } as CSSProperties} />
    {children}
  </div>
);

/** Taped, tilted polaroid with a handwritten caption; straightens when its Stationery is hovered. */
export const Polaroid = ({ src, alt, caption, width = 'clamp(9.5rem, 20vw, 12.5rem)', className = '', style }:
  { src: string; alt: string; caption: string; width?: string; className?: string; style?: CSSProperties }) => (
  <figure className={`polaroid ${className}`} style={{ position: 'relative', zIndex: 2, margin: 0, ...style }}>
    <span aria-hidden="true" className="polaroid-tape" />
    <img src={src} alt={alt} style={{ display: 'block', width, aspectRatio: '1', objectFit: 'cover' }} />
    <figcaption style={{ fontFamily: "'Caveat', cursive", fontSize: '1.35rem', fontWeight: 600, color: RED, textAlign: 'center', marginTop: '0.55rem', lineHeight: 1 }}>
      {caption}
    </figcaption>
  </figure>
);

/**
 * A horseshoe: a near-round band whose arms curl in toward the opening, with nail holes
 * (open end up, the lucky way).
 * Used for list bullets and the FAQ toggle. Inherits the text color.
 */
export const Horseshoe = ({ size = '1em', style, className }: { size?: string; style?: CSSProperties; className?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className={className}
       style={{ flexShrink: 0, ...style }}>
    <path fill="currentColor" fillRule="evenodd"
          d="M17.31 4.62A9.5 9.5 0 1 1 6.69 4.62L8.98 8.02A5.4 5.4 0 1 0 15.02 8.02ZM17.07 7.91a.8.8 0 1 0 1.6 0a.8.8 0 1 0-1.6 0zM18.54 13.79a.8.8 0 1 0 1.6 0a.8.8 0 1 0-1.6 0zM15.15 18.82a.8.8 0 1 0 1.6 0a.8.8 0 1 0-1.6 0zM5.33 7.91a.8.8 0 1 0 1.6 0a.8.8 0 1 0-1.6 0zM3.86 13.79a.8.8 0 1 0 1.6 0a.8.8 0 1 0-1.6 0zM7.25 18.82a.8.8 0 1 0 1.6 0a.8.8 0 1 0-1.6 0z" />
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
        : 'linear-gradient(180deg, #f03138 0%, #ec1d27 45%, #d51720 100%)',
      height: '1.5rem', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.18)',
      overflow: 'hidden'
    }}>
      <Gloss delay={2} />
    </div>
  </div>
);
