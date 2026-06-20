import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import princessHero from "@/assets/princess-hero.jpg";
import coverPrincess from "@/assets/cover-princess.jpg";
import modeMcq from "@/assets/pmode-mcq.jpg";
import modeFill from "@/assets/pmode-fill.jpg";
import modeFlash from "@/assets/pmode-flash.jpg";
import modeTf from "@/assets/pmode-tf.jpg";
import modeMatch from "@/assets/pmode-match.jpg";
import modeRapid from "@/assets/pmode-rapid.jpg";
import modeQuotes from "@/assets/pmode-quotes.jpg";
import modeCodex from "@/assets/pmode-codex.jpg";
import {
  MCQS,
  FILLS,
  FLASHES,
  TFS,
  PAIRS,
  QUOTES,
  PRINCESSES,
  KINGDOMS,
  TALES,
} from "@/lib/princesses";

export const Route = createFileRoute("/arena/princesses")({
  head: () => ({
    meta: [
      { title: "Princess Arena — 8 game modes of fairy-tale trivia" },
      {
        name: "description",
        content:
          "Classic fairy-tale princess trivia across 8 game modes: MCQ, Fill in the Blanks, Flash Cards, True or False, Princess Match, Rapid Fire, Who Said It, and the Royal Codex.",
      },
      { property: "og:title", content: "Princess Arena — QuestKid" },
      {
        property: "og:description",
        content: "Eight different ways to test your fairy-tale princess knowledge.",
      },
      { property: "og:image", content: princessHero },
    ],
  }),
  component: Arena,
});

type ModeId = "mcq" | "fill" | "flash" | "tf" | "match" | "rapid" | "quotes" | "codex";

const MODES: {
  id: ModeId;
  label: string;
  tagline: string;
  image: string;
  realm: string;
  difficulty: "Easy" | "Medium" | "Hard";
  minutes: number;
  accent: string;
}[] = [
  { id: "mcq", label: "Royal Trivia", tagline: "Classic 4-option fairy-tale quiz with fun facts.", image: modeMcq, realm: "Castle", difficulty: "Easy", minutes: 5, accent: "from-rose-400 to-pink-500" },
  { id: "fill", label: "Fill the Spellbook", tagline: "Type the missing word from the fairy tale.", image: modeFill, realm: "Library", difficulty: "Medium", minutes: 4, accent: "from-amber-400 to-rose-500" },
  { id: "flash", label: "Flash Cards", tagline: "Flip princess cards. Mark known vs review.", image: modeFlash, realm: "Ballroom", difficulty: "Easy", minutes: 3, accent: "from-pink-300 to-fuchsia-500" },
  { id: "tf", label: "True or False", tagline: "Spot the real tale vs the made-up myth.", image: modeTf, realm: "Throne", difficulty: "Medium", minutes: 4, accent: "from-fuchsia-400 to-purple-500" },
  { id: "match", label: "Princess Match", tagline: "Pair every princess with her signature thing.", image: modeMatch, realm: "Garden", difficulty: "Medium", minutes: 3, accent: "from-rose-300 to-amber-400" },
  { id: "rapid", label: "Rapid Carriage", tagline: "10 seconds per question. Before the clock strikes!", image: modeRapid, realm: "Sunset", difficulty: "Hard", minutes: 2, accent: "from-pink-500 to-rose-600" },
  { id: "quotes", label: "Who Said It?", tagline: "Match the famous line to the right princess.", image: modeQuotes, realm: "Ball", difficulty: "Hard", minutes: 4, accent: "from-violet-400 to-fuchsia-500" },
  { id: "codex", label: "Royal Codex", tagline: "Browse every princess, kingdom & tale.", image: modeCodex, realm: "Storybook", difficulty: "Easy", minutes: 5, accent: "from-purple-400 to-pink-500" },
];

