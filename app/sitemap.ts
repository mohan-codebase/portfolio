import type { MetadataRoute } from 'next';

import { featured } from '@/data/projects';
import { site } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...site.pages.map((page) => ({
      url: page.href === '/' ? site.url : `${site.url}${page.href}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: page.href === '/' ? 1 : 0.8,
    })),
    ...featured.map((project) => ({
      url: `${site.url}/work/${project.slug}`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ];
}
