import type { Metadata } from 'next';

import { About } from '@/components/sections/About/About';
import { Contact } from '@/components/sections/Contact/Contact';
import { Hero } from '@/components/sections/Hero/Hero';
import { Marquee } from '@/components/sections/Marquee/Marquee';
import { WorkReel } from '@/components/sections/WorkReel/WorkReel';
import { site, socials } from '@/data/site';
import { pageMetadata, siteDescription } from '@/lib/metadata';

import styles from './page.module.css';

export const metadata: Metadata = pageMetadata({ description: siteDescription, path: '/' });

const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.location.city,
    addressCountry: site.location.countryCode,
  },
  sameAs: socials.map((social) => social.href),
};

export default function Home() {
  return (
    <main id="main" tabIndex={-1}>
      {/* The hero stays pinned while the About sheet slides over it. */}
      <div className={styles.opening}>
        <Hero />
        <About variant="home" index="02" />
      </div>
      <Marquee />
      <WorkReel index="03" />
      <Contact variant="cta" index="04" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, '\\u003c') }}
      />
    </main>
  );
}
