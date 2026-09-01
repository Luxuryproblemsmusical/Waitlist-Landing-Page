/**
 * Post-signup states for the waitlist form.
 *
 * The Klaviyo list uses double opt-in, so a submitted address is not on the
 * list until the visitor clicks the link in the confirmation email. These
 * cards tell them that, and pre-empt the "it went to spam" failure mode.
 */

const RED = '#EF2A30';
const INK = '#2d3748';

const cardStyle: React.CSSProperties = {
  background: '#ffffff',
  borderRadius: '28px',
  padding: 'clamp(24px, 4vw, 36px) clamp(20px, 5vw, 40px)',
  border: '1px solid rgba(239, 42, 48, 0.2)',
  boxShadow: '0 10px 30px rgba(30, 60, 90, 0.08)',
  textAlign: 'center',
};

const titleStyle: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: 'clamp(1.9rem, 4.5vw, 2.5rem)',
  fontWeight: 600,
  color: RED,
  letterSpacing: '-0.01em',
  lineHeight: 1.05,
  margin: 0,
};

const bodyStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)',
  lineHeight: 1.6,
  color: INK,
  marginTop: '0.9rem',
};

const kickerStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.7rem',
  fontWeight: 700,
  color: RED,
  textTransform: 'uppercase',
  letterSpacing: '0.2em',
  margin: 0,
};

const tipStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.88rem',
  lineHeight: 1.55,
  color: INK,
  margin: 0,
};

const linkButtonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.8rem',
  fontWeight: 700,
  color: RED,
  textTransform: 'uppercase',
  letterSpacing: '0.16em',
  textDecoration: 'underline',
  textUnderlineOffset: '0.25em',
};

type CheckInboxCardProps = {
  /** The address the confirmation email was sent to. */
  email: string;
  /** Address the confirmation email is sent from, so people can whitelist it. */
  senderEmail: string;
  /** Lets the visitor go back and try another address. */
  onReset: () => void;
};

export function CheckInboxCard({ email, senderEmail, onReset }: CheckInboxCardProps) {
  return (
    <div className="animate-fade-in" style={cardStyle} role="status" aria-live="polite">
      <p style={{ ...kickerStyle, marginBottom: '0.75rem' }}>One more step</p>
      <h3 style={titleStyle}>Check your inbox</h3>
      <p style={bodyStyle}>
        We just sent a confirmation link to{' '}
        <strong style={{ color: RED, fontWeight: 700, overflowWrap: 'anywhere' }}>{email}</strong>.
        Tap it to lock in your spot on the waitlist.
      </p>

      <div
        style={{
          marginTop: '1.5rem',
          padding: '1rem 1.25rem',
          borderRadius: '18px',
          background: 'rgba(203, 234, 254, 0.45)',
          textAlign: 'left',
        }}
      >
        <p style={{ ...kickerStyle, marginBottom: '0.5rem' }}>Not seeing it?</p>
        <ul style={{ margin: 0, paddingLeft: '1.1rem', display: 'grid', gap: '0.4rem' }}>
          <li style={tipStyle}>
            Check your <strong>Spam</strong>, <strong>Junk</strong>, or <strong>Promotions</strong> folder.
            It can take a minute or two to arrive.
          </li>
          <li style={tipStyle}>
            Found it there? Drag it to your inbox and add{' '}
            <strong style={{ overflowWrap: 'anywhere' }}>{senderEmail}</strong> to your contacts
            so launch news reaches you.
          </li>
        </ul>
      </div>

      <div style={{ marginTop: '1.4rem' }}>
        <button type="button" onClick={onReset} style={linkButtonStyle}>
          Use a different email
        </button>
      </div>
    </div>
  );
}

export function ConfirmedCard() {
  return (
    <div className="animate-fade-in" style={cardStyle} role="status" aria-live="polite">
      <p style={{ ...kickerStyle, marginBottom: '0.75rem' }}>Confirmed</p>
      <h3 style={titleStyle}>You&rsquo;re on the list.</h3>
      <p style={bodyStyle}>
        Your email is confirmed. We&rsquo;ll let you know the moment GALOP launches.
      </p>
    </div>
  );
}
