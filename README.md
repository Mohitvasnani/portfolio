# Portfolio

Personal portfolio site for Mohit Vasnani. Next.js 16 (App Router),
TypeScript, Tailwind CSS v4, deployed on Vercel.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

## Where things live

| Path | What it is |
|---|---|
| `app/` | Routes. One folder per page, App Router. |
| `app/projects/[slug]/` | Case-study pages, generated from `lib/projects.ts`. |
| `app/globals.css` | Design tokens, theme, keyframes, utilities. The only CSS file. |
| `components/` | Shared UI and the animation primitives. |
| `lib/projects.ts` | Every project. Add one here and it appears everywhere. |
| `lib/site.ts` | Bio, experience, education, certifications, skills, tools, socials. |
| `AGENTS.md` | Conventions and content plan. Read before changing anything. |

## Editing content

Nothing on the site hardcodes copy. To change what the site says, edit
`lib/site.ts` or `lib/projects.ts`.

A project with `tier: "case-study"` and a `caseStudy` object gets its own
page at `/projects/<slug>` automatically. A project with `tier: "card"` is
listed on the index only.

## Before deploying

- [x] CV PDF is at `public/Mohit-Vasnani-CV.pdf` (`site.cv` in `lib/site.ts`).
- [x] `site.url` resolves itself from Vercel's `VERCEL_PROJECT_PRODUCTION_URL`,
      which Vercel injects automatically. Nothing to configure. Override with
      `NEXT_PUBLIC_SITE_URL` if it ever needs forcing.
- [ ] Add the CineBook repo link once the repo is public.
- [ ] 15 Nov 2026: turn TrainRadar into a case study (see `lib/projects.ts`).
- [ ] Add an Open Graph image at `app/opengraph-image.png` (1200x630).

## Notes

- Dark mode is a `.dark` class on `<html>`, set before first paint by an
  inline script in `app/layout.tsx` and toggled by `components/ThemeToggle`.
- Every animation honours `prefers-reduced-motion`.
- TrainRadar is under a supervisor embargo until 15 November 2026. It is a
  card with no technical detail, no screenshots and no repo link until then.
