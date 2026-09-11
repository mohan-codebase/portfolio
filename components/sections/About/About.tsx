import type { CSSProperties } from 'react';

import { Emphasis } from '@/components/ui/Emphasis';
import { Lines } from '@/components/ui/Lines';
import { RevealWords } from '@/components/ui/RevealWords';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { about } from '@/data/content';

import styles from './About.module.css';

export function About() {
  const lastLine = about.statement.length - 1;

  return (
    <section id="about" className={`section ${styles.about}`} data-theme="light" aria-labelledby="about-title">
      <div className="container">
        <SectionHeader index="02" title="About" meta="Manifesto" />

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

        <ol className={`grid ${styles.principles}`}>
          {about.principles.map((principle, index) => (
            <li
              key={principle.title}
              className={styles.principle}
              data-reveal
              style={{ '--delay': index * 120 } as CSSProperties}
            >
              <span className={`label ${styles.number}`}>0{index + 1}</span>
              <h3 className={styles.principleTitle}>{principle.title}</h3>
              <p className={styles.principleBody}>{principle.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
