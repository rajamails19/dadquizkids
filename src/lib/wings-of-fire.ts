// Canon-accurate Wings of Fire content bank
// Sourced from the books by Tui T. Sutherland (Arcs 1–3)

export type Tribe = {
  name: string;
  habitat: string;
  ability: string;
  color: string;
  emoji: string;
  fact: string;
};

export const TRIBES: Tribe[] = [
  {
    name: "MudWings",
    habitat: "Mud Kingdom swamps",
    ability: "Fire-resistant scales, can hold breath for up to an hour underwater",
    color: "from-amber-700 to-stone-500",
    emoji: "🟤",
    fact: "MudWings hatched in the sun can breathe fire; they are loyal to their sibling 'troop' for life.",
  },
  {
    name: "SandWings",
    habitat: "Kingdom of Sand desert",
    ability: "Venomous barbed tail, fire breath, survive in extreme heat",
    color: "from-yellow-400 to-orange-500",
    emoji: "🏜️",
    fact: "A single drop of SandWing tail venom can kill another dragon within minutes.",
  },
  {
    name: "SkyWings",
    habitat: "Sky Kingdom mountains",
    ability: "Fastest fliers, powerful fire breath",
    color: "from-red-500 to-orange-500",
    emoji: "🔥",
    fact: "SkyWings have the largest wingspan of any tribe — they are the fastest, strongest fliers in Pyrrhia.",
  },
  {
    name: "SeaWings",
    habitat: "Kingdom of the Sea (underwater)",
    ability: "Breathe underwater, bioluminescent stripes that glow",
    color: "from-blue-500 to-cyan-400",
    emoji: "🌊",
    fact: "SeaWings communicate underwater using Aquatic — a language of flashing light patterns on their scales.",
  },
  {
    name: "IceWings",
    habitat: "Ice Kingdom",
    ability: "Frostbreath, serrated claws made for ice",
    color: "from-cyan-200 to-blue-200",
    emoji: "❄️",
    fact: "IceWings live by a strict Seven Circles ranking system. Frostbreath can kill on contact.",
  },
  {
    name: "RainWings",
    habitat: "Rainforest Kingdom",
    ability: "Color-changing scales, deadly venom spit, prehensile tails",
    color: "from-emerald-400 to-fuchsia-400",
    emoji: "🌧️",
    fact: "RainWing venom can melt scales and bone. They also have prehensile tails for swinging through the rainforest.",
  },
  {
    name: "NightWings",
    habitat: "Originally a hidden volcanic island; later the Rainforest",
    ability: "Once rumored to read minds and see the future (only Moonwatcher, Darkstalker truly can)",
    color: "from-slate-900 to-purple-700",
    emoji: "🌙",
    fact: "Their famous powers were faked for centuries — true mindreading & prophecy only return when a dragonet hatches under two moons.",
  },
  {
    name: "SilkWings",
    habitat: "Pantala (the Lost Continent)",
    ability: "Spin silk from wrist spinnerets; some have flamesilk",
    color: "from-pink-300 to-violet-300",
    emoji: "🦋",
    fact: "SilkWings hatch wingless and grow wings at age six during 'Metamorphosis'. Flamesilks spin burning silk.",
  },
  {
    name: "HiveWings",
    habitat: "Pantala — the Hives",
    ability: "Different weapons per dragon: stingers, boiling acid, paralyzing toxin",
    color: "from-yellow-500 to-amber-600",
    emoji: "🐝",
    fact: "Queen Wasp could control every HiveWing's mind through the breath of evil plant from her ancestor Clearsight's vision.",
  },
  {
    name: "LeafWings",
    habitat: "Poison Jungle (Pantala) — believed extinct for 50 years",
    ability: "Leafspeak — some can grow and control plants",
    color: "from-green-500 to-lime-400",
    emoji: "🌿",
    fact: "LeafWings were thought extinct after the Tree Wars but survived hidden in the Poison Jungle.",
  },
];

export type Dragonet = {
  name: string;
  tribe: string;
  role: string;
  fact: string;
};

