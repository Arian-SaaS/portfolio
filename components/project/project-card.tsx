import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SolidCard } from "@/components/ui/solid-card";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types/project";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block h-full">
      <SolidCard
        className={cn(
          "flex h-full flex-col justify-between p-6",
          featured && "p-8"
        )}
      >
        <div>
          <div className="flex items-start justify-between gap-4">
            <Badge
              variant="secondary"
              className={cn(
                "border-0",
                project.accent === "cyan"
                  ? "bg-accent-cyan/10 text-accent-cyan"
                  : "bg-accent-blue/10 text-accent-blue"
              )}
            >
              {project.category}
            </Badge>
            <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <h3
            className={cn(
              "mt-4 font-heading font-semibold tracking-tight",
              featured ? "text-2xl" : "text-lg"
            )}
          >
            {project.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{project.title}</p>
        </div>
        <p
          className={cn(
            "mt-4 text-sm leading-relaxed text-muted-foreground",
            !featured && "line-clamp-3"
          )}
        >
          {project.summary}
        </p>
      </SolidCard>
    </Link>
  );
}
