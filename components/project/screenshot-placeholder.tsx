import { ImageIcon } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

export function ScreenshotPlaceholder({ label }: { label: string }) {
  return (
    <GlassCard hover={false} className="flex aspect-video flex-col items-center justify-center gap-2 p-6 text-center">
      <ImageIcon className="size-6 text-muted-foreground/50" />
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground/50">
        Screenshot placeholder
      </p>
    </GlassCard>
  );
}
