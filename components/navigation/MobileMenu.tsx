'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react';

import { Arrow } from '@/components/ui/Arrow';
import { mailto, site, socials } from '@/data/site';

import styles from './MobileMenu.module.css';

const items = [...site.nav, { label: 'Contact', href: '#contact' }];

/**
 * Full-screen menu for small screens, built on a native modal <dialog>:
 * focus is trapped, the page is inert and Escape closes it for free.
 * We only add the open/close choreography.
 */
export function MobileMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const timerRef = useRef(0);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // Off the home page, links route home (and are not intercepted by `navigate`).
  const to = (hash: string) => (pathname === '/' ? hash : `/${hash}`);

  const close = (then?: () => void) => {
    const dialog = dialogRef.current;
    if (!dialog?.open) return;
    dialog.dataset.state = 'closing';
    const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 520;
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      dialog.close();
      dialog.dataset.state = 'closed';
      setOpen(false);
      then?.();
    }, delay);
  };

  const show = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    setOpen(true);
    requestAnimationFrame(() => {
      dialog.dataset.state = 'open';
    });
  };

  // Close with the animation on Escape, and drop the menu if the viewport grows to desktop.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onCancel = (event: Event) => {
      event.preventDefault();
      close();
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onChange = () => {
      if (desktop.matches && dialog.open) {
        dialog.close();
        dialog.dataset.state = 'closed';
        setOpen(false);
      }
    };
    dialog.addEventListener('cancel', onCancel);
    desktop.addEventListener('change', onChange);
    return () => {
      dialog.removeEventListener('cancel', onCancel);
      desktop.removeEventListener('change', onChange);
      window.clearTimeout(timerRef.current);
    };
  }, []);

  const navigate = (event: MouseEvent<HTMLAnchorElement>) => {
    const href = event.currentTarget.getAttribute('href');
    if (!href?.startsWith('#')) return;
    event.preventDefault();
    close(() => {
      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;
      history.pushState(null, '', href);
      target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  };

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

      <dialog id="site-menu" ref={dialogRef} className={styles.menu} aria-label="Menu" data-theme="dark" data-state="closed">
        <div className={`container ${styles.top}`}>
          <a href={to('#top')} className={styles.brand} onClick={navigate}>
            {site.name}
            <span className="stop">.</span>
          </a>
          <button type="button" className={styles.close} onClick={() => close()}>
            Close
            <span className={styles.cross} aria-hidden="true" />
          </button>
        </div>

        <nav className={`container ${styles.nav}`} aria-label="Menu">
          <ol className={styles.list}>
            {items.map((item, index) => (
              <li key={item.href} style={{ '--i': index } as CSSProperties}>
                <a href={to(item.href)} onClick={navigate}>
                  <span className={`label ${styles.index}`}>0{index + 1}</span>
                  <span className={styles.word}>{item.label}</span>
                </a>
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
          {site.availability ? (
            <p className={`label ${styles.status}`}>
              <span className="pulse" aria-hidden="true" />
              {site.availability}
            </p>
          ) : null}
        </div>
      </dialog>
    </>
  );
}
