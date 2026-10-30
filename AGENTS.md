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
- There is no dark mode. It was removed on purpose: the palette is three
  flat colours and a saturated paper has no dark counterpart. There is no
  `.dark` class, no `@custom-variant dark`, no theme toggle and no
  pre-paint script. Do not add a `dark:` utility anywhere.
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

One page. `app/page.tsx` is the site: hero, then sections with ids for
Projects (`#projects`), Stack (`#stack`), Experience
(`#experience`), About (`#about`) and Contact (`#contact`). The nav links to
those anchors and a scroll spy in `components/Nav.tsx` moves the pill. There
are no `/projects`, `/experience`, `/about` or `/contact` routes any more.
They were four thin pages holding three projects, one job and two degrees.
Do not recreate them.

Still real routes: `/projects/[slug]` for the case studies, because they are
long enough that inlining them would bury everything else, and `/writing`,
reserved and not in the nav.

- Hero: name as the h1, the positioning claim below it. The positioning is
  two real languages, not one plus a fallback: Java and Spring Boot for
  services that must stay correct, Python for data and geospatial work.
  Never write Python as optional, a tool, or "where it fits". Geospatial
  and GIS skills (GeoPandas, Shapely, Leaflet, raster data, the MSc
  geovisualisation and geographic data science modules) are named and
  credited as real skills. What still does not happen is leading with it:
  "geospatial specialist" is not the headline, not the hero line, and not
  what the site is about. Backend engineer who can handle spatial data, in
  that order. No visa or sponsorship detail anywhere on the public site.
- `#projects`: every project as a card. Two tiers still apply, see below.
- `#stack`: the six skill groups from `lib/site.ts`, labelled by what each
  thing is: language, framework, database, and so on. Nothing goes in that
  does not exist yet.
- `#experience`: the NETPARAM/Dealkarts internship, then education, then
  certifications. CV download lives in the hero and in `#contact`.
- `#about`: short background, the portrait (set `site.photo` to a file in
  `public/`, the section renders it only when that is non-null), and the
  Now/Based in/Looking for/Languages card. Keep it short.
- `#contact`: the email address itself as the primary button, the copy
  button, CV download, then GitHub and LinkedIn with their handles.

### Headings

Section titles are plain labels or plain statements. The italic serif accent
word appears exactly twice on the home page: the hero and the contact
heading. One in every heading is what made the site read as written to a
formula. Do not add a third, and do not reach for the "X, and Y" or
"not X, but Y" shapes that the copy was stripped of.

### Temporary

`components/PaletteLab.tsx` and its line in `app/layout.tsx` are a palette
comparison tool, not a feature. Delete both once the palette is settled.

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

As built: three flat colours, set in `app/globals.css` and nowhere else.
Paper and ink from one of the natural-dye palettes, plus a third colour that
is a different hue from the ink rather than a different value of it, which
is what keeps it readable at 11px. `--border` runs at full ink strength, so
card edges and grid lines are printed rules, not hairlines, and `--surface`
equals `--background`, so cards are outline-only. All three are deliberate.
Nothing on the site may introduce a fourth colour: status, state and
emphasis are carried by fill, weight and rules instead. Type is Geist Sans
and Mono with Instrument Serif italic, and the italic is rationed to twice
on the home page, not once per heading.

Movement is scroll reveals, a hero word stagger, a magnetic pull on buttons,
a cursor spotlight on cards, a scroll progress hairline, and the mandala.
`components/Mandala.tsx` renders once, large, bleeding off the right of the
hero, rotating with scroll position. It expands to roughly 490 elements, so
it stays a single instance and is not repeated down the page. Nothing loops
or demands attention while you are reading. The scrolling technology ribbon
and the Daily tools grid were both removed on purpose. Do not bring either
back. The `tools` array is still in `lib/site.ts` in case that section
returns.

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
