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

const block = "rounded-md bg-secondary";
const accentBlock = "rounded-md bg-accent-blue/25";

function DashboardSketch() {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="grid grid-cols-3 gap-2">
        <div className={cn(block, "h-6")} />
        <div className={cn(accentBlock, "h-6")} />
        <div className={cn(block, "h-6")} />
      </div>
      <div className="flex h-10 items-end gap-1.5">
        {[40, 55, 45, 65, 60, 78, 70, 90].map((h, i) => (
          <div
            key={i}
            className={cn("flex-1 rounded-t-sm", i === 7 ? "bg-accent-blue/50" : "bg-secondary")}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function ReportSketch() {
  return (
    <div className="flex w-full items-center gap-4">
      <div className="flex h-14 flex-1 items-end gap-1.5">
        {[30, 50, 40, 70, 55, 85].map((h, i) => (
          <div key={i} className={cn(block, "flex-1 rounded-t-sm")} style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="relative flex size-14 shrink-0 items-center justify-center rounded-full border-4 border-secondary">
        <div className="absolute inset-0 rounded-full border-4 border-accent-blue/50 [clip-path:polygon(50%_50%,50%_0,100%_0,100%_100%,50%_100%)]" />
      </div>
    </div>
  );
}

function NavSketch() {
  return (
    <div className="flex h-24 w-full gap-2">
      <div className="flex w-10 flex-col gap-1.5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={cn(block, "h-4", i === 2 && "bg-accent-blue/30")} />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className={cn(block, "h-6 w-2/3")} />
        <div className="grid flex-1 grid-cols-2 gap-2">
          <div className={block} />
          <div className={block} />
        </div>
      </div>
    </div>
  );
}

function PipelineSketch() {
  return (
    <div className="grid w-full grid-cols-4 gap-2">
      {[2, 3, 1, 2].map((count, col) => (
        <div key={col} className="flex flex-col gap-1.5">
          <div className={cn(block, "h-3", col === 1 && "bg-accent-blue/30")} />
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="h-6 rounded-md border border-border bg-surface" />
          ))}
        </div>
      ))}
    </div>
  );
}

function ChatSketch() {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className={cn(block, "h-6 w-3/5 self-start rounded-tl-sm")} />
      <div className={cn(accentBlock, "h-6 w-2/5 self-end rounded-tr-sm")} />
      <div className={cn(block, "h-6 w-4/5 self-start rounded-tl-sm")} />
    </div>
  );
}

function FormSketch() {
  return (
    <div className="grid w-full grid-cols-2 gap-x-4 gap-y-3">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="flex flex-col gap-1.5">
          <div className="h-2 w-1/3 rounded-full bg-secondary" />
          <div className={cn(block, "h-6", i === 0 && "bg-accent-blue/20")} />
        </div>
      ))}
    </div>
  );
}

function ScheduleSketch() {
  return (
    <div className="grid w-full grid-cols-5 gap-1.5">
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "aspect-square rounded-sm",
            [3, 7, 11].includes(i) ? "bg-accent-blue/30" : "bg-secondary"
          )}
        />
      ))}
    </div>
  );
}

function GallerySketch() {
  return (
    <div className="grid w-full grid-cols-3 gap-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className={cn("aspect-[3/4] rounded-md", i === 1 ? "bg-accent-blue/25" : "bg-secondary")}
        />
      ))}
    </div>
  );
}

function TableSketch() {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-2">
        <div className={cn(block, "h-3 w-1/3")} />
        <div className={cn(block, "h-3 flex-1")} />
      </div>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="h-5 w-1/3 rounded-md bg-secondary" />
          <div className="h-5 flex-1 rounded-md bg-secondary/60" />
          <div className={cn("h-4 w-10 rounded-full", i === 1 ? "bg-accent-blue/30" : "bg-secondary")} />
        </div>
      ))}
    </div>
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
    <div className={cn("flex w-full items-center justify-center px-6", className)}>
      <Sketch />
    </div>
  );
}
