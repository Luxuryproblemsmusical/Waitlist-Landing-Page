import { useId, useState, type CSSProperties, type FormEvent } from 'react';
import { Layout, Kicker, Heading, RED, INK } from './Layout';
import { COMMUNITY } from './links';

const sans = "'Montserrat', sans-serif";
const field: CSSProperties = {
  display: 'block', width: '100%', background: 'transparent', border: 'none', padding: '16px 20px',
  fontFamily: sans, fontSize: '1rem', letterSpacing: '0.01em', color: INK, lineHeight: 1.55,
};
const frame = {
  display: 'block', ['--cut' as string]: '12px', ['--bw' as string]: '1px',
  ['--line' as string]: 'rgba(236, 29, 39, 0.28)', ['--fill' as string]: '#ffffff',
} as CSSProperties;

/** Where questions go. FormSubmit relays the form to this inbox; no server of our own is involved. */
const ASK_EMAIL = 'galoplife@gmail.com';

/**
 * Ask a question. The form posts to FormSubmit, which emails it to ASK_EMAIL, so the visitor
 * never leaves the page. (The first submission from a new site makes FormSubmit send that inbox
 * a one-time "activate" email; questions are delivered once it's been clicked.) The hidden
 * _honey field is a honeypot: only bots fill it in, and those are dropped.
 */
function AskBox() {
  const [question, setQuestion] = useState('');
  const [name, setName] = useState('');
  const [honey, setHoney] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const qId = useId();
  const nId = useId();

  const send = async (e: FormEvent) => {
    e.preventDefault();
    if (state === 'sending') return;
    if (honey) { setState('sent'); return; }
    setState('sending');
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${ASK_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: 'A question about life on a GLP-1',
          _template: 'box',
          name: name.trim() || 'Not given',
          question: question.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || String(data.success) !== 'true') throw new Error('not sent');
      setQuestion('');
      setName('');
      setState('sent');
    } catch {
      setState('error');
    }
  };

  return (
    <section className="max-w-2xl mx-auto mt-16 md:mt-20 text-center" aria-labelledby="ask-heading">
      <Kicker>Ask us</Kicker>
      <span id="ask-heading"><Heading>Got questions about life on a GLP&#8209;1?</Heading></span>
      <p style={{ fontFamily: sans, fontSize: '1rem', fontWeight: 500, color: INK, lineHeight: 1.6, margin: '-0.5rem 0 0' }}>
        Post it here and we&rsquo;ll get it answered.
      </p>

      {state === 'sent' ? (
        <div className="cut mt-6" role="status"
             style={{
               ['--cut' as string]: '12px', ['--bw' as string]: '1px',
               ['--line' as string]: 'rgba(236, 29, 39, 0.3)', ['--fill' as string]: '#ffffff',
               padding: '22px 28px', fontFamily: sans, fontSize: '0.9rem', color: RED, fontWeight: 700,
               letterSpacing: '0.16em', textTransform: 'uppercase', lineHeight: 1.5,
             } as CSSProperties}>
          Thank you &mdash; we&rsquo;ve got your question.
        </div>
      ) : (
        <form onSubmit={send} className="flex flex-col gap-3 mt-6 text-left">
          <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" value={honey}
                 onChange={(e) => setHoney(e.target.value)}
                 style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
          <label htmlFor={qId} className="sr-only">Your question</label>
          <span className="galop-field cut" style={frame}>
            <textarea id={qId} name="question" rows={4} required maxLength={1500} value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="What would you like to know?"
                      className="focus:outline-none" style={{ ...field, resize: 'vertical', minHeight: '8rem' }} />
          </span>
          <label htmlFor={nId} className="sr-only">First name (optional)</label>
          <span className="galop-field cut" style={frame}>
            <input id={nId} type="text" name="name" autoComplete="given-name" maxLength={60} value={name}
                   onChange={(e) => setName(e.target.value)}
                   placeholder="First name (optional)"
                   className="focus:outline-none" style={field} />
          </span>
          <button type="submit" disabled={state === 'sending'} className="btn-gallop cut-solid disabled:opacity-60"
                  style={{
                    background: RED, color: '#ffffff', border: 'none', cursor: 'pointer',
                    fontFamily: sans, fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.16em',
                    textTransform: 'uppercase', padding: '17px 28px',
                  }}>
            <span className="btn-label">{state === 'sending' ? 'Sending…' : 'Send my question'}</span>
          </button>
        </form>
      )}

      {state === 'error' ? (
        <p role="alert" style={{ fontFamily: sans, fontSize: '0.82rem', fontWeight: 600, color: INK, lineHeight: 1.6, margin: '1rem 0 0' }}>
          That didn&rsquo;t send. Please try again, or write to{' '}
          <a href={`mailto:${ASK_EMAIL}`} style={{ color: INK, textDecoration: 'underline', textUnderlineOffset: '0.2em' }}>{ASK_EMAIL}</a>.
        </p>
      ) : (
        <p style={{ fontFamily: sans, fontSize: '0.82rem', fontWeight: 500, color: INK, lineHeight: 1.6, margin: '1rem 0 0' }}>
          Answers are general information, not personal medical advice.
        </p>
      )}
    </section>
  );
}

/** Community: where to find Sydney beyond the shop. The cards and their links live in links.ts. */
export default function CommunityPage() {
  return (
    <Layout title="Community — GALOP" current="/community">
      <div className="max-w-2xl mx-auto mt-10 text-center">
        <Kicker>Community</Kicker>
        <Heading size="lg" as="h1">Join the herd.</Heading>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '1rem', fontWeight: 500, color: INK, lineHeight: 1.6, margin: '-0.25rem 0 0' }}>
          Metabolism Diaries is Sydney&rsquo;s home for honest GLP&#8209;1 stories. Listen, watch, read and follow along.
        </p>
      </div>

      <div className="max-w-3xl mx-auto mt-10 grid gap-5 sm:grid-cols-2">
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

      <AskBox />
    </Layout>
  );
}
