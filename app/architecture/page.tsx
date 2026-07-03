import type { Metadata } from "next";
import {
  Layers,
  Users,
  KeyRound,
  ShieldCheck,
  Bot,
  AudioLines,
  Webhook,
  Database,
  Cloud,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { SolidCard } from "@/components/ui/solid-card";
import { FadeIn } from "@/components/motion/fade-in";
import { FlowDiagram } from "@/components/architecture/flow-diagram";
import { architectureDiagrams, type ArchitectureIcon } from "@/data/architecture";

export const metadata: Metadata = {
  title: "Architecture Gallery",
  description:
    "High-level system design diagrams — enterprise SaaS, multi-tenancy, RBAC, AI orchestration, and cloud deployment.",
};

const iconMap: Record<ArchitectureIcon, LucideIcon> = {
  layers: Layers,
  users: Users,
  key: KeyRound,
  shield: ShieldCheck,
  bot: Bot,
  audio: AudioLines,
  webhook: Webhook,
  database: Database,
  cloud: Cloud,
};

export default function ArchitecturePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <FadeIn>
        <SectionHeading
          eyebrow="Architecture Gallery"
          title="System design, at a conceptual level"
          description="These diagrams communicate the shape of the systems I build — how requests, data, and permissions flow — without revealing proprietary implementation. Drag nodes, hover for detail, pinch or use the controls to zoom."
        />
      </FadeIn>
      <div className="mt-12 grid grid-cols-1 gap-6">
        {architectureDiagrams.map((diagram) => {
          const Icon = iconMap[diagram.icon];
          return (
            <SolidCard key={diagram.slug} className="group p-6">
              <div className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent-blue/10 text-accent-blue transition-colors duration-300 group-hover:bg-accent-blue group-hover:text-white">
                  <Icon className="size-4.5" />
                </span>
                <h3 className="font-heading font-semibold transition-colors duration-300 group-hover:text-accent-cyan">
                  {diagram.title}
                </h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{diagram.description}</p>
              <div className="mt-6">
                <FlowDiagram items={diagram.nodes} />
              </div>
            </SolidCard>
          );
        })}
      </div>
    </div>
  );
}
