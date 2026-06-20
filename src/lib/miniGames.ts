import type { Mode } from "./mode";

export type MiniGameCardKind = "odd" | "bigger" | "count" | "color" | "sequence" | "sound" | "tf";

/* ---------------- Mini-game card types ---------------- */

export type OddOneOutCard = {
  kind: "odd";
  id: string;
  topic: string;
  cover: string;
  prompt: string;
  items: string[]; // emojis
  answer: number; // index of the odd one
  fact?: string;
};

export type BiggerCard = {
  kind: "bigger";
  id: string;
  topic: string;
  cover: string;
  prompt: string; // "Which is BIGGER in real life?"
  left: { emoji: string; label: string; size: number };
  right: { emoji: string; label: string; size: number };
  mode: "bigger" | "smaller";
  fact?: string;
};

export type CountCard = {
  kind: "count";
  id: string;
  topic: string;
  cover: string;
  prompt: string; // "Tap 3 stars"
  target: string; // "⭐"
  decoys: string[]; // other emojis
  count: number;
  fact?: string;
};

export type ColorHuntCard = {
  kind: "color";
  id: string;
  topic: string;
  cover: string;
  prompt: string;
  color: string; // CSS color
  colorName: string;
  items: { emoji: string; color: string }[]; // each cell has a color
  fact?: string;
};

export type SequenceCard = {
  kind: "sequence";
  id: string;
  topic: string;
  cover: string;
  prompt: string;
  sequence: string[]; // last is "?"
  options: string[];
  answer: number;
  fact?: string;
};

export type SoundMatchCard = {
  kind: "sound";
  id: string;
  topic: string;
  cover: string;
  prompt: string;
  // a synth recipe so we can play without assets
  sound: "roar" | "chirp" | "moo" | "meow" | "buzz" | "hoot";
  options: { emoji: string; label: string; sound: SoundMatchCard["sound"] }[];
  answer: number;
  fact?: string;
};

export type TrueFalseCard = {
  kind: "tf";
  id: string;
  topic: string;
  cover: string;
  statement: string;
  answer: boolean;
  fact: string;
};

export type MiniGameCard =
  | OddOneOutCard
  | BiggerCard
  | CountCard
  | ColorHuntCard
  | SequenceCard
  | SoundMatchCard
  | TrueFalseCard;

/* ---------------- Content banks ---------------- */

const ODD_GIRL: Omit<OddOneOutCard, "id" | "cover" | "topic" | "kind">[] = [
  { prompt: "Which one is NOT a fruit?", items: ["🍎", "🍌", "🥕", "🍓"], answer: 2, fact: "Carrots are veggies that grow underground! 🥕" },
  { prompt: "Which one is NOT an animal?", items: ["🐶", "🐱", "🌸", "🐰"], answer: 2, fact: "Flowers are plants, not animals! 🌸" },
  { prompt: "Which one doesn't fly?", items: ["🦋", "🐝", "🐢", "🦅"], answer: 2, fact: "Turtles are super slow on land. 🐢" },
  { prompt: "Which one is NOT pink?", items: ["🌸", "🦩", "🌳", "🍑"], answer: 2, fact: "Trees are green, like fresh leaves! 🌳" },
  { prompt: "Which one is NOT a princess thing?", items: ["👑", "🏰", "🚗", "✨"], answer: 2, fact: "Princesses ride carriages, not cars! 🐴" },
  { prompt: "Which one is NOT a shape?", items: ["⭐", "❤️", "🔺", "🍎"], answer: 3, fact: "An apple is a fruit, not a shape! 🍎" },
  { prompt: "Which one is NOT blue?", items: ["🫐", "🐳", "💎", "🍊"], answer: 3, fact: "Oranges are bright orange, not blue! 🍊" },
  { prompt: "Which one sleeps at night?", items: ["🌙", "☀️", "⭐", "🦉"], answer: 1, fact: "The Sun shines during the day and 'sleeps' at night! ☀️" },
];
const ODD_BOY: typeof ODD_GIRL = [
  { prompt: "Which one is NOT a planet?", items: ["🌍", "🪐", "☀️", "♂️"], answer: 2, fact: "The Sun is a star, not a planet! ☀️" },
  { prompt: "Which one is NOT a vehicle?", items: ["🚗", "✈️", "🐘", "🚀"], answer: 2, fact: "Elephants walk — no engine needed! 🐘" },
  { prompt: "Which one is NOT a dragon trait?", items: ["🔥", "🪽", "🦷", "🧊"], answer: 3, fact: "Most dragons breathe fire, not ice — except IceWings! ❄️" },
  { prompt: "Which one is NOT a tool?", items: ["🔨", "🪛", "🍕", "🪚"], answer: 2, fact: "Pizza is for eating, not building! 🍕" },
  { prompt: "Which one is NOT an instrument?", items: ["🎸", "🥁", "🎺", "📱"], answer: 3, fact: "Phones make sounds but aren't instruments! 📱" },
  { prompt: "Which one is NOT a chess piece?", items: ["♔", "♕", "♚", "🎲"], answer: 3, fact: "Dice are for board games, not chess! 🎲" },
  { prompt: "Which one is NOT a gas?", items: ["💨", "☁️", "🪨", "🎈"], answer: 2, fact: "Rocks are solid, not gas! 🪨" },
  { prompt: "Which one can't swim?", items: ["🐠", "🐢", "🦁", "🐸"], answer: 2, fact: "Lions live on land and usually avoid water! 🦁" },
];

