import { useMode } from "@/lib/mode";

export function ModeToggle() {
  const { mode, setMode } = useMode();
  const isGirl = mode === "girl";

  return (
    <div className="glass inline-flex items-center gap-1 rounded-full p-1 text-sm font-semibold">
      <button
        onClick={() => setMode("girl")}
        aria-pressed={isGirl}
        className={`flex items-center gap-2 rounded-full px-4 py-2 transition-all ${
          isGirl
            ? "bg-primary text-primary-foreground shadow-lg"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <span aria-hidden>🌸</span> Girl
      </button>
      <button
        onClick={() => setMode("boy")}
        aria-pressed={!isGirl}
        className={`flex items-center gap-2 rounded-full px-4 py-2 transition-all ${
          !isGirl
            ? "bg-primary text-primary-foreground shadow-lg"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <span aria-hidden>⚡</span> Boy
      </button>
    </div>
  );
}
