import { experience, profile } from "@/content/site";
import { space, stagger } from "@/lib/ui";

import { ButtonLink } from "../button";
import { Section } from "../section";

export function Experience() {
  return (
    <Section id="experience" title="Experience.">
      <ol className="mx-auto grid max-w-2xl gap-y-12">
        {experience.map((item, index) => (
          <li key={`${item.role}-${index}`} data-reveal style={stagger(index)}>
            {item.period && <p className="mb-2 label text-muted">{item.period}</p>}
            <h3 className="text-xl font-medium tracking-[-0.02em] md:text-2xl">{item.role}</h3>
            <p className="mt-1 text-[0.9375rem] text-muted">
              {item.href ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="link-line">
                  {item.organisation}
                </a>
              ) : (
                item.organisation
              )}
            </p>
            <p className="mx-auto mt-3 max-w-[44ch] text-[0.9375rem] leading-relaxed text-pretty">{item.description}</p>
          </li>
        ))}
      </ol>

      {profile.resumeUrl && (
        <div className={space.block} data-reveal>
          <ButtonLink href={profile.resumeUrl} variant="secondary" external>
            Download résumé
          </ButtonLink>
        </div>
      )}
    </Section>
  );
}
