import { hero, profile } from "@/content/site";
import { cn, container, stagger } from "@/lib/ui";

import { ButtonLink } from "../button";

export function Availability({ className }: { className?: string }) {
  if (!profile.available) return null;
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-line px-3 py-1.5 label text-fg",
        className,
      )}
    >
      <span aria-hidden className="relative flex size-1.5">
        <span className="absolute inline-flex size-full rounded-full bg-signal opacity-60 motion-safe:animate-ping" />
        <span className="relative inline-flex size-1.5 rounded-full bg-signal" />
      </span>
      Open to work
    </p>
  );
}

export function Hero() {
  const [first, second] = hero.headline;

  return (
    <section id="top" aria-labelledby="hero-title" className="relative flex flex-col pt-16 md:min-h-[100svh]">
      {/* Everything centred; on larger screens the block sits in the middle of the viewport. */}
      <div className={cn(container, "flex flex-1 flex-col items-center justify-center py-16 text-center sm:py-20")}>
        <div className="fade-in" style={stagger(0)}>
          <Availability />
        </div>

        <h1
          id="hero-title"
          data-hero
          className="mt-10 text-[clamp(3.5rem,min(12vw,18svh),11rem)] leading-[0.9] font-semibold tracking-[-0.055em] sm:mt-12"
        >
          <span className="sr-only">
            {hero.greeting} {profile.name}, {first} {second}
          </span>
          <span
            aria-hidden
            className="mb-4 block overflow-hidden pb-[0.12em] text-[clamp(1.5rem,3vw,2.75rem)] leading-none font-medium tracking-[-0.035em] sm:mb-6"
          >
            <span className="rise" style={stagger(0)}>
              <span className="text-muted">{hero.greeting}</span> {profile.name}
            </span>
          </span>
          <span aria-hidden className="block overflow-hidden pb-[0.04em]">
            <span className="rise" style={stagger(1)}>
              {first}
            </span>
          </span>
          <span aria-hidden className="block overflow-hidden pb-[0.08em]">
            <span className="rise text-muted" style={stagger(2)}>
              {second}
            </span>
          </span>
        </h1>

        <div className="fade-in mt-8 flex flex-col items-center sm:mt-10" style={stagger(3)}>
          <p className="max-w-[36ch] text-lg leading-snug tracking-[-0.01em] text-pretty text-muted sm:text-xl">
            {hero.intro} Based in {profile.location.split(",")[0]}.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="#contact">Get in touch</ButtonLink>
            <ButtonLink href="#work" variant="secondary">
              See my work
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
