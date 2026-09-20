'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { blogs } from '@/data/blogs';
import RollingText from './RollingText';

export default function ThoughtsSection() {
  const recentBlogs = blogs.slice(0, 3);

  return (
    <section className="py-16 sm:py-28 px-5 sm:px-8 max-w-[1400px] mx-auto border-t border-black/10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
        <div>
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#111111]/50 block mb-2">
            /Articles & Insights
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111111]">
            Thoughts
          </h2>
          <p className="text-sm sm:text-base text-[#111111]/60 font-normal mt-2 max-w-xl">
            See how we shape brands with clarity and craft — explore our blog.
          </p>
        </div>

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/15 bg-white/50 backdrop-blur-sm text-sm font-medium text-[#111111] hover:bg-black hover:text-[#faf7f3] transition-all group w-fit"
        >
          <RollingText text="Explore All" />
          <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
        {recentBlogs.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block"
          >
            {/* Thumbnail */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-[#e5dfd7] border border-black/5 mb-5">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/60 backdrop-blur-md text-white">
                  {post.date}
                </span>
              </div>
            </div>

            {/* Info */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#111111] tracking-tight group-hover:underline underline-offset-4 decoration-black/20 mb-2">
                {post.title}
              </h3>
              <p className="text-sm text-[#111111]/70 line-clamp-2 leading-relaxed font-normal">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
