"use client";

import { useMemo, useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 10_000);
  return () => window.clearInterval(id);
}

/** Live clock for a given IANA time zone. Renders a placeholder on the server. */
export function LocalTime({ timeZone, className }: { timeZone: string; className?: string }) {
  const formatter = useMemo(
    () => new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone }),
    [timeZone],
  );

  const time = useSyncExternalStore(
    subscribe,
    () => formatter.format(Date.now()),
    () => null,
  );

  return (
    <time className={className} suppressHydrationWarning>
      {time ?? "--:-- --"}
    </time>
  );
}