function Arena() {
  const [active, setActive] = useState<ModeId | null>(null);

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link to="/" className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold">
          ← Back to quests
        </Link>
        <span className="heading text-sm uppercase tracking-widest text-muted-foreground">
          Princesses · Arena
        </span>
      </header>

      {/* HERO */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 pt-2 pb-12 md:grid-cols-2">
        <div>
          <div className="glass mb-5 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> 10 princesses · 10 tales · 8 modes
          </div>
          <h1 className="heading text-5xl font-extrabold sm:text-6xl">
            Welcome to the
            <br />
            <span className="bg-gradient-to-r from-rose-400 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
              Princess Arena.
            </span>
          </h1>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground">
            Real fairy-tale trivia from Perrault, the Grimm brothers, Andersen and
            beyond — pick a game mode below. Same princesses, eight different ways
            to play.
          </p>
          <div className="mt-8 flex gap-6 text-sm text-muted-foreground">
            <Stat n={MCQS.length + FILLS.length + TFS.length + QUOTES.length} label="real questions" />
            <Stat n={PRINCESSES.length} label="princesses" />
            <Stat n={MODES.length} label="game modes" />
          </div>
        </div>
        <div className="relative">
          <div className="glass overflow-hidden rounded-[2rem] p-2">
            <img
              src={princessHero}
              alt="A gathering of fairy-tale princesses in a magical castle garden at twilight"
              width={1536}
              height={1024}
              className="aspect-[3/2] w-full rounded-[1.75rem] object-cover"
            />
          </div>
          <div className="glass glow absolute -bottom-6 -left-6 max-w-[260px] rounded-2xl p-4 text-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Tonight
            </div>
            <div className="heading mt-1 font-bold">Rapid Carriage 🏰</div>
            <div className="mt-1 text-xs text-muted-foreground">Before midnight strikes →</div>
          </div>
        </div>
      </section>

      {/* MODES GRID */}
      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="heading text-3xl font-extrabold sm:text-4xl">Pick your fairy tale</h2>
            <p className="mt-1 text-muted-foreground">
              {MODES.length} modes. Same princesses, fresh angle every time.
            </p>
          </div>
          <span className="hidden text-xs uppercase tracking-widest text-muted-foreground md:inline">
            ✦ tap any card to play
          </span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => setActive(m.id)}
              className="glass group relative flex flex-col overflow-hidden rounded-3xl text-left transition-transform hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src={m.image}
                  alt={`${m.label} — ${m.realm}`}
                  loading="lazy"
                  width={768}
                  height={576}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${m.accent} opacity-20 mix-blend-overlay`}
                />
                <span className="absolute left-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                  {m.realm}
                </span>
              </div>
              <div className="relative flex flex-1 flex-col p-5">
                <div className="heading text-lg font-extrabold">{m.label}</div>
                <p className="mt-1 text-sm text-muted-foreground">{m.tagline}</p>
                <div className="mt-4 flex items-center gap-2 text-xs">
                  <span
                    className={`rounded-full px-2 py-0.5 font-bold ${
                      m.difficulty === "Easy"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : m.difficulty === "Medium"
                          ? "bg-amber-500/20 text-amber-300"
                          : "bg-rose-500/20 text-rose-300"
                    }`}
                  >
                    {m.difficulty}
                  </span>
                  <span className="text-muted-foreground">⏱ {m.minutes} min</span>
                  <span className="ml-auto rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-primary-foreground">
                    Start ▸
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {active && <ModeRunner mode={active} onClose={() => setActive(null)} />}
    </div>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div>
      <div className="heading text-2xl font-bold text-foreground">{n}</div>
      {label}
    </div>
  );
}

/* ============================================================
   MODE RUNNER (overlay)
   ============================================================ */
function ModeRunner({ mode, onClose }: { mode: ModeId; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-3xl px-6 py-8">
        <div className="mb-4 flex items-center justify-between">
          <div className="heading text-sm uppercase tracking-widest text-muted-foreground">
            {MODES.find((m) => m.id === mode)?.label}
          </div>
          <button
            onClick={onClose}
            className="glass rounded-full px-4 py-2 text-sm font-bold hover:bg-primary hover:text-primary-foreground"
          >
            ✕ Close
          </button>
        </div>

        <div className="glass overflow-hidden rounded-3xl p-6">
          {mode === "mcq" && <McqMode />}
          {mode === "fill" && <FillMode />}
          {mode === "flash" && <FlashMode />}
          {mode === "tf" && <TfMode />}
          {mode === "match" && <MatchMode />}
          {mode === "rapid" && <RapidMode />}
          {mode === "quotes" && <QuotesMode />}
          {mode === "codex" && <CodexMode />}
        </div>
      </div>
    </div>
  );
}

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ============ MCQ ============ */
function McqMode() {
  const deck = useMemo(() => shuffle(MCQS).slice(0, 10), []);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const q = deck[i];
  const done = i >= deck.length;
  if (done) return <Finish score={score} total={deck.length} />;

  return (
    <div>
      <ProgressBar i={i} total={deck.length} />
      <div className="mt-5 text-center">
        <div className="text-5xl">👑</div>
        <h3 className="heading mt-3 text-2xl font-extrabold">{q.q}</h3>
      </div>
      <div className="mt-6 grid gap-3">
        {q.options.map((opt, idx) => {
          const isCorrect = picked !== null && idx === q.answer;
          const isWrong = picked === idx && idx !== q.answer;
          return (
            <button
              key={idx}
              disabled={picked !== null}
              onClick={() => {
                setPicked(idx);
                if (idx === q.answer) setScore((s) => s + 1);
              }}
              className={`glass w-full rounded-2xl px-4 py-3 text-left font-semibold transition ${
                isCorrect ? "bg-emerald-500/30" : isWrong ? "bg-rose-500/30" : "hover:bg-primary/20"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className="mt-4 rounded-2xl bg-primary/10 p-4 text-sm">
          {q.fact ?? (picked === q.answer ? "Sparkly! That's canon." : "Almost! Re-read the tale.")}
          <button
            onClick={() => {
              setI((n) => n + 1);
              setPicked(null);
            }}
            className="glow ml-3 inline-flex rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground"
          >
            Next ▸
          </button>
        </div>
      )}
    </div>
  );
}

