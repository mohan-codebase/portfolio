'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { whenPageVisible } from '@/lib/stage';

/**
 * One observer for the whole page instead of a client wrapper per element:
 * - `[data-reveal]` gets `data-in` once, the first time it scrolls into view.
 *   Observation waits until the page is visible (preloader or page curtain
 *   gone), so reveals never play behind an overlay.
 * - `[data-observe]` gets `data-visible` toggled continuously (used to pause
 *   decorative loops while they are off-screen).
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute('data-in', '');
          reveal.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );

    const visibility = new IntersectionObserver((entries) => {
      for (const entry of entries) entry.target.toggleAttribute('data-visible', entry.isIntersecting);
    });

    document.querySelectorAll('[data-observe]').forEach((element) => visibility.observe(element));
    const cancel = whenPageVisible(() => {
      document.querySelectorAll('[data-reveal]:not([data-in])').forEach((element) => reveal.observe(element));
    });

    return () => {
      cancel();
      reveal.disconnect();
      visibility.disconnect();
    };
  }, [pathname]);

  return null;
}
