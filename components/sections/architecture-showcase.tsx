"use client";

import * as React from "react";
import { FlowDiagram } from "@/components/architecture/flow-diagram";
import { architectureDiagrams } from "@/data/architecture";
import { cn } from "@/lib/utils";

/**
 * The diagrams worth leading with. The full set lives at /architecture — these
 * are the three that between them cover the shape of the work: how a platform
 * is partitioned, how tenants are kept apart, and how the AI layer is wired in.
 */
const FEATURED = ["enterprise-saas", "multi-tenant", "ai-orchestration"];

const featured = FEATURED.map((slug) =>
  architectureDiagrams.find((d) => d.slug === slug)
).filter((d): d is (typeof architectureDiagrams)[number] => Boolean(d));

export function ArchitectureShowcase() {
  const [active, setActive] = React.useState(0);
  const current = featured[active];

  if (!current) return null;

  return (
    <div>
      <div role="tablist" aria-label="Architecture diagrams" className="flex flex-wrap gap-2">
        {featured.map((d, i) => (
          <button
            key={d.slug}
            id={`arch-tab-${d.slug}`}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls="arch-panel"
            onClick={() => setActive(i)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors",
              i === active
                ? "border-accent-cyan/40 bg-accent-cyan/10 text-accent-cyan"
                : "border-border text-muted-foreground hover:border-accent-cyan/25 hover:text-foreground"
            )}
          >
            {d.title}
          </button>
        ))}
      </div>

      {/* Reserved height. The descriptions differ by a line or two and the
          diagram below would otherwise jump on every tab switch. */}
      <p className="mt-5 min-h-[3.5rem] max-w-2xl text-sm leading-relaxed text-muted-foreground sm:min-h-[3rem]">
        {current.description}
      </p>

      <div
        id="arch-panel"
        role="tabpanel"
        aria-labelledby={`arch-tab-${current.slug}`}
        className="mt-5"
      >
        {/*
          Only the active diagram is mounted, and the key forces a fresh mount
          on every switch. React Flow measures its container to lay the graph
          out and fit it; a container that mounts inside a `hidden` panel
          measures zero, fits to nothing, and drops every node in a pile in the
          corner. Mounting into a container that already has its real size is
          the whole trick. The dynamic import is cached after the first tab, so
          the switch costs a mount and a layout pass, not a download.
        */}
        <FlowDiagram key={current.slug} items={current.nodes} />
      </div>
    </div>
  );
}
