import type { CSSProperties } from 'react';

import { Button } from '@/components/ui/Button';
import { Emphasis } from '@/components/ui/Emphasis';
import { Lines } from '@/components/ui/Lines';
import { RevealWords } from '@/components/ui/RevealWords';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { about } from '@/data/content';
import { cx } from '@/lib/cx';

import styles from './About.module.css';

/**
 * The manifesto. On the home page it is the light sheet that slides over the
 * pinned hero and leads on to the About page; on the About page it continues
 * into the working principles.
 */
export function About({ variant = 'home', index = '02' }: { variant?: 'home' | 'page'; index?: string }) {
  const lastLine = about.statement.length - 1;

  return (
    <section
      id="about"
      className={cx('section', styles.about, variant === 'home' && styles.sheet)}
      data-theme="light"
      aria-labelledby="about-title"
    >
      <div className="container">
        <SectionHeader index={index} title={variant === 'home' ? 'About' : 'Manifesto'} meta={variant === 'home' ? 'Manifesto' : 'Since 2024'} />

        <h2 id="about-title" className={styles.statement} data-reveal="lines">
          <Lines
            indents={[0, 2, 1, 4]}
            lines={about.statement.map((line, index) => (
              <>
                <Emphasis text={line} />
                {index === lastLine ? <span className="stop">.</span> : null}
              </>
            ))}
          />
        </h2>

        <div className={`grid ${styles.body}`}>
          <dl className={styles.facts} data-reveal>
            {about.facts.map((fact) => (
              <div key={fact.label} className={styles.fact}>
                <dt className="label mute">{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
          <RevealWords className={styles.intro} text={about.intro} />
        </div>

        {variant === 'home' ? (
          <div className={styles.more} data-reveal>
            <Button href="/about" arrow="right">
              More about me
            </Button>
          </div>
        ) : (
          <ol className={`grid ${styles.principles}`}>
            {about.principles.map((principle, position) => (
              <li
                key={principle.title}
                className={styles.principle}
                data-reveal
                style={{ '--delay': position * 120 } as CSSProperties}
              >
                <span className={`label ${styles.number}`}>0{position + 1}</span>
                <h3 className={styles.principleTitle}>{principle.title}</h3>
                <p className={styles.principleBody}>{principle.body}</p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
