'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import RollingText from './RollingText';

export default function Footer() {
  const navLinks = [
    { label: 'Home', href: '/#hero-section' },
    { label: 'About Me', href: '/#bio-section' },
    { label: 'Services', href: '/#services' },
    { label: 'Works', href: '/work' },
    { label: 'Contact', href: '/#contact' },
  ];

  const socials = [
    { label: 'X (Twitter)', href: 'https://x.com/' },
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'YouTube', href: 'https://www.youtube.com/' },
  ];

  return (
    <footer className="bg-[#111111] text-[#faf7f3] pt-20 sm:pt-32 pb-12 px-5 sm:px-8 mt-16 rounded-t-[2.5rem] sm:rounded-t-[3.5rem] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Top Tagline */}
        <div className="mb-16 sm:mb-24">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#faf7f3] leading-[1.05]">
            Scaling
            <br />
            Start-ups for Growth.
          </h2>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 pb-16 sm:pb-24 border-b border-white/10">
          {/* Quick links */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#faf7f3]/50">
              /Quick links
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-base sm:text-lg text-[#faf7f3]/80 hover:text-[#faf7f3] transition-colors inline-block"
                  >
                    <RollingText text={link.label} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#faf7f3]/50">
              /Contact
            </h4>
            <div>
              <a
                href="mailto:mejed@templyo.io"
                className="text-base sm:text-lg text-[#faf7f3] hover:underline underline-offset-4 inline-flex items-center gap-1.5 font-medium"
              >
                Mejed@Templyo.io
                <ArrowUpRight className="w-4 h-4 opacity-70" />
              </a>
            </div>
            <p className="text-xs text-[#faf7f3]/50 max-w-xs pt-2">
              Available for freelance engagements, template customizations, and strategic design advisory.
            </p>
          </div>

          {/* Socials */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#faf7f3]/50">
              /Socials
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full border border-white/15 bg-white/5 text-xs sm:text-sm font-medium hover:bg-white/15 transition-colors inline-flex items-center gap-1"
                >
                  <RollingText text={social.label} />
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Giant Watermark MAJD */}
        <div className="py-12 sm:py-20 text-center select-none overflow-hidden">
          <span className="text-[20vw] sm:text-[22vw] font-black tracking-tighter uppercase text-white/[0.04] leading-none block">
            MAJD
          </span>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#faf7f3]/50 pt-4">
          <p>© 2026 Majd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a
              href="https://www.framer.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#faf7f3] transition-colors"
            >
              Created with Framer
            </a>
            <a
              href="https://framer.link/bsFvFjY"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#faf7f3] transition-colors"
            >
              Use for Free
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
