import type { ReactNode } from "react";

import { cn, container, space } from "@/lib/ui";

type SectionProps = {
  id: string;
  title: ReactNode;
  children: ReactNode;
  className?: string;
};

/** Section shell for the homepage: a centred title, then centred content. */
export function Section({ id, title, children, className }: SectionProps) {
  const titleId = `${id}-title`;

  return (
    <section id={id} aria-labelledby={titleId} className={className}>
      <div className={cn(container, space.section, "text-center")}>
        <h2
          id={titleId}
          data-split
          className="mx-auto text-[clamp(2.5rem,6vw,5.25rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-balance"
        >
          {title}
        </h2>
        <div className={space.afterTitle}>{children}</div>
      </div>
    </section>
  );
}
