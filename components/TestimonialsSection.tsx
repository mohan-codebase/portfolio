'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { testimonials } from '@/data/testimonials';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 sm:py-32 px-5 sm:px-8 bg-[#111111] text-[#faf7f3] rounded-[2.5rem] sm:rounded-[3.5rem] my-12 max-w-[1400px] mx-auto overflow-hidden relative">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
        <div>
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#faf7f3]/50 block mb-2">
            /Kind Words
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#faf7f3]">
            Testimonials
          </h2>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            aria-label="Previous testimonial"
            className="w-11 h-11 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-[#faf7f3] hover:bg-white/15 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            aria-label="Next testimonial"
            className="w-11 h-11 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-[#faf7f3] hover:bg-white/15 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Cards Container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 pt-2 no-scrollbar scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="min-w-[300px] sm:min-w-[380px] md:min-w-[420px] flex-1 snap-start p-8 sm:p-10 rounded-3xl bg-[#1c1c1c] border border-white/[0.08] flex flex-col justify-between hover:border-white/20 transition-colors"
          >
            <div>
              {/* Partner Logo */}
              <div className="h-9 w-28 relative mb-8 opacity-80 filter brightness-200">
                <Image
                  src={t.logo}
                  alt={`${t.name}'s company logo`}
                  fill
                  sizes="112px"
                  className="object-contain object-left"
                />
              </div>

              {/* Quote */}
              <p className="text-base sm:text-lg text-[#faf7f3]/90 leading-relaxed font-normal mb-8">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            {/* Author Meta */}
            <div className="flex items-center gap-3.5 pt-6 border-t border-white/10">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 relative flex-shrink-0 border border-white/20">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-base font-semibold text-[#faf7f3]">
                  {t.name}
                </h4>
                <p className="text-xs text-[#faf7f3]/50 font-medium mt-0.5">
                  {t.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
