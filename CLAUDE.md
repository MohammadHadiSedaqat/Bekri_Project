# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm install` — install dependencies from `package-lock.json`.
- `npm run dev` — start the Vite development server.
- `npm run build` — build the production bundle.
- `npm run preview` — preview the built bundle locally.
- `npm run lint` — run ESLint quietly over the configured source files.
- `npm run lint:fix` — run ESLint with autofix.
- `npm run typecheck` — run TypeScript/JS checking with `jsconfig.json`.

There is no test script configured in `package.json`; add one before documenting or running project tests. For targeted linting, use `npx eslint path/to/file.jsx --quiet`.

## Project overview

This is a Vite + React 18 single-page app for a Persian/RTL natural stone website. Routing is client-side via `react-router-dom` in `src/App.jsx`, with most public pages nested under `SiteLayout` so they share the header, footer, floating actions, scroll-to-top behavior, theme provider, auth provider, React Query provider, and toast host.

Data comes from Base44. `src/api/base44Client.js` builds the SDK client from `src/lib/app-params.js`, which reads Base44 app parameters from Vite env vars, URL query params, and localStorage. Entity schemas live in the root `entities/` directory (`Product`, `Project`, `BlogPost`, `Inquiry`) and the UI accesses them as `base44.entities.<Entity>` for listing, filtering, creating, updating, and deleting records.

The main public data flows are:

- Collection pages use static category metadata from `src/lib/constants.js` and dynamic product records from Base44.
- Product detail pages fetch a single `Product` by route id and create `Inquiry` records for price requests.
- Contact creates `Inquiry` records directly.
- Home composes feature sections from `src/components/home/`; some sections query Base44 while others use static constants/assets.
- Admin is an authenticated CRUD panel for products, projects, blog posts, and inquiries. It checks `useAuth()` and requires `user.is_admin`; admin tab content is split under `src/components/admin/` and uses shared table/modal/field/delete-confirm primitives.

## Styling and UI conventions

The app is RTL by default (`body { direction: rtl; }`) and most copy is Persian. Keep layouts and labels RTL-aware; use `dir="ltr"` only for Latin text, URLs, phone numbers, slugs, and similar fields.

Tailwind is configured in `tailwind.config.js` with shadcn/Radix-style design tokens and Bekri-specific colors. Global CSS variables and light/dark theme values are in `src/index.css`; components commonly use `var(--bekri-*)` CSS variables inside Tailwind arbitrary values. Theme state is managed by `src/lib/ThemeContext.jsx` and persisted as `bekri-theme` in localStorage.

Reusable primitive UI components are under `src/components/ui/` and are excluded from ESLint/typecheck by the current config. Prefer using these existing primitives for dialogs, forms, tabs, tables, toasts, etc. rather than adding new UI libraries.

## Configuration notes

- Path alias `@/*` maps to `src/*` via `jsconfig.json`; imports throughout the app use this alias.
- `vite.config.js` uses `@base44/vite-plugin` before the React plugin. Base44 options include HMR/navigation notifiers, analytics tracking, and visual edit agent support.
- ESLint currently covers `src/components/**/*.{js,mjs,cjs,jsx}`, `src/pages/**/*.{js,mjs,cjs,jsx}`, and `src/Layout.jsx`, while ignoring `src/lib/**/*` and `src/components/ui/**/*`.
- `jsconfig.json` enables `checkJs` but only includes `src/components/**/*.js`, `src/pages/**/*.jsx`, and `src/Layout.jsx`; it excludes `src/api`, `src/lib`, and `src/components/ui`.

## Repository quirks

- The admin page file is named `src/pages/Admin.jsx ` with a trailing space on disk, while imports reference `@/pages/Admin`. Be careful when reading, renaming, or editing this file because tools may normalize or omit the trailing space.
- There is no README, Cursor rule file, Copilot instructions file, or pre-existing `CLAUDE.md` in this repository at the time this file was created.
