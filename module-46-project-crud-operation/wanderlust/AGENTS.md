<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# wanderlust (module 46 CRUD practice project)

Next.js 16.4.3 App Router with a `src/` layout. Entry points are `src/app/page.tsx` and `src/app/layout.tsx`; the app is currently an empty scaffold (`page.tsx` renders an empty `<div>`), so CRUD logic will be written from scratch here.

## Commands

- `npm run dev` — Turbopack dev server; also regenerates `.next/dev/types` type stubs (included in `tsconfig.json`, so they go stale if the dev server hasn't run).
- `npm run build` — also runs type checking.
- `npm run lint` — ESLint 9 flat config (`eslint.config.mjs`), lints the project directory with no file args.
- `npx tsc --noEmit` — standalone typecheck (no `typecheck` script exists).
- No tests exist. There is no test setup.

## Non-obvious config

- `next.config.ts` enables `cacheComponents: true` and `reactCompiler: true`. With React Compiler on, don't add manual `useMemo`/`useCallback`/`useRefresh`-style workarounds — write plain code following the Rules of React. With `cacheComponents` on, async data fetching in pages must sit inside `<Suspense>` / cache boundaries or the build fails; this is Next 16 behavior, not legacy App Router behavior.
- Tailwind v4 with **no JS config file**: all theme/design tokens live in `src/app/globals.css`. CSS is processed through Turbopack via the `@tailwindcss/turbopack` loader rule in `next.config.ts` — don't look for or create `tailwind.config.*`.
- shadcn/ui uses the **base-nova** style (Base UI primitives, `@base-ui/react` + `@shadcn/react`, NOT the classic Radix/classic shadcn setup). `src/components/ui/*` is fully pre-scaffolded; add more via `npx shadcn add <component>` rather than hand-writing components.
- `cn` comes from the `cn` npm package — `src/lib/utils.ts` just re-exports it. Don't reimplement `cn` with `clsx` + `tailwind-merge`; neither is installed.
- Path alias `@/*` → `src/*` (matches `components.json` aliases).

## Repo context

- The git repo root is the parent `ML-8-Backend-Practice` workspace, which spans multiple learning modules (43–46); `wanderlust/` itself is currently untracked. Scope git operations deliberately — don't assume this folder is the repo root.
