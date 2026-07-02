"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrintButton() {
  return (
    <Button variant="outline" size="lg" onClick={() => window.print()}>
      <Printer className="size-4" /> Print version
    </Button>
  );
}
