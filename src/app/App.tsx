import { Layout, Kicker, Heading, DiamondGlyph, RED } from './Layout';
import { ProductSection } from './ProductSection';
import horseImage from "../imports/galop-horse.png";
import sydneyImage from "../imports/sydney.png";

const WHY = [
  ['Less appetite', 'GLP-1s work by quieting hunger — which means smaller meals and fewer nutrients coming in.'],
  ['Bigger gaps', 'Hair, energy, hydration, and digestion are usually the first things to feel it.'],
  ['Dosed for it', 'GALOP is formulated for that reality — like a prenatal is for pregnancy — in a drink, not a horse pill.'],
];

/**
 * The horse mark, alive: an 8s loop of the logo galloping, keyed onto the
 * page blue so it reads as part of the background. Falls back to the static
 * mark for reduced-motion users or if the video can't play.
 */
const HorseHero = () => {
  const reduceMotion =
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  // Same footprint the static mark had.
  const width = 'clamp(5.5rem, 21vw, 15rem)';
  if (reduceMotion) {
    return <img src={horseImage} alt="" aria-hidden="true" style={{ width: 'clamp(5.5rem, 21vw, 15rem)', height: 'auto' }} />;
  }
  return (
    <div style={{ position: 'relative', width, aspectRatio: '1280 / 820', marginBottom: 'clamp(-14px, -1.5vw, -4px)' }}>
      <video
        src="/horse-gallop.mp4"
        poster={horseImage}
        autoPlay muted loop playsInline
        aria-hidden="true"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      {/* Feathers the video's edges into the page so no rectangle ever shows. */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, rgba(203,234,254,0) 42%, #cbeafe 74%)'
      }} />
    </div>
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
              fontSize: 'clamp(4rem, 15vw, 9rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.01em',
              margin: 0,
              marginTop: 'clamp(-36px, -3vw, -8px)',
              position: 'relative',
              zIndex: 1
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

      {/* Product / buy box */}
      <ProductSection />

      {/* Why GLP-1 users need more */}
      <div className="max-w-3xl mx-auto mt-24 text-center">
        <Kicker>Why it exists</Kicker>
        <Heading>Built for the GLP&#8209;1 body.</Heading>
        <div className="grid gap-6 sm:grid-cols-3 mt-8 text-left">
          {WHY.map(([h, p]) => (
            <div key={h}
                 style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(239, 42, 48, 0.15)', borderRadius: '20px', padding: '22px 22px 24px' }}>
              <div style={{ color: RED }}><DiamondGlyph opacity={0.9} /></div>
              <p className="mt-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 600, color: RED, lineHeight: 1.15 }}>{h}</p>
              <p className="mt-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: RED, opacity: 0.85, lineHeight: 1.6 }}>{p}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Founder teaser — full story lives on /about */}
      <div className="max-w-2xl mx-auto mt-24 text-center">
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
    </Layout>
  );
}
