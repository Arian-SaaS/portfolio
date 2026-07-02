import * as React from "react";
import { cn } from "@/lib/utils";

type SolidCardProps = React.ComponentProps<"div"> & {
  hover?: boolean;
};

/**
 * Plain, non-blurred card for repeated grid content (skills, projects, principles, etc).
 * Glassmorphism is reserved for floating chrome — see GlassCard.
 */
export function SolidCard({ className, hover = true, ...props }: SolidCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface shadow-sm",
        hover &&
          "transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-cyan/30 hover:shadow-md",
        className
      )}
      {...props}
    />
  );
}
