import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useMode } from "@/lib/mode";
import { ModeToggle } from "@/components/ModeToggle";
import { buildFeed, buildTypeFeed, type FeedCard, type QuizCard } from "@/lib/feed";
import {
  playAnimalSound,
  type MiniGameCardKind,
  type OddOneOutCard,
  type BiggerCard,
  type CountCard,
  type ColorHuntCard,
  type SequenceCard,
  type SoundMatchCard,
  type TrueFalseCard,
} from "@/lib/miniGames";

export const Route = createFileRoute("/play")({
  head: () => ({
    meta: [
      { title: "Just Play — QuestKid" },
      {
        name: "description",
        content:
          "Swipe through a never-ending stream of tiny questions, wow-facts and surprises. No scores. No pressure. Just play.",
      },
    ],
  }),
  validateSearch: (search: Record<string, unknown>) => ({
    type: typeof search.type === "string" ? (search.type as MiniGameCardKind) : undefined,
  }),
  component: PlayPage,
});

/* ---------------- tiny sound effects ---------------- */
let _ctx: AudioContext | null = null;
function getCtx() {
  if (typeof window === "undefined") return null;
  if (!_ctx) {
    try {
      _ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch {
      return null;
    }
  }
  if (_ctx?.state === "suspended") _ctx.resume().catch(() => {});
  return _ctx;
}
function tone(freq: number, duration = 0.15, type: OscillatorType = "sine", gain = 0.18) {
  const ctx = getCtx();
  if (!ctx) return;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.setValueAtTime(0, ctx.currentTime);
  g.gain.linearRampToValueAtTime(gain, ctx.currentTime + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
  o.connect(g).connect(ctx.destination);
  o.start();
  o.stop(ctx.currentTime + duration + 0.02);
}
function chime() {
  tone(880, 0.12, "triangle", 0.2);
  setTimeout(() => tone(1320, 0.18, "triangle", 0.18), 90);
}
function buzz() {
  tone(180, 0.18, "sawtooth", 0.12);
  setTimeout(() => tone(140, 0.22, "sawtooth", 0.1), 90);
}

/* ---------------- TTS ---------------- */
function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.95;
    u.pitch = 1.1;
    u.volume = 0.9;
    window.speechSynthesis.speak(u);
  } catch {
    /* ignore */
  }
}

