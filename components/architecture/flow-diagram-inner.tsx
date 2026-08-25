"use client";

import * as React from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  MarkerType,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTheme } from "next-themes";
import { DiagramNode, NODE_WIDTH } from "@/components/architecture/diagram-node";

const nodeTypes = { diagram: DiagramNode };

export type FlowItem = string | { label: string; detail?: string; tech?: string[] };

function normalize(item: FlowItem) {
  return typeof item === "string" ? { label: item, detail: undefined, tech: undefined } : item;
}

export function FlowDiagramInner({
  items,
  compact = false,
}: {
  items: FlowItem[];
  compact?: boolean;
}) {
  const { resolvedTheme } = useTheme();
  const normalized = React.useMemo(() => items.map(normalize), [items]);

  // The node is a fixed NODE_WIDTH regardless of `compact`, so only the gap
  // between boxes changes. Spacing used to be computed from 150 or 190, neither
  // of which was the node's actual 176 — the gaps were real but never the size
  // the code claimed.
  const gapX = compact ? 44 : 88;

  const nodes: Node[] = React.useMemo(
    () =>
      normalized.map((n, i) => ({
        id: String(i),
        type: "diagram",
        position: { x: i * (NODE_WIDTH + gapX), y: 0 },
        data: {
          label: n.label,
          detail: n.detail,
          tech: n.tech,
          isEndpoint: i === 0 || i === normalized.length - 1,
        },
        draggable: true,
      })),
    [normalized, gapX]
  );

  const edges: Edge[] = React.useMemo(
    () =>
      normalized.slice(0, -1).map((_, i) => ({
        id: `e${i}`,
        source: String(i),
        target: String(i + 1),
        animated: true,
        style: { stroke: "var(--accent-cyan)", strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: "var(--accent-cyan)", width: 16, height: 16 },
      })),
    [normalized]
  );

  return (
    <div
      style={{ height: compact ? 190 : 260 }}
      className="overflow-hidden rounded-xl border border-border bg-muted/20"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.25 }}
        colorMode={resolvedTheme === "light" ? "light" : "dark"}
        panOnScroll={false}
        zoomOnScroll={false}
        zoomOnPinch
        minZoom={0.2}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="var(--border)" />
        <Controls showInteractive={false} position="bottom-right" />
      </ReactFlow>
    </div>
  );
}
