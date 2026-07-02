import type { Metadata } from "next";
import { SectionHeading } from "@/components/sections/section-heading";
import { SolidCard } from "@/components/ui/solid-card";
import { FadeIn } from "@/components/motion/fade-in";
import { experience } from "@/data/experience";
import { GraduationCap, Briefcase, Milestone } from "lucide-react";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Professional experience timeline — education, roles, major projects, and technology evolution.",
};

const icons = {
  education: GraduationCap,
  experience: Briefcase,
  milestone: Milestone,
};

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <FadeIn>
        <SectionHeading
          eyebrow="Professional Experience"
          title="Timeline"
          description="Education, roles, and the milestones that shaped my move from feature engineering into architecture and AI systems."
        />
      </FadeIn>

      <div className="relative mt-14 space-y-8 border-l border-border pl-8">
        {experience.map((entry) => {
          const Icon = icons[entry.type];
          return (
            <FadeIn key={entry.title}>
              <div className="relative">
                <div className="absolute -left-[2.55rem] flex size-8 items-center justify-center rounded-full glass-panel-strong">
                  <Icon className="size-4 text-accent-cyan" />
                </div>
                <SolidCard className="p-6">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    {entry.period}
                  </p>
                  <h3 className="mt-1 font-heading text-lg font-semibold">{entry.title}</h3>
                  <p className="text-sm text-accent-cyan">{entry.org}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {entry.description}
                  </p>
                </SolidCard>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}
