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
- `motion` (the current name for Framer Motion) for animation. It is the only
  runtime dependency beyond Next and React.
- `agentRules: false` in next.config.ts, so Next 16 doesn't overwrite this file.
- No environment variables are required to build or run this site. `site.url`
  reads Vercel's automatic `VERCEL_PROJECT_PRODUCTION_URL` and falls back to
  localhost, so don't hardcode a domain in `lib/site.ts`.

## Conventions

- Server components by default. `"use client"` only where genuinely needed.
- Tailwind only. No CSS files beyond globals.css.
- No component libraries. Build the components.
- CSS custom properties (`--background`, `--foreground`, `--accent` and the
  rest) live in `:root` and map into Tailwind via `@theme inline`.
- Dark mode is a `.dark` class on `<html>`, not a media query, because the
  site has a manual theme toggle. `@custom-variant dark` in globals.css
  repoints Tailwind's `dark:` prefix at that class. An inline script in
  layout.tsx sets it before first paint so there is no flash.
- Fonts load through `next/font/google` as CSS variables on `<html>`.
- Project content lives in `lib/projects.ts` as one typed array. Everything
  else about me (bio, experience, education, certifications, skills, tools,
  socials, CV path) lives in `lib/site.ts`. Pages read from both and never
  hardcode copy.
- Animation goes through the shared primitives in `components/`, not through
  one-off `motion` imports in a page: `Reveal` (scroll-in), `AnimatedHeading`
  (word stagger, hero only), `Magnetic` (buttons), `Spotlight` (card hover),
  `ScrollProgress` (top hairline). All of them honour
  `prefers-reduced-motion`; anything new must too.
- `Reveal` is a Client Component that takes Server Component children, which
  is how most of the site stays server-rendered despite the animation.

## Site content plan

Pages, in nav order: Home, Projects, Experience, About, Contact. Writing
(`/writing`) is a reserved route, no content yet.

- Home: one-line positioning, current status (MSc Advanced Computer
  Science, Liverpool, open to graduate roles). The positioning is two
  real languages, not one plus a fallback: Java and Spring Boot for
  services that must stay correct, Python for data and geospatial
  work. Never write Python as optional, a tool, or "where it fits".
  Geospatial and GIS skills (GeoPandas, Shapely, Leaflet, raster data,
  the MSc geovisualisation and geographic data science modules) are
  named and credited as real skills. What still does not happen is
  leading with it: "geospatial specialist" is not the headline, not
  the hero line, and not what the site is about. Backend engineer who
  can handle spatial data, in that order. No visa or
  sponsorship detail here, that stays off the public site. Three
  flagship project cards, a short skills strip, CTAs to
  Projects/CV/Contact.
- Projects: two tiers. A case study is earned by having had real
  decisions to argue through, not by the project being good. That means
  CineBook and TrainRadar only. Device Depot is a card with a live link
  and nothing more: it was built to get a stack working end to end, not
  to settle a hard question, and a write-up concluding that would
  undercut itself. TrainRadar's page gets built once its embargo lifts,
  see below.
  Everything else is a card on the index page only: screenshot,
  2-3 line summary, stack tags, links. No subpage.
- Experience: NETPARAM/Dealkarts internship, education, certifications,
  skills matrix, CV download button.
- About: short personal background, current status, one or two
  humanising details. Keep it short.
- Contact: email, LinkedIn, GitHub, location. One screen, no form unless
  asked for one.

## Projects to feature

- CineBook: cinema seat booking backend. Java 21, Spring Boot 4, Gradle,
  PostgreSQL, Flyway, JUnit 5, Testcontainers, Docker, GitHub Actions.
  The flagship backend project. Case-study subpage. The technical hook is
  concurrency: two people must never book the same seat.
  The site lists only what the October scope actually builds. Redis,
  Kubernetes and auth are parked, so they are not claimed anywhere on the
  site until they exist. Add them to the stack when they are real.
- DeviceDepot: MERN e-commerce app, deployed and live at
  device-depot-gilt.vercel.app. Card only, no subpage. The backend is on
  Render's free tier and cold-starts, so the first visit after an idle
  period sits on empty skeletons for up to a minute.
- TrainRadar: real-time GB train position map. MSc dissertation,
  submitted Sept 2026. Under a supervisor embargo and cannot be posted
  publicly anywhere before 15 November 2026. Until then it is a
  card-only entry with no technical detail, no screenshots and no repo
  link. Build its case-study subpage after 15 Nov, not before: flip
  `tier` to "case-study", restore the stack, add the repo link and write
  the `caseStudy` block. The route generates itself from that.
  Its status tag is "embargoed", never "private", and it is styled in
  the accent colour rather than greyed out: the work is finished and
  marked, it just cannot be published yet. "Private" reads to a
  recruiter as something being hidden.
- Anything else (MapLibre OSS work, etc.) is a card only, added once it
  actually exists. UK Crime Heatmap was dropped and was never built.
  Don't include it anywhere.

## Design direction

Recruiters are the primary audience, but that's not a reason to play it
safe. Some creativity and personality in the design is good, and this is
also a chance to learn animation properly. Default to simple and subtle
rather than flashy or overly "designy," but it's fine to try a new
pattern and pull it back later if it doesn't earn its place. Prefer the
`motion` package (what Framer Motion is now published as) for anything
beyond a CSS transition.

As built: paper/ink neutrals with a single warm accent, Geist Sans and Mono
with Instrument Serif italic for one accent word per heading. Movement is
scroll reveals, a hero word stagger, a magnetic pull on buttons, a cursor
spotlight on cards, a CSS-only marquee and a scroll progress hairline.
Nothing loops or demands attention while you are reading.

## Learning mode

This project is also how I'm relearning JavaScript and learning
TypeScript and Next.js (App Router), not just Claude Code. When you
introduce a JS/TS pattern or Next.js/App Router convention that isn't
obvious (array methods, closures, async/await, generics, Server vs
Client Components, `params` as a promise, etc.), add a short
explanation of what it does and why. Keep it brief, a momentary
reminder, not an essay.

After finishing a task, give me a 2-3 line plain-English summary of what
changed and why, before moving on to the next task. Don't just show the
diff and wait, actually explain it.

## Working style

- Small changes. Show me the diff. Don't rewrite whole files.
- Don't install packages without asking.
- Don't read node_modules beyond what AGENTS.md instructs.
- Ask before adding abstractions. This is a small site.
