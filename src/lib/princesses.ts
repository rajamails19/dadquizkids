/* ============================================================
   PRINCESS ARENA — canon-ish data from classic fairy tales
   (Perrault, Grimm, Hans Christian Andersen, Beaumont)
   Mirrors the structure of wings-of-fire.ts
   ============================================================ */

export type Mcq = { q: string; options: string[]; answer: number; fact?: string };
export type Fill = { sentence: string; answer: string; hint?: string };
export type Flash = { front: string; back: string };
export type Tf = { statement: string; isTrue: boolean; fact: string };
export type Pair = { princess: string; item: string };
export type Quote = { line: string; speaker: string; options: string[] };

export type Princess = {
  name: string;
  emoji: string;
  tale: string;
  item: string;
  kingdom: string;
  color: string; // tailwind gradient
  fact: string;
};

export type Kingdom = {
  name: string;
  ruler: string;
  emoji: string;
  flavor: string;
};

export type Tale = {
  num: number;
  title: string;
  author: string;
  year: string;
  oneLine: string;
};

/* ---------------- MCQs ---------------- */
export const MCQS: Mcq[] = [
  { q: "Which princess loses a glass slipper at midnight?", options: ["Cinderella", "Rapunzel", "Snow White", "Aurora"], answer: 0, fact: "Charles Perrault wrote it in 1697 — 'verre' means glass in French." },
  { q: "Who pricks her finger on a spindle and falls into a 100-year sleep?", options: ["Sleeping Beauty", "Belle", "Cinderella", "Tiana"], answer: 0, fact: "Her name is Aurora in Perrault's version." },
  { q: "Which princess lives in a tower with very, very long hair?", options: ["Rapunzel", "Snow White", "Jasmine", "Mulan"], answer: 0, fact: "The Brothers Grimm published her tale in 1812." },
  { q: "What fruit puts Snow White to sleep?", options: ["Apple", "Pear", "Peach", "Cherry"], answer: 0, fact: "A poisoned apple from the wicked queen, of course." },
  { q: "How many dwarfs live with Snow White?", options: ["Seven", "Five", "Six", "Eight"], answer: 0, fact: "Doc, Grumpy, Happy, Sleepy, Bashful, Sneezy, Dopey." },
  { q: "Which princess can talk to fish and seagulls?", options: ["The Little Mermaid", "Cinderella", "Belle", "Rapunzel"], answer: 0, fact: "Andersen wrote her story in 1837." },
  { q: "Beauty falls in love with whom?", options: ["The Beast", "A frog", "A prince in a tower", "A wizard"], answer: 0, fact: "A French fairy tale by Madame de Beaumont (1756)." },
  { q: "What does the frog turn into when the princess keeps her promise?", options: ["A prince", "A dragon", "A king", "A bird"], answer: 0, fact: "The Grimm brothers' very first tale!" },
  { q: "What proves the princess is REAL in 'The Princess and the Pea'?", options: ["She feels the pea under 20 mattresses", "She has long hair", "She owns a tiara", "She can sing"], answer: 0, fact: "Andersen wrote it in 1835." },
  { q: "Who saves Snow White?", options: ["A prince's kiss", "Her father", "The huntsman", "A fairy"], answer: 0, fact: "Or she coughs up the apple — depends on the version!" },
  { q: "Cinderella has a magical helper called…", options: ["Fairy Godmother", "Witch", "Mermaid", "Wizard"], answer: 0 },
  { q: "Rapunzel's tower has…", options: ["No door, only a window", "Only a back door", "Three floors", "A drawbridge"], answer: 0, fact: "The witch climbs up using her hair." },
  { q: "What does Cinderella's carriage start as?", options: ["A pumpkin", "A melon", "A tomato", "An apple"], answer: 0 },
  { q: "Sleeping Beauty is woken by…", options: ["A kiss", "A song", "Sunlight", "A dwarf"], answer: 0 },
  { q: "Which princess trades her voice for legs?", options: ["The Little Mermaid", "Snow White", "Cinderella", "Aurora"], answer: 0, fact: "She bargains with the Sea Witch." },
  { q: "How many fairies bless baby Aurora?", options: ["Three", "Five", "Seven", "Twelve"], answer: 0 },
  { q: "Belle's favourite thing is…", options: ["Books", "Roses", "Singing", "Cooking"], answer: 0 },
  { q: "What does the Beast give Belle that mustn't be picked from his garden?", options: ["A rose", "An apple", "A pumpkin", "A peach"], answer: 0 },
  { q: "Who is Tiana's animal friend?", options: ["Louis the alligator", "Sebastian the crab", "Flounder the fish", "Pascal the lizard"], answer: 0 },
  { q: "Mulan disguises herself as a…", options: ["Soldier", "Wizard", "Farmer", "Doctor"], answer: 0, fact: "From the 6th-century Chinese 'Ballad of Mulan'." },
];

