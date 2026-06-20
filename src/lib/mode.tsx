import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Mode = "girl" | "boy";

type ModeContextValue = {
  mode: Mode;
  setMode: (m: Mode) => void;
  toggle: () => void;
};

const ModeContext = createContext<ModeContextValue | null>(null);

const STORAGE_KEY = "quiz-mode";

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>("girl");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Mode | null;
      if (saved === "girl" || saved === "boy") setModeState(saved);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("data-mode", mode);
  }, [mode]);

  const setMode = useCallback((m: Mode) => {
    setModeState(m);
    try {
      localStorage.setItem(STORAGE_KEY, m);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    setModeState((m) => {
      const next: Mode = m === "girl" ? "boy" : "girl";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const value = useMemo(() => ({ mode, setMode, toggle }), [mode, setMode, toggle]);

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}

export function useMode() {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error("useMode must be used within ModeProvider");
  return ctx;
}
