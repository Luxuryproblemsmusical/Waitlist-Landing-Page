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

/** Static launch-offer bar at the very top of every page. */
const OfferBar = () => (
  <div style={{
    width: '100vw',
    marginLeft: 'calc(50% - 50vw)',
    marginRight: 'calc(50% - 50vw)',
    marginBottom: 'clamp(12px, 2vw, 24px)',
    background: RED,
    color: '#ffffff',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
    padding: '9px 16px',
  }}>
    <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center"
       style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.04em', lineHeight: 1.3 }}>
      <span style={{
        background: '#ffffff',
        color: RED,
        borderRadius: '999px',
        padding: '2px 10px',
        fontSize: '0.66rem',
        fontWeight: 800,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
      }}>
        Launch offer
      </span>
      <span>Get 20% off your first order.</span>
    </p>
  </div>
);

const Marquee = () => (
  <div style={{
    width: '100vw',
    marginLeft: 'calc(50% - 50vw)',
    marginRight: 'calc(50% - 50vw)',
    background: RED,
    color: '#ffffff',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    padding: '10px 0',
    borderTop: '1px solid rgba(0,0,0,0.05)',
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
          Just Launched <MarqueeHorse /> 20% Off Your First Order <MarqueeHorse />
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

/** Shared page chrome: offer bar, marquee, nav, footer, brand background, and keyframes. */
export function Layout({ title, current, children }: { title: string; current: string; children: ReactNode }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-6 pt-0 pb-12"
         style={{ background: BLUE, fontFamily: 'Inter, sans-serif', position: 'relative', overflowX: 'clip' }}>
      <OfferBar />
      <Nav current={current} />

      <div className="w-full max-w-4xl">
        {children}
        <Footer />
      </div>

      <Marquee />

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
          background: linear-gradient(115deg, rgba(255,255,255,0) 55%, rgba(255,255,255,0.04) 75%, rgba(255,255,255,0) 95%);
        }
        .gloss-layer::after {
          content: ''; position: absolute; inset: -35%;
          background: linear-gradient(115deg, rgba(255,255,255,0) 28%, rgba(255,255,255,0.04) 40%, rgba(255,255,255,0.11) 50%, rgba(255,255,255,0.04) 60%, rgba(255,255,255,0) 72%);
          animation: glossDrift 16s ease-in-out infinite alternate;
          /* negative delay = start mid-cycle, so every piece is at a different phase */
          animation-delay: calc(var(--gloss-delay, 0s) * -1);
        }
        .animate-fade-in { animation: fadeIn 0.6s ease-out; }
        .float-slow { animation: floatSlow 5s ease-in-out infinite; }
        .spin-slow { animation: spinSlow 16s linear infinite; }
        .lift { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .lift:hover { transform: translateY(-4px); }
        input::placeholder { color: rgba(45, 55, 72, 0.5); }

        /* Flip cards (Interactive.tsx) */
        .flip-card {
          display: block; width: 100%; padding: 0; border: none; background: none; cursor: pointer;
          perspective: 1400px; border-radius: 22px; text-align: left; font: inherit; color: inherit;
          transition: transform 0.25s ease;
        }
        .flip-card:hover { transform: translateY(-5px); }
        .flip-card:active { transform: translateY(-2px) scale(0.99); }
        .flip-card:focus-visible { outline: 3px solid ${RED}; outline-offset: 4px; }
        .flip-inner {
          display: grid; height: 100%; border-radius: 22px;
          transform-style: preserve-3d; transition: transform 0.6s cubic-bezier(0.3, 0.7, 0.2, 1), box-shadow 0.25s ease;
          box-shadow: 0 12px 28px rgba(30, 60, 90, 0.12);
        }
        .flip-card:hover .flip-inner { box-shadow: 0 20px 40px rgba(30, 60, 90, 0.2); }
        .flip-face, .flip-face * { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .flip-face { display: block; }
        .flip-back { transform: rotateY(180deg); }
        .flip-card.is-flipped .flip-inner { transform: rotateY(180deg); }
        /* The "I flip" cue: hover starts the turn; touch screens get one small peek. */
        .flip-card:hover .flip-inner { transform: rotateY(-16deg); }
        .flip-card.is-flipped:hover .flip-inner { transform: rotateY(164deg); }
        @keyframes flipPeek { 0%, 100% { transform: rotateY(0); } 40% { transform: rotateY(-22deg); } }
        @media (hover: none) {
          .flip-card:not(.is-flipped) .flip-inner { animation: flipPeek 0.9s ease-in-out 1.2s 1; }
        }
        /* The drifting gloss gets its own compositor layer, which Chrome draws through
           backface-visibility; swap face visibility at the half-turn so it can't show through. */
        .flip-face { transition: visibility 0s linear 0.3s; }
        .flip-back, .flip-card.is-flipped .flip-face:not(.flip-back) { visibility: hidden; }
        .flip-card.is-flipped .flip-back { visibility: visible; }

        /* Accordions (Interactive.tsx) */
        .acc-panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.35s ease; }
        .acc-item.is-open .acc-panel { grid-template-rows: 1fr; }
        .acc-icon { transition: transform 0.3s ease, background 0.2s ease, color 0.2s ease; }
        .acc-item.is-open .acc-icon { transform: rotate(45deg); }
        .acc-card { transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.2s ease, border-color 0.2s ease; }
        .acc-card:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(30, 60, 90, 0.1); }
        .acc-trigger:focus-visible { outline: 3px solid ${RED}; outline-offset: 2px; border-radius: 14px; }
        .acc-trigger:hover .acc-icon { transform: scale(1.08); }
        .acc-item.is-open .acc-trigger:hover .acc-icon { transform: rotate(45deg) scale(1.08); }

        /* Hover polish for pill buttons and text links */
        .btn-pill { transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease; }
        .btn-pill:hover { transform: translateY(-2px); box-shadow: 0 10px 22px rgba(239, 42, 48, 0.28); }
        .btn-pill:active { transform: translateY(0); }
        .link-arrow { transition: letter-spacing 0.25s ease, opacity 0.2s ease; }
        .link-arrow:hover { letter-spacing: 0.26em; }

        @media (prefers-reduced-motion: reduce) {
          .float-slow, .spin-slow, .animate-float { animation: none !important; }
          .gloss-layer::after { animation: none !important; display: none; }
          .flip-inner { transition: none; transform: none !important; animation: none !important; }
          .flip-back { transform: none; opacity: 0; transition: opacity 0.2s; }
          .flip-card.is-flipped .flip-back { opacity: 1; }
          .flip-card.is-flipped .flip-face:not(.flip-back) { opacity: 0; }
          .flip-card, .flip-card:hover, .acc-card:hover, .btn-pill:hover { transform: none; }
          .acc-panel, .acc-icon { transition: none; }
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