/* ---------------- Fill in the blanks ---------------- */
export const FILLS: Fill[] = [
  { sentence: "Cinderella's coach turns back into a ____ at midnight.", answer: "pumpkin" },
  { sentence: "Rapunzel, Rapunzel, let down your ____.", answer: "hair" },
  { sentence: "Snow White is poisoned by a red ____.", answer: "apple" },
  { sentence: "Sleeping Beauty pricks her finger on a ____.", answer: "spindle" },
  { sentence: "Beauty falls in love with the ____.", answer: "beast" },
  { sentence: "The Little Mermaid gives up her ____ to walk on land.", answer: "voice" },
  { sentence: "A real princess can feel a tiny ____ under 20 mattresses.", answer: "pea" },
  { sentence: "Cinderella loses one ____ slipper on the palace steps.", answer: "glass" },
  { sentence: "Snow White lives with the ____ dwarfs.", answer: "seven" },
  { sentence: "Belle's enchanted friend is a candlestick named ____.", answer: "lumiere", hint: "French for 'light'" },
  { sentence: "The frog becomes a prince after the princess keeps her ____.", answer: "promise" },
  { sentence: "Mulan goes to war in place of her ____.", answer: "father" },
];

/* ---------------- Flash cards ---------------- */
export const FLASHES: Flash[] = [
  { front: "Cinderella", back: "Lost a glass slipper at midnight.\nMice = besties.\nFairy Godmother = magic." },
  { front: "Snow White", back: "Fairest of them all.\n7 dwarfs.\nPoisoned by an apple, woken by a kiss." },
  { front: "Sleeping Beauty (Aurora)", back: "Cursed to sleep 100 years.\nWoken by true love's kiss.\nThree good fairies raised her in the woods." },
  { front: "Rapunzel", back: "Tower with no door.\nLonger hair than your imagination.\nHer tears can heal." },
  { front: "The Little Mermaid", back: "Daughter of the Sea King.\nTraded her voice for human legs.\nLoves collecting human treasures." },
  { front: "Belle", back: "Bookworm princess.\nLives in an enchanted castle with talking furniture.\nSees the prince inside the Beast." },
  { front: "Tiana", back: "Dreams of opening her own restaurant.\nKisses a frog (and becomes one for a bit).\nFrom New Orleans." },
  { front: "Mulan", back: "Disguises herself as a soldier to save her father.\nFriends with Mushu the tiny dragon.\nBased on a 1500-year-old Chinese ballad." },
  { front: "Jasmine", back: "Princess of Agrabah.\nWants to choose her own husband.\nBest friend: Rajah the tiger." },
  { front: "The Princess and the Pea", back: "Could feel ONE tiny pea under 20 mattresses.\nThat's how the queen knew she was real royalty.\nHans Christian Andersen, 1835." },
];

