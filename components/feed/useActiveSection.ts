'use client';

import { useEffect, useState } from 'react';
import { sections, type SectionId } from './content';

/** Tracks which top-level section sits in the middle of the viewport. */
export function useActiveSection(): SectionId | 'top' {
  const [active, setActive] = useState<SectionId | 'top'>('top');

  useEffect(() => {
    const elements = sections
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    elements.forEach((element) => observer.observe(element));
    const atTop = () => { if (window.scrollY < 40) setActive('top'); };
    window.addEventListener('scroll', atTop, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', atTop);
    };
  }, []);

  return active;
}
