import type { Metadata } from "next";
import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { FadeIn } from "@/components/motion/fade-in";
import { testimonials } from "@/data/testimonials";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Recommendations from colleagues, managers, and clients.",
};

export default function TestimonialsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <FadeIn>
        <SectionHeading
          eyebrow="Testimonials"
          title="What it's like to work together"
          description="This section is reserved for recommendations from colleagues, managers, and clients — currently shown as placeholders."
        />
      </FadeIn>
      <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2">
        {testimonials.map((t, i) => (
          <StaggerItem key={i}>
            <GlassCard className="h-full p-6" hover={false}>
              {t.placeholder && (
                <Badge variant="secondary" className="mb-4 border-0 bg-secondary text-xs">
                  Placeholder
                </Badge>
              )}
              <Quote className="size-5 text-accent-cyan/60" />
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {t.quote}
              </p>
              <div className="mt-4">
                <p className="text-sm font-medium">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </GlassCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
