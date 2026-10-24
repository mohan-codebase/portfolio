import StructuredData from '@/components/StructuredData';
import { pageMetadata } from '@/lib/metadata';
import Link from 'next/link';
import PageIntro from '@/components/PageIntro';
import { githubProfile } from '@/data/github';

export const metadata = pageMetadata('About', 'Meet Mohan, a UI designer and full-stack developer in Chennai, bringing thoughtful interfaces and practical code together.', '/about');

const principles = [
  ['Clarity first', 'Interfaces should make the next step feel natural. I focus on readable content, considered layouts, and straightforward interactions.'],
  ['Care in the details', 'Responsive layouts, accessibility, and performance are part of the work from the start.'],
  ['Built to evolve', 'Clean components and maintainable architecture make it easier to keep improving a product after launch.'],
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-20 pt-28 sm:px-8 sm:pt-40">
      <StructuredData title="About Mohan" path="/about" profile />
      <PageIntro eyebrow="Behind the work" title="About Mohan" count="Chennai, India" description="A full-stack developer with an eye for design. I turn ideas into thoughtful, accessible experiences for the web." />
      <section className="grid gap-8 border-b border-black/10 pb-16 dark:border-white/10 lg:grid-cols-2 lg:gap-20">
        <h2 className="section-title max-w-lg text-4xl font-semibold sm:text-6xl">Design sensibility.<br /><span className="accent-text">Developer mindset.</span></h2>
        <div className="space-y-6 text-lg leading-relaxed text-black/70 dark:text-white/70">
          <p>I’m Mohan, based in Chennai, India. I work across responsive interfaces, web applications, and the systems that support them.</p>
          <p>I enjoy bringing design and engineering together: shaping how an experience feels while keeping the code clear, fast, and practical to maintain.</p>
          <p>My work spans bespoke websites, full-stack products, and frontend architecture. Whatever the scope, I care about making the result useful and easy to use.</p>
          <Link href="/work" className="inline-block border-b border-current pb-1 font-medium text-[#111111]/70 dark:text-[#f4f4f6]/70">Explore my work ↗</Link>
        </div>
      </section>
      <section className="mt-12 rounded-3xl border border-black/10 p-8 dark:border-white/10 sm:p-12">
        <p className="section-kicker mb-4">Building in public</p>
        <h2 className="mb-5 text-3xl font-semibold tracking-tight">From frontend studies to full-stack applications.</h2>
        <p className="max-w-3xl leading-relaxed text-black/65 dark:text-white/65">My public work includes Habits, a Next.js and Supabase habit tracker, an attendance app built collaboratively with Schools of Techies students, and responsive HTML, CSS, and Bootstrap projects.</p>
        <ul className="my-6 flex flex-wrap gap-2">{githubProfile.technologies.map((technology) => <li key={technology} className="rounded-full border border-black/15 px-4 py-2 text-sm dark:border-white/15">{technology}</li>)}</ul>
        <a href={githubProfile.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Explore @{githubProfile.username} on GitHub ↗</a>
      </section>
      <section className="py-16 sm:py-24">
        <p className="section-kicker mb-5">How I approach the work</p>
        <div className="grid gap-8 md:grid-cols-3">
          {principles.map(([title, description], index) => (
            <div key={title} className="border-t border-black/15 pt-6 dark:border-white/15">
              <span className="section-kicker">0{index + 1}</span>
              <h2 className="mb-4 mt-6 text-2xl font-semibold tracking-tight">{title}</h2>
              <p className="leading-relaxed text-black/65 dark:text-white/65">{description}</p>
            </div>
          ))}
        </div>
      </section>
      <Link href="/services" className="inline-flex rounded-full bg-[#111111] px-7 py-4 font-medium text-white hover:bg-[#333333] dark:bg-[#f4f4f6] dark:text-[#111111] dark:hover:bg-white">See how I can help ↗</Link>
    </div>
  );
}
