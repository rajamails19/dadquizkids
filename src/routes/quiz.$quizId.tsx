import { createFileRoute, Link, useRouter, notFound } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { ModeToggle } from "@/components/ModeToggle";
import { getQuiz, getQuizzesByMode } from "@/lib/quizzes";
import { useMode } from "@/lib/mode";

export const Route = createFileRoute("/quiz/$quizId")({
  head: ({ params }) => {
    const q = getQuiz(params.quizId);
    const title = q ? `${q.title} — QuestKid` : "Quiz — QuestKid";
    const description = q?.tagline ?? "A cinematic flashcard quiz for kids.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        ...(q ? [{ property: "og:image", content: q.cover }] : []),
      ],
    };
  },
  loader: ({ params }) => {
    const q = getQuiz(params.quizId);
    if (!q) throw notFound();
    return q;
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-md p-10 text-center">
      <h1 className="heading text-3xl font-bold">Quiz not found</h1>
      <p className="mt-2 text-muted-foreground">That quiz doesn't exist.</p>
      <Link to="/" className="mt-6 inline-block rounded-2xl bg-primary px-5 py-3 font-bold text-primary-foreground">
        Back home
      </Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="mx-auto max-w-md p-10 text-center">
        <h1 className="heading text-2xl font-bold">Something glitched</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 rounded-2xl bg-primary px-5 py-3 font-bold text-primary-foreground"
        >
          Try again
        </button>
      </div>
    );
  },
  component: QuizPage,
});

