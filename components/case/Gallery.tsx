'use client';

import Image from 'next/image';
import { useEffect, useEffectEvent, useRef, useState, type CSSProperties, type TouchEvent } from 'react';

import { BrowserFrame, PhoneFrame } from '@/components/projects/Frames';
import { Arrow } from '@/components/ui/Arrow';
import type { FeaturedProject, Shot } from '@/data/projects';
import { cx } from '@/lib/cx';
import { lockScroll } from '@/lib/scroll';

import styles from './Gallery.module.css';

type Item = { shot: Shot; kind: 'desktop' | 'mobile' };

const pad = (value: number) => String(value).padStart(2, '0');

/** Hovering a framed full-page capture scrolls it inside its frame (see Frames.module.css). */
const hover = {
  onPointerEnter: (event: { currentTarget: HTMLElement }) => {
    event.currentTarget.dataset.hover = 'true';
  },
  onPointerLeave: (event: { currentTarget: HTMLElement }) => {
    event.currentTarget.dataset.hover = 'false';
  },
};

function Lightbox({ items, index, onIndex, onClose }: { items: Item[]; index: number; onIndex: (next: number) => void; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchRef = useRef<{ x: number; y: number } | null>(null);
  const item = items[index];
  const go = (step: number) => onIndex((index + step + items.length) % items.length);

  const onKey = useEffectEvent((event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') go(1);
    if (event.key === 'ArrowLeft') go(-1);
  });
  const onCancel = useEffectEvent((event: Event) => {
    event.preventDefault();
    onClose();
  });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    const release = lockScroll();
    const frame = requestAnimationFrame(() => {
      dialog.dataset.state = 'open';
    });
    dialog.addEventListener('cancel', onCancel);
    window.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(frame);
      dialog.removeEventListener('cancel', onCancel);
      window.removeEventListener('keydown', onKey);
      if (dialog.open) dialog.close();
      release();
    };
  }, []);

  // A horizontal swipe moves between screens; vertical movement scrolls the capture.
  const onTouchStart = (event: TouchEvent) => {
    const touch = event.touches[0];
    touchRef.current = { x: touch.clientX, y: touch.clientY };
  };
  const onTouchEnd = (event: TouchEvent) => {
    const start = touchRef.current;
    const touch = event.changedTouches[0];
    touchRef.current = null;
    if (!start) return;
    const dx = touch.clientX - start.x;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(touch.clientY - start.y) * 1.5) go(dx < 0 ? 1 : -1);
  };

  return (
    <dialog ref={dialogRef} className={styles.lightbox} aria-label={item.shot.alt} data-theme="dark" data-lenis-prevent>
      <div className={styles.bar}>
        <p className="label" aria-live="polite">
          {pad(index + 1)} / {pad(items.length)}
        </p>
        <p className={`label ${styles.caption}`}>{item.shot.alt}</p>
        <button type="button" className={`label ${styles.close}`} onClick={onClose} data-cursor="stick">
          Close
          <span className={styles.cross} aria-hidden="true" />
        </button>
      </div>

      <div key={index} className={styles.stage} data-kind={item.kind} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <Image
          src={item.shot.src}
          alt={item.shot.alt}
          sizes={item.kind === 'desktop' ? '(min-width: 1280px) 1200px, 100vw' : '(min-width: 768px) 416px, 90vw'}
          placeholder="blur"
          className={styles.image}
        />
      </div>

      {items.length > 1 ? (
        <div className={styles.nav}>
          <button type="button" className={styles.step} onClick={() => go(-1)} aria-label="Previous screen" data-cursor="stick">
            <Arrow direction="left" />
          </button>
          <button type="button" className={styles.step} onClick={() => go(1)} aria-label="Next screen" data-cursor="stick">
            <Arrow direction="right" />
          </button>
        </div>
      ) : null}
    </dialog>
  );
}

/**
 * Every screen of a project, framed. Each opens full size in a lightbox —
 * full-page captures can be scrolled top to bottom — with arrow keys, swipe
 * and Escape.
 */
export function Gallery({ project }: { project: FeaturedProject }) {
  const { shots, domain, tone } = project;
  const desktops: Item[] = [shots.desktop, shots.desktopAlt].flatMap((shot) => (shot ? [{ shot, kind: 'desktop' as const }] : []));
  const mobiles: Item[] = [shots.mobile, shots.mobileAlt].flatMap((shot) => (shot ? [{ shot, kind: 'mobile' as const }] : []));
  const items = [...desktops, ...mobiles];
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className={styles.gallery}>
      <div className={styles.desktops}>
        {desktops.map((item, index) => (
          <button
            key={item.shot.alt}
            type="button"
            className={cx(styles.shot, 'press')}
            onClick={() => setOpen(index)}
            data-cursor="view"
            data-cursor-label="Expand"
            data-hover="false"
            data-reveal
            {...hover}
          >
            <BrowserFrame
              shot={item.shot}
              domain={domain}
              theme={tone.theme}
              sizes="(min-width: 1440px) 1300px, 100vw"
              scrollable={Boolean(project.scrollable) && item.shot === shots.desktop}
            />
            <span className="sr-only">Open full size: {item.shot.alt}</span>
          </button>
        ))}
      </div>

      <div className={styles.mobiles} data-theme={tone.theme} style={{ '--tone': tone.background } as CSSProperties}>
        {mobiles.map((item, index) => (
          <button
            key={item.shot.alt}
            type="button"
            className={cx(styles.shot, styles.phone, 'press')}
            onClick={() => setOpen(desktops.length + index)}
            data-cursor="view"
            data-cursor-label="Expand"
            data-reveal
            style={{ '--delay': index * 120 } as CSSProperties}
          >
            <PhoneFrame shot={item.shot} sizes="(min-width: 1024px) 18rem, 42vw" />
            <span className="sr-only">Open full size: {item.shot.alt}</span>
          </button>
        ))}
      </div>

      {open !== null ? <Lightbox items={items} index={open} onIndex={setOpen} onClose={() => setOpen(null)} /> : null}
    </div>
  );
}
