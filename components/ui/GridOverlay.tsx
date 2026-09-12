'use client';

import { useEffect, useState } from 'react';

import styles from './GridOverlay.module.css';

/** Toggles the overlay from elsewhere (the ⌘K palette). */
export const TOGGLE_GRID = 'grid:toggle';

/** A small easter egg for fellow developers: press G to see the layout grid. */
export function GridOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible((current) => !current);
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== 'g' || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement;
      if (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      toggle();
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener(TOGGLE_GRID, toggle);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(TOGGLE_GRID, toggle);
    };
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
