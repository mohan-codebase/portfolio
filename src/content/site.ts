/**
 * All personal content for the portfolio lives in this file.
 *
 * Anything wrapped in [square brackets] is a placeholder: replace it with your
 * own details, or delete the entry. Empty strings ("") hide the related link.
 */
import type { StaticImageData } from "next/image";

import type { LogoName } from "@/components/logo";

import atomHomeDark from "./images/atom-home-dark.png";
import atomHomeAndroidDark from "./images/atom-home-android-dark.png";
import atomHomeAndroidLight from "./images/atom-home-android-light.png";
import atomHomeLight from "./images/atom-home-light.png";
import glint from "./images/glint.png";
import glintEditor from "./images/glint-editor.png";
import glintSettings from "./images/glint-settings.png";
import senseDark from "./images/sense-dark.png";
import senseLight from "./images/sense-light.png";
import ula from "./images/ula.png";

/* -------------------------------------------------------------------------- */
/* Profile                                                                     */
/* -------------------------------------------------------------------------- */

export const profile = {
  name: "Mohan",
  /** Short role used in the header, metadata and structured data. */
  role: "Full-stack developer",
  /** Home page <title> keyword part; the name is added after it. Keep the full title 50–60 characters. */
  seoTitle: "Full-stack Web Developer in Chennai, India",
  location: "Chennai, India",
  timeZone: "Asia/Kolkata",
  timeZoneLabel: "IST",
  email: "mohanavenkatesh.work@gmail.com",
  /** Set to false to hide the “Available for work” indicator. */
  available: true,
  availability: "Open to freelance and full-time roles",
  /** Public URL of the deployed site. Can be overridden with NEXT_PUBLIC_SITE_URL. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mohan-portfolio-nextjs.vercel.app",
  /** Path or URL to a PDF résumé. Leave empty to hide the link. */
  resumeUrl: "",
  /** Meta description: aim for 140–160 characters. */
  description:
    "Mohan is a full-stack developer in Chennai, India, building fast, accessible web apps with Next.js, React, TypeScript, Node.js and MongoDB. Open to work.",
} as const;

export type SocialLink = { label: string; href: string; handle: string };

/** Links with an empty href are hidden. */
export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/mohan-codebase", handle: "mohan-codebase" },
  { label: "LinkedIn", href: "", handle: "[your-linkedin-handle]" },
  { label: "Instagram", href: "https://instagram.com/mohan.code", handle: "@mohan.code" },
];

/* -------------------------------------------------------------------------- */
/* Hero & about                                                                */
/* -------------------------------------------------------------------------- */

export const hero = {
  /** Shown above the headline, followed by `profile.name`. */
  greeting: "Hi, I’m",
  headline: ["Full-stack", "developer"],
  intro: "I build full-stack web apps.",
};

export const about = {
  /** The first sentence is set in full contrast, the rest is muted. */
  lead: "I build apps end to end.",
  body: "Frontend to backend.",
  facts: [
    { label: "Based in", value: "Chennai, India" },
    { label: "Focus", value: "Full-stack web" },
    { label: "Status", value: "Open to work" },
  ],
};

/* -------------------------------------------------------------------------- */
/* Projects                                                                    */
/* -------------------------------------------------------------------------- */

export type ProjectImage = {
  light: StaticImageData;
  /** Optional dark-mode variant, shown when the site is in dark mode. */
  dark?: StaticImageData;
  alt: string;
  /** "cover" fills the frame (websites); "device" centres a portrait screenshot. */
  fit: "cover" | "device";
  /** Short caption, used in a project page's gallery. */
  caption?: string;
};

export type Project = {
  title: string;
  summary: string;
  category: string;
  year: string;
  platforms: string[];
  stack: string[];
  /** Public link. Leave empty for private work. */
  href?: string;
  linkLabel?: string;
  /** Shown instead of a link when the project isn't public. */
  note?: string;
  image?: ProjectImage;
};

