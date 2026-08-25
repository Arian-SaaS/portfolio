import * as React from "react";
import { cn } from "@/lib/utils";

type GlassCardProps = React.ComponentProps<"div"> & {
  strong?: boolean;
  hover?: boolean;
};

export function GlassCard({
  className,
  strong = false,
  hover = true,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "elev rounded-2xl",
        strong ? "glass-panel-strong" : "glass-panel",
        hover &&
          "elev-interactive hover:-translate-y-1",
        className
      )}
      {...props}
    />
  );
}
