'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useLetterWave } from '@/hooks/useLetterWave';
import { ArrowUpRight } from 'lucide-react';
import RollingText from './RollingText';

export default function Footer() {
  const signatureRef = useRef<HTMLDivElement>(null);

  useLetterWave(signatureRef);

  useEffect(() => {
    const signature = signatureRef.current;
    if (!signature) return;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(signature.querySelectorAll('[data-signature-letter]'),
        { yPercent: 110, opacity: 0, rotate: 4 },
        {
          yPercent: 0, opacity: 1, rotate: 0,
          duration: 1.2, stagger: 0.09, ease: 'power3.out',
          scrollTrigger: { trigger: signature, start: 'top 90%', once: true },
          clearProps: 'transform,opacity',
        });
    }, signature);
    media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const letters = Array.from(signature.querySelectorAll<HTMLElement>('[data-signature-hover]'));
      const listeners = letters.map((letter) => {
        const enter = () => gsap.to(letter, { y: -18, color: 'rgba(250,247,243,0.95)', duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
        const leave = () => gsap.to(letter, { y: 0, color: letter.textContent === '.' ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.15)', duration: 0.65, ease: 'power3.out', overwrite: 'auto' });
        letter.addEventListener('pointerenter', enter);
        letter.addEventListener('pointerleave', leave);
        return { letter, enter, leave };
      });
      return () => {
        listeners.forEach(({ letter, enter, leave }) => {
          letter.removeEventListener('pointerenter', enter);
          letter.removeEventListener('pointerleave', leave);
          gsap.killTweensOf(letter);
          gsap.set(letter, { clearProps: 'transform,color' });
        });
      };
    }, signature);
    return () => media.revert();
  }, []);

  return (
    <footer className="relative mt-16 overflow-hidden rounded-t-[2.5rem] bg-[#111111] px-5 pb-16 pt-14 text-[#faf7f3] dark:border-t dark:border-white/10 dark:bg-[#141416] sm:rounded-t-[3.5rem] sm:px-8 sm:pt-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/15 pb-12 sm:pb-16 lg:flex-row lg:items-end">
          <h2 className="text-[clamp(2.8rem,6.5vw,6.5rem)] font-semibold leading-[1.02] tracking-[-0.06em]">Your next idea.<br /><span className="text-white/45">Let’s make it real.</span></h2>
          <button type="button" onClick={() => window.dispatchEvent(new Event('open-contact'))} className="group inline-flex shrink-0 items-center gap-8 rounded-full bg-[#faf7f3] py-3 pl-6 pr-3 text-sm font-medium text-[#111111] transition-colors hover:bg-white">
            <RollingText text="Start a conversation" />
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5"><ArrowUpRight aria-hidden="true" className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none" /></span>
          </button>
        </div>
        <div className="grid gap-10 py-10 sm:grid-cols-2 sm:py-14 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.14em] text-white/50">Say hello directly</p>
            <a href="mailto:mohanavenkatesh.work@gmail.com" className="inline-flex max-w-full items-center gap-2 text-base font-medium underline decoration-white/25 underline-offset-8 hover:decoration-white sm:text-lg"><span className="break-all">mohanavenkatesh.work@gmail.com</span><ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" /></a>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/55">UI designer at heart.<br />Full-stack developer by craft.</p>
          </div>
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.14em] text-white/50">Behind the work</p>
            <a href="https://github.com/mohan-codebase" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 rounded-3xl border border-white/15 p-5 transition-colors hover:bg-white/5">
              <span><span className="block text-base font-medium">GitHub</span><span className="mt-1 block text-xs text-white/55">Projects, experiments & source code</span></span><ArrowUpRight aria-hidden="true" className="h-5 w-5 shrink-0" />
            </a>
          </div>
        </div>
        <div ref={signatureRef} aria-hidden="true" className="select-none overflow-hidden border-t border-white/10 py-8 text-center sm:py-12">
          <span className="block text-[clamp(4rem,22vw,20rem)] font-extrabold leading-[0.8] tracking-[-0.075em] text-white/15">
            {'MOHAN.'.split('').map((letter, index) => (
              <span key={index} data-signature-letter className={`inline-block origin-bottom ${letter === '.' ? 'text-white/35' : ''}`}><span data-signature-hover className="inline-block"><span data-letter-wave className="inline-block">{letter}</span></span></span>
            ))}
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5 text-[11px] text-white/50 sm:text-xs">
          <p>© {new Date().getFullYear()} Mohan. All rights reserved.</p>
          <p>Designed and developed by Mohan.</p>
        </div>
      </div>
    </footer>
  );
}
