'use client';

import React from 'react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section
      id="hero-section"
      className="relative min-h-[70vh] sm:min-h-[80vh] flex flex-col justify-between pt-28 sm:pt-36 pb-12 px-5 sm:px-8 max-w-[1400px] mx-auto overflow-hidden"
    >
      {/* Decorative Floating 3D Holographic Elements */}
      <div className="absolute left-[5%] top-[25%] sm:top-[20%] w-24 h-24 sm:w-36 sm:h-36 lg:w-44 lg:h-44 pointer-events-none z-10 animate-float-slow select-none">
        <Image
          src="https://framerusercontent.com/images/lIIjRX5gxRdY7UWw5wqIXicPOA.png?width=2550&height=2550"
          alt="Holographic crystal decorative shape"
          width={2550}
          height={2550}
          priority
          className="w-full h-full object-contain drop-shadow-2xl"
        />
      </div>

      <div className="absolute right-[5%] bottom-[25%] sm:bottom-[30%] w-20 h-20 sm:w-32 sm:h-32 lg:w-40 lg:h-40 pointer-events-none z-10 animate-float-reverse select-none">
        <Image
          src="https://framerusercontent.com/images/OLDYsHB9RMavvQrkVRNy08ZXYE.png?width=2550&height=2550"
          alt="Holographic iridescent decorative shape"
          width={2550}
          height={2550}
          priority
          className="w-full h-full object-contain drop-shadow-2xl"
        />
      </div>

      {/* Main Massive Title */}
      <div className="my-auto py-12 sm:py-20 text-center relative z-20 flex flex-col items-center justify-center">
        <h1 className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight sm:tracking-tighter text-[#111111] uppercase select-none leading-none">
          <span className="inline-block transition-transform hover:scale-[1.02] duration-300">
            SOFTWARE
          </span>
          <br className="hidden sm:inline" />{' '}
          <span className="inline-block transition-transform hover:scale-[1.02] duration-300">
            ENGINEER
          </span>
        </h1>
      </div>

      {/* Bottom Year and Info Bar */}
      <div className="w-full flex items-center justify-between border-t border-black/10 pt-6 text-xs sm:text-sm font-semibold tracking-wider text-[#111111]/70 uppercase">
        <div>
          <span>©2026</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span>/CREATING SINCE 2020</span>
        </div>
      </div>
    </section>
  );
}
