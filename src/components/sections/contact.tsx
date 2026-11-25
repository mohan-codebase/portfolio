import { profile, socials } from "@/content/site";
import { cn, container, space } from "@/lib/ui";

import { ButtonLink } from "../button";
import { CopyEmail } from "../copy-email";

export function Contact() {
  const links = socials.filter((link) => link.href);
  const [local, domain] = profile.email.split("@");

  return (
    <section id="contact" aria-labelledby="contact-title">
      <div className={cn(container, space.section, "flex flex-col items-center text-center")}>
        <h2
          id="contact-title"
          data-split
          className="text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.92] font-semibold tracking-[-0.055em] text-balance"
        >
          Let’s talk.
        </h2>

        <div className={cn(space.afterTitle, "flex flex-col items-center")} data-reveal>
          <a
            href={`mailto:${profile.email}`}
            className="max-w-full link-line pb-1 text-[clamp(1.25rem,3.4vw,2.75rem)] leading-tight font-medium tracking-[-0.03em] [overflow-wrap:anywhere]"
          >
            {local}@<wbr />
            {domain}
          </a>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href={`mailto:${profile.email}`}>Send an email</ButtonLink>
            <CopyEmail email={profile.email} />
          </div>
        </div>

        {links.length > 0 && (
          <ul className={cn(space.block, "flex flex-wrap justify-center gap-3")} data-reveal>
            {links.map((link) => (
              <li key={link.label}>
                <ButtonLink href={link.href} variant="secondary" size="sm" external rel="me noopener noreferrer">
                  {link.label}
                </ButtonLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
