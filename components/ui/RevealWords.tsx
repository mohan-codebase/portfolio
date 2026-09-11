import type { CSSProperties } from 'react';

import { cx } from '@/lib/cx';

import styles from './RevealWords.module.css';

/**
 * A paragraph whose words brighten in reading order as it scrolls through the
 * viewport. Driven by a CSS view timeline, so it costs no JavaScript; browsers
 * without scroll-driven animations simply show the text.
 */
export function RevealWords({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ');

  return (
    <p className={cx(styles.text, className)}>
      {words.map((word, index) => (
        <span key={index} className={styles.word} style={{ '--p': (index / words.length).toFixed(3) } as CSSProperties}>
          {word}
          {index < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </p>
  );
}
