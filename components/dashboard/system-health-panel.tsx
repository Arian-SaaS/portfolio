import { CheckCircle2, TriangleAlert, Wrench } from "lucide-react";
import { SolidCard } from "@/components/ui/solid-card";
import { KpiTile } from "@/components/dashboard/kpi-tile";
import { systemHealth } from "@/data/system-health";
import { cn } from "@/lib/utils";
import type { ServiceStatus } from "@/data/system-health";

const statusConfig: Record<ServiceStatus, { icon: typeof CheckCircle2; label: string; className: string }> = {
  operational: { icon: CheckCircle2, label: "Operational", className: "text-status-good" },
  degraded: { icon: TriangleAlert, label: "Degraded", className: "text-status-warning" },
  maintenance: { icon: Wrench, label: "Maintenance", className: "text-muted-foreground" },
};

export function SystemHealthPanel() {
  return (
    <SolidCard hover={false} className="p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-status-good/60" />
            <span className="relative inline-flex size-2.5 rounded-full bg-status-good" />
          </span>
          <p className="text-sm font-medium">All systems operational</p>
        </div>
        <p className="text-xs text-muted-foreground">
          Illustrative — modeled on real observability practices, not live production telemetry
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {systemHealth.kpis.map((kpi) => (
          <KpiTile key={kpi.label} {...kpi} />
        ))}
      </div>

      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {systemHealth.services.map((service) => {
          const config = statusConfig[service.status];
          const Icon = config.icon;
          return (
            <li
              key={service.name}
              className="flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/20 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium">{service.name}</p>
                <p className="text-xs text-muted-foreground">{service.detail}</p>
              </div>
              <div className={cn("flex shrink-0 items-center gap-1.5 text-xs font-medium", config.className)}>
                <Icon className="size-3.5" aria-hidden="true" />
                {config.label}
              </div>
            </li>
          );
        })}
      </ul>
    </SolidCard>
  );
}
