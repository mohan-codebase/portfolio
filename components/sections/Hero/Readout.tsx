'use client';

import { useEffect, useRef } from 'react';

const pad = (value: number) => String(Math.max(0, Math.round(value))).padStart(4, '0');

/**
 * Live viewport and cursor coordinates — the site quietly measuring itself.
 * Writes straight to the DOM, so pointer movement never re-renders React.
 */
export function Readout({ className }: { className?: string }) {
  const viewportRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    let x = 0;
    let y = 0;

    const onResize = () => {
      if (viewportRef.current) viewportRef.current.textContent = `${window.innerWidth} × ${window.innerHeight}`;
    };
    const paint = () => {
      frame = 0;
      if (cursorRef.current) cursorRef.current.textContent = `${pad(x)}, ${pad(y)}`;
    };
    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    onResize();
    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <dl className={className} aria-hidden="true">
      <div>
        <dt>Viewport</dt>
        <dd ref={viewportRef}>—</dd>
      </div>
      <div>
        <dt>Cursor</dt>
        <dd ref={cursorRef}>0000, 0000</dd>
      </div>
    </dl>
  );
}
