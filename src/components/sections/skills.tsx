import { skills } from "@/content/site";
import { stagger } from "@/lib/ui";

import { Logo } from "../logo";
import { Section } from "../section";

export function Skills() {
  return (
    <Section id="skills" title="Stack.">
      <div className="mx-auto grid max-w-4xl gap-y-14 md:gap-y-16">
        {skills.map((group) => (
          <section key={group.group} aria-label={group.group}>
            <h3 data-reveal className="label text-muted">
              {group.group}
            </h3>
            {/* Tiles rise in one after another; hovering lifts a tile. */}
            <ul className="mt-6 flex flex-wrap justify-center gap-x-2 gap-y-7 sm:gap-x-10">
              {group.items.map((tech, index) => (
                <li
                  key={tech.name}
                  data-reveal
                  style={stagger(index)}
                  className="group flex w-[4.75rem] flex-col items-center sm:w-[5.25rem]"
                >
                  <span className="grid size-14 place-items-center rounded-2xl bg-surface transition-[translate,background-color] duration-500 ease-out-expo group-hover:-translate-y-1.5 group-hover:bg-surface-strong sm:size-16">
                    <Logo
                      name={tech.logo}
                      className="size-7 transition-transform duration-500 ease-out-expo group-hover:scale-110 sm:size-8"
                    />
                  </span>
                  <span className="mt-3 text-[0.8125rem] font-medium tracking-[-0.01em] whitespace-nowrap sm:text-sm">
                    {tech.name}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Section>
  );
}
