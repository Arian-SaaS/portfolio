import type { ComponentType } from "react";
import { cn } from "@/lib/utils";

type Archetype =
  | "dashboard"
  | "report"
  | "nav"
  | "pipeline"
  | "chat"
  | "form"
  | "schedule"
  | "gallery"
  | "table";

/** Infers a generic UI archetype from a screenshot's label so the placeholder
 *  reads as "the shape of that screen" instead of a blank box. */
export function resolveArchetype(label: string): Archetype {
  const l = label.toLowerCase();
  if (/schedul/.test(l)) return "schedule";
  if (/pipeline|workflow|approval|trade offer|procurement/.test(l)) return "pipeline";
  if (/chat|assistant|suggestion|conversation|voice/.test(l)) return "chat";
  if (/navigation|switcher/.test(l)) return "nav";
  if (/collection|gallery/.test(l)) return "gallery";
  if (/record|detail|entry/.test(l)) return "form";
  if (/report|scorecard|analytics/.test(l)) return "report";
  if (/dashboard|overview|summary|tracking/.test(l)) return "dashboard";
  return "table";
}

// Every archetype is drawn in this fixed coordinate space, then the SVG scales
// to fill whatever container it's placed in — so nothing is ever clipped,
// regardless of card width or grid column count.
const VB_W = 300;
const VB_H = 150;

function Block({
  x,
  y,
  width,
  height,
  variant = "neutral",
  rx = 4,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  variant?: "neutral" | "accent" | "ghost";
  rx?: number;
}) {
  if (variant === "ghost") {
    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={rx}
        className="fill-none stroke-foreground/25"
        strokeWidth={2}
      />
    );
  }
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={rx}
      className={variant === "accent" ? "fill-accent-blue" : "fill-foreground/25"}
    />
  );
}

function DashboardSketch() {
  const bars = [40, 55, 45, 65, 60, 78, 70, 90];
  const barW = 28;
  const gap = 7;
  const baseline = 142;
  const maxH = 84;
  return (
    <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full aspect-[2/1]" role="presentation">
      <Block x={8} y={8} width={86} height={28} />
      <Block x={106} y={8} width={86} height={28} variant="accent" />
      <Block x={204} y={8} width={88} height={28} />
      {bars.map((h, i) => {
        const height = (h / 100) * maxH;
        return (
          <Block
            key={i}
            x={8 + i * (barW + gap)}
            y={baseline - height}
            width={barW}
            height={height}
            variant={i === bars.length - 1 ? "accent" : "neutral"}
            rx={2}
          />
        );
      })}
    </svg>
  );
}

function ReportSketch() {
  const bars = [30, 50, 40, 70, 55, 85];
  const barW = 24;
  const gap = 6;
  const baseline = 140;
  const maxH = 110;
  return (
    <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full aspect-[2/1]" role="presentation">
      {bars.map((h, i) => {
        const height = (h / 100) * maxH;
        return (
          <Block
            key={i}
            x={8 + i * (barW + gap)}
            y={baseline - height}
            width={barW}
            height={height}
            variant={i === bars.length - 1 ? "accent" : "neutral"}
            rx={2}
          />
        );
      })}
      <circle cx={252} cy={75} r={42} className="fill-none stroke-foreground/20" strokeWidth={12} />
      <circle
        cx={252}
        cy={75}
        r={42}
        className="fill-none stroke-accent-blue"
        strokeWidth={12}
        strokeDasharray="105 264"
        strokeLinecap="round"
        transform="rotate(-90 252 75)"
      />
    </svg>
  );
}

function NavSketch() {
  return (
    <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full aspect-[2/1]" role="presentation">
      {[8, 36, 64, 92].map((y, i) => (
        <Block key={y} x={8} y={y} width={40} height={20} variant={i === 1 ? "accent" : "neutral"} />
      ))}
      <Block x={64} y={8} width={140} height={24} />
      <Block x={64} y={44} width={110} height={98} />
      <Block x={182} y={44} width={110} height={98} />
    </svg>
  );
}

