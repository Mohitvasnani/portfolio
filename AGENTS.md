# Portfolio

Personal portfolio site. MSc Computer Science student at Liverpool,
applying for UK placements and Sept 2026 graduate roles. Recruiters are
the audience. This site is the CV.

## Commands

```bash
npm run dev      # dev server at localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

No test suite yet.

## Stack

- Next.js 16.3.1, App Router only. No `pages/` directory.
- React 19.2.8
- TypeScript, strict mode
- Tailwind CSS v4. Uses `@import "tailwindcss"` in globals.css, NOT the
  v3 `@tailwind` directives. Theme tokens go in `@theme inline {}`.
- No `src/` directory. The `@/` path alias resolves to the repo root.

## Conventions

- Server components by default. `"use client"` only where genuinely needed.
- Tailwind only. No CSS files beyond globals.css.
- No component libraries. Build the components.
- CSS custom properties (`--background`, `--foreground`) live in `:root`
  and map into Tailwind via `@theme inline`. Dark mode via
  `@media (prefers-color-scheme: dark)`.
- Fonts load through `next/font/google` as CSS variables on `<html>`.

## Site content plan

Pages, in nav order: Home, Projects, Experience, About, Contact. Writing
(`/writing`) is a reserved route, no content yet.

- Home: one-line positioning, current status (MSc geospatial, Liverpool,
  graduating Sept 2026, open to placements/grad roles). No visa or
  sponsorship detail here, that stays off the public site. Three
  flagship project cards, a short skills strip, CTAs to
  Projects/CV/Contact.
- Projects: two tiers. Full case-study subpages for TrainRadar and
  Device Depot only (problem, architecture, the hard technical part,
  result). Everything else is a card on the index page only: screenshot,
  2-3 line summary, stack tags, links. No subpage.
- Experience: NETPARAM/Dealkarts internship, education, certifications,
  skills matrix, CV download button.
- About: short personal background, current status, one or two
  humanising details. Keep it short.
- Contact: email, LinkedIn, GitHub, location. One screen, no form unless
  asked for one.

## Projects to feature

- TrainRadar: real-time GB train position map. MSc dissertation.
  Case-study subpage. Held back until after the dissertation is
  submitted (11 Sept 2026). Don't build this page before then.
- DeviceDepot: MERN e-commerce app, deployed. Case-study subpage.
- Anything else (a post-dissertation project, MapLibre OSS work, etc.)
  is a card only, added once it actually exists. UK Crime Heatmap was
  dropped and was never built. Don't include it anywhere.

## Design direction

Recruiters are the primary audience, but that's not a reason to play it
safe. Some creativity and personality in the design is good, and this is
also a chance to learn animation properly. Default to simple and subtle
rather than flashy or overly "designy," but it's fine to try a new
pattern and pull it back later if it doesn't earn its place. Prefer
Framer Motion for anything beyond a CSS transition.

## Learning mode

This project is also how I'm relearning JavaScript and learning
TypeScript and Next.js (App Router), not just Claude Code. When you
introduce a JS/TS pattern or Next.js/App Router convention that isn't
obvious (array methods, closures, async/await, generics, Server vs
Client Components, `params` as a promise, etc.), add a short
explanation of what it does and why. Keep it brief, a momentary
reminder, not an essay.

## Working style

- Small changes. Show me the diff. Don't rewrite whole files.
- Don't install packages without asking.
- Don't read node_modules beyond what AGENTS.md instructs.
- Ask before adding abstractions. This is a small site.
