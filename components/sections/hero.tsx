import Link from "next/link";
import { ArrowRight, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";
import { siteConfig } from "@/data/site-config";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-gradient absolute inset-0 -z-10" aria-hidden />
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
        <FadeIn>
          <div className="mx-auto flex size-24 items-center justify-center rounded-full glass-panel text-2xl font-semibold text-muted-foreground sm:size-28">
            RS
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <h1 className="mt-8 font-heading text-4xl font-semibold tracking-tight sm:text-6xl">
            {siteConfig.name}
          </h1>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mt-3 text-sm font-medium text-accent-cyan sm:text-base">
            {siteConfig.titles.join("  ·  ")}
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground">
            {siteConfig.headline}
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/projects">
                View Projects <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/resume">
                <Download className="size-4" /> Resume
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer">
                <LinkedinIcon className="size-4" /> LinkedIn
              </a>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <a href={siteConfig.social.github} target="_blank" rel="noreferrer">
                <GithubIcon className="size-4" /> GitHub
              </a>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link href="/contact">
                <Mail className="size-4" /> Contact
              </Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
