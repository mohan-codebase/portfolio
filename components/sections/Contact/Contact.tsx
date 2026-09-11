import { Arrow } from '@/components/ui/Arrow';
import { Emphasis } from '@/components/ui/Emphasis';
import { Lines } from '@/components/ui/Lines';
import { LocalTime } from '@/components/ui/LocalTime';
import { Magnetic } from '@/components/ui/Magnetic';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { contact } from '@/data/content';
import { mailto, site, socials } from '@/data/site';

import styles from './Contact.module.css';
import { CopyEmail } from './CopyEmail';

export function Contact() {
  const lastLine = contact.headline.length - 1;

  return (
    <section id="contact" className={`section ${styles.contact}`} data-theme="dark" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeader
          index="07"
          title="Contact"
          meta={
            <>
              {site.location.city}, {site.location.countryCode} — <LocalTime timeZone={site.location.timeZone} />{' '}
              {site.location.timeZoneLabel}
            </>
          }
        />

        <p className={`serif ${styles.kicker}`} data-reveal>
          {contact.kicker}
        </p>

        <div className={styles.stage}>
          <h2 id="contact-title" className={styles.title} data-reveal="lines">
            <Lines
              indents={[0, 2, 5]}
              lines={contact.headline.map((line, index) => (
                <>
                  <Emphasis text={line} />
                  {index === lastLine ? <span className="stop">.</span> : null}
                </>
              ))}
            />
          </h2>

          <div className={styles.cta} data-reveal>
            <p className={styles.body}>{contact.body}</p>
            <Magnetic strength={0.35} className={styles.magnet}>
              <a href={mailto} className={styles.circle} data-cursor="hide">
                <span className={styles.circleLabel}>Get in touch</span>
                <Arrow className={styles.circleArrow} />
              </a>
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
