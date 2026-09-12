import type { CSSProperties } from 'react';

import { site } from '@/data/site';

import styles from './Preloader.module.css';

const panels = Array.from({ length: 12 }, (_, index) => index);

/** Odometer strips for the hundreds, tens and ones. Each only ever rolls forward (see the keyframes). */
const reels = [['0', '1'], '01234567890'.split(''), '012345678901234567890'.split('')];

const codePoint = (letter: string) => `U+${(letter.codePointAt(0) ?? 0).toString(16).toUpperCase().padStart(4, '0')}`;

/**
 * The first-visit preloader, drawn as a type specimen being calibrated: grid
 * lines lay themselves out, the name is set between cap-height and baseline
 * guides, an odometer rolls to 100, and the columns lift away in a wave to
 * reveal the page. CSS-only, so it finishes without JavaScript. The boot
 * script in the root layout skips it before paint on repeat visits and for
 * reduced motion.
 */
export function Preloader() {
  const letters = site.name.toUpperCase().split('');

  return (
    <div className={styles.preloader} aria-hidden="true">
      <span className={styles.marker} data-preloader-marker />

      <div className={styles.panels}>
        {panels.map((index) => (
          <span key={index} className={styles.panel} style={{ '--i': index } as CSSProperties} />
        ))}
      </div>

      <div className={`container ${styles.hud}`}>
        <div className={styles.top}>
          <span className="label">{site.name} — Portfolio</span>
          <span className={`label ${styles.status}`}>(Loading)</span>
          <span className="label">©{site.year}</span>
        </div>

        <div className={styles.specimen}>
          <p className={`label ${styles.font}`}>Mona Sans — ExtraBold 800</p>
          <div className={styles.glyphs}>
            <span className={styles.guide} data-guide="cap" />
            <span className={styles.guide} data-guide="base" />
            {letters.map((letter, index) => (
              <span key={index} className={styles.glyph} style={{ '--i': index } as CSSProperties}>
                <span className={`label ${styles.code}`}>{codePoint(letter)}</span>
                <span className={styles.box} />
                <span className={styles.mask}>
                  <span className={styles.letter}>{letter}</span>
                </span>
              </span>
            ))}
          </div>
          <p className={styles.measure}>
            <span className="label">{site.role}</span>
          </p>
        </div>

        <div className={styles.bottom}>
          <p className={styles.counter}>
            {reels.map((reel, place) => (
              <span key={place} className={styles.digit} data-place={place}>
                <span className={styles.slide} style={{ '--d': place } as CSSProperties}>
                  <span className={styles.reel}>
                    {reel.map((digit, index) => (
                      <span key={index}>{digit}</span>
                    ))}
                  </span>
                </span>
              </span>
            ))}
            <span className={styles.percent}>%</span>
          </p>
          <p className={`label ${styles.place}`}>
            {site.location.city}, {site.location.country}
          </p>
        </div>
      </div>
    </div>
  );
}