export const DRAGONETS_OF_DESTINY: Dragonet[] = [
  { name: "Clay", tribe: "MudWing", role: "The big brother of the group; fireproof", fact: "Clay was raised in the cave with the others and protected them like a MudWing troop." },
  { name: "Tsunami", tribe: "SeaWing", role: "Princess of the SeaWings, fierce protector", fact: "Tsunami is the daughter of Queen Coral — she discovered her royal heritage in Book 2." },
  { name: "Glory", tribe: "RainWing", role: "Replaced the missing SkyWing of the prophecy", fact: "Glory becomes the first joint RainWing/NightWing queen at the end of Arc 1." },
  { name: "Starflight", tribe: "NightWing", role: "The bookish one — later blinded", fact: "Starflight loses his sight during the volcanic eruption on the NightWing island in Book 5." },
  { name: "Sunny", tribe: "SandWing/NightWing hybrid", role: "The smallest, most optimistic dragonet", fact: "Sunny was hidden as a SandWing but is actually half-NightWing — her mother is Thorn, queen of the Outclaws." },
];

export type Book = { num: number; title: string; arc: string; pov: string };
export const BOOKS: Book[] = [
  { num: 1, title: "The Dragonet Prophecy", arc: "Arc 1 — Dragonets", pov: "Clay" },
  { num: 2, title: "The Lost Heir", arc: "Arc 1 — Dragonets", pov: "Tsunami" },
  { num: 3, title: "The Hidden Kingdom", arc: "Arc 1 — Dragonets", pov: "Glory" },
  { num: 4, title: "The Dark Secret", arc: "Arc 1 — Dragonets", pov: "Starflight" },
  { num: 5, title: "The Brightest Night", arc: "Arc 1 — Dragonets", pov: "Sunny" },
  { num: 6, title: "Moon Rising", arc: "Arc 2 — Jade Mountain", pov: "Moonwatcher" },
  { num: 7, title: "Winter Turning", arc: "Arc 2 — Jade Mountain", pov: "Winter" },
  { num: 8, title: "Escaping Peril", arc: "Arc 2 — Jade Mountain", pov: "Peril" },
  { num: 9, title: "Talons of Power", arc: "Arc 2 — Jade Mountain", pov: "Turtle" },
  { num: 10, title: "Darkness of Dragons", arc: "Arc 2 — Jade Mountain", pov: "Qibli" },
  { num: 11, title: "The Lost Continent", arc: "Arc 3 — Pantala", pov: "Blue" },
  { num: 12, title: "The Hive Queen", arc: "Arc 3 — Pantala", pov: "Cricket" },
  { num: 13, title: "The Poison Jungle", arc: "Arc 3 — Pantala", pov: "Sundew" },
  { num: 14, title: "The Dangerous Gift", arc: "Arc 3 — Pantala", pov: "Snowfall" },
  { num: 15, title: "The Flames of Hope", arc: "Arc 3 — Pantala", pov: "Luna" },
];

/* ============ MCQ ============ */
export type MCQ = { q: string; options: string[]; answer: number; fact?: string };
export const MCQS: MCQ[] = [
  { q: "Which tribe can spit deadly venom AND change color?", options: ["RainWings", "NightWings", "SeaWings", "MudWings"], answer: 0, fact: "RainWing venom melts scales — and their scales shift color like a chameleon." },
  { q: "Who is the only SkyWing born WITHOUT fire?", options: ["Peril", "Scarlet", "Ruby", "Kestrel"], answer: 0, fact: "Wait — Peril was born WITH too much fire (firescales). The flameless SkyWing is actually her twin brother, Cliff’s uncle… Tip: re-read Escaping Peril!" },
  { q: "Who wrote the Wings of Fire series?", options: ["Tui T. Sutherland", "Rick Riordan", "Christopher Paolini", "Cressida Cowell"], answer: 0 },
  { q: "How many dragonets are in the original prophecy?", options: ["5", "3", "7", "4"], answer: 0 },
  { q: "Which dragon REPLACED the missing SkyWing egg in the prophecy?", options: ["Glory the RainWing", "Peril the SkyWing", "Sunny the SandWing", "Kinkajou the RainWing"], answer: 0 },
  { q: "The War of SandWing Succession was fought between Burn, Blister and…", options: ["Blaze", "Smolder", "Thorn", "Oasis"], answer: 0, fact: "Three sisters fought for the throne after their mother Queen Oasis was killed." },
  { q: "What is the name of the NightWing animus dragon who lived 2,000 years ago?", options: ["Darkstalker", "Stonemover", "Fathom", "Albatross"], answer: 0 },
  { q: "Which IceWing prince is Moonwatcher's friend at Jade Mountain?", options: ["Winter", "Hailstorm", "Snowfall", "Lynx"], answer: 0 },
  { q: "What language do SeaWings use to talk underwater?", options: ["Aquatic", "Marinese", "Tidetongue", "Coralcode"], answer: 0, fact: "Aquatic uses flashing bioluminescent stripes." },
  { q: "Which queen rules the SeaWings during Arc 1?", options: ["Queen Coral", "Queen Glacier", "Queen Moorhen", "Queen Ruby"], answer: 0 },
  { q: "On Pantala, who controls the HiveWings' minds?", options: ["Queen Wasp", "Queen Sequoia", "Lady Jewel", "Cinnabar"], answer: 0, fact: "Through the breath of evil — a plant from Clearsight's ancient vision." },
  { q: "SilkWings grow their wings at what age?", options: ["6", "1", "10", "At hatching"], answer: 0, fact: "The wing-growing ceremony is called Metamorphosis." },
  { q: "Which tribe was believed extinct for 50 years but survived in the Poison Jungle?", options: ["LeafWings", "NightWings", "IceWings", "MudWings"], answer: 0 },
  { q: "Who is Sunny's mother?", options: ["Thorn", "Burn", "Blaze", "Oasis"], answer: 0, fact: "Thorn leads the Outclaws and later becomes SandWing queen." },
  { q: "What special power do MudWings hatched in sunlight have?", options: ["Breathing fire", "Reading minds", "Camouflage", "Frostbreath"], answer: 0 },
  { q: "Peril's signature ability is…", options: ["Firescales — anything she touches burns", "Mind reading", "Animus magic", "Venom spit"], answer: 0 },
  { q: "What does an 'animus' dragon do?", options: ["Cast magic by enchanting objects", "Read minds", "See the future", "Spit venom"], answer: 0, fact: "Each spell takes a piece of the animus dragon's soul." },
  { q: "Which continent is Arc 3 set on?", options: ["Pantala", "Pyrrhia", "Aetheria", "Tui"], answer: 0 },
  { q: "Who is Darkstalker's mother?", options: ["Foeslayer (an IceWing)", "Clearsight", "Quickdeath", "Vigilance"], answer: 0 },
  { q: "What body of water separates Pyrrhia and Pantala?", options: ["The Distant Sea", "The Bay of a Thousand Scales", "The Diamond Spray River", "Lake Scorpion"], answer: 0 },
];

