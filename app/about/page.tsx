import type { Metadata } from "next";
import { SectionHeading } from "@/components/sections/section-heading";
import { SolidCard } from "@/components/ui/solid-card";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { FadeIn } from "@/components/motion/fade-in";

export const metadata: Metadata = {
  title: "About",
  description:
    "Reza Salmanian's engineering story, philosophy, and core values as a Full-Stack Software Engineer and Systems Architect.",
};

const values = [
  {
    title: "Product Ownership",
    description:
      "I treat every system I build as a product I'm accountable for, not a ticket I'm closing. That means understanding who uses it and why, not just what the spec says.",
  },
  {
    title: "Architecture-First Mindset",
    description:
      "The decisions that are expensive to reverse — data models, module boundaries, tenancy — get resolved before implementation, not discovered during it.",
  },
  {
    title: "Business-First Engineering",
    description:
      "Technology choices follow the business problem, not the other way around. The best architecture is the one that fits the constraint in front of you.",
  },
  {
    title: "Building Maintainable Software",
    description:
      "Code is read far more often than it's written. I optimize for the engineer who inherits the system next — including future me.",
  },
  {
    title: "Long-Term Thinking",
    description:
      "I weigh decisions against where a system needs to be in two years, not just whether it works this sprint.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <FadeIn>
        <SectionHeading eyebrow="About" title="Who I am" />
      </FadeIn>
      <FadeIn delay={0.05}>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          I&apos;m a full-stack software engineer and systems architect who spends most of my
          time on systems that sit at the center of a business — the platforms finance,
          sales, and operations teams depend on every day. My work spans full-stack
          engineering, secure API design, and, increasingly, AI systems that reason across a
          whole business rather than a single feature.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          I care most about the layer where technical decisions become business outcomes:
          how a data model shapes what a company can report on, how a permissions design
          determines what an AI assistant is allowed to see, how a deployment strategy
          affects how confidently a team can ship. That&apos;s the work I enjoy most — and the
          reason I founded CBSai, where I own the architecture and full-stack delivery of a
          multi-tenant SaaS platform end to end, rather than just one layer of it.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h2 className="mt-16 font-heading text-2xl font-semibold tracking-tight">
          How I think as an engineer
        </h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          I start from the business problem, not the technology. Before proposing an
          architecture, I want to understand what the system needs to be true in a year —
          how many tenants, what compliance requirements, what happens when a module needs
          to change independently of the others. Decisions that are cheap to reverse (a
          button placement, a component structure) I move fast on. Decisions that are
          expensive to reverse (a data model, a tenancy boundary, a permissions design) I
          slow down for.
        </p>
      </FadeIn>

      <FadeIn delay={0.15}>
        <h2 className="mt-12 font-heading text-2xl font-semibold tracking-tight">
          What problems I enjoy solving
        </h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Systems where multiple domains have to work together without becoming tangled —
          a CRM that shares data with dispatch, a payroll system that has to be both
          flexible and audit-proof, an AI layer that has to reason across modules without
          bypassing the permissions each of them enforces. The common thread is designing
          boundaries: what belongs together, what needs to stay separate, and how
          information should flow between the two.
        </p>
      </FadeIn>

      <div className="mt-16">
        <FadeIn>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">
            Engineering philosophy &amp; core values
          </h2>
        </FadeIn>
        <StaggerContainer className="mt-6 grid gap-4 sm:grid-cols-2">
          {values.map((value) => (
            <StaggerItem key={value.title}>
              <SolidCard className="h-full p-6">
                <h3 className="font-heading font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </SolidCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
