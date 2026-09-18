import { Layout, Kicker, Heading, RED } from './Layout';

/**
 * Advisory board. Sydney: for each advisor, drop a square photo into
 * src/imports/ (e.g. advisor-doctor.jpg), import it here, and fill in the
 * name, title, and a short blurb pulled from their site. Cards without a
 * photo render a placeholder circle so the page looks finished meanwhile.
 */
type Advisor = {
  role: string;
  name?: string;
  title?: string;
  blurb?: string;
  photo?: string;
};

const ADVISORS: Advisor[] = [
  {
    role: 'Medical Advisor',
    name: undefined, // e.g. 'Dr. Jane Doe, MD'
    title: undefined, // e.g. 'Board-certified internist'
    blurb: undefined,
  },
  {
    role: 'Nutrition Advisor',
  },
  {
    role: 'Dermatology Advisor',
  },
];

const Card = ({ a }: { a: Advisor }) => (
  <div className="flex flex-col items-center text-center"
       style={{
         background: 'rgba(255,255,255,0.55)',
         border: '2px solid rgba(239, 42, 48, 0.2)',
         borderRadius: '22px',
         padding: '28px 22px'
       }}>
    {a.photo ? (
      <img src={a.photo} alt={a.name ?? a.role}
           style={{
             width: '7rem', height: '7rem', borderRadius: '9999px', objectFit: 'cover',
             border: '3px solid #EF2A30', boxShadow: '0 6px 18px rgba(239, 42, 48, 0.18)'
           }} />
    ) : (
      <div aria-hidden="true"
           style={{
             width: '7rem', height: '7rem', borderRadius: '9999px',
             border: '3px solid rgba(239, 42, 48, 0.35)',
             background: 'rgba(239, 42, 48, 0.08)',
             display: 'flex', alignItems: 'center', justifyContent: 'center',
             fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', color: RED, opacity: 0.6
           }}>
        ✦
      </div>
    )}
    <p className="mt-5"
       style={{
         fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', fontWeight: 700,
         color: RED, textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.85
       }}>
      {a.role}
    </p>
    <p className="mt-1"
       style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 600, color: RED, lineHeight: 1.15 }}>
      {a.name ?? 'Announcing soon'}
    </p>
    {a.title && (
      <p className="mt-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 700, color: RED, opacity: 0.8 }}>
        {a.title}
      </p>
    )}
    <p className="mt-3"
       style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: RED, opacity: 0.85, lineHeight: 1.6 }}>
      {a.blurb ?? 'Part of the team of clinicians and specialists making sure GALOP is built on real science, not vibes.'}
    </p>
  </div>
);

export default function AdvisorsPage() {
  return (
    <Layout title="Advisors — GALOP" current="/advisors">
      <div className="max-w-2xl mx-auto mt-10 text-center">
        <Kicker>Advisory board</Kicker>
        <Heading size="lg">The people behind the formula.</Heading>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 600, color: RED, lineHeight: 1.6, opacity: 0.9 }}>
          GALOP is doctor-formulated and built with a board of clinicians who live this stuff every day.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mt-12 grid gap-6 sm:grid-cols-3">
        {ADVISORS.map((a) => <Card key={a.role} a={a} />)}
      </div>
    </Layout>
  );
}
