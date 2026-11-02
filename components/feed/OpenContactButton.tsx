'use client';

import type { ReactNode } from 'react';

/** Opens the shared quick-contact dialog mounted in the root layout. */
export default function OpenContactButton({ children, className = '', label }: { children: ReactNode; className?: string; label?: string }) {
  return (
    <button type="button" aria-label={label} onClick={() => window.dispatchEvent(new Event('open-contact'))} className={className}>
      {children}
    </button>
  );
}
