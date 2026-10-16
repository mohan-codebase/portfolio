<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Preserve the established visual style

User preference: keep the original border-radius style in all future development unless the user explicitly requests a change.

- Use the existing rounded hierarchy: main cards and form panels use `rounded-3xl`; smaller nested surfaces and inputs use `rounded-2xl`; large feature panels use the established 2.5rem–3.5rem radii. Preserve existing detail-image radii.
- Keep buttons, badges, and navigation pill-shaped (`rounded-full`).
- Match new components to comparable existing components. Do not flatten corners, reduce radii globally, or add CSS overrides that replace their established rounding.
- Preserve the warm monochrome palette, bold typography, thin borders, and subtle grain. Do not introduce a new brand accent color without an explicit user request; green is reserved for existing status/success indicators.
- Inspect the current UI and shared styles before making design changes. Extend the established design rather than introducing a different visual direction.
