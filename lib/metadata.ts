import type { Metadata } from 'next';

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://mohan-portfolio-nextjs.vercel.app').replace(/\/$/, '');
export const isPreview = process.env.VERCEL_ENV === 'preview';
export const socialSlug = (path: string) => path === '/' ? 'home' : path.slice(1).replaceAll('/', '-');
export const siteTitle = 'Mohan — UI Designer & Full-Stack Developer';
export const siteDescription = 'Mohan is a UI designer and full-stack developer based in Chennai, India. Explore thoughtful interfaces, responsive websites, and Next.js applications.';

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const shareTitle = path === '/' ? siteTitle : `${title} — Mohan`;
  const imageBase = `/social/${socialSlug(path)}`;
  return {
    title: path === '/' ? { absolute: siteTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: shareTitle, description, url: path, siteName: 'Mohan',
      type: 'website', locale: 'en_IN',
      images: [{ url: `${imageBase}-og.png`, width: 1200, height: 630, type: 'image/png', alt: shareTitle }],
    },
    twitter: { card: 'summary_large_image', title: shareTitle, description, images: [{ url: `${imageBase}-twitter.png`, alt: shareTitle }] },
  };
}
