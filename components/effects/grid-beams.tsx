import { cn } from "@/lib/utils";

export function GridBeams({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div
        className="absolute inset-0 opacity-40 dark:opacity-60 [background-image:linear-gradient(to_right,var(--glass-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--glass-border)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_15%,black_30%,transparent_85%)]"
      />
      <div className="beam-sweep-h absolute left-0 h-px w-full" style={{ top: "20%" }} />
      <div className="beam-sweep-h absolute left-0 h-px w-full [animation-delay:1.6s]" style={{ top: "64%" }} />
      <div className="beam-sweep-v absolute top-0 h-full w-px" style={{ left: "16%" }} />
      <div className="beam-sweep-v absolute top-0 h-full w-px [animation-delay:2.2s]" style={{ left: "80%" }} />
    </div>
  );
}
