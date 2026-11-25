import Link from "next/link";

import { featuredProjects, moreProjects, type FeaturedProject as Featured, type Project } from "@/content/site";
import { cn, space, stagger } from "@/lib/ui";

import { buttonClasses, ButtonLabel } from "../button";
import { ArrowUpRight } from "../icons";
import { ProjectVisual } from "../project-visual";
import { Section } from "../section";

/**
 * Title that becomes a full-card link. Hover motion goes on the inner text
 * (`textClassName`), never on the heading: a transformed ancestor would trap the
 * link's full-card hit area inside it.
 */
function ProjectTitle({
  title,
  href,
  external,
  className,
  textClassName,
  as: Heading = "h3",
}: {
  title: string;
  href?: string;
  external?: boolean;
  className: string;
  textClassName?: string;
  as?: "h3" | "h4";
}) {
  const text = <span className={cn("inline-block", textClassName)}>{title}</span>;
  if (!href) return <Heading className={className}>{text}</Heading>;

  const linkClass =
    "after:absolute after:inset-0 after:z-10 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-fg";

  return (
    <Heading className={className}>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {text}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ) : (
        <Link href={href} className={linkClass}>
          {text}
        </Link>
      )}
    </Heading>
  );
}

/** Full-width showcase: the screenshot, then centred details underneath. */
function FeaturedProject({ project, index }: { project: Featured; index: number }) {
  const isDevice = project.image?.fit === "device";
  return (
    <article className="group relative mx-auto max-w-6xl">
      <ProjectVisual
        image={project.image}
        priority={index === 0}
        sizes={isDevice ? "(min-width: 1024px) 420px, 60vw" : "(min-width: 1200px) 1152px, 100vw"}
        frameClassName={isDevice ? "aspect-[4/5] items-end sm:aspect-[16/9]" : "aspect-[16/9]"}
      />

      <div className="mt-8 flex flex-col items-center sm:mt-10" data-reveal>
        <p className="label text-muted">
          {project.category}, {project.year}
        </p>
        <ProjectTitle
          title={project.title}
          href={`/projects/${project.slug}`}
          className="mt-3 text-[clamp(2rem,3.4vw,3rem)] leading-none font-semibold tracking-[-0.04em]"
        />
        <p className="mt-4 max-w-[40ch] text-[0.9375rem] leading-relaxed text-pretty text-muted sm:text-base">
          {project.summary}
        </p>
        {/* Looks like a button; the whole card is the link. */}
        <span
          aria-hidden
          className={buttonClasses({
            variant: "secondary",
            size: "sm",
            className: "mt-6 group-hover:bg-surface-strong",
          })}
        >
          <ButtonLabel card>View project</ButtonLabel>
        </span>
      </div>
    </article>
  );
}

/** Compact row in a centred column: name and summary left, details and link right. */
function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <li
      data-reveal
      style={stagger(index)}
      className="group relative flex items-baseline justify-between gap-6 text-left"
    >
      <div className="min-w-0">
        <ProjectTitle
          title={project.title}
          href={project.href}
          external
          as="h4"
          className="text-xl font-medium tracking-[-0.02em] md:text-2xl"
          textClassName="transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5"
        />
        <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{project.summary}</p>
        <p className="mt-1 label text-muted">
          {project.year}, {project.platforms.join(", ")}
        </p>
      </div>
      <span className="shrink-0">
        {project.href ? (
          <ArrowUpRight className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        ) : (
          <span className="label text-muted">{project.note ?? "Private"}</span>
        )}
      </span>
    </li>
  );
}

export function Work() {
  return (
    <Section id="work" title="Selected work.">
      <div className="space-y-20 lg:space-y-28">
        {featuredProjects.map((project, index) => (
          <FeaturedProject key={project.title} project={project} index={index} />
        ))}
      </div>

      <div className={cn("mx-auto max-w-3xl", space.block)}>
        <h3 data-reveal className="text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
          More
        </h3>
        <ul className={cn(space.afterTitle, "grid gap-y-8")}>
          {moreProjects.map((project, index) => (
            <ProjectRow key={project.title} project={project} index={index} />
          ))}
        </ul>
      </div>
    </Section>
  );
}
