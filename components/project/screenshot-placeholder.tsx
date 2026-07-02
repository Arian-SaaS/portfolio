import { SolidCard } from "@/components/ui/solid-card";
import { InterfaceSketch } from "@/components/project/interface-sketch";

export function ScreenshotPlaceholder({ label }: { label: string }) {
  return (
    <SolidCard hover={false} className="flex aspect-video flex-col justify-between p-5">
      <InterfaceSketch label={label} className="flex-1" />
      <div>
        <p className="text-xs font-medium">{label}</p>
        <p className="text-[10px] uppercase tracking-wide text-muted-foreground/60">
          Illustrative — not an actual screen
        </p>
      </div>
    </SolidCard>
  );
}