const BIGGER_BOTH: Omit<BiggerCard, "id" | "cover" | "topic" | "kind">[] = [
  { prompt: "Which is BIGGER in real life?", left: { emoji: "🐘", label: "Elephant", size: 100 }, right: { emoji: "🐭", label: "Mouse", size: 1 }, mode: "bigger", fact: "An elephant weighs as much as 100,000 mice! 🐘" },
  { prompt: "Which is BIGGER in real life?", left: { emoji: "🐋", label: "Whale", size: 100 }, right: { emoji: "🐟", label: "Fish", size: 1 }, mode: "bigger" },
  { prompt: "Which is SMALLER?", left: { emoji: "🦒", label: "Giraffe", size: 100 }, right: { emoji: "🐈", label: "Cat", size: 1 }, mode: "smaller", fact: "Giraffes are the tallest land animal — up to 6m! 🦒" },
  { prompt: "Which is BIGGER?", left: { emoji: "🦕", label: "Dinosaur", size: 100 }, right: { emoji: "🐕", label: "Dog", size: 1 }, mode: "bigger" },
  { prompt: "Which is BIGGER?", left: { emoji: "🏔️", label: "Mountain", size: 100 }, right: { emoji: "🏠", label: "House", size: 1 }, mode: "bigger" },
  { prompt: "Which is SMALLER?", left: { emoji: "🐜", label: "Ant", size: 1 }, right: { emoji: "🦋", label: "Butterfly", size: 10 }, mode: "smaller", fact: "Ants are tiny — some are only 1 mm long! 🐜" },
  { prompt: "Which is BIGGER?", left: { emoji: "🌳", label: "Tree", size: 100 }, right: { emoji: "🌷", label: "Flower", size: 1 }, mode: "bigger" },
  { prompt: "Which is BIGGER?", left: { emoji: "🚢", label: "Ship", size: 100 }, right: { emoji: "🚗", label: "Car", size: 10 }, mode: "bigger", fact: "The biggest ship is longer than 4 football fields! 🚢" },
];

const COUNT: Omit<CountCard, "id" | "cover" | "topic" | "kind">[] = [
  { prompt: "Tap 3 stars ⭐", target: "⭐", decoys: ["🌙", "☁️", "✨", "🌸"], count: 3 },
  { prompt: "Tap 4 hearts ❤️", target: "❤️", decoys: ["💎", "✨", "🌟"], count: 4 },
  { prompt: "Tap 2 dragons 🐉", target: "🐉", decoys: ["🦖", "🐲", "🔥", "🪽"], count: 2 },
  { prompt: "Tap 5 flowers 🌸", target: "🌸", decoys: ["🌿", "🍃", "🌳"], count: 5 },
  { prompt: "Tap 2 moons 🌙", target: "🌙", decoys: ["⭐", "☁️", "🌞"], count: 2 },
  { prompt: "Tap 3 butterflies 🦋", target: "🦋", decoys: ["🐛", "🐝", "🌸", "🌿"], count: 3 },
  { prompt: "Tap 4 raindrops 💧", target: "💧", decoys: ["☀️", "🌈", "☁️", "❄️"], count: 4 },
  { prompt: "Tap 2 crowns 👑", target: "👑", decoys: ["💎", "✨", "🏰", "🦄"], count: 2 },
];

