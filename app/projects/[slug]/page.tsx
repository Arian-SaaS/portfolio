import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { SolidCard } from "@/components/ui/solid-card";
import { FadeIn } from "@/components/motion/fade-in";
import { ProjectSection, ProjectList } from "@/components/project/project-section";
import { ScreenshotPlaceholder } from "@/components/project/screenshot-placeholder";
import { DiagramPlaceholder } from "@/components/project/diagram-placeholder";
import { DashboardPreview } from "@/components/dashboard/dashboard-preview";
import { projects, getProjectBySlug } from "@/data/projects";
import { financeDashboard, executiveDashboard } from "@/data/dashboard-preview";

const dashboardPreviews = {
  "finance-platform": { data: financeDashboard, valueFormat: "currencyK" },
  artemis: { data: executiveDashboard, valueFormat: "count" },
} as const;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const dashboardPreview =
    dashboardPreviews[slug as keyof typeof dashboardPreviews];

  return (
    <article>
      <section className="relative overflow-hidden">
        <div className="hero-gradient absolute inset-0 -z-10 opacity-60" aria-hidden />
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
          <FadeIn>
            <Button asChild variant="ghost" size="sm" className="mb-8 -ml-3 text-muted-foreground">
              <Link href="/projects">
                <ArrowLeft className="size-4" /> All projects
              </Link>
            </Button>
            <Badge
              variant="secondary"
              className={
                project.accent === "cyan"
                  ? "border-0 bg-accent-cyan/10 text-accent-cyan"
                  : "border-0 bg-accent-blue/10 text-accent-blue"
              }
            >
              {project.category}
            </Badge>
            <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
              {project.name}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">{project.title}</p>
            <p className="mt-6 max-w-2xl text-balance text-lg text-muted-foreground">
              {project.heroDescription}
            </p>
            {project.modules && (
              <div className="mt-8 flex flex-wrap gap-2">
                {project.modules.map((m) => (
                  <span
                    key={m}
                    className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    {m}
                  </span>
                ))}
              </div>
            )}
          </FadeIn>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 pb-24 sm:px-6 lg:px-8">
        <FadeIn>
          <SolidCard hover={false} className="mb-4 p-6">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Timeline</p>
            <ol className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {project.timeline.map((entry, i) => (
                <li key={entry.phase} className="border-l-2 border-accent-cyan/40 pl-3">
                  <p className="text-xs text-muted-foreground">Phase {i + 1}</p>
                  <p className="mt-1 text-sm font-medium">{entry.phase}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{entry.detail}</p>
                </li>
              ))}
            </ol>
          </SolidCard>
        </FadeIn>

        <ProjectSection title="Executive Summary">
          <p className="text-muted-foreground leading-relaxed">{project.executiveSummary}</p>
        </ProjectSection>

        <ProjectSection title="Business Problem">
          <p className="text-muted-foreground leading-relaxed">{project.businessProblem}</p>
        </ProjectSection>

        <ProjectSection title="Project Goals">
          <ProjectList items={project.goals} />
        </ProjectSection>

        <ProjectSection title="Solution Overview">
          <p className="text-muted-foreground leading-relaxed">{project.solutionOverview}</p>
        </ProjectSection>

        <ProjectSection title="Architecture Decisions">
          <ProjectList items={project.architectureDecisions} />
        </ProjectSection>

        <ProjectSection title="Screenshots">
          {dashboardPreview ? (
            <div className="-mx-4 sm:-mx-6 lg:-mx-16">
              <DashboardPreview
                data={dashboardPreview.data}
                valueFormat={dashboardPreview.valueFormat}
              />
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.screenshots.map((s) => (
                <ScreenshotPlaceholder key={s.label} label={s.label} />
              ))}
            </div>
          )}
        </ProjectSection>

        <ProjectSection title="Architecture Diagram">
          <DiagramPlaceholder label={project.diagram.label} nodes={project.diagram.nodes} />
        </ProjectSection>

        <ProjectSection title="Technical Challenges">
          <ProjectList items={project.technicalChallenges} />
        </ProjectSection>

        <ProjectSection title="Engineering Decisions">
          <ProjectList items={project.engineeringDecisions} />
        </ProjectSection>

        <ProjectSection title="My Responsibilities">
          <ProjectList items={project.responsibilities} />
        </ProjectSection>

        <ProjectSection title="Technology Stack">
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="border-0">
                {tech}
              </Badge>
            ))}
          </div>
        </ProjectSection>

        <ProjectSection title="Results">
          <ProjectList items={project.results} />
        </ProjectSection>

        <ProjectSection title="Lessons Learned">
          <ProjectList items={project.lessonsLearned} />
        </ProjectSection>

        <FadeIn className="mt-16">
          <GlassCard strong className="flex flex-col items-start justify-between gap-4 p-8 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Next project</p>
              <p className="mt-1 font-heading text-xl font-semibold">{nextProject.name}</p>
            </div>
            <Button asChild variant="outline">
              <Link href={`/projects/${nextProject.slug}`}>
                Continue <ArrowRight className="size-4" />
              </Link>
            </Button>
          </GlassCard>
        </FadeIn>
      </div>
    </article>
  );
}
