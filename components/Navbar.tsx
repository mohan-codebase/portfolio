'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import RollingText from './RollingText';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/#hero-section' },
    { label: 'About Me', href: '/#bio-section' },
    { label: 'Services', href: '/#services' },
    { label: 'Works', href: '/work' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <>
      {/* Top Banner Actions */}
      <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 pt-4 pb-2 flex items-center justify-between relative z-30 text-sm">
        <a
          href="mailto:mohanavenkatesh.work@gmail.com"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#111111] text-[#faf7f3] dark:bg-[#f4f4f6] dark:text-[#111111] font-medium text-xs sm:text-sm tracking-tight hover:opacity-90 transition-all"
        >
          <RollingText text="Hire Me" />
          <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
        </a>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/mohan-codebase"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-black/10 dark:border-white/15 bg-white/40 dark:bg-white/5 backdrop-blur-sm text-[#111111] dark:text-[#f4f4f6] font-medium text-xs sm:text-sm tracking-tight hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <RollingText text="GitHub" />
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </a>

          <ThemeToggle className="sm:hidden" />
        </div>
      </div>

      {/* Floating Center Navbar */}
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2.5rem)] max-w-[620px] transition-all duration-300 ${
          isScrolled ? 'top-3 shadow-lg shadow-black/[0.04] dark:shadow-black/40' : 'top-14 sm:top-16'
        }`}
      >
        <div className="relative flex items-center justify-between px-5 py-2.5 rounded-full bg-white/70 dark:bg-[#141416]/80 backdrop-blur-md border border-black/[0.08] dark:border-white/10 shadow-sm transition-colors duration-300">
          {/* Logo */}
          <Link
            href="/#hero-section"
            className="text-base font-bold tracking-tight text-[#111111] dark:text-[#f4f4f6] flex items-center gap-1.5 group"
          >
            <span className="w-2 h-2 rounded-full bg-[#111111] dark:bg-[#f4f4f6] group-hover:scale-125 transition-transform" />
            <span className="font-semibold text-lg tracking-tight">Mohan</span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-[#111111]/80 dark:text-[#f4f4f6]/75">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-[#111111] dark:hover:text-[#f4f4f6] transition-colors py-1 relative"
              >
                <RollingText text={item.label} />
              </Link>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden sm:inline-flex" />

            <Link
              href="/#contact"
              className="hidden sm:inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#111111] text-[#faf7f3] dark:bg-[#f4f4f6] dark:text-[#111111] text-xs font-medium hover:bg-black/85 dark:hover:bg-white transition-colors"
            >
              <RollingText text="Let's talk" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-[#111111] dark:text-[#f4f4f6]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 p-5 rounded-3xl bg-[#faf7f3] dark:bg-[#141416] border border-black/10 dark:border-white/15 shadow-2xl flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#111111] dark:text-[#f4f4f6] py-2 px-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-2 border-t border-black/10 dark:border-white/10 flex flex-col gap-3">
              <div className="flex items-center justify-between px-3 py-1">
                <span className="text-sm font-medium text-[#111111]/70 dark:text-[#f4f4f6]/70">
                  Theme
                </span>
                <ThemeToggle />
              </div>

              <Link
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 px-4 rounded-full bg-[#111111] text-[#faf7f3] dark:bg-[#f4f4f6] dark:text-[#111111] text-sm font-medium transition-colors"
              >
                Let&apos;s talk
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
