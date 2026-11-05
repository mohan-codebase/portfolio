'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useLetterWave } from '@/hooks/useLetterWave';

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLetterWave(titleRef);

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;
    const media = gsap.matchMedia();
    media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const cleanups = Array.from(title.querySelectorAll<HTMLElement>('[data-hero-letter]')).map((hitArea) => {
        const letter = hitArea.firstElementChild as HTMLElement;
        const enter = () => gsap.to(letter, { y: -18, scale: 1.04, opacity: 1, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
        const leave = () => gsap.to(letter, { y: 0, scale: 1, opacity: hitArea.dataset.dot === 'true' ? 0.35 : 1, duration: 0.65, ease: 'power3.out', overwrite: 'auto' });
        hitArea.addEventListener('pointerenter', enter);
        hitArea.addEventListener('pointerleave', leave);
        return () => {
          hitArea.removeEventListener('pointerenter', enter);
          hitArea.removeEventListener('pointerleave', leave);
          gsap.killTweensOf(letter);
          gsap.set(letter, { clearProps: 'transform,opacity' });
        };
      });
      return () => cleanups.forEach((cleanup) => cleanup());
    }, title);
    return () => media.revert();
  }, []);

  return (
    <section
      id="hero-section"
      aria-labelledby="hero-title"
      className="hero-name-panel relative flex min-h-svh w-full flex-col justify-center overflow-hidden rounded-b-[2.5rem] px-5 py-32 sm:rounded-b-[3.5rem] sm:px-8"
    >
      <div aria-hidden="true" className="hero-name-grid" />
      <div className="hero-reveal relative mx-auto w-full max-w-[1320px]">
        <p className="relative mb-5 text-sm text-black/55 dark:text-white/55 sm:text-base">Hello, I’m</p>
        <h1
          ref={titleRef}
          id="hero-title"
          aria-label="Mohan"
          className="relative -ml-[0.055em] text-[clamp(4rem,18vw,16rem)] font-black uppercase leading-[0.78] tracking-[-0.085em]"
        >
          {'MOHAN.'.split('').map((letter, index) => (
            <span key={index} aria-hidden="true" data-hero-letter data-dot={letter === '.'} className="inline-block">
              <span className={`pointer-events-none inline-block origin-bottom ${letter === '.' ? 'hero-name-dot' : ''}`}><span data-letter-wave className="inline-block">{letter}</span></span>
            </span>
          ))}
        </h1>
        <p className="relative mt-8 max-w-3xl text-xl font-medium leading-relaxed tracking-tight sm:mt-10 sm:text-3xl">
          UI designer at heart.<br className="sm:hidden" />{' '}
          <span className="text-black/55 dark:text-white/55">Full-stack developer by craft.</span>
        </p>

      </div>

    </section>
  );
}
