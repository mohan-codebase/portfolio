'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import ThemeToggle from '@/components/ThemeToggle';

/** The home page brings its own feed chrome; every other route keeps the classic navigation and footer. */
export function TopChrome() {
  return usePathname() === '/' ? null : <Navbar />;
}

export function BottomChrome() {
  if (usePathname() === '/') return null;
  return (
    <>
      <Footer />
      <BackToTop />
      <div className="fixed bottom-[env(safe-area-inset-bottom)] left-[env(safe-area-inset-left)] z-40 mix-blend-difference">
        <ThemeToggle className="h-12 w-12" />
      </div>
    </>
  );
}
