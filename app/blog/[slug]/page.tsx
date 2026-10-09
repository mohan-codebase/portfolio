import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { blogs } from '@/data/blogs';

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogs.find((b) => b.slug === slug);
  if (!post) return { title: 'Article Not Found' };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = blogs.find((b) => b.slug === slug);

  if (!post) {
    notFound();
  }

  const otherBlogs = blogs.filter((b) => b.slug !== slug).slice(0, 3);

  return (
    <article className="pt-28 sm:pt-40 pb-20 px-5 sm:px-8 max-w-[1000px] mx-auto">
      {/* Back button */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm font-medium text-[#111111]/70 dark:text-[#f4f4f6]/70 hover:text-[#111111] dark:hover:text-[#f4f4f6] transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Articles</span>
      </Link>

      {/* Article Header */}
      <div className="space-y-4 mb-10 sm:mb-14">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-medium text-[#111111]/60 dark:text-[#f4f4f6]/70 px-3 py-1 rounded-full bg-black/5 dark:bg-white/10">
            {post.date}
          </span>
          <span className="text-xs text-[#111111]/40 dark:text-[#f4f4f6]/40">• 5 min read</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#111111] dark:text-[#f4f4f6] leading-tight">
          {post.title}
        </h1>

        <p className="text-lg sm:text-xl text-[#111111]/70 dark:text-[#f4f4f6]/70 leading-relaxed font-normal pt-2">
          {post.excerpt}
        </p>
      </div>

      {/* Hero Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2rem] bg-[#e5dfd7] dark:bg-[#18181b] border border-black/5 dark:border-white/10 shadow-md mb-12 sm:mb-16">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          sizes="(min-width: 1024px) 1000px, 100vw"
          className="object-cover"
        />
      </div>

      {/* Article Content Body */}
      <div className="prose prose-lg max-w-none space-y-6 text-[#111111]/85 dark:text-[#f4f4f6]/85 leading-relaxed text-base sm:text-lg">
        {post.content && post.content.length > 0 ? (
          post.content.map((block, i) => {
            if (block.tag === 'h2') {
              return (
                <h2
                  key={i}
                  className="text-2xl sm:text-3xl font-bold text-[#111111] dark:text-[#f4f4f6] tracking-tight pt-8 pb-2"
                >
                  {block.text}
                </h2>
              );
            }
            if (block.tag === 'h3') {
              return (
                <h3
                  key={i}
                  className="text-xl sm:text-2xl font-bold text-[#111111] dark:text-[#f4f4f6] tracking-tight pt-6 pb-1"
                >
                  {block.text}
                </h3>
              );
            }
            return (
              <p key={i} className="font-normal leading-relaxed text-[#111111]/80 dark:text-[#f4f4f6]/80">
                {block.text}
              </p>
            );
          })
        ) : (
          <>
            <p className="text-[#111111]/80 dark:text-[#f4f4f6]/80">
              In contemporary digital experiences, clarity is the definitive driver of user trust. When potential customers visit a digital product or service website, every micro-interaction, spacing rhythm, and typographic choice either reinforces credibility or introduces cognitive friction.
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111111] dark:text-[#f4f4f6] tracking-tight pt-8 pb-2">
              The Power of Restraint
            </h2>
            <p className="text-[#111111]/80 dark:text-[#f4f4f6]/80">
              Designers often feel compelled to add flourishes—gradients, floating particles, and layered shadows. Yet the most memorable and high-converting interfaces achieve their power through intentional restraint. Whitespace allows key propositions to breathe, while structured hierarchy leads the eye naturally through value propositions.
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111111] dark:text-[#f4f4f6] tracking-tight pt-8 pb-2">
              Consistency and Component Scalability
            </h2>
            <p className="text-[#111111]/80 dark:text-[#f4f4f6]/80">
              Building with a modular mindset—whether in Framer or modern React frameworks—guarantees that design tokens scale across pages without visual degradation. Brand trust compounds when every touchpoint feels harmonious.
            </p>
          </>
        )}
      </div>

      {/* More Articles Section */}
      <div className="pt-20 sm:pt-28 mt-20 sm:mt-28 border-t border-black/10 dark:border-white/10">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#111111] dark:text-[#f4f4f6]">
            More Articles
          </h2>
          <Link
            href="/blog"
            className="text-sm font-semibold text-[#111111] dark:text-[#f4f4f6] hover:underline underline-offset-4"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherBlogs.map((b) => (
            <Link
              key={b.slug}
              href={`/blog/${b.slug}`}
              className="group block"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#e5dfd7] dark:bg-[#18181b] border border-black/5 dark:border-white/10 shadow-sm mb-3">
                <Image
                  src={b.image}
                  alt={b.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#111111] dark:text-[#f4f4f6] group-hover:underline underline-offset-4 decoration-black/20 dark:decoration-white/20 leading-snug mb-1">
                {b.title}
              </h3>
              <p className="text-xs text-[#111111]/50 dark:text-[#f4f4f6]/50 font-medium">
                {b.date}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
