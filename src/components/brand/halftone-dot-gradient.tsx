import type * as React from "react";
import { cn } from "@/lib/utils";

export function HalftoneDotGradient({
  className,
  variant = "subtle",
  style,
}: {
  className?: string;
  variant?: "subtle" | "hero";
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 halftone-dot-gradient",
        variant === "hero" ? "halftone-dot-gradient--hero" : null,
        className,
      )}
      style={style}
    />
  );
}