/* ---------------- True / False ---------------- */
export const TFS: Tf[] = [
  { statement: "Cinderella's slipper is made of glass.", isTrue: true, fact: "Yes! In Perrault's 1697 French version it's verre — glass." },
  { statement: "Snow White is woken up by a song.", isTrue: false, fact: "She's woken by a prince's kiss (or by coughing up the apple)." },
  { statement: "Rapunzel's hair is magical.", isTrue: true, fact: "It glows AND her tears can heal — that's why the witch wanted her." },
  { statement: "The Little Mermaid trades her hair for legs.", isTrue: false, fact: "She trades her VOICE for legs." },
  { statement: "Sleeping Beauty sleeps for one hundred years.", isTrue: true, fact: "Exactly 100 — and the whole castle sleeps with her." },
  { statement: "Belle's enchanted castle has talking dishes and candlesticks.", isTrue: true, fact: "Mrs. Potts, Chip, Lumière and Cogsworth." },
  { statement: "Mulan is from Greece.", isTrue: false, fact: "She's from China — the ballad is over 1500 years old." },
  { statement: "Tiana wants to be a doctor.", isTrue: false, fact: "She wants to open her own restaurant." },
  { statement: "The frog prince was cursed by a witch.", isTrue: true, fact: "The princess keeping her promise breaks the spell." },
  { statement: "Aurora was raised in a forest cottage by three fairies.", isTrue: true, fact: "Flora, Fauna and Merryweather, to hide her from the curse." },
  { statement: "Jasmine has a pet dolphin.", isTrue: false, fact: "She has a pet tiger named Rajah." },
  { statement: "The Princess and the Pea is by Hans Christian Andersen.", isTrue: true, fact: "Published in 1835 in Denmark." },
];

/* ---------------- Match princess → item ---------------- */
export const PAIRS: Pair[] = [
  { princess: "Cinderella", item: "👠 Glass slipper" },
  { princess: "Snow White", item: "🍎 Poisoned apple" },
  { princess: "Sleeping Beauty", item: "🪡 Spindle" },
  { princess: "Rapunzel", item: "💇 Magic long hair" },
  { princess: "The Little Mermaid", item: "🐚 Lost voice" },
  { princess: "Belle", item: "🌹 Enchanted rose" },
  { princess: "Frog Princess", item: "👑 Golden ball" },
  { princess: "Mulan", item: "⚔️ Sword" },
];

/* ---------------- Who said it? ---------------- */
export const QUOTES: Quote[] = [
  { line: "Mirror, mirror on the wall, who's the fairest of them all?", speaker: "Evil Queen", options: ["Evil Queen", "Snow White", "Cinderella", "Aurora"] },
  { line: "Rapunzel, Rapunzel, let down your hair!", speaker: "The Prince", options: ["The Prince", "The Witch", "Rapunzel", "The King"] },
  { line: "I want adventure in the great wide somewhere!", speaker: "Belle", options: ["Belle", "Mulan", "Cinderella", "Jasmine"] },
  { line: "A dream is a wish your heart makes.", speaker: "Cinderella", options: ["Cinderella", "Aurora", "Tiana", "Snow White"] },
  { line: "I want to be where the people are.", speaker: "The Little Mermaid", options: ["The Little Mermaid", "Belle", "Rapunzel", "Jasmine"] },
  { line: "I'm not a prize to be won!", speaker: "Jasmine", options: ["Jasmine", "Mulan", "Tiana", "Belle"] },
  { line: "Almost there… almost there!", speaker: "Tiana", options: ["Tiana", "Belle", "Cinderella", "Aurora"] },
  { line: "I'll make a man out of you!", speaker: "Mulan", options: ["Mulan", "Belle", "Jasmine", "Tiana"] },
];

