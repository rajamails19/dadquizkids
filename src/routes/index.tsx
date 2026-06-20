import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { useMode } from "@/lib/mode";
import { ModeToggle } from "@/components/ModeToggle";
import { getQuizzesByMode, QUIZZES } from "@/lib/quizzes";
import heroGirl from "@/assets/hero-girl.jpg";
import heroBoy from "@/assets/hero-boy.jpg";
import coverOdd from "@/assets/cover-odd.jpg";
import coverBigger from "@/assets/cover-bigger.jpg";
import coverCount from "@/assets/cover-count.jpg";
import coverColor from "@/assets/cover-color.jpg";
import coverSequence from "@/assets/cover-sequence.jpg";
import coverSound from "@/assets/cover-sound.jpg";
import coverTf from "@/assets/cover-tf.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QuestKid — Flashy quizzes for curious kids" },
      {
        name: "description",
        content:
          "Cinematic flashcard quizzes for kids — flags, animals, princesses, periodic table, chess, dragons and more. Toggle between Girl and Boy modes.",
      },
      { property: "og:title", content: "QuestKid — Flashy quizzes for curious kids" },
      {
        property: "og:description",
        content:
          "Cinematic flashcard quizzes for kids. Toggle Girl or Boy mode and start a quick quiz in seconds.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { mode } = useMode();
  const quizzes = useMemo(() => getQuizzesByMode(mode), [mode]);
  const hero = mode === "girl" ? heroGirl : heroBoy;
  const totalQuestions = QUIZZES.filter((q) => q.mode === mode).reduce(
    (n, q) => n + q.questions.length,
    0,
  );

  // Client-only random pick to avoid SSR hydration mismatch
  const [randomId, setRandomId] = useState<string | undefined>(undefined);
  useEffect(() => {
    setRandomId(quizzes[Math.floor(Math.random() * quizzes.length)]?.id);
  }, [quizzes]);

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
            <span className="text-xl">✦</span>
          </div>
          <span className="heading text-xl font-bold tracking-tight">QuestKid</span>
        </div>
        <ModeToggle />
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 pt-6 pb-16 md:grid-cols-2">
        <div>
          <div className="glass mb-5 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {mode === "girl" ? "For curious little ones · age 3–6" : "For curious explorers · age 8–12"}
          </div>
          <h1 className="heading text-5xl font-extrabold sm:text-6xl">
            {mode === "girl" ? (
              <>
                Sparkly quizzes
                <br />
                <span className="bg-gradient-to-r from-primary via-accent-2 to-accent bg-clip-text text-transparent">
                  for tiny geniuses.
                </span>
              </>
            ) : (
              <>
                Quick quests for
                <br />
                <span className="bg-gradient-to-r from-primary via-accent-2 to-accent bg-clip-text text-transparent">
                  growing brains.
                </span>
              </>
            )}
          </h1>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground">
            {mode === "girl"
              ? "Bite-sized flashcards on animals, colors, princesses & flags. Easy wins, lots of smiles, real learning."
              : "Cinematic flashcards on flags, capitals, periodic table, chess, Pokémon & Wings of Fire. Easy enough to win, sneaky enough to teach."}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {/* Just Play — the big TikTok-style feed */}
            <Link
              to="/play"
              className="glow inline-flex items-center gap-2 rounded-2xl bg-primary px-7 py-4 text-lg font-extrabold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              ▶ Just Play
            </Link>
            {randomId && (
              <Link
                to="/quiz/$quizId"
                params={{ quizId: randomId }}
                className="glass inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-base font-bold text-foreground transition-transform hover:scale-[1.02]"
              >
                ✨ Surprise quiz
              </Link>
            )}
            <a
              href="#quizzes"
              className="glass inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-base font-bold text-foreground transition-transform hover:scale-[1.02]"
            >
              Browse {quizzes.length} packs
            </a>
          </div>

          <div className="mt-8 flex gap-6 text-sm text-muted-foreground">
            <div>
              <div className="heading text-2xl font-bold text-foreground">{quizzes.length}</div>
              quiz packs
            </div>
            <div>
              <div className="heading text-2xl font-bold text-foreground">{totalQuestions}</div>
              questions
            </div>
            <div>
              <div className="heading text-2xl font-bold text-foreground">∞</div>
              easy wins
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="glass overflow-hidden rounded-[2rem] p-2">
            <img
              src={hero}
              alt={mode === "girl" ? "A book-smart princess reading a magical storybook" : "A curious boy explorer"}
              width={1024}
              height={1024}
              className="aspect-square w-full rounded-[1.75rem] object-cover"
            />
          </div>
          <div className="glass glow absolute -bottom-6 -left-6 max-w-[220px] rounded-2xl p-4 text-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Today</div>
            <div className="heading mt-1 font-bold">
              {mode === "girl" ? "Princess Magic ✨" : "World Flags 🌍"}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">Tap any card to start →</div>
          </div>
        </div>
      </section>

      {/* Quiz + Mini-game grid */}
      <section id="quizzes" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="heading text-3xl font-extrabold sm:text-4xl">
              {mode === "girl" ? "Pick your sparkle" : "Pick your quest"}
            </h2>
            <p className="mt-1 text-muted-foreground">
              {mode === "girl"
                ? "Tap a card — every quiz is short and full of wins."
                : "Tap a card — short bursts, real knowledge, zero homework vibes."}
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Regular quiz packs */}
          {quizzes.map((q) => {
            const isWof = q.id === "boy-dragons";
            const isPrincessArena = q.id === "girl-princess";
            const isArena = isWof || isPrincessArena;
            const linkProps = isWof
              ? { to: "/arena/wings-of-fire" as const }
              : isPrincessArena
                ? { to: "/arena/princesses" as const }
                : { to: "/quiz/$quizId" as const, params: { quizId: q.id } };
            const arenaGradient = isWof
              ? "from-orange-500 to-fuchsia-500"
              : "from-rose-400 to-fuchsia-500";
            return (
              <Link
                key={q.id}
                {...linkProps}
                className="glass group relative block overflow-hidden rounded-3xl p-0 transition-transform hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="relative aspect-[5/3] overflow-hidden">
                  <img
                    src={q.cover}
                    alt={q.title}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  {isArena && (
                    <span className={`absolute left-3 top-3 rounded-full bg-gradient-to-r ${arenaGradient} px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-lg`}>
                      ✦ Arena · 8 modes
                    </span>
                  )}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                    <div>
                      <div className="heading text-xl font-extrabold text-white drop-shadow">{q.title}</div>
                      <div className="text-xs font-medium text-white/85 drop-shadow">{q.tagline}</div>
                    </div>
                    <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-slate-900">
                      {isArena ? "8 modes" : `${q.questions.length} Qs`}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4">
                  <span className="text-sm text-muted-foreground">
                    {isWof ? "Real WoF arena" : isPrincessArena ? "Fairy-tale arena" : mode === "girl" ? "Easy & fun" : "Quick win"}
                  </span>
                  <span className="rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground">
                    {isArena ? "Enter ▸" : "Start ▸"}
                  </span>
                </div>
              </Link>
            );
          })}

          {/* Mini-game packs — shown for both modes */}
          {[
            { id: "mini-odd",      title: "Odd One Out",      tagline: "Spot the sneaky item!",         cover: coverOdd,      type: "odd"      as const, label: "Tap & think" },
            { id: "mini-bigger",   title: "Big or Small",     tagline: "Which is BIGGER in real life?", cover: coverBigger,   type: "bigger"   as const, label: "Compare & win" },
            { id: "mini-count",    title: "Counting Tap",     tagline: "Tap & count!",                  cover: coverCount,    type: "count"    as const, label: "Fast fingers" },
            { id: "mini-color",    title: "Color Hunt",       tagline: "Find the color!",               cover: coverColor,    type: "color"    as const, label: "Sharp eyes" },
            { id: "mini-sequence", title: "What's Next?",     tagline: "Solve the pattern!",            cover: coverSequence, type: "sequence" as const, label: "Brain teaser" },
            { id: "mini-sound",    title: "Match the Sound",  tagline: "Listen & tap!",                 cover: coverSound,    type: "sound"    as const, label: "Ears first" },
            { id: "mini-tf",       title: "True or False",    tagline: "Fact or fiction?",              cover: coverTf,       type: "tf"       as const, label: "Fun facts" },
          ].map((p) => (
            <Link
              key={p.id}
              to="/play"
              search={{ type: p.type }}
              className="glass group relative block overflow-hidden rounded-3xl p-0 transition-transform hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative aspect-[5/3] overflow-hidden">
                <img
                  src={p.cover}
                  alt={p.title}
                  loading="lazy"
                  width={1024}
                  height={640}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                  <div>
                    <div className="heading text-xl font-extrabold text-white drop-shadow">{p.title}</div>
                    <div className="text-xs font-medium text-white/85 drop-shadow">{p.tagline}</div>
                  </div>
                  <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-slate-900">8 Qs</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-4">
                <span className="text-sm text-muted-foreground">{p.label}</span>
                <span className="rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground">Start ▸</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-border/60 py-8 text-center text-sm text-muted-foreground">
        Made with ✨ for curious kids. Toggle Girl / Boy any time.
      </footer>
    </div>
  );
}