// ── Web Speech helper ──────────────────────────────────────────────
function speak(text: string, ttsEnabled: boolean) {
  if (!ttsEnabled || typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.88;
  u.pitch = 1.15;
  window.speechSynthesis.speak(u);
}

// ── Main component ─────────────────────────────────────────────────
function QuizPage() {
  const quiz = Route.useLoaderData();
  const { mode } = useMode();

  const [index, setIndex]   = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore]   = useState(0);
  const [done, setDone]     = useState(false);
  const [animKey, setAnimKey] = useState(0); // bumped to re-trigger stagger animation
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset when quiz changes
  useEffect(() => {
    setIndex(0); setPicked(null); setScore(0); setDone(false); setAnimKey(0);
  }, [quiz.id]);

  // Cleanup timer on unmount
  useEffect(() => () => { if (autoTimer.current) clearTimeout(autoTimer.current); }, []);

  const total = quiz.questions.length;
  const q = quiz.questions[index]!;
  const correct = picked !== null && picked === q.answer;

  const sameMode = useMemo(() => getQuizzesByMode(quiz.mode), [quiz.mode]);
  const nextSuggestion = useMemo(() => {
    const others = sameMode.filter((s) => s.id !== quiz.id);
    return others[Math.floor(Math.random() * others.length)];
  }, [sameMode, quiz.id]);

  const next = useCallback(() => {
    if (autoTimer.current) clearTimeout(autoTimer.current);
    if (index + 1 >= total) {
      setDone(true);
    } else {
      setIndex((i) => i + 1);
      setPicked(null);
      setAnimKey((k) => k + 1); // re-trigger stagger
    }
  }, [index, total]);

  function choose(i: number) {
    if (picked !== null) return;
    setPicked(i);
    const isCorrect = i === q.answer;

    if (isCorrect) {
      setScore((s) => s + 1);
      const isGirl = quiz.mode === "girl";
      confetti({
        particleCount: isGirl ? 120 : 80,
        spread: isGirl ? 80 : 60,
        origin: { y: 0.6 },
        colors: isGirl
          ? ["#f9a8d4", "#fde68a", "#c4b5fd", "#fbcfe8", "#a7f3d0"]
          : ["#38bdf8", "#f97316", "#facc15", "#4ade80", "#e879f9"],
        scalar: isGirl ? 1.2 : 1,
      });
      // Read aloud any fun fact first, then auto-advance after 1.8s
      if (q.fact) speak(q.fact, ttsEnabled);
      autoTimer.current = setTimeout(next, 1800);
    } else {
      // Wrong: read the fun fact aloud so kid learns even without reading
      if (q.fact) speak(q.fact, ttsEnabled);
    }
  }

  function restart() {
    setIndex(0); setPicked(null); setScore(0); setDone(false); setAnimKey(0);
  }

  const isBigEmoji = /\p{Emoji}/u.test(q?.visual ?? "") && (q?.visual?.length ?? 0) <= 6;
  const girlPraise = ["🌟 Yay! Amazing!", "🎉 You got it!", "✨ Super smart!", "🌸 Wonderful!", "💖 Brilliant!"];

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <Link to="/" className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
          ← All quizzes
        </Link>
        <div className="flex items-center gap-2">
          {/* TTS toggle */}
          <button
            onClick={() => setTtsEnabled((v) => !v)}
            title={ttsEnabled ? "Mute read-aloud" : "Enable read-aloud"}
            className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold transition hover:scale-105"
          >
            {ttsEnabled ? "🔊" : "🔇"}
            <span className="hidden sm:inline">{ttsEnabled ? "Read aloud" : "Silent"}</span>
          </button>
          <ModeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-20">
        {/* Title strip */}
        <div className="glass mb-6 flex items-center gap-4 overflow-hidden rounded-3xl p-3">
          <img src={quiz.cover} alt="" width={1024} height={1024}
            className="h-20 w-20 flex-none rounded-2xl object-cover" />
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {mode === "girl" ? "Sparkle pack" : "Quest pack"}
            </div>
            <div className="heading truncate text-xl font-extrabold">{quiz.title}</div>
            <div className="truncate text-sm text-muted-foreground">{quiz.tagline}</div>
          </div>
          <div className="hidden text-right sm:block">
            <div className="text-xs uppercase text-muted-foreground">Score</div>
            <div className="heading text-2xl font-extrabold">
              {score}<span className="text-muted-foreground">/{total}</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        {!done && (
          <div className="mb-6">
            <div className="mb-2 flex justify-between text-xs font-semibold text-muted-foreground">
              <span>Question {index + 1} / {total}</span>
              <span>{Math.round(((index + (picked !== null ? 1 : 0)) / total) * 100)}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent-2 transition-all duration-500"
                style={{ width: `${((index + (picked !== null ? 1 : 0)) / total) * 100}%` }}
              />
            </div>
          </div>
        )}

        {!done ? (
          <div key={animKey} className="glass question-enter rounded-3xl p-6 sm:p-10">
            {/* Visual + prompt */}
            <div className="grid place-items-center py-6">
              <div
                className={`heading text-center font-extrabold leading-none ${
                  isBigEmoji ? "text-[8rem] sm:text-[10rem]" : "text-5xl sm:text-6xl"
                }`}
                style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.25))" }}
              >
                {q.visual}
              </div>
              <p className="mt-4 max-w-xl text-center text-lg text-muted-foreground">
                {q.prompt}
              </p>
            </div>

            {/* Answer buttons — staggered entrance via CSS */}
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {q.options.map((opt: string, i: number) => {
                const isPicked  = picked === i;
                const isCorrect = i === q.answer;
                const showState = picked !== null;
                const emoji     = quiz.mode === "girl" && q.optionEmojis?.[i];
                let cls = "answer-btn glass text-left rounded-2xl px-5 py-4 font-bold transition-all hover:-translate-y-0.5";
                if (showState && isCorrect)
                  cls += " ring-2 ring-[var(--color-success)] !bg-[color:var(--color-success)]/15";
                else if (showState && isPicked && !isCorrect)
                  cls += " ring-2 ring-[var(--color-destructive)] !bg-[color:var(--color-destructive)]/15";
                else if (showState)
                  cls += " opacity-60";
                return (
                  <button key={i} onClick={() => choose(i)} disabled={picked !== null} className={cls}>
                    {emoji ? (
                      <span className="mr-3 text-2xl">{emoji}</span>
                    ) : (
                      <span className="mr-3 inline-grid h-7 w-7 place-items-center rounded-full bg-primary text-xs text-primary-foreground">
                        {String.fromCharCode(65 + i)}
                      </span>
                    )}
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Feedback row */}
            {picked !== null && (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-base font-semibold">
                  {correct ? (
                    <span className="text-[color:var(--color-success)]">
                      {quiz.mode === "girl" ? girlPraise[index % 5] : "✓ Nice one!"}
                    </span>
                  ) : (
                    <span className="text-[color:var(--color-destructive)]">
                      Almost! Correct: <span className="text-foreground">{q.options[q.answer]}</span>
                    </span>
                  )}
                  {q.fact && (
                    <div className="mt-1 text-sm font-normal text-muted-foreground">💡 {q.fact}</div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {/* Auto-advance hint shown only on correct */}
                  {correct && (
                    <span className="text-xs text-muted-foreground animate-pulse">
                      Auto-advancing…
                    </span>
                  )}
                  <button
                    onClick={next}
                    className="glow rounded-2xl bg-primary px-6 py-3 font-bold text-primary-foreground"
                  >
                    {index + 1 >= total ? "See results →" : "Next →"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <ResultsCard
            score={score}
            total={total}
            onRestart={restart}
            nextId={nextSuggestion?.id}
            nextTitle={nextSuggestion?.title}
          />
        )}
      </main>
    </div>
  );
}

function ResultsCard({
  score, total, onRestart, nextId, nextTitle,
}: {
  score: number; total: number; onRestart: () => void; nextId?: string; nextTitle?: string;
}) {
  const pct     = Math.round((score / total) * 100);
  const trophy  = pct >= 80 ? "🏆" : pct >= 50 ? "🌟" : "💪";
  const headline = pct >= 80 ? "Brain on fire!" : pct >= 50 ? "Solid work!" : "Great try — let's run it again!";

  return (
    <div className="glass question-enter rounded-3xl p-8 text-center">
      <div className="text-7xl">{trophy}</div>
      <h2 className="heading mt-4 text-3xl font-extrabold">{headline}</h2>
      <p className="mt-2 text-muted-foreground">
        You got <span className="font-bold text-foreground">{score}</span> out of{" "}
        <span className="font-bold text-foreground">{total}</span> ({pct}%)
      </p>
      <div className="mx-auto mt-6 h-3 max-w-sm overflow-hidden rounded-full bg-muted">
        <div className="h-full bg-gradient-to-r from-primary via-accent-2 to-accent"
          style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button onClick={onRestart} className="glass rounded-2xl px-5 py-3 font-bold">
          ↻ Play again
        </button>
        {nextId && (
          <Link to="/quiz/$quizId" params={{ quizId: nextId }}
            className="glow rounded-2xl bg-primary px-5 py-3 font-bold text-primary-foreground">
            Try: {nextTitle} →
          </Link>
        )}
        <Link to="/" className="rounded-2xl px-5 py-3 font-bold text-muted-foreground hover:text-foreground">
          All quizzes
        </Link>
      </div>
    </div>
  );
}
