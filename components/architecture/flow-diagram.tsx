"use client";

import dynamic from "next/dynamic";
import type { FlowItem } from "@/components/architecture/flow-diagram-inner";

const FlowDiagramInner = dynamic(
  () => import("@/components/architecture/flow-diagram-inner").then((mod) => mod.FlowDiagramInner),
  {
    ssr: false,
    loading: () => <div className="h-[190px] animate-pulse rounded-xl bg-muted/20" />,
  }
);

export function FlowDiagram({ items, compact = false }: { items: FlowItem[]; compact?: boolean }) {
  return <FlowDiagramInner items={items} compact={compact} />;
}
