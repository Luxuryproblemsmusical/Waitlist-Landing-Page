import type { CSSProperties } from 'react';
import { RED, INK, Kicker, Heading } from './Layout';
import horseImage from "../imports/galop-horse.png";
import wordmarkImage from "../imports/galop-wordmark.svg";

// Sydney: edit freely — these are placeholder reasons. One row each:
// [GALOP title, GALOP line, other supplements title, other supplements line]
const ROWS: [string, string, string, string][] = [
  ['Made for GLP-1s', 'Formulated for life on a GLP-1, when you’re eating less.',
   'Made for everyone', 'A standard multivitamin, not built around a smaller appetite.'],
  ['One drink, once a day', 'Vitamins, minerals and electrolytes in a single stick.',
   'Several bottles', 'A multivitamin here, electrolytes there, and more to remember.'],
  ['Tastes like lemonade', 'Zero sugar, sweetened with monk fruit and stevia.',
   'Pills or sugary gummies', 'Hard to swallow, or sweetened with added sugar.'],
  ['Doctor-formulated', 'Made with a doctor, by someone on a GLP-1 herself.',
   'One size fits all', 'The same formula, whatever you’re taking.'],
];

const cell: CSSProperties = {
  position: 'relative', zIndex: 1, textAlign: 'center',
  padding: 'clamp(14px, 2.6vw, 26px) clamp(10px, 2.6vw, 30px)',
};
const title: CSSProperties = {
  display: 'block', fontFamily: "'Instrument Serif', serif", fontWeight: 600,
  fontSize: 'clamp(1.2rem, 2.8vw, 1.6rem)', lineHeight: 1.1, textWrap: 'balance',
};
const line: CSSProperties = {
  display: 'block', marginTop: '0.45rem', fontFamily: "'Montserrat', sans-serif", fontWeight: 500,
  fontSize: 'clamp(0.78rem, 1.7vw, 0.9rem)', lineHeight: 1.55, color: INK, textWrap: 'balance',
};

/**
 * GALOP against other supplements, side by side. One grid, two columns: the rows line up
 * across both, and the GALOP column sits on a white tag-cut card laid behind its cells.
 */
export function Compare() {
  return (
    <section className="max-w-4xl mx-auto mt-20 md:mt-24" aria-labelledby="compare-heading">
      <div className="text-center">
        <Kicker>How it compares</Kicker>
        <span id="compare-heading"><Heading>Not your standard multivitamin.</Heading></span>
      </div>

      <div role="table" aria-labelledby="compare-heading" className="cut mt-4"
           style={{
             display: 'grid', gridTemplateColumns: '1fr 1fr', padding: 'clamp(8px, 1.6vw, 14px)',
             ['--cut' as string]: '30px', ['--fill' as string]: 'rgba(255, 255, 255, 0.5)',
           } as CSSProperties}>
        {/* the white card behind the GALOP column */}
        <div aria-hidden="true" className="cut"
             style={{
               gridColumn: 1, gridRow: `1 / span ${ROWS.length + 1}`,
               ['--cut' as string]: '22px', ['--bw' as string]: '1px',
               ['--line' as string]: 'rgba(236, 29, 39, 0.2)', ['--fill' as string]: '#ffffff',
             } as CSSProperties}>
          <span className="cut-shadow"
                style={{ ['--shadow' as string]: '0 18px 30px rgba(30, 60, 90, 0.12), 0 2px 4px rgba(30, 60, 90, 0.05)' } as CSSProperties} />
        </div>

        <div role="row" style={{ display: 'contents' }}>
          <div role="columnheader" style={{ ...cell, gridColumn: 1, gridRow: 1, paddingTop: 'clamp(22px, 4vw, 38px)' }}>
            <img src={horseImage} alt="" aria-hidden="true" width={278} height={230}
                 style={{ width: 'clamp(2rem, 5vw, 2.8rem)', height: 'auto', display: 'block', margin: '0 auto 8px' }} />
            <img src={wordmarkImage} alt="GALOP" width={1351} height={301}
                 style={{ width: 'clamp(5.5rem, 16vw, 9rem)', height: 'auto', display: 'block', margin: '0 auto' }} />
          </div>
          <div role="columnheader"
               style={{ ...cell, gridColumn: 2, gridRow: 1, alignSelf: 'end', paddingTop: 'clamp(22px, 4vw, 38px)',
                        fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 500,
                        fontSize: 'clamp(1.25rem, 3vw, 1.7rem)', lineHeight: 1.1, color: INK }}>
            Other supplements
          </div>
        </div>

        {ROWS.map(([gt, gl, ot, ol], i) => (
          <div role="row" key={gt} style={{ display: 'contents' }}>
            <div role="cell" style={{ ...cell, gridColumn: 1, gridRow: i + 2 }}>
              <span aria-hidden="true" style={{ display: 'block', width: '2rem', height: '1.5px', background: RED, margin: '0 auto clamp(12px, 2vw, 18px)' }} />
              <span style={{ ...title, color: RED }}>{gt}</span>
              <span style={line}>{gl}</span>
            </div>
            <div role="cell" style={{ ...cell, gridColumn: 2, gridRow: i + 2 }}>
              <span aria-hidden="true" style={{ display: 'block', width: '2rem', height: '1.5px', background: 'rgba(143, 18, 25, 0.25)', margin: '0 auto clamp(12px, 2vw, 18px)' }} />
              <span style={{ ...title, color: INK }}>{ot}</span>
              <span style={{ ...line, opacity: 0.85 }}>{ol}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
