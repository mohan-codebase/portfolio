import type { CSSProperties } from 'react';

import { Arrow } from '@/components/ui/Arrow';
import { Button } from '@/components/ui/Button';
import type { FeaturedProject } from '@/data/projects';
import { cx } from '@/lib/cx';

import { BrowserFrame, PhoneFrame } from './Frames';
import styles from './ProjectFeature.module.css';
import { ProjectMedia } from './ProjectMedia';

const depth = (value: number) => ({ '--depth': value }) as CSSProperties;

/** Each layout is its own art-directed composition, with a dedicated mobile arrangement. */
function Composition({ project }: { project: FeaturedProject }) {
  const { shots, domain, tone, scrollable } = project;
  const frame = { domain, theme: tone.theme };

  switch (project.layout) {
    case 'wide':
      return (
        <>
          <div className={cx(styles.layer, styles.browserA)} style={depth(14)}>
            <BrowserFrame {...frame} shot={shots.desktop} scrollable={scrollable} sizes="(min-width: 1024px) 60vw, (min-width: 768px) 70vw, 150vw" />
          </div>
          <div className={cx(styles.layer, styles.phoneA)} style={depth(36)}>
            <PhoneFrame shot={shots.mobile} sizes="(min-width: 1024px) 16vw, (min-width: 768px) 19vw, 50vw" />
          </div>
        </>
      );
    case 'duo':
      return (
        <>
          <div className={cx(styles.layer, styles.browserA)} style={depth(10)}>
            <BrowserFrame {...frame} shot={shots.desktop} sizes="(min-width: 1024px) 45vw, 70vw" />
          </div>
          {shots.desktopAlt ? (
            <div className={cx(styles.layer, styles.browserB)} style={depth(28)}>
              <BrowserFrame {...frame} shot={shots.desktopAlt} sizes="(min-width: 1024px) 45vw, 70vw" />
            </div>
          ) : null}
          <div className={cx(styles.layer, styles.phoneA)}>
            <PhoneFrame shot={shots.mobile} sizes="44vw" />
          </div>
          {shots.mobileAlt ? (
            <div className={cx(styles.layer, styles.phoneB)}>
              <PhoneFrame shot={shots.mobileAlt} sizes="44vw" />
            </div>
          ) : null}
        </>
      );
    case 'crop':
      return (
        <>
          <div className={cx(styles.layer, styles.browserA)} style={depth(12)}>
            <BrowserFrame {...frame} shot={shots.desktop} scrollable={scrollable} sizes="(min-width: 1024px) 60vw, 90vw" />
          </div>
          {shots.mobileAlt ? (
            <div className={cx(styles.layer, styles.phoneA)} style={depth(32)}>
              <PhoneFrame shot={shots.mobileAlt} sizes="(min-width: 768px) 16vw, 44vw" />
            </div>
          ) : null}
          <div className={cx(styles.layer, styles.phoneB)}>
            <PhoneFrame shot={shots.mobile} sizes="44vw" />
          </div>
        </>
      );
  }
}

export function ProjectFeature({ project, index }: { project: FeaturedProject; index: number }) {
  const number = String(index + 1).padStart(2, '0');
  const titleId = `${project.slug}-title`;

  return (
    <article className={cx(styles.project, styles[project.layout])} aria-labelledby={titleId}>
      <div className={styles.meta}>
        <span className={cx('label', styles.number)}>{number}</span>
        <span className={styles.rule} data-reveal="rule" aria-hidden="true" />
        <span className="label mute">{project.category}</span>
        <span className="label mute">{project.year}</span>
      </div>

      <ProjectMedia
        href={project.links.live}
        label={`Visit ${project.title}`}
        className={styles.media}
        style={{ '--tone': project.tone.background } as CSSProperties}
      >
        <div className={styles.artboard} data-theme={project.tone.theme} data-reveal="curtain" aria-hidden="true">
          <div className={styles.stage}>
            <Composition project={project} />
          </div>
          <p className={cx('label', styles.caption)}>
            Fig. {number} — {project.caption}
          </p>
          {project.scrollable ? (
            <p className={cx('label', styles.hint)} aria-hidden="true">
              Hover to scroll
            </p>
          ) : null}
        </div>
      </ProjectMedia>

      <div className={styles.info}>
        <h3 id={titleId} className={styles.title} data-reveal>
          {project.title}
        </h3>
        <p className={styles.summary} data-reveal style={{ '--delay': 80 } as CSSProperties}>
          {project.summary}
        </p>
        <dl className={styles.details} data-reveal style={{ '--delay': 160 } as CSSProperties}>
          <div>
            <dt className="label mute">Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt className="label mute">Stack</dt>
            <dd>
              <ul className={styles.stack}>
                {project.stack.map((tech) => (
                  <li key={tech} className="label">
                    {tech}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
        <div className={styles.links} data-reveal style={{ '--delay': 240 } as CSSProperties}>
          <Button href={project.links.live} external>
            View project
          </Button>
          {project.links.code ? (
            <a className={styles.code} href={project.links.code} target="_blank" rel="noopener noreferrer">
              Source code <Arrow />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
