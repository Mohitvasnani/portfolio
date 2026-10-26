import Link from "next/link";
import { site, socials } from "@/lib/site";

export default function Footer() {
  // Computed at build time on the server, so the year is right without
  // shipping any JavaScript for it.
  const year = new Date().getFullYear();

  return (
    <footer className="mt-32 border-t border-border">
      <div className="shell flex flex-col gap-8 py-12 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Currently</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
            {site.availability}. Based in {site.location}.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-block font-mono text-xs tracking-[0.12em] text-accent uppercase"
          >
            Get in touch &rarr;
          </Link>
        </div>

        <div className="flex flex-col gap-4 sm:items-end">
          <ul className="flex flex-wrap gap-5">
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
          <p className="font-mono text-[11px] text-muted">
            &copy; {year} {site.name}. Built with Next.js.
          </p>
        </div>
      </div>
    </footer>
  );
}
