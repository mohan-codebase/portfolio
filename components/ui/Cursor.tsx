'use client';

import { useEffect, useRef } from 'react';

import { CURTAIN_OPEN } from '@/lib/stage';
import { approach, onFrame } from '@/lib/ticker';

import styles from './Cursor.module.css';

type CursorState = 'default' | 'link' | 'stick' | 'text' | 'view' | 'drag' | 'hide';

const INTERACTIVE = '[data-cursor], a, button, summary, label, select, [role="button"], input, textarea';
const TEXT_FIELD =
  'textarea, input:not([type="button"], [type="submit"], [type="reset"], [type="checkbox"], [type="radio"], [type="range"], [type="color"], [type="file"])';

/**
 * A two-part cursor for fine pointers: a precise dot and a trailing ring that
 * stretches along its path. The ring fills over links, wraps around elements
 * marked `data-cursor="stick"`, turns into a caret over text fields and into
 * a labelled disc over media (`data-cursor="view"` or `"drag"`, with
 * `data-cursor-label`). Touch devices and reduced motion keep the native cursor.
 */
export function Cursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const ring = ringRef.current;
    const shape = shapeRef.current;
    const label = labelRef.current;
    const pin = pinRef.current;
    if (!root || !ring || !shape || !label || !pin) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;

    const html = document.documentElement;
    html.classList.add('has-cursor');

    const pointer = { x: 0, y: 0 };
    const dot = { x: 0, y: 0 };
    const trail = { x: 0, y: 0 };
    let visible = false;
    let state: CursorState = 'default';
    let under: Element | null = null;
    let stuck: HTMLElement | null = null;
    let stretch = 0;
    let angle = 0;
    let press = 1;
    let pressed = false;
    let recheck = false;

    const unstick = () => {
      stuck = null;
      root.style.removeProperty('--w');
      root.style.removeProperty('--h');
      root.style.removeProperty('--r');
    };

    const read = (element: Element | null) => {
      under = element;
      const target = element?.closest<HTMLElement>(INTERACTIVE) ?? null;
      const next: CursorState = target
        ? ((target.dataset.cursor as CursorState | undefined) ?? (target.matches(TEXT_FIELD) ? 'text' : 'link'))
        : 'default';

      if (next === 'stick' && target) {
        if (stuck !== target) {
          stuck = target;
          const rect = target.getBoundingClientRect();
          const radius = getComputedStyle(target).borderTopLeftRadius;
          root.style.setProperty('--w', `${rect.width + 14}px`);
          root.style.setProperty('--h', `${rect.height + 14}px`);
          root.style.setProperty('--r', radius.endsWith('%') ? radius : `calc(${radius} + 7px)`);
        }
      } else if (stuck) {
        unstick();
      }

      if (next !== state) {
        state = next;
        root.dataset.state = next;
      }
      const text = next === 'view' ? (target?.dataset.cursorLabel ?? 'View') : next === 'drag' ? (target?.dataset.cursorLabel ?? 'Drag') : '';
      if (label.textContent !== text) label.textContent = text;
    };

    const stopFrames = onFrame((_, delta) => {
      if (!visible) return;
      // Content moved under a still pointer (scroll, page change): re-read what is there.
      if (recheck) {
        recheck = false;
        const element = document.elementFromPoint(pointer.x, pointer.y);
        if (element !== under) read(element);
      }

      let aimX = pointer.x;
      let aimY = pointer.y;
      if (stuck) {
        // Wrapped around an element: stay on it, drifting a little towards the pointer.
        const rect = stuck.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        aimX = centerX + (pointer.x - centerX) * 0.15;
        aimY = centerY + (pointer.y - centerY) * 0.15;
      }

      const lastX = trail.x;
      const lastY = trail.y;
      dot.x = approach(dot.x, pointer.x, 0.6, delta);
      dot.y = approach(dot.y, pointer.y, 0.6, delta);
      trail.x = approach(trail.x, aimX, stuck ? 0.26 : 0.17, delta);
      trail.y = approach(trail.y, aimY, stuck ? 0.26 : 0.17, delta);

      // Squash and stretch along the direction of travel — only while the ring is a free circle.
      const free = !stuck && state !== 'text';
      const velocityX = ((trail.x - lastX) / delta) * (1000 / 60);
      const velocityY = ((trail.y - lastY) / delta) * (1000 / 60);
      const speed = Math.hypot(velocityX, velocityY);
      stretch = approach(stretch, free ? Math.min(speed / 55, 0.5) : 0, 0.3, delta);
      if (!free) angle = 0;
      else if (speed > 0.5) angle = Math.atan2(velocityY, velocityX);
      press = approach(press, pressed ? 0.82 : 1, 0.3, delta);

      pin.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0)`;
      ring.style.transform = `translate3d(${trail.x}px, ${trail.y}px, 0)`;
      shape.style.transform = `rotate(${angle}rad) scale(${(1 + stretch) * press}, ${(1 - stretch * 0.45) * press})`;
    });

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      if (!visible) {
        visible = true;
        dot.x = trail.x = pointer.x;
        dot.y = trail.y = pointer.y;
        root.dataset.visible = 'true';
      }
    };
    const onOver = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') read(event.target as Element);
    };
    const onOut = (event: MouseEvent) => {
      if (event.relatedTarget) return;
      visible = false;
      root.dataset.visible = 'false';
    };
    const onDown = () => {
      pressed = true;
    };
    const onUp = () => {
      pressed = false;
    };
    const onChange = () => {
      recheck = true;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    document.addEventListener('mouseout', onOut);
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    window.addEventListener('scroll', onChange, { passive: true });
    window.addEventListener(CURTAIN_OPEN, onChange);

    return () => {
      stopFrames();
      unstick();
      html.classList.remove('has-cursor');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('mouseout', onOut);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('scroll', onChange);
      window.removeEventListener(CURTAIN_OPEN, onChange);
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.cursor} data-state="default" data-visible="false" aria-hidden="true">
      <div ref={ringRef} className={styles.ring}>
        <span ref={shapeRef} className={styles.shape} />
        <span ref={labelRef} className={styles.label} />
      </div>
      <div ref={pinRef} className={styles.pin}>
        <span className={styles.dot} />
      </div>
    </div>
  );
}
