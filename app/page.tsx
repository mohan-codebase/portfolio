import { pageMetadata, siteTitle, siteDescription } from '@/lib/metadata';
import { projects } from '@/data/projects';
import ContactSection from '@/components/ContactSection';
import MobileBars from '@/components/feed/MobileBars';
import DesktopSidebar from '@/components/feed/DesktopSidebar';
import ProfilePost from '@/components/feed/ProfilePost';
import StatementPost from '@/components/feed/StatementPost';
import ServicesPost from '@/components/feed/ServicesPost';
import StackPost from '@/components/feed/StackPost';
import ProjectPost from '@/components/feed/ProjectPost';
import ContactPost from '@/components/feed/ContactPost';

export const metadata = pageMetadata(siteTitle, siteDescription, '/');

/**
 * The whole portfolio on one page. Under the lg breakpoint it reads as a
 * full-screen, snap-scrolling feed; on large screens it becomes a sticky
 * profile column beside an ordinary scrolling page.
 */
export default function Home() {
  return (
    <div id="top" className="feed-page">
      <MobileBars />
      <div className="mx-auto max-w-[1600px] lg:grid lg:grid-cols-[minmax(320px,26rem)_minmax(0,1fr)]">
        <DesktopSidebar />

        <div className="min-w-0 lg:px-10 lg:pb-10 lg:pt-10 xl:px-14">
          <ProfilePost />

          <section id="about" aria-label="About" className="lg:space-y-16 lg:pb-24">
            <StatementPost />
            <ServicesPost />
            <StackPost />
          </section>

          <section id="work" aria-labelledby="work-title" className="lg:border-t lg:border-black/10 lg:py-24 dark:lg:border-white/10">
            <div className="mb-10 hidden items-end justify-between gap-6 lg:flex">
              <div>
                <p className="section-kicker mb-3">/ Selected work</p>
                <h2 id="work-title" className="section-title text-5xl font-semibold">Things I’ve designed and built.</h2>
              </div>
              <p className="section-kicker">{projects.length} projects</p>
            </div>
            <h2 className="sr-only lg:hidden">Selected work</h2>
            <div className="lg:grid lg:grid-cols-2 lg:gap-6 2xl:grid-cols-3">
              {projects.map((project, index) => (
                <ProjectPost key={project.slug} project={project} position={index + 1} total={projects.length} />
              ))}
            </div>
          </section>

          <section id="contact" aria-label="Contact">
            <ContactPost />
            <div className="hidden lg:block">
              <ContactSection className="border-t border-black/10 py-24 dark:border-white/10" />
              <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-black/10 pt-6 text-xs text-black/50 dark:border-white/10 dark:text-white/50">
                <p>© {new Date().getFullYear()} Mohan. All rights reserved.</p>
                <p>Designed and developed by Mohan.</p>
              </footer>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
