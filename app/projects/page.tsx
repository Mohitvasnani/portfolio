import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { allProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Backend and full-stack projects, with write-ups on the parts that were actually hard.",
};

export default function ProjectsPage() {
  return (
    <main className="shell py-20 sm:py-28">
      <Reveal>
        <p className="eyebrow">Projects</p>
        <h1 className="display mt-4 max-w-3xl text-4xl sm:text-6xl">
          A few things I have built, and the part that was <span className="serif text-accent">actually difficult</span>
        </h1>
        <p className="mt-6 max-w-xl leading-relaxed text-muted">
          Where I had real decisions to argue through, there is a full
          write-up. Where I did not, there is a card and a link, which is all
          that project needs.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {allProjects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.08} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </main>
  );
}
