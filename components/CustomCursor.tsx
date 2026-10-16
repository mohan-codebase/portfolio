'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function CustomCursor() {
  const pathname = usePathname();
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    const dot = cursor.querySelector<HTMLElement>('.cursor-dot')!;
    const ring = cursor.querySelector<HTMLElement>('.cursor-ring')!;
    const label = cursor.querySelector<HTMLElement>('.cursor-label')!;
    const preference = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let frame = 0;
    let refreshFrame = 0;
    let hasPointer = false;
    let x = 0;
    let y = 0;
    let ringX = 0;
    let ringY = 0;
    let visible = false;
    let aimX = 0;
    let aimY = 0;
    let mode = 'default';
    let lastTime = 0;

    const hide = () => {
      visible = false;
      hasPointer = false;
      cancelAnimationFrame(refreshFrame);
      refreshFrame = 0;
      cursor.dataset.pressed = 'false';
      lastTime = 0;
      cursor.dataset.visible = 'false';
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const animate = (time: number) => {
      const dt = lastTime ? Math.min(time - lastTime, 64) : 16;
      lastTime = time;
      const ease = 1 - Math.exp(-dt / 65);
      ringX += (aimX - ringX) * ease;
      ringY += (aimY - ringY) * ease;
      const dx = aimX - ringX;
      const dy = aimY - ringY;
      const stretch = mode === 'default' ? Math.min(Math.hypot(dx, dy) / 140, 0.45) : 0;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      ring.style.setProperty('--cursor-angle', `${Math.atan2(dy, dx)}rad`);
      ring.style.setProperty('--cursor-stretch', String(1 + stretch));
      ring.style.setProperty('--cursor-squash', String(1 - stretch * 0.5));
      if (Math.abs(dx) + Math.abs(dy) > 0.1) {
        frame = requestAnimationFrame(animate);
      } else {
        frame = 0;
        lastTime = 0;
      }
    };
    const updateTarget = () => {
      const target = document.elementFromPoint(x, y);
      // Native controls retain accurate selection, resizing, and disabled feedback.
      if (!target || target.closest('input, textarea, select, iframe, [contenteditable]:not([contenteditable="false"]), [disabled], [aria-disabled="true"]')) {
        hide();
        return;
      }
      const link = target?.closest<HTMLElement>('a, button, [role="button"], summary');
      const preview = link?.matches('.portfolio-card, [data-cursor="view"]') || Boolean(link?.querySelector('img'));
      mode = preview ? 'view' : link ? 'link' : 'default';
      aimX = x;
      aimY = y;
      if (mode === 'link' && link) {
        const box = link.getBoundingClientRect();
        if (box.width < 320 && box.height < 100) {
          aimX += (box.left + box.width / 2 - x) * 0.25;
          aimY += (box.top + box.height / 2 - y) * 0.25;
        }
      }
      cursor.dataset.mode = mode;
      label.textContent = mode === 'view' ? 'View ↗' : '';
      if (!visible) {
        ringX = x;
        ringY = y;
      }
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      visible = true;
      cursor.dataset.visible = 'true';

      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (!frame) frame = requestAnimationFrame(animate);
    };
    const move = (event: PointerEvent) => {
      if (!preference.matches || event.pointerType !== 'mouse') return hide();
      x = event.clientX;
      y = event.clientY;
      hasPointer = true;
      updateTarget();
    };
    const refreshTarget = () => {
      if (!hasPointer || !preference.matches || refreshFrame) return;
      refreshFrame = requestAnimationFrame(() => {
        refreshFrame = 0;
        updateTarget();
      });
    };
    const down = () => { cursor.dataset.pressed = 'true'; };
    const up = () => { cursor.dataset.pressed = 'false'; };
    const keyboard = (event: KeyboardEvent) => { if (event.key === 'Tab') hide(); };
    const visibility = () => { if (document.hidden) hide(); };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', hide);
    window.addEventListener('keydown', keyboard);
    window.addEventListener('blur', hide);
    document.addEventListener('scroll', refreshTarget, { passive: true, capture: true });
    window.addEventListener('resize', refreshTarget);
    document.documentElement.addEventListener('pointerleave', hide);
    document.addEventListener('visibilitychange', visibility);
    preference.addEventListener('change', hide);
    return () => {
      hide();
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', hide);
      window.removeEventListener('keydown', keyboard);
      window.removeEventListener('blur', hide);
      document.removeEventListener('scroll', refreshTarget, true);
      window.removeEventListener('resize', refreshTarget);
      document.documentElement.removeEventListener('pointerleave', hide);
      document.removeEventListener('visibilitychange', visibility);
      preference.removeEventListener('change', hide);
    };
  }, [pathname]);

  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
      <span className="cursor-dot" />
      <span className="cursor-ring"><span className="cursor-label" /></span>
    </div>
  );
}
