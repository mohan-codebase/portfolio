import StructuredData from '@/components/StructuredData';
import PageIntro from '@/components/PageIntro';
import React from 'react';
import { pageMetadata } from '@/lib/metadata';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';

export const metadata = pageMetadata('Projects', 'Explore Mohan’s projects, from responsive interfaces to Habits, a Next.js and Supabase application.', '/work');

export default function WorkPage() {
  return (
    <div className="pt-28 sm:pt-40 pb-20 px-5 sm:px-8 max-w-[1400px] mx-auto">
      <StructuredData title="Projects" path="/work" />
      <PageIntro eyebrow="Projects & experiments" title="Selected work" description="Websites, interfaces, and digital products. A selection of work where considered design meets thoughtful development." count={`${projects.length.toString().padStart(2, "0")} projects`} />

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="portfolio-card group block"
          >
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-3xl bg-[#e5dfd7] dark:bg-[#18181b] border border-black/5 dark:border-white/10 shadow-sm">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-white/5 transition-colors duration-300" />
              <div className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/90 dark:bg-[#141416]/90 backdrop-blur-sm flex items-center justify-center text-[#111111] dark:text-[#f4f4f6] opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>

            <div className="pt-6 flex items-baseline justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#111111] dark:text-[#f4f4f6] tracking-tight group-hover:underline underline-offset-4 decoration-black/20 dark:decoration-white/20">
                  {project.title}
                </h2>
                <p className="text-sm sm:text-base text-[#111111]/60 dark:text-[#f4f4f6]/60 font-medium mt-1">
                  {project.category}
                </p>
              </div>
              <span className="text-xs font-mono font-medium text-[#111111]/40 border border-black/10 dark:text-[#f4f4f6]/40 dark:border-white/15 px-3 py-1 rounded-full">
                {project.year}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
