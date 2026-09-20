'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import RollingText from './RollingText';

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
          href="https://framer.link/bsFvFjY"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#111111] text-[#faf7f3] font-medium text-xs sm:text-sm tracking-tight hover:opacity-90 transition-opacity"
        >
          <RollingText text="Use for Free" />
          <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
        </a>

        <a
          href="https://framer.link/5Wi1vkP"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-black/10 bg-white/40 backdrop-blur-sm text-[#111111] font-medium text-xs sm:text-sm tracking-tight hover:bg-black/5 transition-colors"
        >
          <RollingText text="More Templates" />
          <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
        </a>
      </div>

      {/* Floating Center Navbar */}
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2.5rem)] max-w-[580px] transition-all duration-300 ${
          isScrolled ? 'top-3 shadow-lg shadow-black/[0.04]' : 'top-14 sm:top-16'
        }`}
      >
        <div className="relative flex items-center justify-between px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-md border border-black/[0.08] shadow-sm">
          {/* Logo */}
          <Link
            href="/#hero-section"
            className="text-base font-bold tracking-tight text-[#111111] flex items-center gap-1.5 group"
          >
            <span className="w-2 h-2 rounded-full bg-[#111111] group-hover:scale-125 transition-transform" />
            <span className="font-semibold text-lg tracking-tight">Majd</span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-[#111111]/80">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-[#111111] transition-colors py-1 relative"
              >
                <RollingText text={item.label} />
              </Link>
            ))}
          </nav>

          {/* Contact / Right Action Button on Desktop */}
          <Link
            href="/#contact"
            className="hidden sm:inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#111111] text-[#faf7f3] text-xs font-medium hover:bg-black/85 transition-colors"
          >
            <RollingText text="Let's talk" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full hover:bg-black/5 transition-colors text-[#111111]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 p-5 rounded-3xl bg-[#faf7f3] border border-black/10 shadow-2xl flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#111111] py-2 px-3 rounded-xl hover:bg-black/5 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-black/10 flex flex-col gap-2">
              <Link
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 px-4 rounded-full bg-[#111111] text-[#faf7f3] text-sm font-medium"
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
