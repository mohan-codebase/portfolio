'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useEffectEvent, useRef, useState, type CSSProperties } from 'react';

import { TransitionLink } from '@/components/transition/TransitionLink';
import { Arrow } from '@/components/ui/Arrow';
import { LocalTime } from '@/components/ui/LocalTime';
import { mailto, site, socials } from '@/data/site';
import { lockScroll } from '@/lib/scroll';

import styles from './MobileMenu.module.css';

/**
 * Full-screen menu for small screens, built on a native modal <dialog>:
 * focus is trapped, the page is inert and Escape closes it for free.
 * Picking a page closes the menu while the page curtain rises underneath.
 */
export function MobileMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const timerRef = useRef(0);
  const releaseRef = useRef<(() => void) | null>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isCurrent = (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`));

  const finish = () => {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    if (dialog) dialog.dataset.state = 'closed';
    releaseRef.current?.();
    releaseRef.current = null;
    setOpen(false);
  };

  const close = () => {
    const dialog = dialogRef.current;
    if (!dialog?.open || dialog.dataset.state === 'closing') return;
    dialog.dataset.state = 'closing';
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(finish, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 520);
  };

  const show = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    releaseRef.current = lockScroll();
    setOpen(true);
    requestAnimationFrame(() => {
      dialog.dataset.state = 'open';
    });
  };

  const onCancel = useEffectEvent((event: Event) => {
    event.preventDefault();
    close();
  });
  const onDesktop = useEffectEvent(() => {
    if (dialogRef.current?.open) finish();
  });

  // Close with the animation on Escape, and drop the menu if the viewport grows to desktop.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onChange = () => {
      if (desktop.matches) onDesktop();
    };
    dialog.addEventListener('cancel', onCancel);
    desktop.addEventListener('change', onChange);
    return () => {
      dialog.removeEventListener('cancel', onCancel);
      desktop.removeEventListener('change', onChange);
      window.clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        className={styles.toggle}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={show}
      >
        Menu
        <span className={styles.bars} aria-hidden="true" />
      </button>

      <dialog
        id="site-menu"
        ref={dialogRef}
        className={styles.menu}
        aria-label="Menu"
        data-theme="dark"
        data-state="closed"
        data-lenis-prevent
      >
        <div className={`container ${styles.top}`}>
          <TransitionLink href="/" className={styles.brand} onClick={close}>
            {site.name}
            <span className="stop">.</span>
          </TransitionLink>
          <button type="button" className={styles.close} onClick={close}>
            Close
            <span className={styles.cross} aria-hidden="true" />
          </button>
        </div>

        <nav className={`container ${styles.nav}`} aria-label="Menu">
          <ol className={styles.list}>
            {site.pages.map((page, index) => (
              <li key={page.href} style={{ '--i': index } as CSSProperties}>
                <TransitionLink href={page.href} onClick={close} aria-current={isCurrent(page.href) ? 'page' : undefined}>
                  <span className={`label ${styles.index}`}>0{index + 1}</span>
                  <span className={styles.word}>{page.label}</span>
                  <Arrow className={styles.go} direction="right" />
                </TransitionLink>
              </li>
            ))}
          </ol>
        </nav>

        <div className={`container ${styles.foot}`}>
          <div>
            <p className="label mute">Get in touch</p>
            <a className={styles.email} href={mailto}>
              {site.email}
            </a>
          </div>
          <ul className={styles.socials}>
            {socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  {social.label} <Arrow />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
          <p className={`label ${styles.status}`}>
            {site.availability ? (
              <>
                <span className="pulse" aria-hidden="true" />
                {site.availability} ·
              </>
            ) : null}{' '}
            {site.location.city} <LocalTime timeZone={site.location.timeZone} /> {site.location.timeZoneLabel}
          </p>
        </div>
      </dialog>
    </>
  );
}
