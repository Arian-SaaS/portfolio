import { ArrowRight, ArrowDown } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

export function DiagramPlaceholder({
  label,
  nodes,
  compact = false,
}: {
  label: string;
  nodes: string[];
  /** Render as a connected numbered timeline instead of a floating flow diagram —
   *  use inside a card that already provides its own surface, e.g. a bento cell. */
  compact?: boolean;
}) {
  if (compact) {
    return (
      <ol className="min-w-0 border-l border-border pl-5">
        {nodes.map((node, i) => (
          <li key={node} className="relative pb-4 last:pb-0">
            <span
              className={cn(
                "absolute top-0.5 -left-[1.66rem] flex size-5 items-center justify-center rounded-full",
                "bg-surface text-[10px] font-semibold text-muted-foreground ring-1 ring-border",
                "transition-colors duration-300 group-hover:bg-accent-blue/15 group-hover:text-accent-blue group-hover:ring-accent-blue/40"
              )}
            >
              {i + 1}
            </span>
            <p className="pt-0.5 text-sm font-medium text-secondary-foreground transition-colors duration-300 group-hover:text-foreground">
              {node}
            </p>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <GlassCard hover={false} strong className="min-w-0 p-6 sm:p-8">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <div className="mt-6 flex min-w-0 flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3">
        {nodes.map((node, i) => (
          <div key={node} className="flex min-w-0 flex-col items-center gap-2 sm:flex-row sm:gap-3">
            <div className="flex min-h-16 w-full min-w-0 flex-1 items-center justify-center rounded-xl border border-glass-border bg-secondary/60 px-4 py-3 text-center text-sm font-medium text-secondary-foreground break-words">
              {node}
            </div>
            {i < nodes.length - 1 && (
              <>
                <ArrowDown className="size-4 shrink-0 text-muted-foreground sm:hidden" />
                <ArrowRight className="hidden size-4 shrink-0 text-muted-foreground sm:block" />
              </>
            )}
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
