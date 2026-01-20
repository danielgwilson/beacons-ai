import type { CreatorTheme } from "@/lib/theme";

export type ThemePresetId =
  | "vanilla"
  | "strawberry-night"
  | "mint-chip"
  | "blueberry-soda";

export const THEME_PRESET_IDS: ThemePresetId[] = [
  "vanilla",
  "strawberry-night",
  "mint-chip",
  "blueberry-soda",
];

export const THEME_PRESETS: Record<
  ThemePresetId,
  { name: string; theme: CreatorTheme }
> = {
  vanilla: {
    name: "Paper Grid",
    theme: {
      background:
        "radial-gradient(820px 520px at 10% 14%, oklch(0.88 0.23 145 / 20%), transparent 62%), radial-gradient(760px 520px at 92% 14%, oklch(0.9 0.08 225 / 16%), transparent 64%), radial-gradient(680px 520px at 72% 88%, oklch(0.67 0.21 330 / 12%), transparent 62%), linear-gradient(180deg, oklch(0.985 0.01 95), oklch(0.97 0.015 95))",
      cardBackground: "oklch(0.995 0.01 95 / 66%)",
      text: "oklch(0.17 0.02 265)",
      mutedText: "oklch(0.49 0.02 265)",
      buttonBackground: "oklch(0.88 0.23 145)",
      buttonText: "oklch(0.16 0.02 265)",
      accent: "oklch(0.9 0.08 225)",
    },
  },
  "strawberry-night": {
    name: "Midnight Neon",
    theme: {
      background:
        "radial-gradient(900px 560px at 18% 14%, oklch(0.88 0.23 145 / 18%), transparent 60%), radial-gradient(760px 520px at 92% 18%, oklch(0.74 0.16 225 / 16%), transparent 65%), radial-gradient(680px 520px at 70% 92%, oklch(0.67 0.21 330 / 12%), transparent 62%), linear-gradient(180deg, oklch(0.14 0.02 265), oklch(0.12 0.02 265))",
      cardBackground: "oklch(1 0 0 / 7%)",
      text: "oklch(0.985 0.01 95)",
      mutedText: "oklch(0.985 0.01 95 / 72%)",
      buttonBackground: "oklch(0.88 0.23 145)",
      buttonText: "oklch(0.15 0.02 265)",
      accent: "oklch(0.74 0.16 225)",
    },
  },
  "mint-chip": {
    name: "Lime Fog",
    theme: {
      background:
        "radial-gradient(860px 560px at 14% 18%, oklch(0.88 0.23 145 / 18%), transparent 62%), radial-gradient(760px 520px at 86% 18%, oklch(0.9 0.08 225 / 14%), transparent 64%), linear-gradient(180deg, oklch(0.985 0.01 95), oklch(0.97 0.015 95))",
      cardBackground: "oklch(0.995 0.01 95 / 62%)",
      text: "oklch(0.17 0.02 265)",
      mutedText: "oklch(0.49 0.02 265)",
      buttonBackground: "oklch(0.74 0.16 225)",
      buttonText: "oklch(0.985 0.01 95)",
      accent: "oklch(0.88 0.23 145)",
    },
  },
  "blueberry-soda": {
    name: "Ink Soda",
    theme: {
      background:
        "radial-gradient(900px 560px at 18% 14%, oklch(0.74 0.16 225 / 22%), transparent 62%), radial-gradient(760px 520px at 86% 22%, oklch(0.67 0.21 330 / 14%), transparent 64%), linear-gradient(180deg, oklch(0.13 0.02 265), oklch(0.11 0.02 265))",
      cardBackground: "oklch(1 0 0 / 8%)",
      text: "oklch(0.985 0.01 95)",
      mutedText: "oklch(0.985 0.01 95 / 72%)",
      buttonBackground: "oklch(0.88 0.23 145)",
      buttonText: "oklch(0.15 0.02 265)",
      accent: "oklch(0.9 0.08 225)",
    },
  },
};
