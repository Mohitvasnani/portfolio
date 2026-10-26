import Link from "next/link";

/** The small mono label plus optional "see all" link above every section. */
export default function SectionHeading({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        {title && (
          <h2 className="display mt-3 text-2xl sm:text-3xl">{title}</h2>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="group font-mono text-xs tracking-[0.12em] text-muted uppercase transition-colors hover:text-foreground"
        >
          {action.label}
          <span className="ml-1.5 inline-block transition-transform group-hover:translate-x-1">
            &rarr;
          </span>
        </Link>
      )}
    </div>
  );
}
