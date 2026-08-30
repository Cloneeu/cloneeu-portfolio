"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "cloneeu:phosphor-color";

export interface PhosphorPreset {
  id: string;
  label: string;
  hex: string;
  description: string;
}

export interface PhosphorTheme extends PhosphorPreset {
  cssRgb: string;
  normalizedRgb: readonly [number, number, number];
}

export const PHOSPHOR_PRESETS: readonly PhosphorPreset[] = [
  {
    id: "green",
    label: "P1 GREEN",
    hex: "#7cff7a",
    description: "Classic high-persistence terminal phosphor.",
  },
  {
    id: "amber",
    label: "P3 AMBER",
    hex: "#ffb84d",
    description: "Warm monochrome display with low eye strain.",
  },
  {
    id: "cyan",
    label: "COLD CYAN",
    hex: "#74ddff",
    description: "Cool diagnostic monitor signal.",
  },
  {
    id: "paper",
    label: "PAPER WHITE",
    hex: "#e4f2d5",
    description: "Neutral monochrome phosphor simulation.",
  },
] as const;

const DEFAULT_THEME = createTheme(PHOSPHOR_PRESETS[0]);

interface TerminalPreferencesValue {
  phosphor: PhosphorTheme;
  selectPreset: (id: string) => void;
  setCustomColor: (hex: string) => void;
  resetPhosphor: () => void;
}

const TerminalPreferencesContext = createContext<TerminalPreferencesValue | null>(null);

export function TerminalPreferencesProvider({ children }: { children: ReactNode }) {
  const [phosphor, setPhosphor] = useState(readStoredTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--foreground", phosphor.hex);
    root.style.setProperty("--crt-phosphor", phosphor.hex);
    root.style.setProperty("--crt-phosphor-rgb", phosphor.cssRgb);
    root.dataset.phosphor = phosphor.id;

    try {
      window.localStorage.setItem(STORAGE_KEY, phosphor.hex);
    } catch {
      // The selected color still applies when storage is unavailable.
    }
  }, [phosphor]);

  const selectPreset = useCallback((id: string) => {
    const preset = PHOSPHOR_PRESETS.find((item) => item.id === id);

    if (preset) {
      setPhosphor(createTheme(preset));
    }
  }, []);

  const setCustomColor = useCallback((hex: string) => {
    if (!isHexColor(hex)) {
      return;
    }

    const normalizedHex = hex.toLowerCase();
    const matchingPreset = PHOSPHOR_PRESETS.find(
      (preset) => preset.hex.toLowerCase() === normalizedHex,
    );

    setPhosphor(
      createTheme(
        matchingPreset ?? {
          id: "custom",
          label: "CUSTOM SIGNAL",
          hex: normalizedHex,
          description: "User-calibrated phosphor signal.",
        },
      ),
    );
  }, []);

  const resetPhosphor = useCallback(() => {
    setPhosphor(DEFAULT_THEME);
  }, []);

  const value = useMemo(
    () => ({ phosphor, selectPreset, setCustomColor, resetPhosphor }),
    [phosphor, resetPhosphor, selectPreset, setCustomColor],
  );

  return (
    <TerminalPreferencesContext.Provider value={value}>
      {children}
    </TerminalPreferencesContext.Provider>
  );
}

export function useTerminalPreferences() {
  const context = useContext(TerminalPreferencesContext);

  if (!context) {
    throw new Error("useTerminalPreferences must be used inside TerminalPreferencesProvider");
  }

  return context;
}

function readStoredTheme() {
  if (typeof window === "undefined") {
    return DEFAULT_THEME;
  }

  try {
    const storedColor = window.localStorage.getItem(STORAGE_KEY)?.toLowerCase();

    if (storedColor && isHexColor(storedColor)) {
      const preset = PHOSPHOR_PRESETS.find(
        (item) => item.hex.toLowerCase() === storedColor,
      );

      return createTheme(
        preset ?? {
          id: "custom",
          label: "CUSTOM SIGNAL",
          hex: storedColor,
          description: "User-calibrated phosphor signal.",
        },
      );
    }
  } catch {
    // Fall through to the hardware default.
  }

  return DEFAULT_THEME;
}

function createTheme(preset: PhosphorPreset): PhosphorTheme {
  const [red, green, blue] = hexToRgb(preset.hex);

  return {
    ...preset,
    cssRgb: `${red}, ${green}, ${blue}`,
    normalizedRgb: [red / 255, green / 255, blue / 255],
  };
}

function hexToRgb(hex: string): readonly [number, number, number] {
  const color = hex.replace("#", "");

  return [
    Number.parseInt(color.slice(0, 2), 16),
    Number.parseInt(color.slice(2, 4), 16),
    Number.parseInt(color.slice(4, 6), 16),
  ];
}

function isHexColor(value: string) {
  return /^#[0-9a-f]{6}$/i.test(value);
}
