'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Lenis, { type LenisOptions } from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface LenisContextType {
  lenis: Lenis | null;
  scrollTo: (
    target: string | number | HTMLElement,
    options?: Parameters<Lenis['scrollTo']>[1]
  ) => void;
}

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  scrollTo: () => {},
});

export const useLenis = () => useContext(LenisContext);

export interface SmoothScrollProviderProps {
  children: React.ReactNode;
  options?: Partial<LenisOptions>;
  duration?: number;
  easing?: (time: number) => number;
  wheelMultiplier?: number;
  touchMultiplier?: number;
  lerp?: number;
  syncTouch?: boolean;
}

export const DEFAULT_LENIS_EASING = (t: number) =>
  Math.min(1, 1.001 - Math.pow(2, -8 * t));
export const DEFAULT_LENIS_DURATION = 3.0;
export const DEFAULT_LENIS_WHEEL_MULTIPLIER = 0.6;
export const DEFAULT_LENIS_TOUCH_MULTIPLIER = 0.95;

export function SmoothScrollProvider({
  children,
  options,
  duration = DEFAULT_LENIS_DURATION,
  easing = DEFAULT_LENIS_EASING,
  wheelMultiplier = DEFAULT_LENIS_WHEEL_MULTIPLIER,
  touchMultiplier = DEFAULT_LENIS_TOUCH_MULTIPLIER,
  lerp,
  syncTouch,
}: SmoothScrollProviderProps) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  const finalDuration = options?.duration ?? duration;
  const finalEasing = options?.easing ?? easing;
  const finalWheelMultiplier = options?.wheelMultiplier ?? wheelMultiplier;
  const finalTouchMultiplier = options?.touchMultiplier ?? touchMultiplier;
  const finalLerp = options?.lerp ?? lerp;
  const finalSyncTouch = options?.syncTouch ?? syncTouch;

  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0.01 : finalDuration,
      easing: prefersReducedMotion ? (t) => t : finalEasing,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: finalWheelMultiplier,
      touchMultiplier: finalTouchMultiplier,
      ...(finalLerp !== undefined ? { lerp: finalLerp } : {}),
      ...(finalSyncTouch !== undefined ? { syncTouch: finalSyncTouch } : {}),
      ...options,
    });

    lenisRef.current = lenis;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenisInstance(lenis);

    // Synchronize Lenis scroll position with GSAP ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', handleScroll);

    // Drive Lenis RAF loop via GSAP ticker for synchronized animation timings
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Recalculate ScrollTrigger positions
    ScrollTrigger.refresh();

    // Smooth anchor link click handling for internal page anchors (#hero-section, etc.)
    const handleAnchorClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      const currentPath = window.location.pathname;
      const isCurrentPageAnchor =
        href.startsWith('#') ||
        (href.startsWith('/#') && currentPath === '/');

      if (isCurrentPageAnchor) {
        const hash = href.includes('#') ? href.substring(href.indexOf('#')) : '';
        if (hash && hash !== '#') {
          const targetElement = document.querySelector(hash);
          if (targetElement) {
            e.preventDefault();
            lenis.scrollTo(targetElement as HTMLElement, {
              offset: -80,
              duration: prefersReducedMotion ? 0.01 : finalDuration,
            });
            window.history.pushState(null, '', hash);
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      lenis.off('scroll', handleScroll);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, [
    finalDuration,
    finalEasing,
    finalWheelMultiplier,
    finalTouchMultiplier,
    finalLerp,
    finalSyncTouch,
    options,
  ]);

  // Recalculate and reset scroll smoothly on route navigation
  useEffect(() => {
    if (!lenisRef.current) return;

    if (typeof window !== 'undefined' && !window.location.hash) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }

    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => clearTimeout(timeout);
  }, [pathname]);

  const scrollTo = (
    target: string | number | HTMLElement,
    scrollOptions?: Parameters<Lenis['scrollTo']>[1]
  ) => {
    if (lenisRef.current) {
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      lenisRef.current.scrollTo(target, {
        duration: prefersReducedMotion ? 0.01 : finalDuration,
        ...scrollOptions,
      });
    }
  };

  return (
    <LenisContext.Provider value={{ lenis: lenisInstance, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}

export default SmoothScrollProvider;
