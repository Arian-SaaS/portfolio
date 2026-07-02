import type { Metadata } from "next";
import { SectionHeading } from "@/components/sections/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { FadeIn } from "@/components/motion/fade-in";
import { skillCategories } from "@/data/skills";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Core technical skills across programming, frontend, backend, database, cloud, AI, and architecture.",
};

const spanForSize = { sm: "sm", md: "md", lg: "lg" } as const;

export default function SkillsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <FadeIn>
        <SectionHeading
          eyebrow="Core Skills"
          title="Categorized by how I use them"
          description="From day-to-day programming through the architecture and AI capabilities that shape how a platform is built."
        />
      </FadeIn>
      <BentoGrid className="mt-12">
        {skillCategories.map((cat) => (
          <BentoCard key={cat.category} span={spanForSize[cat.size]}>
            <GlassCard className="h-full p-6">
              <h3 className="font-heading text-lg font-semibold">{cat.category}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </GlassCard>
          </BentoCard>
        ))}
      </BentoGrid>
    </div>
  );
}
