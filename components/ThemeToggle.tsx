'use client';

import React, { useEffect, useRef, useSyncExternalStore } from 'react';
import { gsap } from 'gsap';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './providers/ThemeProvider';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

const emptySubscribe = () => () => {};

function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export default function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const mounted = useMounted();
  const animation = useRef<gsap.core.Timeline | null>(null);
  const overlay = useRef<HTMLDivElement | null>(null);

  useEffect(() => () => {
    animation.current?.kill();
    overlay.current?.remove();
  }, []);

  const changeTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (animation.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      toggleTheme();
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = bounds.left + bounds.width / 2;
    const y = bounds.top + bounds.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );
    const layer = document.createElement('div');
    layer.setAttribute('aria-hidden', 'true');
    Object.assign(layer.style, {
      position: 'fixed', inset: '0', zIndex: '10000', pointerEvents: 'none',
      background: resolvedTheme === 'dark' ? '#faf7f3' : '#0d0d0e',
      clipPath: `circle(0px at ${x}px ${y}px)`,
    });
    document.body.appendChild(layer);
    overlay.current = layer;

    animation.current = gsap.timeline({
      onComplete: () => {
        layer.remove();
        overlay.current = null;
        animation.current = null;
      },
    })
      .to(layer, { clipPath: `circle(${radius}px at ${x}px ${y}px)`, duration: 0.65, ease: 'power3.inOut' })
      .call(toggleTheme)
      .to(layer, { opacity: 0, duration: 0.55, ease: 'power2.out' }, '+=0.12');
  };

  const isDark = mounted ? resolvedTheme === 'dark' : false;

  return (
    <button
      type="button"
      onClick={changeTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative inline-flex items-center justify-center p-2 rounded-full text-white hover:opacity-70 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-400 group ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {mounted ? (
          <>
            <Sun
              className={`w-4 h-4 transition-all duration-500 transform ${
                isDark
                  ? 'rotate-0 scale-100 opacity-100'
                  : '-rotate-90 scale-0 opacity-0 absolute'
              }`}
            />
            <Moon
              className={`w-4 h-4 transition-all duration-500 transform ${
                isDark
                  ? 'rotate-90 scale-0 opacity-0 absolute'
                  : 'rotate-0 scale-100 opacity-100'
              }`}
            />
          </>
        ) : (
          <div className="w-4 h-4 rounded-full border border-current opacity-30" />
        )}
      </div>

      {showLabel && (
        <span className="ml-2 text-xs font-medium">
          {mounted ? (isDark ? 'Light Mode' : 'Dark Mode') : 'Theme'}
        </span>
      )}
    </button>
  );
}
