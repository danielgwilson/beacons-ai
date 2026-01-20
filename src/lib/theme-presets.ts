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
    name: "Vanilla Swirl",
    theme: {
      background:
        "radial-gradient(800px 520px at 10% 10%, oklch(0.94 0.08 12 / 65%), transparent 65%), radial-gradient(760px 520px at 92% 18%, oklch(0.92 0.09 250 / 65%), transparent 65%), radial-gradient(680px 520px at 70% 88%, oklch(0.93 0.08 140 / 55%), transparent 62%), linear-gradient(180deg, oklch(0.99 0.01 85), oklch(0.975 0.02 85))",
      cardBackground: "oklch(0.995 0.01 85 / 72%)",
      text: "oklch(0.2 0.03 40)",
      mutedText: "oklch(0.52 0.03 45)",
      buttonBackground: "oklch(0.63 0.23 12)",
      buttonText: "oklch(0.985 0.015 85)",
      accent: "oklch(0.7 0.14 250)",
    },
  },
  "strawberry-night": {
    name: "Strawberry Night",
    theme: {
      background:
        "radial-gradient(900px 520px at 18% 14%, oklch(0.68 0.22 12 / 30%), transparent 60%), radial-gradient(760px 520px at 92% 18%, oklch(0.66 0.16 280 / 28%), transparent 65%), linear-gradient(180deg, oklch(0.17 0.03 40), oklch(0.14 0.03 40))",
      cardBackground: "oklch(1 0 0 / 7%)",
      text: "oklch(0.985 0.015 85)",
      mutedText: "oklch(0.86 0.02 85 / 85%)",
      buttonBackground: "oklch(0.72 0.2 12)",
      buttonText: "oklch(0.2 0.03 40)",
      accent: "oklch(0.7 0.14 250)",
    },
  },
  "mint-chip": {
    name: "Mint Chip",
    theme: {
      background:
        "radial-gradient(820px 540px at 14% 18%, oklch(0.9 0.09 150 / 55%), transparent 62%), radial-gradient(760px 520px at 90% 16%, oklch(0.9 0.06 250 / 50%), transparent 64%), linear-gradient(180deg, oklch(0.99 0.01 85), oklch(0.975 0.02 85))",
      cardBackground: "oklch(0.995 0.01 85 / 72%)",
      text: "oklch(0.2 0.03 40)",
      mutedText: "oklch(0.52 0.03 45)",
      buttonBackground: "oklch(0.78 0.14 150)",
      buttonText: "oklch(0.22 0.03 40)",
      accent: "oklch(0.63 0.23 12)",
    },
  },
  "blueberry-soda": {
    name: "Blueberry Soda",
    theme: {
      background:
        "radial-gradient(900px 560px at 18% 14%, oklch(0.74 0.14 250 / 45%), transparent 62%), radial-gradient(740px 520px at 82% 30%, oklch(0.76 0.15 70 / 28%), transparent 65%), linear-gradient(180deg, oklch(0.14 0.03 265), oklch(0.12 0.03 265))",
      cardBackground: "oklch(1 0 0 / 8%)",
      text: "oklch(0.985 0.015 85)",
      mutedText: "oklch(0.86 0.02 85 / 85%)",
      buttonBackground: "oklch(0.7 0.14 250)",
      buttonText: "oklch(0.985 0.015 85)",
      accent: "oklch(0.78 0.14 150)",
    },
  },
};
