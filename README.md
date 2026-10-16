# Mohan — Portfolio

The personal portfolio of Mohan, a fullstack developer in Chennai. Editorial and typographic, multi-page, and built to feel smooth on every device.

- **Stack:** Next.js 16 (App Router, Turbopack), React 19, TypeScript and CSS Modules. The only dependency beyond Next.js is [Lenis](https://github.com/darkroomengineering/lenis) for smooth wheel scrolling. There are no UI or animation libraries — every effect is CSS or a few lines of script.
- **Content:** everything personal lives in `/data`. Components never hard-code copy.

## Pages

| Route | What's there |
| --- | --- |
| `/` | The pinned hero, the About sheet sliding over it, a scroll-reactive marquee, the selected-work reel and the contact call to action |
| `/work` | The case studies as art-directed features, then every project in a filterable grid or list |
| `/work/[slug]` | A case study for each featured project: a hero set on the project's colour, an overview, every screen (select one to expand) and the next project |
| `/about` | The manifesto, principles, toolkit, timeline and the "currently" board |
| `/contact` | Email, socials and a fill-in-the-blanks brief that drafts the email for you |
| `/privacy` | Data collection, cookie transparency, server logs and privacy rights |

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build
pnpm start          # serve the production build
pnpm lint
pnpm typecheck
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

- `data/site.ts`: name, role, location, email, socials, every page (`pages`, used by the menu, footer and ⌘K palette) and the header links (`nav`).
- `data/content.ts`: copy for every page — hero, about, marquee, work, case-study labels, toolkit, contact and the contact brief (`composer`). Wrap a word in `*asterisks*` to set it in the italic serif.
- `data/projects.ts`: the featured projects, the archive and the stack filters on the work page. Each featured project gets a case study at `/work/[slug]`; its `highlights` and `team` fields appear there. The highlights are restated from each summary — rewrite them in your own words whenever you like.
- `data/skills.ts`: the toolkit list and the code shown in each hover preview.
- `data/experience.ts` and `data/currently.ts`: the timeline and the status board.

### Adding project screenshots

Capture desktop screenshots at 1440×900 @2x. For the hover-scroll preview, crop full-page captures to about four screens. Capture mobile at 390×844 @2x. Export WebP files about 1600px wide into `assets/work/` and import them in `data/projects.ts`. `next/image` handles sizes, formats and blur placeholders.

## Motion and interaction

- **Preloader** (`components/preloader`): first visit in a session only. A type specimen being calibrated: grid lines draw in, the name is set between cap-height and baseline guides with its code points, an odometer rolls to 100, then the columns lift away with glowing edges. It is pure CSS, so it finishes without JavaScript and adds nothing to the bundle.
- **Page transitions** (`components/transition`): internal links use `TransitionLink`. Ink columns rise in a wave, the destination's name is set in the middle, the route changes underneath and the columns lift away. The browser's back and forward buttons stay instant.
- **Smooth scrolling** (`components/scroll/SmoothScroll.tsx`): Lenis smooths mouse-wheel and trackpad scrolling and eases jumps to same-page anchors. Phones keep the browser's native momentum scrolling on purpose: it runs off the main thread, which makes it the smoothest scrolling a phone can do. To let Lenis drive touch as well, set `SMOOTH_TOUCH = true` in that file.
- **Cursor** (`components/ui/Cursor.tsx`): a precise dot and a trailing ring that stretches with speed. The ring fills over links, wraps around buttons marked `data-cursor="stick"`, becomes a caret over text fields, and becomes a labelled disc over media (`data-cursor="view"` with `data-cursor-label`). While a page loads, it spins.
- **Scroll effects:** the pinned hero, the horizontal work reel on desktop, the parallax and the scroll readout all use CSS scroll-driven animations, so they run on the compositor thread. The marquee speeds up, reverses and leans with your scrolling.
- **One frame loop** (`lib/ticker.ts`): Lenis, the cursor and the marquee share a single `requestAnimationFrame` loop that stops when nothing needs it.
- **Keyboard:** `⌘K` / `Ctrl+K` opens quick navigation to any page, project or action. `G` toggles the layout grid.

## Structure

```text
app/                 layout (fonts, metadata, boot script) and the pages: /, /work, /work/[slug], /about,
                     /contact, /privacy and the 404, plus the OG image, robots and sitemap
components/
  preloader/         the CSS-only first-visit preloader
  transition/        the page curtain and TransitionLink
  scroll/            smooth scrolling (Lenis)
  navigation/        Header, MobileMenu (native <dialog>) and the ⌘K palette (loaded on first open)
  sections/          Hero, About, Marquee, WorkReel, Work, Toolkit, Experience, Currently, Contact, Footer
  work/              the filterable project index
  case/              case-study hero, screen gallery with lightbox, next-project link
  contact/           the project-brief composer
  projects/          ProjectFeature and ProjectArtboard (three art-directed layouts), browser and phone frames
  ui/                Button, PageHero, Magnetic, Cursor, reveal helpers, HoverPreview, GridOverlay, …
data/                all content
lib/                 the frame loop, scroll helpers, the page-transition bridge, the page-visibility
                     signal, page metadata and a server-side code tokenizer
assets/              project screenshots, plus fonts for the generated OG image
```

## Design system

- **Colour:** velvet obsidian ink `#08060B`, silk paper `#F8F6FC` and a luminous amethyst accent, `#9D71FD`. The accent is reserved for indicators, hovers, glowing edges and the headline full stops. Every text pair meets WCAG AA. Small accent text on light backgrounds uses `--signal-deep` (`#581C87`).
- **Type:** Mona Sans, with variable weight and width, sets the headlines: condensed on mobile, with expanded small caps for labels. Instrument Serif Italic carries the human accents, and JetBrains Mono carries the annotation layer.
- **Grid:** 4, 8 or 12 columns with fluid gutters. The preloader and page curtain are built from the same columns. On desktop, press **G** to overlay the grid.
- **Motion:** expo-out for reveals, quart in-out for wipes and a soft spring for magnetic returns. Only transform, opacity, clip-path and colour animate.

## Accessibility and performance

- **Markup:** semantic landmarks, a skip link, visible focus states and labelled external links. The menu, palette and lightbox are native `<dialog>` elements, so focus is trapped and Escape closes them. After a page transition, focus moves to the new page's `<main>`.
- **Reduced motion:** with `prefers-reduced-motion`, there is no preloader, page curtain, smooth scrolling, parallax, marquee or custom cursor. Pages change instantly and content shows immediately.
- **No-JS safety:** content is never hidden without JavaScript. Reveal states apply only once a pre-paint script confirms it is running, and the preloader and page entrances are CSS animations that finish on their own.
- **Loading:** every route is prerendered (the case studies through `generateStaticParams`), with inlined CSS, self-hosted fonts and AVIF/WebP images. The ⌘K palette's code loads only when it is first opened.
- **Phones:** effects animate only compositor-friendly properties, and the header's backdrop blur is desktop-only.

## Deploy

Push the repository to GitHub and import it into Vercel, which needs no configuration. Alternatively, run `npx vercel`.
