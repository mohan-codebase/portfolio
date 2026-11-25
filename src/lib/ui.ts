/** Shared layout primitives. */
export const container = "mx-auto w-full max-w-[90rem] px-5 sm:px-8 lg:px-12";

/*
 * Layout system. Everything sits on one 12-column grid with two alignment lines:
 * the left edge (titles, large text, labels) and column 4 (row content).
 * Fact strips split into four equal columns, which land on columns 1, 4, 7 and 10.
 */

/** Vertical rhythm, used by every section and page. */
export const space = {
  /** Top and bottom padding of a section. */
  section: "py-12 sm:py-16 lg:py-20",
  /** From a section title to its content. */
  afterTitle: "mt-8 sm:mt-10 lg:mt-12",
  /** Between blocks inside a section. */
  block: "mt-12 sm:mt-16 lg:mt-20",
};

/** A row: a small label on the left edge, content from column 4 (stacked on phones). */
export const row = "grid gap-x-6 gap-y-2 md:grid-cols-12 md:items-baseline";
export const rowLabel = "label text-muted md:col-span-3";
export const rowContent = "md:col-span-9";

/** A strip of label-over-value facts in four equal columns (two on phones). */
export const factStrip = "grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4";

/** Joins class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const navItems = [
  // "top" is the hero section, so Home scrolls to the top (or goes to "/" from other pages).
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

/** Inline style that staggers an animation by index (see `--i` in globals.css). */
export function stagger(index: number) {
  return { "--i": index } as import("react").CSSProperties;
}

/** Fired by the mobile menu (detail: true/false) so smooth scrolling pauses while it is open. */
export const SCROLL_LOCK_EVENT = "portfolio:scroll-lock";
