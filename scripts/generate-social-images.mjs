import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
import { projects } from '../data/projects.ts';
const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve('next/package.json'))('sharp');
const escape = (value) => value.replace(/[&<>"']/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&apos;' }[c]));
const pages = [
  ['home', 'MOHAN.', 'UI designer at heart. Full-stack developer by craft.', 'PORTFOLIO'],
  ['about', 'About Mohan.', 'Thoughtful interfaces. Purposeful development.', 'BEHIND THE WORK'],
  ['services', 'Design. Develop.', 'UI design, frontend development & product consulting.', 'SERVICES'],
  ['work', 'Selected work.', 'Interfaces, websites, and full-stack applications.', 'PROJECTS & EXPERIMENTS'],
  ...projects.map((p) => [`work-${p.slug}`, p.title, p.category, `${p.year} / PROJECT`]),
];
await mkdir('public/social', { recursive: true });
for (const [slug, title, subtitle, label] of pages) {
  for (const [variant, height] of [['og',630], ['twitter',600]]) {
    const size = title.length > 17 ? 76 : title.length > 12 ? 92 : 116;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="${height}" viewBox="0 0 1200 ${height}"><rect width="1200" height="${height}" fill="#111111"/><rect x="32" y="32" width="1136" height="${height-64}" rx="40" fill="#18181b" stroke="#383838"/><g font-family="Arial, Helvetica, sans-serif" fill="#faf7f3"><text x="90" y="125" font-size="19" letter-spacing="3">${escape(label)}</text><text x="84" y="315" font-size="${size}" font-weight="700" letter-spacing="-4">${escape(title)}</text><text x="90" y="395" font-size="28" fill="#c4c2c0">${escape(subtitle)}</text><path d="M90 ${height-137}H1110" stroke="#383838"/><text x="90" y="${height-86}" font-size="20">MOHAN / CHENNAI, INDIA</text><text x="1110" y="${height-86}" text-anchor="end" font-size="18" fill="#aaa">DESIGN + DEVELOPMENT</text></g></svg>`;
    await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(`public/social/${slug}-${variant}.png`);
  }
}
console.log(`Generated ${pages.length * 2} social images.`);
