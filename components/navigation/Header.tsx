'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { Arrow } from '@/components/ui/Arrow';
import { TextRoll } from '@/components/ui/TextRoll';
import { site } from '@/data/site';

import styles from './Header.module.css';
import { MobileMenu } from './MobileMenu';

/**
 * Fixed header that adapts to whatever is underneath it: it reads the theme of
 * the section visually below (so a covered, sticky hero never wins), marks the
 * current section in the nav, and condenses once the page scrolls.
 */
export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  // Section anchors live on the home page; elsewhere (e.g. the 404) they route home first.
  const to = (hash: string) => (pathname === '/' ? hash : `/${hash}`);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const links = Array.from(header.querySelectorAll<HTMLAnchorElement>('a[data-section]'));
    let frame = 0;

    const sectionAt = (y: number) =>
      document
        .elementsFromPoint(window.innerWidth / 2, y)
        .find((element) => !header.contains(element) && element.closest('[data-theme]'));

    const update = () => {
      frame = 0;
      header.dataset.scrolled = String(window.scrollY > 24);

      const below = sectionAt(header.offsetHeight / 2)?.closest<HTMLElement>('[data-theme]');
      if (below?.dataset.theme) header.dataset.theme = below.dataset.theme;

      const current = sectionAt(window.innerHeight * 0.45)?.closest('section[id]')?.id;
      for (const link of links) {
        if (link.dataset.section === current) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <header ref={headerRef} className={styles.header} data-theme="dark" data-scrolled="false">
      <div className={`container ${styles.bar}`}>
        <a href={to('#top')} className={styles.brand} aria-label={`${site.name} — back to top`}>
          {site.name}
          <span className="stop">.</span>
        </a>

        {site.availability ? (
          <p className={`label ${styles.status}`}>
            <span className="pulse" aria-hidden="true" />
            {site.availability}
          </p>
        ) : null}

        <nav className={styles.nav} aria-label="Primary">
          <ul>
            {site.nav.map((item, index) => (
              <li key={item.href}>
                <a href={to(item.href)} data-section={item.href.slice(1)} className={styles.link}>
                  <span className={styles.index} aria-hidden="true">
                    0{index + 1}
                  </span>
                  <TextRoll>{item.label}</TextRoll>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.end}>
          <span className={`label ${styles.progress}`} aria-hidden="true" />
          <a href={to('#contact')} className={styles.contact}>
            <TextRoll>Contact</TextRoll>
            <Arrow className={styles.arrow} />
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
