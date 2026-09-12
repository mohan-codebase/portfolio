import Image from 'next/image';
import type { CSSProperties } from 'react';

import { TransitionLink } from '@/components/transition/TransitionLink';
import { Arrow } from '@/components/ui/Arrow';
import { Lines } from '@/components/ui/Lines';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { work } from '@/data/content';
import { projectCards, type ProjectCard } from '@/data/projects';
import { cx } from '@/lib/cx';

import styles from './WorkReel.module.css';

const cards = projectCards.filter((project) => !project.current);
const years = cards.map((project) => Number(project.year));
const span = `${Math.min(...years)} — ${Math.max(...years)}`;
const pad = (value: number) => String(value).padStart(2, '0');

function Card({ project, index }: { project: ProjectCard; index: number }) {
  const content = (
    <>
      <span className={styles.frame}>
        {project.image ? <Image src={project.image.src} alt="" sizes="(min-width: 1024px) 34vw, 78vw" className={styles.image} /> : null}
      </span>
      <span className={styles.caption}>
        <span className={`label ${styles.number}`}>{pad(index + 1)}</span>
        <span className={styles.name}>{project.title}</span>
        <span className={`label ${styles.meta}`}>
          {project.type} · {project.year}
        </span>
        <span className={`label ${styles.kind}`}>{project.caseStudy ? 'Case study' : 'Live ↗'}</span>
      </span>
    </>
  );

  if (project.caseStudy) {
    return (
      <TransitionLink href={project.href} className={cx(styles.link, 'press')} data-cursor="view" data-cursor-label="Case study">
        {content}
      </TransitionLink>
    );
  }

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cx(styles.link, 'press')}
      data-cursor="view"
      data-cursor-label="Visit"
    >
      {content}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/**
 * Selected work as a reel. On desktop the section pins and scrolling down
 * slides the cards sideways — a CSS scroll timeline, so it runs off the main
 * thread. On phones it is a native swipe carousel that snaps card to card.
 */
export function WorkReel({ index = '03' }: { index?: string }) {
  return (
    <section
      id="work"
      className={styles.reel}
      data-theme="light"
      aria-labelledby="work-title"
      style={{ '--n': cards.length + 1 } as CSSProperties}
    >
      <div className={styles.sticky}>
        <div className={`container ${styles.head}`}>
          <SectionHeader index={index} title="Selected work" meta={span} />
          <div className={styles.headRow}>
            <h2 id="work-title" className={styles.title} data-reveal="lines">
              <Lines
                lines={[
                  <>
                    Selected <span className="serif">work</span>
                    <sup className={styles.count}>({pad(cards.length)})</sup>
                  </>,
                ]}
              />
            </h2>
            <p className={styles.intro} data-reveal>
              {work.intro}
            </p>
          </div>
        </div>

        <div className={styles.viewport}>
          <ol className={styles.track}>
            {cards.map((project, position) => (
              <li key={project.id} className={styles.card}>
                <Card project={project} index={position} />
              </li>
            ))}
            <li className={styles.card}>
              <TransitionLink href="/work" className={cx(styles.end, 'press')}>
                <span className="label">({pad(projectCards.length)}) Full index</span>
                <span className={styles.endTitle}>
                  All <span className="serif">work</span>
                </span>
                <Arrow direction="right" className={styles.endArrow} />
              </TransitionLink>
            </li>
          </ol>
        </div>

        <div className={`container ${styles.foot}`} aria-hidden="true">
          <span className={`label ${styles.hint}`} />
          <span className={styles.progress} />
          <span className="label">{pad(cards.length)}</span>
        </div>
      </div>
    </section>
  );
}
