import { useState } from 'react';
import logoImage from "../imports/PNG_image-2.png";
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
    <div className="min-h-screen flex items-center justify-center px-6 py-12"
         style={{
           background: 'linear-gradient(135deg, #B8D4E5 0%, #A8C8DC 100%)',
           fontFamily: 'Inter, sans-serif'
         }}>
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
          <h1 className="mb-4"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '3.5rem',
                fontWeight: 600,
                color: '#E21E26',
                letterSpacing: '0.05em',
                lineHeight: 1.1,
                textTransform: 'uppercase'
              }}>
            Coming Soon
          </h1>
          <p className="mx-auto max-w-lg"
             style={{
               fontFamily: "'Cormorant Garamond', serif",
               fontSize: '1rem',
               fontWeight: 400,
               fontStyle: 'normal',
               color: '#2d3748',
               lineHeight: 1.6,
               letterSpacing: '0.02em'
             }}>Doctor-formulated multivitamin gummies designed for your <span style={{
               fontStyle: 'normal',
               fontWeight: 600,
               color: '#2d3748',
               borderBottom: '1px solid #E21E26',
               paddingBottom: '1px',
               letterSpacing: '0.03em'
             }}>GLP-1 Journey</span>.</p>
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
                {isSubmitting ? 'Joining…' : 'Join Waitlist'}
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

      </div>

      <style>{`
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