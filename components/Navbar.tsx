'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import RollingText from './RollingText';
import styles from './Navbar.module.css';

export default function Navbar() {
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuPanel = useRef<HTMLElement>(null);
  const [isPill, setIsPill] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled((previous) => previous ? y > 24 : y > 48);
      setIsPill((previous) => previous ? y > 70 : y > 120);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        menuButton.current?.focus();
      }
      if (event.key === 'Tab') {
        const links = Array.from(menuPanel.current?.querySelectorAll<HTMLElement>('a, button') ?? []);
        const items = [menuButton.current, ...links].filter((item): item is HTMLElement => Boolean(item));
        const index = items.indexOf(document.activeElement as HTMLElement);
        event.preventDefault();
        items[(index + (event.shiftKey ? -1 : 1) + items.length) % items.length]?.focus();
      }
    };
    const breakpoint = window.matchMedia('(min-width: 768px)');
    const resize = () => { if (breakpoint.matches) setMobileMenuOpen(false); };
    window.addEventListener('keydown', close);
    breakpoint.addEventListener('change', resize);
    return () => {
      window.removeEventListener('keydown', close);
      breakpoint.removeEventListener('change', resize);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '/#hero-section' },
    { label: 'About Me', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Works', href: '/work' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Floating Center Navbar */}
      <header
        className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${isPill ? styles.pill : ''}`}
      >
        <div className={`${styles.bar} ${mobileMenuOpen ? styles.openBar : ''}`}>
          {/* Logo */}
          <Link
            onClick={() => setMobileMenuOpen(false)}
            href="/#hero-section"
            className="text-base font-bold tracking-tight text-[#111111] dark:text-[#f4f4f6] flex items-center gap-1.5 group"
          >
            <span className="font-semibold text-lg tracking-tight">Mohan</span>
          </Link>

          {/* Desktop Nav Links */}
          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-5 text-sm font-medium text-[#111111]/80 dark:text-[#f4f4f6]/75">
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
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event('open-contact'))}
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#111111] text-[#faf7f3] dark:bg-[#f4f4f6] dark:text-[#111111] text-xs font-medium hover:bg-black/85 dark:hover:bg-white transition-colors"
            >
              <RollingText text="Let's talk" />
            </button>

            {/* Mobile Menu Button */}
            <button
              ref={menuButton}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex h-11 w-11 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-[#111111] dark:text-[#f4f4f6]"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <nav
          ref={menuPanel}
          id="mobile-navigation"
          aria-label="Mobile navigation"
          inert={!mobileMenuOpen}
          aria-hidden={!mobileMenuOpen}
          data-lenis-prevent
          className={`${styles.sheet} ${mobileMenuOpen ? styles.sheetOpen : ''}`}
        >
          {navLinks.map((item, index) => (
            <Link key={item.label} href={item.href}
              style={{ transitionDelay: mobileMenuOpen ? `${index * 55 + 80}ms` : '0ms' }}
              onClick={() => setMobileMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
          <button type="button" onClick={() => { setMobileMenuOpen(false); window.dispatchEvent(new Event('open-contact')); }} className="mt-6 text-left text-lg">Let’s talk ↗</button>
        </nav>
      </header>
    </>
  );
}
