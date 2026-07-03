import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { ProjectCard } from "@/components/project/project-card";
import { GlassCard } from "@/components/ui/glass-card";
import { SolidCard } from "@/components/ui/solid-card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { SystemHealthPanel } from "@/components/dashboard/system-health-panel";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";

const featuredProjects = projects.slice(0, 4);

const stats = [
  { label: "Production systems shipped", value: "8" },
  { label: "Modules architected", value: "15+" },
  { label: "AI-native platforms", value: "2" },
  { label: "Years building production software", value: "4+" },
];

export default function Home() {
  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <StaggerContainer className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <SolidCard className="p-6 text-center" hover={false}>
                <p className="font-heading text-3xl font-semibold text-accent-cyan">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">{stat.label}</p>
              </SolidCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            eyebrow="Platform Health"
            title="Built with production observability in mind"
            description="The kind of health dashboard I build into every platform I ship — uptime, latency, deploy frequency, and error rate, at a glance."
          />
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="mt-10">
            <SystemHealthPanel />
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            eyebrow="About"
            title="Engineering that starts with the business problem"
            description="I design and build enterprise software the same way I approach architecture: understand the business problem first, then choose the technology that serves it. My background spans full-stack engineering, cloud architecture, and AI systems integration for production SaaS platforms."
          />
        </FadeIn>
        <FadeIn delay={0.1}>
          <Button asChild variant="link" className="mt-4 px-0">
            <Link href="/about">
              Read my engineering philosophy <ArrowRight className="size-4" />
            </Link>
          </Button>
        </FadeIn>
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
        <div className="mt-8">
          <Button asChild variant="link" className="px-0">
            <Link href="/skills">
              See all skill categories <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            eyebrow="Featured Projects"
            title="Production systems, not tutorials"
            description="Real enterprise platforms — architecture decisions, engineering challenges, and business outcomes, without exposing proprietary implementation."
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

      <section className="mx-auto max-w-6xl px-4 pb-32 sm:px-6 lg:px-8">
        <FadeIn>
          <GlassCard strong className="flex flex-col items-center gap-6 p-12 text-center">
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Let&apos;s talk about your next platform
            </h2>
            <p className="max-w-xl text-muted-foreground">
              Open to Full-Stack Software Engineer, Systems Architect, AI Integration Engineer,
              and Founding Engineer roles.
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
