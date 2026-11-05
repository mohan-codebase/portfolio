'use client';

import React from 'react';
import { services } from '@/data/services';

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="py-16 sm:py-28 px-5 sm:px-8 max-w-[1400px] mx-auto border-t border-black/10 dark:border-white/10 transition-colors duration-300"
    >
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center justify-between mb-12 sm:mb-16">
        <h2 className="section-title text-3xl sm:text-5xl font-bold tracking-tight text-[#111111] dark:text-[#f4f4f6]">
          How I can help.
        </h2>
        <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#111111]/70 dark:text-[#f4f4f6]/70">
          /What I Offer
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="group relative p-8 sm:p-10 rounded-3xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/[0.03] hover:bg-white/80 dark:hover:bg-white/[0.06] dark:hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-black/[0.03] dark:hover:shadow-black/40 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono font-medium text-[#111111]/40 dark:text-[#f4f4f6]/50 border border-black/10 dark:border-white/15 px-2.5 py-1 rounded-full">
                  {service.id}
                </span>
                <div className="w-2.5 h-2.5 rounded-full bg-black/10 dark:bg-white/20 group-hover:bg-[#111111] dark:group-hover:bg-white transition-colors" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#111111] dark:text-[#f4f4f6] tracking-tight mb-4">
                {service.title}
              </h3>

              <p className="text-sm sm:text-base text-[#111111]/70 dark:text-[#f4f4f6]/70 leading-relaxed font-normal mb-8">
                {service.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-black/[0.06] dark:border-white/10">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 text-[#111111]/80 dark:text-[#f4f4f6]/80 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
