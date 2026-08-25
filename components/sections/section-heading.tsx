import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left",
  titleTone = "default",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
  /**
   * "default" paints the title in --foreground. "accent" runs it through the
   * palette instead, turquoise into sand — the same ramp as the hero disc, so
   * an accented heading reads as part of the site rather than a coloured
   * exception.
   *
   * Both ends of the gradient clear WCAG AA against the page in both themes
   * (turquoise 10.2:1 and sand 11.0:1 on the dark ground, 5.5:1 and 4.8:1 on
   * white), which is the thing gradient text usually gets wrong: it is easy to
   * pick two colours that look good and land one of them at 3:1.
   */
  titleTone?: "default" | "accent";
}) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow && (
        <p className="font-mono text-sm font-medium tracking-wide text-accent-cyan">
          <span className="text-muted-foreground/60">{"// "}</span>
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl",
          titleTone === "accent" &&
            // pb-1 is load-bearing: bg-clip-text crops to the glyph box, and
            // without a little room underneath the descenders on g, y and p
            // are sliced off flat.
            "bg-gradient-to-r from-accent-cyan via-accent-cyan to-accent-sand bg-clip-text pb-1 text-transparent"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-muted-foreground",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
