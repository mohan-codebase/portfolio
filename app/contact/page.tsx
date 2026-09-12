import type { Metadata } from 'next';

import { Composer } from '@/components/contact/Composer';
import { Contact } from '@/components/sections/Contact/Contact';
import { Lines } from '@/components/ui/Lines';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { composer } from '@/data/content';
import { site } from '@/data/site';
import { pageMetadata } from '@/lib/metadata';

import styles from './page.module.css';

export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description: `Get in touch with ${site.name} about a website, a web app or a role — by email, or with a short project brief.`,
  path: '/contact',
});

export default function ContactPage() {
  return (
    <main id="main" tabIndex={-1}>
      <Contact variant="page" index="01" />

      <section className={`section ${styles.brief}`} data-theme="light" aria-labelledby="brief-title">
        <div className="container">
          <SectionHeader index="02" title="Project brief" meta="Drafts an email for you" />
          <div className={`grid ${styles.head}`}>
            <h2 id="brief-title" className={styles.title} data-reveal="lines">
              <Lines
                indents={[0, 2]}
                lines={[
                  'Tell me',
                  <>
                    about <span className="serif">it</span>
                    <span className="stop">.</span>
                  </>,
                ]}
              />
            </h2>
            <p className={styles.intro} data-reveal>
              {composer.intro}
            </p>
          </div>
          <Composer />
        </div>
      </section>
    </main>
  );
}
