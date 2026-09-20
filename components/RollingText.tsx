'use client';

import React from 'react';

interface RollingTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function RollingText({ text, className = '', style }: RollingTextProps) {
  return (
    <span className={`inline-flex overflow-hidden relative group/rolling select-none leading-none ${className}`} style={style}>
      <span className="inline-flex transition-transform duration-300 ease-out group-hover/rolling:-translate-y-full">
        {text.split('').map((char, i) => (
          <span
            key={i}
            className="inline-block transition-transform duration-300 ease-out"
            style={{ transitionDelay: `${i * 12}ms` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
      <span
        aria-hidden="true"
        className="inline-flex absolute top-full left-0 transition-transform duration-300 ease-out group-hover/rolling:-translate-y-full"
      >
        {text.split('').map((char, i) => (
          <span
            key={i}
            className="inline-block transition-transform duration-300 ease-out"
            style={{ transitionDelay: `${i * 12}ms` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    </span>
  );
}
