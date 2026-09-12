import type { StaticImageData } from 'next/image';

import biteDesktop from '@/assets/work/bite-desktop.webp';
import biteMobile from '@/assets/work/bite-mobile.webp';
import biteShopMobile from '@/assets/work/bite-shop-mobile.webp';
import botanical from '@/assets/work/botanical.webp';
import medical from '@/assets/work/medical.webp';
import presentsirDarkDesktop from '@/assets/work/presentsir-dark-desktop.webp';
import presentsirDarkMobile from '@/assets/work/presentsir-dark-mobile.webp';
import presentsirDesktop from '@/assets/work/presentsir-desktop.webp';
import presentsirMobile from '@/assets/work/presentsir-mobile.webp';
import spotify from '@/assets/work/spotify.webp';

export type Shot = { src: StaticImageData; alt: string };

export type FeaturedProject = {
  slug: string;
  title: string;
  year: string;
  category: string;
  role: string;
  summary: string;
  /** Short points restated from the summary, listed on the case study page. */
  highlights: string[];
  /** Who else worked on it, for team projects. */
  team?: string;
  stack: string[];
  links: { live: string; code?: string };
  /** Hostname printed in the browser frame's address bar. */
  domain: string;
  /** Editorial caption printed on the artboard. */
  caption: string;
  /** Artboard colour behind the screenshots, and whether it reads as dark or light. */
  tone: { background: string; theme: 'dark' | 'light' };
  /** Each project gets its own artboard composition. */
  layout: 'wide' | 'duo' | 'crop';
  shots: { desktop: Shot; desktopAlt?: Shot; mobile: Shot; mobileAlt?: Shot };
  /** `desktop` is a full-page capture that scrolls inside its frame on hover. */
  scrollable?: boolean;
};

export type ArchiveProject = {
  title: string;
  type: string;
  stack: string[];
  year: string;
  href: string;
  image?: Shot;
  /** Links to this very site. */
  current?: boolean;
};

const github = 'https://github.com/mohan-codebase';

/** Featured projects each get a case study at /work/[slug]. */
export const featured: FeaturedProject[] = [
  {
    slug: 'presentsir',
    title: 'PresentSir',
    year: '2025',
    category: 'Web app — team project',
    role: 'Developer in a student team',
    summary:
      'Attendance management for institutes — track classes, mark attendance and generate reports. Built by a team of UI/UX designers, graphic designers, content creators and developers from Schools of Techies.',
    highlights: ['Track classes', 'Mark attendance', 'Generate reports', 'Light and dark themes'],
    team: 'UI/UX designers, graphic designers, content creators and developers from Schools of Techies',
    stack: ['React', 'Bootstrap', 'Express', 'MongoDB'],
    links: { live: 'https://attendance-app-black-omega.vercel.app', code: `${github}/attendance-app` },
    domain: 'attendance-app-black-omega.vercel.app',
    caption: 'Landing page — light & dark themes',
    tone: { background: '#dcd7e5', theme: 'light' },
    layout: 'duo',
    shots: {
      desktop: { src: presentsirDesktop, alt: 'PresentSir landing page in light mode: “Smart attendance for hassle-free mentoring”.' },
      desktopAlt: { src: presentsirDarkDesktop, alt: 'The same PresentSir landing page in dark mode.' },
      mobile: { src: presentsirMobile, alt: 'PresentSir on a phone in light mode.' },
      mobileAlt: { src: presentsirDarkMobile, alt: 'PresentSir on a phone in dark mode.' },
    },
  },
  {
    slug: 'bite',
    title: 'Bite',
    year: '2024',
    category: 'Storefront study',
    role: 'Design & build',
    summary:
      'A six-page storefront study for a plastic-free toothpaste brand — home, shop, about, sign-up, login and payment — built with Bootstrap 5 to practise responsive layouts and reusable UI patterns.',
    highlights: ['Six pages: home, shop, about, sign-up, login and payment', 'Responsive layouts', 'Reusable UI patterns'],
    stack: ['HTML', 'CSS', 'Bootstrap 5'],
    links: { live: 'https://bitepaste.netlify.app/', code: `${github}/bite-paste` },
    domain: 'bitepaste.netlify.app',
    caption: 'Home & shop — desktop and mobile',
    tone: { background: '#e4dacb', theme: 'light' },
    layout: 'crop',
    scrollable: true,
    shots: {
      desktop: { src: biteDesktop, alt: 'Bite homepage on desktop: “It’s time to brush better.” over a photo of toothpaste tablets.' },
      mobile: { src: biteMobile, alt: 'Bite homepage on a phone.' },
      mobileAlt: { src: biteShopMobile, alt: 'Bite shop page on a phone, with category filters.' },
    },
  },
];

export const archive: ArchiveProject[] = [
  {
    title: 'Spotify Premium',
    type: 'Page clone',
    stack: ['HTML', 'CSS'],
    year: '2024',
    href: 'https://spotify-project-clone.netlify.app/',
    image: { src: spotify, alt: 'Spotify Premium page clone.' },
  },
  {
    title: 'Botanical',
    type: 'Plant store UI',
    stack: ['HTML', 'Bootstrap'],
    year: '2024',
    href: 'https://plant-shop-website1.netlify.app/',
    image: { src: botanical, alt: 'Botanical plant store homepage.' },
  },
  {
    title: 'Medical & Treatment',
    type: 'First project',
    stack: ['HTML', 'CSS'],
    year: '2024',
    href: 'https://medical-treatment.netlify.app/',
    image: { src: medical, alt: 'Medical & Treatment landing page.' },
  },
  {
    title: 'Portfolio',
    type: 'This website',
    stack: ['Next.js', 'TypeScript'],
    year: '2026',
    href: '/',
    current: true,
  },
];

/** Every project as one card, for the work index and the home reel. */
export type ProjectCard = {
  id: string;
  title: string;
  type: string;
  year: string;
  stack: string[];
  image?: Shot;
  href: string;
  /** Opens a case study on this site rather than the live demo. */
  caseStudy: boolean;
  current?: boolean;
};

export const projectCards: ProjectCard[] = [
  ...featured.map((project) => ({
    id: project.slug,
    title: project.title,
    type: project.category,
    year: project.year,
    stack: project.stack,
    image: project.shots.desktop,
    href: `/work/${project.slug}`,
    caseStudy: true,
  })),
  ...archive.map((project) => ({
    id: project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title: project.title,
    type: project.type,
    year: project.year,
    stack: project.stack,
    image: project.image,
    href: project.href,
    caseStudy: false,
    current: project.current,
  })),
];

/** Close variants share a filter: "Bootstrap 5" is Bootstrap, and HTML and CSS go together. */
const stackGroups: Record<string, string> = { HTML: 'HTML & CSS', CSS: 'HTML & CSS', 'Bootstrap 5': 'Bootstrap' };

export const stackGroup = (tech: string) => stackGroups[tech] ?? tech;

/** Filters offered on the work page, in this order. */
export const stackFilters = ['React', 'Next.js', 'Bootstrap', 'HTML & CSS'];

export const getCase = (slug: string) => featured.find((project) => project.slug === slug);

export function nextCase(slug: string) {
  const index = featured.findIndex((project) => project.slug === slug);
  return featured[(index + 1) % featured.length];
}

export const githubProfile = github;
