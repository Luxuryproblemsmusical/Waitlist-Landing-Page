import { Layout, RED, INK } from './Layout';
import { ProductSection } from './ProductSection';
import { Gloss, Stationery, Polaroid } from './Flourish';
import { FlipCard, CardKicker, CardTitle, CardText } from './Interactive';
import horseImage from "../imports/galop-horse.png";
import sydneyImage from "../imports/sydney.png";

// [front title, front text, back title, back text]
// Fronts use Sydney's own words; backs use the pouch's wording.
const WHY: [string, string, string, string][] = [
  ['Less appetite', 'GLP-1 medications reduce your appetite, which means fewer nutrients reach your body.',
   'One stick, once a day', '30+ vitamins and minerals plus electrolytes, stirred into cold water.'],
  ['Bigger gaps', 'A standard multivitamin wasn\u2019t built for this.',
   'Where it counts', 'Electrolytes, plus nutrients that help support hair health, digestive comfort, energy, muscle maintenance and bone health.*'],
  ['Made for it', 'Just like a pregnant person takes a prenatal, GALOP is the multivitamin for life on a GLP-1.',
   'Doctor-formulated', 'Sydney found a doctor and built it for life on a GLP-1. It tastes like lemonade.'],
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
    return <img src={horseImage} alt="" aria-hidden="true" width={278} height={230} style={{ width: 'clamp(5.5rem, 21vw, 15rem)', height: 'auto' }} />;
  }
  return (
    <img
      src="/horse-gallop.webp"
      alt=""
      aria-hidden="true"
      width={480}
      height={342}
      style={{ width, height: 'auto', display: 'block', marginBottom: '4px' }}
    />
  );
};

/** Homepage — doubles as the product page, per Sydney's spec. */
export default function App() {
  return (
    <Layout title="GALOP — Multivitamin Drink Mix for Life on a GLP-1" current="/">
      {/* Logo lockup: galloping horse + GALOP wordmark */}
      <div className="relative flex flex-col items-center mt-2 mb-20 animate-fade-in"
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
             fontSize: 'clamp(0.7rem, 2.4vw, 0.95rem)',
             fontWeight: 500,
             color: INK,
             textTransform: 'uppercase',
             letterSpacing: '0.18em',
             lineHeight: 1.6,
             textAlign: 'center'
           }}>
          The multivitamin drink mix<br className="md:hidden" /> for life on a&nbsp;GLP&#8209;1
        </p>
        {/* Slogan with a little riding-whip flourish that cracks itself into place */}
        <div className="whip-wrap flex flex-col items-center"
             style={{ marginTop: 'clamp(10px, 1.8vw, 18px)', transform: 'rotate(-3deg)' }}>
          <p style={{
               fontFamily: "'Caveat', cursive",
               fontWeight: 600,
               fontSize: 'clamp(1.9rem, 4.5vw, 2.8rem)',
               lineHeight: 1,
               color: RED,
               margin: 0
             }}>
            Ride with us.
          </p>
          <svg className="whip" viewBox="0 0 200 30" aria-hidden="true"
               style={{ width: 'clamp(8.5rem, 16vw, 11rem)', height: 'auto', marginTop: '2px', marginLeft: '2.5rem', overflow: 'visible' }}>
            {/* handle */}
            <path className="whip-path" pathLength={1} d="M6 22 L30 17"
                  fill="none" stroke={RED} strokeWidth="3.2" strokeLinecap="round" />
            {/* lash, ending in a little curl */}
            <path className="whip-path whip-lash" pathLength={1}
                  d="M30 17 C 62 10, 92 25, 126 17 S 172 5, 184 13 C 191 17, 191 25, 185 24 C 180 23, 181 17, 186 16"
                  fill="none" stroke={RED} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Product / buy box — straight after the logo */}
      <ProductSection />

      {/* Why GLP-1 users need more — full-bleed red band */}
      <div style={{
        width: '100vw', marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)',
        background: RED, color: '#ffffff', marginTop: '6rem',
        padding: 'clamp(3rem, 6vw, 5rem) 1.5rem',
        position: 'relative'
      }}>
        <Gloss delay={1} />
        <div className="max-w-4xl mx-auto text-center" style={{ position: 'relative', zIndex: 2 }}>
          <p className="mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.22em' }}>
            Why it exists
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.2rem, 5.5vw, 3.6rem)', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.05, margin: 0 }}>
            Built for your GLP&#8209;1 journey.
          </h2>
          <div className="grid gap-5 sm:grid-cols-3 mt-10 text-left">
            {WHY.map(([h, p, bh, bp], i) => (
              <FlipCard key={h}
                        front={<><CardKicker>{['i.', 'ii.', 'iii.'][i]}</CardKicker><CardTitle>{h}</CardTitle><CardText>{p}</CardText></>}
                        back={<><CardTitle>{bh}</CardTitle><CardText>{bp}</CardText></>} />
            ))}
          </div>
        </div>
      </div>

      {/* Sydney's note: house stationery with a taped polaroid; her full letter lives on /about */}
      <section className="max-w-4xl mx-auto mt-20 md:mt-24 px-1">
        <Stationery className="grid gap-10 md:gap-12 md:grid-cols-[auto_1fr] items-center"
                    style={{ padding: 'clamp(2.25rem, 5vw, 3.5rem) clamp(1.5rem, 5vw, 3.5rem)' }}>
          <Polaroid className="justify-self-center" src={sydneyImage} alt="Sydney, founder of GALOP" caption="Sydney, founder" />

          {/* Letter */}
          <div className="text-center md:text-left" style={{ position: 'relative', zIndex: 2 }}>
            <img src={horseImage} alt="" aria-hidden="true" className="mx-auto md:mx-0"
                 style={{ width: '2.2rem', height: 'auto', marginBottom: '0.9rem', opacity: 0.9 }} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.9rem', fontWeight: 600, color: INK, textTransform: 'uppercase', letterSpacing: '0.22em', margin: 0 }}>
              From Sydney
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 4vw, 2.6rem)', fontWeight: 600, color: RED, lineHeight: 1.05, margin: '0.5rem 0 1.1rem' }}>
              Why I made GALOP
            </h2>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(1.25rem, 2.4vw, 1.5rem)', lineHeight: 1.45, color: RED, margin: 0 }}>
              &ldquo;I was on a GLP-1, doing everything my doctor told me and still losing my hair and fainting in the mornings. A standard multivitamin wasn&rsquo;t built for this &mdash; so I found a doctor and built one that was.&rdquo;
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-between gap-x-6 gap-y-3" style={{ marginTop: '1.4rem' }}>
              <span style={{ fontFamily: "'Caveat', cursive", fontWeight: 600, fontSize: 'clamp(2.1rem, 4vw, 2.6rem)', lineHeight: 1, color: RED }}>
                &mdash; Sydney
              </span>
              <a href="/about" className="link-arrow"
                 style={{
                   fontFamily: 'Inter, sans-serif', fontSize: '0.74rem', fontWeight: 700, color: INK,
                   textTransform: 'uppercase', letterSpacing: '0.2em',
                   textDecoration: 'underline', textUnderlineOffset: '0.3em'
                 }}>
                Read the full letter <span className="arrow-hop">→</span>
              </a>
            </div>
          </div>
        </Stationery>
      </section>
    </Layout>
  );
}
