'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';

import { scrollToTarget, setLenis } from '@/lib/scroll';
import { onFrame } from '@/lib/ticker';

/**
 * Touch scrolling stays native by default: the browser runs it off the main
 * thread with the platform's own momentum, the smoothest a phone can scroll.
 * Set this to `true` if you want Lenis to drive touch scrolling as well.
 */
const SMOOTH_TOUCH = false;

/**
 * Lenis smooths wheel and trackpad scrolling, and eases jumps to same-page
 * anchors. It runs on the shared frame loop and never starts for reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      syncTouch: SMOOTH_TOUCH,
      syncTouchLerp: 0.085,
    });
    setLenis(lenis);
    const stop = onFrame((time) => lenis.raf(time));

    // Same-page anchors glide instead of jumping, and keyboard focus follows them.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href*="#"]');
      if (!link || link.target === '_blank') return;
      const url = new URL(link.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;

      event.preventDefault();
      history.replaceState(history.state, '', url.hash);
      scrollToTarget(target);
      if (!target.matches('a, button, input, select, textarea, [tabindex]')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      stop();
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