/* ============ Fill in the Blanks ============ */
function FillMode() {
  const deck = useMemo(() => shuffle(FILLS).slice(0, 8), []);
  const [i, setI] = useState(0);
  const [val, setVal] = useState("");
  const [judged, setJudged] = useState<null | boolean>(null);
  const [score, setScore] = useState(0);
  const q = deck[i];
  const done = i >= deck.length;
  if (done) return <Finish score={score} total={deck.length} />;

  const submit = () => {
    const ok = val.trim().toLowerCase() === q.answer.toLowerCase();
    setJudged(ok);
    if (ok) setScore((s) => s + 1);
  };

  return (
    <div>
      <ProgressBar i={i} total={deck.length} />
      <div className="mt-5 text-center text-5xl">🪶</div>
      <h3 className="heading mt-3 text-center text-xl font-extrabold leading-snug">
        {q.sentence.split("____").map((p, idx, arr) => (
          <span key={idx}>
            {p}
            {idx < arr.length - 1 && <span className="mx-1 underline decoration-dotted">____</span>}
          </span>
        ))}
      </h3>
      {q.hint && <p className="mt-2 text-center text-xs text-muted-foreground">Hint: {q.hint}</p>}

      <div className="mt-6 flex gap-2">
        <input
          autoFocus
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && judged === null && submit()}
          disabled={judged !== null}
          placeholder="type your answer…"
          className="glass flex-1 rounded-2xl px-4 py-3 text-base font-semibold outline-none"
        />
        {judged === null ? (
          <button onClick={submit} className="glow rounded-2xl bg-primary px-5 py-3 font-bold text-primary-foreground">
            Check
          </button>
        ) : (
          <button
            onClick={() => {
              setI((n) => n + 1);
              setVal("");
              setJudged(null);
            }}
            className="glow rounded-2xl bg-primary px-5 py-3 font-bold text-primary-foreground"
          >
            Next ▸
          </button>
        )}
      </div>
      {judged !== null && (
        <div className={`mt-4 rounded-2xl p-4 text-sm ${judged ? "bg-emerald-500/20" : "bg-rose-500/20"}`}>
          {judged ? "✅ Correct!" : `❌ Answer: ${q.answer}`}
        </div>
      )}
    </div>
  );
}