function PipelineSketch() {
  const columns = [2, 3, 1, 2];
  const colW = 67;
  const colGap = 8;
  const cardH = 28;
  const cardGap = 8;
  return (
    <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full aspect-[2/1]" role="presentation">
      {columns.map((count, col) => {
        const x = 8 + col * (colW + colGap);
        return (
          <g key={col}>
            <Block x={x} y={8} width={colW} height={14} variant={col === 1 ? "accent" : "neutral"} rx={3} />
            {Array.from({ length: count }).map((_, i) => (
              <Block key={i} x={x} y={30 + i * (cardH + cardGap)} width={colW} height={cardH} variant="ghost" />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

function ChatSketch() {
  return (
    <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full aspect-[2/1]" role="presentation">
      <Block x={8} y={10} width={172} height={30} rx={8} />
      <Block x={172} y={54} width={120} height={30} variant="accent" rx={8} />
      <Block x={8} y={98} width={220} height={30} rx={8} />
    </svg>
  );
}

function FormSketch() {
  const rows = [8, 66];
  const cols = [8, 158];
  return (
    <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full aspect-[2/1]" role="presentation">
      {rows.map((y) =>
        cols.map((x, ci) => (
          <g key={`${y}-${x}`}>
            <rect x={x} y={y} width={50} height={7} rx={3} className="fill-foreground/25" />
            <Block x={x} y={y + 14} width={134} height={28} variant={y === 8 && ci === 0 ? "accent" : "neutral"} />
          </g>
        ))
      )}
    </svg>
  );
}

function ScheduleSketch() {
  const cell = 40;
  const gap = 8;
  const cols = 5;
  const rows = 3;
  const startX = (VB_W - (cols * cell + (cols - 1) * gap)) / 2;
  const startY = 7;
  const highlighted = new Set([3, 7, 11]);
  return (
    <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full aspect-[2/1]" role="presentation">
      {Array.from({ length: cols * rows }).map((_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        return (
          <Block
            key={i}
            x={startX + col * (cell + gap)}
            y={startY + row * (cell + gap)}
            width={cell}
            height={cell}
            variant={highlighted.has(i) ? "accent" : "neutral"}
            rx={4}
          />
        );
      })}
    </svg>
  );
}

function GallerySketch() {
  const tileW = 88;
  const tileH = 60;
  const xs = [10, 106, 202];
  const ys = [9, 77];
  return (
    <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full aspect-[2/1]" role="presentation">
      {ys.map((y, row) =>
        xs.map((x, col) => {
          const index = row * xs.length + col;
          return (
            <Block
              key={index}
              x={x}
              y={y}
              width={tileW}
              height={tileH}
              variant={index === 1 ? "accent" : "neutral"}
            />
          );
        })
      )}
    </svg>
  );
}

function TableSketch() {
  const rowY = [30, 60, 90, 120];
  return (
    <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full aspect-[2/1]" role="presentation">
      <Block x={8} y={8} width={284} height={12} rx={3} />
      {rowY.map((y, i) => (
        <g key={y}>
          <Block x={8} y={y} width={90} height={20} />
          <Block x={106} y={y} width={150} height={20} variant="neutral" />
          <Block x={264} y={y + 2} width={28} height={16} rx={8} variant={i === 1 ? "accent" : "neutral"} />
        </g>
      ))}
    </svg>
  );
}

const sketches: Record<Archetype, ComponentType> = {
  dashboard: DashboardSketch,
  report: ReportSketch,
  nav: NavSketch,
  pipeline: PipelineSketch,
  chat: ChatSketch,
  form: FormSketch,
  schedule: ScheduleSketch,
  gallery: GallerySketch,
  table: TableSketch,
};

export function InterfaceSketch({ label, className }: { label: string; className?: string }) {
  const Sketch = sketches[resolveArchetype(label)];
  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-lg border border-border bg-muted/50",
        className
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-border/70 bg-muted/60 px-3 py-2">
        <span className="size-2 rounded-full bg-foreground/25" />
        <span className="size-2 rounded-full bg-foreground/25" />
        <span className="size-2 rounded-full bg-foreground/25" />
      </div>
      <div className="px-4 py-3">
        <Sketch />
      </div>
    </div>
  );
}
