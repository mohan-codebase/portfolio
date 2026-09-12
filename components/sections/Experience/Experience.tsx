import type { CSSProperties } from 'react';

import { Emphasis } from '@/components/ui/Emphasis';
import { Lines } from '@/components/ui/Lines';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { experience } from '@/data/experience';
import { site } from '@/data/site';

import styles from './Experience.module.css';

export function Experience({ index = '05' }: { index?: string }) {
  return (
    <section id="experience" className={`section ${styles.experience}`} data-theme="light" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeader index={index} title="Experience" meta={`${site.since} — Now`} />

        <h2 id="experience-title" className={styles.title} data-reveal="lines">
          <Lines
            indents={[0, 3]}
            lines={[
              'The story',
              <>
                <Emphasis text="*so far*" />
                <span className="stop">.</span>
              </>,
            ]}
          />
        </h2>

        <ol className={styles.list}>
          {experience.map((milestone, position) => (
            <li
              key={milestone.year}
              className={styles.item}
              data-reveal
              style={{ '--delay': position * 100 } as CSSProperties}
            >
              <p className={styles.year}>{milestone.year}</p>
              <p className={`label ${styles.status}`}>
                {milestone.current ? (
                  <>
                    <span className="pulse" aria-hidden="true" /> Now
                  </>
                ) : (
                  `0${experience.length - position}`
                )}
              </p>
              <h3 className={styles.itemTitle}>{milestone.title}</h3>
              <p className={styles.body}>{milestone.body}</p>
              <ul className={styles.tags}>
                {milestone.tags.map((tag) => (
                  <li key={tag} className="label">
                    {tag}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
