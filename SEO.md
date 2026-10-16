# SEO and sharing

Production origin: https://mohan-portfolio-nextjs.vercel.app. Set NEXT_PUBLIC_SITE_URL to the final HTTPS domain before building if this changes. Canonicals, structured data, and sitemap URLs use this single origin.

Every public page has a unique title, description, canonical, Open Graph URL and image, and X/Twitter large-image card. Images are public PNG files: 1200×630 for Open Graph and 1200×600 for Twitter. Facebook, LinkedIn, WhatsApp, Slack, Discord, and other consumers use Open Graph, but their cropping and caching vary. No platform-specific account IDs or verification tokens are fabricated.

Run `pnpm social:generate` to regenerate images. `pnpm build` also generates them from the current project data. Keep the titles legible within the generous image margins. The generator uses the Sharp dependency bundled with Next.js.

Production permits crawling. Vercel preview builds emit noindex/nofollow and disallow crawling. No fake last-modified timestamps, review ratings, or keyword stuffing are included. Structured data describes Mohan, the website, the About profile, and page breadcrumbs.

After deploying:
- Confirm public HTTPS access to each page, `/robots.txt`, `/sitemap.xml`, and `/social/home-og.png` without login or bot challenges.
- Submit `/sitemap.xml` in Google Search Console and Bing Webmaster Tools after verifying domain ownership there.
- Check key URLs in Google's Rich Results Test, Meta Sharing Debugger, and LinkedIn Post Inspector. Refresh previously cached previews where supported.
- Verify real shares in WhatsApp, iMessage, Slack, Discord, and X; these services control their final presentation and cache lifetimes.

Search indexing, rankings, and platform cache updates are external processes and are not guaranteed by metadata alone.
