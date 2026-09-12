import type { Metadata } from 'next';

import { About } from '@/components/sections/About/About';
import { Contact } from '@/components/sections/Contact/Contact';
import { Currently } from '@/components/sections/Currently/Currently';
import { Experience } from '@/components/sections/Experience/Experience';
import { Toolkit } from '@/components/sections/Toolkit/Toolkit';
import { Emphasis } from '@/components/ui/Emphasis';
import { HeroStats, PageHero } from '@/components/ui/PageHero';
import { aboutPage, hero } from '@/data/content';
import { site } from '@/data/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'About',
  description: `About ${site.name}, a fullstack developer from ${site.location.city} who started with HTML and CSS in ${site.since} and now builds with React and Next.js.`,
  path: '/about',
});

export default function AboutPage() {
  const lastLine = aboutPage.headline.length - 1;

  return (
    <main id="main" tabIndex={-1}>
      <PageHero
        index="02"
        label="About"
        meta={site.role}
        indents={[0, 2]}
        lines={aboutPage.headline.map((line, position) => (
          <>
            <Emphasis text={line} />
            {position === lastLine ? <span className="stop">.</span> : null}
          </>
        ))}
        lede={hero.lede}
        aside={
          <HeroStats
            items={[
              { label: 'Based in', value: site.location.city },
              { label: 'Since', value: String(site.since) },
              { label: 'Status', value: site.availability ? 'Available' : 'Say hello' },
            ]}
          />
        }
      />
      <About variant="page" index="01" />
      <Toolkit index="02" />
      <Experience index="03" />
      <Currently index="04" />
      <Contact variant="cta" index="05" />
    </main>
  );
}
