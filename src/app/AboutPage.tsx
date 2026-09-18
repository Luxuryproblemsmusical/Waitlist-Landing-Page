import { Layout, Kicker, Heading, RED } from './Layout';
import sydneyImage from "../imports/sydney.png";

export default function AboutPage() {
  return (
    <Layout title="About — GALOP" current="/about">
      <div className="max-w-2xl mx-auto mt-10 text-center">
        <img
          src={sydneyImage}
          alt="Sydney, founder of GALOP"
          style={{
            width: 'clamp(7rem, 16vw, 10rem)',
            height: 'clamp(7rem, 16vw, 10rem)',
            borderRadius: '9999px',
            objectFit: 'cover',
            border: '3px solid #EF2A30',
            boxShadow: '0 6px 18px rgba(239, 42, 48, 0.18)',
            margin: '0 auto 1.75rem'
          }}
        />
        <Kicker>A note from our founder</Kicker>
        <Heading size="lg">Why I made GALOP</Heading>

        <div style={{
             fontFamily: 'Inter, sans-serif',
             fontSize: '1.05rem',
             fontWeight: 700,
             color: RED,
             lineHeight: 1.6,
             letterSpacing: '0.005em'
           }}>
          <p className="mb-6">
            I was on a GLP-1, doing everything my doctor told me and still losing my hair and fainting in the mornings. GLP-1 medications reduce your appetite, which means fewer nutrients reach your body. This is why people on GLP-1s often need higher doses of key vitamins to support their journey.
          </p>
          <p className="mb-6">
            A standard multivitamin wasn't built for this.
          </p>
          <p className="mb-6">
            So just like a pregnant person takes a prenatal, I found a doctor and built a multivitamin to optimize our journey.
          </p>
          <p className="mb-6">
            You deserve to feel like your absolute best self on a GLP-1.
          </p>
          <p className="mb-8">
            That's what GALOP is for.
          </p>
          <p style={{
               fontFamily: "'Caveat', cursive",
               fontWeight: 500,
               fontSize: 'clamp(2.25rem, 4vw, 3rem)',
               lineHeight: 1,
               letterSpacing: '0.01em',
               marginTop: '0.5rem'
             }}>
            — Sydney
          </p>
        </div>

        {/* Sydney: add more here — background, the GLP-1 story in more depth, how the formula came together. */}

        <div className="mt-16">
          <a href="/"
             style={{
               display: 'inline-block',
               background: RED,
               color: '#ffffff',
               fontFamily: 'Inter, sans-serif',
               fontWeight: 700,
               fontSize: '0.9rem',
               letterSpacing: '0.18em',
               textTransform: 'uppercase',
               borderRadius: '9999px',
               padding: '16px 32px',
               textDecoration: 'none'
             }}>
            Join the waitlist
          </a>
        </div>
      </div>
    </Layout>
  );
}
