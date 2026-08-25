"use client";

import * as React from "react";
import { ArrowDownRight, ArrowUpRight, CheckCircle2, TriangleAlert, Wrench } from "lucide-react";
import { SolidCard } from "@/components/ui/solid-card";
import { Sparkline } from "@/components/dashboard/sparkline";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { systemHealth, type ServiceStatus } from "@/data/system-health";
import type { KpiTile } from "@/data/dashboard-preview";
import { cn } from "@/lib/utils";

/** How often the panel takes a new reading. */
const TICK_MS = 2200;
/** Points held in each sparkline. Older ones fall off the left. */
const WINDOW = 14;

const statusConfig: Record<
  ServiceStatus,
  { icon: typeof CheckCircle2; label: string; className: string }
> = {
  operational: { icon: CheckCircle2, label: "Operational", className: "text-status-good" },
  degraded: { icon: TriangleAlert, label: "Degraded", className: "text-status-warning" },
  maintenance: { icon: Wrench, label: "Maintenance", className: "text-muted-foreground" },
};

/**
 * Splits "99.98%" into the pieces needed to render a moving version of it:
 * the prefix, the number, the trailing unit, and how many decimals the author
 * wrote. Reading the precision off the source string rather than guessing is
 * what keeps uptime at two decimals and the deploy count at none — get that
 * wrong and the tile jitters between "18" and "18.4213".
 */
function parseValue(value: string) {
  const m = value.match(/^([^0-9-]*)(-?[0-9]*\.?[0-9]+)(.*)$/);
  if (!m) return null;
  const [, prefix, digits, suffix] = m;
  const dot = digits.indexOf(".");
  return {
    prefix,
    suffix,
    decimals: dot === -1 ? 0 : digits.length - dot - 1,
    base: Number(digits),
  };
}

type Series = {
  kpi: KpiTile;
  parsed: ReturnType<typeof parseValue>;
  points: number[];
  current: number;
};

function seed(): Series[] {
  return systemHealth.kpis.map((kpi) => {
    const parsed = parseValue(kpi.value);
    const base = parsed ? parsed.base : kpi.sparkline[kpi.sparkline.length - 1];
    // Left-pad to a full window so the chart does not visibly grow into place
    // over the first ten seconds, which would be a layout shift on a loop.
    const points = [...kpi.sparkline];
    while (points.length < WINDOW) points.unshift(points[0]);
    return { kpi, parsed, points: points.slice(-WINDOW), current: base };
  });
}

/**
 * One reading. A bounded random walk, not a drift: each step pulls a little
 * toward the authored value and adds a small kick, so the line stays lively
 * without wandering somewhere the label would no longer be true. A metric
 * labelled 99.98% uptime has to still read like 99.98% uptime a minute later.
 */
function step(series: Series): Series {
  const { parsed, current, points } = series;
  const base = parsed ? parsed.base : points[points.length - 1];
  const scale = Math.max(Math.abs(base) * 0.012, 10 ** -(parsed?.decimals ?? 0));
  const pullHome = (base - current) * 0.25;
  const kick = (Math.random() - 0.5) * 2 * scale;
  const next = current + pullHome + kick;
  return { ...series, current: next, points: [...points.slice(1), next] };
}

function format(series: Series) {
  const { parsed, current } = series;
  if (!parsed) return series.kpi.value;
  return `${parsed.prefix}${current.toFixed(parsed.decimals)}${parsed.suffix}`;
}

export function LiveSystemHealth() {
  const reduced = useReducedMotion();
  const [series, setSeries] = React.useState<Series[]>(seed);
  const [live, setLive] = React.useState(false);
  const hostRef = React.useRef<HTMLDivElement | null>(null);

  // Only run while the panel is actually on screen and the tab is in front.
  // A metrics panel quietly re-rendering four sparklines every two seconds in
  // a background tab is exactly the kind of thing that drains a laptop for no
  // one's benefit.
  React.useEffect(() => {
    const host = hostRef.current;
    if (!host || reduced) return;

    let onScreen = false;
    const sync = () => setLive(onScreen && !document.hidden);

    const io = new IntersectionObserver(
      (entries) => {
        onScreen = entries[0]?.isIntersecting ?? false;
        sync();
      },
      { threshold: 0.15 }
    );
    io.observe(host);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [reduced]);

  React.useEffect(() => {
    if (!live) return;
    const id = window.setInterval(() => setSeries((s) => s.map(step)), TICK_MS);
    return () => window.clearInterval(id);
  }, [live]);

  return (
    <SolidCard ref={hostRef} hover={false} className="p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="relative flex size-2.5">
            {live && (
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-status-good/60" />
            )}
            <span className="relative inline-flex size-2.5 rounded-full bg-status-good" />
          </span>
          <p className="text-sm font-medium">All systems operational</p>
          <span
            className="ml-1 rounded-full border border-glass-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
            aria-live="off"
          >
            {live ? "streaming" : "paused"}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Illustrative — modeled on real observability practices, not live production telemetry
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {series.map((s) => {
          const isGood = s.kpi.goodDirection === "up" ? s.kpi.delta >= 0 : s.kpi.delta <= 0;
          const DeltaIcon = s.kpi.delta >= 0 ? ArrowUpRight : ArrowDownRight;
          return (
            <div
              key={s.kpi.label}
              className="overflow-hidden rounded-xl border border-border bg-muted/20 p-5"
            >
              <p className="text-xs text-muted-foreground">{s.kpi.label}</p>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                {/*
                  Tabular figures, and not optional. Proportional digits change
                  width as they change value, so a number rewritten every two
                  seconds visibly twitches and drags the sparkline beside it
                  back and forth.
                */}
                <p className="font-heading text-2xl font-semibold tabular-nums">{format(s)}</p>
                <div className={cn(isGood ? "text-status-good" : "text-status-critical")}>
                  <Sparkline data={s.points} />
                </div>
              </div>
              <p
                className={cn(
                  "mt-2 flex items-center gap-1 text-xs font-medium",
                  isGood ? "text-status-good" : "text-status-critical"
                )}
              >
                <DeltaIcon className="size-3.5" />
                {Math.abs(s.kpi.delta)}% vs. last period
              </p>
            </div>
          );
        })}
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
                <p className="truncate text-sm font-medium">{service.name}</p>
                <p className="truncate text-xs text-muted-foreground">{service.detail}</p>
              </div>
              <span className={cn("flex shrink-0 items-center gap-1.5 text-xs", config.className)}>
                <Icon className="size-3.5" />
                {config.label}
              </span>
            </li>
          );
        })}
      </ul>
    </SolidCard>
  );
}
