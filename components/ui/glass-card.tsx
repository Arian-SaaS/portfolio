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
        "rounded-2xl shadow-xl shadow-black/5 dark:shadow-black/30",
        strong ? "glass-panel-strong" : "glass-panel",
        hover &&
          "transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent-blue/10",
        className
      )}
      {...props}
    />
  );
}
