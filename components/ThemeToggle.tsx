'use client';

import React, { useSyncExternalStore } from 'react';
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

  const isDark = mounted ? resolvedTheme === 'dark' : false;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative inline-flex items-center justify-center p-2 rounded-full border border-black/10 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.08] text-[#111111] dark:text-[#f4f4f6] hover:bg-black/10 dark:hover:bg-white/15 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-400 group ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {mounted ? (
          <>
            <Sun
              className={`w-4 h-4 transition-all duration-500 transform ${
                isDark
                  ? 'rotate-0 scale-100 opacity-100 text-amber-300'
                  : '-rotate-90 scale-0 opacity-0 absolute'
              }`}
            />
            <Moon
              className={`w-4 h-4 transition-all duration-500 transform ${
                isDark
                  ? 'rotate-90 scale-0 opacity-0 absolute'
                  : 'rotate-0 scale-100 opacity-100 text-neutral-800'
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