/* ============ Flash Cards ============ */
function FlashMode() {
  const deck = useMemo(() => shuffle(FLASHES), []);
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);
  const card = deck[i];
  const done = i >= deck.length;
  if (done) return <Finish score={known} total={deck.length} label="known" />;

  return (
    <div>
      <ProgressBar i={i} total={deck.length} />
      <div
        onClick={() => setFlipped((f) => !f)}
        className="mt-6 grid min-h-[260px] cursor-pointer place-items-center rounded-3xl bg-gradient-to-br from-rose-400/20 via-pink-400/20 to-fuchsia-500/20 p-8 text-center transition hover:scale-[1.01]"
      >
        {!flipped ? (
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Front · tap to flip</div>
            <div className="heading mt-3 text-3xl font-extrabold">{card.front}</div>
          </div>
        ) : (
          <div className="whitespace-pre-line text-base leading-relaxed text-foreground/90">{card.back}</div>
        )}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          onClick={() => {
            setI((n) => n + 1);
            setFlipped(false);
          }}
          className="glass rounded-2xl px-4 py-3 font-bold hover:bg-rose-500/20"
        >
          📌 Review later
        </button>
        <button
          onClick={() => {
            setKnown((k) => k + 1);
            setI((n) => n + 1);
            setFlipped(false);
          }}
          className="glow rounded-2xl bg-primary px-4 py-3 font-bold text-primary-foreground"
        >
          ✅ I know this
        </button>
      </div>
    </div>
  );
}

/* ============ True / False ============ */
function TfMode() {
  const deck = useMemo(() => shuffle(TFS).slice(0, 10), []);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const q = deck[i];
  const done = i >= deck.length;
  if (done) return <Finish score={score} total={deck.length} />;

  const choose = (val: boolean) => {
    setPicked(val);
    if (val === q.isTrue) setScore((s) => s + 1);
  };

  return (
    <div>
      <ProgressBar i={i} total={deck.length} />
      <div className="mt-5 text-center text-5xl">⚖️</div>
      <p className="heading mt-3 text-center text-2xl font-extrabold leading-snug">{q.statement}</p>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          onClick={() => picked === null && choose(true)}
          disabled={picked !== null}
          className={`rounded-2xl px-6 py-5 font-extrabold transition ${
            picked === null
              ? "glass hover:bg-emerald-500/30"
              : q.isTrue
                ? "bg-emerald-500/40"
                : picked === true
                  ? "bg-rose-500/40"
                  : "glass opacity-50"
          }`}
        >
          ✅ True
        </button>
        <button
          onClick={() => picked === null && choose(false)}
          disabled={picked !== null}
          className={`rounded-2xl px-6 py-5 font-extrabold transition ${
            picked === null
              ? "glass hover:bg-rose-500/30"
              : !q.isTrue
                ? "bg-emerald-500/40"
                : picked === false
                  ? "bg-rose-500/40"
                  : "glass opacity-50"
          }`}
        >
          ❌ False
        </button>
      </div>
      {picked !== null && (
        <div className="mt-4 rounded-2xl bg-primary/10 p-4 text-sm">
          {q.fact}
          <button
            onClick={() => {
              setI((n) => n + 1);
              setPicked(null);
            }}
            className="glow ml-3 inline-flex rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground"
          >
            Next ▸
          </button>
        </div>
      )}
    </div>
  );
}

