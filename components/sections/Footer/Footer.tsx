import type { CSSProperties } from 'react';

import { Arrow } from '@/components/ui/Arrow';
import { mailto, site, socials } from '@/data/site';

import styles from './Footer.module.css';

const index = [...site.nav, { label: 'Contact', href: '#contact' }];

/** Revealed from underneath the page as the contact section scrolls away. */
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
              {index.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={styles.link}>
                    {item.label}
                  </a>
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

          <a href="#top" className={styles.back}>
            Back to top <Arrow direction="up" />
          </a>
        </div>

        <div className={styles.bottom}>
          <p className="label">
            © {site.year} {site.name}
          </p>
          <p className="label mute">Designed &amp; built by {site.name} with Next.js</p>
          <p className={`label mute ${styles.hint}`}>
            Press <kbd>G</kbd> to see the grid
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
