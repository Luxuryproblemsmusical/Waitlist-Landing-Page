import { Layout, Kicker, Heading } from './Layout';
import { PlanPicker } from './PlanPicker';
import heroImage from "../imports/hero-lemonade.png";

/** Standalone Subscribe & Save page (the same plan picker also lives on the homepage). */
export default function SubscribePage() {
  return (
    <Layout title="Subscribe & Save — GALOP" current="/">
      <div className="max-w-2xl mx-auto mt-10 text-center">
        <Kicker>Your monthly ritual for life on a GLP&#8209;1</Kicker>
        <Heading size="lg">Subscribe &amp; save.</Heading>
        <div className="flex justify-center my-8">
          <img
            src={heroImage}
            alt="GALOP lemonade drink mix stick pack beside an iced glass of ginger lemonade"
            className="w-44 sm:w-56 h-auto object-contain"
            style={{ filter: 'drop-shadow(0 8px 16px rgba(30, 60, 90, 0.18))' }}
          />
        </div>
      </div>
      <PlanPicker source="galoplife.com/subscribe" />
    </Layout>
  );
}
