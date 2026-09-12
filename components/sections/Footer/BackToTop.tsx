'use client';

import { Arrow } from '@/components/ui/Arrow';
import { scrollToTarget } from '@/lib/scroll';

/** Glides back to the top and returns keyboard focus to the start of the page. */
export function BackToTop({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        scrollToTarget(0);
        document.getElementById('main')?.focus({ preventScroll: true });
      }}
    >
      Back to top <Arrow direction="up" />
    </button>
  );
}
