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
            I’m Mohan, a web developer based in Chennai, India, crafting high-performance web applications and digital experiences.
          </p>
        </div>

        {/* Right Column: Narrative & CTA */}
        <div className="lg:col-span-6 space-y-6 lg:pt-3">
          <p className="text-base sm:text-lg text-[#111111]/80 leading-relaxed font-normal">
            I specialize in building modern, accessible, and conversion-driven web applications with clean architecture and fluid interactions.
          </p>
          <p className="text-base sm:text-lg text-[#111111]/80 leading-relaxed font-normal">
            Over the years, I’ve engineered and shipped full-stack web products, bespoke client websites, and scalable frontend architectures.
          </p>

          <div className="pt-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#111111] text-[#faf7f3] text-sm font-medium group hover:bg-black/85 transition-all shadow-sm"
            >
              <RollingText text="Get In Touch" />
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
