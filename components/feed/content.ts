export const contactEmail = 'mohanavenkatesh.work@gmail.com';

export const socials = [
  { label: 'GitHub', handle: '@mohan-codebase', href: 'https://github.com/mohan-codebase' },
  { label: 'Instagram', handle: '@mohan.code', href: 'https://www.instagram.com/mohan.code/' },
  { label: 'LinkedIn', handle: 'mohanavenkatesh', href: 'https://www.linkedin.com/in/mohanavenkatesh' },
];

export const approach = [
  { title: 'An eye for interfaces.', description: 'Clear layouts, good type, small details.' },
  { title: 'The code behind them.', description: 'React, Next.js and Supabase.' },
];

export const principles = [
  { title: 'Clarity first', description: 'Simple to read and use.' },
  { title: 'Care in the details', description: 'Responsive, accessible, fast.' },
  { title: 'Built to evolve', description: 'Clean code that is easy to grow.' },
];

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
] as const;

export type SectionId = (typeof sections)[number]['id'];
