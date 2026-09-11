'use client';

import { useEffect, useRef } from 'react';

import styles from './Cursor.module.css';

type CursorState = 'default' | 'link' | 'view' | 'hide';

const INTERACTIVE = '[data-cursor], a, button, summary, label, [role="button"]';

/**
 * A small dot that grows over interactive elements and becomes a labelled
 * disc over project media (`data-cursor="view"`). Only mounts its behaviour
 * for fine pointers without a reduced-motion preference; touch devices keep
 * the native cursor.
 */
export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const label = labelRef.current;
    if (!cursor || !label) return;

    const query = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    if (!query.matches) return;

    const root = document.documentElement;
    root.classList.add('has-cursor');

    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let frame = 0;

    const render = () => {
      x += (targetX - x) * 0.3;
      y += (targetY - y) * 0.3;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.1 ? requestAnimationFrame(render) : 0;
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      targetX = event.clientX;
      targetY = event.clientY;
      if (cursor.dataset.visible !== 'true') {
        x = targetX;
        y = targetY;
        cursor.dataset.visible = 'true';
      }
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onOver = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>(INTERACTIVE);
      const state = (target?.dataset.cursor as CursorState | undefined) ?? (target ? 'link' : 'default');
      cursor.dataset.state = state;
      label.textContent = state === 'view' ? (target?.dataset.cursorLabel ?? 'View') : '';
    };

    const onOut = (event: MouseEvent) => {
      if (!event.relatedTarget) cursor.dataset.visible = 'false';
    };
    const onDown = () => cursor.setAttribute('data-pressed', '');
    const onUp = () => cursor.removeAttribute('data-pressed');

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    document.addEventListener('mouseout', onOut);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);

    return () => {
      cancelAnimationFrame(frame);
      root.classList.remove('has-cursor');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('mouseout', onOut);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  return (
    <div ref={cursorRef} className={styles.cursor} data-state="default" data-visible="false" aria-hidden="true">
      <span className={styles.disc} />
      <span ref={labelRef} className={styles.label} />
    </div>
  );
}
