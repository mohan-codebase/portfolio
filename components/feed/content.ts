export const contactEmail = 'mohanavenkatesh.work@gmail.com';

export const socials = [
  { label: 'GitHub', handle: '@mohan-codebase', href: 'https://github.com/mohan-codebase' },
  { label: 'Instagram', handle: '@mohan.code', href: 'https://www.instagram.com/mohan.code/' },
  { label: 'LinkedIn', handle: 'mohanavenkatesh', href: 'https://www.linkedin.com/in/mohanavenkatesh' },
];

export const approach = [
  { number: '01', title: 'An eye for interfaces.', description: 'Thoughtful layouts, clear typography, and the small interactions that make a website feel right.' },
  { number: '02', title: 'The code behind them.', description: 'Responsive frontends and full-stack applications, built with React, Next.js, and Supabase.' },
];

export const principles = [
  { title: 'Clarity first', description: 'Readable content, considered layouts, and straightforward interactions.' },
  { title: 'Care in the details', description: 'Responsive layouts, accessibility, and performance from the start.' },
  { title: 'Built to evolve', description: 'Clean components and maintainable architecture that keep improving after launch.' },
];

export const sections = [
  { id: 'about', label: 'About', number: '01' },
  { id: 'work', label: 'Work', number: '02' },
  { id: 'contact', label: 'Contact', number: '03' },
] as const;

export type SectionId = (typeof sections)[number]['id'];
