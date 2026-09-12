/**
 * Tells effects when the current page is actually on screen — once the
 * first-visit preloader lifts, or once the page-transition curtain opens — so
 * reveals never play hidden behind an overlay.
 */

export const CURTAIN_OPEN = 'curtain:open';

export function whenPageVisible(callback: () => void) {
  let active = true;
  const run = () => {
    if (active) callback();
  };

  if (document.documentElement.dataset.curtain) {
    window.addEventListener(CURTAIN_OPEN, run, { once: true });
    return () => {
      active = false;
      window.removeEventListener(CURTAIN_OPEN, run);
    };
  }

  // The preloader is CSS-only. Its marker animation finishes as the panels start to lift;
  // when the preloader is skipped the marker is `display: none` and has no animation at all.
  const marker = document.querySelector('[data-preloader-marker]')?.getAnimations()[0];
  if (marker && marker.playState !== 'finished') marker.finished.then(run, run);
  else run();

  return () => {
    active = false;
  };
}
