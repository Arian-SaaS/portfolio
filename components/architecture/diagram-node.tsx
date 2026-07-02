"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { cn } from "@/lib/utils";

export type DiagramNodeData = {
  label: string;
  detail?: string;
  tech?: string[];
  isEndpoint?: boolean;
};

export function DiagramNode({ data }: NodeProps & { data: DiagramNodeData }) {
  return (
    <div
      className={cn(
        "group/node relative w-44 cursor-grab rounded-xl border bg-surface px-3.5 py-3 shadow-sm transition-shadow duration-200 hover:z-10 hover:shadow-lg active:cursor-grabbing",
        data.isEndpoint ? "border-accent-blue/50" : "border-border"
      )}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!size-2 !border-none !bg-accent-cyan"
      />
      <p className="text-sm leading-snug font-medium text-foreground">{data.label}</p>
      {data.tech && data.tech.length > 0 && (
        <div className="mt-1.5 flex flex-wrap gap-1">
          {data.tech.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-secondary-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      )}
      {data.detail && (
        <div
          className={cn(
            "pointer-events-none absolute top-full left-1/2 z-20 mt-2 w-56 -translate-x-1/2 rounded-lg border border-border bg-popover p-3 text-xs leading-relaxed text-popover-foreground opacity-0 shadow-xl transition-opacity duration-150",
            "group-hover/node:opacity-100"
          )}
        >
          {data.detail}
        </div>
      )}
      <Handle
        type="source"
        position={Position.Right}
        className="!size-2 !border-none !bg-accent-cyan"
      />
    </div>
  );
}
