import { KpiTile } from "@/components/dashboard/kpi-tile";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { AlertsPanel } from "@/components/dashboard/alerts-panel";
import { ActivityTable } from "@/components/dashboard/activity-table";
import { DashboardPreviewData } from "@/data/dashboard-preview";

export function DashboardPreview({
  data,
  valueFormat,
}: {
  data: DashboardPreviewData;
  valueFormat?: "currencyK" | "count";
}) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/40 p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-wide text-accent-cyan">{data.eyebrow}</p>
          <h4 className="mt-1 font-heading text-lg font-semibold">{data.title}</h4>
        </div>
        <p className="text-xs text-muted-foreground">Synthetic data · not production numbers</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {data.kpis.map((kpi) => (
          <KpiTile key={kpi.label} {...kpi} />
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart title={data.chartTitle} data={data.chartData} valueFormat={valueFormat} />
        </div>
        <AlertsPanel alerts={data.alerts} />
      </div>

      <div className="mt-4">
        <ActivityTable title={data.tableTitle} columns={data.tableColumns} rows={data.tableRows} />
      </div>
    </div>
  );
}
