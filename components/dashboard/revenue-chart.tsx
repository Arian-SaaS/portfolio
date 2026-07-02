"use client";

import * as React from "react";
import { Table2, LineChart } from "lucide-react";
import { SolidCard } from "@/components/ui/solid-card";
import { Button } from "@/components/ui/button";
import { ChartPoint } from "@/data/dashboard-preview";

const WIDTH = 640;
const HEIGHT = 220;
const PAD_LEFT = 44;
const PAD_RIGHT = 16;
const PAD_TOP = 20;
const PAD_BOTTOM = 28;

function niceMax(n: number) {
  return Math.ceil(n / 50) * 50;
}

const formatters = {
  currencyK: (v: number) => `$${v}K`,
  count: (v: number) => `${v}`,
} as const;

export function RevenueChart({
  title,
  data,
  valueFormat = "currencyK",
}: {
  title: string;
  data: ChartPoint[];
  valueFormat?: keyof typeof formatters;
}) {
  const formatValue = formatters[valueFormat];
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);
  const [tableView, setTableView] = React.useState(false);
  const svgRef = React.useRef<SVGSVGElement>(null);

  const plotW = WIDTH - PAD_LEFT - PAD_RIGHT;
  const plotH = HEIGHT - PAD_TOP - PAD_BOTTOM;

  const max = niceMax(Math.max(...data.map((d) => d.value)));
  const min = 0;

  const xFor = (i: number) => PAD_LEFT + (i / (data.length - 1)) * plotW;
  const yFor = (v: number) => PAD_TOP + plotH - ((v - min) / (max - min)) * plotH;

  const linePath = data
    .map((d, i) => `${i === 0 ? "M" : "L"}${xFor(i).toFixed(1)},${yFor(d.value).toFixed(1)}`)
    .join(" ");
  const areaPath = `${linePath} L${xFor(data.length - 1).toFixed(1)},${(PAD_TOP + plotH).toFixed(1)} L${xFor(0).toFixed(1)},${(PAD_TOP + plotH).toFixed(1)} Z`;

  const ticks = [0, 0.5, 1].map((f) => Math.round((max - min) * f + min));

  function handlePointerMove(e: React.PointerEvent<SVGSVGElement>) {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * WIDTH;
    const ratio = Math.min(1, Math.max(0, (x - PAD_LEFT) / plotW));
    const index = Math.round(ratio * (data.length - 1));
    setHoverIndex(index);
  }

  const active = hoverIndex ?? data.length - 1;
  const activePoint = data[active];
  const tooltipX = Math.min(WIDTH - PAD_RIGHT - 90, Math.max(PAD_LEFT, xFor(active) - 45));

  return (
    <SolidCard hover={false} className="p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{title}</p>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 gap-1.5 px-2 text-xs text-muted-foreground"
          onClick={() => setTableView((v) => !v)}
        >
          {tableView ? <LineChart className="size-3.5" /> : <Table2 className="size-3.5" />}
          {tableView ? "View as chart" : "View as table"}
        </Button>
      </div>

      {tableView ? (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="py-2 pr-4 font-medium">Month</th>
                <th className="py-2 font-medium">Value</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d) => (
                <tr key={d.label} className="border-b border-border/60 last:border-0">
                  <td className="py-2 pr-4 text-muted-foreground">{d.label}</td>
                  <td className="py-2 font-medium tabular-nums">{formatValue(d.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <svg
          ref={svgRef}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="mt-2 w-full touch-none"
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setHoverIndex(null)}
          role="img"
          aria-label={`${title} line chart, ${data.length} months, ending at ${formatValue(data[data.length - 1].value)}`}
        >
          {ticks.map((t) => (
            <g key={t}>
              <line
                x1={PAD_LEFT}
                x2={WIDTH - PAD_RIGHT}
                y1={yFor(t)}
                y2={yFor(t)}
                className="stroke-border"
                strokeWidth={1}
              />
              <text
                x={PAD_LEFT - 8}
                y={yFor(t)}
                textAnchor="end"
                dominantBaseline="middle"
                className="fill-muted-foreground text-[10px]"
              >
                {formatValue(t)}
              </text>
            </g>
          ))}

          {data.map(
            (d, i) =>
              i % 2 === 0 && (
                <text
                  key={d.label}
                  x={xFor(i)}
                  y={HEIGHT - 8}
                  textAnchor="middle"
                  className="fill-muted-foreground text-[10px]"
                >
                  {d.label}
                </text>
              )
          )}

          <path d={areaPath} className="fill-accent-blue" opacity={0.1} />
          <path d={linePath} className="stroke-accent-blue" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />

          <circle
            cx={xFor(data.length - 1)}
            cy={yFor(data[data.length - 1].value)}
            r={4}
            className="fill-accent-blue stroke-surface"
            strokeWidth={2}
          />
          <text
            x={xFor(data.length - 1) - 4}
            y={yFor(data[data.length - 1].value) - 10}
            textAnchor="end"
            className="fill-foreground text-[11px] font-medium"
          >
            {formatValue(data[data.length - 1].value)}
          </text>

          {hoverIndex !== null && (
            <g>
              <line
                x1={xFor(hoverIndex)}
                x2={xFor(hoverIndex)}
                y1={PAD_TOP}
                y2={PAD_TOP + plotH}
                className="stroke-muted-foreground"
                strokeWidth={1}
                opacity={0.4}
              />
              <circle
                cx={xFor(hoverIndex)}
                cy={yFor(activePoint.value)}
                r={4}
                className="fill-accent-blue stroke-surface"
                strokeWidth={2}
              />
              <g transform={`translate(${tooltipX}, ${PAD_TOP})`}>
                <rect width={90} height={36} rx={8} className="fill-popover stroke-border" strokeWidth={1} />
                <text x={10} y={15} className="fill-foreground text-[11px] font-semibold">
                  {formatValue(activePoint.value)}
                </text>
                <text x={10} y={28} className="fill-muted-foreground text-[10px]">
                  {activePoint.label}
                </text>
              </g>
            </g>
          )}
        </svg>
      )}
    </SolidCard>
  );
}
