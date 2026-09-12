'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';

export const OPEN_PALETTE = 'palette:open';

const Palette = dynamic(() => import('./Palette').then((module) => module.Palette), { ssr: false });

/**
 * ⌘K / Ctrl+K quick navigation. Only this listener ships with the page; the
 * palette itself is loaded the first time it opens.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && !event.altKey && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener(OPEN_PALETTE, onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(OPEN_PALETTE, onOpen);
    };
  }, []);

  return open ? <Palette onClose={close} /> : null;
}
