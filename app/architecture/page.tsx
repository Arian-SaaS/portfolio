import type { Metadata } from "next";
import { SectionHeading } from "@/components/sections/section-heading";
import { SolidCard } from "@/components/ui/solid-card";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { FadeIn } from "@/components/motion/fade-in";
import { DiagramPlaceholder } from "@/components/project/diagram-placeholder";
import { architectureDiagrams } from "@/data/architecture";

export const metadata: Metadata = {
  title: "Architecture Gallery",
  description:
    "High-level system design diagrams — enterprise SaaS, multi-tenancy, RBAC, AI orchestration, and cloud deployment.",
};

export default function ArchitecturePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <FadeIn>
        <SectionHeading
          eyebrow="Architecture Gallery"
          title="System design, at a conceptual level"
          description="These diagrams communicate the shape of the systems I build — how requests, data, and permissions flow — without revealing proprietary implementation."
        />
      </FadeIn>
      <BentoGrid className="mt-12">
        {architectureDiagrams.map((diagram) => (
          <BentoCard key={diagram.slug} span={diagram.size === "lg" ? "md" : diagram.size}>
            <SolidCard hover={false} className="h-full p-6">
              <h3 className="font-heading font-semibold">{diagram.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{diagram.description}</p>
              <div className="mt-5">
                <DiagramPlaceholder label={diagram.title} nodes={diagram.nodes} compact />
              </div>
            </SolidCard>
          </BentoCard>
        ))}
      </BentoGrid>
    </div>
  );
}
