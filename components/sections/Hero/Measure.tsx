'use client';

import { useEffect, useRef } from 'react';

/**
 * A redline dimension annotation that prints the real rendered width of its
 * parent element, updating as the viewport changes.
 */
export function Measure({ className }: { className?: string }) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const target = rootRef.current?.parentElement;
    if (!target) return;
    const observer = new ResizeObserver(() => {
      if (valueRef.current) valueRef.current.textContent = String(target.offsetWidth);
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={rootRef} className={className} aria-hidden="true">
      <span>
        <span ref={valueRef}>—</span> px
      </span>
    </span>
  );
}
