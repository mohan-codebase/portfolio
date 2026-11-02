export const contactEmail = 'mohanavenkatesh.work@gmail.com';

export const socials = [
  { label: 'GitHub', handle: '@mohan-codebase', href: 'https://github.com/mohan-codebase' },
  { label: 'Instagram', handle: '@mohan.code', href: 'https://www.instagram.com/mohan.code/' },
  { label: 'LinkedIn', handle: 'mohanavenkatesh', href: 'https://www.linkedin.com/in/mohanavenkatesh' },
];

export const approach = [
  { number: '01', title: 'An eye for interfaces.', description: 'Clear layouts, good type, small details.' },
  { number: '02', title: 'The code behind them.', description: 'React, Next.js and Supabase.' },
];

export const principles = [
  { title: 'Clarity first', description: 'Simple to read and use.' },
  { title: 'Care in the details', description: 'Responsive, accessible, fast.' },
  { title: 'Built to evolve', description: 'Clean code that is easy to grow.' },
];

export const sections = [
  { id: 'about', label: 'About', number: '01' },
  { id: 'work', label: 'Work', number: '02' },
  { id: 'contact', label: 'Contact', number: '03' },
] as const;

export type SectionId = (typeof sections)[number]['id'];
