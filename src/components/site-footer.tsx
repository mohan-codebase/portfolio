import { profile, socials } from "@/content/site";
import { cn, container } from "@/lib/ui";

import { ButtonLink } from "./button";
import { FooterNav } from "./footer-nav";
import { ArrowUp } from "./icons";
import { LocalTime } from "./local-time";
import { Year } from "./year";

/**
 * An inverted, rounded panel that closes every page: section links, social
 * buttons, the name and a small bottom bar.
 */
export function SiteFooter() {
  const links = socials.filter((link) => link.href);

  return (
    <footer className="px-2 pb-2 sm:px-3 sm:pb-3">
      <div className="overflow-hidden rounded-[1.75rem] bg-fg text-bg sm:rounded-[2.5rem] dark:bg-surface dark:text-fg">
        <div className={cn(container, "flex flex-col items-center pt-14 text-center sm:pt-20")}>
          <FooterNav />

          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            {links.map((link) => (
              <li key={link.label}>
                <ButtonLink href={link.href} variant="ghost" size="sm" external rel="me noopener noreferrer">
                  {link.label}
                </ButtonLink>
              </li>
            ))}
            <li>
              <ButtonLink href={`mailto:${profile.email}`} variant="ghost" size="sm">
                Email
              </ButtonLink>
            </li>
          </ul>

          <p
            aria-hidden
            data-wordmark
            className="mt-12 w-full pb-[0.04em] text-[clamp(6rem,30vw,27rem)] leading-[0.8] font-semibold tracking-[-0.045em] select-none sm:mt-16"
          >
            {profile.name}
          </p>
        </div>

        <div
          className={cn(
            container,
            "flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-5 text-[0.8125rem] sm:py-6",
          )}
        >
          <p className="opacity-60">
            © <Year /> {profile.name}. Built in {profile.location.split(",")[0]}.
          </p>
          <p className="hidden opacity-60 sm:block">
            <LocalTime timeZone={profile.timeZone} /> {profile.timeZoneLabel}
          </p>
          <ButtonLink
            href="#top"
            variant="ghost"
            size="sm"
            icon={
              <ArrowUp className="transition-transform duration-500 ease-out-expo group-hover/button:-translate-y-0.5" />
            }
          >
            Back to top
          </ButtonLink>
        </div>
      </div>
    </footer>
  );
}
