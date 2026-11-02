import { ArrowUpRight } from 'lucide-react';
import { githubProfile } from '@/data/github';
import { PostCard, PostHeader, PostSlot } from './Post';
import { approach, principles } from './content';

/** How I work and what I work with. */
export default function StackPost() {
  return (
    <PostSlot id="stack">
      <PostCard>
        <PostHeader subtitle="How I work" className="lg:hidden" />
        <div className="grid gap-8 px-5 pb-6 pt-2 lg:grid-cols-2 lg:gap-12 lg:p-10">
          <div>
            <p className="section-kicker mb-5 hidden lg:block">/ Where design meets development</p>
            {approach.map(({ title, description }, index) => (
              <div key={title} className={index === 0 ? 'pb-5' : 'border-t border-black/10 pt-5 dark:border-white/10'}>
                <div>
                  <h3 className="text-xl font-medium tracking-tight lg:text-2xl">{title}</h3>
                </div>
                <p className="mt-2 text-sm leading-6 text-black/65 dark:text-white/65">{description}</p>
              </div>
            ))}
            <ul className="mt-6 hidden gap-6 border-t border-black/10 pt-6 dark:border-white/10 lg:grid lg:grid-cols-3">
              {principles.map((item) => (
                <li key={item.title}>
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-black/60 dark:text-white/60">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="section-kicker mb-4">Tools I build with</p>
            <ul className="flex flex-wrap gap-2">
              {githubProfile.technologies.map((technology) => (
                <li key={technology} className="rounded-full border border-black/15 px-3.5 py-1.5 text-sm dark:border-white/15">{technology}</li>
              ))}
            </ul>
            <a href={githubProfile.url} target="_blank" rel="noopener noreferrer" className="group mt-6 flex items-center justify-between gap-4 rounded-2xl border border-black/10 p-4 transition-colors hover:bg-black/[0.03] dark:border-white/10 dark:hover:bg-white/[0.05]">
              <span>
                <span className="block text-sm font-medium">Building in public</span>
                <span className="mt-0.5 block text-xs text-black/55 dark:text-white/55">@{githubProfile.username} on GitHub</span>
              </span>
              <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </PostCard>
    </PostSlot>
  );
}
