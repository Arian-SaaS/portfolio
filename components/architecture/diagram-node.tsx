"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { cn } from "@/lib/utils";

export type DiagramNodeData = {
  label: string;
  detail?: string;
  tech?: string[];
  isEndpoint?: boolean;
};

/**
 * Every node is exactly this size, and the layout in flow-diagram-inner reads
 * the same numbers to space them. They were previously independent — the node
 * was w-44 (176px) while the layout spaced on 150 or 190 — so the gap between
 * boxes was never quite the gap the code said it was.
 */
export const NODE_WIDTH = 176; // w-44
export const NODE_HEIGHT = 96; // h-24

export function DiagramNode({ data }: NodeProps & { data: DiagramNodeData }) {
  return (
    <div
      className={cn(
        // Fixed height as well as fixed width. Height used to follow the
        // content, and the content varies in two ways that made every box a
        // different size: labels wrap to one or two lines, and only about half
        // the nodes declare `tech` at all, so half had a pill row and half did
        // not. A row of architecture boxes at four different heights reads as
        // sloppy long before anyone works out why.
        "group/node relative flex h-24 w-44 cursor-grab flex-col rounded-xl border bg-surface px-3.5 py-3 transition-shadow duration-200 hover:z-10 active:cursor-grabbing",
        "elev elev-interactive",
        data.isEndpoint ? "border-accent-blue/50" : "border-border"
      )}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!size-2 !border-none !bg-accent-cyan"
      />

      {/* Two lines are reserved whether the label needs them or not, so a
          one-line and a two-line label start at the same baseline. */}
      <p className="line-clamp-2 min-h-[2.5rem] text-sm leading-snug font-medium text-foreground">
        {data.label}
      </p>

      {/* Always rendered, even with no tech to show. An empty reserved row
          keeps a node without tech the same height as one with it. Pinned to
          the bottom so the row sits on the same line across every box.

          Single row, clipped at the edge — wrapping is what made a three-pill
          node taller than a one-pill node in the first place. */}
      <div className="mt-auto flex h-[1.125rem] items-center gap-1 overflow-hidden">
        {data.tech?.slice(0, 3).map((t) => (
          <span
            key={t}
            className="shrink-0 rounded-full bg-secondary px-1.5 py-0.5 text-[10px] leading-none font-medium text-secondary-foreground"
          >
            {t}
          </span>
        ))}
      </div>

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
