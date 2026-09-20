import type { CSSProperties } from 'react';
import type { Metadata } from 'next';

import { Contact } from '@/components/sections/Contact/Contact';
import { Button } from '@/components/ui/Button';
import { Lines } from '@/components/ui/Lines';
import { HeroStats, PageHero } from '@/components/ui/PageHero';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { privacy } from '@/data/content';
import { mailto, site } from '@/data/site';
import { pageMetadata } from '@/lib/metadata';

import styles from './page.module.css';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Policy',
  description: `Privacy policy for ${site.name}'s portfolio: zero tracking cookies, minimal server logs, and clear transparency.`,
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <main id="main" tabIndex={-1}>
      <PageHero
        index="04"
        label="Privacy"
        meta="Policy & Transparency"
        indents={[0, 2]}
        lines={[
          'Privacy',
          <>
            and <span className="serif">trust</span>
            <span className="stop">.</span>
          </>,
        ]}
        lede={privacy.hero.lede}
        aside={
          <HeroStats
            items={[
              { label: 'Tracking', value: 'Zero cookies' },
              { label: 'Hosting', value: 'Vercel Edge' },
              { label: 'Effective', value: privacy.effectiveDate },
            ]}
          />
        }
      />

      <section className={`section ${styles.policy}`} data-theme="light" aria-labelledby="policy-title">
        <div className="container">
          <SectionHeader index="01" title="Statement" meta={`Updated ${privacy.effectiveDate}`} />

          <div className={`grid ${styles.head}`}>
            <h2 id="policy-title" className={styles.title} data-reveal="lines">
              <Lines
                indents={[0, 2]}
                lines={[
                  'Honest',
                  <>
                    by <span className="serif">design</span>
                    <span className="stop">.</span>
                  </>,
                ]}
              />
            </h2>
            <p className={styles.intro} data-reveal>
              {privacy.summary.intro}
            </p>
          </div>

          <div className={`grid ${styles.cards}`}>
            {privacy.summary.points.map((point, index) => (
              <div
                key={point.number}
                className={styles.card}
                data-reveal
                style={{ '--delay': index * 90 } as CSSProperties}
              >
                <span className={`label ${styles.cardNumber}`}>{point.number}</span>
                <h3 className={styles.cardTitle}>{point.label}</h3>
                <p className={styles.cardDetail}>{point.detail}</p>
              </div>
            ))}
          </div>

          <div className={styles.articles}>
            {privacy.sections.map((section, index) => (
              <article
                key={section.id}
                id={section.id}
                className={`grid ${styles.article}`}
                data-reveal
                style={{ '--delay': index * 60 } as CSSProperties}
              >
                <div className={styles.articleMeta}>
                  <span className={`label ${styles.articleIndex}`}>({section.number})</span>
                  <h3 className={styles.articleTitle}>{section.title}</h3>
                  <p className="label mute">{section.summary}</p>
                </div>
                <div className={styles.articleBody}>
                  {section.paragraphs.map((text, pIndex) => (
                    <p key={pIndex}>{text}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className={styles.notice} data-reveal>
            <div className={styles.noticeInner}>
              <div>
                <p className="label mute">Questions & Inquiries</p>
                <h3 className={styles.noticeTitle}>Have questions about your data?</h3>
                <p className={styles.noticeText}>
                  Feel free to write directly with any questions regarding this policy or to request removal of past communications.
                </p>
              </div>
              <Button href={mailto} arrow="up-right">
                Email Mohan
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Contact variant="cta" index="02" />
    </main>
  );
}
