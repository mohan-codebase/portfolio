# Developer portfolio

A portfolio (homepage plus a page per project) built with Next.js (App Router), TypeScript and Tailwind CSS. It is fully static, works in light and dark mode, and uses GSAP for motion.

**Owner:** Mohan · **Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, GSAP, Lenis

## Getting started

Requires Node.js 20.9 or later (`.nvmrc` pins 24) and pnpm.

```bash
nvm use
pnpm install
cp .env.example .env.local   # then fill in the values
pnpm dev                     # http://localhost:3000
```

```bash
pnpm build          # production build (all routes prerendered)
pnpm start          # serve the production build
pnpm lint           # ESLint
pnpm typecheck      # TypeScript
pnpm format         # Prettier (writes changes)
pnpm format:check   # Prettier (CI check)
```

Run `pnpm lint`, `pnpm typecheck` and `pnpm build` before every deploy; all three must pass with zero errors.

## Environment variables

| Name                   | Required      | Purpose                                                                                                                             |
| ---------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | In production | Public URL used for canonical links, Open Graph tags, the sitemap and robots.txt. Falls back to the value in `src/content/site.ts`. |

## Rendering and deployment

Every route is static: the homepage, each `/projects/[slug]` page (from `generateStaticParams`), share images, icons, the sitemap and robots.txt are all prerendered at build time. There is no server data or database. Deploy to Vercel (or any static-capable Node host) with `pnpm build`.

## Editing your content

Everything personal lives in **`src/content/site.ts`**: name, role, location, email, social links, about text, projects, skills and experience.

- Values in `[square brackets]` are placeholders. Replace them, or delete the entry.
- Links with an empty `href` (for example LinkedIn) are hidden until you add a URL.
- Set `resumeUrl` to show a “Download résumé” link under Experience. To host the PDF yourself, put it in `public/` and use a path such as `/resume.pdf`.
- Set `available: false` to hide the “Available for work” indicator.
- Project screenshots live in `src/content/images/`. Import them at the top of `site.ts`. Use `fit: "cover"` for website screenshots and `fit: "device"` for portrait app screenshots. A `dark` variant is optional.
- Each featured project gets its own page at `/projects/<slug>`. Its `overview`, `features`, optional `gallery` (extra screenshots with a `caption`) and optional `footnote` fill that page. Pages, the sitemap and share images update automatically.

### Site URL

Canonical URLs, Open Graph tags, the sitemap and robots.txt all use `profile.url`. Set `NEXT_PUBLIC_SITE_URL` in your hosting provider (or edit the fallback in `site.ts`) to the address where you deploy.

## Structure

```
src/
  app/                 layout, page, metadata routes (OG image, icons, sitemap, robots, manifest)
    projects/[slug]/   project pages and their share images
  components/
    sections/          hero, about, work, skills, experience, contact
    section.tsx        shared section shell (title + content)
    button.tsx         Button and ButtonLink (primary / secondary, md / sm)
    project-visual.tsx screenshot frame used on the homepage and project pages
    site-header.tsx    sticky header, active-section nav, mobile menu
    theme-toggle.tsx   light / dark switch (follows system until chosen)
    ...
  content/site.ts      all editable content
  lib/ui.ts            layout primitives and nav items
```

## Design notes

- Warm monochrome palette defined as CSS variables in `src/app/globals.css`. Green appears only on the availability indicator.
- Inter Tight, self-hosted through `next/font`.
- A fine film grain covers the page and a soft light follows the cursor on desktop (`src/components/atmosphere.tsx`). Every section aligns to a 12-column layout.
- Motion lives in `src/components/motion.tsx` (GSAP with ScrollTrigger and SplitText, plus Lenis for smooth scrolling) and hooks in through `data-reveal`, `data-split`, `data-curtain`, `data-parallax`, `data-hero` and `data-wordmark` attributes. All of it is disabled when `prefers-reduced-motion` is set.
- The theme is applied before first paint, so there is no flash of the wrong theme.
