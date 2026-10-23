import { Layout, Kicker, Heading, RED } from './Layout';
import { Note } from './Flourish';
import { FlipCard, CardKicker, CardTitle, CardText } from './Interactive';
import sydneyImage from "../imports/sydney.png";

// [front title, front text, back title, back text]
const DIFFERENT: [string, string, string, string][] = [
  ['Doctor-formulated', 'Not a generic multi with a new label.',
   'Built with a doctor', 'Sydney found a doctor and built the formula around life on a GLP-1.'],
  ['Dosed for the journey', 'Higher levels of what tends to run low.',
   'Like a prenatal', 'A prenatal is made for pregnancy. GALOP is made for life on a GLP-1.'],
  ['Tastes like lemonade', 'Sips, not pills.',
   'One stick a day', 'Stir one stick into cold water, once a day, whenever it fits your routine.'],
];

const body = { fontFamily: 'Inter, sans-serif', fontSize: '1.08rem', fontWeight: 500, color: RED, lineHeight: 1.75 } as const;

export default function AboutPage() {
  return (
    <Layout title="About — GALOP" current="/about">
      {/* Portrait + title */}
      <div className="max-w-2xl mx-auto mt-10 text-center">
        <div className="relative inline-block" style={{ marginBottom: '1.75rem' }}>
          <img
            src={sydneyImage}
            alt="Sydney, founder of GALOP"
            style={{
              width: 'clamp(8rem, 18vw, 11rem)',
              height: 'clamp(8rem, 18vw, 11rem)',
              borderRadius: '9999px',
              objectFit: 'cover',
              border: '4px solid #ffffff',
              outline: `2px solid ${RED}`,
              boxShadow: '0 14px 30px rgba(239, 42, 48, 0.2)',
            }}
          />
          <Note rotate={-8} style={{ position: 'absolute', right: '-4.5rem', bottom: '0.2rem', fontSize: '1.4rem' }}>
            Sydney, founder
          </Note>
        </div>
        <Kicker>A note from our founder</Kicker>
        <Heading size="lg">Why I made GALOP</Heading>
      </div>

      {/* Story */}
      <div className="max-w-xl mx-auto mt-2" style={body}>
        <p className="mb-6">
          I was on a GLP-1, doing everything my doctor told me and still losing my hair and fainting in the mornings. GLP-1 medications reduce your appetite, which means fewer nutrients reach your body. This is why people on GLP-1s often need higher doses of key vitamins to support their journey.
        </p>
      </div>

      {/* Pull quote */}
      <figure className="max-w-2xl mx-auto my-10 text-center">
        <span aria-hidden="true"
              style={{ display: 'block', fontFamily: "'Cormorant Garamond', serif", fontSize: '5rem', lineHeight: 0.5, color: RED, opacity: 0.25 }}>
          &ldquo;
        </span>
        <blockquote style={{
              fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 500,
              fontSize: 'clamp(1.9rem, 4.5vw, 2.8rem)', lineHeight: 1.15, color: RED, margin: 0
            }}>
          A standard multivitamin wasn&rsquo;t built for this.
        </blockquote>
      </figure>

      <div className="max-w-xl mx-auto" style={body}>
        <p className="mb-6">
          So just like a pregnant person takes a prenatal, I found a doctor and built a multivitamin to optimize our journey.
        </p>
        <p className="mb-6">
          You deserve to feel like your absolute best self on a GLP-1.
        </p>
        <p className="mb-2" style={{ fontWeight: 700 }}>
          That&rsquo;s what GALOP is for.
        </p>
        <p style={{ fontFamily: "'Caveat', cursive", fontWeight: 500, fontSize: 'clamp(2.25rem, 4vw, 3rem)', lineHeight: 1, marginTop: '1rem' }}>
          Ride with me.
          <span style={{ display: 'block', fontSize: '0.8em', marginTop: '0.35rem' }}>— Sydney</span>
        </p>
      </div>

      {/* What makes it different */}
      <div className="max-w-4xl mx-auto mt-20 text-center">
        <Kicker>What makes it different</Kicker>
        <Heading>Made for this, on purpose.</Heading>
      </div>
      <div className="max-w-4xl mx-auto grid gap-5 sm:grid-cols-3">
        {DIFFERENT.map(([h, p, bh, bp], i) => (
          <FlipCard key={bh} tone="glass" glossDelay={1 + i * 0.8}
                    front={<><CardKicker>0{i + 1}</CardKicker><CardTitle>{h}</CardTitle><CardText>{p}</CardText></>}
                    back={<><CardTitle>{bh}</CardTitle><CardText>{bp}</CardText></>} />
        ))}
      </div>

      <div className="mt-16 text-center">
        <a href="/#shop" className="btn-gallop" data-fizz="12"
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
             padding: '18px 36px',
             textDecoration: 'none'
           }}>
          <span className="btn-label">Shop GALOP</span>
        </a>
      </div>
    </Layout>
  );
}
