"use client";

import * as React from "react";
import { Search, ChevronRight } from "lucide-react";
import { SolidCard } from "@/components/ui/solid-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableRow as TableRowData } from "@/data/dashboard-preview";
import { cn } from "@/lib/utils";

const statusConfig = {
  cleared: { label: "Cleared", className: "bg-status-good/10 text-status-good" },
  flagged: { label: "Flagged", className: "bg-status-critical/10 text-status-critical" },
  pending: { label: "Pending", className: "bg-status-warning/10 text-status-warning" },
} as const;

export function ActivityTable({
  title,
  columns,
  rows,
}: {
  title: string;
  columns: [string, string, string, string, string];
  rows: TableRowData[];
}) {
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<"all" | keyof typeof statusConfig>("all");

  const filtered = rows.filter((row) => {
    const matchesQuery =
      query.trim().length === 0 ||
      `${row.primary} ${row.secondary}`.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = status === "all" || row.status === status;
    return matchesQuery && matchesStatus;
  });

  return (
    <SolidCard hover={false} className="p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{title}</p>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="h-8 w-40 pl-8 text-xs"
            />
          </div>
          <Select value={status} onValueChange={(v) => setStatus(v as typeof status)}>
            <SelectTrigger className="text-xs">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="cleared">Cleared</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="flagged">Flagged</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              {columns.map((col) => (
                <th key={col} className="py-2 pr-4 font-medium">
                  {col}
                </th>
              ))}
              <th className="py-2 text-right font-medium">
                <span className="sr-only">Drill down</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={i} className="border-b border-border/60 last:border-0">
                <td className="py-3 pr-4">
                  <p className="font-medium">{row.primary}</p>
                  <p className="text-xs text-muted-foreground">{row.secondary}</p>
                </td>
                <td className="py-3 pr-4 text-muted-foreground">{row.module}</td>
                <td className="py-3 pr-4 tabular-nums">{row.amount}</td>
                <td className="py-3 pr-4">
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-medium",
                      statusConfig[row.status].className
                    )}
                  >
                    {statusConfig[row.status].label}
                  </span>
                </td>
                <td className="py-3 pr-4 text-muted-foreground">{row.date}</td>
                <td className="py-3 text-right">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-7"
                    aria-label={`View details for ${row.primary}`}
                  >
                    <ChevronRight className="size-4" />
                  </Button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="py-6 text-center text-sm text-muted-foreground">
                  No results match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </SolidCard>
  );
}
