import type { CSSProperties } from 'react';

import styles from './TextRoll.module.css';

/**
 * Letters roll up to reveal a copy of themselves when the parent link or
 * button is hovered or focused. The split letters are hidden from assistive
 * tech; the plain word is announced instead.
 */
export function TextRoll({ children }: { children: string }) {
  return (
    <span className={styles.roll}>
      <span className="sr-only">{children}</span>
      <span className={styles.letters} aria-hidden="true">
        {children.split('').map((char, index) => (
          <span key={index} className={styles.char} data-char={char} style={{ '--i': index } as CSSProperties}>
            {char === ' ' ? ' ' : char}
          </span>
        ))}
      </span>
    </span>
  );
}
