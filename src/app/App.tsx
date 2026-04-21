import { useState } from 'react';
import logoImage from "../imports/logo-new.png";
import gummyImage from "../imports/PNG_image-3.png";

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
      const body = new URLSearchParams({
        g: KLAVIYO_LIST_ID,
        email,
        $fields: '$source',
        $source: 'galoplife.com',
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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-6 pt-0 pb-12"
         style={{
           background: '#c4e4f6',
           fontFamily: 'Inter, sans-serif'
         }}>
      {/* Top Marquee Banner */}
      <div style={{
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        marginRight: 'calc(50% - 50vw)',
        background: '#E21E26',
        color: '#ffffff',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        padding: '10px 0',
        marginBottom: '48px',
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
              Launching Soon <span style={{ opacity: 0.6, margin: '0 1.5rem' }}>✦</span> Join the Waitlist <span style={{ opacity: 0.6, margin: '0 1.5rem' }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="flex justify-center mb-8 animate-fade-in"
             style={{ animation: 'fadeIn 0.8s ease-out' }}>
          <img
            src={logoImage}
            alt="GALOP"
            className="h-16 w-auto"
          />
        </div>

        {/* Hero Gummy with Infographic Lines */}
        <div className="relative flex justify-center items-center mb-16 mt-8" style={{ height: '280px', width: '100%', maxWidth: '550px', margin: '0 auto' }}>
          {/* Left Feature */}
          <div className="absolute left-4 top-[52%] -translate-y-1/2 flex items-center gap-2 sm:gap-3 group cursor-pointer p-[0px] mx-[-5px] my-[0px]">
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(0.7rem, 2.6vw, 0.95rem)',
              fontWeight: 500,
              color: '#2d3748',
              whiteSpace: 'nowrap',
              fontStyle: 'normal',
              letterSpacing: '0.02em'
            }}>Doctor-formulated</p>
            <svg className="mx-[5px] my-[0px]" height="2" viewBox="0 0 50 2" preserveAspectRatio="none" className="w-7 sm:w-[50px]" style={{ overflow: 'visible' }}>
              <line x1="0" y1="1" x2="50" y2="1"
                    stroke="rgba(45, 55, 72, 0.3)"
                    strokeWidth="1"
                    fill="none"
                    strokeLinecap="square"
                    className="draw-line transition-all duration-500 group-hover:stroke-[#E21E26]"
                    style={{ animation: 'drawLine 1.5s ease-out forwards', animationDelay: '0.3s' }} />
            </svg>
          </div>

          {/* Gummy Center */}
          <div className="animate-float z-10 px-[0px] py-[10px]"
               style={{
                 animation: 'float 4s ease-in-out infinite',
                 background: 'transparent',
                 width: 'fit-content',
               }}>
            <img
              src={gummyImage}
              alt="GALOP Gummy"
              className="w-32 h-32 sm:w-48 sm:h-48 object-contain mx-[5px]"
              style={{
                filter: 'drop-shadow(0 8px 16px rgba(226, 30, 38, 0.25))',
                display: 'block',
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
              }}
            />
          </div>

          {/* Top Right Feature */}
          <div className="absolute right-4 top-[38%] flex items-center gap-2 sm:gap-3 group cursor-pointer px-[26px] py-[0px]">
            <svg height="2" viewBox="0 0 50 2" preserveAspectRatio="none" className="w-7 sm:w-[50px]" style={{ overflow: 'visible' }}>
              <line x1="0" y1="1" x2="50" y2="1"
                    stroke="rgba(45, 55, 72, 0.3)"
                    strokeWidth="1"
                    fill="none"
                    strokeLinecap="square"
                    className="draw-line transition-all duration-500 group-hover:stroke-[#E21E26]"
                    style={{ animation: 'drawLine 1.5s ease-out forwards', animationDelay: '0.5s' }} />
            </svg>
            <p className="px-[0px] py-[10px]" style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(0.7rem, 2.6vw, 0.95rem)',
              fontWeight: 500,
              color: '#2d3748',
              whiteSpace: 'nowrap',
              fontStyle: 'normal',
              letterSpacing: '0.02em'
            }}>Sugar-free</p>
          </div>

          {/* Bottom Right Feature */}
          <div className="absolute right-4 top-[58%] flex items-center gap-2 sm:gap-3 group cursor-pointer px-[19px] py-[0px] mx-[10px] my-[0px]">
            <svg height="2" viewBox="0 0 50 2" preserveAspectRatio="none" className="w-7 sm:w-[50px]" style={{ overflow: 'visible' }}>
              <line x1="0" y1="1" x2="50" y2="1"
                    stroke="rgba(45, 55, 72, 0.3)"
                    strokeWidth="1"
                    fill="none"
                    strokeLinecap="square"
                    className="draw-line transition-all duration-500 group-hover:stroke-[#E21E26]"
                    style={{ animation: 'drawLine 1.5s ease-out forwards', animationDelay: '0.7s' }} />
            </svg>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(0.7rem, 2.6vw, 0.95rem)',
              fontWeight: 500,
              color: '#2d3748',
              whiteSpace: 'nowrap',
              fontStyle: 'normal',
              letterSpacing: '0.02em'
            }}>Strawberry flavor</p>
          </div>
        </div>


        {/* Heading */}
        <div className="text-center mb-8">
          {/* Kicker */}
          <p className="mb-4"
             style={{
               fontFamily: 'Inter, sans-serif',
               fontSize: '0.8rem',
               fontWeight: 700,
               color: '#E21E26',
               textTransform: 'uppercase',
               letterSpacing: '0.22em'
             }}>
            The multivitamin gummy for life on a GLP-1
          </p>

          {/* Main headline */}
          <h1 className="mb-5"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2.5rem, 6vw, 3.75rem)',
                fontWeight: 500,
                color: '#E21E26',
                letterSpacing: '0.01em',
                lineHeight: 1.05
              }}>
            Coming soon.
          </h1>

          {/* Highlights line */}
          <p style={{
               fontFamily: 'Inter, sans-serif',
               fontSize: '0.8rem',
               fontWeight: 600,
               color: '#2d3748',
               textTransform: 'uppercase',
               letterSpacing: '0.22em'
             }}>
            Doctor-formulated <span style={{ margin: '0 0.6em', opacity: 0.7 }}>·</span> Sugar-free <span style={{ margin: '0 0.6em', opacity: 0.7 }}>·</span> Strawberry
          </p>
        </div>

        {/* Waitlist Form */}
        <div className="max-w-md mx-auto">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
                className="flex-1 px-6 py-3 bg-white/80 backdrop-blur-sm border border-transparent focus:border-gray-400 focus:outline-none transition-all duration-300"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '0.875rem',
                  letterSpacing: '0.02em',
                  color: '#2d3748'
                }}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 transition-all duration-300 hover:opacity-90 disabled:opacity-60"
                style={{
                  background: '#E21E26',
                  color: '#ffffff',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {isSubmitting ? 'Joining…' : 'Join the Waitlist'}
              </button>
            </form>
          ) : (
            <div
              className="text-center py-4 px-8 bg-white/80 animate-fade-in"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '0.875rem',
                color: '#2d3748',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                border: '1px solid rgba(45, 55, 72, 0.2)'
              }}
            >
              Thank you
            </div>
          )}
          {error && (
            <p className="mt-3 text-center text-sm" style={{ color: '#E21E26', fontFamily: "'Cormorant Garamond', serif" }}>{error}</p>
          )}
        </div>

        {/* Founder's Note */}
        <div className="max-w-xl mx-auto mt-20 text-center">
          <h2 className="mb-6"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.75rem',
                fontWeight: 600,
                color: '#E21E26',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
            Why I made GALOP
          </h2>
          <p style={{
               fontFamily: "'Cormorant Garamond', serif",
               fontSize: '1.05rem',
               fontWeight: 400,
               color: '#2d3748',
               lineHeight: 1.7,
               letterSpacing: '0.01em'
             }}>
            I was on a GLP-1, doing everything my doctor told me and still losing my hair and fainting in the mornings. GLP-1 medications reduce your appetite, which means fewer nutrients reach your body. This is why people on GLP-1s often need higher doses of key vitamins to support their journey. A standard multivitamin wasn't built for this. So just like a pregnant person takes a prenatal, I found a doctor and built a multivitamin to optimize our journey. You deserve to feel like your absolute best self on a GLP-1. That's what GALOP is for.
          </p>
          <p className="mt-6" style={{
               fontFamily: "'Cormorant Garamond', serif",
               fontStyle: 'italic',
               fontSize: '1.05rem',
               color: '#2d3748',
               letterSpacing: '0.02em'
             }}>
            — Sydney
          </p>
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