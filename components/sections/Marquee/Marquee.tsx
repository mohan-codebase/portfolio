import { Fragment } from 'react';

import { marquee } from '@/data/content';

import styles from './Marquee.module.css';

function Asterisk() {
  return (
    <svg viewBox="0 0 24 24" className={styles.star} aria-hidden="true">
      <path d="M12 1v22M2.5 6.5l19 11M2.5 17.5l19-11" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  );
}

/** A slow band of moving type between the manifesto and the work. Decorative only. */
export function Marquee() {
  const group = (
    <div className={styles.group}>
      {marquee.map((word, index) => (
        <Fragment key={word}>
          <span className={index % 2 ? `serif ${styles.serif}` : styles.sans}>{word}</span>
          <Asterisk />
        </Fragment>
      ))}
    </div>
  );

  return (
    <div className={styles.marquee} data-theme="light" data-observe aria-hidden="true">
      <div className={styles.track}>
        {group}
        {group}
      </div>
    </div>
  );
}