/* ============ Fill in the Blanks ============ */
export type Fill = { sentence: string; answer: string; hint?: string };
export const FILLS: Fill[] = [
  { sentence: "The five Dragonets of Destiny were hidden under the mountain by the ____ of Peace.", answer: "Talons", hint: "starts with T" },
  { sentence: "____ Wing princess Tsunami discovered she is the daughter of Queen Coral.", answer: "Sea" },
  { sentence: "Glory the RainWing becomes the first joint RainWing and ____ Wing queen.", answer: "Night" },
  { sentence: "Queen Oasis was killed when her ____ was stolen by a scavenger.", answer: "treasure", hint: "8 letters — what dragons hoard" },
  { sentence: "IceWings rank each other in the Seven ____ — first circle is highest.", answer: "Circles" },
  { sentence: "SilkWings spin silk from their ____ when they reach metamorphosis.", answer: "wrists" },
  { sentence: "The HiveWing queen who controls minds is Queen ____.", answer: "Wasp" },
  { sentence: "Peril's deadly ability is called ____ scales.", answer: "fire" },
  { sentence: "The ancient NightWing animus and seer is named ____.", answer: "Darkstalker" },
  { sentence: "Sunny's father, the NightWing scientist, is ____.", answer: "Stonemover" },
  { sentence: "Moonwatcher reads minds because she hatched under ____ moons.", answer: "two" },
  { sentence: "The school where Arc 2 takes place is ____ Mountain Academy.", answer: "Jade" },
  { sentence: "The continent Arc 3 is set on is called ____.", answer: "Pantala" },
  { sentence: "Clay belongs to a sibling group called a ____.", answer: "troop" },
  { sentence: "Glory's pet sloth is named ____.", answer: "Silver" },
];

/* ============ Flash Cards ============ */
export type Flash = { front: string; back: string };
export const FLASHES: Flash[] = TRIBES.map((t) => ({
  front: `${t.emoji}  ${t.name}`,
  back: `Habitat: ${t.habitat}\nAbility: ${t.ability}\n\n${t.fact}`,
})).concat([
  { front: "Clay", back: "MudWing dragonet of destiny. Big-hearted, fireproof, raised as the protector of his cave-siblings." },
  { front: "Tsunami", back: "SeaWing princess, daughter of Queen Coral. Fierce, hot-tempered, leader of her dragonet group." },
  { front: "Glory", back: "RainWing dragonet who replaced the missing SkyWing. Becomes joint RainWing/NightWing queen." },
  { front: "Starflight", back: "NightWing dragonet. The scholar of the group. Loses his sight in the volcanic eruption (Book 5)." },
  { front: "Sunny", back: "SandWing/NightWing hybrid. Small, optimistic, daughter of Thorn (later SandWing queen)." },
  { front: "Peril", back: "SkyWing with firescales — anything she touches bursts into flame. Loyal to Clay." },
  { front: "Moonwatcher", back: "NightWing who can truly read minds and see futures because she hatched under two moons." },
  { front: "Darkstalker", back: "Ancient NightWing animus, mind-reader AND seer. Imprisoned for 2,000 years; freed in Book 9." },
  { front: "Animus magic", back: "Lets a dragon enchant objects with spells — but every spell takes a piece of their soul." },
  { front: "Aquatic", back: "The SeaWings' underwater language of flashing bioluminescent stripes." },
]);

