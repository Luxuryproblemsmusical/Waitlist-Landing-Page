import { useEffect, type ReactNode } from 'react';
import horseImage from "../imports/galop-horse.png";

export const RED = '#EF2A30';
export const BLUE = '#cbeafe';

/** Tiny white horse mark used as the separator in the marquee banners. */
const MarqueeHorse = () => (
  <img src={horseImage} alt="" aria-hidden="true"
       style={{
         display: 'inline-block',
         height: '1.15em',
         width: 'auto',
         verticalAlign: '-0.2em',
         margin: '0 1.1rem',
         filter: 'brightness(0) invert(1)',
         opacity: 0.95,
       }} />
);

/** Small dot separator. */
export const Dot = ({ opacity = 0.85 }: { opacity?: number }) => (
  <svg
    viewBox="0 0 10 10"
    width="0.4em"
    height="0.4em"
    aria-hidden="true"
    style={{
      display: 'inline-block',
      verticalAlign: '0.15em',
      margin: '0 1.25rem',
      fill: 'currentColor',
      opacity,
    }}
  >
    <circle cx="5" cy="5" r="5" />
  </svg>
);

const Marquee = ({ position }: { position: 'top' | 'bottom' }) => (
  <div style={{
    width: '100vw',
    marginLeft: 'calc(50% - 50vw)',
    marginRight: 'calc(50% - 50vw)',
    background: RED,
    color: '#ffffff',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    padding: position === 'top' ? '8px 0' : '10px 0',
    marginBottom: position === 'top' ? 'clamp(12px, 2vw, 24px)' : 0,
    borderBottom: position === 'top' ? '1px solid rgba(0,0,0,0.05)' : undefined,
    borderTop: position === 'bottom' ? '1px solid rgba(0,0,0,0.05)' : undefined,
  }}>
    <div style={{
      display: 'inline-block',
      animation: 'marquee 30s linear infinite',
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: '0.95rem',
      letterSpacing: '0.25em',
      textTransform: 'uppercase',
      fontWeight: 500
    }}>
      {Array.from({ length: 10 }).map((_, i) => (
        <span key={i} style={{ marginRight: '3rem' }}>
          Launching Soon <MarqueeHorse /> Join the Waitlist <MarqueeHorse />
        </span>
      ))}
    </div>
  </div>
);

export const NAV_LINKS = [
  { href: '/', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'Q&A' },
  { href: '/advisors', label: 'Advisors' },
];

const Nav = ({ current }: { current: string }) => (
  <nav aria-label="Main"
       className="w-full max-w-4xl flex flex-wrap items-center justify-center sm:justify-between gap-x-6 gap-y-2"
       style={{ padding: '4px 0 0' }}>
    <a href="/" aria-label="GALOP home"
       style={{
         fontFamily: "'Cormorant Garamond', serif",
         fontWeight: 600,
         color: RED,
         fontSize: '1.5rem',
         letterSpacing: '0.02em',
         textDecoration: 'none',
         lineHeight: 1
       }}>
      GALOP
    </a>
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
      {NAV_LINKS.map((l) => {
        const active = l.href === current;
        return (
          <a key={l.href} href={l.href}
             aria-current={active ? 'page' : undefined}
             style={{
               fontFamily: 'Inter, sans-serif',
               fontSize: '0.72rem',
               fontWeight: 700,
               color: RED,
               textTransform: 'uppercase',
               letterSpacing: '0.2em',
               textDecoration: 'none',
               borderBottom: active ? `2px solid ${RED}` : '2px solid transparent',
               paddingBottom: '2px',
               opacity: active ? 1 : 0.8
             }}>
            {l.label}
          </a>
        );
      })}
    </div>
  </nav>
);

const Footer = () => (
  <footer className="max-w-2xl mx-auto mt-24 pb-10 text-center"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.75rem',
            lineHeight: 1.6,
            color: 'rgba(239, 42, 48, 0.7)',
            letterSpacing: '0.02em'
          }}>
    <p>© {new Date().getFullYear()} GALOP. All rights reserved.</p>
    <p style={{ marginTop: '0.5rem' }} className="flex flex-wrap justify-center gap-x-5 gap-y-1">
      {NAV_LINKS.map((l) => (
        <a key={l.href} href={l.href}
           style={{ color: 'rgba(239, 42, 48, 0.85)', textDecoration: 'underline', textUnderlineOffset: '0.2em' }}>
          {l.label}
        </a>
      ))}
      <a href="/privacy.html"
         style={{ color: 'rgba(239, 42, 48, 0.85)', textDecoration: 'underline', textUnderlineOffset: '0.2em' }}>
        Privacy Policy
      </a>
    </p>
    <p style={{ marginTop: '1rem', opacity: 0.8, fontSize: '0.68rem', lineHeight: 1.5 }}>
      These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
    </p>
  </footer>
);

