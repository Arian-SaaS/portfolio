import type { Metadata } from "next";
import type * as React from "react";
import {
  Bot,
  Cloud,
  Code2,
  Database,
  MonitorSmartphone,
  Server,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { SolidCard } from "@/components/ui/solid-card";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { FadeIn } from "@/components/motion/fade-in";
import { skillCategories, type SkillAccent, type SkillIcon } from "@/data/skills";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Core technical skills across programming, frontend, backend, database, cloud, AI, and architecture.",
};

const iconMap: Record<SkillIcon, LucideIcon> = {
  code: Code2,
  frontend: MonitorSmartphone,
  server: Server,
  database: Database,
  cloud: Cloud,
  ai: Bot,
  security: ShieldCheck,
  tooling: Wrench,
};

/**
 * Semantic accent name to palette token. One indirection, and it stops here —
 * the card sets --card-accent from this and the .accent-* rules in globals.css
 * do the rest. Nothing downstream needs to know which colour it got.
 */
const accentToken: Record<SkillAccent, string> = {
  cyan: "var(--accent-cyan)",
  blue: "var(--accent-blue)",
  sand: "var(--accent-sand)",
};

const spanForSize = { sm: "sm", md: "md", lg: "lg" } as const;

const totalSkills = skillCategories.reduce((n, c) => n + c.skills.length, 0);

export default function SkillsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <FadeIn>
        <SectionHeading
          eyebrow="Core Skills"
          title="Categorized by how I use them"
          titleTone="accent"
          description="From day-to-day programming through the architecture and AI capabilities that shape how a platform is built."
        />
      </FadeIn>

      <FadeIn delay={0.05}>
        <p className="mt-6 font-mono text-xs text-muted-foreground">
          {skillCategories.length} categories · {totalSkills} technologies
        </p>
      </FadeIn>

      <BentoGrid className="mt-12">
        {skillCategories.map((cat) => {
          const Icon = iconMap[cat.icon];
          const accent = accentToken[cat.accent];
          return (
            <BentoCard key={cat.category} span={spanForSize[cat.size]}>
              <SolidCard
                className="group flex h-full flex-col p-6"
                style={{ "--card-accent": accent } as React.CSSProperties}
              >
                <div className="flex items-center gap-3">
                  <span className="accent-tile flex size-9 shrink-0 items-center justify-center rounded-lg">
                    <Icon className="size-4.5" />
                  </span>
                  <h3 className="accent-title font-heading text-lg font-semibold">
                    {cat.category}
                  </h3>
                  <span className="ml-auto font-mono text-xs text-muted-foreground/70">
                    {String(cat.skills.length).padStart(2, "0")}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{cat.blurb}</p>

                {/* A hairline in the category accent, so the eye can group the
                    grid by colour without the pills themselves being coloured —
                    45 tinted pills would be noise, one rule per card is not. */}
                <span className="accent-rule mt-4 h-px w-10 rounded-full" aria-hidden />

                <div className="mt-4 flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-border bg-secondary px-3 py-1.5 font-mono text-xs text-secondary-foreground transition-colors duration-200 hover:border-accent-cyan/40 hover:text-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </SolidCard>
            </BentoCard>
          );
        })}
      </BentoGrid>
    </div>
  );
}
