import { ArrowRight, ArrowDown } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { SolidCard } from "@/components/ui/solid-card";
import { cn } from "@/lib/utils";

export function DiagramPlaceholder({
  label,
  nodes,
  compact = false,
}: {
  label: string;
  nodes: string[];
  /** Force a vertical, single-column layout — use inside narrow containers like bento cells. */
  compact?: boolean;
}) {
  // Gallery (compact) usage repeats this many times in a grid, so it stays a plain
  // surface — glassmorphism is reserved for the single floating diagram on project pages.
  const Surface = compact ? SolidCard : GlassCard;
  const surfaceProps = compact ? {} : { strong: true };

  return (
    <Surface hover={false} {...surfaceProps} className="min-w-0 p-6 sm:p-8">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <div
        className={cn(
          "mt-6 flex min-w-0 flex-col items-stretch gap-2",
          !compact && "sm:flex-row sm:items-center sm:gap-3"
        )}
      >
        {nodes.map((node, i) => (
          <div
            key={node}
            className={cn(
              "flex min-w-0 flex-col items-center gap-2",
              !compact && "sm:flex-row sm:gap-3"
            )}
          >
            <div className="flex min-h-16 w-full min-w-0 flex-1 items-center justify-center rounded-xl border border-glass-border bg-secondary/60 px-4 py-3 text-center text-sm font-medium text-secondary-foreground break-words">
              {node}
            </div>
            {i < nodes.length - 1 && (
              <>
                <ArrowDown
                  className={cn(
                    "size-4 shrink-0 text-muted-foreground",
                    !compact && "sm:hidden"
                  )}
                />
                {!compact && (
                  <ArrowRight className="hidden size-4 shrink-0 text-muted-foreground sm:block" />
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </Surface>
  );
}
