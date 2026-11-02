'use client';

import { ArrowUpRight, MapPin } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import RollingText from '@/components/RollingText';
import Avatar from './Avatar';
import { sections, socials } from './content';
import { useActiveSection } from './useActiveSection';

/** Sticky profile column for large screens. */
export default function DesktopSidebar() {
  const active = useActiveSection();
  return (
    <aside className="sticky top-0 hidden h-svh flex-col justify-between overflow-y-auto border-r border-black/10 py-10 pl-10 pr-8 dark:border-white/10 lg:flex xl:pl-12">
      <div>
        <a href="#top" aria-label="Back to top" className="inline-block"><Avatar size="md" ring /></a>
        <h1 className="mt-7 text-[clamp(3rem,4.6vw,4.5rem)] font-black uppercase leading-[0.8] tracking-[-0.085em]">
          Mohan<span className="opacity-35">.</span>
        </h1>
        <p className="mt-5 text-lg font-medium leading-snug tracking-tight">
          UI designer at heart.<br />
          <span className="text-black/55 dark:text-white/55">Full-stack developer by craft.</span>
        </p>
        <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-black/55 dark:text-white/55">
          <MapPin aria-hidden="true" className="size-3.5" /> Chennai, India
        </p>


        <nav aria-label="Sections" className="mt-10 border-t border-black/10 pt-8 dark:border-white/10">
          <ul className="space-y-1">
            {sections.map((section) => {
              const current = active === section.id;
              return (
                <li key={section.id}>
                  <a href={`#${section.id}`} aria-current={current ? 'true' : undefined} className={`group flex items-center gap-4 py-2 text-sm font-medium transition-colors ${current ? '' : 'text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white'}`}>
                    <span className={`h-px bg-current transition-all duration-300 ${current ? 'w-14' : 'w-6 group-hover:w-10'}`} />
                    <RollingText text={section.label} />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="mt-10">
        <button type="button" onClick={() => window.dispatchEvent(new Event('open-contact'))} className="group inline-flex items-center gap-5 rounded-full bg-[#111111] py-2.5 pl-5 pr-2.5 text-sm font-medium text-[#faf7f3] transition-colors hover:bg-black/80 dark:bg-[#f4f4f6] dark:text-[#111111] dark:hover:bg-white">
          <RollingText text="Let’s talk" />
          <span className="flex size-8 items-center justify-center rounded-full bg-white/15 dark:bg-black/10">
            <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </button>
        <div className="mt-6 flex items-center justify-between gap-4">
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noopener noreferrer" className="text-black/60 underline-offset-4 hover:text-black hover:underline dark:text-white/60 dark:hover:text-white">{social.label}</a>
              </li>
            ))}
          </ul>
          <ThemeToggle className="size-11 shrink-0 text-current!" />
        </div>
      </div>
    </aside>
  );
}
