import { Layout, Kicker, Heading, RED } from './Layout';

// Sydney: edit freely. Anything medical should be reviewed by the medical advisor before launch.
const FAQS: [string, string][] = [
  ['What is GALOP?', 'A doctor-formulated multivitamin + electrolyte drink mix made for people on a GLP-1. Each pouch has 30 single-serve stick packs — mix one into water, once a day.'],
  ['Why do people on a GLP-1 need a different multivitamin?', 'GLP-1 medications reduce appetite, so you eat less — and fewer nutrients reach your body. GALOP is formulated with higher levels of the key vitamins, minerals, and electrolytes that tend to run low, to support hair, energy, hydration, and digestion along the way.'],
  ['What does it taste like?', 'Lemonade with a hint of ginger. Zero sugar — sweetened with monkfruit and stevia.'],
  ['How do I take it?', 'Stir or shake one stick pack into 8–12 oz of cold water. Once a day, whenever it fits your routine.'],
  ['When does GALOP ship?', 'First orders ship in December. People on the founding list get first access.'],
  ['How does the subscription work?', 'The Monthly Ritual delivers a fresh 30-pack pouch every month with free shipping. You can pause, skip, or cancel anytime — no calls, no hoops.'],
  ['Can I try it without subscribing?', 'Yes — a single pouch is available as a one-time purchase.'],
  ['Is it safe to take with my medication?', 'GALOP is a dietary supplement, not a medication. It is designed to complement a GLP-1 routine, but always check with your doctor before adding any supplement, especially if you are pregnant, nursing, or taking other medications.'],
  ['Where is it made?', 'Doctor-formulated and made in the USA.'],
];

export default function FaqPage() {
  return (
    <Layout title="Q&A — GALOP" current="/faq">
      <div className="max-w-2xl mx-auto mt-10 text-center">
        <Kicker>Questions & answers</Kicker>
        <Heading size="lg">Good questions.</Heading>
      </div>

      <div className="max-w-2xl mx-auto mt-6">
        {FAQS.map(([q, a]) => (
          <div key={q} className="py-5"
               style={{ borderBottom: '1px solid rgba(239, 42, 48, 0.18)' }}>
            <p style={{
                 fontFamily: "'Cormorant Garamond', serif",
                 fontSize: 'clamp(1.35rem, 3vw, 1.6rem)',
                 fontWeight: 600,
                 color: RED,
                 margin: 0,
                 lineHeight: 1.2
               }}>
              {q}
            </p>
            <p className="mt-2"
               style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', color: RED, opacity: 0.85, lineHeight: 1.65 }}>
              {a}
            </p>
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto mt-12 text-center"
           style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: RED, opacity: 0.85 }}>
        Still curious? Email <a href="mailto:galoplife@gmail.com" style={{ color: RED, textDecoration: 'underline', textUnderlineOffset: '0.2em' }}>galoplife@gmail.com</a>.
      </div>
    </Layout>
  );
}