/** Featured projects get their own page at /projects/[slug]. */
export type FeaturedProject = Project & {
  slug: string;
  /** One or two sentences that open the project page. */
  overview: string;
  /** Short lines listing what the project does. */
  features: string[];
  /** Extra screenshots shown on the project page. */
  gallery?: ProjectImage[];
  /** Small print at the end of the project page. */
  footnote?: string;
  /** Optional <title> text when "Name: summary" would be too long or short (aim for 40–52 characters; the name is added). */
  seoTitle?: string;
};

/** Featured projects are shown large with imagery, in this order. */
export const featuredProjects: FeaturedProject[] = [
  {
    slug: "glint",
    seoTitle: "Glint: macOS window snapping from the menu bar",
    title: "Glint",
    summary: "Window snapping from the menu bar.",
    overview:
      "A menu-bar app that snaps windows into place. Drag a window to an edge, or pick a zone from the menu bar.",
    features: [
      "Drag a window to an edge or corner to snap it",
      "Pick fill, columns, rows or quarters from the menu bar",
      "Draw your own layouts on a grid",
      "Set the gap between windows",
      "Hold Shift to move a window freely",
    ],
    category: "macOS app",
    year: "2026",
    platforms: ["macOS 13 or later"],
    stack: [],
    href: "https://github.com/mohan-codebase/glint",
    linkLabel: "View source",
    image: {
      light: glint,
      alt: "Glint menu-bar picker with fill, columns, rows and quarters zones",
      fit: "device",
    },
    gallery: [
      { light: glintSettings, alt: "Glint settings window", fit: "device", caption: "Settings" },
      { light: glintEditor, alt: "Glint custom layout editor grid", fit: "device", caption: "Layout editor" },
    ],
  },
  {
    slug: "ula",
    title: "Ula",
    summary: "Tamil Nadu travel guide with a trip planner.",
    overview: "A travel showcase for Tamil Nadu, with destination guides, detailed trips and local stories.",
    features: [
      "Six destination guides and three detailed trips",
      "A trip planner that saves your choices and downloads a guide",
      "Journal stories and a practical travel guide",
      "Readable without JavaScript, with reduced-motion support",
    ],
    category: "Website",
    year: "2026",
    platforms: ["Web"],
    stack: ["Astro", "TypeScript", "GSAP", "Lenis"],
    href: "https://elsewhere-jet.vercel.app/",
    linkLabel: "Visit site",
    image: {
      light: ula,
      alt: "Ula homepage",
      fit: "cover",
    },
  },
  {
    slug: "sense",
    title: "Sense",
    summary: "Live CPU, memory, battery and network stats.",
    overview: "A lightweight system monitor that keeps your device’s health in one glanceable place on Mac and iPhone.",
    features: [
      "Live CPU, GPU, memory and storage",
      "Network, thermal and battery readings",
      "Short history charts",
      "Runs locally and sends nothing anywhere",
    ],
    category: "macOS app",
    year: "2026",
    platforms: ["macOS", "iOS"],
    stack: [],
    note: "Private",
    image: {
      light: senseLight,
      dark: senseDark,
      alt: "Sense system stats",
      fit: "device",
    },
  },
  {
    slug: "atom-home",
    seoTitle: "Atom Home: Smart fan control over local Wi‑Fi",
    title: "Atom Home",
    summary: "Controls a smart fan over local Wi‑Fi. No cloud.",
    overview: "Control an Atomberg Renesa Elite fan from your own devices, without an account or the cloud.",
    features: [
      "Power, speed, light and sleep mode",
      "Timers and brightness",
      "Talks to the fan directly over local Wi‑Fi",
      "Several devices can control one fan at once",
    ],
    category: "Cross-platform app",
    year: "2026",
    platforms: ["iOS", "Android", "macOS", "Windows"],
    stack: [],
    note: "Private",
    image: {
      light: atomHomeLight,
      dark: atomHomeDark,
      alt: "Atom Home on iPhone",
      fit: "device",
    },
    gallery: [
      {
        light: atomHomeAndroidLight,
        dark: atomHomeAndroidDark,
        alt: "Atom Home on Android showing fan speed 2",
        fit: "device",
        caption: "Android",
      },
    ],
    footnote: "Unofficial project, not affiliated with Atomberg.",
  },
];

