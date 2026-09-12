import Image from 'next/image';
import type { CSSProperties } from 'react';

import { TransitionLink } from '@/components/transition/TransitionLink';
import { Arrow } from '@/components/ui/Arrow';
import { caseStudy } from '@/data/content';
import type { FeaturedProject } from '@/data/projects';

import styles from './NextProject.module.css';

/** The closing link of a case study: the next project's name, set huge, with its screen revealed on hover. */
export function NextProject({ project }: { project: FeaturedProject }) {
  return (
    <section className={styles.next} data-theme="dark" aria-labelledby="next-title">
      <TransitionLink
        href={`/work/${project.slug}`}
        className={`container ${styles.link}`}
        data-cursor="view"
        data-cursor-label="Next case"
      >
        <span className={`label ${styles.kicker}`}>
          <span className={styles.index}>(Next)</span> {caseStudy.next}
        </span>
        <span className={styles.row}>
          <h2 id="next-title" className={styles.title} style={{ '--chars': project.title.length + 1 } as CSSProperties}>
            {project.title}
            <span className="stop">.</span>
          </h2>
          <span className={styles.thumb} aria-hidden="true">
            <Image src={project.shots.desktop.src} alt="" sizes="(min-width: 1024px) 30rem, 90vw" className={styles.image} />
          </span>
        </span>
        <span className={styles.foot}>
          <span className="label mute">
            {project.category} · {project.year}
          </span>
          <span className={styles.go}>
            View case <Arrow direction="right" />
          </span>
        </span>
      </TransitionLink>
    </section>
  );
}
