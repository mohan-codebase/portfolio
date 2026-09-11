'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

import { cx } from '@/lib/cx';

import styles from './HoverPreview.module.css';

/**
 * Wraps a server-rendered list and floats a preview next to the pointer.
 * Rows opt in with `data-preview={index}`; `previews[index]` is shown for the
 * hovered row. Desktop (fine pointer) only — the list works without it.
 */
export function HoverPreview({
  children,
  previews,
  className,
  floatClassName,
}: {
  children: ReactNode;
  previews: ReactNode[];
  className?: string;
  floatClassName?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const float = floatRef.current;
    if (!root || !float || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const smooth = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let clientX = 0;
    let clientY = 0;
    let inside = false;
    let frame = 0;

    const place = () => {
      float.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const render = () => {
      x += (targetX - x) * 0.14;
      y += (targetY - y) * 0.14;
      place();
      frame = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.1 ? requestAnimationFrame(render) : 0;
    };
    const aim = (jump: boolean) => {
      const rect = root.getBoundingClientRect();
      // Keep the preview inside the list: it sits right of the pointer until it would overflow.
      targetX = Math.min(clientX - rect.left, rect.width - float.offsetWidth - 48);
      targetY = clientY - rect.top;
      if (jump || !smooth) {
        x = targetX;
        y = targetY;
        place();
      } else if (!frame) {
        frame = requestAnimationFrame(render);
      }
    };

    const onMove = (event: PointerEvent) => {
      clientX = event.clientX;
      clientY = event.clientY;
      aim(!inside);
      inside = true;
    };
    const onOver = (event: PointerEvent) => {
      const row = (event.target as Element).closest<HTMLElement>('[data-preview]');
      setActive(row ? Number(row.dataset.preview) : null);
    };
    const onLeave = () => {
      inside = false;
      setActive(null);
    };
    const onScroll = () => {
      if (inside) aim(false);
    };

    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerover', onOver);
    root.addEventListener('pointerleave', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerover', onOver);
      root.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div ref={rootRef} className={cx(styles.root, className)} data-active={active !== null}>
      {children}
      <div ref={floatRef} className={cx(styles.float, floatClassName)} aria-hidden="true">
        {previews.map((preview, index) => (
          <div key={index} className={styles.item} data-current={index === active}>
            {preview}
          </div>
        ))}
      </div>
    </div>
  );
}
