import Link from "next/link";

export default function NotFound() {
  return (
    <main className="shell flex flex-col items-start py-28 sm:py-36">
      <p className="eyebrow">404</p>
      <h1 className="display mt-4 text-4xl sm:text-6xl">
        That page does not <span className="serif text-accent">exist</span>
      </h1>
      <p className="mt-6 max-w-md leading-relaxed text-muted">
        The link is either wrong or pointed at something that has since moved.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent hover:text-accent-contrast"
      >
        Back home
        <span aria-hidden>&rarr;</span>
      </Link>
    </main>
  );
}