/* ---------------- Page ---------------- */
function PlayPage() {
  const { mode } = useMode();
  const { type } = Route.useSearch();
  const isFiltered = !!type;

  const initialFeed = useMemo(() => {
    if (type) return buildTypeFeed(mode, type, 8);
    return buildFeed(mode);
  }, [mode, type]);

  const [feed, setFeed] = useState<FeedCard[]>(initialFeed);
  const [idx, setIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Rebuild feed when mode or type changes
  useEffect(() => {
    if (type) setFeed(buildTypeFeed(mode, type, 8));
    else setFeed(buildFeed(mode));
    setIdx(0);
  }, [mode, type]);

  // Append more cards as user nears the end (only for unfiltered)
  useEffect(() => {
    if (isFiltered) return;
    if (idx >= feed.length - 5) {
      setFeed((f) => [...f, ...buildFeed(mode, 20)]);
    }
  }, [idx, feed.length, mode, isFiltered]);

  function advance() {
    setIdx((i) => Math.min(i + 1, feed.length - 1));
  }
  function back() {
    setIdx((i) => Math.max(i - 1, 0));
  }

  // Keyboard
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        advance();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        back();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Touch swipe
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let startY = 0;
    let dy = 0;
    function ts(e: TouchEvent) {
      startY = e.touches[0]?.clientY ?? 0;
      dy = 0;
    }
    function tm(e: TouchEvent) {
      dy = (e.touches[0]?.clientY ?? 0) - startY;
    }
    function te() {
      if (dy < -50) advance();
      else if (dy > 50) back();
    }
    el.addEventListener("touchstart", ts, { passive: true });
    el.addEventListener("touchmove", tm, { passive: true });
    el.addEventListener("touchend", te);
    return () => {
      el.removeEventListener("touchstart", ts);
      el.removeEventListener("touchmove", tm);
      el.removeEventListener("touchend", te);
    };
  }, []);

  const card = feed[idx];

  return (
    <div className="relative h-screen overflow-hidden bg-background">
      {/* Top bar */}
      <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-4 py-4">
        <Link to="/" className="glass rounded-full px-3 py-2 text-xs font-bold">
          ← Home
        </Link>
        <div className="glass rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          {type
            ? `${mode === "girl" ? "✨" : "⚡"} ${type === "odd" ? "Odd one out" : type === "bigger" ? "Big or Small" : type === "count" ? "Counting Tap" : type === "color" ? "Color Hunt" : type === "sequence" ? "What's Next?" : type === "sound" ? "Match the Sound" : "True or False"}`
            : mode === "girl" ? "🌸 Sparkle stream" : "⚡ Quest stream"}
        </div>
        <ModeToggle />
      </header>

      {/* Stack viewport */}
      <div ref={containerRef} className="absolute inset-0">
        {card && (
          <CardView
            key={card.id}
            card={card}
            onAnswered={(ok) => {
              if (ok) chime();
              else buzz();
              window.setTimeout(advance, ok ? 900 : 1800);
            }}
            onWowDone={() => window.setTimeout(advance, 2800)}
          />
        )}
      </div>

      {/* Side controls */}
      <div className="absolute bottom-6 right-4 z-30 flex flex-col gap-3">
        <button
          onClick={back}
          className="glass grid h-12 w-12 place-items-center rounded-full text-lg font-bold"
          aria-label="Previous"
        >
          ↑
        </button>
        <button
          onClick={advance}
          className="glow grid h-12 w-12 place-items-center rounded-full bg-primary text-lg font-bold text-primary-foreground"
          aria-label="Next"
        >
          ↓
        </button>
      </div>

      {/* Hint */}
      {idx === 0 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-24 z-20 text-center">
          <div className="glass mx-auto inline-block rounded-full px-4 py-2 text-xs font-bold text-muted-foreground">
            Swipe up · or press ↓ for next
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- Card dispatch ---------------- */
function CardView({
  card,
  onAnswered,
  onWowDone,
}: {
  card: FeedCard;
  onAnswered: (ok: boolean) => void;
  onWowDone: () => void;
}) {
  useEffect(() => {
    let speakText = "";
    if (card.kind === "quiz") speakText = card.question.prompt || card.question.visual;
    else if (card.kind === "wow") speakText = card.fact;
    else if (card.kind === "tf") speakText = card.statement;
    else if ("prompt" in card) speakText = card.prompt;
    if (speakText) speak(speakText);
    if (card.kind === "wow") onWowDone();
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card.id]);

  if (card.kind === "wow") {
    return (
      <div className="relative h-full w-full animate-[fadeIn_0.4s_ease]">
        <img src={card.cover} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/80" />
        <div className="relative flex h-full flex-col items-center justify-center px-8 text-center">
          <div className="glass mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-white">
            ✦ {card.title}
          </div>
          <p className="heading max-w-2xl text-3xl font-extrabold leading-tight text-white drop-shadow-lg sm:text-5xl">
            {card.fact}
          </p>
          <div className="mt-8 text-sm text-white/70">Swipe up for the next surprise ↓</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full animate-[fadeIn_0.4s_ease]">
      <img src={card.cover} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background/95 backdrop-blur-sm" />
      <div className="relative flex h-full flex-col items-center justify-center px-6 pt-20 pb-32">
        <div className="glass mb-4 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          {card.topic}
        </div>
        {card.kind === "quiz" && <QuizBody card={card} onAnswered={onAnswered} />}
        {card.kind === "odd" && <OddBody card={card} onAnswered={onAnswered} />}
        {card.kind === "bigger" && <BiggerBody card={card} onAnswered={onAnswered} />}
        {card.kind === "count" && <CountBody card={card} onAnswered={onAnswered} />}
        {card.kind === "color" && <ColorBody card={card} onAnswered={onAnswered} />}
        {card.kind === "sequence" && <SequenceBody card={card} onAnswered={onAnswered} />}
        {card.kind === "sound" && <SoundBody card={card} onAnswered={onAnswered} />}
        {card.kind === "tf" && <TFBody card={card} onAnswered={onAnswered} />}
      </div>
    </div>
  );
}

/* ---------------- Shared fact line ---------------- */
function FactLine({ ok, fact, correctText }: { ok: boolean; fact?: string; correctText?: string }) {
  return (
    <div className="glass mt-5 max-w-md rounded-2xl px-4 py-3 text-center text-sm font-semibold">
      {ok ? (
        <span className="text-[color:var(--color-success)]">✓ Yes! </span>
      ) : (
        <span className="text-[color:var(--color-destructive)]">
          {correctText ? <>Answer: <span className="text-foreground">{correctText}</span>{" "}</> : "Nope! "}
        </span>
      )}
      {fact && <span className="text-muted-foreground">💡 {fact}</span>}
    </div>
  );
}

/* ---------------- Bodies ---------------- */

function QuizBody({ card, onAnswered }: { card: QuizCard; onAnswered: (ok: boolean) => void }) {
  const q = card.question;
  const [picked, setPicked] = useState<number | null>(null);
  const isBigEmoji = /\p{Emoji}/u.test(q.visual ?? "") && (q.visual?.length ?? 0) <= 6;
  function pick(i: number) {
    if (picked !== null) return;
    setPicked(i);
    onAnswered(i === q.answer);
  }
  return (
    <>
      <div className={`heading text-center font-extrabold leading-none drop-shadow ${isBigEmoji ? "text-[7rem] sm:text-[10rem]" : "text-4xl sm:text-6xl"}`}>
        {q.visual}
      </div>
      <p className="mt-4 max-w-xl text-center text-lg font-semibold text-foreground/80">
        {q.prompt}
        <button onClick={() => speak(q.prompt || q.visual)} className="ml-2 align-middle text-base opacity-70 hover:opacity-100" aria-label="Read aloud">🔊</button>
      </p>
      <div className="mt-6 grid w-full max-w-md gap-3 sm:grid-cols-2">
        {q.options.map((opt: string, i: number) => {
          const showState = picked !== null;
          const isCorrect = i === q.answer;
          const isPicked = picked === i;
          let cls = "glass rounded-2xl px-5 py-4 text-left font-bold transition-all hover:-translate-y-0.5";
          if (showState && isCorrect) cls += " ring-2 ring-[var(--color-success)] !bg-[color:var(--color-success)]/20";
          else if (showState && isPicked && !isCorrect) cls += " ring-2 ring-[var(--color-destructive)] !bg-[color:var(--color-destructive)]/20";
          else if (showState) cls += " opacity-50";
          return (
            <button key={i} onClick={() => pick(i)} disabled={showState} className={cls}>
              <span className="mr-2 inline-grid h-7 w-7 place-items-center rounded-full bg-primary text-xs text-primary-foreground">{String.fromCharCode(65 + i)}</span>
              {opt}
            </button>
          );
        })}
      </div>
      {picked !== null && <FactLine ok={picked === q.answer} fact={q.fact} correctText={q.options[q.answer]} />}
    </>
  );
}

function OddBody({ card, onAnswered }: { card: OddOneOutCard; onAnswered: (ok: boolean) => void }) {
  const [picked, setPicked] = useState<number | null>(null);
  function pick(i: number) {
    if (picked !== null) return;
    setPicked(i);
    onAnswered(i === card.answer);
  }
  return (
    <>
      <p className="heading max-w-xl text-center text-2xl font-extrabold text-foreground sm:text-3xl">{card.prompt}</p>
      <div className="mt-8 grid w-full max-w-md grid-cols-2 gap-4">
        {card.items.map((it, i) => {
          const showState = picked !== null;
          const isCorrect = i === card.answer;
          const isPicked = picked === i;
          let cls = "glass grid aspect-square place-items-center rounded-3xl text-6xl transition-all hover:-translate-y-1 sm:text-7xl";
          if (showState && isCorrect) cls += " ring-4 ring-[var(--color-success)] !bg-[color:var(--color-success)]/20";
          else if (showState && isPicked && !isCorrect) cls += " ring-4 ring-[var(--color-destructive)] !bg-[color:var(--color-destructive)]/20";
          else if (showState) cls += " opacity-40";
          return <button key={i} onClick={() => pick(i)} disabled={showState} className={cls}>{it}</button>;
        })}
      </div>
      {picked !== null && <FactLine ok={picked === card.answer} fact={card.fact} correctText={card.items[card.answer]} />}
    </>
  );
}

function BiggerBody({ card, onAnswered }: { card: BiggerCard; onAnswered: (ok: boolean) => void }) {
  const [picked, setPicked] = useState<"left" | "right" | null>(null);
  const correct: "left" | "right" = card.mode === "bigger"
    ? (card.left.size > card.right.size ? "left" : "right")
    : (card.left.size < card.right.size ? "left" : "right");
  function pick(side: "left" | "right") {
    if (picked) return;
    setPicked(side);
    onAnswered(side === correct);
  }
  const cell = (side: "left" | "right", item: BiggerCard["left"]) => {
    const showState = picked !== null;
    const isCorrect = side === correct;
    const isPicked = picked === side;
    let cls = "glass flex flex-1 flex-col items-center justify-center gap-3 rounded-3xl p-6 text-center transition-all hover:-translate-y-1";
    if (showState && isCorrect) cls += " ring-4 ring-[var(--color-success)] !bg-[color:var(--color-success)]/20";
    else if (showState && isPicked && !isCorrect) cls += " ring-4 ring-[var(--color-destructive)] !bg-[color:var(--color-destructive)]/20";
    else if (showState) cls += " opacity-40";
    return (
      <button key={side} onClick={() => pick(side)} disabled={showState} className={cls}>
        <div className="text-7xl sm:text-8xl">{item.emoji}</div>
        <div className="text-sm font-bold text-foreground/80">{item.label}</div>
      </button>
    );
  };
  return (
    <>
      <p className="heading max-w-xl text-center text-2xl font-extrabold text-foreground sm:text-3xl">{card.prompt}</p>
      <div className="mt-6 flex w-full max-w-lg gap-4">{cell("left", card.left)}{cell("right", card.right)}</div>
      {picked !== null && <FactLine ok={picked === correct} fact={card.fact} correctText={(correct === "left" ? card.left : card.right).label} />}
    </>
  );
}

function CountBody({ card, onAnswered }: { card: CountCard; onAnswered: (ok: boolean) => void }) {
  const grid = useMemo<string[]>(() => {
    const total = 12;
    const cells: string[] = [];
    for (let i = 0; i < card.count; i++) cells.push(card.target);
    while (cells.length < total) cells.push(card.decoys[cells.length % card.decoys.length] ?? "✨");
    const a = [...cells];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }, [card.id, card.target, card.decoys, card.count]);
  const [tapped, setTapped] = useState<Set<number>>(new Set());
  const [done, setDone] = useState(false);
  function tap(i: number) {
    if (done) return;
    const item = grid[i];
    if (item !== card.target) {
      setDone(true);
      onAnswered(false);
      return;
    }
    if (tapped.has(i)) return;
    const next = new Set(tapped);
    next.add(i);
    setTapped(next);
    const correctTaps = [...next].filter((x) => grid[x] === card.target).length;
    if (correctTaps >= card.count) {
      setDone(true);
      onAnswered(true);
    }
  }
  return (
    <>
      <p className="heading max-w-xl text-center text-2xl font-extrabold text-foreground sm:text-3xl">{card.prompt}</p>
      <div className="mt-6 grid w-full max-w-md grid-cols-4 gap-2">
        {grid.map((it, i) => {
          const isTapped = tapped.has(i);
          let cls = "glass grid aspect-square place-items-center rounded-2xl text-3xl transition-all sm:text-4xl";
          if (isTapped) cls += " ring-2 ring-[var(--color-success)] !bg-[color:var(--color-success)]/30 scale-90";
          return <button key={i} onClick={() => tap(i)} disabled={done} className={cls}>{it}</button>;
        })}
      </div>
      <div className="mt-4 text-sm font-bold text-foreground/70">{[...tapped].filter((x) => grid[x] === card.target).length} / {card.count}</div>
      {done && <FactLine ok={[...tapped].filter((x) => grid[x] === card.target).length >= card.count} fact={card.fact} />}
    </>
  );
}

function ColorBody({ card, onAnswered }: { card: ColorHuntCard; onAnswered: (ok: boolean) => void }) {
  const targetCount = card.items.filter((x) => x.color === card.color).length;
  const [tapped, setTapped] = useState<Set<number>>(new Set());
  const [done, setDone] = useState(false);
  function tap(i: number) {
    if (done) return;
    const item = card.items[i];
    if (item.color !== card.color) {
      setDone(true);
      onAnswered(false);
      return;
    }
    if (tapped.has(i)) return;
    const next = new Set(tapped);
    next.add(i);
    setTapped(next);
    if (next.size >= targetCount) {
      setDone(true);
      onAnswered(true);
    }
  }
  return (
    <>
      <p className="heading max-w-xl text-center text-2xl font-extrabold text-foreground sm:text-3xl">
        Tap everything <span style={{ color: card.color }}>{card.colorName.toUpperCase()}</span>
      </p>
      <div className="mt-6 grid w-full max-w-md grid-cols-4 gap-2">
        {card.items.map((it, i) => {
          const isTapped = tapped.has(i);
          let cls = "grid aspect-square place-items-center rounded-2xl text-3xl transition-all sm:text-4xl";
          cls += isTapped ? " ring-4 ring-[var(--color-success)] scale-90" : " glass hover:-translate-y-0.5";
          return (
            <button key={i} onClick={() => tap(i)} disabled={done} className={cls} style={isTapped ? { background: it.color + "55" } : undefined}>
              {it.emoji}
            </button>
          );
        })}
      </div>
      {done && <FactLine ok={tapped.size >= targetCount} fact={card.fact} />}
    </>
  );
}

function SequenceBody({ card, onAnswered }: { card: SequenceCard; onAnswered: (ok: boolean) => void }) {
  const [picked, setPicked] = useState<number | null>(null);
  function pick(i: number) {
    if (picked !== null) return;
    setPicked(i);
    onAnswered(i === card.answer);
  }
  return (
    <>
      <p className="heading max-w-xl text-center text-2xl font-extrabold text-foreground sm:text-3xl">{card.prompt}</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {card.sequence.map((s, i) => (
          <div key={i} className={`glass grid h-16 w-16 place-items-center rounded-2xl text-3xl font-extrabold ${s === "?" ? "!bg-primary/20 ring-2 ring-primary text-primary" : ""}`}>{s}</div>
        ))}
      </div>
      <div className="mt-8 flex gap-3">
        {card.options.map((opt, i) => {
          const showState = picked !== null;
          const isCorrect = i === card.answer;
          const isPicked = picked === i;
          let cls = "glass grid h-16 w-16 place-items-center rounded-2xl text-3xl font-extrabold transition-all hover:-translate-y-1";
          if (showState && isCorrect) cls += " ring-4 ring-[var(--color-success)] !bg-[color:var(--color-success)]/20";
          else if (showState && isPicked && !isCorrect) cls += " ring-4 ring-[var(--color-destructive)] !bg-[color:var(--color-destructive)]/20";
          else if (showState) cls += " opacity-40";
          return <button key={i} onClick={() => pick(i)} disabled={showState} className={cls}>{opt}</button>;
        })}
      </div>
      {picked !== null && <FactLine ok={picked === card.answer} fact={card.fact} correctText={card.options[card.answer]} />}
    </>
  );
}

function SoundBody({ card, onAnswered }: { card: SoundMatchCard; onAnswered: (ok: boolean) => void }) {
  const [picked, setPicked] = useState<number | null>(null);
  useEffect(() => {
    const t = window.setTimeout(() => playAnimalSound(card.sound), 350);
    return () => window.clearTimeout(t);
  }, [card.id, card.sound]);
  function pick(i: number) {
    if (picked !== null) return;
    setPicked(i);
    onAnswered(i === card.answer);
  }
  return (
    <>
      <p className="heading max-w-xl text-center text-2xl font-extrabold text-foreground sm:text-3xl">{card.prompt}</p>
      <button
        onClick={() => playAnimalSound(card.sound)}
        className="glow mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-base font-extrabold text-primary-foreground"
      >
        🔊 Hear it again
      </button>
      <div className="mt-6 grid w-full max-w-md grid-cols-2 gap-4">
        {card.options.map((opt, i) => {
          const showState = picked !== null;
          const isCorrect = i === card.answer;
          const isPicked = picked === i;
          let cls = "glass flex aspect-square flex-col items-center justify-center gap-2 rounded-3xl text-6xl transition-all hover:-translate-y-1";
          if (showState && isCorrect) cls += " ring-4 ring-[var(--color-success)] !bg-[color:var(--color-success)]/20";
          else if (showState && isPicked && !isCorrect) cls += " ring-4 ring-[var(--color-destructive)] !bg-[color:var(--color-destructive)]/20";
          else if (showState) cls += " opacity-40";
          return (
            <button key={i} onClick={() => pick(i)} disabled={showState} className={cls}>
              <span>{opt.emoji}</span>
              <span className="text-sm font-bold text-foreground/80">{opt.label}</span>
            </button>
          );
        })}
      </div>
      {picked !== null && <FactLine ok={picked === card.answer} fact={card.fact} correctText={card.options[card.answer].label} />}
    </>
  );
}

function TFBody({ card, onAnswered }: { card: TrueFalseCard; onAnswered: (ok: boolean) => void }) {
  const [picked, setPicked] = useState<boolean | null>(null);
  function pick(v: boolean) {
    if (picked !== null) return;
    setPicked(v);
    onAnswered(v === card.answer);
  }
  const btn = (val: boolean, label: string, emoji: string) => {
    const showState = picked !== null;
    const isCorrect = val === card.answer;
    const isPicked = picked === val;
    let cls = "glass flex flex-1 flex-col items-center justify-center gap-2 rounded-3xl py-8 text-2xl font-extrabold transition-all hover:-translate-y-1";
    if (showState && isCorrect) cls += " ring-4 ring-[var(--color-success)] !bg-[color:var(--color-success)]/20";
    else if (showState && isPicked && !isCorrect) cls += " ring-4 ring-[var(--color-destructive)] !bg-[color:var(--color-destructive)]/20";
    else if (showState) cls += " opacity-40";
    return (
      <button key={label} onClick={() => pick(val)} disabled={showState} className={cls}>
        <span className="text-5xl">{emoji}</span>
        <span>{label}</span>
      </button>
    );
  };
  return (
    <>
      <p className="heading max-w-xl text-center text-2xl font-extrabold text-foreground sm:text-3xl">{card.statement}</p>
      <div className="mt-8 flex w-full max-w-md gap-4">{btn(true, "TRUE", "✅")}{btn(false, "FALSE", "❌")}</div>
      {picked !== null && <FactLine ok={picked === card.answer} fact={card.fact} correctText={card.answer ? "TRUE" : "FALSE"} />}
    </>
  );
}

