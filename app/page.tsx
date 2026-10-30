import AnimatedHeading from "@/components/AnimatedHeading";
import Avatar from "@/components/Avatar";
import CopyEmail from "@/components/CopyEmail";
import Magnetic from "@/components/Magnetic";
import Mandala from "@/components/Mandala";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { allProjects } from "@/lib/projects";
import {
  certifications,
  education,
  experience,
  facts,
  site,
  skills,
  socials,
} from "@/lib/site";

// The whole site is this page. Projects, experience, about and contact are
// sections with ids rather than routes, and the nav scrolls to them. Only the
// case studies at /projects/[slug] are still pages of their own, because they
// are long enough that inlining them would bury everything else.
//
// `scroll-padding-top` in globals.css already offsets the sticky nav, so an
// anchor lands below it rather than underneath it.
export default function Home() {
  return (
    <main className="relative">
      {/* Fixed to the viewport rather than sitting inside the hero, so it
          stays on the right the whole way down and keeps turning as you
          scroll. Exactly half: the wrapper is 52rem wide at right-0 with a
          -26rem right margin, so its centre lands on the viewport's right
          edge and the other half is off-screen.

          z-0, not -z-10. A negative z-index would put it behind the body's
          own background and it would never be visible. The page content is
          lifted to z-10 instead.

          Hidden below sm, where there is no spare width for it. */}
      <Mandala
        speed={0.08}
        className="pointer-events-none fixed top-1/2 right-0 z-0 -mt-[26rem] -mr-[26rem] hidden aspect-square w-[52rem] text-foreground opacity-[0.16] sm:block"
      />

      <div className="relative z-10">
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden">
        <div className="shell pt-20 pb-16 sm:pt-28 sm:pb-24">
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

              <AnimatedHeading
                text={site.name}
                className="display mt-7 text-6xl sm:text-7xl lg:text-8xl"
              />

              {/* One of only two italic accent words on the page. The other is
                  in the contact block. Using it on every heading is what made
                  the whole site read as written to a formula. */}
              <Reveal delay={0.3} className="mt-7 max-w-3xl">
                <p className="text-2xl leading-[1.18] font-medium tracking-[-0.02em] text-balance sm:text-3xl lg:text-4xl">
                  Two people tap the same seat at the same moment.{" "}
                  <span className="serif text-accent">Exactly one</span> of them
                  should get it.
                </p>
              </Reveal>

              <Reveal delay={0.4} className="mt-7 max-w-xl">
                <p className="leading-relaxed text-muted">{site.positioning}</p>
              </Reveal>

              <Reveal delay={0.5} className="mt-10 flex flex-wrap items-center gap-3">
                <Magnetic>
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent hover:text-accent-contrast"
                  >
                    See the projects
                    <span aria-hidden>&darr;</span>
                  </a>
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
      {/* Projects                                                         */}
      {/* ---------------------------------------------------------------- */}
      <section id="projects" className="shell mt-28 scroll-mt-24">
        <Reveal>
          <SectionHeading eyebrow="Projects" title="What I have built" />
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {allProjects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.08} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Stack                                                            */}
      {/* ---------------------------------------------------------------- */}
      <section id="stack" className="shell mt-28 scroll-mt-24">
        <Reveal>
          <SectionHeading eyebrow="Stack" />
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
      {/* Experience                                                       */}
      {/* ---------------------------------------------------------------- */}
      <section id="experience" className="shell mt-28 scroll-mt-24">
        <Reveal>
          <SectionHeading eyebrow="Experience" title="One job, two degrees" />
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
                  <ul className="mt-6 flex flex-wrap gap-1.5">
                    {role.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-md border border-border px-2 py-1 font-mono text-[11px] text-muted"
                      >
                        {tech}
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

        <Reveal className="mt-16">
          <div className="border-b border-border pb-4">
            <p className="eyebrow">Certifications</p>
          </div>
        </Reveal>
        <ul className="mt-10 grid gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-3">
          {certifications.map((cert, i) => (
            <Reveal as="li" key={cert.name} delay={i * 0.06} className="bg-background p-5">
              <p className="text-sm font-medium">{cert.name}</p>
              <p className="mt-1.5 font-mono text-[11px] text-muted">{cert.issuer}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* About                                                            */}
      {/* ---------------------------------------------------------------- */}
      <section id="about" className="shell mt-28 scroll-mt-24">
        <Reveal>
          <SectionHeading eyebrow="About" title="The short version" />
        </Reveal>

        <div className="mt-12 grid gap-12 md:grid-cols-[1fr_18rem] md:gap-16">
          <Reveal className="flex max-w-2xl flex-col gap-5 leading-relaxed text-muted">
            <p>
              I am an MSc Advanced Computer Science student at the University of
              Liverpool, finishing in September 2026. Before that I read Computer
              Science with a cyber security specialism at JECRC University in
              Jaipur, and spent six months as a full-stack intern on a live
              commercial e-commerce platform.
            </p>
            <p>{site.intro}</p>
            <p>
              I work in two languages properly. Java and Spring Boot for
              services that have to hold up: schemas, state machines,
              concurrency, the parts where being wrong is expensive. Python for
              data and geospatial work, which is where my MSc has taken me
              through geovisualisation and geographic data science, and where I
              use GeoPandas, Shapely and the rest of that toolchain on real
              spatial data rather than tutorials.
            </p>
            <p>
              I think of myself as a backend engineer who can handle spatial
              data, in that order. The geospatial side is real work and I am
              not going to undersell it, but it is not what this site is
              about. On the front end I know enough TypeScript and React to
              build what I need myself.
            </p>
            <p>
              I grew up between Jaipur, Yaound&eacute; and Liverpool, which is
              the reason my French is conversational and my sense of &ldquo;home&rdquo; is
              negotiable. Outside work I shoot urban and architectural
              photography, mostly because it is the same habit as reading code:
              standing still long enough to notice how something was put
              together.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="flex flex-col gap-8 rounded-card border border-border bg-surface/60 p-6">
              <div>
                <p className="eyebrow">Now</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Finishing the MSc, building a Spring Boot booking service, and
                  working through data structures and algorithms in Java.
                </p>
              </div>
              <div>
                <p className="eyebrow">Based in</p>
                <p className="mt-2 text-sm text-muted">{site.location}</p>
              </div>
              <div>
                <p className="eyebrow">Looking for</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  A UK graduate software engineering role from September 2026,
                  ideally backend-leaning.
                </p>
              </div>
              <div>
                <p className="eyebrow">Languages</p>
                <p className="mt-2 text-sm text-muted">English, Hindi, conversational French</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Contact                                                          */}
      {/* ---------------------------------------------------------------- */}
      <section id="contact" className="shell mt-28 scroll-mt-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-card border border-border px-7 py-14 sm:px-12 sm:py-16">
            <div aria-hidden className="grid-veil absolute inset-0 -z-10 opacity-50" />

            <div className="text-center">
              <p className="eyebrow">Contact</p>
              <h2 className="display mx-auto mt-5 max-w-2xl text-3xl sm:text-5xl">
                I am looking for a UK graduate backend role,{" "}
                <span className="serif text-accent">starting September 2026</span>.
              </h2>

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
      </div>
    </main>
  );
}
