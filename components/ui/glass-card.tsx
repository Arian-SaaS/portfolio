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
        "rounded-2xl shadow-sm",
        strong ? "glass-panel-strong" : "glass-panel",
        hover &&
          "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent-blue/5",
        className
      )}
      {...props}
    />
  );
}
