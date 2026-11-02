import { MapPin } from 'lucide-react';
import Avatar from './Avatar';
import OpenContactButton from './OpenContactButton';
import { PostSlot } from './Post';
import { contactEmail } from './content';

const highlights = [
  { label: 'About', href: '#about-story', glyph: 'Hi' },
  { label: 'Services', href: '#services', glyph: '✦' },
  { label: 'Work', href: '#work', glyph: '↗' },
  { label: 'Stack', href: '#stack', glyph: '</>' },
  { label: 'Contact', href: '#contact', glyph: '@' },
];

/** Mobile-only profile header that opens the feed, Instagram-profile style. */
export default function ProfilePost() {
  return (
    <PostSlot className="lg:hidden">
      <div className="hero-reveal">
        <div className="flex items-center gap-6 px-2">
          <Avatar size="lg" ring />
          <div className="min-w-0 leading-tight">
            <p className="text-base font-semibold">mohan-codebase</p>
            <p className="mt-1 text-sm text-black/55 dark:text-white/55">Designer &amp; developer</p>
          </div>
        </div>

        <div className="mt-5 px-2">
          <h1 className="text-[clamp(3.25rem,17vw,5rem)] font-black uppercase leading-[0.82] tracking-[-0.085em]">
            Mohan<span className="opacity-35">.</span>
          </h1>
          <p className="mt-4 text-lg font-medium leading-snug tracking-tight">
            UI designer at heart.<br />
            <span className="text-black/55 dark:text-white/55">Full-stack developer by craft.</span>
          </p>
          <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-black/55 dark:text-white/55">
            <MapPin aria-hidden="true" className="size-3.5" /> Chennai, India
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 px-2">
          <OpenContactButton className="rounded-full bg-[#111111] px-4 py-3 text-sm font-medium text-[#faf7f3] dark:bg-[#f4f4f6] dark:text-[#111111]">
            Message
          </OpenContactButton>
          <a href={`mailto:${contactEmail}`} className="rounded-full border border-black/15 px-4 py-3 text-center text-sm font-medium dark:border-white/15">
            Email
          </a>
        </div>

        <nav aria-label="Highlights" className="no-scrollbar -mx-3 mt-7 flex gap-4 overflow-x-auto px-5 pb-1">
          {highlights.map((item) => (
            <a key={item.label} href={item.href} className="flex w-16 shrink-0 flex-col items-center gap-2 text-xs">
              <span className="flex size-16 items-center justify-center rounded-full border border-black/15 bg-black/[0.03] text-sm font-semibold tracking-tight dark:border-white/15 dark:bg-white/[0.04]">
                {item.glyph}
              </span>
              {item.label}
            </a>
          ))}
        </nav>

        <p aria-hidden="true" className="feed-hint mt-8 text-center text-xs text-black/45 dark:text-white/45">Scroll to explore ↓</p>
      </div>
    </PostSlot>
  );
}
