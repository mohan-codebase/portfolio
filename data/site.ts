/**
 * Global facts about the site owner. Everything personal lives here (and in
 * the other files in /data), so content can change without touching the design.
 *
 * Fields marked TODO are placeholders — replace them with your real details.
 */

const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const site = {
  name: 'Mohan',
  role: 'Fullstack Developer',
  level: '',
  location: {
    city: 'Chennai',
    country: 'India',
    countryCode: 'IN',
    timeZone: 'Asia/Kolkata',
    timeZoneLabel: 'IST',
  },
  email: 'mohanavenkatesh.work@gmail.com',
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (productionUrl ? `https://${productionUrl}` : 'http://localhost:3000'),
  /** Shown as a live status in the header and contact section. Set to `null` to hide it. */
  availability: 'Available for work' as string | null,
  /** Year of the first public project on GitHub. */
  since: 2024,
  year: new Date().getFullYear(),
  socials: [
    { label: 'GitHub', href: 'https://github.com/mohan-codebase', handle: '@mohan-codebase' },
    // TODO: add your LinkedIn URL — the link appears everywhere automatically once `href` is set.
    { label: 'LinkedIn', href: '', handle: '' },
  ],
  nav: [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
  ],
};

/** Social profiles that have a URL — placeholders stay hidden instead of rendering dead links. */
export const socials = site.socials.filter((social) => social.href);

export const mailto = `mailto:${site.email}`;
