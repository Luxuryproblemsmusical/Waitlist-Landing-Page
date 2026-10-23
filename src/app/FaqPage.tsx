import { Layout, Kicker, Heading, RED } from './Layout';
import { Gloss } from './Flourish';
import { Accordion } from './Interactive';

// Sydney: edit freely. Anything medical should be reviewed by the medical advisor before launch.
const FAQS: [string, string][] = [
  ['What is GALOP?', 'A doctor-formulated multivitamin drink mix with electrolytes, in lemonade, made for people on a GLP-1. Each pouch has 30 single-serve stick packs — mix one into water, once a day.'],
  ['Why do people on a GLP-1 need a different multivitamin?', 'GLP-1 medications reduce appetite, so you eat less — and fewer nutrients reach your body. GALOP is formulated with higher levels of the key vitamins, minerals, and electrolytes that tend to run low, to support hair, energy, hydration, and digestion along the way.'],
  ['What does it taste like?', 'Bright, classic lemonade. Zero sugar — sweetened with monkfruit and stevia.'],
  ['How do I take it?', 'Stir or shake one stick pack into 8–12 oz of cold water. Once a day, whenever it fits your routine.'],
  ['Is GALOP available now?', 'Yes — GALOP just launched. Order a single pouch or subscribe and save, and get 20% off your first order.'],
  ['How does the subscription work?', 'Subscribe & Save delivers a fresh 30-pack pouch every month with free shipping. You can pause, skip, or cancel anytime — no calls, no hoops.'],
  ['Is there a first-order discount?', 'Yes — new customers get 20% off their first order.'],
  ['Can I try it without subscribing?', 'Yes — a single pouch is available as a one-time purchase.'],
  ['Is it safe to take with my medication?', 'GALOP is a dietary supplement, not a medication. It is designed to complement a GLP-1 routine, but always check with your doctor before adding any supplement, especially if you are pregnant, nursing, or taking other medications.'],
  ['Where is it made?', 'Doctor-formulated and made in the USA.'],
];

export default function FaqPage() {
  return (
    <Layout title="FAQ — GALOP" current="/faq">
      <div className="max-w-2xl mx-auto mt-10 text-center">
        <Kicker>Frequently asked</Kicker>
        <Heading size="lg">Good questions.</Heading>
      </div>

      <div className="max-w-2xl mx-auto mt-6">
        <Accordion items={FAQS} variant="cards" defaultOpen={0} />
      </div>

      {/* Still curious */}
      <div className="max-w-2xl mx-auto mt-12 text-center lift"
           style={{ position: 'relative', background: RED, color: '#ffffff', borderRadius: '24px', padding: 'clamp(28px, 5vw, 40px) 24px' }}>
        <Gloss delay={2} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem, 4vw, 2.3rem)', fontWeight: 600, lineHeight: 1.1, margin: 0 }}>
            Still curious?
          </p>
          <p className="mt-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', fontWeight: 500, opacity: 0.9 }}>
            Ask us anything. We&rsquo;d love to hear from you.
          </p>
          <a href="mailto:galoplife@gmail.com" className="btn-gallop on-light" data-fizz="10"
             style={{
               display: 'inline-block', marginTop: '1.25rem', background: '#ffffff', color: RED,
               fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.16em',
               textTransform: 'uppercase', borderRadius: '9999px', padding: '14px 28px', textDecoration: 'none'
             }}>
            <span className="btn-label">Email galoplife@gmail.com</span>
          </a>
        </div>
      </div>
    </Layout>
  );
}
