import { Layout, Kicker, Heading, RED } from './Layout';
import { ProductSection } from './ProductSection';
import { Divider, Note, Sticker } from './Flourish';
import horseImage from "../imports/galop-horse.png";
import sydneyImage from "../imports/sydney.png";
import stickerImage from "../imports/sticker-lemon-ginger.png";

const WHY = [
  ['Less appetite', 'GLP-1s work by quieting hunger — which means smaller meals and fewer nutrients coming in.'],
  ['Bigger gaps', 'Hair, energy, hydration, and digestion are usually the first things to feel it.'],
  ['Dosed for it', 'GALOP is formulated for that reality — like a prenatal is for pregnancy — in a drink, not a horse pill.'],
];

/**
 * The horse mark, alive: a 16s half-speed loop of the logo galloping as an
 * animated WebP with a real alpha channel, so it sits on the page background
 * with no box in any browser. Reduced-motion users get the static mark.
 */
const HorseHero = () => {
  const reduceMotion =
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  // Matches the original lockup: the visible horse is ~1/5 the width of the
  // wordmark (the horse fills ~75% of the frame). No negative margins.
  const width = 'clamp(4rem, 15vw, 10rem)';
  if (reduceMotion) {
    return <img src={horseImage} alt="" aria-hidden="true" style={{ width: 'clamp(5.5rem, 21vw, 15rem)', height: 'auto' }} />;
  }
  return (
    <img
      src="/horse-gallop.webp"
      alt=""
      aria-hidden="true"
      style={{ width, height: 'auto', display: 'block', marginBottom: '4px' }}
    />
  );
};

/** Homepage — doubles as the product page, per Sydney's spec. */
export default function App() {
  return (
    <Layout title="GALOP — Coming Soon" current="/">
      {/* Logo lockup: galloping horse + GALOP wordmark */}
      <div className="flex flex-col items-center mt-2 mb-6 animate-fade-in"
           style={{ animation: 'fadeIn 0.8s ease-out' }}>
        <HorseHero />
        <h1 aria-label="GALOP"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 500,
              color: RED,
              fontSize: 'clamp(4.5rem, 18vw, 12rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.01em',
              margin: 0
            }}>
          GALOP
        </h1>
        <p style={{
             marginTop: 'clamp(8px, 1.5vw, 16px)',
             fontFamily: 'Inter, sans-serif',
             fontSize: 'clamp(0.55rem, 2.4vw, 0.95rem)',
             fontWeight: 700,
             color: RED,
             textTransform: 'uppercase',
             letterSpacing: 'clamp(0.12em, 0.4vw, 0.22em)',
             textAlign: 'center',
             whiteSpace: 'nowrap'
           }}>
          The multivitamin drink mix for life on a&nbsp;GLP&#8209;1
        </p>
      </div>

      {/* Hero line — script accent word, LP-style, with a floating prop */}
      <div className="relative max-w-3xl mx-auto text-center mt-4 mb-10 px-4">
        {/* Prop sits in the margin beside the headline (hidden on phones, where there is no margin). */}
        <div className="hidden lg:block" style={{ position: 'absolute', left: '-6rem', top: '-0.5rem' }}>
          <Sticker src={stickerImage} width="clamp(4.5rem, 9vw, 7rem)" rotate={-10} />
        </div>
        <h2 style={{
              position: 'relative', zIndex: 1,
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 600,
              color: RED,
              fontSize: 'clamp(2.4rem, 7vw, 4.6rem)',
              lineHeight: 1.02,
              letterSpacing: '-0.015em',
              margin: 0
            }}>
          Less appetite.{' '}
          <span style={{ whiteSpace: 'nowrap' }}>
            More{' '}
            <span style={{ fontFamily: "'Caveat', cursive", fontWeight: 700, fontSize: '1.22em', lineHeight: 1 }}>you.</span>
          </span>
        </h2>
        <p className="mt-4"
           style={{ position: 'relative', zIndex: 1, fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)', fontWeight: 600, color: RED, lineHeight: 1.55, opacity: 0.9 }}>
          A once&#8209;a&#8209;day vitamin + electrolyte drink, dosed for the GLP&#8209;1 body — and it tastes like lemonade.
        </p>
        <div className="mt-3" style={{ position: 'relative', zIndex: 1 }}>
          <Note rotate={-4}>(sips, not pills)</Note>
        </div>
      </div>

      <Divider className="mb-10" />

      {/* Product / buy box */}
      <ProductSection />

      {/* Why GLP-1 users need more — full-bleed red band */}
      <div style={{
        width: '100vw', marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)',
        background: RED, color: '#ffffff', marginTop: '6rem', padding: 'clamp(3rem, 6vw, 5rem) 1.5rem'
      }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="mb-4" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.22em', opacity: 0.85 }}>
            Why it exists
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.2rem, 5.5vw, 3.6rem)', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.05, margin: 0 }}>
            Built for the GLP&#8209;1 body.
          </h2>
          <div className="grid gap-5 sm:grid-cols-3 mt-10 text-left">
            {WHY.map(([h, p]) => (
              <div key={h} className="lift"
                   style={{ background: '#ffffff', color: RED, borderRadius: '22px', padding: '24px 22px 26px', boxShadow: '0 12px 28px rgba(0,0,0,0.12)' }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 600, lineHeight: 1.1, margin: 0 }}>{h}</p>
                <p className="mt-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', opacity: 0.85, lineHeight: 1.6 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Founder teaser — full-bleed white band; full story lives on /about */}
      <div style={{
        width: '100vw', marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)',
        background: '#ffffff', marginTop: '6rem', padding: 'clamp(3.5rem, 7vw, 6rem) 1.5rem'
      }}>
      <div className="max-w-2xl mx-auto text-center">
        <img
          src={sydneyImage}
          alt="Sydney, founder of GALOP"
          style={{
            width: 'clamp(5rem, 10vw, 7rem)',
            height: 'clamp(5rem, 10vw, 7rem)',
            borderRadius: '9999px',
            objectFit: 'cover',
            border: '3px solid #EF2A30',
            boxShadow: '0 6px 18px rgba(239, 42, 48, 0.18)',
            margin: '0 auto 1.25rem'
          }}
        />
        <Kicker>A note from our founder</Kicker>
        <Heading>Why I made GALOP</Heading>
        <p style={{
             fontFamily: 'Inter, sans-serif',
             fontSize: '1.05rem',
             fontWeight: 700,
             color: RED,
             lineHeight: 1.6,
             letterSpacing: '0.005em'
           }}>
          I was on a GLP-1, doing everything my doctor told me and still losing my hair and fainting in the mornings. A standard multivitamin wasn't built for this — so I found a doctor and built one that was.
        </p>
        <p style={{
             fontFamily: "'Caveat', cursive",
             fontWeight: 500,
             fontSize: 'clamp(2rem, 4vw, 2.6rem)',
             lineHeight: 1,
             color: RED,
             marginTop: '1.25rem'
           }}>
          — Sydney
        </p>
        <a href="/about"
           style={{
             display: 'inline-block',
             marginTop: '1.5rem',
             fontFamily: 'Inter, sans-serif',
             fontSize: '0.78rem',
             fontWeight: 700,
             color: RED,
             textTransform: 'uppercase',
             letterSpacing: '0.2em',
             textDecoration: 'underline',
             textUnderlineOffset: '0.3em'
           }}>
          Read Sydney&rsquo;s story →
        </a>
      </div>
      </div>
    </Layout>
  );
}
