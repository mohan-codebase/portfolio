import type { CSSProperties } from 'react';

import { TransitionLink } from '@/components/transition/TransitionLink';
import { Arrow } from '@/components/ui/Arrow';
import { mailto, site, socials } from '@/data/site';

import { BackToTop } from './BackToTop';
import styles from './Footer.module.css';

/** Revealed from underneath the page as the last section scrolls away. */
export function Footer() {
  return (
    <footer className={styles.footer} data-theme="light">
      <div className={`container ${styles.inner}`}>
        <div className={`grid ${styles.top}`}>
          <div className={styles.brand}>
            <p className={styles.name}>
              {site.name}
              <span className="stop">.</span>
            </p>
            <p className="label mute">
              {site.role}
              <br />
              {site.location.city}, {site.location.country}
            </p>
          </div>

          <nav className={styles.column} aria-label="Footer">
            <p className="label mute">Index</p>
            <ul>
              {site.pages.map((page) => (
                <li key={page.href}>
                  <TransitionLink href={page.href} className={styles.link}>
                    {page.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.column}>
            <p className="label mute">Social</p>
            <ul>
              {socials.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    {social.label} <Arrow />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
              <li>
                <a href={mailto} className={styles.link}>
                  Email <Arrow />
                </a>
              </li>
            </ul>
          </div>

          <BackToTop className={styles.back} />
        </div>

        <div className={styles.bottom}>
          <p className="label">
            © {site.year} {site.name}
          </p>
          <p className="label mute">Designed &amp; built by {site.name} with Next.js</p>
          <p className={`label mute ${styles.hint}`}>
            Press <kbd>G</kbd> for the grid · <kbd>⌘K</kbd> to jump anywhere
          </p>
        </div>

        <p className={styles.wordmark} aria-hidden="true">
          {site.name
            .toUpperCase()
            .split('')
            .map((letter, position) => (
              <span key={position} style={{ '--i': position } as CSSProperties}>
                {letter}
              </span>
            ))}
        </p>
      </div>
    </footer>
  );
}
