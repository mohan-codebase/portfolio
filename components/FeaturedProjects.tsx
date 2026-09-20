'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';
import RollingText from './RollingText';

export default function FeaturedProjects() {
  const featured = projects.slice(0, 4);

  return (
    <section className="py-16 sm:py-28 px-5 sm:px-8 max-w-[1400px] mx-auto border-t border-black/10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
        <div>
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#111111]/50 block mb-2">
            /Portfolio
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111111]">
            Featured Projects
          </h2>
        </div>

        <Link
          href="/work"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/15 bg-white/50 backdrop-blur-sm text-sm font-medium text-[#111111] hover:bg-black hover:text-[#faf7f3] transition-all group w-fit"
        >
          <RollingText text="View All Work" />
          <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
        {featured.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="group block relative"
          >
            {/* Project Image Container */}
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-3xl bg-[#e5dfd7] border border-black/5">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

              {/* Floating arrow icon on hover */}
              <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#111111] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-md">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>

            {/* Project Info */}
            <div className="pt-5 flex items-baseline justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#111111] tracking-tight group-hover:underline underline-offset-4 decoration-black/20">
                  {project.title}
                </h3>
                <p className="text-sm text-[#111111]/60 font-medium mt-1">
                  {project.category}
                </p>
              </div>

              <span className="text-xs font-mono font-medium text-[#111111]/40 border border-black/10 px-2.5 py-1 rounded-full">
                {project.year}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
