import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";

// Reserved route. Not in the nav yet, because an empty section in the nav is
// worse than no section. Add it to components/Nav.tsx once there is a post.
export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on things I have built. Nothing published yet.",
  robots: { index: false, follow: true },
};

export default function WritingPage() {
  return (
    <main className="shell py-20 sm:py-28">
      <Reveal>
        <p className="eyebrow">Writing</p>
        <h1 className="display mt-4 max-w-3xl text-4xl sm:text-6xl">
          Nothing published <span className="serif text-accent">yet</span>
        </h1>
        <p className="mt-6 max-w-xl leading-relaxed text-muted">
          This route exists so the first post has somewhere to go. Until then
          the project write-ups are the long-form version.
        </p>
        <Link
          href="/projects"
          className="mt-10 inline-flex items-center gap-2 font-mono text-xs tracking-[0.12em] text-accent uppercase"
        >
          Read the case studies &rarr;
        </Link>
      </Reveal>
    </main>
  );
}
