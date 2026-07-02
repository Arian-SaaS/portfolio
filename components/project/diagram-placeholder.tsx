import { ArrowRight, ArrowDown } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

export function DiagramPlaceholder({
  label,
  nodes,
}: {
  label: string;
  nodes: string[];
}) {
  return (
    <GlassCard hover={false} strong className="p-6 sm:p-8">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <div className="mt-6 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3">
        {nodes.map((node, i) => (
          <div key={node} className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
            <div className="flex min-h-16 flex-1 items-center justify-center rounded-xl border border-glass-border bg-secondary/60 px-4 py-3 text-center text-sm font-medium text-secondary-foreground">
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