/* ---------------- Codex: Princesses ---------------- */
export const PRINCESSES: Princess[] = [
  { name: "Cinderella", emoji: "👠", tale: "Cinderella", item: "Glass slipper", kingdom: "A French kingdom", color: "from-blue-400 to-indigo-500", fact: "Her mice friends sew her gown — that's why mice show up in every retelling." },
  { name: "Snow White", emoji: "🍎", tale: "Snow White & 7 Dwarfs", item: "Poisoned apple", kingdom: "A German forest realm", color: "from-rose-400 to-red-500", fact: "She's the FIRST Disney princess (1937) — hand-drawn frame by frame." },
  { name: "Aurora", emoji: "🌹", tale: "Sleeping Beauty", item: "Spindle of fate", kingdom: "The kingdom of King Stefan", color: "from-pink-400 to-fuchsia-500", fact: "Aurora literally means 'dawn' in Latin." },
  { name: "Rapunzel", emoji: "💇", tale: "Rapunzel", item: "70-foot magic hair", kingdom: "The tower in the woods", color: "from-yellow-400 to-amber-500", fact: "Her hair is 70 feet long in the original Grimm tale." },
  { name: "Ariel", emoji: "🐚", tale: "The Little Mermaid", item: "Her singing voice", kingdom: "Atlantica, under the sea", color: "from-teal-400 to-cyan-500", fact: "Andersen's original 1837 mermaid does NOT get the prince — Disney softened the ending." },
  { name: "Belle", emoji: "📚", tale: "Beauty & the Beast", item: "Enchanted rose", kingdom: "A French village + cursed castle", color: "from-amber-400 to-orange-500", fact: "First princess to wear pants (in one scene) — and her favourite book is about adventure." },
  { name: "Tiana", emoji: "🐸", tale: "The Princess & the Frog", item: "A green frog kiss", kingdom: "New Orleans, Louisiana", color: "from-emerald-400 to-green-600", fact: "Inspired by 1920s New Orleans chef Leah Chase." },
  { name: "Mulan", emoji: "⚔️", tale: "The Ballad of Mulan", item: "A sword + Mushu", kingdom: "Imperial China", color: "from-red-500 to-rose-600", fact: "Based on a 1500-year-old Chinese folk poem — possibly real history." },
  { name: "Jasmine", emoji: "🐅", tale: "Aladdin", item: "Magic lamp wishes", kingdom: "Agrabah", color: "from-cyan-500 to-sky-600", fact: "First Disney princess to marry a non-prince (Aladdin was a street boy)." },
  { name: "Pea Princess", emoji: "🛏️", tale: "The Princess & the Pea", item: "One single pea", kingdom: "A Danish castle", color: "from-violet-400 to-purple-500", fact: "Andersen's whole story is only 4 paragraphs long." },
];

/* ---------------- Codex: Kingdoms ---------------- */
export const KINGDOMS: Kingdom[] = [
  { name: "Agrabah", ruler: "Sultan + Jasmine", emoji: "🏜️", flavor: "Desert kingdom of magic lamps and flying carpets." },
  { name: "Atlantica", ruler: "King Triton", emoji: "🌊", flavor: "Underwater realm ruled by a merman king with a trident." },
  { name: "Arendelle", ruler: "Queen Elsa", emoji: "❄️", flavor: "Nordic-style mountain kingdom with permanent winter possibilities." },
  { name: "Corona", ruler: "King & Queen of Corona", emoji: "🏰", flavor: "Coastal kingdom where lanterns are released for the lost princess." },
  { name: "Maldonia", ruler: "Prince Naveen's family", emoji: "🎷", flavor: "A small European kingdom whose prince ends up in jazz-age New Orleans." },
  { name: "DunBroch", ruler: "King Fergus & Queen Elinor", emoji: "🏹", flavor: "Highland Scottish kingdom of bears, bows and family curses." },
];

/* ---------------- Codex: Tales / books ---------------- */
export const TALES: Tale[] = [
  { num: 1, title: "Cinderella", author: "Charles Perrault", year: "1697", oneLine: "Pumpkin → coach. Mice → horses. Midnight → reality." },
  { num: 2, title: "Snow White", author: "Brothers Grimm", year: "1812", oneLine: "Mirror, apple, seven dwarfs, glass coffin." },
  { num: 3, title: "Sleeping Beauty", author: "Perrault / Grimm", year: "1697", oneLine: "100-year nap thanks to one bad fairy." },
  { num: 4, title: "Rapunzel", author: "Brothers Grimm", year: "1812", oneLine: "Tower, hair, witch — and tears that heal." },
  { num: 5, title: "The Little Mermaid", author: "H. C. Andersen", year: "1837", oneLine: "Voice for legs — a much sadder original ending." },
  { num: 6, title: "Beauty and the Beast", author: "Madame de Beaumont", year: "1756", oneLine: "Don't judge a beast by its claws." },
  { num: 7, title: "The Frog Prince", author: "Brothers Grimm", year: "1812", oneLine: "Promise kept, frog flipped, prince unlocked." },
  { num: 8, title: "The Princess and the Pea", author: "H. C. Andersen", year: "1835", oneLine: "20 mattresses, 1 pea, 1 royal bruise." },
  { num: 9, title: "The Ballad of Mulan", author: "Anonymous, China", year: "~6th c.", oneLine: "A daughter takes her father's place in the emperor's army." },
  { num: 10, title: "Aladdin & the Magic Lamp", author: "Arabian Nights", year: "~1100s", oneLine: "Genie. Three wishes. One unstoppable princess." },
];
