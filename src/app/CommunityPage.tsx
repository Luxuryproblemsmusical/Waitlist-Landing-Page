import type { CSSProperties } from 'react';
import { Layout, Kicker, Heading, RED, INK } from './Layout';
import { COMMUNITY } from './links';

/** Community: where to find Sydney beyond the shop. The cards and their links live in links.ts. */
export default function CommunityPage() {
  return (
    <Layout title="Community — GALOP" current="/community">
      <div className="max-w-2xl mx-auto mt-10 text-center">
        <Kicker>Community</Kicker>
        <Heading size="lg" as="h1">Join the herd.</Heading>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '1rem', fontWeight: 500, color: INK, lineHeight: 1.6, margin: '-0.25rem 0 0' }}>
          Listen, follow and read along with Sydney.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mt-10 grid gap-5 sm:grid-cols-3">
        {COMMUNITY.map((c) => (
          <div key={c.kind} className="cut flex flex-col text-center"
               style={{
                 padding: 'clamp(26px, 4vw, 34px) 22px',
                 ['--cut' as string]: '20px', ['--bw' as string]: '1px',
                 ['--line' as string]: 'rgba(236, 29, 39, 0.2)', ['--fill' as string]: '#ffffff',
               } as CSSProperties}>
            <span aria-hidden="true" className="cut-shadow"
                  style={{ ['--shadow' as string]: '0 18px 30px rgba(30, 60, 90, 0.12), 0 2px 4px rgba(30, 60, 90, 0.05)' } as CSSProperties} />
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', color: INK, margin: 0 }}>
              {c.kind}
            </p>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 600, fontSize: 'clamp(1.7rem, 3.4vw, 2rem)', lineHeight: 1.08, color: RED, margin: '0.5rem 0 0.6rem', textWrap: 'balance' }}>
              {c.name}
            </h2>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '0.92rem', fontWeight: 500, color: INK, lineHeight: 1.6, margin: '0 0 1.4rem' }}>
              {c.text}
            </p>
            <div style={{ marginTop: 'auto' }}>
              {c.url ? (
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="btn-gallop cut-solid"
                   style={{
                     display: 'inline-block', background: RED, color: '#ffffff',
                     fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.16em',
                     textTransform: 'uppercase', padding: '13px 26px', textDecoration: 'none',
                   }}>
                  <span className="btn-label">{c.cta}</span>
                </a>
              ) : (
                <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: '1.05rem', color: INK, opacity: 0.75 }}>
                  Link coming soon
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
