import { ProjectFeature } from '@/components/projects/ProjectFeature';
import { Button } from '@/components/ui/Button';
import { Lines } from '@/components/ui/Lines';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { WorkIndex } from '@/components/work/WorkIndex';
import { work } from '@/data/content';
import { featured, githubProfile, projectCards } from '@/data/projects';

import styles from './Work.module.css';

/** The work page body: the case studies as art-directed features, then the full, filterable index. */
export function Work() {
  return (
    <>
      <section id="case-studies" className={`section ${styles.cases}`} data-theme="light" aria-labelledby="cases-title">
        <div className="container">
          <SectionHeader index="01" title="Case studies" meta={`${String(featured.length).padStart(2, '0')} in depth`} />
          <h2 id="cases-title" className="sr-only">
            Case studies
          </h2>
          <div className={styles.projects}>
            {featured.map((project, index) => (
              <ProjectFeature key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="index" className={`section ${styles.all}`} data-theme="light" aria-labelledby="index-title">
        <div className="container">
          <SectionHeader index="02" title="Index" meta="Filter by stack" />
          <h2 id="index-title" className={styles.title} data-reveal="lines">
            <Lines
              indents={[0, 2]}
              lines={[
                'Every',
                <>
                  <span className="serif">project</span>
                  <span className="stop">.</span>
                </>,
              ]}
            />
          </h2>
          <WorkIndex projects={projectCards} />
          <div className={styles.more} data-reveal>
            <p className={styles.moreText}>{work.more}</p>
            <Button href={githubProfile} external>
              GitHub profile
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
