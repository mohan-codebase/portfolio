import type { Metadata } from "next";

import { ButtonLink } from "@/components/button";
import { ArrowLeft } from "@/components/icons";
import { Motion } from "@/components/motion";
import { cn, container } from "@/lib/ui";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main id="main" className={cn(container, "flex min-h-[80svh] flex-col justify-end pt-32 pb-20")}>
      <p className="label text-muted">Error 404</p>
      <h1 className="mt-6 text-[clamp(2.75rem,8vw,7rem)] leading-[0.92] font-semibold tracking-[-0.055em]">
        Nothing here.
        <br />
        <span className="text-muted">The page has moved or never existed.</span>
      </h1>
      <ButtonLink href="/" iconStart={<ArrowLeft />} className="mt-12 self-start">
        Back to home
      </ButtonLink>
      <Motion />
    </main>
  );
}
