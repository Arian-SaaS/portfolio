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
   * "default" paints the title in --foreground, "accent" in the turquoise.
   *
   * This was briefly a turquoise-into-sand gradient and that was a mistake
   * worth recording. Both endpoints cleared AA comfortably, so a contrast check
   * passed it — but contrast was never the problem. Turquoise and sand sit on
   * opposite sides of the wheel, and interpolating between them, in oklab or
   * anything else, runs straight through neutral: chroma fell from 0.133 to
   * 0.040 by the far end, painting most of the heading in #b4c9ad and #c0c7aa.
   * Those are pale near-greys. On a dark ground they read as white, which is
   * precisely what the heading was changed to stop being.
   *
   * A two-hue gradient is only safe between neighbours on the wheel. Across
   * complements, use one colour.
   */
  titleTone?: "default" | "accent";
}) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow && (
        <p className="t-eyebrow">
          <span className="text-muted-foreground/60">{"// "}</span>
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "mt-2 t-h1",
          titleTone === "accent" && "text-accent-cyan"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-2xl t-lead",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
