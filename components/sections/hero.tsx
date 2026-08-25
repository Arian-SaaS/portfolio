"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";
import { BlackHoleHeroSection } from "@/components/ui/blackhole-hero-section";
import { useMediaQuery } from "@/hooks/use-media-query";
import { siteConfig } from "@/data/site-config";

/** Viewport height less the sticky navbar, so the hero fills exactly what is left. */
const FILL = "min-h-[calc(100svh-4rem)]";

export type HeroProps = {
  /**
   * Resolved by the caller, not here. Finding the photo means touching the
   * filesystem, and this component runs on the client — so the server page
   * looks it up and hands down the URL, or null when no photo is present.
   */
  photoUrl: string | null;
};

export function Hero({ photoUrl }: HeroProps) {
  const narrow = useMediaQuery("(max-width: 767px)");

  return (
    <section className="relative">
      <BlackHoleHeroSection
        /*
         * `dark` is doing real work here, not decoration. The hero is a dark
         * island in both themes, and every control inside it — Button, the
         * muted body copy, the hairline borders — paints from the same design
         * tokens as the rest of the site. Scoping the token layer to dark is
         * what keeps an outline Button legible on black while the visitor has
         * the site in light mode, without a single bespoke color override.
         *
         * `text-foreground` has to be restated here and cannot be left to
         * inherit: `body` resolves `var(--foreground)` against the light
         * palette and passes down the *computed* color, so descendants would
         * inherit near-black text however the tokens are scoped. Setting it on
         * the element that carries `dark` re-resolves it against the dark
         * value, and everything below — ghost Buttons especially, which carry
         * no color of their own — inherits from that instead.
         */
        className={`dark text-foreground ${FILL} md:min-h-[680px]`}
        /*
         * A phone has no room to stand the art beside the copy, so the
         * arrangement turns through 90 degrees: copy at the top under a veil,
         * the hole low and whole in the bottom third. Not pushed off the edge
         * — half a hole reads as a mistake. A wider field makes up the room
         * the narrow frame lost, and the step count comes down because a
         * phone pays for every ray.
         */
        focus={narrow ? [0.5, 0.78] : [0.72, 0.46]}
        scrim={narrow ? "top" : "left"}
        scrimStrength={0.92}
        elevation={narrow ? -7 : -5.5}
        fov={narrow ? 58 : 42}
        glow={narrow ? 0.85 : 1}
        steps={narrow ? 200 : 300}
        resolution={narrow ? 0.6 : 0.7}
      >
        {/*
          The render grounds itself in near-black — a black hole with a slate
          void would not be one — while the page below it is slate. Left alone
          that meets as a hard line across the full width. This dissolves the
          one into the other over 8rem, so the hero reads as the top of the page
          rather than a panel sitting on it.

          `to-background` resolves inside the `dark` scope on the host, which is
          the same value the page itself uses, so the two ends of the gradient
          cannot drift apart.
        */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background"
        />

        <div
          className={`relative mx-auto flex ${FILL} max-w-6xl items-start px-4 pt-16 sm:px-6 md:min-h-[680px] md:items-center md:pt-0 lg:px-8`}
        >
          <div className="max-w-xl py-12 md:py-0">
            {photoUrl && (
              <div className="hero-rise">
                {/* Ringed rather than plain, so the circle keeps an edge where
                    the portrait's own dark tones meet the black behind it. */}
                <Image
                  src={photoUrl}
                  alt={siteConfig.name}
                  width={112}
                  height={112}
                  priority
                  className="mb-8 size-20 rounded-full object-cover ring-1 ring-white/20 sm:size-24"
                />
              </div>
            )}

            <div className="hero-rise" style={{ animationDelay: "0.06s" }}>
              <h1 className="t-display">
                {siteConfig.name}
              </h1>
            </div>

            <div className="hero-rise" style={{ animationDelay: "0.12s" }}>
              <p className="mt-4 text-sm font-medium text-accent-cyan sm:text-base">
                {siteConfig.titles.join("  ·  ")}
              </p>
            </div>

            <div className="hero-rise" style={{ animationDelay: "0.18s" }}>
              <p className="mt-6 text-balance text-lg leading-relaxed text-muted-foreground">
                {siteConfig.headline}
              </p>
            </div>

            <div className="hero-rise" style={{ animationDelay: "0.24s" }}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
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
              </div>
            </div>

            <div className="hero-rise" style={{ animationDelay: "0.3s" }}>
              <div className="mt-6 flex flex-wrap items-center gap-1">
                <Button asChild variant="ghost" size="sm">
                  <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer">
                    <LinkedinIcon className="size-4" /> LinkedIn
                  </a>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <a href={siteConfig.social.github} target="_blank" rel="noreferrer">
                    <GithubIcon className="size-4" /> GitHub
                  </a>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/contact">
                    <Mail className="size-4" /> Contact
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </BlackHoleHeroSection>
    </section>
  );
}
