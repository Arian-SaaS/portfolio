import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { FadeIn } from "@/components/motion/fade-in";
import { ContactForm } from "@/app/contact/contact-form";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Reza Salmanian — email, LinkedIn, GitHub, or the contact form.",
};

const links = [
  { label: siteConfig.email, href: `mailto:${siteConfig.email}`, icon: Mail },
  { label: "LinkedIn", href: siteConfig.social.linkedin, icon: LinkedinIcon },
  { label: "GitHub", href: siteConfig.social.github, icon: GithubIcon },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <FadeIn>
        <SectionHeading
          eyebrow="Contact"
          title="Let's talk"
          description="Open to Senior Software Engineer, Staff Engineer, Principal Engineer, Solutions Architect, AI Engineer, Technical Lead, and Fractional CTO roles."
        />
      </FadeIn>

      <div className="mt-12 grid gap-6 lg:grid-cols-5">
        <FadeIn className="lg:col-span-3">
          <GlassCard hover={false} className="p-8">
            <ContactForm />
          </GlassCard>
        </FadeIn>

        <FadeIn delay={0.1} className="lg:col-span-2">
          <GlassCard hover={false} className="h-full p-8">
            <h3 className="font-heading font-semibold">Direct contact</h3>
            <ul className="mt-4 space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <link.icon className="size-4" />
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="size-4" />
                {siteConfig.location}
              </li>
            </ul>
          </GlassCard>
        </FadeIn>
      </div>
    </div>
  );
}
