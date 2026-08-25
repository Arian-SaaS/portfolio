"use client";

import * as React from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  radius: number;
  label: string;
  pulse: number;
};

/** Grid pitch at the loosest. Density adapts upward from here on small screens. */
const BASE_SPACING = 58;
/** Ceiling on node count, so a 4K monitor does not quietly cost ten times a laptop. */
const MAX_NODES = 900;
/** Connections are drawn below this separation. */
const MAX_CONN_DIST = 78;

const SPRING_K = 18;
const DAMPING = 0.82;

/** Hex token to an "r, g, b" triplet for rgba() strings, or null if unparseable. */
function rgbTriplet(value: string): string | null {
  const h = value.trim().replace(/^#/, "");
  if (!/^(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(h)) return null;
  const full = h.length === 3 ? h[0] + h[0] + h[1] + h[1] + h[2] + h[2] : h;
  const n = parseInt(full, 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

/**
 * The site background: a spring-loaded node mesh that reacts to the cursor.
 *
 * Adapted from a full-page demo into a background layer, which changes four
 * things that matter:
 *
 * 1. It reads the palette from CSS tokens rather than hard-coding two hex
 *    values, and re-reads them when the theme class on <html> changes. The
 *    original watched `prefers-color-scheme` directly, which is the OS setting
 *    and not the site's — a visitor who picked light from the theme toggle
 *    while their OS was dark would have got the dark mesh on a light page.
 *
 * 2. It draws on transparent rather than painting its own opaque background, so
 *    the tokenized ground and the ambient wash still show through and the mesh
 *    sits on top of them instead of replacing them.
 *
 * 3. Connections are found through grid neighbours instead of comparing every
 *    node with every other node. The original was O(n^2): 1,344 nodes on a
 *    1440p display is 902,496 distance checks per frame, 48 million a second.
 *    Since the nodes are laid out on a known grid and only reach two cells
 *    before the distance cap, each one needs about a dozen comparisons.
 *
 * 4. It stops when it cannot be seen, and holds a single static frame under
 *    prefers-reduced-motion.
 */
export function ConstellationGrid() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const hostRef = React.useRef<HTMLDivElement | null>(null);
  const [booted, setBooted] = React.useState(false);

  // Deferred like the hero render, so the mesh never competes with hydration
  // or with the paint of the copy above it.
  React.useEffect(() => {
    if (typeof window.requestIdleCallback !== "function") {
      const t = window.setTimeout(() => setBooted(true), 200);
      return () => window.clearTimeout(t);
    }
    const h = window.requestIdleCallback(() => setBooted(true), { timeout: 800 });
    return () => window.cancelIdleCallback(h);
  }, []);

  React.useEffect(() => {
    if (!booted) return;
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let spacing = BASE_SPACING;
    let nodes: Node[] = [];
    let raf = 0;
    let running = true;

    const mouse = { x: -1e4, y: -1e4, prevX: -1e4, prevY: -1e4, vx: 0, vy: 0, radius: 220 };

    /* --- palette, read from the stylesheet ------------------------------- */

    let nodeRGB = "230, 237, 243";
    let accentRGB = "45, 212, 191";
    let lineAlpha = 0.16;
    let dotAlpha = 0.28;

    function readPalette() {
      const s = getComputedStyle(host!);
      nodeRGB = rgbTriplet(s.getPropertyValue("--foreground")) ?? nodeRGB;
      accentRGB = rgbTriplet(s.getPropertyValue("--accent-cyan")) ?? accentRGB;
      const l = parseFloat(s.getPropertyValue("--grid-line-opacity"));
      const d = parseFloat(s.getPropertyValue("--grid-dot-opacity"));
      if (Number.isFinite(l)) lineAlpha = l;
      if (Number.isFinite(d)) dotAlpha = d;
    }

    /* --- layout ---------------------------------------------------------- */

    function initNodes() {
      // Loosen the pitch until the node count is under the ceiling, so a large
      // display costs the same as a small one rather than quadratically more.
      spacing = BASE_SPACING;
      for (let guard = 0; guard < 12; guard++) {
        cols = Math.ceil(width / spacing) + 1;
        rows = Math.ceil(height / spacing) + 1;
        if (cols * rows <= MAX_NODES) break;
        spacing *= 1.12;
      }

      nodes = new Array(cols * rows);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;
          nodes[i * rows + j] = {
            x,
            y,
            vx: 0,
            vy: 0,
            baseX: x,
            baseY: y,
            radius: Math.random() * 1.2 + 1.2,
            label: `${(i * 7).toString(16).toUpperCase()}:${(j * 11).toString(16).toUpperCase()}`,
            pulse: Math.random() * Math.PI * 2,
          };
        }
      }
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      // setTransform, not scale. scale() multiplies into whatever transform is
      // already on the context, so calling it on every resize compounds — three
      // resizes at dpr 2 and the scene is drawing at 8x.
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      initNodes();
    }

    /* --- frame ----------------------------------------------------------- */

    /** Cells a connection can span. Beyond this the distance cap has bitten. */
    let reach = 2;

    function draw(dt: number) {
      mouse.vx = (mouse.x - mouse.prevX) / (dt * 1000 || 1);
      mouse.vy = (mouse.y - mouse.prevY) / (dt * 1000 || 1);
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      const speed = Math.hypot(mouse.vx, mouse.vy);

      ctx!.clearRect(0, 0, width, height);

      for (let k = 0; k < nodes.length; k++) {
        const n = nodes[k];
        n.pulse += dt * 3;

        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius && dist > 0) {
          const power = 1 - dist / mouse.radius;
          const force = power * (1500 + speed * 150);
          const angle = Math.atan2(dy, dx);
          n.vx -= Math.cos(angle) * force * dt;
          n.vy -= Math.sin(angle) * force * dt;
        }

        n.vx += (n.baseX - n.x) * SPRING_K * dt;
        n.vy += (n.baseY - n.y) * SPRING_K * dt;
        n.vx *= DAMPING;
        n.vy *= DAMPING;
        n.x += n.vx * dt * 60;
        n.y += n.vy * dt * 60;
      }

      // Connections, via grid neighbours. Each node looks at the cells ahead of
      // it only, which covers every pair exactly once without a visited set.
      const maxSq = MAX_CONN_DIST * MAX_CONN_DIST;
      ctx!.lineWidth = 0.7;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const n = nodes[i * rows + j];
          for (let di = 0; di <= reach; di++) {
            const i2 = i + di;
            if (i2 >= cols) break;
            for (let dj = di === 0 ? 1 : -reach; dj <= reach; dj++) {
              const j2 = j + dj;
              if (j2 < 0 || j2 >= rows) continue;
              const n2 = nodes[i2 * rows + j2];
              const ndx = n.x - n2.x;
              const ndy = n.y - n2.y;
              const distSq = ndx * ndx + ndy * ndy;
              if (distSq >= maxSq) continue;
              const alpha = (1 - Math.sqrt(distSq) / MAX_CONN_DIST) * lineAlpha;
              ctx!.strokeStyle = `rgba(${nodeRGB}, ${alpha})`;
              ctx!.beginPath();
              ctx!.moveTo(n.x, n.y);
              ctx!.lineTo(n2.x, n2.y);
              ctx!.stroke();
            }
          }
        }
      }

      ctx!.font = "8px ui-monospace, SFMono-Regular, Consolas, monospace";
      for (let k = 0; k < nodes.length; k++) {
        const n = nodes[k];
        const dist = Math.hypot(mouse.x - n.x, mouse.y - n.y);
        const isNear = dist < mouse.radius;

        const baseAlpha = isNear ? 0.95 : dotAlpha + Math.sin(n.pulse) * 0.08;
        ctx!.fillStyle = isNear
          ? `rgba(${accentRGB}, ${baseAlpha})`
          : `rgba(${nodeRGB}, ${baseAlpha})`;
        const r = isNear ? n.radius * 2.2 : n.radius + Math.sin(n.pulse) * 0.3;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, Math.max(0.5, r), 0, Math.PI * 2);
        ctx!.fill();

        if (dist < 90) {
          const ring = ((n.pulse * 20) % 30) + 4;
          ctx!.strokeStyle = `rgba(${accentRGB}, ${(1 - ring / 34) * 0.4})`;
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, ring, 0, Math.PI * 2);
          ctx!.stroke();
          ctx!.lineWidth = 0.7;

          ctx!.fillStyle = `rgba(${accentRGB}, 0.85)`;
          ctx!.fillText(n.label, n.x + 10, n.y - 10);
        }
      }
    }

    let last = performance.now();
    function tick(now: number) {
      if (!running) return;
      raf = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      draw(dt);
    }

    /* --- wiring ---------------------------------------------------------- */

    readPalette();
    resize();
    reach = Math.max(1, Math.ceil(MAX_CONN_DIST / spacing));

    if (reduced) {
      draw(0.016);
    } else {
      raf = requestAnimationFrame(tick);
    }

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -1e4;
      mouse.y = -1e4;
    };
    const onResize = () => {
      resize();
      reach = Math.max(1, Math.ceil(MAX_CONN_DIST / spacing));
      if (reduced) draw(0.016);
    };
    const onVisibility = () => {
      if (reduced) return;
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    // The palette lives in CSS, so a theme swap has to be picked up. next-themes
    // changes the class on <html>.
    const themeWatch = new MutationObserver(() => {
      readPalette();
      if (reduced) draw(0.016);
    });
    themeWatch.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style", "data-theme"],
    });

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      themeWatch.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [booted]);

  return (
    <div
      ref={hostRef}
      aria-hidden
      // Fixed and behind everything. z-index -1 puts it on the negative
      // stacking level: above the canvas the page background paints on, below
      // every element in the document. pointer-events:none is not optional —
      // without it this layer would swallow every click on the site.
      className="pointer-events-none fixed inset-0 print:hidden"
      style={{ zIndex: -1 }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}

export default ConstellationGrid;
