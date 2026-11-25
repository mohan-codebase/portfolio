"use client";

import { usePathname } from "next/navigation";

import { navItems } from "@/lib/ui";

import { NavLink } from "./site-header";

/** Section links for the footer; they work from the homepage and from project pages. */
export function FooterNav() {
  const home = usePathname() === "/";
  return (
    <nav aria-label="Footer">
      <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
        {navItems.map((item) => (
          <li key={item.id}>
            <NavLink
              home={home}
              href={`#${item.id}`}
              className="text-[0.9375rem] opacity-70 transition-opacity duration-300 hover:opacity-100"
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
