# Repository Guidelines

## Project Structure & Module Organization
- `pages/` defines Next.js routes and page-level data fetching.
- `components/` hosts reusable UI pieces; most React components are PascalCase files.
- `layouts/` contains page and MDX layout wrappers.
- `lib/` provides shared utilities, helpers, and client/server glue code.
- `data/` holds content and configuration such as `data/blog/`, `data/authors/`,
  `data/siteMetadata.js`, and `data/headerNavLinks.ts`.
- `css/` stores Tailwind and global stylesheets; `public/` holds static assets.
- `scripts/` includes build helpers (sitemap/RSS generators); `types/` stores TS types.
- `contentlayer.config.ts` defines the MDX/contentlayer pipeline.

## Build, Test, and Development Commands
- `npm install` installs dependencies (Node 24.x per `package.json` engines).
- `npm run dev` (or `npm run start`) runs the local Next.js dev server.
- `npm run build` creates the production build; `npm run serve` runs it.
- `npm run lint` runs ESLint with auto-fixes across app code.
- `npm run analyze` builds with bundle analysis enabled.
- `npm run fix-contentlayer`, `npm run sitemap`, `npm run rss` generate content artifacts
  (also run via `npm run postbuild`).

## Coding Style & Naming Conventions
- TypeScript + React + Next.js; Tailwind for styling.
- Prettier rules: 2-space indentation, single quotes, no semicolons, 100-char lines,
  trailing commas; run `npm run lint` or format via lint-staged.
- Naming: React components in PascalCase (e.g., `components/ThemeSwitch.tsx`),
  functions/variables in camelCase, folders in lowercase.

## Testing Guidelines
- No automated test runner is configured and no `__tests__/` or `*.test.*` files exist.
- For changes, run `npm run lint`, then verify in `npm run dev`; use
  `npm run build` to catch production-only issues.
- If adding tests, place them in `__tests__/` or alongside files with
  `*.test.tsx`, and add a `npm test` script.

## Commit & Pull Request Guidelines
- Commit messages follow a `type: summary` pattern (e.g., `chore: update terminal interface`).
- Keep commits focused; avoid mixing content edits with tooling changes.
- PRs should include a short summary, testing notes (commands run), and screenshots
  for UI changes; link related issues when applicable.

## Configuration & Content
- Use `.env.example` as a baseline and keep secrets in `.env.local`.
- Blog content lives in `data/blog/`, author profiles in `data/authors/`.
- Site metadata and navigation live in `data/siteMetadata.js` and
  `data/headerNavLinks.ts`.
