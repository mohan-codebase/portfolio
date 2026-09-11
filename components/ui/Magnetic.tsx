'use client';

import { useEffect, useRef, type ReactNode } from 'react';

import { cx } from '@/lib/cx';

import styles from './Magnetic.module.css';

/**
 * Pulls its child towards the pointer and springs back on leave. The outer
 * span is the (untransformed) hit area, so measurements never feed back into
 * themselves. Inert for touch and reduced motion.
 */
export function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const areaRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const area = areaRef.current;
    if (!area) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;

    const onMove = (event: PointerEvent) => {
      const rect = area.getBoundingClientRect();
      area.style.setProperty('--mx', `${(event.clientX - rect.left - rect.width / 2) * strength}px`);
      area.style.setProperty('--my', `${(event.clientY - rect.top - rect.height / 2) * strength}px`);
      area.dataset.active = 'true';
    };
    const onLeave = () => {
      area.style.setProperty('--mx', '0px');
      area.style.setProperty('--my', '0px');
      area.dataset.active = 'false';
    };

    area.addEventListener('pointermove', onMove);
    area.addEventListener('pointerleave', onLeave);
    return () => {
      area.removeEventListener('pointermove', onMove);
      area.removeEventListener('pointerleave', onLeave);
    };
  }, [strength]);

  return (
    <span ref={areaRef} className={cx(styles.area, className)}>
      <span className={styles.inner}>{children}</span>
    </span>
  );
}
