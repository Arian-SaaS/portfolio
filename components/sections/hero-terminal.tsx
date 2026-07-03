"use client";

import * as React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { siteConfig } from "@/data/site-config";
import { projects } from "@/data/projects";

type Segment = { command: string; output: string };

const script: Segment[] = [
  {
    command: "whoami",
    output: `${siteConfig.name} — ${siteConfig.titles.join(" / ")}`,
  },
  {
    command: "ls projects/",
    output: projects.map((p) => p.slug).join("  "),
  },
  {
    command: "cat cbsai/status.json",
    output: `{ "status": "production", "modules": 15, "tenants": "multi" }`,
  },
  {
    command: "echo $AVAILABILITY",
    output: "open to full-stack, systems architect, and founding engineer roles",
  },
];

const TYPE_MS = 32;
const PAUSE_AFTER_COMMAND_MS = 350;
const PAUSE_AFTER_OUTPUT_MS = 1400;
const PAUSE_BEFORE_LOOP_MS = 3600;

function TerminalLine({ command, output }: Segment) {
  return (
    <div className="mb-3">
      <p>
        <span className="text-accent-cyan">$</span> {command}
      </p>
      <p className="mt-0.5 text-muted-foreground">{output}</p>
    </div>
  );
}

export function HeroTerminal({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion();
  const [completed, setCompleted] = React.useState<Segment[]>([]);
  const [typed, setTyped] = React.useState("");
  const [showOutput, setShowOutput] = React.useState(false);

  React.useEffect(() => {
    if (reducedMotion) return;
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const schedule = (fn: () => void, ms: number) => {
      timeouts.push(setTimeout(() => !cancelled && fn(), ms));
    };

    function runSegment(index: number) {
      if (index >= script.length) {
        schedule(() => {
          setCompleted([]);
          setTyped("");
          setShowOutput(false);
          runSegment(0);
        }, PAUSE_BEFORE_LOOP_MS);
        return;
      }

      const segment = script[index];
      let charIndex = 0;

      function typeNextChar() {
        charIndex += 1;
        setTyped(segment.command.slice(0, charIndex));
        if (charIndex < segment.command.length) {
          schedule(typeNextChar, TYPE_MS);
          return;
        }
        schedule(() => {
          setShowOutput(true);
          schedule(() => {
            setCompleted((prev) => [...prev, segment]);
            setTyped("");
            setShowOutput(false);
            runSegment(index + 1);
          }, PAUSE_AFTER_OUTPUT_MS);
        }, PAUSE_AFTER_COMMAND_MS);
      }

      typeNextChar();
    }

    runSegment(0);
    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [reducedMotion]);

  return (
    <GlassCard strong hover={false} className={className}>
      <div className="flex items-center gap-1.5 border-b border-glass-border px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-status-critical/70" />
        <span className="size-2.5 rounded-full bg-status-warning/70" />
        <span className="size-2.5 rounded-full bg-status-good/70" />
        <span className="ml-2 text-[11px] text-muted-foreground">reza@portfolio: ~</span>
      </div>
      <div className="min-h-56 overflow-hidden px-4 py-3.5 font-mono text-[11px] leading-relaxed sm:text-xs">
        {reducedMotion ? (
          script.map((segment) => <TerminalLine key={segment.command} {...segment} />)
        ) : (
          <>
            {completed.map((segment) => (
              <TerminalLine key={segment.command} {...segment} />
            ))}
            <p>
              <span className="text-accent-cyan">$</span> {typed}
              <span
                className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-accent-cyan align-middle"
                aria-hidden
              />
            </p>
            {showOutput && (
              <p className="mt-0.5 text-muted-foreground">{script[completed.length].output}</p>
            )}
          </>
        )}
      </div>
    </GlassCard>
  );
}
