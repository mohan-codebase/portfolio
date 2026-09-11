export type Milestone = {
  year: string;
  title: string;
  body: string;
  tags: string[];
  current?: boolean;
};

/** Milestones taken from public GitHub history — edit freely. */
export const experience: Milestone[] = [
  {
    year: '2026',
    title: 'Fullstack development',
    body: 'Building real-world web applications, learning modern fullstack architecture and improving UI implementation — including this editorial Next.js portfolio.',
    tags: ['React', 'Next.js', 'Tailwind CSS'],
    current: true,
  },
  {
    year: '2025',
    title: 'First team project',
    body: 'Built PresentSir, an attendance app, with a cross-disciplinary team of students at Schools of Techies — alongside UI/UX designers, graphic designers and content creators.',
    tags: ['React', 'Express', 'MongoDB'],
  },
  {
    year: '2024',
    title: 'Started building for the web',
    body: 'First HTML and CSS projects: a medical landing page, a plant store, a Spotify page clone and a Bootstrap storefront — rebuilding real layouts to learn how the web fits together.',
    tags: ['HTML', 'CSS', 'Bootstrap'],
  },
];
