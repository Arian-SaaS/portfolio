import { CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils";

export function ProjectSection({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <FadeIn className={cn("border-t border-glass-border py-10 first:border-0 first:pt-0", className)}>
      <h2 className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </FadeIn>
  );
}

export function ProjectList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-muted-foreground">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent-cyan" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
