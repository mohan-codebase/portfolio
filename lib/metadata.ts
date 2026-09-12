import type { Metadata } from 'next';

import { site } from '@/data/site';

export const siteDescription = `${site.name} is a fullstack developer in ${site.location.city} building fast, accessible and carefully detailed websites with React and Next.js.`;

/**
 * Metadata for one page: its canonical URL plus social cards that describe it.
 * Next.js replaces (rather than merges) `openGraph` per page, so every field
 * is set here.
 */
export function pageMetadata({ title, description, path }: { title?: string; description: string; path: string }): Metadata {
  const socialTitle = title ? `${title} — ${site.name}` : `${site.name} — ${site.role}`;

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: { type: 'website', url: path, siteName: site.name, title: socialTitle, description, locale: 'en_US' },
    twitter: { card: 'summary_large_image', title: socialTitle, description },
  };
}
