"use client";

import { useEffect, useSyncExternalStore } from "react";

import { buttonClasses } from "./button";

const STORAGE_KEY = "theme";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

const getSnapshot = () => document.documentElement.classList.contains("dark");
const getServerSnapshot = () => null;

function applyTheme(dark: boolean, persist: boolean) {
  const update = () => {
    document.documentElement.classList.toggle("dark", dark);
    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
      } catch {
        // Storage can be unavailable (private mode); the theme still applies.
      }
    }
  };

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canAnimate =
    persist &&
    !reduceMotion &&
    document.visibilityState === "visible" &&
    typeof document.startViewTransition === "function";

  if (canAnimate) {
    const transition = document.startViewTransition(update);
    // The browser can still skip the cross-fade (e.g. the tab is hidden mid-way).
    // The theme change itself still applies, so the rejection is safe to ignore.
    transition.ready.catch(() => {});
    transition.finished.catch(() => {});
  } else {
    update();
  }
}

/** Light / dark switch. Follows the system theme until the visitor picks one. */
export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = (event: MediaQueryListEvent) => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem(STORAGE_KEY);
      } catch {}
      if (!stored) applyTheme(event.matches, false);
    };
    media.addEventListener("change", onSystemChange);
    return () => media.removeEventListener("change", onSystemChange);
  }, []);

  const label = isDark === null ? "Toggle colour theme" : isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={() => applyTheme(!getSnapshot(), true)}
      aria-label={label}
      title={label}
      className={buttonClasses({ variant: "secondary", size: "sm", className: "gap-1.5 pr-3.5 pl-3" })}
    >
      {/* The `dark` class is set before paint, so CSS picks the right icon and word with no flash. */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        aria-hidden
        className="transition-transform duration-700 ease-out-expo group-hover/button:rotate-45 dark:hidden"
      >
        <circle cx="8" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="1.25" />
        <path
          d="M8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1.06 1.06M11.54 11.54l1.06 1.06M3.4 12.6l1.06-1.06M11.54 4.46l1.06-1.06"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </svg>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        aria-hidden
        className="hidden transition-transform duration-700 ease-out-expo group-hover/button:-rotate-12 dark:block"
      >
        <path
          d="M13.5 9.6A5.75 5.75 0 0 1 6.4 2.5a5.75 5.75 0 1 0 7.1 7.1Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
      </svg>
      <span className="dark:hidden">Light</span>
      <span className="hidden dark:inline">Dark</span>
    </button>
  );
}
