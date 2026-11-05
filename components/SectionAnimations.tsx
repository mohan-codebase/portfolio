'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/** Route-scoped entrances; existing letter and carousel animations keep their own transforms. */
export default function SectionAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    const media = gsap.matchMedia();
    const frame = requestAnimationFrame(() => {
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const sections = document.querySelectorAll<HTMLElement>('main section:not(#hero-section)');
        const targets = new Set<HTMLElement>();
        sections.forEach((section) => {
          Array.from(section.children).forEach((child) => {
            if (!(child instanceof HTMLElement) || child.hasAttribute('data-reveal-managed')) return;
            if (getComputedStyle(child).display === 'grid') {
              Array.from(child.children).forEach((item) => {
                if (item instanceof HTMLElement) targets.add(item);
              });
            } else targets.add(child);
          });
        });
        document.querySelectorAll<HTMLElement>('main > div > :not(section)').forEach((element) => targets.add(element));

        const reveals = new Map<HTMLElement, gsap.core.Timeline>();
        Array.from(targets).forEach((element) => {
          if (element.getBoundingClientRect().top < window.innerHeight * 0.75) return;
          // Animate each content block as a unit so headings and their copy stay together.
          const timeline = gsap.timeline({ paused: true });
          timeline.fromTo(element,
            { y: 28, opacity: 0.2 },
            { y: 0, opacity: 1, duration: 1, ease: 'none' },
          );
          ScrollTrigger.create({
            trigger: element,
            animation: timeline,
            start: 'clamp(top 98%)',
            end: 'clamp(top 75%)',
            scrub: 0.2,
            invalidateOnRefresh: true,
          });
          reveals.set(element, timeline);
        });
        // Keyboard navigation must never land on visually hidden content.
        const onFocus = (event: FocusEvent) => {
          if (!(event.target instanceof Node)) return;
          for (const [element, tween] of reveals) {
            if (element.contains(event.target)) tween.progress(1);
          }
        };
        document.addEventListener('focusin', onFocus);
        ScrollTrigger.refresh();
        return () => document.removeEventListener('focusin', onFocus);
      });
    });
    return () => {
      cancelAnimationFrame(frame);
      media.revert();
    };
  }, [pathname]);

  return null;
}
