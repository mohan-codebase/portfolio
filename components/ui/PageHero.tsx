import type { CSSProperties, ReactNode } from 'react';

import { Lines } from '@/components/ui/Lines';
import { LocalTime } from '@/components/ui/LocalTime';
import { site } from '@/data/site';

import styles from './PageHero.module.css';

const columns = Array.from({ length: 12 }, (_, index) => <span key={index} />);

type PageHeroProps = {
  /** Folio shown before the label, e.g. "02". */
  index: string;
  label: string;
  /** Headline, one line per item. Add the closing full stop in the last line. */
  lines: ReactNode[];
  indents?: number[];
  meta?: ReactNode;
  lede?: string;
  aside?: ReactNode;
};

/** A few key figures for the hero's aside. */
export function HeroStats({ items }: { items: Array<{ label: string; value: string }> }) {
  return (
    <dl className={styles.stats}>
      {items.map((item) => (
        <div key={item.label}>
          <dt className="label mute">{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * The opening screen of an inner page: a folio line, a mega headline that
 * rises as the preloader or page curtain opens, and a lede. As you scroll on,
 * the whole block drifts back behind the content (a CSS scroll timeline).
 */
export function PageHero({ index, label, lines, indents, meta, lede, aside }: PageHeroProps) {
  return (
    <section className={styles.hero} data-theme="dark" aria-labelledby="page-title">
      <div className={styles.backdrop} aria-hidden="true">
        <div className={`container grid ${styles.columns}`}>{columns}</div>
        <div className={styles.glow} />
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={`enter-fade ${styles.top}`} style={{ '--enter': 150 } as CSSProperties}>
          <p className="label">
            <span className={styles.index}>({index})</span> {label}
          </p>
          {meta ? <p className="label mute">{meta}</p> : null}
          <p className={`label mute ${styles.place}`}>
            {site.location.city}, {site.location.countryCode} <LocalTime timeZone={site.location.timeZone} />{' '}
            {site.location.timeZoneLabel}
          </p>
        </div>

        <h1 id="page-title" className={`enter-lines ${styles.title}`}>
          <Lines lines={lines} indents={indents} />
        </h1>

        {lede || aside ? (
          <div className={`enter-fade ${styles.bottom}`} style={{ '--enter': 550 } as CSSProperties}>
            {lede ? <p className={styles.lede}>{lede}</p> : null}
            {aside ? <div className={styles.aside}>{aside}</div> : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
