import type { Metadata } from "next";
import { SectionHeading } from "@/components/sections/section-heading";
import { SolidCard } from "@/components/ui/solid-card";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { FadeIn } from "@/components/motion/fade-in";

export const metadata: Metadata = {
  title: "Engineering Principles",
  description:
    "The principles that guide how Reza Salmanian approaches architecture, engineering, and AI integration.",
};

const principles = [
  {
    title: "Architecture before implementation",
    description:
      "Decisions that are expensive to reverse get resolved before code is written, not discovered while writing it.",
  },
  {
    title: "Business problems drive technical decisions",
    description:
      "Technology is a means, not the goal. Every architectural choice should trace back to a business reason.",
  },
  {
    title: "Keep systems modular",
    description:
      "Well-defined boundaries let parts of a system change independently, which is what makes long-lived software survivable.",
  },
  {
    title: "Design for long-term maintainability",
    description:
      "Optimize for the engineer who inherits this system in two years — including future me.",
  },
  {
    title: "Security is built in from day one",
    description:
      "Access control, tenancy, and audit logging are core infrastructure, not features added before a compliance review.",
  },
  {
    title: "Performance is a feature",
    description:
      "Users experience performance directly. It gets the same intentional design attention as any user-facing capability.",
  },
  {
    title: "AI should augment business workflows",
    description:
      "AI is most valuable applied to a real workflow with governed data access — not bolted on as a novelty chat window.",
  },
  {
    title: "Deliver value incrementally",
    description:
      "Ship in increments that stand on their own, so direction can be corrected early instead of at the end of a long cycle.",
  },
  {
    title: "Measure success through business impact",
    description:
      "Technical elegance matters, but the real measure of a system is the business outcome it enables.",
  },
];

export default function PrinciplesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <FadeIn>
        <SectionHeading
          eyebrow="Engineering Principles"
          title="What guides my technical decisions"
          align="center"
        />
      </FadeIn>
      <StaggerContainer className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {principles.map((principle, i) => (
          <StaggerItem key={principle.title}>
            <SolidCard className="h-full p-6">
              <span className="font-heading text-sm font-semibold text-accent-cyan">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-heading font-semibold">{principle.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {principle.description}
              </p>
            </SolidCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
