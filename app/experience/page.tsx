import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Magnetic from "@/components/Magnetic";
import { certifications, education, experience, site, skills } from "@/lib/site";

export const metadata: Metadata = {
  title: "Experience",
  description: "Work history, education, certifications and the full skills matrix.",
};

export default function ExperiencePage() {
  return (
    <main className="shell py-20 sm:py-28">
      <Reveal>
        <p className="eyebrow">Experience</p>
        <h1 className="display mt-4 max-w-3xl text-4xl sm:text-6xl">
          Where I have worked and <span className="serif text-accent">what I learned</span> there
        </h1>
        <div className="mt-8">
          <Magnetic>
            <a
              href={site.cv} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent hover:text-accent-contrast"
            >
              Download CV (PDF)
            </a>
          </Magnetic>
        </div>
      </Reveal>

      {/* ------------------------------------------------------------------ */}
      <section className="mt-20">
        <Reveal>
          <SectionHeading eyebrow="Work" />
        </Reveal>
        <div className="mt-10 flex flex-col gap-12">
          {experience.map((role, i) => (
            <Reveal as="article" key={role.company} delay={i * 0.08}>
              {/* A two-column grid on desktop: dates in the margin, content
                  beside it. On mobile it collapses to one column. */}
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
                        <span className="mt-[0.55rem] size-1 shrink-0 rounded-full bg-accent" aria-hidden />
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
      </section>

      {/* ------------------------------------------------------------------ */}
      <section className="mt-24">
        <Reveal>
          <SectionHeading eyebrow="Education" />
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

      {/* ------------------------------------------------------------------ */}
      <section className="mt-24">
        <Reveal>
          <SectionHeading eyebrow="Certifications" />
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

      {/* ------------------------------------------------------------------ */}
      <section className="mt-24">
        <Reveal>
          <SectionHeading eyebrow="Skills" />
        </Reveal>
        <div className="mt-10 flex flex-col divide-y divide-border">
          {skills.map((group, i) => (
            <Reveal key={group.group} delay={i * 0.05}>
              <div className="grid gap-4 py-6 md:grid-cols-[11rem_1fr] md:gap-10">
                <h3 className="font-mono text-xs tracking-[0.14em] text-foreground uppercase">
                  {group.group}
                </h3>
                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-border px-2 py-1 font-mono text-[11px] text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