/** Looks up a featured project by its page slug. */
export function getProject(slug: string) {
  return featuredProjects.find((project) => project.slug === slug);
}

/** The project after this one, wrapping round to the first. */
export function getNextProject(slug: string) {
  const index = featuredProjects.findIndex((project) => project.slug === slug);
  return featuredProjects[(index + 1) % featuredProjects.length];
}

/** The rest of the work, shown as a compact index. */
export const moreProjects: Project[] = [
  {
    title: "Roamers",
    summary: "Group travel booking website.",
    category: "Website",
    year: "2025",
    platforms: ["Web"],
    stack: [],
    href: "https://www.roamers.in/",
    linkLabel: "Visit site",
  },
  {
    title: "TokenBar",
    summary: "AI usage limits in the menu bar.",
    category: "macOS app",
    year: "2026",
    platforms: ["macOS"],
    stack: [],
    note: "Private",
  },
  {
    title: "Isaiora",
    summary: "Offline music player with FLAC support.",
    category: "Cross-platform app",
    year: "2026",
    platforms: ["Android", "iOS", "macOS", "Windows"],
    stack: [],
    note: "Private",
  },
  {
    title: "Portable Browser",
    summary: "Minimal browser with ad blocking.",
    category: "Browser",
    year: "2026",
    platforms: ["Android", "macOS"],
    stack: [],
    note: "Private",
  },
  {
    title: "Attendance App",
    summary: "Team attendance tracker.",
    category: "Full-stack app",
    year: "2025",
    platforms: ["Web"],
    stack: ["React", "Express", "MongoDB"],
    href: "https://github.com/mohan-codebase/attendance-app",
    linkLabel: "Source",
  },
];

/* -------------------------------------------------------------------------- */
/* Skills                                                                      */
/* -------------------------------------------------------------------------- */

export type Tech = { name: string; logo: LogoName };

/** Grouped technologies, each shown with its logo. Logos live in components/logo.tsx. */
export const skills: { group: string; items: Tech[] }[] = [
  {
    group: "Languages",
    items: [
      { name: "TypeScript", logo: "typescript" },
      { name: "JavaScript", logo: "javascript" },
      { name: "HTML", logo: "html" },
      { name: "CSS", logo: "css" },
    ],
  },
  {
    group: "Web",
    items: [
      { name: "React", logo: "react" },
      { name: "Next.js", logo: "nextjs" },
      { name: "Tailwind CSS", logo: "tailwind" },
      { name: "GSAP", logo: "gsap" },
      { name: "Bootstrap", logo: "bootstrap" },
    ],
  },
  {
    group: "Backend & data",
    items: [
      { name: "Node.js", logo: "node" },
      { name: "Express", logo: "express" },
      { name: "MongoDB", logo: "mongodb" },
      { name: "Supabase", logo: "supabase" },
    ],
  },
  {
    group: "Tooling",
    items: [
      { name: "Git", logo: "git" },
      { name: "Vercel", logo: "vercel" },
    ],
  },
  {
    group: "AI tools",
    items: [
      { name: "Claude", logo: "claude" },
      { name: "Codex", logo: "codex" },
      { name: "Antigravity", logo: "antigravity" },
      { name: "Copilot", logo: "copilot" },
      { name: "Cursor", logo: "cursor" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Experience                                                                  */
/* -------------------------------------------------------------------------- */

export type Experience = {
  /** Optional, e.g. "2024 — 2025". */
  period?: string;
  role: string;
  organisation: string;
  description: string;
  /** Optional link to the organisation. */
  href?: string;
};

export const experience: Experience[] = [
  {
    period: "2025 — Now",
    role: "Full-stack developer",
    organisation: "Independent",
    description: "Full-stack web apps.",
  },
  {
    role: "Web development",
    organisation: "Schools of Techies",
    description: "Built the Attendance App in a team.",
  },
];
