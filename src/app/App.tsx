import { Layout, Kicker, Heading, DiamondGlyph, RED } from './Layout';
import { PlanPicker } from './PlanPicker';
import horseImage from "../imports/galop-horse.png";
import heroImage from "../imports/hero-lemonade.png";
import sydneyImage from "../imports/sydney.png";

/** Cute handwritten aside calling out electrolytes, pinned beside the hero image. */
const ElectrolytesAside = () => (
  <span
    aria-hidden="true"
    style={{
      position: 'absolute',
      top: '-0.5rem',
      right: 'clamp(-5.5rem, -11vw, -4rem)',
      fontFamily: "'Caveat', cursive",
      fontWeight: 600,
      fontSize: 'clamp(1.35rem, 3.2vw, 1.9rem)',
      lineHeight: 1,
      color: RED,
      transform: 'rotate(8deg)',
      whiteSpace: 'nowrap',
    }}
  >
    (with electrolytes!)
  </span>
);

/** Homepage — doubles as the product page, per Sydney's spec. */
export default function App() {
  return (
    <Layout title="GALOP — Coming Soon" current="/">
      {/* Logo lockup: horse mark + GALOP wordmark */}
      <div className="flex flex-col items-center mt-4 mb-2 sm:mb-4 animate-fade-in"
           style={{ animation: 'fadeIn 0.8s ease-out' }}>
        <img
          src={horseImage}
          alt=""
          aria-hidden="true"
          style={{ width: 'clamp(5.5rem, 21vw, 15rem)', height: 'auto', marginBottom: 0 }}
        />
        <h1 aria-label="GALOP"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 500,
              color: RED,
              fontSize: 'clamp(4.5rem, 18vw, 12rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.01em',
              margin: 0,
              marginTop: 'clamp(-44px, -3.5vw, -10px)'
            }}>
          GALOP
        </h1>
        <p style={{
             marginTop: 'clamp(8px, 1.5vw, 18px)',
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

      {/* Hero Product — drink mix */}
      <div className="flex justify-center items-center mb-4 mt-10 sm:mb-6 sm:mt-14">
        <div className="animate-float"
             style={{
               animation: 'float 4s ease-in-out infinite',
               background: 'transparent',
               width: 'fit-content',
               position: 'relative',
             }}>
          <ElectrolytesAside />
          <img
            src={heroImage}
            alt="GALOP lemonade drink mix stick pack beside an iced glass of ginger lemonade"
            className="w-52 sm:w-72 h-auto object-contain"
            style={{
              filter: 'drop-shadow(0 8px 16px rgba(30, 60, 90, 0.18))',
              display: 'block',
              border: 'none',
              outline: 'none',
              boxShadow: 'none',
            }}
          />
        </div>
      </div>

      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="mb-3 sm:mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.25rem, 6vw, 4rem)',
              fontWeight: 600,
              color: RED,
              letterSpacing: '-0.01em',
              lineHeight: 1.05
            }}>
          Coming soon.
        </h2>

        {/* Highlights line */}
        <p style={{
             fontFamily: 'Inter, sans-serif',
             fontSize: 'clamp(0.7rem, 1.3vw, 0.9rem)',
             fontWeight: 700,
             color: RED,
             textTransform: 'uppercase',
             letterSpacing: '0.22em'
           }}>
          Doctor-formulated <span style={{ margin: '0 0.6em', opacity: 0.7 }}>·</span> Zero Sugar <span style={{ margin: '0 0.6em', opacity: 0.7 }}>·</span> Lemonade + Ginger
        </p>
      </div>

      {/* Purchase — plan picker (checkout placeholder until the Shopify store is live) */}
      <div id="shop" className="text-center mb-5">
        <Kicker>Choose your plan</Kicker>
      </div>
      <PlanPicker source="galoplife.com" />

      {/* What's inside — claims from the pack */}
      <div className="max-w-3xl mx-auto mt-16 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-8 text-center">
        {[
          '30+ Vitamins & Minerals',
          'Nausea, Energy & Hydration Support',
          'Zero Sugar — Monkfruit + Stevia',
          'Doctor-Formulated, USA Made',
        ].map((claim) => (
          <div key={claim} className="flex flex-col items-center" style={{ color: RED }}>
            <DiamondGlyph opacity={0.9} />
            <p className="mt-3"
               style={{
                 fontFamily: 'Inter, sans-serif',
                 fontSize: 'clamp(0.65rem, 1.1vw, 0.78rem)',
                 fontWeight: 700,
                 color: RED,
                 textTransform: 'uppercase',
                 letterSpacing: '0.14em',
                 lineHeight: 1.6
               }}>
              {claim}
            </p>
          </div>
        ))}
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