const COLOR_HUNT: Omit<ColorHuntCard, "id" | "cover" | "topic" | "kind">[] = [
  { prompt: "Tap everything RED", color: "#ef4444", colorName: "red", items: [
    { emoji: "🍎", color: "#ef4444" }, { emoji: "🍇", color: "#a855f7" }, { emoji: "🍓", color: "#ef4444" },
    { emoji: "🍋", color: "#facc15" }, { emoji: "🌹", color: "#ef4444" }, { emoji: "🫐", color: "#3b82f6" },
    { emoji: "🍒", color: "#ef4444" }, { emoji: "🥝", color: "#22c55e" },
  ] },
  { prompt: "Tap everything BLUE", color: "#3b82f6", colorName: "blue", items: [
    { emoji: "🌊", color: "#3b82f6" }, { emoji: "🌻", color: "#facc15" }, { emoji: "🫐", color: "#3b82f6" },
    { emoji: "🍊", color: "#f97316" }, { emoji: "💧", color: "#3b82f6" }, { emoji: "🌸", color: "#ec4899" },
    { emoji: "🐋", color: "#3b82f6" }, { emoji: "🍀", color: "#22c55e" },
  ] },
  { prompt: "Tap everything YELLOW", color: "#facc15", colorName: "yellow", items: [
    { emoji: "☀️", color: "#facc15" }, { emoji: "🌙", color: "#e5e7eb" }, { emoji: "🍌", color: "#facc15" },
    { emoji: "🌽", color: "#facc15" }, { emoji: "🍇", color: "#a855f7" }, { emoji: "⭐", color: "#facc15" },
    { emoji: "🦆", color: "#facc15" }, { emoji: "🍆", color: "#a855f7" },
  ] },
  { prompt: "Tap everything GREEN", color: "#22c55e", colorName: "green", items: [
    { emoji: "🐸", color: "#22c55e" }, { emoji: "🍎", color: "#ef4444" }, { emoji: "🍀", color: "#22c55e" },
    { emoji: "🐍", color: "#22c55e" }, { emoji: "🍊", color: "#f97316" }, { emoji: "🌳", color: "#22c55e" },
    { emoji: "🥝", color: "#22c55e" }, { emoji: "🌙", color: "#e5e7eb" },
  ] },
  { prompt: "Tap everything PURPLE", color: "#a855f7", colorName: "purple", items: [
    { emoji: "🍇", color: "#a855f7" }, { emoji: "🦋", color: "#3b82f6" }, { emoji: "🔮", color: "#a855f7" },
    { emoji: "🍆", color: "#a855f7" }, { emoji: "🌻", color: "#facc15" }, { emoji: "💜", color: "#a855f7" },
    { emoji: "🍌", color: "#facc15" }, { emoji: "🦄", color: "#a855f7" },
  ] },
];

const SEQUENCE: Omit<SequenceCard, "id" | "cover" | "topic" | "kind">[] = [
  { prompt: "What comes next?", sequence: ["🔴", "🔵", "🔴", "🔵", "?"], options: ["🔴", "🟢", "🟡"], answer: 0 },
  { prompt: "What comes next?", sequence: ["1", "2", "3", "4", "?"], options: ["6", "5", "7"], answer: 1 },
  { prompt: "What comes next?", sequence: ["🌑", "🌒", "🌓", "?"], options: ["🌕", "🌔", "🌖"], answer: 1, fact: "The moon changes shape every night — that's called a 'phase'! 🌙" },
  { prompt: "What comes next?", sequence: ["🐛", "🛖", "🦋", "?"], options: ["🐛", "🌸", "🦋"], answer: 2, fact: "Caterpillars become butterflies — it's called metamorphosis! 🦋" },
  { prompt: "What comes next?", sequence: ["A", "B", "C", "D", "?"], options: ["F", "E", "G"], answer: 1 },
  { prompt: "What comes next?", sequence: ["2", "4", "6", "8", "?"], options: ["9", "10", "11"], answer: 1, fact: "These are even numbers — they skip by 2! 🔢" },
  { prompt: "What comes next?", sequence: ["🔺", "🟥", "🔺", "🟥", "?"], options: ["🟥", "⭐", "🔺"], answer: 2 },
  { prompt: "What comes next?", sequence: ["5", "10", "15", "20", "?"], options: ["22", "25", "30"], answer: 1, fact: "Counting by 5s! 🔢" },
];

