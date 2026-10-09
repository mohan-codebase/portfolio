import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { blogs } from '@/data/blogs';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Thoughts, strategies, and technical insights on web development, design systems, and building high-impact products.',
};

export default function BlogListingPage() {
  return (
    <div className="pt-28 sm:pt-40 pb-20 px-5 sm:px-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-14 sm:mb-20 max-w-2xl">
        <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#111111]/50 dark:text-[#f4f4f6]/50 block mb-3">
          /Writing & Perspective
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#111111] dark:text-[#f4f4f6] leading-tight mb-4">
          My Brightest Thoughts
        </h1>
        <p className="text-base sm:text-lg text-[#111111]/70 dark:text-[#f4f4f6]/70 leading-relaxed font-normal">
          Essays, design principles, and technical breakdowns exploring modern web craft, brand systems, and startup execution.
        </p>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {blogs.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block"
          >
            {/* Thumbnail */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-[#e5dfd7] dark:bg-[#18181b] border border-black/5 dark:border-white/10 mb-5 shadow-sm">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/60 dark:bg-black/75 backdrop-blur-md text-white">
                  {post.date}
                </span>
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#111111] dark:text-[#f4f4f6] tracking-tight group-hover:underline underline-offset-4 decoration-black/20 dark:decoration-white/20 mb-2 leading-snug">
                {post.title}
              </h2>
              <p className="text-sm text-[#111111]/70 dark:text-[#f4f4f6]/70 line-clamp-3 leading-relaxed font-normal">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
