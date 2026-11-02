import type { ReactNode } from 'react';
import Avatar from './Avatar';

/**
 * One full-screen, snap-aligned slot in the mobile feed. On large screens it
 * falls back to an ordinary block so sections can lay posts out freely.
 */
export function PostSlot({ id, children, className = '' }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <div id={id} className={`feed-post flex min-h-svh flex-col justify-center px-3 pb-[calc(5.75rem+env(safe-area-inset-bottom))] pt-[calc(4rem+env(safe-area-inset-top))] sm:px-6 lg:min-h-0 lg:p-0 ${className}`}>
      <div className="mx-auto w-full max-w-[34rem] lg:h-full lg:max-w-none">{children}</div>
    </div>
  );
}

export function PostCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <article className={`overflow-hidden rounded-3xl border border-black/10 bg-white/60 shadow-[0_1px_0_rgb(0_0_0/3%)] dark:border-white/10 dark:bg-white/[0.03] ${className}`}>
      {children}
    </article>
  );
}

export function PostHeader({ subtitle, aside, className = '' }: { subtitle: string; aside?: ReactNode; className?: string }) {
  return (
    <header className={`flex items-center gap-3 px-4 py-3 ${className}`}>
      <Avatar />
      <div className="min-w-0 flex-1 leading-tight">
        <p className="text-sm font-semibold">mohan</p>
        <p className="truncate text-xs text-black/55 dark:text-white/55">{subtitle}</p>
      </div>
      {aside}
    </header>
  );
}
