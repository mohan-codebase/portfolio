import { about } from "@/content/site";
import { cn, space, stagger } from "@/lib/ui";

import { Section } from "../section";

export function About() {
  return (
    <Section id="about" title="About.">
      <p
        data-reveal
        className="mx-auto max-w-[30ch] text-[clamp(1.5rem,2.7vw,2.375rem)] leading-[1.18] font-medium tracking-[-0.025em] text-balance"
      >
        {about.lead} <span className="text-muted">{about.body}</span>
      </p>

      <dl className={cn("mx-auto grid max-w-3xl grid-cols-3 gap-x-6", space.block)}>
        {about.facts.map((fact, i) => (
          <div key={fact.label} data-reveal style={stagger(i)}>
            <dt className="label text-muted">{fact.label}</dt>
            <dd className="mt-2 text-[0.9375rem] leading-snug">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
