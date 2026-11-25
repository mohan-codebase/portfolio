import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ButtonLink } from "@/components/button";
import { ArrowLeft, ArrowRight } from "@/components/icons";
import { Motion } from "@/components/motion";
import { ProjectVisual } from "@/components/project-visual";
import { featuredProjects, getNextProject, getProject, profile } from "@/content/site";
import { cn, container, space, stagger } from "@/lib/ui";

export function generateStaticParams() {
  return featuredProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const url = `/projects/${project.slug}`;
  // "Glint: Window snapping from the menu bar | Mohan" (the layout adds the name).
  const pageTitle = project.seoTitle ?? `${project.title}: ${project.summary.replace(/\.$/, "")}`;
  const title = `${pageTitle} | ${profile.name}`;
  const description = `${project.overview} Built by ${profile.name}, a full-stack developer in ${profile.location.split(",")[0]}.`;
  return {
    title: pageTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: `${profile.name} — Portfolio`,
      title,
      description,
      locale: "en_US",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      {/* The URL is read inside the boundary so the page shell can render before it resolves. */}
      <Suspense fallback={<div className="min-h-svh" />}>
        <ProjectContent params={params} />
      </Suspense>
    </main>
  );
}

async function ProjectContent({ params }: Pick<PageProps<"/projects/[slug]">, "params">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(project.slug);
  const isDevice = project.image?.fit === "device";
  const gallery = project.gallery ?? [];

  const facts = [
    { label: "Type", value: project.category },
    { label: "Year", value: project.year },
    { label: "Platforms", value: project.platforms.join(", ") },
    ...(project.stack.length > 0 ? [{ label: "Built with", value: project.stack.join(", ") }] : []),
  ];

  return (
    <>
      <article>
        <header id="top" className={cn(container, "flex flex-col items-center pt-24 text-center sm:pt-28")}>
          <div className="fade-in" style={stagger(0)}>
            <ButtonLink
              href="/#work"
              variant="secondary"
              size="sm"
              iconStart={
                <ArrowLeft className="transition-transform duration-500 ease-out-expo group-hover/button:-translate-x-0.5" />
              }
            >
              All work
            </ButtonLink>
          </div>

          <p className="fade-in mt-12 label text-muted sm:mt-16" style={stagger(1)}>
            {project.category}, {project.year}
          </p>
          <h1 className="mt-4 text-[clamp(3.5rem,12vw,11rem)] leading-[0.88] font-semibold tracking-[-0.06em]">
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="rise" style={stagger(1)} translate="no">
                {project.title}
              </span>
            </span>
          </h1>

          <div className="fade-in mt-6 flex flex-col items-center sm:mt-8" style={stagger(3)}>
            <p className="max-w-[28ch] text-[clamp(1.375rem,2.4vw,2rem)] leading-[1.15] font-medium tracking-[-0.025em] text-balance text-muted">
              {project.summary}
            </p>
            <div className="mt-8">
              {project.href ? (
                <ButtonLink href={project.href} external>
                  {project.linkLabel ?? "Visit"}
                </ButtonLink>
              ) : (
                <p className="label text-muted">Private project</p>
              )}
            </div>
          </div>
        </header>

        <div className={cn(container, space.block)}>
          <div className="mx-auto max-w-6xl">
            <ProjectVisual
              image={project.image}
              priority
              sizes={isDevice ? "(min-width: 1024px) 460px, 60vw" : "(min-width: 1200px) 1152px, 100vw"}
              frameClassName={isDevice ? "aspect-[4/5] items-end sm:aspect-[16/9]" : "aspect-[16/9]"}
            />
          </div>
        </div>

        <section aria-label="Overview" className={cn(container, space.section, "text-center")}>
          <dl className="fade-in mx-auto grid max-w-3xl grid-cols-2 gap-x-6 gap-y-8 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-16 [&>*:last-child:nth-child(odd)]:col-span-2">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="label text-muted">{fact.label}</dt>
                <dd className="mt-2 text-[0.9375rem] leading-snug">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <p
            data-reveal
            className={cn(
              "mx-auto max-w-[30ch] text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.12] font-medium tracking-[-0.03em] text-balance",
              space.block,
            )}
          >
            {project.overview}
          </p>

          <div className={cn("mx-auto max-w-2xl", space.block)}>
            <h2 data-reveal className="text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
              What it does
            </h2>
            <ul className={cn(space.afterTitle, "grid gap-y-4")}>
              {project.features.map((feature, index) => (
                <li
                  key={feature}
                  data-reveal
                  style={stagger(index)}
                  className="text-[clamp(1.125rem,1.6vw,1.375rem)] leading-snug tracking-[-0.015em] text-balance"
                >
                  {feature}
                </li>
              ))}
            </ul>
            {project.footnote && (
              <p data-reveal className="mt-10 text-sm text-muted">
                {project.footnote}
              </p>
            )}
          </div>
        </section>

        {gallery.length > 0 && (
          <section aria-label="Screenshots" className={cn(container, "pb-12 sm:pb-16 lg:pb-20")}>
            <div className={cn("mx-auto grid max-w-6xl gap-x-6 gap-y-12", gallery.length > 1 && "md:grid-cols-2")}>
              {gallery.map((image) => (
                <figure key={image.alt}>
                  <ProjectVisual
                    image={image}
                    sizes={gallery.length > 1 ? "(min-width: 768px) 40vw, 80vw" : "(min-width: 1024px) 460px, 60vw"}
                    frameClassName={
                      gallery.length > 1 ? "aspect-[4/3] items-center" : "aspect-[4/5] items-center sm:aspect-[16/9]"
                    }
                  />
                  {image.caption && (
                    <figcaption className="mt-4 text-center label text-muted">{image.caption}</figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        )}
      </article>

      <nav aria-label="Next project" className={cn(container, space.section, "text-center")}>
        <Link
          href={`/projects/${next.slug}`}
          data-reveal
          className="group inline-flex flex-col items-center focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-fg"
        >
          <span className="label text-muted">Next project</span>
          <span className="mt-4 flex items-center gap-[0.2em] text-[clamp(3rem,10vw,9rem)] leading-[0.9] font-semibold tracking-[-0.06em]">
            <span translate="no">{next.title}</span>
            <ArrowRight
              strokeWidth={1}
              className="size-[0.45em] shrink-0 text-muted transition-[color,translate] duration-700 ease-out-expo group-hover:translate-x-2 group-hover:text-fg"
            />
          </span>
          <span className="mt-4 label text-muted">{next.category}</span>
        </Link>
      </nav>

      {/* Mounted with the content so it runs after this segment has hydrated. */}
      <Motion />
    </>
  );
}
