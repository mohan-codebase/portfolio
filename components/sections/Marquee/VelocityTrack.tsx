'use client';

import { useEffect, useRef, type ReactNode } from 'react';

import { getLenis } from '@/lib/scroll';
import { approach, onFrame } from '@/lib/ticker';

/**
 * Drives the marquee with the page's scroll: it drifts on its own, speeds up
 * with scroll velocity, turns around when you scroll back up and leans into
 * the motion. Takes over from the CSS keyframe loop once hydrated, only runs
 * while on screen, and stays still for reduced motion.
 */
export function VelocityTrack({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = ref.current;
    const band = track?.parentElement;
    if (!track || !band || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let visible = false;
    let offset = 0;
    let direction = 1;
    let lean = 0;
    // The track holds two identical groups; one group's width is a full loop.
    let loop = track.scrollWidth / 2;

    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    const size = new ResizeObserver(() => {
      loop = track.scrollWidth / 2;
    });
    visibility.observe(band);
    size.observe(track);
    track.dataset.driven = '';

    const stop = onFrame((_, delta) => {
      if (!visible || !loop) return;
      const velocity = getLenis()?.velocity ?? 0;
      if (Math.abs(velocity) > 0.5) direction = Math.sign(velocity);
      const step = 0.05 * delta + Math.min(Math.abs(velocity), 80) * 0.45;
      offset = (((offset + step * direction) % loop) + loop) % loop;
      lean = approach(lean, Math.max(-9, Math.min(9, velocity * 0.18)), 0.12, delta);
      track.style.transform = `translate3d(${-offset}px, 0, 0) skewX(${-lean}deg)`;
    });

    return () => {
      stop();
      visibility.disconnect();
      size.disconnect();
      delete track.dataset.driven;
      track.style.transform = '';
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
