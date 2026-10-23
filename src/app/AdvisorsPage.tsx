import { Layout, Kicker, Heading, RED } from './Layout';
import { FlipCard, CardKicker, CardTitle, CardText } from './Interactive';
import horseImage from "../imports/galop-horse.png";

/**
 * Advisory board. Sydney: for each advisor, drop a square photo into
 * src/imports/ (e.g. advisor-doctor.jpg), import it here, and fill in the
 * name, title, and a short blurb pulled from their site. Cards flip on tap to
 * show the blurb; without a photo they show the horse mark as a placeholder.
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

const Portrait = ({ a }: { a: Advisor }) => a.photo ? (
  <img src={a.photo} alt={a.name ?? a.role}
       style={{
         width: '6.5rem', height: '6.5rem', borderRadius: '9999px', objectFit: 'cover',
         border: '3px solid #EF2A30', boxShadow: '0 6px 18px rgba(239, 42, 48, 0.18)'
       }} />
) : (
  <span aria-hidden="true"
        style={{
          width: '6.5rem', height: '6.5rem', borderRadius: '9999px',
          border: '3px solid rgba(239, 42, 48, 0.35)',
          background: 'rgba(239, 42, 48, 0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
    <img src={horseImage} alt="" style={{ width: '55%', height: 'auto', opacity: 0.55 }} />
  </span>
);

const Card = ({ a, i }: { a: Advisor; i: number }) => (
  <FlipCard tone="glass" glossDelay={1 + i * 0.8}
            front={
              <span className="flex flex-col items-center text-center">
                <Portrait a={a} />
                <span className="mt-5"><CardKicker>{a.role}</CardKicker></span>
                <CardTitle>{a.name ?? 'Announcing soon'}</CardTitle>
                {a.title && <CardText>{a.title}</CardText>}
              </span>
            }
            back={
              <span className="flex flex-col items-center text-center">
                <CardKicker>{a.role}</CardKicker>
                <CardTitle>{a.name ?? 'Joining the board'}</CardTitle>
                <CardText>
                  {a.blurb ?? 'Part of the team of clinicians and specialists making sure GALOP is built on real science, not vibes.'}
                </CardText>
              </span>
            } />
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
        {ADVISORS.map((a, i) => <Card key={a.role} a={a} i={i} />)}
      </div>
    </Layout>
  );
}
