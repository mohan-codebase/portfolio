'use client';

import { useEffect, useState } from 'react';

import styles from './GridOverlay.module.css';

/** A small easter egg for fellow developers: press G to see the layout grid. */
export function GridOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== 'g' || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement;
      if (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      setVisible((current) => !current);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <div className={styles.overlay} data-visible={visible} aria-hidden="true">
        <div className={`container grid ${styles.columns}`}>
          {Array.from({ length: 12 }, (_, index) => (
            <span key={index} />
          ))}
        </div>
      </div>
      <p className={`label ${styles.toast}`} role="status" data-visible={visible}>
        {visible ? 'Layout grid on — press G to hide' : ''}
      </p>
    </>
  );
}
