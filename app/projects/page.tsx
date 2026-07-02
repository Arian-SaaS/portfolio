import type { Metadata } from "next";
import { SectionHeading } from "@/components/sections/section-heading";
import { ProjectCard } from "@/components/project/project-card";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { FadeIn } from "@/components/motion/fade-in";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Production enterprise systems — AI platforms, SaaS operating systems, CRM, HR, finance, and marketplace applications.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <FadeIn>
        <SectionHeading
          eyebrow="Featured Projects"
          title="Production systems, not tutorials"
          description="Each project page covers the business problem, architecture decisions, engineering challenges, and outcomes — without exposing proprietary implementation details."
        />
      </FadeIn>
      <BentoGrid className="mt-12">
        {projects.map((project, i) => (
          <BentoCard key={project.slug} span={i === 0 ? "md" : "sm"}>
            <ProjectCard project={project} featured={i === 0} />
          </BentoCard>
        ))}
      </BentoGrid>
    </div>
  );
}