const SOUNDS: Omit<SoundMatchCard, "id" | "cover" | "topic" | "kind">[] = [
  { prompt: "Tap the animal you hear!", sound: "moo", options: [
    { emoji: "🐄", label: "Cow", sound: "moo" },
    { emoji: "🐱", label: "Cat", sound: "meow" },
    { emoji: "🦉", label: "Owl", sound: "hoot" },
    { emoji: "🐝", label: "Bee", sound: "buzz" },
  ], answer: 0 },
  { prompt: "Tap the animal you hear!", sound: "meow", options: [
    { emoji: "🐦", label: "Bird", sound: "chirp" },
    { emoji: "🐱", label: "Cat", sound: "meow" },
    { emoji: "🦁", label: "Lion", sound: "roar" },
    { emoji: "🦉", label: "Owl", sound: "hoot" },
  ], answer: 1 },
  { prompt: "Tap the animal you hear!", sound: "roar", options: [
    { emoji: "🐝", label: "Bee", sound: "buzz" },
    { emoji: "🐄", label: "Cow", sound: "moo" },
    { emoji: "🦁", label: "Lion", sound: "roar" },
    { emoji: "🐦", label: "Bird", sound: "chirp" },
  ], answer: 2 },
  { prompt: "Tap the animal you hear!", sound: "buzz", options: [
    { emoji: "🐝", label: "Bee", sound: "buzz" },
    { emoji: "🦉", label: "Owl", sound: "hoot" },
    { emoji: "🐱", label: "Cat", sound: "meow" },
    { emoji: "🦁", label: "Lion", sound: "roar" },
  ], answer: 0 },
  { prompt: "Tap the animal you hear!", sound: "chirp", options: [
    { emoji: "🐦", label: "Bird", sound: "chirp" },
    { emoji: "🐝", label: "Bee", sound: "buzz" },
    { emoji: "🐄", label: "Cow", sound: "moo" },
    { emoji: "🐱", label: "Cat", sound: "meow" },
  ], answer: 0 },
  { prompt: "Tap the animal you hear!", sound: "hoot", options: [
    { emoji: "🦁", label: "Lion", sound: "roar" },
    { emoji: "🦉", label: "Owl", sound: "hoot" },
    { emoji: "🐦", label: "Bird", sound: "chirp" },
    { emoji: "🐝", label: "Bee", sound: "buzz" },
  ], answer: 1 },
];

