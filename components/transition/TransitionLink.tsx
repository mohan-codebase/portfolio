'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';

import { startPageTransition } from '@/lib/transition';

type TransitionLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & { href: string };

/**
 * A Next.js link whose client-side navigations play the page curtain. Modified
 * clicks (new tab, new window) never reach `onNavigate`, so they behave natively.
 */
export function TransitionLink({ href, onNavigate, ...rest }: TransitionLinkProps) {
  return (
    <Link
      {...rest}
      href={href}
      onNavigate={(event) => {
        onNavigate?.(event);
        if (startPageTransition(href)) event.preventDefault();
      }}
    />
  );
}
