'use client';

import Image from 'next/image';
import { useState, type CSSProperties, type ReactNode } from 'react';

import { TransitionLink } from '@/components/transition/TransitionLink';
import { Arrow } from '@/components/ui/Arrow';
import { HoverPreview } from '@/components/ui/HoverPreview';
import { stackFilters, stackGroup, type ProjectCard } from '@/data/projects';
import { cx } from '@/lib/cx';

import styles from './WorkIndex.module.css';

type View = 'grid' | 'list';

const pad = (value: number) => String(value).padStart(2, '0');
const inGroup = (project: ProjectCard, group: string) => project.stack.some((tech) => stackGroup(tech) === group);

function ProjectLink({ project, className, children }: { project: ProjectCard; className: string; children: ReactNode }) {
  if (project.caseStudy || project.current) {
    return (
      <TransitionLink
        href={project.href}
        className={className}
        data-cursor="view"
        data-cursor-label={project.caseStudy ? 'Case study' : 'Home'}
      >
        {children}
      </TransitionLink>
    );
  }

  return (
    <a href={project.href} target="_blank" rel="noopener noreferrer" className={className} data-cursor="view" data-cursor-label="Visit">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function Filter({ active, label, count, onSelect }: { active: boolean; label: string; count: number; onSelect: () => void }) {
  return (
    <button type="button" className={styles.filter} aria-pressed={active} onClick={onSelect} data-cursor="stick">
      {label}
      <sup>{pad(count)}</sup>
    </button>
  );
}

/**
 * Every project, filterable by stack and shown either as an editorial grid
 * or as a compact index list with a floating preview on desktop.
 */
export function WorkIndex({ projects }: { projects: ProjectCard[] }) {
  const [filter, setFilter] = useState<string | null>(null);
  const [view, setView] = useState<View>('grid');
  // Until the first change the items reveal on scroll; after it they animate in on their own.
  const [touched, setTouched] = useState(false);

  const visible = filter ? projects.filter((project) => inGroup(project, filter)) : projects;
  const number = (project: ProjectCard) => pad(projects.indexOf(project) + 1);

  const choose = (next: string | null) => {
    setFilter(next);
    setTouched(true);
  };
  const show = (next: View) => {
    setView(next);
    setTouched(true);
  };

  const previews = visible.map((project) =>
    project.image ? (
      <div key={project.id} className={styles.preview}>
        <Image src={project.image.src} alt="" sizes="24rem" className={styles.previewImage} />
      </div>
    ) : (
      <div key={project.id} className={cx(styles.preview, styles.here)}>
        <span className="label">This site</span>
      </div>
    ),
  );

  return (
    <div className={styles.index}>
      <div className={styles.toolbar}>
        <div className={styles.filters} role="group" aria-label="Filter by stack">
          <Filter active={!filter} label="All" count={projects.length} onSelect={() => choose(null)} />
          {stackFilters.map((group) => (
            <Filter
              key={group}
              active={filter === group}
              label={group}
              count={projects.filter((project) => inGroup(project, group)).length}
              onSelect={() => choose(group)}
            />
          ))}
        </div>
        <div className={styles.views} role="group" aria-label="Layout">
          <button type="button" className={styles.view} aria-pressed={view === 'grid'} onClick={() => show('grid')} data-cursor="stick">
            Grid
          </button>
          <button type="button" className={styles.view} aria-pressed={view === 'list'} onClick={() => show('list')} data-cursor="stick">
            List
          </button>
        </div>
      </div>

      <p className="sr-only" role="status">
        {touched ? `Showing ${visible.length} ${visible.length === 1 ? 'project' : 'projects'}` : ''}
      </p>

      {view === 'grid' ? (
        <ul key={`grid-${filter}`} className={cx(styles.grid, touched && styles.animate)}>
          {visible.map((project, position) => (
            <li
              key={project.id}
              className={styles.cell}
              style={{ '--i': position } as CSSProperties}
              data-reveal={touched ? undefined : ''}
            >
              <ProjectLink project={project} className={cx(styles.card, 'press')}>
                <span className={styles.frame}>
                  {project.image ? (
                    <Image src={project.image.src} alt="" sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw" className={styles.image} />
                  ) : (
                    <span className={styles.here}>
                      <span className="label">This site</span>
                    </span>
                  )}
                </span>
                <span className={styles.caption}>
                  <span className={`label ${styles.number}`}>{number(project)}</span>
                  <span className={styles.name}>{project.title}</span>
                  <span className={`label ${styles.meta}`}>
                    {project.type} · {project.year}
                  </span>
                  {project.caseStudy ? <span className={`label ${styles.badge}`}>Case study</span> : null}
                  <span className={styles.tags}>
                    {project.stack.map((tech) => (
                      <span key={tech} className="label">
                        {tech}
                      </span>
                    ))}
                  </span>
                </span>
              </ProjectLink>
            </li>
          ))}
        </ul>
      ) : (
        <HoverPreview key={`list-${filter}`} previews={previews} className={styles.listWrap}>
          <ul className={cx(styles.list, styles.animate)}>
            {visible.map((project, position) => (
              <li key={project.id} className={styles.item} data-preview={position} style={{ '--i': position } as CSSProperties}>
                <ProjectLink project={project} className={styles.row}>
                  <span className={`label ${styles.number}`}>{number(project)}</span>
                  <span className={styles.rowName}>{project.title}</span>
                  <span className={`label ${styles.rowType}`}>{project.caseStudy ? `${project.type} · Case study` : project.type}</span>
                  <span className={`label ${styles.rowStack}`}>{project.stack.join(' · ')}</span>
                  <span className={`label ${styles.rowYear}`}>{project.year}</span>
                  <Arrow className={styles.rowArrow} direction={project.caseStudy || project.current ? 'right' : 'up-right'} />
                </ProjectLink>
              </li>
            ))}
          </ul>
        </HoverPreview>
      )}
    </div>
  );
}
