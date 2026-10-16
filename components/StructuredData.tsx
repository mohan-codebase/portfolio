import { siteUrl } from '@/lib/metadata';

export default function StructuredData({ title, path, profile = false }: { title: string; path: string; profile?: boolean }) {
  const items = [{ name: 'Home', url: `${siteUrl}/` }];
  if (path.startsWith('/work/')) items.push({ name: 'Projects', url: `${siteUrl}/work` });
  items.push({ name: title, url: `${siteUrl}${path}` });
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: item.url })) },
      ...(profile ? [{ '@type': 'ProfilePage', '@id': `${siteUrl}${path}#profile`, url: `${siteUrl}${path}`, name: title, mainEntity: { '@id': `${siteUrl}/#person` } }] : []),
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
