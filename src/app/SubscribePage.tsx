import { Layout, Kicker, Heading } from './Layout';
import { PlanPicker } from './PlanPicker';
import pouchImage from "../imports/pouch-lemonade-v2.webp";

/** Standalone Subscribe & Save page (the same plan picker also lives on the homepage). */
export default function SubscribePage() {
  return (
    <Layout title="Subscribe & Save — GALOP" current="/">
      <div className="max-w-2xl mx-auto mt-10 text-center">
        <Kicker>Your monthly ritual for life on a GLP&#8209;1</Kicker>
        <Heading size="lg">Subscribe &amp; save.</Heading>
        <div className="flex justify-center my-8">
          <img
            src={pouchImage}
            alt="GALOP multivitamin drink mix pouch in lemonade, with a single stick pack beside it"
            className="w-56 sm:w-72 h-auto"
            style={{ borderRadius: '20px', boxShadow: '0 12px 28px rgba(30, 60, 90, 0.14)' }}
          />
        </div>
      </div>
      <PlanPicker source="galoplife.com/subscribe" />
    </Layout>
  );
}
