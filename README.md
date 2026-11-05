# Mohan — Portfolio

A personal portfolio for Mohan, a UI designer and full-stack developer based in Chennai, India. It presents selected projects, services and ways to get in touch through a responsive, multi-page website.

**Live site:** [portfolio-wheat-kappa-44.vercel.app](https://portfolio-wheat-kappa-44.vercel.app)

## Features

- Project showcase with individual project pages and links to live work and repositories.
- About, services and contact pages, including a WhatsApp contact flow.
- Responsive layouts, light and dark themes, smooth scrolling and animated interactions.
- Page metadata, social sharing images, a sitemap, robots rules and structured data.

## Built with

- [Next.js](https://nextjs.org/) App Router and React
- TypeScript and Tailwind CSS
- GSAP, Lenis and Lucide icons
- Vercel Analytics

## Getting started

Use a recent Node.js release that supports `--experimental-strip-types` and pnpm 12 (the version specified in `package.json`).

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
pnpm build       # Generate social images and build for production
pnpm start       # Run the production build
pnpm lint        # Run ESLint
pnpm typecheck   # Generate Next.js types and check TypeScript
pnpm social:generate # Generate social sharing images
```

## Pages

| Route | Content |
| --- | --- |
| `/` | Introduction, services, featured projects and contact |
| `/work` | Project showcase |
| `/work/[slug]` | Individual project details |
| `/about` | Background and introduction |
| `/services` | Services offered |
| `/contact` | Contact information and inquiry form |

## Project structure

```text
app/          App Router pages, layout, styles, sitemap and robots rules
components/   Reusable interface and page sections
data/         Project, service, testimonial and GitHub content
hooks/        Reusable React hooks
lib/          Shared utilities and metadata
public/       Public assets, including project imagery
scripts/      Build and social-image generation scripts
security/     Security-related project files
tests/        Project tests
```

Update project entries in `data/projects.ts` and service descriptions in `data/services.ts`. Other content and interface details are maintained in the relevant `data/`, `app/` and `components/` files.

## Deployment and site URL

The site is deployed on Vercel. Set `NEXT_PUBLIC_SITE_URL` to the intended public URL for canonical metadata and social links; otherwise, the application uses the fallback in `lib/metadata.ts`. Review the Vercel environment settings when deploying to another domain.
