import { About } from '@/components/sections/About/About';
import { Contact } from '@/components/sections/Contact/Contact';
import { Currently } from '@/components/sections/Currently/Currently';
import { Experience } from '@/components/sections/Experience/Experience';
import { Footer } from '@/components/sections/Footer/Footer';
import { Hero } from '@/components/sections/Hero/Hero';
import { Marquee } from '@/components/sections/Marquee/Marquee';
import { Toolkit } from '@/components/sections/Toolkit/Toolkit';
import { Work } from '@/components/sections/Work/Work';
import { site, socials } from '@/data/site';

import styles from './page.module.css';

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
    <>
      <main id="main" tabIndex={-1} className={styles.main}>
        {/* The hero stays pinned while the About sheet slides over it. */}
        <div className={styles.opening}>
          <Hero />
          <About />
        </div>
        <Marquee />
        <Work />
        <Toolkit />
        <Experience />
        <Currently />
        <Contact />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, '\\u003c') }}
      />
    </>
  );
}
