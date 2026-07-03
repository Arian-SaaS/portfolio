"use client";

import * as React from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function AnimatedCounter({
  value,
  suffix = "",
  duration = 1400,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const reducedMotion = useReducedMotion();
  const ref = React.useRef<HTMLSpanElement>(null);
  const [started, setStarted] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (reducedMotion || started) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion, started]);

  React.useEffect(() => {
    if (!started) return;
    let frame: number;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      setProgress(t);
      if (t < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, duration]);

  const displayValue = reducedMotion ? value : Math.round(easeOutCubic(progress) * value);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}
