import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { ArchitectureShowcase } from "@/components/sections/architecture-showcase";
import { ProjectCard } from "@/components/project/project-card";
import { GlassCard } from "@/components/ui/glass-card";
import { SolidCard } from "@/components/ui/solid-card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { LiveSystemHealth } from "@/components/dashboard/live-system-health";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { getProfilePhotoUrl } from "@/lib/profile-photo";

const featuredProjects = projects.slice(0, 4);

const stats = [
  { label: "Production systems shipped", value: 8, suffix: "" },
  { label: "Modules architected", value: 15, suffix: "+" },
  { label: "AI-native platforms", value: 2, suffix: "" },
  { label: "Years building production software", value: 4, suffix: "+" },
];

export default function Home() {
  return (
    <>
      <Hero photoUrl={getProfilePhotoUrl()} />

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <StaggerContainer className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <SolidCard className="p-6 text-center" hover={false}>
                <p className="font-heading text-3xl font-semibold text-accent-cyan">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-xs text-muted-foreground">{stat.label}</p>
              </SolidCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/*
        The three sections below are the spine of the page, one per role, and
        each one shows the work rather than naming it. Architecture comes first
        because it is the claim that needs the most evidence and the one a list
        of skills proves least — a diagram of a real system settles in three
        seconds what a tag pill reading "System Design" never will.
      */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            eyebrow="Systems Architect"
            title="How I partition a platform"
            description="Real diagrams from systems I have shipped — how requests, tenants, and AI calls actually move through them. Drag a node, or open the full gallery for nine more."
          />
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="mt-10">
            <ArchitectureShowcase />
          </div>
        </FadeIn>
        <div className="mt-8">
          <Button asChild variant="link" className="px-0">
            <Link href="/architecture">
              See the full architecture gallery <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            eyebrow="Full-Stack Engineer"
            title="I own what I ship, after it ships"
            description="Every platform I build gets the instrumentation to tell me when it is unwell — uptime, latency, deploy cadence, and error rate, watched rather than assumed."
          />
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="mt-10">
            <LiveSystemHealth />
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            eyebrow="Forward Deployed Engineer"
            title="Production systems, not tutorials"
            description="Enterprise platforms built alongside the people using them — architecture decisions, engineering constraints, and the business outcome, without exposing proprietary implementation."
          />
        </FadeIn>
        <BentoGrid className="mt-10">
          {featuredProjects.map((project, i) => (
            <BentoCard key={project.slug} span={i === 0 ? "md" : "sm"}>
              <ProjectCard project={project} featured={i === 0} />
            </BentoCard>
          ))}
        </BentoGrid>
        <div className="mt-8">
          <Button asChild variant="link" className="px-0">
            <Link href="/projects">
              View all projects <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            eyebrow="Core Skills"
            title="Full-stack, cloud, and AI systems"
            description="Categorized by how I actually use them — from day-to-day programming to the architecture decisions that shape a platform."
          />
        </FadeIn>
        <BentoGrid className="mt-10">
          {skillCategories.slice(0, 4).map((cat) => (
            <BentoCard key={cat.category} span={cat.size === "lg" ? "md" : "sm"}>
              <SolidCard className="h-full p-6">
                <h3 className="font-heading font-semibold">{cat.category}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {cat.skills.slice(0, 5).map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </SolidCard>
            </BentoCard>
          ))}
        </BentoGrid>
        <div className="mt-8 flex flex-wrap gap-6">
          <Button asChild variant="link" className="px-0">
            <Link href="/skills">
              See all skill categories <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="link" className="px-0">
            <Link href="/about">
              Read my engineering philosophy <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-32 sm:px-6 lg:px-8">
        <FadeIn>
          <GlassCard strong className="flex flex-col items-center gap-6 p-12 text-center">
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Let&apos;s talk about your next platform
            </h2>
            <p className="max-w-xl text-muted-foreground">
              Open to Full-Stack Software Engineer, Systems Architect, AI Integration Engineer,
              Forward Deployed Engineer, and Founding Engineer roles.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">
                Get in touch <ArrowRight className="size-4" />
              </Link>
            </Button>
          </GlassCard>
        </FadeIn>
      </section>
    </>
  );
}
