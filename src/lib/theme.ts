import type React from "react";

export type CreatorTheme = {
  background?: string;
  cardBackground?: string;
  text?: string;
  mutedText?: string;
  buttonBackground?: string;
  buttonText?: string;
  accent?: string;
};

export function themeToStyle(theme: CreatorTheme | null | undefined) {
  const t = theme ?? {};
  return {
    "--creator-bg": t.background ?? "oklch(1 0 0)",
    "--creator-card": t.cardBackground ?? "oklch(1 0 0)",
    "--creator-text": t.text ?? "oklch(0.129 0.042 264.695)",
    "--creator-muted": t.mutedText ?? "oklch(0.554 0.046 257.417)",
    "--creator-btn-bg": t.buttonBackground ?? "oklch(0.208 0.042 265.755)",
    "--creator-btn-text": t.buttonText ?? "oklch(0.984 0.003 247.858)",
    "--creator-accent": t.accent ?? "oklch(0.6 0.118 184.704)",
  } as React.CSSProperties;
}

export function coerceCreatorTheme(value: unknown): CreatorTheme | null {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as CreatorTheme;
  }
  return null;
}
