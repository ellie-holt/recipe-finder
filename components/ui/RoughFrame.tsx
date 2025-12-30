"use client";

import React, { useEffect, useRef } from "react";
import rough from "roughjs";

type RoughFrameProps = {
  children: React.ReactNode;

  frameInset?: number; // how far in the border is drawn
  contentPadding?: number; // space between border and content

  radius?: number; // corner radius
  roughness?: number; // sketchiness
  strokeWidth?: number; // line thickness

  fill?: string;
  fillStyle?: "solid" | "hachure" | "zigzag" | "cross-hatch";

  className?: string;
};

export function RoughFrame({
  children,
  frameInset = 8,
  contentPadding = 16,
  radius = 16,
  roughness = 1.5,
  strokeWidth = 1.5,
  fill = "transparent",
  fillStyle = "solid",
  className,
}: RoughFrameProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const draw = () => {
      const rect = host.getBoundingClientRect();
      const W = Math.max(1, Math.round(rect.width));
      const H = Math.max(1, Math.round(rect.height));

      // Keep canvas bitmap in sync with host size
      canvas.width = W;
      canvas.height = H;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Clear previous drawing before redrawing
      ctx.clearRect(0, 0, W, H);

      // Define an inner drawing area inset by padding
      const inset = frameInset + strokeWidth;

      const innerX = inset;
      const innerY = inset;
      const innerW = Math.max(1, W - inset * 2);
      const innerH = Math.max(1, H - inset * 2);

      // Create a rough.js drawing context for sketch-style rendering
      const rc = rough.canvas(canvas);

      // Generate an SVG-style path string for a rounded rectangle
      const roundedRectPath = (
        x: number,
        y: number,
        w: number,
        h: number,
        r: number
      ) => {
        // Clamp radius so it never exceeds half the rect size
        const rr = Math.max(0, Math.min(r, Math.floor(Math.min(w, h) / 2)));
        return `
          M ${x + rr} ${y}
          H ${x + w - rr}
          A ${rr} ${rr} 0 0 1 ${x + w} ${y + rr}
          V ${y + h - rr}
          A ${rr} ${rr} 0 0 1 ${x + w - rr} ${y + h}
          H ${x + rr}
          A ${rr} ${rr} 0 0 1 ${x} ${y + h - rr}
          V ${y + rr}
          A ${rr} ${rr} 0 0 1 ${x + rr} ${y}
          Z
        `;
      };

      // Outer border
      rc.path(roundedRectPath(innerX, innerY, innerW, innerH, radius), {
        roughness,
        strokeWidth,
        fill,
        fillStyle,
      });
    };

    // Draw once after mount
    draw();

    // Redraw whenever the canvas element changes size
    const ro = new ResizeObserver(draw);
    ro.observe(host);

    return () => ro.disconnect();
  }, [
    frameInset,
    contentPadding,
    radius,
    roughness,
    strokeWidth,
    fill,
    fillStyle,
  ]);

  return (
    <div
      ref={hostRef}
      className={className}
      style={{
        position: "relative",
      }}
    >
      {/* Canvas overlay: pointerEvents none so it never blocks clicks */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />

      {/* Content sits above/below visually; we add padding via a wrapper */}
      <div
        style={{
          position: "relative",
          zIndex: "0",
          width: "100%",

          height: "100%",
          padding: frameInset + contentPadding,
        }}
      >
        {children}
      </div>
    </div>
  );
}
