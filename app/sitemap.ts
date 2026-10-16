import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { siteUrl } from '@/lib/metadata';
export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/about', '/services', '/work', ...projects.map((p) => `/work/${p.slug}`)]
    .map((path) => ({ url: `${siteUrl}${path}` }));
}
