import { ProjectArchive } from '@/components/projects/ProjectArchive';
import { ProjectFeature } from '@/components/projects/ProjectFeature';
import { Button } from '@/components/ui/Button';
import { Lines } from '@/components/ui/Lines';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { work } from '@/data/content';
import { archive, featured, githubProfile } from '@/data/projects';

import styles from './Work.module.css';

const years = [...featured, ...archive].map((project) => Number(project.year));
const span = `${Math.min(...years)} — ${Math.max(...years)}`;

export function Work() {
  return (
    <section id="work" className={`section ${styles.work}`} data-theme="light" aria-labelledby="work-title">
      <div className="container">
        <SectionHeader index="03" title="Selected work" meta={span} />

        <div className={`grid ${styles.head}`}>
          <h2 id="work-title" className={styles.title} data-reveal="lines">
            <Lines
              indents={[0, 3]}
              lines={[
                'Selected',
                <>
                  Work
                  <sup className={styles.count}>({String(featured.length).padStart(2, '0')})</sup>
                </>,
              ]}
            />
          </h2>
          <p className={styles.intro} data-reveal>
            {work.intro}
          </p>
        </div>

        <div className={styles.projects}>
          {featured.map((project, index) => (
            <ProjectFeature key={project.slug} project={project} index={index} />
          ))}
        </div>

        <ProjectArchive items={archive} startAt={featured.length + 1} />

        <div className={styles.more} data-reveal>
          <p className={styles.moreText}>Everything else — experiments, clones and works in progress — lives on GitHub.</p>
          <Button href={githubProfile} external>
            GitHub profile
          </Button>
        </div>
      </div>
    </section>
  );
}
