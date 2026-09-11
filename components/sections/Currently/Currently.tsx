import type { CSSProperties } from 'react';

import { SectionHeader } from '@/components/ui/SectionHeader';
import { currently } from '@/data/currently';

import styles from './Currently.module.css';

/** A small live status board that makes the portfolio feel current. */
export function Currently() {
  return (
    <section id="currently" className={`section ${styles.currently}`} data-theme="light" aria-labelledby="currently-title">
      <div className="container">
        <SectionHeader
          index="06"
          title="Currently"
          meta={
            <>
              <span className="pulse" aria-hidden="true" /> Updated {currently.updated}
            </>
          }
        />

        <h2 id="currently-title" className={styles.title} data-reveal>
          Right now, I’m<span className="stop">…</span>
        </h2>

        <ul className={styles.board}>
          {currently.items.map((item, index) => (
            <li key={item.verb} className={styles.cell} data-reveal style={{ '--delay': index * 90 } as CSSProperties}>
              <p className={`label ${styles.verb}`}>
                <span className={styles.index}>0{index + 1}</span>
                {item.verb}
              </p>
              <p className={styles.value}>{item.value}</p>
              <p className={`label ${styles.note}`}>{item.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
