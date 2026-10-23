import { useEffect, type ReactNode } from 'react';
import horseImage from "../imports/galop-horse.png";

export const RED = '#EF2A30';
export const BLUE = '#cbeafe';
/** Pale lemon accent, used sparingly around lemonade moments. */
export const LEMON = '#FFF07A';
/**
 * Deeper ink red for text under ~24px: 4.8:1 on #cbeafe and 6.0:1 on white (brand RED is
 * 3.3:1 and 4.2:1). Headings, wordmark, hang tag, buttons, icons and the horse stay RED.
 */
export const INK = '#C4161C';

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

/** Static launch-offer bar at the very top of every page; the nav hang tag hangs from it. */
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
    <p className="text-center"
       style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 600, fontSize: 'clamp(1rem, 3.6vw, 1.1rem)', letterSpacing: '0.01em', lineHeight: 1.3, margin: 0 }}>
      Just launched &mdash; 20% off your first order.
    </p>
  </div>
);

export const NAV_LINKS = [
  { href: '/#shop', label: 'Lemonade' },
  { href: '/about', label: 'From Sydney' },
  { href: '/faq', label: 'FAQ' },
];

/** Wordmark plus one hang tag: From Sydney (her letter), or Lemonade (the shop) when you're on her page. */
const Nav = ({ current }: { current: string }) => {
  const onAbout = current === '/about';
  return (
    <nav aria-label="Main"
         className="w-full max-w-4xl flex items-center justify-between gap-4 pb-6 md:pb-0"
         style={{ paddingTop: '4px' }}>
      <a href="/" aria-label="GALOP home" className="nav-logo"
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
      {/* A little red hang tag on a string; it swings when you hover */}
      <a href={onAbout ? '/#shop' : '/about'} className={`nav-tag${onAbout ? ' is-flipped' : ''}`} data-fizz="8"
         aria-label={onAbout ? 'Lemonade: shop the Multivitamin Drink Mix' : 'From Sydney: read Sydney\u2019s letter'}>
        <svg className="nav-tag-string" viewBox="0 0 40 30" aria-hidden="true">
          <path d="M33 26 C 26 14, 14 6, 2 2" fill="none" stroke={RED} strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        <span className="nav-tag-body">
          <span className="nav-tag-hole" aria-hidden="true" />
          {onAbout ? 'Lemonade' : 'From Sydney'}
        </span>
      </a>
    </nav>
  );
};

const footerLink = { color: INK, textDecoration: 'underline', textUnderlineOffset: '0.2em' } as const;

const Footer = () => (
  <footer className="max-w-2xl mx-auto mt-24 pb-10 text-center"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.75rem',
            lineHeight: 1.6,
            color: INK,
            letterSpacing: '0.02em'
          }}>
    {/* hairline, horse, hairline: a quiet sign-off */}
    <div className="flex items-center justify-center gap-4 mb-6" aria-hidden="true">
      <span style={{ height: '1px', width: 'clamp(3rem, 12vw, 8rem)', background: 'rgba(239, 42, 48, 0.3)' }} />
      <img src={horseImage} alt="" style={{ width: '1.9rem', height: 'auto', opacity: 0.9 }} />
      <span style={{ height: '1px', width: 'clamp(3rem, 12vw, 8rem)', background: 'rgba(239, 42, 48, 0.3)' }} />
    </div>
    <p>© {new Date().getFullYear()} GALOP. All rights reserved.</p>
    <p style={{ marginTop: '0.5rem' }} className="flex flex-wrap justify-center gap-x-5 gap-y-1">
      {NAV_LINKS.map((l) => (
        <a key={l.href} href={l.href} style={footerLink}>{l.label}</a>
      ))}
      <a href="mailto:galoplife@gmail.com" style={footerLink}>Write to us</a>
      <a href="/privacy.html" style={footerLink}>Privacy Policy</a>
    </p>
    <p style={{ marginTop: '1rem', fontSize: '0.7rem', lineHeight: 1.5 }}>
      *These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
    </p>
  </footer>
);

/**
 * Lemonade fizz: a few lemon-and-white bubbles rise from wherever an element
 * marked `data-fizz` (its value = bubble count) is pressed.
 */
