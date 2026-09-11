'use client';

import { useEffect, useRef } from 'react';

/** A live clock for a given time zone. Renders a neutral placeholder on the server. */
export function LocalTime({ timeZone, className }: { timeZone: string; className?: string }) {
  const ref = useRef<HTMLTimeElement>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat('en-GB', { timeZone, hour: '2-digit', minute: '2-digit', hour12: false });
    const tick = () => {
      if (ref.current) ref.current.textContent = format.format(new Date());
    };
    tick();
    const id = window.setInterval(tick, 10_000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return (
    <time ref={ref} className={className} suppressHydrationWarning>
      --:--
    </time>
  );
}
