import Link from "next/link";
import Spotlight from "@/components/Spotlight";
import type { Project } from "@/lib/projects";

const statusStyles: Record<Project["status"], string> = {
  live: "border-emerald-600/30 text-emerald-700 dark:border-emerald-400/30 dark:text-emerald-400",
  "in progress": "border-accent/40 text-accent",
  archived: "border-border text-muted",
  // Not greyed out. A release date reads as a commitment; "private" or
  // "embargoed" read as something being withheld.
  "public 15 Nov": "border-accent/40 text-accent",
};

export default function ProjectCard({ project }: { project: Project }) {
  const { slug, name, tagline, summary, stack, status, links, note, tier, year } =
    project;

  // A case study is only linkable once it has content to link to.
  const href = tier === "case-study" && project.caseStudy ? `/projects/${slug}` : null;

  // Boolean(...) coerces a possibly-undefined value to true/false, so the
  // JSX below can't accidentally render a stray string or 0.
  const hasFooter = Boolean(links?.demo || links?.repo || note || href);

  return (
    <Spotlight className="h-full">
      <article className="relative flex h-full flex-col gap-4 rounded-card border border-border bg-surface/60 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/35">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-lg font-medium tracking-tight">
              {/* A card with a case study is clickable as a whole. The absolute
                  span below stretches the link over the card, so the heading
                  stays the accessible name of the link rather than wrapping
                  everything in an <a>, which would nest the footer links. */}
              {href ? (
                <Link href={href} className="transition-colors hover:text-accent">
                  {name}
                  <span className="absolute inset-0 rounded-card" aria-hidden />
                </Link>
              ) : (
                name
              )}
            </h3>
            <p className="eyebrow mt-1.5 normal-case tracking-[0.1em]">{tagline}</p>
          </div>
          <span
            className={`shrink-0 rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-wider uppercase ${statusStyles[status]}`}
          >
            {status}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-muted">{summary}</p>

        {stack.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {stack.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-border/80 px-2 py-1 font-mono text-[11px] text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}

        {/* Only render the footer when there's something to put in it,
            otherwise cards with no links get a stray empty row. */}
        {hasFooter && (
          <div className="relative z-10 mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-sm">
            {href && (
              <Link href={href} className="group font-medium text-accent">
                Read the case study
                <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            )}
            {links?.demo && (
              <a href={links.demo} target="_blank" rel="noreferrer" className="link-underline font-medium">
                Live site
              </a>
            )}
            {links?.repo && (
              <a href={links.repo} target="_blank" rel="noreferrer" className="link-underline font-medium">
                Code
              </a>
            )}
            {note && <p className="text-xs text-muted">{note}</p>}
            <span className="ml-auto font-mono text-[11px] text-muted">{year}</span>
          </div>
        )}
      </article>
    </Spotlight>
  );
}
