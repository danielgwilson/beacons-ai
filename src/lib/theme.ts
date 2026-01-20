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
    "--creator-bg":
      t.background ??
      "radial-gradient(820px 520px at 10% 14%, oklch(0.88 0.23 145 / 20%), transparent 62%), radial-gradient(760px 520px at 92% 14%, oklch(0.9 0.08 225 / 16%), transparent 64%), radial-gradient(680px 520px at 72% 88%, oklch(0.67 0.21 330 / 12%), transparent 62%), linear-gradient(180deg, oklch(0.985 0.01 95), oklch(0.97 0.015 95))",
    "--creator-card": t.cardBackground ?? "oklch(0.995 0.01 95 / 66%)",
    "--creator-text": t.text ?? "oklch(0.17 0.02 265)",
    "--creator-muted": t.mutedText ?? "oklch(0.49 0.02 265)",
    "--creator-btn-bg": t.buttonBackground ?? "oklch(0.88 0.23 145)",
    "--creator-btn-text": t.buttonText ?? "oklch(0.16 0.02 265)",
    "--creator-accent": t.accent ?? "oklch(0.9 0.08 225)",
  } as React.CSSProperties;
}

export function coerceCreatorTheme(value: unknown): CreatorTheme | null {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as CreatorTheme;
  }
  return null;
}
