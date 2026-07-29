import { useState } from 'react';
import { trackWaitlistSignup } from './analytics';
import { getAttribution } from './attribution';
import horseImage from "../imports/galop-horse.png";
import drinkMixImage from "../imports/drink-mix.png";
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
      color: '#EF2A30',
      transform: 'rotate(8deg)',
      whiteSpace: 'nowrap',
    }}
  >
    (with electrolytes!)
  </span>
);

/** Small diamond glyph used as a separator in the marquee banners. */
const DiamondGlyph = ({ opacity = 0.85 }: { opacity?: number }) => (
  <svg
    viewBox="0 0 24 22"
    width="0.75em"
    height="0.75em"
    aria-hidden="true"
    style={{
      display: 'inline-block',
      verticalAlign: '0.02em',
      margin: '0 1.25rem',
      fill: 'currentColor',
      opacity,
    }}
  >
    <polygon points="6,1 18,1 23,8 12,21 1,8" />
  </svg>
);

export default function App() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const KLAVIYO_PUBLIC_KEY = 'XchVzP';
  const KLAVIYO_LIST_ID = 'WNWyrF';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;
    setError('');
    setIsSubmitting(true);
    try {
      const attribution = getAttribution();
      const fields: Record<string, string> = {
        $source: attribution.utm_source ? `${attribution.utm_source} / paid` : 'galoplife.com',
        utm_source: attribution.utm_source ?? '',
        utm_medium: attribution.utm_medium ?? '',
        utm_campaign: attribution.utm_campaign ?? '',
        utm_content: attribution.utm_content ?? '',
      };
      const body = new URLSearchParams({
        g: KLAVIYO_LIST_ID,
        email,
        $fields: Object.keys(fields).join(','),
        ...fields,
      });
      await fetch(
        `https://manage.kmail-lists.com/subscriptions/subscribe?a=${KLAVIYO_PUBLIC_KEY}&g=${KLAVIYO_LIST_ID}`,
        {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: body.toString(),
        }
      );
      setIsSubmitted(true);
      setEmail('');
      trackWaitlistSignup(attribution.utm_campaign, attribution.utm_content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-6 pt-0 pb-12"
         style={{
           background: '#cbeafe',
           fontFamily: 'Inter, sans-serif'
         }}>
      {/* Top Marquee Banner */}
      <div style={{
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        marginRight: 'calc(50% - 50vw)',
        background: '#EF2A30',
        color: '#ffffff',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        padding: '8px 0',
        marginBottom: 'clamp(16px, 2.5vw, 32px)',
        borderBottom: '1px solid rgba(0,0,0,0.05)'
      }}>
        <div style={{
          display: 'inline-block',
          animation: 'marquee 30s linear infinite',
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '0.95rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          fontWeight: 500
        }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} style={{ marginRight: '3rem' }}>
              Launching Soon <DiamondGlyph /> Join the Waitlist <DiamondGlyph />
            </span>
          ))}
        </div>
      </div>

      <div className="w-full max-w-4xl">
        {/* Logo lockup: horse mark + GALOP wordmark */}
        <div className="flex flex-col items-center mb-2 sm:mb-4 animate-fade-in"
             style={{ animation: 'fadeIn 0.8s ease-out' }}>
          <img
            src={horseImage}
            alt=""
            aria-hidden="true"
            style={{
              width: 'clamp(5.5rem, 21vw, 15rem)',
              height: 'auto',
              marginBottom: 0
            }}
          />
          <h1 aria-label="GALOP"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                color: '#EF2A30',
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
               color: '#EF2A30',
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
              src={drinkMixImage}
              alt="GALOP pomegranate drink mix stick pack beside an iced glass of pomegranate drink"
              className="w-44 sm:w-60 h-auto object-contain"
              style={{
                filter: 'drop-shadow(0 8px 16px rgba(226, 30, 38, 0.25))',
                display: 'block',
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
              }}
            />
          </div>
        </div>


        {/* Heading */}
        <div className="text-center mb-6">
          {/* Main headline */}
          <h2 className="mb-3 sm:mb-4"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2.25rem, 6vw, 4rem)',
                fontWeight: 600,
                color: '#EF2A30',
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
               color: '#EF2A30',
               textTransform: 'uppercase',
               letterSpacing: '0.22em'
             }}>
            Doctor-formulated <span style={{ margin: '0 0.6em', opacity: 0.7 }}>·</span> Sugar-free <span style={{ margin: '0 0.6em', opacity: 0.7 }}>·</span> Pomegranate
          </p>
        </div>

        {/* Waitlist Form */}
        <div className="max-w-xl mx-auto">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-stretch">
              <input
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
                className="flex-1 focus:outline-none transition-all duration-300"
                style={{
                  background: '#ffffff',
                  borderRadius: '9999px',
                  border: '1px solid rgba(239, 42, 48, 0.15)',
                  padding: '18px 28px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1rem',
                  letterSpacing: '0.01em',
                  color: '#2d3748'
                }}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="transition-all duration-300 hover:opacity-90 disabled:opacity-60"
                style={{
                  background: '#EF2A30',
                  color: '#ffffff',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '18px 36px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {isSubmitting ? 'Joining…' : 'Join the Waitlist'}
              </button>
            </form>
          ) : (
            <div
              className="text-center animate-fade-in"
              style={{
                background: '#ffffff',
                borderRadius: '9999px',
                padding: '18px 28px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.95rem',
                color: '#EF2A30',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                border: '1px solid rgba(239, 42, 48, 0.2)'
              }}
            >
              Thank you
            </div>
          )}
          {error && (
            <p className="mt-3 text-center text-sm" style={{ color: '#EF2A30', fontFamily: "'Cormorant Garamond', serif" }}>{error}</p>
          )}
        </div>

        {/* Founder's Note */}
        <div className="max-w-2xl mx-auto mt-24 text-center">
          {/* Section kicker */}
          <p className="mb-4"
             style={{
               fontFamily: 'Inter, sans-serif',
               fontSize: '0.8rem',
               fontWeight: 700,
               color: '#EF2A30',
               textTransform: 'uppercase',
               letterSpacing: '0.22em',
               opacity: 0.85
             }}>
            A note from our founder
          </p>

          <h2 className="mb-8"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontWeight: 600,
                color: '#EF2A30',
                letterSpacing: '-0.01em',
                lineHeight: 1.1
              }}>
            Why I made GALOP
          </h2>

          <div style={{
               fontFamily: 'Inter, sans-serif',
               fontSize: '1.05rem',
               fontWeight: 700,
               color: '#EF2A30',
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
            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
              <img
                src={sydneyImage}
                alt="Sydney, founder of GALOP"
                style={{
                  width: 'clamp(5rem, 10vw, 7rem)',
                  height: 'clamp(5rem, 10vw, 7rem)',
                  borderRadius: '9999px',
                  objectFit: 'cover',
                  border: '3px solid #EF2A30',
                  boxShadow: '0 6px 18px rgba(239, 42, 48, 0.18)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Footer / Legal */}
        <footer className="max-w-2xl mx-auto mt-24 pb-10 text-center"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.75rem',
                  lineHeight: 1.6,
                  color: 'rgba(239, 42, 48, 0.7)',
                  letterSpacing: '0.02em'
                }}>
          <p>© {new Date().getFullYear()} GALOP. All rights reserved.</p>
          <p style={{ marginTop: '0.5rem' }}>
            <a
              href="/privacy.html"
              style={{
                color: 'rgba(239, 42, 48, 0.85)',
                textDecoration: 'underline',
                textUnderlineOffset: '0.2em'
              }}
            >
              Privacy Policy
            </a>
          </p>
        </footer>

      </div>

      {/* Bottom Marquee Banner */}
      <div style={{
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        marginRight: 'calc(50% - 50vw)',
        background: '#EF2A30',
        color: '#ffffff',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        padding: '10px 0',
        borderTop: '1px solid rgba(0,0,0,0.05)'
      }}>
        <div style={{
          display: 'inline-block',
          animation: 'marquee 30s linear infinite',
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '0.95rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          fontWeight: 500
        }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} style={{ marginRight: '3rem' }}>
              Launching Soon <DiamondGlyph /> Join the Waitlist <DiamondGlyph />
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(-2deg);
          }
          33% {
            transform: translateY(-15px) rotate(1deg);
          }
          66% {
            transform: translateY(-8px) rotate(-1deg);
          }
        }

        @keyframes drawLine {
          0% {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
          }
          100% {
            stroke-dasharray: 100;
            stroke-dashoffset: 0;
          }
        }

        @keyframes drawArrow {
          0% {
            stroke-dasharray: 20;
            stroke-dashoffset: 20;
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          100% {
            stroke-dasharray: 20;
            stroke-dashoffset: 0;
            opacity: 0.7;
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }

        .draw-line {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
        }

        .draw-arrow {
          stroke-dasharray: 20;
          stroke-dashoffset: 20;
          opacity: 0;
        }

        input::placeholder {
          color: rgba(45, 55, 72, 0.5);
          fontFamily: 'Cormorant Garamond', serif;
          letterSpacing: '0.02em';
        }
      `}</style>
    </div>
  );
}