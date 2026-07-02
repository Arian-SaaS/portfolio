import { CheckCircle2, TriangleAlert, OctagonAlert, CircleAlert } from "lucide-react";
import { SolidCard } from "@/components/ui/solid-card";
import { AlertItem, AlertSeverity } from "@/data/dashboard-preview";
import { cn } from "@/lib/utils";

const severityConfig: Record<
  AlertSeverity,
  { icon: typeof CheckCircle2; label: string; className: string }
> = {
  good: { icon: CheckCircle2, label: "Resolved", className: "text-status-good" },
  warning: { icon: TriangleAlert, label: "Warning", className: "text-status-warning" },
  serious: { icon: OctagonAlert, label: "Serious", className: "text-status-serious" },
  critical: { icon: CircleAlert, label: "Critical", className: "text-status-critical" },
};

export function AlertsPanel({ alerts }: { alerts: AlertItem[] }) {
  return (
    <SolidCard hover={false} className="p-6">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">Alerts</p>
      <ul className="mt-4 space-y-4">
        {alerts.map((alert, i) => {
          const config = severityConfig[alert.severity];
          const Icon = config.icon;
          return (
            <li key={i} className="flex items-start gap-3">
              <Icon className={cn("mt-0.5 size-4 shrink-0", config.className)} aria-hidden="true" />
              <div className="min-w-0">
                <p className="text-sm leading-snug">{alert.message}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  <span className={cn("font-medium", config.className)}>{config.label}</span>
                  {" · "}
                  {alert.meta}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </SolidCard>
  );
}
