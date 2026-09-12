import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CaseHero } from '@/components/case/CaseHero';
import { Gallery } from '@/components/case/Gallery';
import { NextProject } from '@/components/case/NextProject';
import { RevealWords } from '@/components/ui/RevealWords';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { caseStudy } from '@/data/content';
import { featured, getCase, nextCase } from '@/data/projects';
import { pageMetadata } from '@/lib/metadata';

import styles from './page.module.css';

// Only the featured projects have case studies; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return featured.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<'/work/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const project = getCase(slug);
  if (!project) return {};
  return pageMetadata({ title: `${project.title} — case study`, description: project.summary, path: `/work/${project.slug}` });
}

const pad = (value: number) => String(value).padStart(2, '0');

export default async function CaseStudyPage({ params }: PageProps<'/work/[slug]'>) {
  const { slug } = await params;
  const project = getCase(slug);
  if (!project) notFound();

  return (
    <main id="main" tabIndex={-1}>
      <CaseHero project={project} index={featured.indexOf(project)} total={featured.length} />

      <section className={`section ${styles.overview}`} data-theme="light" aria-labelledby="overview-title">
        <div className="container">
          <SectionHeader index="01" title={caseStudy.overview} meta={project.category} />
          <h2 id="overview-title" className="sr-only">
            {caseStudy.overview}
          </h2>
          <div className={`grid ${styles.body}`}>
            <RevealWords className={styles.summary} text={project.summary} />
            <div className={styles.side}>
              <div className={styles.block} data-reveal>
                <p className="label mute">{caseStudy.highlights}</p>
                <ul className={styles.highlights}>
                  {project.highlights.map((highlight, index) => (
                    <li key={highlight}>
                      <span className="label">{pad(index + 1)}</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
              {project.team ? (
                <div className={styles.block} data-reveal>
                  <p className="label mute">Team</p>
                  <p>{project.team}</p>
                </div>
              ) : null}
              <div className={styles.block} data-reveal>
                <p className="label mute">Stack</p>
                <ul className={styles.stack}>
                  {project.stack.map((tech) => (
                    <li key={tech} className="label">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.screens}`} data-theme="light" aria-labelledby="screens-title">
        <div className="container">
          <SectionHeader index="02" title={caseStudy.screens} meta="Select a screen to expand" />
          <h2 id="screens-title" className="sr-only">
            {caseStudy.screens}
          </h2>
          <Gallery project={project} />
        </div>
      </section>

      <NextProject project={nextCase(project.slug)} />
    </main>
  );
}