/** Shared page chrome: marquees, nav, footer, brand background, and keyframes. */
export function Layout({ title, current, children }: { title: string; current: string; children: ReactNode }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-6 pt-0 pb-12"
         style={{ background: BLUE, fontFamily: 'Inter, sans-serif' }}>
      <Marquee position="top" />
      <Nav current={current} />

      <div className="w-full max-w-4xl">
        {children}
        <Footer />
      </div>

      <Marquee position="bottom" />

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          33% { transform: translateY(-15px) rotate(1deg); }
          66% { transform: translateY(-8px) rotate(-1deg); }
        }
        @keyframes floatSlow {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 -10px; }
        }
        @keyframes spinSlow {
          to { rotate: 360deg; }
        }
        @keyframes glossDrift {
          0%   { transform: translate3d(-22%, -10%, 0); opacity: 0.25; }
          50%  { opacity: 1; }
          100% { transform: translate3d(22%, 10%, 0); opacity: 0.25; }
        }
        /* Gift-wrap gloss: a broad, soft highlight that slowly drifts and breathes.
           Drop <Gloss/> inside any position:relative box. */
        .gloss-layer {
          position: absolute; inset: 0; overflow: hidden; border-radius: inherit;
          pointer-events: none; z-index: 1;
          /* faint static specular so surfaces read glossy even between drifts */
          background: linear-gradient(115deg, rgba(255,255,255,0) 55%, rgba(255,255,255,0.07) 75%, rgba(255,255,255,0) 95%);
        }
        .gloss-layer::after {
          content: ''; position: absolute; inset: -35%;
          background: linear-gradient(115deg, rgba(255,255,255,0) 28%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.16) 50%, rgba(255,255,255,0.06) 60%, rgba(255,255,255,0) 72%);
          animation: glossDrift 13s ease-in-out infinite alternate;
          /* negative delay = start mid-cycle, so every piece is at a different phase */
          animation-delay: calc(var(--gloss-delay, 0s) * -1);
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          6%  { opacity: 1; transform: scale(1) rotate(25deg); }
          14% { opacity: 0; transform: scale(0.15) rotate(60deg); }
        }
        .sparkle {
          position: absolute; width: var(--s, 10px); height: var(--s, 10px);
          margin: calc(var(--s, 10px) / -2) 0 0 calc(var(--s, 10px) / -2);
          opacity: 0; transform-origin: center;
          filter: drop-shadow(0 0 3px currentColor);
          animation: twinkle 7s ease-in-out infinite;
          animation-delay: var(--d, 0s);
        }
        .animate-fade-in { animation: fadeIn 0.6s ease-out; }
        .float-slow { animation: floatSlow 5s ease-in-out infinite; }
        .spin-slow { animation: spinSlow 16s linear infinite; }
        .lift { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .lift:hover { transform: translateY(-4px); }
        input::placeholder { color: rgba(45, 55, 72, 0.5); }
        .galop-details summary::-webkit-details-marker { display: none; }
        .galop-details[open] .plus { transform: rotate(45deg); }
        @media (prefers-reduced-motion: reduce) {
          .float-slow, .spin-slow, .animate-float { animation: none !important; }
          .gloss-layer::after, .sparkle { animation: none !important; display: none; }
        }
      `}</style>
    </div>
  );
}

/** Uppercase red kicker used above section headings. */
export const Kicker = ({ children }: { children: ReactNode }) => (
  <p className="mb-4"
     style={{
       fontFamily: 'Inter, sans-serif',
       fontSize: '0.8rem',
       fontWeight: 700,
       color: RED,
       textTransform: 'uppercase',
       letterSpacing: '0.22em',
       opacity: 0.85
     }}>
    {children}
  </p>
);

/** Serif section heading. */
export const Heading = ({ children, size = 'md' }: { children: ReactNode; size?: 'md' | 'lg' }) => (
  <h2 className="mb-6"
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: size === 'lg' ? 'clamp(2.5rem, 7vw, 4.25rem)' : 'clamp(2rem, 4vw, 2.75rem)',
        fontWeight: 600,
        color: RED,
        letterSpacing: '-0.01em',
        lineHeight: 1.1
      }}>
    {children}
  </h2>
);
