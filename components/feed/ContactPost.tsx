'use client';

import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Mail, MessageCircle } from 'lucide-react';
import { PostCard, PostHeader, PostSlot } from './Post';
import { contactEmail, socials } from './content';

/** Mobile-only closing post with the quickest ways to get in touch. */
export default function ContactPost() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {}
  }

  return (
    <PostSlot className="lg:hidden">
      <PostCard>
        <PostHeader subtitle="Say hello" />
        <div className="bg-[#111111] px-6 pb-8 pt-10 text-[#faf7f3] dark:bg-[#161619]">
          <h2 className="text-[clamp(2.5rem,12vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.06em]">
            Good things start with <span className="text-white/45">a hello.</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/70">Have an idea? Let’s talk.</p>
          <div className="mt-7 grid gap-2">
            <button type="button" onClick={() => window.dispatchEvent(new Event('open-contact'))} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#faf7f3] px-5 py-3.5 text-sm font-medium text-[#111111]">
              <MessageCircle aria-hidden="true" className="size-4" /> Message on WhatsApp
            </button>
            <div className="grid grid-cols-2 gap-2">
              <a href={`mailto:${contactEmail}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-3 text-sm">
                <Mail aria-hidden="true" className="size-4" /> Email
              </a>
              <button type="button" onClick={copy} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-3 text-sm">
                {copied ? <Check aria-hidden="true" className="size-4" /> : <Copy aria-hidden="true" className="size-4" />}
                {copied ? 'Copied' : 'Copy email'}
              </button>
            </div>
          </div>
          <p role="status" className="sr-only">{copied ? 'Email address copied.' : ''}</p>
        </div>
        <ul className="divide-y divide-black/10 dark:divide-white/10">
          {socials.map((social) => (
            <li key={social.label}>
              <a href={social.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 px-5 py-3.5">
                <span>
                  <span className="block text-sm font-medium">{social.label}</span>
                  <span className="block text-xs text-black/55 dark:text-white/55">{social.handle}</span>
                </span>
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            </li>
          ))}
        </ul>
      </PostCard>
      <p className="mt-5 text-center text-xs text-black/45 dark:text-white/45">© {new Date().getFullYear()} Mohan · Designed and developed by Mohan</p>
    </PostSlot>
  );
}
