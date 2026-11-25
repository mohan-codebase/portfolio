"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ComponentProps } from "react";

import { cn, container, navItems, SCROLL_LOCK_EVENT, stagger } from "@/lib/ui";

import { Button } from "./button";
import { ThemeToggle } from "./theme-toggle";

type Props = {
  name: string;
  email: string;
};

/**
 * In-page links. On the homepage they stay plain `#hash` anchors (smooth-scrolled
 * by Motion); on other pages they navigate back to the homepage section.
 */
export function NavLink({ home, href, ...props }: { home: boolean; href: string } & Omit<ComponentProps<"a">, "href">) {
  if (home) return <a href={href} {...props} />;
  return <Link href={href === "#top" ? "/" : `/${href}`} {...props} />;
}

function useActiveSection(pathname: string) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    // A section is "active" while it crosses the middle band of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );

    sections.forEach((section) => observer.observe(section));

    const onScroll = () => {
      if (window.scrollY < window.innerHeight * 0.4) setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
    // Re-observe after client navigation: the homepage sections are new elements.
  }, [pathname]);

  return active;
}

export function SiteHeader({ name, email }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const home = pathname === "/";
  const observed = useActiveSection(pathname);
  // Project pages belong to "Work"; other pages highlight nothing.
  // Home is active near the top of the homepage; project pages belong to "Work".
  const active = home ? (observed ?? "top") : pathname.startsWith("/projects/") ? "work" : null;

  // Lock scroll, make the page inert and listen for Escape while the menu is open.
  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const main = document.getElementById("main");
    const footer = document.querySelector("footer");
    root.style.overflow = "hidden";
    window.dispatchEvent(new CustomEvent(SCROLL_LOCK_EVENT, { detail: true }));
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => desktop.matches && setOpen(false);

    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);

    return () => {
      root.style.overflow = "";
      window.dispatchEvent(new CustomEvent(SCROLL_LOCK_EVENT, { detail: false }));
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div aria-hidden className="absolute inset-0 bg-bg/80 backdrop-blur-md backdrop-saturate-150" />

      <div className={cn(container, "relative flex h-16 items-center justify-between gap-6")}>
        <NavLink
          home={home}
          href="#top"
          onClick={() => setOpen(false)}
          className="flex items-baseline gap-3 text-[0.9375rem] font-semibold tracking-[-0.01em]"
        >
          {name}
          <span className="hidden label font-normal text-muted sm:inline">Portfolio</span>
        </NavLink>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navItems.map((item) => (
              <li key={item.id}>
                <NavLink
                  home={home}
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  className={cn(
                    "text-sm transition-colors duration-300",
                    active === item.id ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="secondary"
            size="sm"
            className="lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </Button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          data-lenis-prevent
          className="fixed inset-x-0 top-16 bottom-0 flex flex-col overflow-y-auto overscroll-contain bg-bg lg:hidden"
        >
          <nav aria-label="Mobile" className={cn(container, "flex-1 pt-10")}>
            <ul>
              {navItems.map((item, index) => (
                <li key={item.id} className="overflow-hidden">
                  <NavLink
                    home={home}
                    href={`#${item.id}`}
                    aria-current={active === item.id ? "true" : undefined}
                    onClick={() => setOpen(false)}
                    className="rise py-5 text-[2.5rem] leading-none font-semibold tracking-[-0.04em] sm:text-5xl"
                    style={stagger(index)}
                  >
                    <span className="flex items-baseline justify-between">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className={cn(container, "fade-in flex flex-col items-start gap-3 py-8")}>
            <a href={`mailto:${email}`} className="max-w-full link-line text-base break-all">
              {email}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
