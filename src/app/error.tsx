"use client";

import { useEffect } from "react";

import { Button, ButtonLink } from "@/components/button";
import { cn, container } from "@/lib/ui";

/** Shown when a page fails to render. Offers a retry and a way home. */
export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    // Keep the real error for debugging; visitors only see the message below.
    console.error(error);
  }, [error]);

  return (
    <main
      id="main"
      className={cn(container, "flex min-h-[80svh] flex-col items-center justify-center py-32 text-center")}
    >
      <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] font-semibold tracking-[-0.05em] text-balance">
        Something went wrong.
      </h1>
      <p className="mt-6 max-w-[40ch] text-lg text-pretty text-muted">
        This page didn’t load. Try again, or go back to the homepage.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Button onClick={() => retry()}>Try again</Button>
        <ButtonLink href="/" variant="secondary">
          Back to home
        </ButtonLink>
      </div>
    </main>
  );
}
