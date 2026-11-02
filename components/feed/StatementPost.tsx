import { PostCard, PostHeader, PostSlot } from './Post';

/** The introduction: a text post on mobile, the opening statement on desktop. */
export default function StatementPost() {
  return (
    <PostSlot id="about-story">
      <PostCard className="lg:rounded-none lg:border-0 lg:bg-transparent lg:shadow-none dark:lg:bg-transparent">
        <PostHeader subtitle="A little about me" className="lg:hidden" />
        <div className="hero-name-panel relative overflow-hidden px-6 pb-8 pt-10 lg:rounded-[2.5rem] lg:px-14 lg:pb-16 lg:pt-24 xl:rounded-[3.5rem]">
          <div aria-hidden="true" className="hero-name-grid" />
          <p className="section-kicker relative mb-6 hidden lg:block">/ Hello, I’m Mohan</p>
          <h2 className="section-title relative text-[clamp(2.4rem,11vw,3.5rem)] font-semibold lg:text-[clamp(3.5rem,6vw,6.5rem)]">
            Drawn to design.<br />
            <span className="text-black/45 dark:text-white/45">Driven to build.</span>
          </h2>
          <p className="relative mt-6 max-w-xl text-base leading-relaxed text-black/70 dark:text-white/70 lg:mt-10 lg:text-xl">
            My interest starts with UI: how a page looks, moves, and feels. Full-stack development lets me bring those ideas to life, from the first screen to the systems behind it.
          </p>
        </div>
        <p className="px-4 py-4 text-sm leading-relaxed lg:hidden">
          <span className="font-semibold">mohan</span>{' '}
          <span className="text-black/70 dark:text-white/70">Based in Chennai, working across responsive interfaces, web applications, and the systems that support them.</span>
        </p>
      </PostCard>
    </PostSlot>
  );
}
