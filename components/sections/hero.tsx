import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";
import { HeroScene } from "@/components/three/hero-scene";
import { HeroTerminal } from "@/components/sections/hero-terminal";
import { GridBeams } from "@/components/effects/grid-beams";
import { siteConfig } from "@/data/site-config";
import { getProfilePhotoUrl } from "@/lib/profile-photo";

export function Hero() {
  const photoUrl = getProfilePhotoUrl();

  return (
    <section className="relative overflow-hidden">
      <div className="hero-gradient absolute inset-0 -z-10" aria-hidden />
      <GridBeams className="-z-10" />
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 py-24 sm:px-6 sm:py-32 lg:grid-cols-2 lg:px-8">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <FadeIn>
            <div className="flex size-24 items-center justify-center overflow-hidden rounded-full glass-panel text-2xl font-semibold text-muted-foreground sm:size-28">
              {photoUrl ? (
                <Image
                  src={photoUrl}
                  alt={siteConfig.name}
                  width={112}
                  height={112}
                  priority
                  className="size-full object-cover"
                />
              ) : (
                "RS"
              )}
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
            <p className="mt-6 max-w-2xl text-balance text-lg text-muted-foreground">
              {siteConfig.headline}
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
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

        <FadeIn delay={0.25} className="relative mx-auto w-full max-w-md">
          <HeroScene />
          <HeroTerminal className="mx-auto mt-8 w-full max-w-xs rotate-0 sm:max-w-sm lg:absolute lg:-bottom-6 lg:-left-6 lg:mt-0 lg:w-72 lg:max-w-none lg:-rotate-2" />
        </FadeIn>
      </div>
    </section>
  );
}
