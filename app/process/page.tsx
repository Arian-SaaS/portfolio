import type { Metadata } from "next";
import { SectionHeading } from "@/components/sections/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { FadeIn } from "@/components/motion/fade-in";

export const metadata: Metadata = {
  title: "Technical Project Leadership",
  description:
    "How I run engineering projects end-to-end — discovery, architecture, delivery, and production support.",
};

const steps = [
  {
    title: "Discovery",
    description:
      "Start by understanding the business, not the backlog. I talk to stakeholders, map the current workflow, and identify the real constraint before proposing a solution.",
  },
  {
    title: "Requirements Gathering",
    description:
      "Translate business goals into concrete, testable requirements. I favor a small number of clear requirements over a large ambiguous list — ambiguity is where projects go over budget.",
  },
  {
    title: "Architecture Planning",
    description:
      "Design the system boundaries, data model, and integration points before writing implementation code. Architecture decisions are the ones that are expensive to reverse — they get the most upfront thought.",
  },
  {
    title: "Database Design",
    description:
      "Model data around the domain, not the first screen that needs it. I design for the relationships and constraints the business actually has, and validate the model against multiple future use cases before committing.",
  },
  {
    title: "API Strategy",
    description:
      "Define API contracts as a product decision, not an implementation detail — versioning, permissions, and consumer needs are settled before the first endpoint ships.",
  },
  {
    title: "UI Planning",
    description:
      "Plan interfaces around the user's workflow, not the data model. I sketch the critical paths first and validate them before investing in visual polish.",
  },
  {
    title: "Sprint Planning",
    description:
      "Break architecture into shippable increments that deliver real value on their own, so the team can course-correct early instead of discovering problems at the end.",
  },
  {
    title: "Risk Management",
    description:
      "Identify the riskiest technical assumption in a project and resolve it first. Most project risk is concentrated in a small number of unknowns — I find and de-risk those early.",
  },
  {
    title: "Code Reviews",
    description:
      "Treat code review as a design conversation, not a gate. I look for correctness, maintainability, and whether the change fits the system's architecture — not just style.",
  },
  {
    title: "Deployment",
    description:
      "Ship incrementally with rollback paths defined up front. Deployment should be a routine, low-risk event, not a milestone the team dreads.",
  },
  {
    title: "Production Support",
    description:
      "Stay close to how systems behave in production — monitoring, incident response, and using real usage data to inform the next iteration.",
  },
  {
    title: "Scaling",
    description:
      "Scale the parts of the system that actually need it, informed by real usage patterns rather than speculative future load.",
  },
  {
    title: "Stakeholder Communication",
    description:
      "Keep stakeholders informed with the tradeoffs, not just the status. Technical decisions are business decisions, and I communicate them that way.",
  },
];

export default function ProcessPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <FadeIn>
        <SectionHeading
          eyebrow="Technical Project Leadership"
          title="How I run engineering projects, end to end"
          description="Not a list of projects — a description of the process I bring to every one of them, from first conversation to production support."
        />
      </FadeIn>
      <StaggerContainer className="mt-12 grid gap-4 sm:grid-cols-2">
        {steps.map((step, i) => (
          <StaggerItem key={step.title}>
            <GlassCard className="h-full p-6">
              <span className="font-heading text-sm font-semibold text-accent-cyan">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-heading font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </GlassCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
