export const THEME_MODE_OPTIONS = [
  {
    label: "Light",
    value: "light",
  },
  {
    label: "Dark",
    value: "dark",
  },
] as const;

export const THEME_MODE_VALUES = THEME_MODE_OPTIONS.map((m) => m.value);

export type ThemeMode = (typeof THEME_MODE_VALUES)[number];

// --- generated:themePresets:start ---

export const THEME_PRESET_OPTIONS = [
  {
    label: "Default",
    value: "default",
    primary: {
      light: "oklch(0.205 0 0)",
      dark: "oklch(0.922 0 0)",
    },
  },
  {
    label: "Amethyst Haze",
    value: "amethyst-haze",
    primary: {
      light: "oklch(0.6104 0.0767 299.7335)",
      dark: "oklch(0.7058 0.0777 302.0489)",
    },
  },
  {
    label: "Claude",
    value: "claude",
    primary: {
      light: "oklch(0.6171 0.1375 39.0427)",
      dark: "oklch(0.6724 0.1308 38.7559)",
    },
  },
  {
    label: "Tangerine",
    value: "tangerine",
    primary: {
      light: "oklch(0.64 0.17 36.44)",
      dark: "oklch(0.64 0.17 36.44)",
    },
  },
  {
    label: "Twitter",
    value: "twitter",
    primary: {
      light: "oklch(0.6723 0.1606 244.9955)",
      dark: "oklch(0.6692 0.1607 245.0110)",
    },
  },
  {
    label: "Vercel",
    value: "vercel",
    primary: {
      light: "oklch(0 0 0)",
      dark: "oklch(1 0 0)",
    },
  },
] as const;

export const THEME_PRESET_VALUES = THEME_PRESET_OPTIONS.map((p) => p.value);

export type ThemePreset = (typeof THEME_PRESET_OPTIONS)[number]["value"];

// --- generated:themePresets:end ---
