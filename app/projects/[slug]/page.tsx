import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { caseStudies, getProject } from "@/lib/projects";

/**
 * Tells Next which slugs exist so these pages are built as static HTML at
 * build time instead of rendered on each request.
 */
export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

/**
 * In the App Router, `params` is a Promise, so it has to be awaited. That is
 * what lets Next start rendering the page before the route values resolve.
 */
export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);

  // `notFound()` throws, which is why nothing below needs a null check.
  if (!project?.caseStudy) notFound();

  const { caseStudy } = project;

  return (
    <main className="shell py-20 sm:py-28">
      <Reveal distance={10}>
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.12em] text-muted uppercase transition-colors hover:text-foreground"
        >
          <span className="inline-block transition-transform group-hover:-translate-x-1" aria-hidden>
            &larr;
          </span>
          All projects
        </Link>
      </Reveal>

      <header className="mt-10 border-b border-border pb-12">
        <Reveal>
          <h1 className="display text-5xl sm:text-7xl">{project.name}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            {caseStudy.premise}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {caseStudy.meta.map((m) => (
              <div key={m.label}>
                <dt className="eyebrow">{m.label}</dt>
                <dd className="mt-1.5 text-sm font-medium">{m.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {project.stack.length > 0 && (
          <Reveal delay={0.16}>
            <ul className="mt-8 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-border px-2.5 py-1 font-mono text-[11px] text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {(project.links?.demo || project.links?.repo) && (
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-5 text-sm">
              {project.links.demo && (
                <a href={project.links.demo} target="_blank" rel="noreferrer" className="link-underline font-medium">
                  Live site
                </a>
              )}
              {project.links.repo && (
                <a href={project.links.repo} target="_blank" rel="noreferrer" className="link-underline font-medium">
                  Source code
                </a>
              )}
            </div>
          </Reveal>
        )}
      </header>

      {/* The numbered sections. `index + 1` is padded to "01", "02" and so on. */}
      <div className="mt-16 flex flex-col gap-16">
        {caseStudy.sections.map((section, i) => (
          <Reveal as="section" key={section.heading}>
            <div className="grid gap-6 md:grid-cols-[8rem_1fr] md:gap-10">
              <p className="font-mono text-xs tracking-[0.14em] text-muted uppercase md:pt-1.5">
                {String(i + 1).padStart(2, "0")}
              </p>
              <div>
                <h2 className="display text-2xl sm:text-3xl">{section.heading}</h2>
                <div className="mt-5 flex max-w-2xl flex-col gap-4">
                  {section.body.map((paragraph, pi) => (
                    <p key={pi} className="leading-relaxed text-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-24 border-t border-border pt-10">
          <Link href="/projects" className="group font-mono text-xs tracking-[0.12em] text-accent uppercase">
            Back to all projects
            <span className="ml-1.5 inline-block transition-transform group-hover:translate-x-1" aria-hidden>
              &rarr;
            </span>
          </Link>
        </div>
      </Reveal>
    </main>
  );
}
