import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const approach = [
  { number: '01', title: 'An eye for interfaces.', description: 'Thoughtful layouts, clear typography, and the small interactions that make a website feel right.' },
  { number: '02', title: 'The code behind them.', description: 'Responsive frontends and full-stack applications, built with React, Next.js, and Supabase.' },
];

export default function BioSection() {
  return (
    <section
      id="bio-section"
      aria-labelledby="bio-title"
      className="mx-auto max-w-[1400px] border-t border-black/10 px-5 py-16 dark:border-white/10 sm:px-8 sm:py-28"
    >
      <div className="mb-10 flex flex-wrap items-center justify-between gap-3 sm:mb-14">
        <p className="section-kicker">/ A little about me</p>
        <p className="section-kicker">Chennai, India</p>
      </div>

      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <h2 id="bio-title" className="section-title text-[clamp(2.75rem,5.6vw,5.5rem)] font-semibold">
            Drawn to design.<br />
            <span className="text-black/45 dark:text-white/45">Driven to build.</span>
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-black/70 dark:text-white/70 sm:mt-9 sm:text-xl">
            I’m Mohan. My interest starts with UI — how a page looks, moves, and feels. Full-stack development lets me bring those ideas to life, from the first screen to the systems behind it.
          </p>
          <Link href="/about" className="group mt-8 inline-flex items-center gap-5 rounded-full bg-[#111111] py-3 pl-6 pr-3 text-sm font-medium text-[#faf7f3] transition-colors hover:bg-black/80 dark:bg-[#f4f4f6] dark:text-[#111111] dark:hover:bg-white">
            More about me
            <span className="flex size-8 items-center justify-center rounded-full bg-white/15 dark:bg-black/10">
              <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>

        <div className="overflow-hidden rounded-3xl border border-black/10 bg-black/[0.025] p-6 dark:border-white/10 dark:bg-white/[0.025] sm:p-8 lg:col-span-5">
          <p className="section-kicker mb-7">Where design meets development</p>
          {approach.map(({ number, title, description }, index) => (
            <div key={number} className={index === 0 ? 'pb-7' : 'border-t border-black/10 pt-7 dark:border-white/10'}>
              <div className="mb-3 flex items-baseline gap-4">
                <span className="text-xs tabular-nums text-black/45 dark:text-white/45">{number}</span>
                <h3 className="text-xl font-medium tracking-tight sm:text-2xl">{title}</h3>
              </div>
              <p className="pl-8 text-sm leading-7 text-black/65 dark:text-white/65 sm:text-base">{description}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
