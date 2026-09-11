'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Feeds the pointer position (0–1) to CSS as `--px` / `--py`, eased in a
 * single rAF loop that stops as soon as it settles. Also flags the stage as
 * paused once it is fully covered, so decorative loops stop running.
 */
export function HeroStage({ children, className }: { children: ReactNode; className?: string }) {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const onScroll = () => {
      stage.toggleAttribute('data-paused', window.scrollY > stage.offsetHeight);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const fine = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    if (!fine.matches) return () => window.removeEventListener('scroll', onScroll);

    let x = 0.7;
    let y = 0.6;
    let targetX = x;
    let targetY = y;
    let frame = 0;

    const render = () => {
      x += (targetX - x) * 0.09;
      y += (targetY - y) * 0.09;
      stage.style.setProperty('--px', x.toFixed(4));
      stage.style.setProperty('--py', y.toFixed(4));
      frame = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.0005 ? requestAnimationFrame(render) : 0;
    };
    const onMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      targetX = (event.clientX - rect.left) / rect.width;
      targetY = (event.clientY - rect.top) / rect.height;
      stage.dataset.pointer = 'true';
      if (!frame) frame = requestAnimationFrame(render);
    };
    const onLeave = () => {
      stage.dataset.pointer = 'false';
    };

    stage.addEventListener('pointermove', onMove);
    stage.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div ref={stageRef} className={className} data-pointer="false">
      {children}
    </div>
  );
}
