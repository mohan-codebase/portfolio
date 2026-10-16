import type { MetadataRoute } from 'next';
import { siteUrl, isPreview } from '@/lib/metadata';
export default function robots(): MetadataRoute.Robots {
  if (isPreview) return { rules: { userAgent: '*', disallow: '/' } };
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${siteUrl}/sitemap.xml` };
}
