import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { SolidCard } from "@/components/ui/solid-card";
import { Sparkline } from "@/components/dashboard/sparkline";
import { KpiTile as KpiTileData } from "@/data/dashboard-preview";
import { cn } from "@/lib/utils";

export function KpiTile({ label, value, delta, goodDirection, sparkline }: KpiTileData) {
  const isGood = goodDirection === "up" ? delta >= 0 : delta <= 0;
  const DeltaIcon = delta >= 0 ? ArrowUpRight : ArrowDownRight;

  return (
    <SolidCard hover={false} className="overflow-hidden p-5">
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <p className="font-heading text-2xl font-semibold">{value}</p>
        <div className={cn("text-muted-foreground", isGood ? "text-status-good" : "text-status-critical")}>
          <Sparkline data={sparkline} />
        </div>
      </div>
      <p
        className={cn(
          "mt-2 flex items-center gap-1 text-xs font-medium",
          isGood ? "text-status-good" : "text-status-critical"
        )}
      >
        <DeltaIcon className="size-3.5" />
        {Math.abs(delta)}% vs. last period
      </p>
    </SolidCard>
  );
}
