'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Heart, MessageCircle, Send } from 'lucide-react';
import type { Project } from '@/data/projects';
import { PostCard, PostHeader, PostSlot } from './Post';

const likesKey = 'liked-projects';

function readLikes(): string[] {
  try {
    const value = JSON.parse(localStorage.getItem(likesKey) ?? '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

/** A project as a feed post: full-screen on mobile, a grid card on desktop. */
export default function ProjectPost({ project }: { project: Project }) {
  const [liked, setLiked] = useState(false);
  const [burst, setBurst] = useState(0);
  const [notice, setNotice] = useState('');
  const lastTap = useRef(0);
  const cover = project.gallery[0] ?? project.image;
  const caseStudy = `/work/${project.slug}`;
  // Generated SVG covers are 29:20 title cards, so show them whole instead of cropping to a square.
  const isTitleCard = cover.endsWith('.svg');

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setLiked(readLikes().includes(project.slug)), [project.slug]);

  function setLike(next: boolean) {
    setLiked(next);
    try {
      const likes = new Set(readLikes());
      if (next) likes.add(project.slug); else likes.delete(project.slug);
      localStorage.setItem(likesKey, JSON.stringify([...likes]));
    } catch {}
  }

  function onMediaPointer() {
    const now = Date.now();
    if (now - lastTap.current < 320) {
      setLike(true);
      setBurst((count) => count + 1);
      lastTap.current = 0;
    } else lastTap.current = now;
  }

  async function share() {
    const url = new URL(caseStudy, window.location.origin).toString();
    try {
      if (navigator.share) {
        await navigator.share({ title: `${project.title} by Mohan`, text: project.description, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setNotice('Link copied');
    } catch (error) {
      if ((error as Error).name !== 'AbortError') setNotice('Could not share this link');
    }
    window.setTimeout(() => setNotice(''), 2200);
  }

  return (
    <PostSlot>
      <PostCard className="group/post lg:h-full">
        <PostHeader
          subtitle={project.category}
        />
        <div
          onPointerUp={onMediaPointer}
          className={`relative ${isTitleCard ? 'aspect-[29/20]' : 'aspect-square max-h-[46svh]'} w-full touch-manipulation overflow-hidden bg-[#e5dfd7] select-none dark:bg-[#18181b] lg:aspect-[16/11] lg:max-h-none`}
        >
          <Image
            src={cover}
            alt={`${project.title} cover`}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            draggable={false}
            className="object-cover transition-transform duration-700 ease-out lg:group-hover/post:scale-[1.03]"
          />
          {burst > 0 && (
            <Heart key={burst} aria-hidden="true" className="like-burst pointer-events-none absolute left-1/2 top-1/2 size-24 fill-white text-white drop-shadow-lg" />
          )}
          <Link href={caseStudy} tabIndex={-1} aria-hidden="true" className="absolute inset-0 hidden lg:block" />
        </div>

        <div className="flex items-center gap-1 px-2 pt-1.5">
          <button type="button" aria-pressed={liked} aria-label={liked ? `Unlike ${project.title}` : `Like ${project.title}`} onClick={() => setLike(!liked)} className="flex size-11 items-center justify-center rounded-full transition-transform active:scale-90">
            <Heart aria-hidden="true" className={`size-6 transition-colors ${liked ? 'fill-current' : ''}`} />
          </button>
          <button type="button" aria-label={`Ask about ${project.title}`} onClick={() => window.dispatchEvent(new Event('open-contact'))} className="flex size-11 items-center justify-center rounded-full">
            <MessageCircle aria-hidden="true" className="size-6 -scale-x-100" />
          </button>
          <button type="button" aria-label={`Share ${project.title}`} onClick={share} className="flex size-11 items-center justify-center rounded-full">
            <Send aria-hidden="true" className="size-6" />
          </button>
          <span role="status" className="text-xs text-black/55 dark:text-white/55">{notice}</span>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="ml-auto mr-2 inline-flex items-center gap-1.5 rounded-full border border-black/15 px-3.5 py-2 text-xs font-medium hover:bg-black/[0.04] dark:border-white/15 dark:hover:bg-white/[0.06]">
              Visit site <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </a>
          )}
        </div>

        <div className="px-4 pb-4 pt-1">
          <h3 className="text-2xl font-bold tracking-[-0.04em]">
            <Link href={caseStudy} className="hover:underline hover:decoration-black/25 hover:underline-offset-4 dark:hover:decoration-white/25">{project.title}</Link>
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed">
            <span className="font-semibold">mohan</span>{' '}
            <span className="text-black/70 dark:text-white/70">{project.description}</span>
          </p>
          <Link href={caseStudy} className="mt-2 inline-block text-sm text-black/55 underline-offset-4 hover:underline dark:text-white/55">
            View case study
          </Link>
        </div>
      </PostCard>
    </PostSlot>
  );
}
