'use client';

import React from 'react';

export default function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-50 select-none opacity-[0.045] dark:opacity-[0.03] transition-opacity duration-300"
      style={{
        backgroundImage: "url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')",
        backgroundRepeat: 'repeat',
        backgroundSize: '161px',
      }}
    />
  );
}
