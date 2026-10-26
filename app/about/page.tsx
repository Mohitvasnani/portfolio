import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Short version: where I am from, what I am doing now, and how I work.",
};

export default function AboutPage() {
  return (
    <main className="shell py-20 sm:py-28">
      <Reveal>
        <p className="eyebrow">About</p>
        <h1 className="display mt-4 max-w-3xl text-4xl sm:text-6xl">
          The <span className="serif text-accent">short</span> version
        </h1>
      </Reveal>

      <div className="mt-14 grid gap-12 md:grid-cols-[1fr_16rem] md:gap-16">
        <Reveal className="flex max-w-2xl flex-col gap-5 text-lg leading-relaxed text-muted">
          <p>
            I am an MSc Advanced Computer Science student at the University of
            Liverpool, finishing in September 2026. Before that I read Computer
            Science with a cyber security specialism at JECRC University in
            Jaipur, and spent six months as a full-stack intern on a live
            commercial e-commerce platform.
          </p>
          <p>
            {site.intro}
          </p>
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
            That second half is not a sideline, but it is also not my whole
            pitch. I am a backend engineer who can handle spatial data, which
            is a more useful thing to be than either one on its own. On the
            front end I am comfortable enough with TypeScript and React to
            build the thing I need rather than wait for someone to build it
            for me.
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
            <Link href="/contact" className="font-mono text-xs tracking-[0.12em] text-accent uppercase">
              Get in touch &rarr;
            </Link>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
