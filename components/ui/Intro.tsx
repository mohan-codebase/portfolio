import type { CSSProperties } from 'react';

import { site } from '@/data/site';

import styles from './Intro.module.css';

/**
 * A short, CSS-only intro. It plays on the first visit of a session and is
 * skipped before paint on repeat visits or with reduced motion (see the boot
 * script in the root layout). No JavaScript is needed for it to finish.
 */
export function Intro() {
  return (
    <div className={styles.intro} aria-hidden="true">
      <div className={styles.inner}>
        <p className={styles.name}>
          {site.name
            .toUpperCase()
            .split('')
            .map((letter, index) => (
              <span key={index} style={{ '--i': index } as CSSProperties}>
                {letter}
              </span>
            ))}
        </p>
        <div className={styles.meta}>
          <span className="label">{site.role}</span>
          <span className={`label ${styles.count}`} />
        </div>
        <span className={styles.bar} />
      </div>
    </div>
  );
}
