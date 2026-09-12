import type { CSSProperties } from 'react';

import { ProjectArtboard } from '@/components/projects/ProjectFeature';
import { TransitionLink } from '@/components/transition/TransitionLink';
import { Arrow } from '@/components/ui/Arrow';
import { Button } from '@/components/ui/Button';
import { Lines } from '@/components/ui/Lines';
import type { FeaturedProject } from '@/data/projects';

import styles from './CaseHero.module.css';

const pad = (value: number) => String(value).padStart(2, '0');

/** A case study's opening screen, set on the project's own colour, with its artboard below the title. */
export function CaseHero({ project, index, total }: { project: FeaturedProject; index: number; total: number }) {
  const number = pad(index + 1);

  return (
    <section
      className={styles.hero}
      data-theme={project.tone.theme}
      style={{ '--bg': project.tone.background } as CSSProperties}
      aria-labelledby="case-title"
    >
      <div className={`container ${styles.inner}`}>
        <div className={`enter-fade ${styles.top}`} style={{ '--enter': 150 } as CSSProperties}>
          <TransitionLink href="/work" className={`label ${styles.back}`}>
            <Arrow direction="left" /> All work
          </TransitionLink>
          <p className="label">
            (Case {number} / {pad(total)})
          </p>
          <p className={`label ${styles.muted}`}>
            {project.category} — {project.year}
          </p>
        </div>

        <h1
          id="case-title"
          className={`enter-lines ${styles.title}`}
          style={{ '--chars': project.title.length + 1 } as CSSProperties}
        >
          <Lines
            lines={[
              <>
                {project.title}
                <span className="stop">.</span>
              </>,
            ]}
          />
        </h1>

        <div className={`enter-fade ${styles.meta}`} style={{ '--enter': 500 } as CSSProperties}>
          <dl className={styles.facts}>
            <div>
              <dt className="label">Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt className="label">Stack</dt>
              <dd>{project.stack.join(', ')}</dd>
            </div>
            <div>
              <dt className="label">Year</dt>
              <dd>{project.year}</dd>
            </div>
          </dl>
          <div className={styles.links}>
            <Button href={project.links.live} external>
              Visit site
            </Button>
            {project.links.code ? (
              <a className={styles.code} href={project.links.code} target="_blank" rel="noopener noreferrer">
                Source code <Arrow />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <div className={`container ${styles.cover}`}>
        <ProjectArtboard project={project} number={number} external />
      </div>
    </section>
  );
}
