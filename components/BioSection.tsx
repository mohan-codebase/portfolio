'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import RollingText from './RollingText';

export default function BioSection() {
  return (
    <section
      id="bio-section"
      className="py-16 sm:py-28 px-5 sm:px-8 max-w-[1400px] mx-auto border-t border-black/10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Column: Greeting & Lead */}
        <div className="lg:col-span-6 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111111]">
            Hey!
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl font-normal leading-snug text-[#111111] tracking-tight">
            I’m Majd, a builder based in Syria, currently working on{' '}
            <span className="font-semibold underline decoration-black/30 underline-offset-4">
              Templyo
            </span>
            , a platform for high-quality Framer templates.
          </p>
        </div>

        {/* Right Column: Narrative & CTA */}
        <div className="lg:col-span-6 space-y-6 lg:pt-3">
          <p className="text-base sm:text-lg text-[#111111]/80 leading-relaxed font-normal">
            I’m a software engineer and Framer creator with a strong focus on building modern, scalable, and conversion-driven web experiences.
          </p>
          <p className="text-base sm:text-lg text-[#111111]/80 leading-relaxed font-normal">
            Over the years, I’ve created and shipped multiple SaaS products and Framer templates used by global customers, helping them launch faster.
          </p>

          <div className="pt-4">
            <a
              href="https://framer.link/nnhGcWR"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#111111] text-[#faf7f3] text-sm font-medium group hover:bg-black/85 transition-all shadow-sm"
            >
              <RollingText text="Get Started" />
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight className="w-3.5 h-3.5 text-[#faf7f3]" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
