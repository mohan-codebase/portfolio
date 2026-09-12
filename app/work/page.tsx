import type { Metadata } from 'next';

import { Contact } from '@/components/sections/Contact/Contact';
import { Work } from '@/components/sections/Work/Work';
import { HeroStats, PageHero } from '@/components/ui/PageHero';
import { work } from '@/data/content';
import { featured, projectCards } from '@/data/projects';
import { site } from '@/data/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Work',
  description: `Projects by ${site.name}: case studies and smaller builds, from a first landing page to React web apps.`,
  path: '/work',
});

const pad = (value: number) => String(value).padStart(2, '0');

export default function WorkPage() {
  return (
    <main id="main" tabIndex={-1}>
      <PageHero
        index="01"
        label="Work"
        meta={`${site.since} — ${site.year}`}
        indents={[0, 2]}
        lines={[
          'Things',
          <>
            I&apos;ve <span className="serif">built</span>
            <span className="stop">.</span>
          </>,
        ]}
        lede={work.intro}
        aside={
          <HeroStats
            items={[
              { label: 'Projects', value: pad(projectCards.length) },
              { label: 'Case studies', value: pad(featured.length) },
              { label: 'Since', value: String(site.since) },
            ]}
          />
        }
      />
      <Work />
      <Contact variant="cta" index="03" />
    </main>
  );
}
