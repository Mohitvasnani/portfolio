@AGENTS.md



\# Portfolio



Personal portfolio site. MSc Computer Science student at Liverpool,

applying for UK placements and Sept 2026 graduate roles. Recruiters are

the audience. This site is the CV.



\## Commands



npm run dev      # dev server at localhost:3000

npm run build    # production build

npm run lint     # ESLint



No test suite yet.



\## Stack



\- Next.js 16.3.1, App Router only. No `pages/` directory.

\- React 19.2.8

\- TypeScript, strict mode

\- Tailwind CSS v4. Uses `@import "tailwindcss"` in globals.css, NOT the

&#x20; v3 `@tailwind` directives. Theme tokens go in `@theme inline {}`.

\- No `src/` directory. The `@/` path alias resolves to the repo root.



\## Conventions



\- Server components by default. `"use client"` only where genuinely needed.

\- Tailwind only. No CSS files beyond globals.css.

\- No component libraries. Build the components.

\- CSS custom properties (`--background`, `--foreground`) live in `:root`

&#x20; and map into Tailwind via `@theme inline`. Dark mode via

&#x20; `@media (prefers-color-scheme: dark)`.

\- Fonts load through `next/font/google` as CSS variables on `<html>`.



\## Projects to feature



\- TrainRadar: real-time GB train position map. MSc dissertation.

\- DeviceDepot: MERN e-commerce app, deployed.

\- UK Crime Heatmap: GIS project, Python and GeoPandas.



\## Working style



\- Small changes. Show me the diff. Don't rewrite whole files.

\- Don't install packages without asking.

\- Don't read node\_modules beyond what AGENTS.md instructs.

\- Ask before adding abstractions. This is a small site.

