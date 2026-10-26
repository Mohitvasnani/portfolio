import type { Metadata } from "next";
import CopyEmail from "@/components/CopyEmail";
import Magnetic from "@/components/Magnetic";
import Reveal from "@/components/Reveal";
import { site, socials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} — email, LinkedIn and GitHub.`,
};

export default function ContactPage() {
  return (
    <main className="shell py-20 sm:py-28">
      <Reveal>
        <p className="eyebrow">Contact</p>
        <h1 className="display mt-4 max-w-3xl text-4xl sm:text-6xl">
          Email is <span className="serif text-accent">quickest</span>
        </h1>
        <p className="mt-6 max-w-xl leading-relaxed text-muted">
          {site.availability}. If you are hiring, a short note about the team
          and the stack is enough to start a conversation.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-12 flex flex-wrap items-center gap-3">
          <Magnetic>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent hover:text-accent-contrast"
            >
              {site.email}
            </a>
          </Magnetic>
          <CopyEmail email={site.email} />
        </div>
      </Reveal>

      <Reveal delay={0.18}>
        <ul className="mt-16 flex flex-col divide-y divide-border border-y border-border">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
                className="group flex items-baseline justify-between gap-6 py-6 transition-colors hover:text-accent"
              >
                <span className="font-mono text-xs tracking-[0.14em] uppercase">{s.label}</span>
                <span className="flex items-center gap-3 text-sm text-muted transition-colors group-hover:text-accent">
                  {s.handle}
                  <span className="inline-block transition-transform group-hover:translate-x-1" aria-hidden>
                    &rarr;
                  </span>
                </span>
              </a>
            </li>
          ))}
          <li>
            <a
              href={site.cv} target="_blank" rel="noreferrer"
              className="group flex items-baseline justify-between gap-6 py-6 transition-colors hover:text-accent"
            >
              <span className="font-mono text-xs tracking-[0.14em] uppercase">CV</span>
              <span className="flex items-center gap-3 text-sm text-muted transition-colors group-hover:text-accent">
                Download PDF
                <span className="inline-block transition-transform group-hover:translate-y-0.5" aria-hidden>
                  &darr;
                </span>
              </span>
            </a>
          </li>
        </ul>
      </Reveal>

      <Reveal delay={0.24}>
        <p className="mt-10 font-mono text-[11px] text-muted">
          Based in {site.location}. Usually replying within a day.
        </p>
      </Reveal>
    </main>
  );
}
