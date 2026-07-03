"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { SolidCard } from "@/components/ui/solid-card";
import { HighlightedCode } from "@/components/project/syntax-highlight";
import { cn } from "@/lib/utils";
import type { CodeTab } from "@/data/code-samples";

export function CodeTabs({ tabs }: { tabs: CodeTab[] }) {
  const [active, setActive] = React.useState(0);
  const [copied, setCopied] = React.useState(false);
  const activeTab = tabs[active];

  async function handleCopy() {
    await navigator.clipboard.writeText(activeTab.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <SolidCard hover={false} className="overflow-hidden p-0">
      <div className="flex items-center gap-1.5 border-b border-border bg-muted/40 px-3 py-2">
        <span className="size-2.5 rounded-full bg-status-critical/70" />
        <span className="size-2.5 rounded-full bg-status-warning/70" />
        <span className="size-2.5 rounded-full bg-status-good/70" />
        <div className="ml-2 flex flex-1 flex-wrap gap-1 overflow-x-auto">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium whitespace-nowrap transition-colors",
                i === active
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.filename}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code"
          className="flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-status-good" /> Copied
            </>
          ) : (
            <>
              <Copy className="size-3.5" /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[11px] leading-relaxed sm:text-xs">
        <code>
          <HighlightedCode code={activeTab.code} />
        </code>
      </pre>
    </SolidCard>
  );
}
