import { GlassCard } from "@/components/ui/glass-card";

const kw = "text-accent-blue";
const type = "text-accent-cyan";
const str = "text-status-good";
const comment = "text-muted-foreground/70";

export function CodeSnippetCard({ className }: { className?: string }) {
  return (
    <GlassCard strong hover={false} className={className}>
      <div className="flex items-center gap-1.5 border-b border-glass-border px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-status-critical/70" />
        <span className="size-2.5 rounded-full bg-status-warning/70" />
        <span className="size-2.5 rounded-full bg-status-good/70" />
        <span className="ml-2 text-[11px] text-muted-foreground">workspace.ts</span>
      </div>
      <pre className="overflow-x-auto px-4 py-3.5 font-mono text-[11px] leading-relaxed sm:text-xs">
        <code>
          <span className={comment}>{"// scoped per tenant, every request"}</span>
          {"\n"}
          <span className={kw}>interface</span> <span className={type}>Workspace</span> {"{"}
          {"\n"}
          {"  "}tenantId: <span className={type}>string</span>;{"\n"}
          {"  "}modules: <span className={type}>Module</span>[];{"\n"}
          {"  "}permissions: <span className={type}>RBACPolicy</span>;{"\n"}
          {"}"}
          {"\n\n"}
          <span className={kw}>function</span> resolve(ctx: <span className={type}>Context</span>){" "}
          {"{"}
          {"\n"}
          {"  "}
          <span className={kw}>return</span> ctx.scope.narrow(<span className={str}>tenant</span>);{"\n"}
          {"}"}
          <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-accent-cyan align-middle" aria-hidden />
        </code>
      </pre>
    </GlassCard>
  );
}
