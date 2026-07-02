import * as React from "react";
import { cn } from "@/lib/utils";

export function BentoGrid({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(0,1fr)]",
        className
      )}
      {...props}
    />
  );
}

const spanMap = {
  sm: "lg:col-span-1",
  md: "lg:col-span-2",
  lg: "lg:col-span-2 lg:row-span-2",
  xl: "lg:col-span-4",
} as const;

type BentoCardProps = React.ComponentProps<"div"> & {
  span?: keyof typeof spanMap;
};

export function BentoCard({ className, span = "sm", ...props }: BentoCardProps) {
  return (
    <div
      className={cn("sm:col-span-1", spanMap[span], className)}
      {...props}
    />
  );
}