function fizz(x: number, y: number, count: number) {
  for (let i = 0; i < count; i++) {
    const b = document.createElement('span');
    const size = 4 + Math.random() * 8;
    b.className = 'fizz-bubble';
    b.style.left = `${x + (Math.random() - 0.5) * 24}px`;
    b.style.top = `${y}px`;
    b.style.width = b.style.height = `${size}px`;
    b.style.setProperty('--dx', `${(Math.random() - 0.5) * 60}px`);
    b.style.setProperty('--rise', `${40 + Math.random() * 60}px`);
    b.style.setProperty('--dur', `${0.6 + Math.random() * 0.5}s`);
    b.style.animationDelay = `${Math.random() * 0.12}s`;
    b.style.background = i % 3 === 0
      ? 'rgba(255, 255, 255, 0.95)'
      : 'radial-gradient(circle at 30% 30%, #ffffff 0%, #FFF8C2 45%, #FFF07A 100%)';
    b.addEventListener('animationend', () => b.remove());
    document.body.appendChild(b);
  }
}

/** Shared page chrome: offer bar, nav, footer, brand background, and keyframes. */
export function Layout({ title, current, children }: { title: string; current: string; children: ReactNode }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onDown = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.('[data-fizz]');
      if (!el || reduce.matches) return;
      fizz(e.clientX, e.clientY, Number(el.getAttribute('data-fizz')) || 10);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-6 pt-0 pb-12"
         style={{
           /* sunlit sky: a soft lemon glow up top, a lighter wash fading into the brand blue */
           background: `radial-gradient(1100px 520px at 88% -8%, rgba(255, 246, 170, 0.5), transparent 62%),
                        radial-gradient(900px 600px at -12% 18%, rgba(255, 255, 255, 0.6), transparent 60%),
                        linear-gradient(180deg, #e4f4ff 0%, ${BLUE} 34%, ${BLUE} 100%)`,
           fontFamily: 'Inter, sans-serif', position: 'relative', overflowX: 'clip',
           /* Cormorant defaults to old-style figures, which print "GLP-1" as "GLP-ı"; the pouch uses lining figures */
           fontVariantNumeric: 'lining-nums'
         }}>
      <OfferBar />
      <Nav current={current} />

      <div className="w-full max-w-4xl">
        {children}
        <Footer />
      </div>

      <style>{`
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
        .lift { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        input::placeholder { color: rgba(45, 55, 72, 0.5); }

        /* Hover motion only where there's a real pointer: on phones a tap leaves
           :hover stuck, which left cards lifted or half-turned after tapping. */
        @media (hover: hover) {
          .lift:hover { transform: translateY(-4px); }
          /* The lift and the "I flip" tilt go on the inner card, so the button's own
             box never moves out from under the cursor (which made it flicker). */
          .flip-card:hover .flip-inner { box-shadow: 0 20px 40px rgba(30, 60, 90, 0.2); transform: translateY(-5px) rotateY(-16deg); }
          .flip-card.is-flipped:hover .flip-inner { transform: translateY(-5px) rotateY(164deg); }
          .acc-card:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(30, 60, 90, 0.1); }
          .plan-card[aria-pressed="false"]:hover { transform: translateY(-2px); }
          .founder-note:hover .polaroid { transform: rotate(-1deg) translateY(-4px) scale(1.02); }
        }

        /* Flip cards (Interactive.tsx) */
        .flip-card {
          display: block; width: 100%; padding: 0; border: none; background: none; cursor: pointer;
          perspective: 1400px; border-radius: 22px; text-align: left; font: inherit; color: inherit;
        }
        .flip-card:focus-visible { outline: 3px solid #ffffff; outline-offset: 4px; } /* flip cards sit on the red band */
        .flip-inner {
          display: grid; height: 100%; border-radius: 22px;
          transform-style: preserve-3d; transition: transform 0.6s cubic-bezier(0.3, 0.7, 0.2, 1), box-shadow 0.25s ease;
          box-shadow: 0 12px 28px rgba(30, 60, 90, 0.12);
        }
        /* Only the faces hide their backs. Putting backface-visibility on everything inside them
           (an earlier attempt) makes Safari depth-sort each piece separately, and when the card
           tilts it draws the face's background over its own text, so the content vanishes. */
        .flip-face { display: block; backface-visibility: hidden; -webkit-backface-visibility: hidden; transform-style: flat; }
        .flip-back { transform: rotateY(180deg); }
        .flip-card.is-flipped .flip-inner { transform: rotateY(180deg); }
        /* The "I flip" cue: hover starts the turn (above); touch screens get one small peek. */
        @keyframes flipPeek { 0%, 100% { transform: rotateY(0); } 40% { transform: rotateY(-22deg); } }
        @media (hover: none) {
          .flip-card:not(.is-flipped) .flip-inner { animation: flipPeek 0.9s ease-in-out 1.2s 1; }
        }
        /* The drifting gloss gets its own compositor layer, which Chrome draws through
           backface-visibility; swapping face visibility at the half-turn means the hidden
           face can never show through, in any browser. */
        .flip-face { transition: visibility 0s linear 0.3s; }
        .flip-back, .flip-card.is-flipped .flip-face:not(.flip-back) { visibility: hidden; }
        .flip-card.is-flipped .flip-back { visibility: visible; }

        /* Accordions (Interactive.tsx) */
        .acc-panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.35s ease; }
        .acc-item.is-open .acc-panel { grid-template-rows: 1fr; }
        .acc-icon { transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), background 0.2s ease, color 0.2s ease; }
        .acc-item .acc-panel > div { opacity: 0; transform: translateY(-6px); transition: opacity 0.3s ease, transform 0.35s ease; }
        .acc-item.is-open .acc-panel > div { opacity: 1; transform: none; }
        .acc-item.is-open .acc-icon { transform: rotate(45deg); }
        .acc-card { transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.2s ease, border-color 0.2s ease; }
        .acc-trigger:focus-visible { outline: 3px solid ${RED}; outline-offset: 2px; border-radius: 14px; }
        .acc-trigger:hover .acc-icon { transform: scale(1.08); }
        .acc-item.is-open .acc-trigger:hover .acc-icon { transform: rotate(45deg) scale(1.08); }

        /* Brand motion: buttons gallop, presses fizz like lemonade */
        .btn-gallop {
          position: relative; overflow: hidden; isolation: isolate;
          transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.25s ease;
        }
        /* No lift on hover: the button stays put under the cursor (moving it made
           the hover flicker on and off at its bottom edge); the shadow, sheen and
           galloping horse carry the hover instead. */
        .btn-gallop:hover { box-shadow: 0 14px 28px rgba(239, 42, 48, 0.3); }
        .btn-gallop:active { transform: translateY(0) scale(0.96); transition-duration: 0.08s; }
        .btn-gallop .btn-label, .success-pill .btn-label { position: relative; z-index: 2; }
        /* a quick gift-wrap sheen sweeps across on hover... */
        .btn-gallop::before {
          content: ''; position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background: linear-gradient(110deg, rgba(255,255,255,0) 35%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 65%);
          transform: translateX(-120%);
        }
        .btn-gallop:hover::before { transform: translateX(120%); transition: transform 0.75s ease; }
        .btn-gallop.on-light::before { background: linear-gradient(110deg, rgba(239,42,48,0) 35%, rgba(239,42,48,0.12) 50%, rgba(239,42,48,0) 65%); }
        /* ...while the horse gallops through behind the label */
        .btn-gallop::after, .success-pill::after {
          content: ''; position: absolute; top: 50%; left: -3em; z-index: 0; pointer-events: none;
          width: 3em; height: 2.1em; margin-top: -1.1em; opacity: 0;
          background: url(${horseImage}) center / contain no-repeat;
        }
        .btn-gallop::after { filter: brightness(0) invert(1); }
        .btn-gallop.on-light::after { filter: none; }
        .btn-gallop:hover::after, .success-pill::after {
          animation: gallopAcross 1.4s cubic-bezier(0.45, 0.05, 0.55, 0.95) forwards, gallopBob 0.17s ease-in-out infinite alternate;
        }
        @keyframes gallopAcross {
          0% { left: -3em; opacity: 0; }
          12% { opacity: 0.75; }
          85% { opacity: 0.75; }
          100% { left: calc(100% + 1em); opacity: 0; }
        }
        @keyframes gallopBob {
          from { translate: 0 0.08em; rotate: -5deg; }
          to { translate: 0 -0.2em; rotate: 4deg; }
        }
        .success-pill { position: relative; overflow: hidden; isolation: isolate; }

        .fizz-bubble {
          position: fixed; z-index: 9999; border-radius: 9999px; pointer-events: none; opacity: 0;
          box-shadow: 0 0 0 1px rgba(30, 60, 90, 0.1);
          animation: fizzUp var(--dur, 0.8s) cubic-bezier(0.2, 0.6, 0.35, 1) forwards;
        }
        @keyframes fizzUp {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.4); }
          15% { opacity: 1; }
          100% { opacity: 0; transform: translate(-50%, -50%) translate(var(--dx), calc(var(--rise) * -1)) scale(1); }
        }

        /* Riding-whip flourish under the slogan: draws in fast, then flicks */
        .whip-path { stroke-dasharray: 1; stroke-dashoffset: 0; }
        .whip-path { animation: whipDraw 0.55s cubic-bezier(0.7, 0, 0.3, 1) 0.9s both; }
        .whip-lash { animation-delay: 1.05s; }
        .whip { transform-origin: 10% 70%; animation: whipFlick 0.45s ease-out 1.55s both; }
        .whip-wrap:hover .whip-path { animation-name: whipDrawAgain; animation-delay: 0s; }
        .whip-wrap:hover .whip-lash { animation-delay: 0.12s; }
        .whip-wrap:hover .whip { animation-name: whipFlickAgain; animation-delay: 0.6s; }
        @keyframes whipDraw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        @keyframes whipDrawAgain { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        @keyframes whipFlick { 0% { transform: rotate(0); } 40% { transform: rotate(-4deg); } 75% { transform: rotate(1.5deg); } 100% { transform: rotate(0); } }
        @keyframes whipFlickAgain { 0% { transform: rotate(0); } 40% { transform: rotate(-4deg); } 75% { transform: rotate(1.5deg); } 100% { transform: rotate(0); } }

        /* Founder note: taped polaroid that straightens up when you hover the card */
        .polaroid {
          background: #ffffff; padding: 10px 10px 12px;
          box-shadow: 0 14px 30px rgba(30, 60, 90, 0.18), 0 1px 3px rgba(0, 0, 0, 0.08);
          transform: rotate(-4deg); transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .polaroid-tape {
          position: absolute; top: -13px; left: 50%; width: 86px; height: 26px; margin-left: -43px; z-index: 3;
          background: rgba(255, 240, 122, 0.6); transform: rotate(3deg);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
        }

        /* Plan cards settle in when chosen, and the radio dot grows in (no overshoot) */
        .plan-card[aria-pressed="true"] { animation: planHop 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
        .plan-card[aria-pressed="true"] .plan-dot { animation: dotPop 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
        @keyframes planHop { from { transform: scale(0.985); } to { transform: scale(1); } }
        @keyframes dotPop { from { transform: scale(0.5); } to { transform: scale(1); } }

        /* Nav hang tag */
        /* --dir: 1 hangs from the left and points left (From Sydney); -1 is the mirror image (Lemonade) */
        .nav-tag {
          --dir: 1;
          position: relative; display: inline-block; text-decoration: none; margin-right: 4px;
          transform: rotate(calc(-6deg * var(--dir))); transform-origin: 8px 50%;
          filter: drop-shadow(0 6px 10px rgba(239, 42, 48, 0.22));
        }
        .nav-tag.is-flipped { --dir: -1; transform-origin: calc(100% - 8px) 50%; margin-right: 26px; }
        .nav-tag:hover { animation: tagSwing 0.9s ease-in-out; }
        .nav-tag:active { transform: rotate(calc(-6deg * var(--dir))) scale(0.95); }
        .nav-tag:focus-visible { outline: 3px solid ${RED}; outline-offset: 6px; border-radius: 6px; }
        .nav-tag-string { position: absolute; left: -22px; top: -12px; width: 40px; height: 30px; overflow: visible; }
        .is-flipped .nav-tag-string { left: auto; right: -22px; transform: scaleX(-1); }
        .nav-tag-body {
          position: relative; display: inline-flex; align-items: center; overflow: hidden;
          background: ${RED}; color: #ffffff;
          font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 600;
          font-size: 1.2rem; line-height: 1; letter-spacing: 0.01em;
          padding: 9px 20px 10px 30px; white-space: nowrap;
          clip-path: polygon(14px 0, 100% 0, 100% 100%, 14px 100%, 0 50%);
        }
        .is-flipped .nav-tag-body {
          padding: 9px 30px 10px 20px;
          clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%);
        }
        .nav-tag-hole {
          position: absolute; left: 11px; top: 50%; width: 7px; height: 7px; margin-top: -3.5px; border-radius: 9999px;
          background: #e4f4ff; box-shadow: inset 0 0 0 1.5px rgba(255, 255, 255, 0.85);
        }
        .is-flipped .nav-tag-hole { left: auto; right: 11px; }
        /* phones: a slightly smaller tag so "From Sydney" clears the hero horse */
        @media (max-width: 420px) {
          .nav-tag-body { font-size: 1.05rem; padding: 8px 16px 9px 26px; }
          .is-flipped .nav-tag-body { padding: 8px 26px 9px 16px; }
        }
        /* sheen across the tag on hover */
        .nav-tag-body::after {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(110deg, rgba(255,255,255,0) 35%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0) 65%);
          transform: translateX(-120%);
        }
        .nav-tag:hover .nav-tag-body::after { transform: translateX(120%); transition: transform 0.7s ease; }
        @keyframes tagSwing {
          0% { transform: rotate(calc(-6deg * var(--dir))); }
          25% { transform: rotate(calc(5deg * var(--dir))); }
          50% { transform: rotate(calc(-11deg * var(--dir))); }
          75% { transform: rotate(calc(-2deg * var(--dir))); }
          100% { transform: rotate(calc(-6deg * var(--dir))); }
        }

        /* Nav: the wordmark stretches its stride */
        .nav-logo { transition: letter-spacing 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
        .nav-logo:hover { letter-spacing: 0.08em !important; }

        /* Text links: the arrow canters */
        .arrow-hop { display: inline-block; }
        .link-arrow:hover .arrow-hop { animation: arrowCanter 0.5s ease-in-out infinite; }
        @keyframes arrowCanter { 0%, 100% { translate: 0 0; } 50% { translate: 5px -2px; } }


        /* Inputs glow when focused */
        .galop-input { transition: border-color 0.2s ease, box-shadow 0.25s ease; }
        .galop-input:focus { border-color: ${RED} !important; box-shadow: 0 0 0 4px rgba(239, 42, 48, 0.14); }

        @media (prefers-reduced-motion: reduce) {
          .float-slow, .animate-float { animation: none !important; }
          .animate-fade-in { animation: none !important; }
          .gloss-layer::after { animation: none !important; display: none; }
          .flip-inner { transition: none; transform: none !important; animation: none !important; }
          .flip-back { transform: none; opacity: 0; transition: opacity 0.2s; }
          .flip-card.is-flipped .flip-back { opacity: 1; }
          .flip-card.is-flipped .flip-face:not(.flip-back) { opacity: 0; }
          .flip-card, .flip-card:hover, .acc-card:hover, .btn-gallop:hover, .plan-card:hover { transform: none; }
          .acc-panel, .acc-icon, .acc-item .acc-panel > div { transition: none; }
          .btn-gallop::before, .btn-gallop::after, .success-pill::after { display: none; }
          .plan-card, .plan-dot, .arrow-hop, .whip, .whip-path, .nav-tag { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

/** Engraved serif small caps above section headings. */
export const Kicker = ({ children }: { children: ReactNode }) => (
  <p className="mb-4"
     style={{
       fontFamily: "'Cormorant Garamond', serif",
       fontSize: '0.9rem',
       fontWeight: 600,
       color: INK,
       textTransform: 'uppercase',
       letterSpacing: '0.22em',
       lineHeight: 1.3
     }}>
    {children}
  </p>
);

/** Serif section heading; `as="h1"` for the page title. */
export const Heading = ({ children, size = 'md', as: Tag = 'h2' }: { children: ReactNode; size?: 'md' | 'lg'; as?: 'h1' | 'h2' }) => (
  <Tag className="mb-6"
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: size === 'lg' ? 'clamp(2.5rem, 7vw, 4.25rem)' : 'clamp(2rem, 4vw, 2.75rem)',
        fontWeight: 600,
        color: RED,
        letterSpacing: '-0.01em',
        lineHeight: 1.1
      }}>
    {children}
  </Tag>
);
