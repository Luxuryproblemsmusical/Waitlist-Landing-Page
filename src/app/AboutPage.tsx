import { Layout, Kicker, Heading, RED, INK } from './Layout';
import { Stationery, Polaroid } from './Flourish';
import horseImage from "../imports/galop-horse.png";
import sydneyImage from "../imports/sydney.png";

// Sydney's letter. Her words are kept exactly; only the paragraphing and type are ours.
const letter = { fontFamily: "'Instrument Serif', serif", fontWeight: 500, fontSize: 'clamp(1.2rem, 2.3vw, 1.35rem)', lineHeight: 1.6, color: INK } as const;

/** From Sydney: one signed letter on the house stationery, with her taped polaroid on top. */
export default function AboutPage() {
  return (
    <Layout title="From Sydney — GALOP" current="/about">
      <div className="max-w-2xl mx-auto" style={{ marginTop: 'clamp(6.5rem, 12vw, 7.5rem)' }}>
        <Stationery style={{ padding: '2.5rem clamp(1.5rem, 6vw, 4rem) clamp(2.5rem, 6vw, 3.5rem)' }}>
          {/* the polaroid overlaps the card's top edge (the card's top padding stops the margin collapsing) */}
          <div className="flex justify-center" style={{ marginTop: '-7rem', position: 'relative', zIndex: 2 }}>
            <Polaroid src={sydneyImage} alt="Sydney, founder of GALOP" caption="Sydney, founder" width="clamp(9rem, 24vw, 11rem)" />
          </div>

          <div className="text-center" style={{ position: 'relative', zIndex: 2, marginTop: '1.75rem' }}>
            <img src={horseImage} alt="" aria-hidden="true" className="mx-auto"
                 style={{ width: '2.2rem', height: 'auto', marginBottom: '0.9rem', opacity: 0.9 }} />
            <Kicker>From Sydney</Kicker>
            <Heading as="h1">Why I made GALOP</Heading>
          </div>

          <div className="mx-auto" style={{ ...letter, maxWidth: '34em', position: 'relative', zIndex: 2 }}>
            <p className="mb-5">
              I was on a GLP-1, doing everything my doctor told me and still losing my hair and fainting in the mornings.
            </p>
            <p className="mb-5">
              GLP-1 medications reduce your appetite, which means fewer nutrients reach your body. This is why people on GLP-1s often need higher doses of key vitamins to support their journey.
            </p>
            <p className="text-center" style={{ fontStyle: 'italic', fontSize: 'clamp(1.6rem, 3.6vw, 2rem)', lineHeight: 1.25, color: RED, margin: '2rem 0' }}>
              A standard multivitamin wasn&rsquo;t built for this.
            </p>
            <p className="mb-5">
              So just like a pregnant person takes a prenatal, I found a doctor and built a multivitamin to optimize our journey.
            </p>
            <p className="mb-2">
              You deserve to feel like your absolute best self on a GLP-1.
            </p>
            <p style={{ fontWeight: 600 }}>
              That&rsquo;s what GALOP is for.
            </p>
            <p style={{ fontFamily: "'Caveat', cursive", fontWeight: 600, fontSize: 'clamp(2.2rem, 4vw, 2.6rem)', lineHeight: 1, color: RED, marginTop: '1.25rem' }}>
              — Sydney
            </p>
            <p style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(236, 29, 39, 0.16)', fontStyle: 'italic', fontSize: '1.15rem' }}>
              P.S. GALOP just launched, so your first order is 20% off.
            </p>
          </div>
        </Stationery>
      </div>

      <div className="mt-14 text-center">
        <a href="/#shop" className="btn-gallop cut-solid" data-fizz="12"
           style={{
             display: 'inline-block',
             background: RED,
             color: '#ffffff',
             fontFamily: "'Montserrat', sans-serif",
             fontWeight: 700,
             fontSize: '0.9rem',
             letterSpacing: '0.18em',
             textTransform: 'uppercase',
             padding: '18px 36px',
             textDecoration: 'none'
           }}>
          <span className="btn-label">Get 20% off your first order</span>
        </a>
      </div>
    </Layout>
  );
}
