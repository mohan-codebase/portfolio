'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLenis } from '@/components/providers/SmoothScrollProvider';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { lenis, scrollTo } = useLenis();

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 400);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Back to top"
      title="Back to top"
      onClick={() => {
        if (lenis) scrollTo(0);
        else window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      }}
      className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] right-[max(0.75rem,env(safe-area-inset-right))] z-40 flex h-12 w-12 items-center justify-center rounded-full text-white mix-blend-difference transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4"
    >
      <ArrowUp aria-hidden="true" className="h-5 w-5" />
    </button>
  );
}
