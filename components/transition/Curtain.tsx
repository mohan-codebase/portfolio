'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type CSSProperties } from 'react';

import { lockScroll, scrollToTarget } from '@/lib/scroll';
import { CURTAIN_OPEN } from '@/lib/stage';
import { setTransitionHandler } from '@/lib/transition';

import styles from './Curtain.module.css';

type Phase = 'idle' | 'cover' | 'reveal';

/** Keep in sync with Curtain.module.css: the last panel's delay plus its duration. */
const COVER_MS = 780;
/** The destination's name stays up at least this long after the click, so it can be read. */
const HOLD_MS = 1050;
const REVEAL_MS = 1000;
/** If a page never arrives, fall back to a full page load rather than a stuck curtain. */
const TIMEOUT_MS = 8000;

const panels = Array.from({ length: 12 }, (_, index) => index);

/**
 * The page transition. Ink columns rise over the page in a left-to-right
 * wave, the destination's name is set in the middle, the route changes
 * underneath, and the columns lift away — the same grid the preloader uses.
 * Reduced motion skips it entirely and navigates instantly.
 */
export function Curtain({ labels }: { labels: Record<string, string> }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>('idle');
  const [label, setLabel] = useState('');
  const pending = useRef<{ pathname: string; hash: string; start: number; release: () => void } | null>(null);
  const timers = useRef<number[]>([]);

  const later = (callback: () => void, delay: number) => {
    timers.current.push(window.setTimeout(callback, delay));
  };
  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    setTransitionHandler((href) => {
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return false;
      if (pending.current) return true;

      // Same page: glide to the anchor, or back to the top.
      if (url.pathname === window.location.pathname) {
        const anchor = url.hash ? document.getElementById(decodeURIComponent(url.hash.slice(1))) : null;
        scrollToTarget(anchor ?? 0);
        return true;
      }
      if (reduced.matches) return false;

      const root = document.documentElement;
      pending.current = { pathname: url.pathname, hash: url.hash, start: performance.now(), release: lockScroll() };
      root.dataset.curtain = 'cover';
      setLabel(labels[url.pathname] ?? '');
      setPhase('cover');

      later(() => {
        // Fully covered: reset the scroll and swap the page underneath.
        scrollToTarget(0, { immediate: true });
        root.dataset.intro = 'nav';
        router.push(url.pathname + url.search + url.hash, { scroll: false });
      }, COVER_MS);
      later(() => window.location.assign(url.href), TIMEOUT_MS);
      return true;
    });

    return () => {
      setTransitionHandler(null);
      clearTimers();
    };
  }, [labels, router]);

  // The new page has committed. Once the name has been up long enough, give the page
  // two frames to paint, then lift the curtain.
  useEffect(() => {
    const current = pending.current;
    if (!current) return;

    let frame = 0;
    const reveal = () => {
      clearTimers();
      pending.current = null;
      const anchor = current.hash ? document.getElementById(decodeURIComponent(current.hash.slice(1))) : null;
      if (anchor) scrollToTarget(anchor, { immediate: true });

      delete document.documentElement.dataset.curtain;
      current.release();
      setPhase('reveal');
      window.dispatchEvent(new Event(CURTAIN_OPEN));
      document.getElementById('main')?.focus({ preventScroll: true });
      later(() => setPhase('idle'), REVEAL_MS);
    };

    const hold = window.setTimeout(
      () => {
        frame = requestAnimationFrame(() => {
          frame = requestAnimationFrame(reveal);
        });
      },
      Math.max(0, current.start + HOLD_MS - performance.now()),
    );

    return () => {
      window.clearTimeout(hold);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return (
    <div className={styles.curtain} data-phase={phase} aria-hidden="true">
      <div className={styles.panels}>
        {panels.map((index) => (
          <span key={index} className={styles.panel} style={{ '--i': index } as CSSProperties} />
        ))}
      </div>

      <div className={styles.center}>
        <p className={styles.title} style={{ '--chars': Math.max(label.length, 4) } as CSSProperties}>
          {label.split('').map((char, index) => (
            <span key={`${label}-${index}`} className={styles.mask}>
              <span className={styles.char} style={{ '--i': index } as CSSProperties}>
                {char === ' ' ? ' ' : char}
              </span>
            </span>
          ))}
        </p>
        <p className={`label ${styles.status}`}>
          Loading <span className={styles.bar} />
        </p>
      </div>
    </div>
  );
}
