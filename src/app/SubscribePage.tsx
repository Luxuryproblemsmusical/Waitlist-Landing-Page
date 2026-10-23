import { Layout, Kicker, Heading } from './Layout';
import { PlanPicker } from './PlanPicker';
import { ARCH, ArchSheen } from './Flourish';
import pouchImage from "../imports/pouch-lemonade-v2.webp";

/** Standalone Subscribe & Save page (the same plan picker also lives on the homepage). */
export default function SubscribePage() {
  return (
    <Layout title="Subscribe & Save — GALOP" current="/">
      <div className="max-w-2xl mx-auto mt-10 text-center">
        <Kicker>A fresh pouch every month, for life on a GLP&#8209;1</Kicker>
        <Heading size="lg" as="h1">Subscribe &amp; save.</Heading>
        <div className="flex justify-center my-10">
          <div className="w-56 sm:w-72" style={{ position: 'relative', isolation: 'isolate' }}>
            <ArchSheen radius={ARCH} />
            <img
              src={pouchImage}
              alt="GALOP multivitamin drink mix pouch in lemonade, with a single stick pack beside it"
              width={1060}
              height={1484}
              className="w-full h-auto"
              style={{ position: 'relative', display: 'block', borderRadius: ARCH }}
            />
          </div>
        </div>
      </div>
      <PlanPicker source="galoplife.com/subscribe" />
    </Layout>
  );
}
