'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useSyncExternalStore } from 'react';

import { TransitionLink } from '@/components/transition/TransitionLink';
import { Arrow } from '@/components/ui/Arrow';
import { TextRoll } from '@/components/ui/TextRoll';
import { site } from '@/data/site';

import { OPEN_PALETTE } from './CommandPalette';
import styles from './Header.module.css';
import { MobileMenu } from './MobileMenu';

const noSubscribe = () => () => {};
const shortcutKey = () => (/Mac|iPhone|iPad/.test(navigator.userAgent) ? '⌘' : 'Ctrl');

/**
 * Fixed header that adapts to whatever is underneath it: it reads the theme of
 * the section visually below (so a covered, sticky hero never wins), marks the
 * current page, condenses once the page scrolls, and slides away while you
 * scroll down — any scroll back up brings it straight back.
 */
export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const modifier = useSyncExternalStore(noSubscribe, shortcutKey, () => '⌘');
  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    let frame = 0;
    let lastY = window.scrollY;
    header.dataset.hidden = 'false';

    const themeBelow = () =>
      document
        .elementsFromPoint(window.innerWidth / 2, header.offsetHeight / 2)
        .find((element) => !header.contains(element) && element.closest('[data-theme]'))
        ?.closest<HTMLElement>('[data-theme]');

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      header.dataset.scrolled = String(y > 24);
      if (Math.abs(y - lastY) > 6) {
        header.dataset.hidden = String(y > lastY && y > window.innerHeight * 0.6);
        lastY = y;
      }
      const below = themeBelow();
      if (below?.dataset.theme) header.dataset.theme = below.dataset.theme;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Runs again on every page change, so the new page's theme is read straight away.
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [pathname]);

  return (
    <header ref={headerRef} className={styles.header} data-theme="dark" data-scrolled="false" data-hidden="false">
      <div className={`container ${styles.bar}`}>
        <TransitionLink href="/" className={styles.brand} aria-label={`${site.name} — home`} data-cursor="stick">
          {site.name}
          <span className="stop">.</span>
        </TransitionLink>

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
                <TransitionLink href={item.href} className={styles.link} aria-current={isCurrent(item.href) ? 'page' : undefined}>
                  <span className={styles.index} aria-hidden="true">
                    0{index + 1}
                  </span>
                  <TextRoll>{item.label}</TextRoll>
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.end}>
          <span className={`label ${styles.progress}`} aria-hidden="true" />
          <button
            type="button"
            className={styles.palette}
            onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE))}
            aria-label="Quick navigation"
            aria-keyshortcuts="Meta+K Control+K"
            data-cursor="stick"
          >
            <kbd>{modifier}</kbd>
            <kbd>K</kbd>
          </button>
          <TransitionLink
            href="/contact"
            className={styles.contact}
            aria-current={isCurrent('/contact') ? 'page' : undefined}
            data-cursor="stick"
          >
            <TextRoll>Contact</TextRoll>
            <Arrow className={styles.arrow} />
          </TransitionLink>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
