'use client';

import { useRef, useState } from 'react';
import { services } from '@/data/services';
import { PostCard, PostHeader, PostSlot } from './Post';

/** A swipeable carousel post on mobile; a two-by-two grid on desktop. */
export default function ServicesPost() {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  function onScroll() {
    const element = track.current;
    if (!element) return;
    setIndex(Math.round(element.scrollLeft / element.clientWidth));
  }

  return (
    <PostSlot id="services">
      <PostCard className="lg:overflow-visible lg:rounded-none lg:border-0 lg:bg-transparent lg:shadow-none dark:lg:bg-transparent">
        <PostHeader
          subtitle="What I do"
          className="lg:hidden"
        />
        <div className="mb-8 hidden items-end justify-between lg:flex">
          <div>
            <p className="section-kicker mb-3">/ Services</p>
            <h2 className="section-title text-5xl font-semibold">What I can help with.</h2>
          </div>
        </div>
        <div
          ref={track}
          onScroll={onScroll}
          data-lenis-prevent-touch
          role="region"
          aria-label="Services"
          tabIndex={0}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain lg:grid lg:grid-cols-2 lg:gap-4 lg:overflow-visible"
        >
          {services.map((service) => (
            <section key={service.id} aria-label={service.title} className="flex aspect-square max-h-[48svh] w-full shrink-0 snap-center flex-col justify-end bg-[#111111] p-6 text-[#faf7f3] dark:bg-[#161619] lg:aspect-auto lg:max-h-none lg:rounded-3xl lg:border lg:border-black/10 lg:bg-white/60 lg:p-8 lg:text-[#111111] dark:lg:border-white/10 dark:lg:bg-white/[0.03] dark:lg:text-[#f4f4f6]">
              <div>
                <h3 className="text-3xl font-semibold tracking-[-0.05em] lg:text-3xl">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed opacity-70 ">{service.description}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${service.title} focus areas`}>
                  {service.tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-current/20 px-3 py-1 text-xs opacity-80">{tag}</li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>
        <div aria-hidden="true" className="flex justify-center gap-1.5 py-3 lg:hidden">
          {services.map((service, dot) => (
            <span key={service.id} className={`h-1.5 rounded-full transition-all ${dot === index ? 'w-4 bg-current' : 'w-1.5 bg-current/25'}`} />
          ))}
        </div>
      </PostCard>
    </PostSlot>
  );
}
