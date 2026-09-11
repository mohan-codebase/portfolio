import type { CSSProperties } from 'react';

import { Button } from '@/components/ui/Button';
import { LocalTime } from '@/components/ui/LocalTime';
import { hero } from '@/data/content';
import { site } from '@/data/site';

import styles from './Hero.module.css';
import { HeroStage } from './HeroStage';
import { Measure } from './Measure';
import { Readout } from './Readout';

const columns = Array.from({ length: 12 }, (_, index) => <span key={index} />);

/** The ease-out-expo curve used across the site, plotted for the spec chip. */
function EasingCurve() {
  return (
    <svg viewBox="0 0 64 40" width="64" height="40" aria-hidden="true" className={styles.curve}>
      <path d="M0 39.5H64M0.5 0V40" stroke="currentColor" strokeOpacity="0.25" />
      <path d="M1 39 C11.24 -1, 19.2 1, 63 1" stroke="var(--signal)" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

export function Hero() {
  const [first, accent, last] = hero.headline;

  return (
    <section id="top" className={styles.hero} data-theme="dark" aria-labelledby="hero-title">
      <HeroStage className={styles.stage}>
        <div className={styles.backdrop} aria-hidden="true">
          <div className={`container grid ${styles.columns}`}>{columns}</div>
          <div className={styles.spotlight}>
            <div className={`container grid ${styles.columns}`}>{columns}</div>
          </div>
          <div className={styles.glow} />
        </div>

        <div className={`container ${styles.inner}`}>
          <div className={styles.top}>
            <p className="label">
              <span className={styles.index}>(01)</span> Introduction
            </p>
            <p className="label mute">
              {site.role} — {site.year}
            </p>
            <p className={`label mute ${styles.place}`}>
              {site.location.city}, {site.location.countryCode}{' '}
              <LocalTime timeZone={site.location.timeZone} /> {site.location.timeZoneLabel}
            </p>
          </div>

          <div className={styles.titleWrap}>
            <h1 id="hero-title" className={styles.title}>
              <span className={styles.row} style={{ '--i': 0 } as CSSProperties}>
                <span className="line">
                  <span>{first} </span>
                </span>
              </span>
              <span className={`${styles.row} ${styles.rowAccent}`} style={{ '--i': 1 } as CSSProperties}>
                <span className="line">
                  <span className="serif">{accent} </span>
                </span>
                <span className={styles.note} aria-hidden="true">
                  <span className={styles.leader} />
                  <span className="label">Instrument Serif, italic</span>
                </span>
              </span>
              <span className={styles.row} style={{ '--i': 2 } as CSSProperties}>
                {/* The wrapper hugs the word, so the dimension line (outside the mask) matches it. */}
                <span className={styles.measured}>
                  <span className="line">
                    <span>
                      {last}
                      <span className="stop">.</span>
                    </span>
                  </span>
                  <Measure className={styles.dimension} />
                </span>
              </span>
            </h1>

            <div className={styles.chips} aria-hidden="true">
              <div className={styles.chip} style={{ '--depth': 28, '--float': '7s' } as CSSProperties} data-chip="easing">
                <EasingCurve />
                <span className="label">
                  ease-out-expo
                  <br />
                  <span className="mute">1100ms</span>
                </span>
              </div>
              <div className={styles.chip} style={{ '--depth': -22, '--float': '9s' } as CSSProperties} data-chip="swatch">
                <span className={styles.swatch} />
                <span className="label">
                  Amethyst
                  <br />
                  <span className="mute">#9D71FD</span>
                </span>
              </div>
              <div className={styles.chip} style={{ '--depth': 16, '--float': '8s' } as CSSProperties} data-chip="grid">
                <span className={styles.gridIcon} />
                <span className="label">
                  12 col grid
                  <br />
                  <span className="mute">Press G</span>
                </span>
              </div>
            </div>
          </div>

          <div className={styles.bottom}>
            <p className={styles.lede}>{hero.lede}</p>
            <div className={styles.cta}>
              <Button href="#work" arrow="down">
                Selected work
              </Button>
            </div>
            <Readout className={`label ${styles.readout}`} />
            <a href="#about" className={`label ${styles.scroll}`}>
              Scroll to explore
              <span className={styles.scrollTrack} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className={styles.shade} aria-hidden="true" />
      </HeroStage>
    </section>
  );
}
