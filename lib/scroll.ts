import type Lenis from 'lenis';

/**
 * Access to the page's smooth scroller from anywhere. Lenis never starts for
 * reduced motion, so every helper falls back to native scrolling.
 */

let lenis: Lenis | null = null;
let locks = 0;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}

/** Freezes page scroll for overlays and page transitions. Locks nest; returns the release. */
export function lockScroll() {
  locks += 1;
  lenis?.stop();
  let released = false;
  return () => {
    if (released) return;
    released = true;
    locks -= 1;
    if (locks === 0) lenis?.start();
  };
}

/** Quart in-out: a deliberate start and a soft landing for jumps across the page. */
const easeInOut = (t: number) => (t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2);

type Target = number | string | HTMLElement;

function resolveY(target: Target) {
  if (typeof target === 'number') return target;
  const element = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
  return element ? element.getBoundingClientRect().top + window.scrollY : null;
}

/** Scrolls to a position, element or selector — eased by Lenis, native otherwise. */
export function scrollToTarget(
  target: Target,
  { immediate = false, offset = 0, onComplete }: { immediate?: boolean; offset?: number; onComplete?: () => void } = {},
) {
  const y = resolveY(target);
  if (y === null) return false;
  const top = Math.max(0, y + offset);

  if (lenis) {
    lenis.scrollTo(top, {
      immediate,
      force: true,
      // Longer trips take a little longer, capped so a long page never drags.
      duration: Math.min(2.2, 0.9 + Math.abs(top - lenis.scroll) / 5000),
      easing: easeInOut,
      onComplete: () => onComplete?.(),
    });
    return true;
  }

  const smooth = !immediate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' });
  onComplete?.();
  return true;
}