const TF_GIRL: Omit<TrueFalseCard, "id" | "cover" | "topic" | "kind">[] = [
  { statement: "Flamingos are pink because of the food they eat.", answer: true, fact: "They eat tiny pink shrimp & algae — that's what tints their feathers! 🦩" },
  { statement: "All princesses have a pet unicorn.", answer: false, fact: "Unicorns are make-believe — but they ARE in tons of fairy tales! 🦄" },
  { statement: "Butterflies taste with their feet.", answer: true, fact: "They literally step on flowers to taste them! 🦋" },
  { statement: "Cats can see in complete darkness.", answer: false, fact: "Cats see WAY better in low light than us, but not in total dark. 🐱" },
  { statement: "A baby kangaroo is called a joey.", answer: true, fact: "Joeys live in mom's pouch until they're big enough to hop! 🦘" },
  { statement: "Bees make honey from flowers.", answer: true, fact: "Bees visit flowers to collect nectar, then turn it into honey! 🐝" },
  { statement: "All birds can fly.", answer: false, fact: "Penguins and ostriches can't fly — but they run and swim great! 🐧" },
  { statement: "A rainbow has 7 colors.", answer: true, fact: "Red, orange, yellow, green, blue, indigo, violet! 🌈" },
];
const TF_BOY: typeof TF_GIRL = [
  { statement: "Lightning is hotter than the surface of the Sun.", answer: true, fact: "About 5× hotter — around 30,000°C! ⚡" },
  { statement: "Octopuses have 3 hearts.", answer: true, fact: "Two pump blood to the gills, one to the rest of the body. 🐙" },
  { statement: "Sharks are mammals.", answer: false, fact: "Sharks are fish — they breathe through gills. 🦈" },
  { statement: "A day on Venus is longer than its year.", answer: true, fact: "Venus spins SO slowly that one day > one orbit around the Sun. 🪐" },
  { statement: "Bananas grow on trees.", answer: false, fact: "Banana plants are giant herbs, not trees! 🍌" },
  { statement: "The Great Wall of China is visible from space with the naked eye.", answer: false, fact: "It's a myth — too narrow to see from orbit. 🌏" },
  { statement: "The Earth is flat.", answer: false, fact: "Earth is a sphere — astronauts have seen the curve! 🌍" },
  { statement: "Water freezes at 0°C.", answer: true, fact: "That's 32°F — time for ice cubes! 🧊" },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function buildMiniGames(mode: Mode, covers: string[], count: number): MiniGameCard[] {
  const pickCover = () => covers[Math.floor(Math.random() * covers.length)] ?? "";
  const out: MiniGameCard[] = [];
  const odd = mode === "girl" ? ODD_GIRL : ODD_BOY;
  const tf = mode === "girl" ? TF_GIRL : TF_BOY;
  let i = 0;
  const allPools: (() => MiniGameCard)[] = [
    ...odd.map((q) => () => ({ ...q, kind: "odd" as const, id: `odd-${i++}-${Math.random()}`, topic: "Odd one out", cover: pickCover() })),
    ...BIGGER_BOTH.map((q) => () => ({ ...q, kind: "bigger" as const, id: `big-${i++}-${Math.random()}`, topic: "Big or small", cover: pickCover() })),
    ...COUNT.map((q) => () => ({ ...q, kind: "count" as const, id: `count-${i++}-${Math.random()}`, topic: "Counting tap", cover: pickCover() })),
    ...COLOR_HUNT.map((q) => () => ({ ...q, kind: "color" as const, id: `color-${i++}-${Math.random()}`, topic: "Color hunt", cover: pickCover() })),
    ...SEQUENCE.map((q) => () => ({ ...q, kind: "sequence" as const, id: `seq-${i++}-${Math.random()}`, topic: "What's next?", cover: pickCover() })),
    ...SOUNDS.map((q) => () => ({ ...q, kind: "sound" as const, id: `snd-${i++}-${Math.random()}`, topic: "Match the sound", cover: pickCover() })),
    ...tf.map((q) => () => ({ ...q, kind: "tf" as const, id: `tf-${i++}-${Math.random()}`, topic: "True or False", cover: pickCover() })),
  ];
  const shuffled = shuffle(allPools);
  for (let k = 0; k < count; k++) out.push(shuffled[k % shuffled.length]());
  return out;
}

/* ---------------- Web Audio animal-ish sounds ---------------- */
let _actx: AudioContext | null = null;
function actx() {
  if (typeof window === "undefined") return null;
  if (!_actx) {
    try { _actx = new (window.AudioContext || (window as any).webkitAudioContext)(); } catch { return null; }
  }
  if (_actx?.state === "suspended") _actx.resume().catch(() => {});
  return _actx;
}

function playTone(freq: number, dur: number, type: OscillatorType, gain: number, slideTo?: number, delay = 0) {
  const ctx = actx();
  if (!ctx) return;
  const t0 = ctx.currentTime + delay;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t0);
  if (slideTo !== undefined) o.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(gain, t0 + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g).connect(ctx.destination);
  o.start(t0);
  o.stop(t0 + dur + 0.05);
}

export function playAnimalSound(sound: SoundMatchCard["sound"]) {
  switch (sound) {
    case "moo":
      playTone(180, 0.55, "sawtooth", 0.18, 110);
      break;
    case "meow":
      playTone(700, 0.18, "sine", 0.15, 950);
      playTone(950, 0.22, "sine", 0.13, 600, 0.18);
      break;
    case "roar":
      playTone(120, 0.8, "sawtooth", 0.22, 60);
      playTone(80, 0.8, "square", 0.1, 50);
      break;
    case "chirp":
      for (let i = 0; i < 3; i++) playTone(2200, 0.08, "triangle", 0.1, 2800, i * 0.12);
      break;
    case "buzz":
      playTone(220, 0.6, "sawtooth", 0.08);
      playTone(225, 0.6, "square", 0.06);
      break;
    case "hoot":
      playTone(400, 0.35, "sine", 0.18, 320);
      playTone(380, 0.35, "sine", 0.15, 300, 0.45);
      break;
  }
}
