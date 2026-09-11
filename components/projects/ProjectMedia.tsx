'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

/**
 * The artboard link. On fine pointers it exposes an eased pointer offset
 * (`--mx` / `--my`, -0.5…0.5) that the frames use for depth, and a
 * `data-hover` flag that starts the in-frame scroll preview.
 */
export function ProjectMedia({
  href,
  label,
  className,
  style,
  children,
}: {
  href: string;
  label: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const media = ref.current;
    if (!media || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const smooth = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let frame = 0;

    const render = () => {
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      media.style.setProperty('--mx', x.toFixed(4));
      media.style.setProperty('--my', y.toFixed(4));
      frame = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.0005 ? requestAnimationFrame(render) : 0;
    };
    const aim = (nextX: number, nextY: number) => {
      targetX = nextX;
      targetY = nextY;
      if (smooth && !frame) frame = requestAnimationFrame(render);
    };

    const onMove = (event: PointerEvent) => {
      const rect = media.getBoundingClientRect();
      aim((event.clientX - rect.left) / rect.width - 0.5, (event.clientY - rect.top) / rect.height - 0.5);
    };
    const onEnter = () => {
      media.dataset.hover = 'true';
    };
    const onLeave = () => {
      media.dataset.hover = 'false';
      aim(0, 0);
    };

    media.addEventListener('pointermove', onMove);
    media.addEventListener('pointerenter', onEnter);
    media.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      media.removeEventListener('pointermove', onMove);
      media.removeEventListener('pointerenter', onEnter);
      media.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
      data-cursor="view"
      data-hover="false"
    >
      {children}
      <span className="sr-only">{label} (opens in a new tab)</span>
    </a>
  );
}
