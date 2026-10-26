import Link from "next/link";
import AnimatedHeading from "@/components/AnimatedHeading";
import Magnetic from "@/components/Magnetic";
import Marquee from "@/components/Marquee";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Spotlight from "@/components/Spotlight";
import { featuredProjects } from "@/lib/projects";
import { experience, facts, site, skills, socials, tools } from "@/lib/site";

export default function Home() {
  // The most recent role. `[0]` is safe here because the array is never empty,
  // but the `?.` keeps TypeScript happy if a future edit empties it.
  const latestRole = experience[0];

  return (
    <main>
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden">
        {/* Decorative grid, faded out by a mask. aria-hidden because it
            carries no meaning for a screen reader. */}
        <div aria-hidden className="grid-veil absolute inset-0 -z-10 opacity-60" />

        <div className="shell pt-20 pb-16 sm:pt-28 sm:pb-24">
          <Reveal distance={10}>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/70 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
              <span className="relative grid size-1.5 place-items-center">
                <span className="absolute size-full animate-ping rounded-full bg-accent/70" />
                <span className="size-full rounded-full bg-accent" />
              </span>
              Open to Sept 2026 graduate roles
            </p>
          </Reveal>

          <AnimatedHeading
            text="I build backends that stay correct when two people want the same thing."
            serifWords={["correct"]}
            className="display mt-8 max-w-4xl text-4xl sm:text-6xl lg:text-7xl"
          />

          <Reveal delay={0.35} className="mt-8 max-w-xl">
            <p className="text-lg leading-relaxed text-muted">{site.positioning}</p>
          </Reveal>

          <Reveal delay={0.45} className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent hover:text-accent-contrast"
              >
                View projects
                <span aria-hidden>&rarr;</span>
              </Link>
            </Magnetic>
            <Magnetic>
              <a
                href={site.cv} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-accent/50"
              >
                Download CV
              </a>
            </Magnetic>
            <ul className="ml-1 flex flex-wrap items-center gap-4">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noreferrer"
                    className="font-mono text-xs tracking-[0.12em] text-muted uppercase transition-colors hover:text-foreground"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Facts strip. The reference site puts invented metrics here;
            these are just true things, which reads better than "+12 years". */}
        <div className="shell">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-4">
            {facts.map((fact, i) => (
              <Reveal key={fact.label} delay={i * 0.06} className="bg-background p-5">
                <dt className="eyebrow">{fact.label}</dt>
                <dd className="mt-2 text-sm font-medium">{fact.value}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <div className="mt-20">
        <Marquee />
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Selected work                                                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="shell mt-24">
        <Reveal>
          <SectionHeading
            eyebrow="Selected work"
            title="Three projects, and the hard part of each"
            action={{ href: "/projects", label: "All projects" }}
          />
        </Reveal>

        {/* `.map` turns each project object into a card element. `key` lets
            React tell the items apart when the list changes. The index is used
            only to stagger the reveal, never as the key. */}
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.08} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Skills                                                           */}
      {/* ---------------------------------------------------------------- */}
      <section className="shell mt-28">
        <Reveal>
          <SectionHeading eyebrow="What I work with" title="The stack, honestly labelled" />
        </Reveal>
        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <Reveal key={group.group} delay={i * 0.06}>
              <h3 className="font-mono text-xs tracking-[0.14em] text-foreground uppercase">
                {group.group}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-border px-2 py-1 font-mono text-[11px] text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Experience preview                                               */}
      {/* ---------------------------------------------------------------- */}
      {latestRole && (
        <section className="shell mt-28">
          <Reveal>
            <SectionHeading
              eyebrow="Experience"
              action={{ href: "/experience", label: "Full history" }}
            />
          </Reveal>
          <Reveal delay={0.08}>
            <Spotlight className="mt-10">
              <article className="rounded-card border border-border bg-surface/60 p-7 transition-colors hover:border-accent/35 sm:p-9">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <h3 className="display text-2xl sm:text-3xl">{latestRole.title}</h3>
                  <p className="font-mono text-xs tracking-[0.12em] text-muted uppercase">
                    {latestRole.period}
                  </p>
                </div>
                <p className="mt-2 text-sm text-accent">
                  {latestRole.company} &middot; {latestRole.location}
                </p>
                <p className="mt-5 max-w-2xl leading-relaxed text-muted">
                  {latestRole.summary}
                </p>
              </article>
            </Spotlight>
          </Reveal>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Tools                                                            */}
      {/* ---------------------------------------------------------------- */}
      <section className="shell mt-28">
        <Reveal>
          <SectionHeading eyebrow="Daily tools" />
        </Reveal>
        <ul className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-4">
          {tools.map((tool, i) => (
            <Reveal as="li" key={tool.name} delay={i * 0.04} className="bg-background">
              <a
                href={tool.href}
                target="_blank"
                rel="noreferrer"
                className="group block h-full p-5 transition-colors hover:bg-surface"
              >
                <p className="text-sm font-medium transition-colors group-hover:text-accent">
                  {tool.name}
                </p>
                <p className="mt-1.5 font-mono text-[11px] text-muted">{tool.use}</p>
              </a>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Closing call to action                                           */}
      {/* ---------------------------------------------------------------- */}
      <section className="shell mt-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-card border border-border px-7 py-14 text-center sm:px-12 sm:py-20">
            <div aria-hidden className="grid-veil absolute inset-0 -z-10 opacity-50" />
            <p className="eyebrow">Next step</p>
            <h2 className="display mx-auto mt-5 max-w-2xl text-3xl sm:text-5xl">
              Looking for a graduate engineer who <span className="serif text-accent">reads the code</span> before changing it?
            </h2>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Magnetic>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent hover:text-accent-contrast"
                >
                  Get in touch
                  <span aria-hidden>&rarr;</span>
                </Link>
              </Magnetic>
              <Magnetic>
                <a
                  href={site.cv} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-accent/50"
                >
                  Download CV
                </a>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
