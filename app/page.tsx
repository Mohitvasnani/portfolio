import Link from "next/link";
import AnimatedHeading from "@/components/AnimatedHeading";
import Avatar from "@/components/Avatar";
import CopyEmail from "@/components/CopyEmail";
import Magnetic from "@/components/Magnetic";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { featuredProjects } from "@/lib/projects";
import { education, experience, facts, site, skills, socials, tools } from "@/lib/site";

export default function Home() {
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
          {/* Two columns on desktop so the portrait fills the empty right
              side. `minmax(0,1fr)` rather than `1fr` stops the long heading
              from forcing the column wider than the grid. On mobile it is a
              single column and the portrait leads. */}
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          <div>
          <Reveal distance={10}>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/70 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
              <span className="relative grid size-1.5 place-items-center">
                <span className="absolute size-full animate-ping rounded-full bg-accent/70" />
                <span className="size-full rounded-full bg-accent" />
              </span>
              Open to Sept 2026 graduate roles
            </p>
          </Reveal>

          {/* The name is the h1. Nobody should have to hunt for whose site
              this is, and "Mohit Vasnani" is also the thing people type into
              a search box. The claim below it carries the positioning, which
              is why it stays large rather than becoming body copy. */}
          <AnimatedHeading
            text={site.name}
            className="display mt-7 text-6xl sm:text-7xl lg:text-8xl"
          />

          <Reveal delay={0.3} className="mt-7 max-w-3xl">
            {/* Deliberately not the `.display` class. Its 0.95 line-height
                suits the name above but crushes a wrapping paragraph, and it
                beats a `leading-*` utility on source order, so the type is
                set directly here instead. */}
            <p className="text-2xl leading-[1.18] font-medium tracking-[-0.02em] text-balance sm:text-3xl lg:text-4xl">
              I build backends that stay{" "}
              <span className="serif text-accent">correct</span> when two
              people want the same thing.
            </p>
          </Reveal>

          <Reveal delay={0.4} className="mt-7 max-w-xl">
            <p className="leading-relaxed text-muted">{site.positioning}</p>
          </Reveal>

          <Reveal delay={0.5} className="mt-10 flex flex-wrap items-center gap-3">
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

          <Reveal
            delay={0.2}
            className="order-first w-40 justify-self-start sm:w-56 lg:order-last lg:w-72 lg:justify-self-end"
          >
            <Avatar />
          </Reveal>
          </div>
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

      {/* ---------------------------------------------------------------- */}
      {/* Selected work                                                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="shell mt-28">
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
          <SectionHeading eyebrow="Stack" title="What I work with" />
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
      {/* Experience and education                                         */}
      {/* ---------------------------------------------------------------- */}
      {/* Same date-in-the-margin layout as /experience, so the two pages
          read as one document. /experience still owns the certifications
          and the full skills matrix, which is what "Full history" goes to. */}
      <section className="shell mt-28">
        <Reveal>
          <SectionHeading
            eyebrow="Experience"
            title="Where I have worked and studied"
            action={{ href: "/experience", label: "Full history" }}
          />
        </Reveal>

        <div className="mt-10 flex flex-col gap-12">
          {experience.map((role, i) => (
            <Reveal as="article" key={role.company} delay={i * 0.08}>
              <div className="grid gap-6 md:grid-cols-[11rem_1fr] md:gap-10">
                <div>
                  <p className="font-mono text-xs tracking-[0.12em] text-muted uppercase">
                    {role.period}
                  </p>
                  <p className="mt-1.5 font-mono text-[11px] text-muted">{role.location}</p>
                </div>
                <div>
                  <h3 className="display text-2xl sm:text-3xl">{role.title}</h3>
                  <p className="mt-2 text-sm text-accent">{role.company}</p>
                  <p className="mt-5 max-w-2xl leading-relaxed text-muted">{role.summary}</p>
                  <ul className="mt-5 flex max-w-2xl flex-col gap-2.5">
                    {role.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                        <span
                          className="mt-[0.55rem] size-1 shrink-0 rounded-full bg-accent"
                          aria-hidden
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <div className="border-b border-border pb-4">
            <p className="eyebrow">Education</p>
          </div>
        </Reveal>
        <div className="mt-10 flex flex-col gap-10">
          {education.map((item, i) => (
            <Reveal as="article" key={item.institution} delay={i * 0.08}>
              <div className="grid gap-6 md:grid-cols-[11rem_1fr] md:gap-10">
                <div>
                  <p className="font-mono text-xs tracking-[0.12em] text-muted uppercase">
                    {item.period}
                  </p>
                  <p className="mt-1.5 font-mono text-[11px] text-muted">{item.location}</p>
                </div>
                <div>
                  <h3 className="text-xl font-medium tracking-tight">{item.qualification}</h3>
                  <p className="mt-1.5 text-sm text-accent">{item.institution}</p>
                  {item.detail && (
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
                      {item.detail}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

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
      {/* Contact                                                          */}
      {/* ---------------------------------------------------------------- */}
      <section className="shell mt-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-card border border-border px-7 py-14 sm:px-12 sm:py-16">
            <div aria-hidden className="grid-veil absolute inset-0 -z-10 opacity-50" />

            <div className="text-center">
              <p className="eyebrow">Contact</p>
              <h2 className="display mx-auto mt-5 max-w-2xl text-3xl sm:text-5xl">
                I am looking for a UK graduate backend role, <span className="serif text-accent">starting September 2026</span>.
              </h2>

              {/* The address itself is the primary button rather than a "get
                  in touch" link, so it can be read, clicked or copied without
                  loading another page. */}
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Magnetic>
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent hover:text-accent-contrast"
                  >
                    {site.email}
                  </a>
                </Magnetic>
                <CopyEmail email={site.email} />
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

            {/* `.filter` drops the email row. The address is the button
                above, so a second copy of it here would just be noise. */}
            <ul className="mx-auto mt-12 flex max-w-xl flex-col divide-y divide-border border-t border-border">
              {socials
                .filter((s) => s.label !== "Email")
                .map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-baseline justify-between gap-6 py-4 transition-colors hover:text-accent"
                    >
                      <span className="font-mono text-xs tracking-[0.14em] uppercase">
                        {s.label}
                      </span>
                      <span className="flex items-center gap-3 text-sm text-muted transition-colors group-hover:text-accent">
                        {s.handle}
                        <span
                          className="inline-block transition-transform group-hover:translate-x-1"
                          aria-hidden
                        >
                          &rarr;
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
            </ul>

            <p className="mt-8 text-center font-mono text-[11px] text-muted">
              Based in {site.location}. Usually replying within a day.
            </p>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
