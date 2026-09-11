export type Skill = {
  name: string;
  /** Two-letter "element" symbol shown on the hover preview. */
  symbol: string;
  description: string;
  /** File name shown in the preview's title bar. */
  file: string;
  code: string;
};

export const skills: Skill[] = [
  {
    name: 'HTML / CSS',
    symbol: 'Hc',
    description: 'Semantic markup, Grid and Flexbox layouts, fluid type and responsive systems.',
    file: 'hero.module.css',
    code: `.title {
  font-size: clamp(3rem, 12vw, 13rem);
  letter-spacing: -0.045em;
  text-wrap: balance;
}`,
  },
  {
    name: 'JavaScript',
    symbol: 'Js',
    description: 'DOM, events and browser APIs — the language underneath everything I build.',
    file: 'reveal.js',
    code: `const io = new IntersectionObserver((entries) => {
  for (const entry of entries)
    if (entry.isIntersecting) reveal(entry.target);
});`,
  },
  {
    name: 'TypeScript',
    symbol: 'Ts',
    description: 'Typed props and data models that make components safer to change.',
    file: 'projects.ts',
    code: `type Project = {
  title: string;
  year: string;
  stack: string[];
};`,
  },
  {
    name: 'React',
    symbol: 'Re',
    description: 'Component-driven interfaces, state and composition — used on Techie Nutpam and PresentSir.',
    file: 'Contact.tsx',
    code: `<Magnetic strength={0.3}>
  <a href={mailto}>
    Get in touch
  </a>
</Magnetic>`,
  },
  {
    name: 'Next.js',
    symbol: 'Nx',
    description: 'App Router, server components, and image & font optimisation — this site runs on it.',
    file: 'page.tsx',
    code: `export default function Page() {
  return (
    <main>
      <Hero />
      <Work projects={featured} />
    </main>
  );
}`,
  },
  {
    name: 'Tailwind CSS',
    symbol: 'Tw',
    description: 'Utility-first styling for fast, consistent UI work.',
    file: 'Button.tsx',
    code: `<a className="inline-flex items-center
  gap-2 border px-5 py-3
  transition-colors
  hover:bg-black hover:text-white">`,
  },
  {
    name: 'Git',
    symbol: 'Gt',
    description: 'Branches, small commits and GitHub-based workflows.',
    file: 'terminal',
    code: `git switch -c feat/hero-motion
git commit -m "feat: refine hero reveal"
git push -u origin feat/hero-motion`,
  },
];
