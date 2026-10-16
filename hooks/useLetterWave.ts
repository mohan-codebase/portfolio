'use client';

import { useEffect, type RefObject } from 'react';
import { gsap } from '@/lib/gsap';

/** Separate animation layer keeps the idle wave independent of hover/reveal tweens. */
export function useLetterWave(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = scope.current;
    if (!element) return;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const letters = element.querySelectorAll('[data-letter-wave]');
      const wave = gsap.to(letters, {
        y: -7,
        duration: 1.8,
        ease: 'sine.inOut',
        stagger: { each: 0.16, repeat: -1, yoyo: true },
        paused: true,
      });
      let inView = false;
      let hovering = false;
      const sync = () => {
        if (inView && !hovering && !document.hidden) wave.resume();
        else wave.pause();
      };
      const observer = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        sync();
      });
      observer.observe(element);
      const enter = (event: PointerEvent) => { if (event.pointerType === 'mouse') { hovering = true; sync(); } };
      const leave = () => { hovering = false; sync(); };
      element.addEventListener('pointerenter', enter);
      element.addEventListener('pointerleave', leave);
      document.addEventListener('visibilitychange', sync);
      return () => {
        observer.disconnect();
        element.removeEventListener('pointerenter', enter);
        element.removeEventListener('pointerleave', leave);
        document.removeEventListener('visibilitychange', sync);
        wave.kill();
      };
    }, element);
    return () => media.revert();
  }, [scope]);
}