/* ============ Princess Match ============ */
function MatchMode() {
  const deck = useMemo(() => shuffle(PAIRS), []);
  const princesses = useMemo(() => deck.map((p) => p.princess), [deck]);
  const items = useMemo(() => shuffle(deck.map((p) => p.item)), [deck]);
  const [selected, setSelected] = useState<string | null>(null);
  const [matched, setMatched] = useState<Record<string, string>>({});
  const [wrongBuzz, setWrongBuzz] = useState<string | null>(null);

  const done = Object.keys(matched).length === deck.length;

  const tryMatch = (item: string) => {
    if (!selected) return;
    const correct = deck.find((p) => p.princess === selected)?.item === item;
    if (correct) {
      setMatched((m) => ({ ...m, [selected]: item }));
      setSelected(null);
    } else {
      setWrongBuzz(item);
      setTimeout(() => setWrongBuzz(null), 400);
    }
  };

  if (done) return <Finish score={deck.length} total={deck.length} label="matched" />;

  return (
    <div>
      <p className="text-center text-sm text-muted-foreground">
        Tap a princess, then tap her signature item.
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {princesses.map((t) => {
            const isMatched = matched[t];
            const isSelected = selected === t;
            return (
              <button
                key={t}
                disabled={!!isMatched}
                onClick={() => setSelected(t)}
                className={`w-full rounded-2xl px-3 py-3 text-left font-bold transition ${
                  isMatched
                    ? "bg-emerald-500/30 opacity-70"
                    : isSelected
                      ? "bg-primary text-primary-foreground"
                      : "glass hover:bg-primary/20"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
        <div className="space-y-2">
          {items.map((a) => {
            const matchedP = Object.entries(matched).find(([, ab]) => ab === a)?.[0];
            const isWrong = wrongBuzz === a;
            return (
              <button
                key={a}
                disabled={!!matchedP}
                onClick={() => tryMatch(a)}
                className={`w-full rounded-2xl px-3 py-3 text-left text-sm font-semibold transition ${
                  matchedP
                    ? "bg-emerald-500/30 opacity-70"
                    : isWrong
                      ? "animate-pulse bg-rose-500/40"
                      : "glass hover:bg-primary/20"
                }`}
              >
                {a}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ============ Rapid Fire ============ */
function RapidMode() {
  const deck = useMemo(() => shuffle(MCQS).slice(0, 12), []);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const done = i >= deck.length;

  useEffect(() => {
    if (done) return;
    setTimeLeft(10);
    timer.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer.current!);
          setI((n) => n + 1);
          return 10;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [i, done]);

  if (done) return <Finish score={score} total={deck.length} />;
  const q = deck[i];

  const pick = (idx: number) => {
    if (idx === q.answer) setScore((s) => s + 1);
    if (timer.current) clearInterval(timer.current);
    setI((n) => n + 1);
  };

  return (
    <div>
      <ProgressBar i={i} total={deck.length} />
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">
          Question {i + 1} / {deck.length}
        </span>
        <div
          className={`heading rounded-full px-3 py-1 text-sm font-extrabold ${
            timeLeft <= 3 ? "bg-rose-500 text-white" : "bg-primary text-primary-foreground"
          }`}
        >
          ⏱ {timeLeft}s
        </div>
      </div>
      <h3 className="heading mt-4 text-xl font-extrabold">{q.q}</h3>
      <div className="mt-4 grid gap-2">
        {q.options.map((o, idx) => (
          <button
            key={idx}
            onClick={() => pick(idx)}
            className="glass w-full rounded-2xl px-4 py-3 text-left font-semibold hover:bg-primary/20"
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============ Quotes ============ */
function QuotesMode() {
  const deck = useMemo(() => shuffle(QUOTES), []);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const q = deck[i];
  const done = i >= deck.length;
  if (done) return <Finish score={score} total={deck.length} />;

  return (
    <div>
      <ProgressBar i={i} total={deck.length} />
      <div className="mt-5 rounded-3xl bg-gradient-to-br from-rose-400/20 to-fuchsia-500/20 p-6 text-center">
        <div className="text-3xl">💬</div>
        <p className="heading mt-3 text-xl font-extrabold italic leading-snug">"{q.line}"</p>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {q.options.map((o) => {
          const isCorrect = picked && o === q.speaker;
          const isWrong = picked === o && o !== q.speaker;
          return (
            <button
              key={o}
              disabled={!!picked}
              onClick={() => {
                setPicked(o);
                if (o === q.speaker) setScore((s) => s + 1);
              }}
              className={`rounded-2xl px-4 py-3 font-bold transition ${
                isCorrect ? "bg-emerald-500/40" : isWrong ? "bg-rose-500/40" : "glass hover:bg-primary/20"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
      {picked && (
        <button
          onClick={() => {
            setI((n) => n + 1);
            setPicked(null);
          }}
          className="glow mt-4 w-full rounded-2xl bg-primary px-4 py-3 font-bold text-primary-foreground"
        >
          Next ▸
        </button>
      )}
    </div>
  );
}

/* ============ Codex ============ */
function CodexMode() {
  const [tab, setTab] = useState<"princesses" | "kingdoms" | "tales">("princesses");
  return (
    <div>
      <div className="mb-4 flex gap-2">
        {(["princesses", "kingdoms", "tales"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-1.5 text-sm font-bold capitalize transition ${
              tab === t ? "bg-primary text-primary-foreground" : "glass"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === "princesses" && (
        <div className="grid gap-3 sm:grid-cols-2">
          {PRINCESSES.map((p) => (
            <div key={p.name} className={`rounded-2xl bg-gradient-to-br ${p.color} p-4 text-white shadow-lg`}>
              <div className="flex items-center gap-2 text-lg font-extrabold">
                <span className="text-2xl">{p.emoji}</span> {p.name}
              </div>
              <p className="mt-1 text-xs opacity-90"><b>Tale:</b> {p.tale}</p>
              <p className="mt-1 text-xs opacity-90"><b>Signature:</b> {p.item}</p>
              <p className="mt-1 text-xs opacity-90"><b>Kingdom:</b> {p.kingdom}</p>
              <p className="mt-2 text-[11px] italic opacity-80">{p.fact}</p>
            </div>
          ))}
        </div>
      )}
      {tab === "kingdoms" && (
        <div className="space-y-3">
          {KINGDOMS.map((k) => (
            <div key={k.name} className="glass rounded-2xl p-4">
              <div className="heading text-lg font-extrabold">
                {k.emoji} {k.name} <span className="text-sm text-muted-foreground">· ruled by {k.ruler}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{k.flavor}</p>
            </div>
          ))}
        </div>
      )}
      {tab === "tales" && (
        <div className="space-y-2">
          {TALES.map((b) => (
            <div key={b.num} className="glass flex items-center gap-3 rounded-2xl p-3 text-sm">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary font-extrabold text-primary-foreground">
                {b.num}
              </div>
              <div className="flex-1">
                <div className="font-bold">{b.title}</div>
                <div className="text-xs text-muted-foreground">
                  {b.author} · {b.year} · {b.oneLine}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============ Helpers ============ */
function ProgressBar({ i, total }: { i: number; total: number }) {
  const pct = Math.round((i / total) * 100);
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
      <div
        className="h-full rounded-full bg-gradient-to-r from-rose-400 via-pink-500 to-fuchsia-500 transition-all"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function Finish({ score, total, label = "correct" }: { score: number; total: number; label?: string }) {
  const pct = Math.round((score / total) * 100);
  const trophy = pct >= 80 ? "👑" : pct >= 50 ? "🌟" : "💖";
  return (
    <div className="text-center">
      <div className="text-6xl">{trophy}</div>
      <h3 className="heading mt-3 text-3xl font-extrabold">
        {score} / {total} {label}
      </h3>
      <p className="mt-2 text-muted-foreground">
        {pct >= 80 ? "Royal-tier princess scholar." : pct >= 50 ? "Tiara earned — keep reading!" : "Re-read a tale and try again!"}
      </p>
      <img
        src={coverPrincess}
        alt="princess"
        className="mx-auto mt-6 aspect-[5/3] w-full max-w-md rounded-2xl object-cover"
      />
      <button
        onClick={() => location.reload()}
        className="glow mt-6 inline-flex rounded-2xl bg-primary px-6 py-3 font-bold text-primary-foreground"
      >
        Play again ↻
      </button>
    </div>
  );
}
