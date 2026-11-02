'use client';

import { BriefcaseBusiness, House, Send, Smile, AtSign } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { useActiveSection } from './useActiveSection';

const tabs = [
  { id: 'top', label: 'Home', href: '#top', icon: House },
  { id: 'about', label: 'About', href: '#about', icon: Smile },
  { id: 'work', label: 'Work', href: '#work', icon: BriefcaseBusiness },
  { id: 'contact', label: 'Contact', href: '#contact', icon: AtSign },
] as const;

/** Instagram-style top bar and floating tab bar for the mobile feed. */
export default function MobileBars() {
  const active = useActiveSection();

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-black/10 bg-[color-mix(in_srgb,var(--background)_88%,transparent)] pt-[env(safe-area-inset-top)] backdrop-blur-xl dark:border-white/10 lg:hidden">
        <div className="flex h-14 items-center justify-between pl-[max(1rem,env(safe-area-inset-left))] pr-[max(0.5rem,env(safe-area-inset-right))]">
          <a href="#top" className="text-2xl font-extrabold tracking-[-0.07em]">mohan<span className="opacity-35">.</span></a>
          <div className="flex items-center">
            <ThemeToggle className="size-11 text-current!" />
            <button type="button" aria-label="Send Mohan a message" onClick={() => window.dispatchEvent(new Event('open-contact'))} className="flex size-11 items-center justify-center rounded-full">
              <Send aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <nav aria-label="Sections" className="fixed inset-x-0 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 flex justify-center px-4 lg:hidden">
        <ul className="flex w-full max-w-sm items-center justify-between rounded-full border border-black/10 bg-[color-mix(in_srgb,var(--background)_88%,transparent)] p-1.5 shadow-[0_10px_34px_rgb(0_0_0/12%)] backdrop-blur-xl dark:border-white/10">
          {tabs.map(({ id, label, href, icon: Icon }) => {
            const current = active === id;
            return (
              <li key={id} className="flex-1">
                <a href={href} aria-current={current ? 'true' : undefined} className={`flex h-11 items-center justify-center gap-1.5 rounded-full text-xs font-medium transition-colors ${current ? 'bg-[#111111] text-[#faf7f3] dark:bg-[#f4f4f6] dark:text-[#111111]' : 'text-black/60 dark:text-white/60'}`}>
                  <Icon aria-hidden="true" className="size-[1.15rem]" />
                  <span className={current ? '' : 'sr-only'}>{label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
