import { TransitionLink } from '@/components/transition/TransitionLink';
import { Arrow } from '@/components/ui/Arrow';
import { Emphasis } from '@/components/ui/Emphasis';
import { Lines } from '@/components/ui/Lines';
import { LocalTime } from '@/components/ui/LocalTime';
import { Magnetic } from '@/components/ui/Magnetic';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { contact } from '@/data/content';
import { mailto, site, socials } from '@/data/site';
import { cx } from '@/lib/cx';

import styles from './Contact.module.css';
import { CopyEmail } from './CopyEmail';

/**
 * "Let's make it real." As the closing call to action on other pages, the big
 * circle leads to the contact page; on the contact page itself it is the
 * opening screen and the circle writes an email straight away.
 */
export function Contact({ variant = 'cta', index = '04' }: { variant?: 'cta' | 'page'; index?: string }) {
  const lastLine = contact.headline.length - 1;
  const page = variant === 'page';
  const Heading = page ? 'h1' : 'h2';
  const circle = (
    <>
      <span className={styles.circleLabel}>{page ? 'Write to me' : 'Get in touch'}</span>
      <Arrow className={styles.circleArrow} />
    </>
  );

  return (
    <section
      id="contact"
      className={cx('section', styles.contact, page && styles.page)}
      data-theme="dark"
      aria-labelledby="contact-title"
    >
      <div className="container">
        <SectionHeader
          index={index}
          title="Contact"
          meta={
            <>
              {site.location.city}, {site.location.countryCode} — <LocalTime timeZone={site.location.timeZone} />{' '}
              {site.location.timeZoneLabel}
            </>
          }
        />

        <p className={cx('serif', styles.kicker, page && 'enter-fade')} data-reveal={page ? undefined : ''}>
          {contact.kicker}
        </p>

        <div className={styles.stage}>
          <Heading id="contact-title" className={cx(styles.title, page && 'enter-lines')} data-reveal={page ? undefined : 'lines'}>
            <Lines
              indents={[0, 2, 5]}
              lines={contact.headline.map((line, position) => (
                <>
                  <Emphasis text={line} />
                  {position === lastLine ? <span className="stop">.</span> : null}
                </>
              ))}
            />
          </Heading>

          <div className={cx(styles.cta, page && 'enter-fade')} data-reveal={page ? undefined : ''}>
            <p className={styles.body}>{contact.body}</p>
            <Magnetic strength={0.35} className={styles.magnet}>
              {page ? (
                <a href={mailto} className={styles.circle} data-cursor="hide">
                  {circle}
                </a>
              ) : (
                <TransitionLink href="/contact" className={styles.circle} data-cursor="hide">
                  {circle}
                </TransitionLink>
              )}
            </Magnetic>
          </div>
        </div>

        <div className={`grid ${styles.details}`}>
          <div className={styles.block} data-reveal>
            <p className="label mute">Email</p>
            <div className={styles.emailRow}>
              <a href={mailto} className={styles.email}>
                {site.email}
              </a>
              <CopyEmail email={site.email} className={`label ${styles.copy}`} />
            </div>
          </div>

          <div className={styles.block} data-reveal>
            <p className="label mute">Elsewhere</p>
            <ul className={styles.socials}>
              {socials.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" className={styles.social}>
                    {social.label} <Arrow />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.block} data-reveal>
            <p className="label mute">Status</p>
            <p className={styles.status}>
              {site.availability ? (
                <>
                  <span className="pulse" aria-hidden="true" />
                  {site.availability}
                </>
              ) : (
                'Say hello'
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
