import type { Metadata } from "next";
import { Download, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/sections/section-heading";
import { PrintButton } from "@/app/resume/print-button";
import { siteConfig } from "@/data/site-config";
import { skillCategories } from "@/data/skills";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Resume",
  description: "Interactive resume for Reza Salmanian — download the PDF or view the print version.",
};

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 print:py-6">
      <FadeIn className="print:hidden">
        <SectionHeading eyebrow="Resume" title="Interactive resume" />
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a href="/resume.pdf" download>
              <Download className="size-4" /> Download PDF
            </a>
          </Button>
          <PrintButton />
        </div>
      </FadeIn>

      <GlassCard hover={false} className="mt-10 p-8 print:border-0 print:bg-transparent print:p-0 print:shadow-none">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="font-heading text-3xl font-semibold tracking-tight">
              {siteConfig.name}
            </h1>
            <p className="mt-1 text-accent-cyan">{siteConfig.titles.join(" · ")}</p>
          </div>
          <div className="flex flex-col gap-1 text-sm text-muted-foreground sm:items-end">
            <span className="flex items-center gap-2">
              <Mail className="size-3.5" /> {siteConfig.email}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="size-3.5" /> {siteConfig.location}
            </span>
          </div>
        </div>

        <p className="mt-6 leading-relaxed text-muted-foreground">{siteConfig.headline}</p>

        <div className="mt-10">
          <h2 className="font-heading text-lg font-semibold">Experience</h2>
          <div className="mt-4 space-y-6">
            {experience
              .filter((e) => e.type !== "education")
              .map((entry) => (
                <div key={entry.title}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-medium">{entry.title}</p>
                    <p className="text-xs text-muted-foreground">{entry.period}</p>
                  </div>
                  <p className="text-sm text-accent-cyan">{entry.org}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {entry.description}
                  </p>
                </div>
              ))}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="font-heading text-lg font-semibold">Education</h2>
          <div className="mt-4 space-y-4">
            {experience
              .filter((e) => e.type === "education")
              .map((entry) => (
                <div key={entry.title}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-medium">{entry.title}</p>
                    <p className="text-xs text-muted-foreground">{entry.period}</p>
                  </div>
                  <p className="text-sm text-accent-cyan">{entry.org}</p>
                </div>
              ))}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="font-heading text-lg font-semibold">Skills</h2>
          <div className="mt-4 space-y-3">
            {skillCategories.map((cat) => (
              <div key={cat.category} className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                <p className="w-32 shrink-0 text-sm font-medium">{cat.category}</p>
                <p className="text-sm text-muted-foreground">{cat.skills.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="font-heading text-lg font-semibold">Selected Projects</h2>
          <ul className="mt-4 space-y-2">
            {projects.map((p) => (
              <li key={p.slug} className="text-sm">
                <span className="font-medium">{p.name}</span>
                <span className="text-muted-foreground"> — {p.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </GlassCard>
    </div>
  );
}
