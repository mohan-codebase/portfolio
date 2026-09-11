# Mohan — Portfolio

The personal portfolio of Mohan, a fullstack developer in Chennai. Editorial and typographic, and built to be fast and accessible.

- **Stack:** Next.js 16 (App Router, Turbopack), React 19, TypeScript and CSS Modules. No UI or animation libraries.
- **Content:** everything personal lives in `/data`. Components never hard-code copy.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run lint
npm run typecheck
```

## Before you publish: replace the placeholders

| What | Where |
| --- | --- |
| Email (currently `mohanavenkatesh.work@gmail.com`) | `data/site.ts` → `email` |
| LinkedIn URL (hidden until set) | `data/site.ts` → `socials` |
| Availability status | `data/site.ts` → `availability` (set to `null` to hide it) |
| Production URL for metadata, the sitemap and social cards | `NEXT_PUBLIC_SITE_URL` env var (detected automatically on Vercel) |
| Timeline years | `data/experience.ts` (taken from public GitHub history, so confirm them) |

## Editing content

- `data/site.ts`: name, role, location, email, socials and navigation.
- `data/content.ts`: copy for the hero, about, marquee, work intro and contact sections. Wrap a word in `*asterisks*` to set it in the italic serif.
- `data/projects.ts`: the featured projects (screenshots live in `assets/work/`) and the archive list.
- `data/skills.ts`: the toolkit list and the code shown in each hover preview.
- `data/experience.ts` and `data/currently.ts`: the timeline and the status board.

### Adding project screenshots

Capture desktop screenshots at 1440×900 @2x. For the hover-scroll preview, crop full-page captures to about four screens. Capture mobile at 390×844 @2x. Export WebP files about 1600px wide into `assets/work/` and import them in `data/projects.ts`. `next/image` handles sizes, formats and blur placeholders.

## Structure

```text
app/                 root layout (fonts, metadata, boot script), page composition, 404, OG image, robots, sitemap
components/
  navigation/        Header (theme-aware, tracks the current section), MobileMenu (native <dialog>)
  sections/          Hero, About, Marquee, Work, Toolkit, Experience, Currently, Contact, Footer
  projects/          ProjectFeature (three art-directed layouts), browser/phone frames, archive list
  ui/                Button, Magnetic, Cursor, Intro, reveal helpers, HoverPreview, GridOverlay, …
data/                all content
lib/                 tiny helpers: class names and a server-side code tokenizer
assets/              project screenshots, plus fonts for the generated OG image
```

## Design system

- **Colour:** velvet obsidian ink `#08060B`, silk paper `#F8F6FC` and a luminous amethyst accent, `#9D71FD`. The accent is reserved for indicators, hovers and the headline full stops. Every text pair meets WCAG AA. Small accent text on light backgrounds uses `--signal-deep` (`#581C87`).
- **Type:** Mona Sans, with variable weight and width, sets the headlines: condensed on mobile, with expanded small caps for labels. Instrument Serif Italic carries the human accents, and JetBrains Mono carries the annotation layer.
- **Grid:** 4, 8 or 12 columns with fluid gutters. On desktop, press **G** to overlay it.
- **Motion:** expo-out for reveals, quart in-out for wipes and a soft spring for magnetic returns. Only transform, opacity, clip-path and colour animate. Scroll effects use CSS scroll-driven animations with no scroll-jacking, and degrade gracefully where unsupported.

## Accessibility and performance

- **Markup:** semantic landmarks, a skip link, visible focus states, a native `<dialog>` menu (focus trap and Escape key) and labelled external links.
- **Reduced motion:** with `prefers-reduced-motion`, there is no intro, parallax, marquee or custom cursor, and content shows immediately.
- **No-JS safety:** content is never hidden without JavaScript. Reveal states apply only once a pre-paint script confirms it is running.
- **Loading:** server components by default, with client JS limited to a handful of small interaction islands. The page prerenders statically, with inlined CSS, self-hosted fonts and AVIF/WebP images.
- **Lighthouse (production build, performance / accessibility / best practices / SEO):** desktop scores 99 / 100 / 100 / 100. Mobile scores 92 / 100 / 100 / 100 under simulated slow 4G.

## Deploy

Push the repository to GitHub and import it into Vercel, which needs no configuration. Alternatively, run `npx vercel`.
