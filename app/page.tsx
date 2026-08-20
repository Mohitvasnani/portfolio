import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col items-start gap-8 px-6 py-24 sm:px-16 sm:py-32">
      <div>
        {/* TODO: placeholder copy, finalize name/positioning statement later */}
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Mohit Vasnani
        </h1>
        <p className="mt-4 max-w-xl text-lg text-foreground/70">
          Placeholder positioning statement — one line on what I do and what
          I&apos;m looking for.
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          href="/projects"
          className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          View Projects
        </Link>
        <Link
          href="/contact"
          className="rounded-full border border-foreground/20 px-6 py-3 text-sm font-medium transition-colors hover:bg-foreground/5"
        >
          Contact
        </Link>
      </div>
    </section>
  );
}
