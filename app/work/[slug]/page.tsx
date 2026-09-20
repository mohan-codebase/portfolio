import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { projects } from '@/data/projects';
import RollingText from '@/components/RollingText';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const otherProjects = projects.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="pt-28 sm:pt-40 pb-20 px-5 sm:px-8 max-w-[1400px] mx-auto">
      {/* Back button */}
      <Link
        href="/work"
        className="inline-flex items-center gap-2 text-sm font-medium text-[#111111]/70 hover:text-[#111111] transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Projects</span>
      </Link>

      {/* Project Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
        <div className="max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#111111]/60 px-3 py-1 rounded-full bg-black/5">
              {project.category}
            </span>
            <span className="text-xs font-mono font-medium text-[#111111]/40 border border-black/10 px-2.5 py-0.5 rounded-full">
              {project.year}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#111111] leading-none">
            {project.title}
          </h1>

          <p className="text-base sm:text-xl text-[#111111]/80 leading-relaxed font-normal pt-2">
            {project.description}
          </p>
        </div>

        {/* Action Button */}
        <div>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[#111111] text-[#faf7f3] text-sm font-medium hover:bg-black/85 transition-all shadow-md group whitespace-nowrap"
          >
            <RollingText text="Use for Free" />
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
              <ArrowUpRight className="w-3.5 h-3.5 text-[#faf7f3]" />
            </div>
          </a>
        </div>
      </div>

      {/* Primary Hero Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-[#e5dfd7] border border-black/5 shadow-md mb-16 sm:mb-24">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Overview & Features Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 sm:pb-24 border-b border-black/10">
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#111111]/50">
            /About the Template
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#111111]">
            Designing for Impact, Built for Flexibility
          </h2>
          <p className="text-base text-[#111111]/70 leading-relaxed font-normal pt-2">
            {project.overview}
          </p>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {project.features.map((feat, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/50 border border-black/5">
              <span className="text-xs font-mono font-medium text-[#111111]/40 block mb-2">
                0{idx + 1}
              </span>
              <h3 className="text-lg font-bold text-[#111111] mb-2">
                {feat.title}
              </h3>
              <p className="text-sm text-[#111111]/70 leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Showcase */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="py-16 sm:py-24 space-y-8 sm:space-y-12">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#111111]">
              Visual Showcase
            </h2>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#111111]/40">
              /High Resolution Details
            </span>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:gap-12">
            {project.gallery.map((imgUrl, i) => (
              <div
                key={i}
                className="relative aspect-[16/10] w-full overflow-hidden rounded-[2rem] bg-[#e5dfd7] border border-black/5 shadow-sm"
              >
                <Image
                  src={imgUrl}
                  alt={`${project.title} screenshot ${i + 1}`}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* More Projects Section */}
      <div className="pt-16 sm:pt-24 border-t border-black/10">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#111111]">
            More Projects
          </h2>
          <Link
            href="/work"
            className="text-sm font-semibold text-[#111111] hover:underline underline-offset-4"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {otherProjects.map((op) => (
            <Link
              key={op.slug}
              href={`/work/${op.slug}`}
              className="group block"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-3xl bg-[#e5dfd7] border border-black/5 shadow-sm mb-4">
                <Image
                  src={op.image}
                  alt={op.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-[#111111] opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#111111] group-hover:underline underline-offset-4 decoration-black/20">
                {op.title}
              </h3>
              <p className="text-sm text-[#111111]/60 font-medium">
                {op.category}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
