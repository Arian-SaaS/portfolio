import { ImageIcon } from "lucide-react";
import { SolidCard } from "@/components/ui/solid-card";

export function ScreenshotPlaceholder({ label }: { label: string }) {
  return (
    <SolidCard hover={false} className="flex aspect-video flex-col items-center justify-center gap-2 p-6 text-center">
      <ImageIcon className="size-6 text-muted-foreground/50" />
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground/50">
        Screenshot placeholder
      </p>
    </SolidCard>
  );
}