/* ============ True or False ============ */
export type TF = { statement: string; isTrue: boolean; fact: string };
export const TFS: TF[] = [
  { statement: "RainWings can change the color of their scales.", isTrue: true, fact: "Their scales shift color like a chameleon — perfect rainforest camouflage." },
  { statement: "All NightWings can read minds and see the future.", isTrue: false, fact: "Almost none can! The tribe FAKED these powers for centuries. Only dragons hatched under two moons truly have them." },
  { statement: "SeaWings communicate underwater using a glowing-stripe language called Aquatic.", isTrue: true, fact: "Royal SeaWings get extra stripes when they’re named heir." },
  { statement: "SandWing tail venom can be cured with regular honey.", isTrue: false, fact: "It's a deadly toxin — only a very specific cactus paste can slow it." },
  { statement: "IceWings have serrated claws designed to grip ice.", isTrue: true, fact: "They also exhale frostbreath that freezes on contact." },
  { statement: "LeafWings were really extinct after the Tree Wars.", isTrue: false, fact: "They survived hidden in the Poison Jungle for 50 years." },
  { statement: "Peril has firescales — anything she touches catches fire.", isTrue: true, fact: "She wears a flame-proof necklace later to safely touch dragons she loves." },
  { statement: "SilkWings hatch with full wings.", isTrue: false, fact: "They hatch wingless and grow wings during Metamorphosis around age 6." },
  { statement: "Animus dragons lose a piece of their soul every time they use magic.", isTrue: true, fact: "That’s why animus magic is so dangerous — too many spells turn a dragon evil." },
  { statement: "Queen Wasp controls HiveWings through a special plant.", isTrue: true, fact: "It's called the breath of evil — discovered in Clearsight's ancient vision." },
  { statement: "Sunny is a pure SandWing.", isTrue: false, fact: "She's actually half-NightWing — her father is Stonemover." },
  { statement: "MudWings born in sunlight can breathe fire.", isTrue: true, fact: "MudWings born in shade cannot — and they’re considered unlucky." },
];

/* ============ Tribe Match (pairs) ============ */
export type Pair = { tribe: string; ability: string };
export const PAIRS: Pair[] = [
  { tribe: "RainWings", ability: "Venom + color-change" },
  { tribe: "IceWings", ability: "Frostbreath" },
  { tribe: "SeaWings", ability: "Glow underwater" },
  { tribe: "SandWings", ability: "Venomous barbed tail" },
  { tribe: "NightWings", ability: "Mind-read (rare)" },
  { tribe: "SilkWings", ability: "Spin silk" },
  { tribe: "HiveWings", ability: "Stingers & acid" },
  { tribe: "LeafWings", ability: "Leafspeak" },
];

/* ============ Quotes — who said it ============ */
export type Quote = { line: string; speaker: string; options: string[] };
export const QUOTES: Quote[] = [
  {
    line: "“I will be the greatest queen the NightWings have ever seen.”",
    speaker: "Glory",
    options: ["Glory", "Moonwatcher", "Starflight", "Tsunami"],
  },
  {
    line: "“My name is Sunny. I’m a SandWing. Mostly.”",
    speaker: "Sunny",
    options: ["Sunny", "Glory", "Tsunami", "Peril"],
  },
  {
    line: "“Anything I touch — bursts into flame.”",
    speaker: "Peril",
    options: ["Peril", "Scarlet", "Burn", "Ruby"],
  },
  {
    line: "“The dragonets are coming…”",
    speaker: "The Prophecy",
    options: ["The Prophecy", "Morrowseer", "Queen Scarlet", "Tui"],
  },
  {
    line: "“I’m the protector. That’s my job.”",
    speaker: "Clay",
    options: ["Clay", "Winter", "Qibli", "Riptide"],
  },
];
