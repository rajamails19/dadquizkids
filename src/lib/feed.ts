import { QUIZZES, type Question } from "./quizzes";
import type { Mode } from "./mode";
import { buildMiniGames, type MiniGameCard, type MiniGameCardKind } from "./miniGames";

export type QuizCard = {
  kind: "quiz";
  id: string;
  topic: string;
  cover: string;
  question: Question;
};

export type WowCard = {
  kind: "wow";
  id: string;
  topic: string;
  cover: string;
  title: string;
  fact: string;
};

export type FeedCard = QuizCard | WowCard | MiniGameCard;

const WOW_FACTS: Record<"girl" | "boy", { title: string; fact: string }[]> = {
  girl: [
    { title: "Did you know?", fact: "A baby otter holds its mom's paw so it doesn't float away while it sleeps. 🦦💕" },
    { title: "Magic fact!", fact: "Butterflies taste with their feet — every step is a little snack! 🦋" },
    { title: "Sparkle fact!", fact: "A group of flamingos is called a 'flamboyance'. So fancy! 🦩✨" },
    { title: "Wow!", fact: "Honeybees can recognise human faces. They might remember you! 🐝" },
    { title: "Sweet!", fact: "Cows have best friends and get sad when they're apart. 🐄💗" },
    { title: "Princess fact!", fact: "Real princesses have pet dragons in stories from over 30 countries! 🐉👑" },
  ],
  boy: [
    { title: "Brain blast!", fact: "A bolt of lightning is 5× hotter than the surface of the sun. ⚡" },
    { title: "Whoa!", fact: "Octopuses have three hearts and blue blood. 🐙" },
    { title: "Mind = blown", fact: "There are more trees on Earth than stars in our galaxy. 🌳✨" },
    { title: "Did you know?", fact: "A day on Venus is longer than a year on Venus. 🪐" },
    { title: "Wild fact!", fact: "Sharks existed before trees did. 🦈🌲" },
    { title: "Dragon fact!", fact: "Komodo dragons can taste the air with their tongues from 4 miles away. 🐲" },
  ],
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function buildFeed(mode: Mode, count = 40): FeedCard[] {
  const quizzes = QUIZZES.filter((q) => q.mode === mode);
  const covers = quizzes.map((q) => q.cover);
  const allQuestions: QuizCard[] = quizzes.flatMap((q) =>
    q.questions.map((qu, i) => ({
      kind: "quiz" as const,
      id: `${q.id}-${i}`,
      topic: q.title,
      cover: q.cover,
      question: qu,
    })),
  );
  const quizPool = shuffle(allQuestions);
  const miniPool = buildMiniGames(mode, covers, Math.ceil(count * 0.5));
  const wow = WOW_FACTS[mode];

  // Interleave: ~50% quiz, ~40% mini-games, ~10% wow facts
  const result: FeedCard[] = [];
  let qi = 0, mi = 0, wi = 0;
  for (let i = 0; i < count; i++) {
    const slot = i % 10;
    if (slot === 4 || slot === 9) {
      const w = wow[wi++ % wow.length];
      result.push({
        kind: "wow",
        id: `wow-${i}`,
        topic: "Wow",
        cover: covers[Math.floor(Math.random() * covers.length)] ?? "",
        title: w.title,
        fact: w.fact,
      });
    } else if (slot % 2 === 0) {
      const c = quizPool[qi++ % quizPool.length];
      if (c) result.push({ ...c, id: `${c.id}-${i}` });
    } else {
      const m = miniPool[mi++ % miniPool.length];
      if (m) result.push({ ...m, id: `${m.id}-${i}` });
    }
  }
  return result;
}

export function buildTypeFeed(mode: Mode, type: MiniGameCardKind, count = 8): FeedCard[] {
  const quizzes = QUIZZES.filter((q) => q.mode === mode);
  const covers = quizzes.map((q) => q.cover);
  const all = buildMiniGames(mode, covers, 100);
  const filtered = shuffle(all.filter((c) => c.kind === type));
  return filtered.slice(0, count);
}
