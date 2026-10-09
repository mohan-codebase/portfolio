'use client';

import { useEffect, type RefObject } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * Hook to execute GSAP animations within a scoped context, ensuring clean
 * teardown of all tweens, timelines, and ScrollTriggers on component unmount.
 */
export function useGsapContext(
  scope: RefObject<HTMLElement | null>,
  callback: (context: gsap.Context) => void,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    if (!scope.current) return;

    const ctx = gsap.context((self) => {
      callback(self);
    }, scope);

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Scroll reveal hook for animating elements as they enter the viewport
 */
export function useScrollReveal(
  targetRef: RefObject<HTMLElement | null>,
  options?: {
    y?: number;
    opacity?: number;
    duration?: number;
    ease?: string;
    start?: string;
    delay?: number;
  }
) {
  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const tween = gsap.fromTo(
      el,
      {
        y: options?.y ?? 40,
        opacity: options?.opacity ?? 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: options?.duration ?? 0.9,
        ease: options?.ease ?? 'power3.out',
        delay: options?.delay ?? 0,
        scrollTrigger: {
          trigger: el,
          start: options?.start ?? 'top 88%',
          toggleActions: 'play none none none',
          once: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [targetRef, options]);
}

export { gsap, ScrollTrigger };
