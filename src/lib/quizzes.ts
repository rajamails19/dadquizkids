import coverAnimals from "@/assets/cover-animals.jpg";
import coverPrincess from "@/assets/cover-princess.jpg";
import coverColors from "@/assets/cover-colors.jpg";
import coverFriends from "@/assets/cover-friends.jpg";
import coverFlagsGirl from "@/assets/cover-flags-girl.jpg";
import coverFlagsBoy from "@/assets/cover-flags-boy.jpg";
import coverScience from "@/assets/cover-science.jpg";
import coverChess from "@/assets/cover-chess.jpg";
import coverDragons from "@/assets/cover-dragons.jpg";
import coverSpace from "@/assets/cover-space.jpg";
import coverLandmarks from "@/assets/cover-landmarks.jpg";
import coverBlocks from "@/assets/cover-blocks.jpg";
import type { Mode } from "./mode";

export type Question = {
  /** Big visual prompt — can be an emoji string (rendered huge) or text */
  visual: string;
  /** Optional helper text shown under the visual */
  prompt: string;
  options: string[];
  /** Index of the correct option in options[] */
  answer: number;
  /** Optional fun fact shown after answering */
  fact?: string;
  /** Optional emoji per option — shown next to text in girl mode for pre-readers */
  optionEmojis?: string[];
  /** Optional step-by-step working shown in the side panel after answering */
  steps?: string[];
};

export type Quiz = {
  id: string;
  mode: Mode;
  title: string;
  tagline: string;
  cover: string;
  accent: string; // tailwind class for chip
  questions: Question[];
  /** Optional grouping key — e.g. "math-subtraction" renders in its own section */
  section?: string;
  /** Badge label shown on the card — e.g. "📖 Lesson" */
  sectionLabel?: string;
};

const flagQ = (emoji: string, country: string, distractors: string[], fact?: string): Question => ({
  visual: emoji,
  prompt: "Which country is this flag from?",
  options: shuffleWithAnswer(country, distractors),
  answer: 0, // overwritten below
  fact,
});

function shuffleWithAnswer(correct: string, distractors: string[]) {
  return [correct, ...distractors];
}

function withAnswer(q: Question): Question {
  // Randomize options but keep answer index correct
  const correct = q.options[q.answer];
  const arr = [...q.options];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return { ...q, options: arr, answer: arr.indexOf(correct) };
}

const finalize = (qs: Question[]) =>
  qs.map((q) => {
    // For flagQ helper, answer index needs fixing because we built [correct, ...distractors]
    if (q.answer === 0 && q.prompt.startsWith("Which country")) {
      return withAnswer({ ...q, answer: 0 });
    }
    return withAnswer(q);
  });

/* ---------------- GIRL QUIZZES ---------------- */

const girlAnimals: Quiz = {
  id: "girl-animals",
  mode: "girl",
  title: "Cute Animals",
  tagline: "Spot the friendly creature",
  cover: coverAnimals,
  accent: "from-pink-300 to-rose-200",
  questions: finalize([
    { visual: "🐘", prompt: "Which animal is this?", options: ["Elephant", "Hippo", "Rhino", "Cow"], answer: 0, fact: "Elephants are the biggest land animal!", optionEmojis: ["🐘", "🦛", "🦏", "🐄"] },
    { visual: "🦁", prompt: "Which animal is this?", options: ["Lion", "Tiger", "Cheetah", "Cat"], answer: 0, fact: "A lion's roar can be heard 5 miles away!", optionEmojis: ["🦁", "🐯", "🐆", "🐱"] },
    { visual: "🦒", prompt: "Which animal is this?", options: ["Giraffe", "Horse", "Llama", "Camel"], answer: 0, fact: "Giraffes have very long necks to reach leaves.", optionEmojis: ["🦒", "🐴", "🦙", "🐪"] },
    { visual: "🐰", prompt: "Which animal is this?", options: ["Bunny", "Mouse", "Squirrel", "Deer"], answer: 0, fact: "Bunnies love to hop and eat carrots!", optionEmojis: ["🐰", "🐭", "🐿️", "🦌"] },
    { visual: "🐱", prompt: "Which animal is this?", options: ["Kitty", "Puppy", "Fox", "Bear"], answer: 0, fact: "Cats purr when they are happy.", optionEmojis: ["🐱", "🐶", "🦊", "🐻"] },
    { visual: "🐶", prompt: "Which animal is this?", options: ["Puppy", "Wolf", "Bear", "Fox"], answer: 0, fact: "Dogs wag their tails when excited!", optionEmojis: ["🐶", "🐺", "🐻", "🦊"] },
    { visual: "🐼", prompt: "Which animal is this?", options: ["Panda", "Bear", "Koala", "Cow"], answer: 0, fact: "Pandas love bamboo!", optionEmojis: ["🐼", "🐻", "🐨", "🐄"] },
    { visual: "🐧", prompt: "Which animal is this?", options: ["Penguin", "Duck", "Owl", "Swan"], answer: 0, fact: "Penguins waddle on ice but swim like fish.", optionEmojis: ["🐧", "🦆", "🦉", "🦢"] },
    { visual: "🦊", prompt: "Which animal is this?", options: ["Fox", "Wolf", "Dog", "Cat"], answer: 0, fact: "Foxes are very clever and sneaky!", optionEmojis: ["🦊", "🐺", "🐶", "🐱"] },
    { visual: "🐨", prompt: "Which animal is this?", options: ["Koala", "Bear", "Panda", "Sloth"], answer: 0, fact: "Koalas sleep up to 22 hours a day!", optionEmojis: ["🐨", "🐻", "🐼", "🦥"] },
    { visual: "🦋", prompt: "Which animal is this?", options: ["Butterfly", "Dragonfly", "Bee", "Moth"], answer: 0, fact: "Butterflies taste with their feet!", optionEmojis: ["🦋", "🪲", "🐝", "🦟"] },
    { visual: "🐬", prompt: "Which animal is this?", options: ["Dolphin", "Shark", "Whale", "Fish"], answer: 0, fact: "Dolphins are one of the smartest animals.", optionEmojis: ["🐬", "🦈", "🐳", "🐟"] },
    { visual: "🦜", prompt: "Which animal is this?", options: ["Parrot", "Toucan", "Flamingo", "Eagle"], answer: 0, fact: "Parrots can learn to say words just like us!", optionEmojis: ["🦜", "🐦", "🦩", "🦅"] },
    { visual: "🐢", prompt: "Which animal is this?", options: ["Turtle", "Frog", "Lizard", "Snail"], answer: 0, fact: "Turtles can live for over 100 years!", optionEmojis: ["🐢", "🐸", "🦎", "🐌"] },
    { visual: "🦓", prompt: "Which animal is this?", options: ["Zebra", "Horse", "Donkey", "Pony"], answer: 0, fact: "Every zebra has a unique stripe pattern.", optionEmojis: ["🦓", "🐴", "🫏", "🐎"] },
    { visual: "🐙", prompt: "Which animal is this?", options: ["Octopus", "Squid", "Crab", "Jellyfish"], answer: 0, fact: "Octopuses have three hearts!", optionEmojis: ["🐙", "🦑", "🦀", "🪼"] },
    { visual: "🦘", prompt: "Which animal is this?", options: ["Kangaroo", "Rabbit", "Deer", "Wallaby"], answer: 0, fact: "Baby kangaroos are called joeys!", optionEmojis: ["🦘", "🐰", "🦌", "🐾"] },
    { visual: "🐦", prompt: "Which animal is this?", options: ["Bird", "Bat", "Butterfly", "Bee"], answer: 0, fact: "Birds are the only animals with feathers.", optionEmojis: ["🐦", "🦇", "🦋", "🐝"] },
  ]),
};

const girlColors: Quiz = {
  id: "girl-colors",
  mode: "girl",
  title: "Colors & Shapes",
  tagline: "Easy rainbow wins",
  cover: coverColors,
  accent: "from-pink-200 to-purple-200",
  questions: finalize([
    { visual: "🔴", prompt: "What color is this?", options: ["Red", "Blue", "Green", "Pink"], answer: 0 },
    { visual: "🔵", prompt: "What color is this?", options: ["Blue", "Purple", "Red", "Black"], answer: 0 },
    { visual: "🟢", prompt: "What color is this?", options: ["Green", "Yellow", "Blue", "Orange"], answer: 0 },
    { visual: "🟡", prompt: "What color is this?", options: ["Yellow", "Orange", "Green", "Pink"], answer: 0 },
    { visual: "🟣", prompt: "What color is this?", options: ["Purple", "Pink", "Blue", "Red"], answer: 0 },
    { visual: "🟠", prompt: "What color is this?", options: ["Orange", "Yellow", "Red", "Brown"], answer: 0 },
    { visual: "⭐", prompt: "What shape is this?", options: ["Star", "Heart", "Circle", "Square"], answer: 0 },
    { visual: "❤️", prompt: "What shape is this?", options: ["Heart", "Star", "Diamond", "Moon"], answer: 0 },
    { visual: "🔺", prompt: "What shape is this?", options: ["Triangle", "Square", "Circle", "Star"], answer: 0 },
    { visual: "🟦", prompt: "What shape is this?", options: ["Square", "Triangle", "Circle", "Heart"], answer: 0 },
    { visual: "⬛", prompt: "What color is this?", options: ["Black", "White", "Grey", "Brown"], answer: 0 },
    { visual: "⬜", prompt: "What color is this?", options: ["White", "Black", "Silver", "Cream"], answer: 0 },
    { visual: "🟤", prompt: "What color is this?", options: ["Brown", "Orange", "Red", "Gold"], answer: 0 },
    { visual: "🔶", prompt: "What shape is this?", options: ["Diamond", "Square", "Triangle", "Star"], answer: 0 },
    { visual: "🔵🟡", prompt: "What do blue and yellow make?", options: ["Green", "Purple", "Orange", "Pink"], answer: 0 },
    { visual: "🔴🔵", prompt: "What do red and blue make?", options: ["Purple", "Green", "Orange", "Brown"], answer: 0 },
    { visual: "🔴🟡", prompt: "What do red and yellow make?", options: ["Orange", "Pink", "Brown", "Purple"], answer: 0 },
    { visual: "⭕", prompt: "What shape is this?", options: ["Circle", "Oval", "Square", "Ring"], answer: 0 },
    { visual: "🌈", prompt: "How many colors are in a rainbow?", options: ["7", "5", "6", "8"], answer: 0 },
    { visual: "🎨", prompt: "Which is NOT a primary color?", options: ["Green", "Red", "Blue", "Yellow"], answer: 0 },
  ]),
};

const girlPrincess: Quiz = {
  id: "girl-princess",
  mode: "girl",
  title: "Princess Magic",
  tagline: "Crowns, wands & sparkles",
  cover: coverPrincess,
  accent: "from-fuchsia-300 to-pink-200",
  questions: finalize([
    { visual: "👑", prompt: "What does a princess wear on her head?", options: ["Crown", "Hat", "Shoe", "Scarf"], answer: 0 },
    { visual: "✨", prompt: "What comes out of a magic wand?", options: ["Sparkles", "Water", "Mud", "Sand"], answer: 0 },
    { visual: "🏰", prompt: "Where does a princess live?", options: ["Castle", "Cave", "Boat", "Tent"], answer: 0 },
    { visual: "🐸", prompt: "In a fairy tale, a kiss turns a frog into a…", options: ["Prince", "Bird", "Fish", "Tree"], answer: 0 },
    { visual: "🍎", prompt: "Snow White took a bite of a magic…", options: ["Apple", "Banana", "Cake", "Cookie"], answer: 0 },
    { visual: "👠", prompt: "Cinderella lost her glass…", options: ["Slipper", "Glove", "Hat", "Ring"], answer: 0 },
    { visual: "🧜‍♀️", prompt: "A princess who lives in the sea is a…", options: ["Mermaid", "Fairy", "Witch", "Pirate"], answer: 0 },
    { visual: "🌹", prompt: "Beauty fell in love with the…", options: ["Beast", "Wolf", "Dragon", "Frog"], answer: 0 },
    { visual: "🧚", prompt: "What do fairies have on their back?", options: ["Wings", "Shell", "Cape", "Horns"], answer: 0 },
    { visual: "🪄", prompt: "What does a fairy godmother use to grant wishes?", options: ["Magic wand", "Broomstick", "Crystal ball", "Spell book"], answer: 0 },
    { visual: "💤", prompt: "Sleeping Beauty slept because she pricked her…", options: ["Finger", "Toe", "Arm", "Nose"], answer: 0 },
    { visual: "🐺", prompt: "Little Red Riding Hood met which animal?", options: ["Wolf", "Bear", "Fox", "Lion"], answer: 0 },
    { visual: "🧊", prompt: "What was Elsa's magical power in Frozen?", options: ["Ice & snow", "Fire", "Flying", "Invisibility"], answer: 0 },
    { visual: "🦎", prompt: "What did Cinderella's carriage turn back into at midnight?", options: ["Pumpkin", "Apple", "Rock", "Shoe"], answer: 0 },
    { visual: "🌟", prompt: "In Rapunzel, what was very long?", options: ["Her hair", "Her dress", "Her nose", "Her wand"], answer: 0 },
    { visual: "🐟", prompt: "Ariel the Little Mermaid wanted to be a…", options: ["Human", "Bird", "Whale", "Dolphin"], answer: 0 },
    { visual: "🌙", prompt: "What time did Cinderella have to leave the ball?", options: ["Midnight", "Noon", "Sunset", "Dawn"], answer: 0 },
    { visual: "🐻", prompt: "Goldilocks visited the house of the…", options: ["Three Bears", "Three Pigs", "Seven Dwarfs", "Three Wolves"], answer: 0 },
  ]),
};

const girlFriends: Quiz = {
  id: "girl-friends",
  mode: "girl",
  title: "Cartoon Friends",
  tagline: "Pigs, puppies & pals",
  cover: coverFriends,
  accent: "from-rose-300 to-pink-200",
  questions: finalize([
    { visual: "🐷", prompt: "What sound does a pig make?", options: ["Oink", "Moo", "Bark", "Meow"], answer: 0, optionEmojis: ["🐷", "🐮", "🐶", "🐱"] },
    { visual: "🐶", prompt: "What sound does a puppy make?", options: ["Woof", "Quack", "Roar", "Tweet"], answer: 0, optionEmojis: ["🐶", "🦆", "🦁", "🐦"] },
    { visual: "🐱", prompt: "What sound does a kitty make?", options: ["Meow", "Oink", "Moo", "Bark"], answer: 0, optionEmojis: ["🐱", "🐷", "🐮", "🐶"] },
    { visual: "🐮", prompt: "What sound does a cow make?", options: ["Moo", "Baa", "Hoot", "Meow"], answer: 0, optionEmojis: ["🐮", "🐑", "🦉", "🐱"] },
    { visual: "🐔", prompt: "What sound does a hen make?", options: ["Cluck", "Bark", "Roar", "Moo"], answer: 0, optionEmojis: ["🐔", "🐶", "🦁", "🐮"] },
    { visual: "🦆", prompt: "What sound does a duck make?", options: ["Quack", "Cluck", "Moo", "Meow"], answer: 0, optionEmojis: ["🦆", "🐔", "🐮", "🐱"] },
    { visual: "🐸", prompt: "What sound does a frog make?", options: ["Ribbit", "Tweet", "Bark", "Moo"], answer: 0, optionEmojis: ["🐸", "🐦", "🐶", "🐮"] },
    { visual: "🐝", prompt: "What sound does a bee make?", options: ["Buzz", "Hiss", "Chirp", "Bark"], answer: 0, optionEmojis: ["🐝", "🐍", "🐦", "🐶"] },
    { visual: "🦁", prompt: "What sound does a lion make?", options: ["Roar", "Bark", "Moo", "Hiss"], answer: 0, optionEmojis: ["🦁", "🐶", "🐮", "🐍"] },
    { visual: "🐘", prompt: "What sound does an elephant make?", options: ["Trumpet", "Roar", "Bark", "Chirp"], answer: 0, optionEmojis: ["🎺", "🦁", "🐶", "🐦"] },
    { visual: "🐍", prompt: "What sound does a snake make?", options: ["Hiss", "Bark", "Buzz", "Cluck"], answer: 0, optionEmojis: ["🐍", "🐶", "🐝", "🐔"] },
    { visual: "🦉", prompt: "What sound does an owl make?", options: ["Hoot", "Tweet", "Quack", "Roar"], answer: 0, optionEmojis: ["🦉", "🐦", "🦆", "🦁"] },
    { visual: "🐑", prompt: "What sound does a sheep make?", options: ["Baa", "Moo", "Oink", "Bark"], answer: 0, optionEmojis: ["🐑", "🐮", "🐷", "🐶"] },
    { visual: "🐴", prompt: "What sound does a horse make?", options: ["Neigh", "Bark", "Moo", "Roar"], answer: 0, optionEmojis: ["🐴", "🐶", "🐮", "🦁"] },
    { visual: "🦃", prompt: "What sound does a turkey make?", options: ["Gobble", "Cluck", "Quack", "Honk"], answer: 0, optionEmojis: ["🦃", "🐔", "🦆", "🪿"] },
    { visual: "🐧", prompt: "What sound does a penguin make?", options: ["Squawk", "Quack", "Bark", "Tweet"], answer: 0, optionEmojis: ["🐧", "🦆", "🐶", "🐦"] },
    { visual: "🦊", prompt: "What does a fox say?", options: ["Yip", "Bark", "Meow", "Roar"], answer: 0, optionEmojis: ["🦊", "🐶", "🐱", "🦁"] },
    { visual: "🐊", prompt: "What sound does a crocodile make?", options: ["Hiss", "Roar", "Bark", "Moo"], answer: 0, optionEmojis: ["🐊", "🦁", "🐶", "🐮"] },
  ]),
};

const girlFlags: Quiz = {
  id: "girl-flags",
  mode: "girl",
  title: "Pretty Flags",
  tagline: "Hello, world!",
  cover: coverFlagsGirl,
  accent: "from-pink-200 to-orange-200",
  questions: finalize([
    flagQ("🇫🇷", "France", ["Italy", "Spain", "Germany"]),
    flagQ("🇮🇳", "India", ["Pakistan", "Brazil", "Mexico"]),
    flagQ("🇯🇵", "Japan", ["China", "Korea", "Vietnam"]),
    flagQ("🇺🇸", "USA", ["Canada", "UK", "Australia"]),
    flagQ("🇨🇦", "Canada", ["USA", "Mexico", "Sweden"]),
    flagQ("🇬🇧", "UK", ["USA", "France", "Germany"]),
    flagQ("🇮🇹", "Italy", ["France", "Spain", "Mexico"]),
    flagQ("🇧🇷", "Brazil", ["Argentina", "India", "Italy"]),
    flagQ("🇦🇺", "Australia", ["New Zealand", "UK", "Fiji"]),
    flagQ("🇲🇽", "Mexico", ["Brazil", "Spain", "Colombia"]),
    flagQ("🇩🇪", "Germany", ["Austria", "Belgium", "Netherlands"]),
    flagQ("🇨🇳", "China", ["Japan", "Korea", "Vietnam"]),
    flagQ("🇰🇷", "South Korea", ["Japan", "China", "Taiwan"]),
    flagQ("🇷🇺", "Russia", ["Ukraine", "Poland", "Belarus"]),
    flagQ("🇿🇦", "South Africa", ["Kenya", "Nigeria", "Ghana"]),
    flagQ("🇸🇦", "Saudi Arabia", ["UAE", "Jordan", "Kuwait"]),
    flagQ("🇦🇷", "Argentina", ["Chile", "Uruguay", "Paraguay"]),
    flagQ("🇳🇬", "Nigeria", ["Ghana", "Kenya", "Senegal"]),
  ]),
};

const girlDays: Quiz = {
  id: "girl-days",
  mode: "girl",
  title: "Days & Weather",
  tagline: "Sunny smiles",
  cover: coverColors,
  accent: "from-yellow-200 to-pink-200",
  questions: finalize([
    { visual: "☀️", prompt: "What is this weather?", options: ["Sunny", "Rainy", "Snowy", "Cloudy"], answer: 0, optionEmojis: ["☀️", "🌧️", "❄️", "☁️"] },
    { visual: "🌧️", prompt: "What is this weather?", options: ["Rainy", "Sunny", "Windy", "Foggy"], answer: 0, optionEmojis: ["🌧️", "☀️", "💨", "🌫️"] },
    { visual: "❄️", prompt: "What falls from the sky in winter?", options: ["Snow", "Leaves", "Apples", "Sand"], answer: 0, optionEmojis: ["❄️", "🍂", "🍎", "🏖️"] },
    { visual: "🌈", prompt: "What appears after the rain?", options: ["Rainbow", "Cloud", "Moon", "Star"], answer: 0, optionEmojis: ["🌈", "☁️", "🌙", "⭐"] },
    { visual: "🌙", prompt: "When do we see the moon?", options: ["Night", "Morning", "Noon", "Lunch"], answer: 0, optionEmojis: ["🌙", "🌅", "☀️", "🍽️"] },
    { visual: "📅", prompt: "The day after Monday is…", options: ["Tuesday", "Sunday", "Friday", "Saturday"], answer: 0 },
    { visual: "📅", prompt: "How many days are in a week?", options: ["7", "5", "10", "3"], answer: 0 },
    { visual: "🎂", prompt: "What do you blow out on a birthday?", options: ["Candles", "Balloons", "Lights", "Stars"], answer: 0, optionEmojis: ["🕯️", "🎈", "💡", "⭐"] },
    { visual: "⛄", prompt: "What do you build with snow?", options: ["Snowman", "Sandcastle", "Kite", "Boat"], answer: 0, optionEmojis: ["⛄", "🏖️", "🪁", "⛵"] },
    { visual: "🌸", prompt: "Which season do flowers bloom in?", options: ["Spring", "Winter", "Autumn", "Summer"], answer: 0, optionEmojis: ["🌸", "❄️", "🍂", "☀️"] },
    { visual: "🌤️", prompt: "What is partly cloudy weather?", options: ["Some clouds, some sun", "All rain", "Full fog", "Snowy"], answer: 0, optionEmojis: ["🌤️", "🌧️", "🌫️", "❄️"] },
    { visual: "🍂", prompt: "Which season do leaves fall from trees?", options: ["Autumn", "Spring", "Summer", "Winter"], answer: 0, optionEmojis: ["🍂", "🌸", "☀️", "❄️"] },
    { visual: "☀️", prompt: "Which season is hot with long days?", options: ["Summer", "Winter", "Spring", "Autumn"], answer: 0, optionEmojis: ["☀️", "❄️", "🌸", "🍂"] },
    { visual: "🌦️", prompt: "Rain + sun at the same time can make a…", options: ["Rainbow", "Snowflake", "Thunder", "Fog"], answer: 0, optionEmojis: ["🌈", "❄️", "⚡", "🌫️"] },
    { visual: "💨", prompt: "What do you feel on a windy day?", options: ["Breeze", "Heat", "Wetness", "Coldness"], answer: 0, optionEmojis: ["💨", "🔥", "💧", "🥶"] },
    { visual: "🌊", prompt: "Where do waves come from?", options: ["Ocean", "Sky", "Trees", "Mountains"], answer: 0, optionEmojis: ["🌊", "☁️", "🌳", "🏔️"] },
    { visual: "⛅", prompt: "What is floating in the sky?", options: ["Cloud", "Kite", "Bird", "Star"], answer: 0, optionEmojis: ["☁️", "🪁", "🐦", "⭐"] },
    { visual: "🌺", prompt: "What season comes after winter?", options: ["Spring", "Summer", "Autumn", "Night"], answer: 0, optionEmojis: ["🌸", "☀️", "🍂", "🌙"] },
  ]),
};

/* ---------------- BOY QUIZZES ---------------- */

const boyFlags: Quiz = {
  id: "boy-flags",
  mode: "boy",
  title: "World Flags",
  tagline: "195 countries, infinite trivia",
  cover: coverFlagsBoy,
  accent: "from-cyan-400 to-blue-500",
  questions: finalize([
    flagQ("🇧🇷", "Brazil", ["Argentina", "Portugal", "Mexico"], "The only Portuguese-speaking country in South America."),
    flagQ("🇯🇵", "Japan", ["China", "South Korea", "Vietnam"], "The red disc represents the rising sun."),
    flagQ("🇩🇪", "Germany", ["Belgium", "Netherlands", "Austria"], "Black, red, gold — colors of liberty."),
    flagQ("🇨🇦", "Canada", ["USA", "Switzerland", "Norway"], "The maple leaf has 11 points."),
    flagQ("🇿🇦", "South Africa", ["Kenya", "Namibia", "Zimbabwe"], "Adopted in 1994 after apartheid ended."),
    flagQ("🇦🇺", "Australia", ["New Zealand", "Fiji", "UK"], "The Southern Cross constellation is on the flag."),
    flagQ("🇰🇷", "South Korea", ["Japan", "China", "Mongolia"], "The center symbol is called Taegeuk."),
    flagQ("🇮🇳", "India", ["Niger", "Ireland", "Bangladesh"], "The wheel has 24 spokes — one for every hour."),
    flagQ("🇲🇽", "Mexico", ["Italy", "Hungary", "Bulgaria"], "An eagle eating a snake sits in the middle."),
    flagQ("🇸🇪", "Sweden", ["Finland", "Norway", "Denmark"], "Nordic cross flags all share the same shape."),
    flagQ("🇳🇴", "Norway", ["Sweden", "Denmark", "Finland"], "Norway's flag inspired many other Nordic flags."),
    flagQ("🇺🇸", "USA", ["UK", "Australia", "New Zealand"], "The 50 stars represent the 50 states."),
    flagQ("🇫🇷", "France", ["Italy", "Romania", "Chad"], "Liberté, Égalité, Fraternité!"),
    flagQ("🇨🇳", "China", ["Vietnam", "Taiwan", "Singapore"], "The large star represents the Communist Party."),
    flagQ("🇬🇷", "Greece", ["Cyprus", "Armenia", "Uruguay"], "The cross represents the Greek Orthodox Church."),
    flagQ("🇹🇷", "Turkey", ["Pakistan", "Tunisia", "Algeria"], "The crescent and star are symbols of Islam."),
    flagQ("🇳🇿", "New Zealand", ["Australia", "Fiji", "Samoa"], "Features the Southern Cross and Union Jack."),
    flagQ("🇦🇷", "Argentina", ["Uruguay", "Chile", "Bolivia"], "The sun in the center is called the Sun of May."),
    flagQ("🇵🇹", "Portugal", ["Brazil", "Spain", "Cape Verde"], "One of the oldest nation-states in Europe."),
    flagQ("🇪🇬", "Egypt", ["Syria", "Iraq", "Jordan"], "The eagle of Saladin is in the center."),
  ]),
};

const boyCapitals: Quiz = {
  id: "boy-capitals",
  mode: "boy",
  title: "Capital Cities",
  tagline: "Globe-trotting trivia",
  cover: coverLandmarks,
  accent: "from-amber-400 to-orange-500",
  questions: finalize([
    { visual: "🇫🇷", prompt: "Capital of France?", options: ["Paris", "Lyon", "Nice", "Marseille"], answer: 0 },
    { visual: "🇯🇵", prompt: "Capital of Japan?", options: ["Tokyo", "Osaka", "Kyoto", "Seoul"], answer: 0 },
    { visual: "🇦🇺", prompt: "Capital of Australia?", options: ["Canberra", "Sydney", "Melbourne", "Perth"], answer: 0, fact: "Most people guess Sydney, but it's Canberra!" },
    { visual: "🇧🇷", prompt: "Capital of Brazil?", options: ["Brasília", "Rio de Janeiro", "São Paulo", "Salvador"], answer: 0 },
    { visual: "🇨🇦", prompt: "Capital of Canada?", options: ["Ottawa", "Toronto", "Vancouver", "Montreal"], answer: 0 },
    { visual: "🇪🇬", prompt: "Capital of Egypt?", options: ["Cairo", "Alexandria", "Giza", "Luxor"], answer: 0 },
    { visual: "🇮🇳", prompt: "Capital of India?", options: ["New Delhi", "Mumbai", "Kolkata", "Bangalore"], answer: 0 },
    { visual: "🇿🇦", prompt: "One capital of South Africa?", options: ["Pretoria", "Johannesburg", "Durban", "Cape Town"], answer: 0, fact: "South Africa actually has 3 capitals!" },
    { visual: "🇹🇷", prompt: "Capital of Turkey?", options: ["Ankara", "Istanbul", "Izmir", "Bursa"], answer: 0 },
    { visual: "🇰🇪", prompt: "Capital of Kenya?", options: ["Nairobi", "Mombasa", "Kisumu", "Nakuru"], answer: 0 },
    { visual: "🇩🇪", prompt: "Capital of Germany?", options: ["Berlin", "Munich", "Hamburg", "Frankfurt"], answer: 0 },
    { visual: "🇨🇳", prompt: "Capital of China?", options: ["Beijing", "Shanghai", "Guangzhou", "Shenzhen"], answer: 0 },
    { visual: "🇷🇺", prompt: "Capital of Russia?", options: ["Moscow", "St. Petersburg", "Kazan", "Vladivostok"], answer: 0 },
    { visual: "🇺🇸", prompt: "Capital of the USA?", options: ["Washington D.C.", "New York", "Los Angeles", "Chicago"], answer: 0, fact: "Not New York — that's a common mistake!" },
    { visual: "🇬🇧", prompt: "Capital of the UK?", options: ["London", "Manchester", "Edinburgh", "Dublin"], answer: 0 },
    { visual: "🇦🇷", prompt: "Capital of Argentina?", options: ["Buenos Aires", "Córdoba", "Rosario", "Santiago"], answer: 0 },
    { visual: "🇳🇬", prompt: "Capital of Nigeria?", options: ["Abuja", "Lagos", "Kano", "Ibadan"], answer: 0, fact: "Lagos is bigger, but Abuja is the capital!" },
    { visual: "🇸🇦", prompt: "Capital of Saudi Arabia?", options: ["Riyadh", "Jeddah", "Mecca", "Medina"], answer: 0 },
    { visual: "🇲🇽", prompt: "Capital of Mexico?", options: ["Mexico City", "Guadalajara", "Monterrey", "Cancún"], answer: 0 },
    { visual: "🇮🇩", prompt: "Capital of Indonesia?", options: ["Jakarta", "Bali", "Surabaya", "Bandung"], answer: 0 },
  ]),
};

const boyScience: Quiz = {
  id: "boy-science",
  mode: "boy",
  title: "Periodic Table",
  tagline: "Elements & symbols",
  cover: coverScience,
  accent: "from-fuchsia-400 to-purple-500",
  questions: finalize([
    { visual: "Au", prompt: "Which element has the symbol Au?", options: ["Gold", "Silver", "Aluminum", "Argon"], answer: 0, fact: "Au comes from the Latin word 'aurum'." },
    { visual: "O", prompt: "Which element has the symbol O?", options: ["Oxygen", "Osmium", "Oganesson", "Olivine"], answer: 0 },
    { visual: "H₂O", prompt: "What is H₂O?", options: ["Water", "Salt", "Sugar", "Air"], answer: 0 },
    { visual: "Fe", prompt: "Fe is the symbol for…", options: ["Iron", "Fluorine", "Francium", "Fermium"], answer: 0 },
    { visual: "Na", prompt: "Na is the symbol for…", options: ["Sodium", "Nitrogen", "Neon", "Nickel"], answer: 0 },
    { visual: "C", prompt: "Diamonds are made of which element?", options: ["Carbon", "Calcium", "Copper", "Chlorine"], answer: 0 },
    { visual: "He", prompt: "Which gas makes balloons float?", options: ["Helium", "Hydrogen", "Oxygen", "Neon"], answer: 0 },
    { visual: "1", prompt: "What is the lightest element?", options: ["Hydrogen", "Helium", "Lithium", "Carbon"], answer: 0 },
    { visual: "118", prompt: "How many elements are on the periodic table?", options: ["118", "92", "108", "150"], answer: 0 },
    { visual: "Ag", prompt: "Ag is the symbol for…", options: ["Silver", "Gold", "Argon", "Antimony"], answer: 0, fact: "Ag comes from the Latin word 'argentum'." },
    { visual: "Cu", prompt: "Cu is the symbol for…", options: ["Copper", "Carbon", "Calcium", "Chlorine"], answer: 0, fact: "Cu is from the Latin 'cuprum' — Cyprus!" },
    { visual: "K", prompt: "K is the symbol for…", options: ["Potassium", "Krypton", "Potash", "Kalium"], answer: 0 },
    { visual: "Pb", prompt: "Pb is the symbol for…", options: ["Lead", "Platinum", "Phosphorus", "Palladium"], answer: 0, fact: "Pb is from the Latin 'plumbum' — like plumbing!" },
    { visual: "N₂", prompt: "What gas makes up most of Earth's air?", options: ["Nitrogen", "Oxygen", "Carbon dioxide", "Argon"], answer: 0, fact: "About 78% of air is nitrogen." },
    { visual: "CO₂", prompt: "Plants absorb which gas to make food?", options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Helium"], answer: 0 },
    { visual: "Hg", prompt: "Hg is the symbol for which liquid metal?", options: ["Mercury", "Magnesium", "Manganese", "Molybdenum"], answer: 0 },
    { visual: "U", prompt: "Which element is used in nuclear reactors?", options: ["Uranium", "Unobtanium", "Chromium", "Thorium"], answer: 0 },
    { visual: "Si", prompt: "Computer chips are mainly made of…", options: ["Silicon", "Silver", "Sulfur", "Selenium"], answer: 0, fact: "Silicon Valley is named after this element!" },
    { visual: "Ca", prompt: "Ca is the symbol for…", options: ["Calcium", "Carbon", "Cadmium", "Cerium"], answer: 0, fact: "Calcium keeps your bones strong!" },
  ]),
};

const boyChess: Quiz = {
  id: "boy-chess",
  mode: "boy",
  title: "Chess Moves",
  tagline: "Pieces, patterns, openings",
  cover: coverChess,
  accent: "from-slate-300 to-cyan-400",
  questions: finalize([
    { visual: "♞", prompt: "Which piece moves in an L-shape?", options: ["Knight", "Bishop", "Rook", "Queen"], answer: 0 },
    { visual: "♝", prompt: "Which piece only moves diagonally?", options: ["Bishop", "Rook", "Knight", "King"], answer: 0 },
    { visual: "♜", prompt: "Which piece moves in straight lines only?", options: ["Rook", "Bishop", "Pawn", "Queen"], answer: 0 },
    { visual: "♛", prompt: "Which is the most powerful piece?", options: ["Queen", "King", "Rook", "Knight"], answer: 0 },
    { visual: "♔", prompt: "What is the goal of chess?", options: ["Checkmate the king", "Take the queen", "Cross the board", "Take all pawns"], answer: 0 },
    { visual: "♙", prompt: "How many pawns does each player start with?", options: ["8", "6", "10", "4"], answer: 0 },
    { visual: "♚→♜", prompt: "What is the move where king and rook swap called?", options: ["Castling", "En passant", "Promotion", "Fork"], answer: 0 },
    { visual: "♙→♛", prompt: "A pawn reaching the last row becomes…", options: ["Promoted (any piece)", "A king", "Removed", "Doubled"], answer: 0 },
    { visual: "8×8", prompt: "How many squares are on a chess board?", options: ["64", "32", "48", "100"], answer: 0 },
    { visual: "⬜⬛", prompt: "Which color always moves first in chess?", options: ["White", "Black", "Either", "Depends"], answer: 0 },
    { visual: "♙♙", prompt: "A pawn can capture pieces…", options: ["Diagonally", "Straight ahead", "Sideways", "Backwards"], answer: 0 },
    { visual: "🤝", prompt: "A game that ends with no winner is called a…", options: ["Draw", "Stalemate", "Forfeit", "Tie"], answer: 0 },
    { visual: "♟", prompt: "Which famous opening starts with e4 e5?", options: ["King's Pawn Opening", "Queen's Gambit", "Sicilian Defense", "French Defense"], answer: 0 },
    { visual: "👑", prompt: "How many squares can a king move at a time?", options: ["1", "2", "3", "Any number"], answer: 0 },
    { visual: "♞", prompt: "A knight can jump over…", options: ["Other pieces", "Nothing", "Only pawns", "Empty squares"], answer: 0 },
    { visual: "⏱️", prompt: "In competitive chess, each player has a…", options: ["Clock", "Dice", "Scorecard", "Bell"], answer: 0 },
    { visual: "🏆", prompt: "The world chess champion title is awarded by…", options: ["FIDE", "FIFA", "IOC", "USCF"], answer: 0 },
    { visual: "♔♚", prompt: "En passant is a special move for which piece?", options: ["Pawn", "Knight", "Bishop", "Rook"], answer: 0 },
  ]),
};

const boyDragons: Quiz = {
  id: "boy-dragons",
  mode: "boy",
  title: "Wings of Fire Facts",
  tagline: "Dragon trivia for fans",
  cover: coverDragons,
  accent: "from-emerald-400 to-orange-500",
  questions: finalize([
    { visual: "🐉", prompt: "Which tribe of dragons can breathe fire and lives in the desert?", options: ["SandWings", "SeaWings", "IceWings", "RainWings"], answer: 0 },
    { visual: "🌊", prompt: "Which tribe lives underwater and glows?", options: ["SeaWings", "MudWings", "NightWings", "SilkWings"], answer: 0 },
    { visual: "❄️", prompt: "Which tribe breathes freezing frostbreath?", options: ["IceWings", "SkyWings", "HiveWings", "RainWings"], answer: 0 },
    { visual: "🌧️", prompt: "Which tribe can camouflage by changing color?", options: ["RainWings", "NightWings", "LeafWings", "SeaWings"], answer: 0 },
    { visual: "🌙", prompt: "Which tribe was rumored to read minds and see the future?", options: ["NightWings", "IceWings", "SilkWings", "MudWings"], answer: 0 },
    { visual: "📖", prompt: "Who wrote the Wings of Fire series?", options: ["Tui T. Sutherland", "Rick Riordan", "Suzanne Collins", "J.K. Rowling"], answer: 0 },
    { visual: "5", prompt: "How many dragonets are in the original prophecy?", options: ["5", "3", "7", "4"], answer: 0 },
    { visual: "🔥", prompt: "What color are SkyWings usually?", options: ["Red/orange", "Blue", "Green", "Black"], answer: 0 },
    { visual: "🐉", prompt: "What is the name of the NightWing dragonet in the prophecy?", options: ["Starflight", "Tsunami", "Clay", "Sunny"], answer: 0 },
    { visual: "🌊", prompt: "What is the name of the SeaWing dragonet in the prophecy?", options: ["Tsunami", "Glory", "Starflight", "Peril"], answer: 0 },
    { visual: "🔥", prompt: "What is the name of the SkyWing dragonet who joined the group?", options: ["Peril", "Scarlet", "Osprey", "Flame"], answer: 0 },
    { visual: "🌿", prompt: "Which tribe lives in the rainforest?", options: ["RainWings", "LeafWings", "MudWings", "SandWings"], answer: 0 },
    { visual: "👑", prompt: "Who is the SandWing queen at the start of the series?", options: ["Burn / Blister / Blaze (disputed)", "Tsunami", "Glory", "Scarlet"], answer: 0 },
    { visual: "🏔️", prompt: "Which tribe lives in the mountains with strict rankings?", options: ["IceWings", "SkyWings", "MudWings", "NightWings"], answer: 0 },
    { visual: "🌑", prompt: "NightWings hid on a volcano on a secret…", options: ["Island", "Mountain", "Underwater cave", "Forest"], answer: 0 },
    { visual: "🐉", prompt: "What is Clay's dragon tribe?", options: ["MudWings", "SandWings", "SeaWings", "SkyWings"], answer: 0 },
    { visual: "☀️", prompt: "What is Sunny's dragon tribe?", options: ["SandWings", "SkyWings", "NightWings", "RainWings"], answer: 0 },
    { visual: "🌿", prompt: "Which continent in WoF has HiveWings and SilkWings?", options: ["Pantala", "Pyrrhia", "Jade Mountain", "Possibility"], answer: 0 },
  ]),
};

const boyPokemon: Quiz = {
  id: "boy-pokemon",
  mode: "boy",
  title: "Pokémon Pop-Quiz",
  tagline: "Gotta know 'em all",
  cover: coverDragons,
  accent: "from-yellow-400 to-red-500",
  questions: finalize([
    { visual: "⚡", prompt: "Pikachu is what type?", options: ["Electric", "Fire", "Water", "Grass"], answer: 0 },
    { visual: "🔥", prompt: "Charmander evolves into…", options: ["Charmeleon", "Charizard", "Blastoise", "Ivysaur"], answer: 0 },
    { visual: "💧", prompt: "Squirtle is what type?", options: ["Water", "Ice", "Steel", "Bug"], answer: 0 },
    { visual: "🌿", prompt: "Bulbasaur is which two types?", options: ["Grass/Poison", "Grass/Fire", "Grass/Water", "Grass/Bug"], answer: 0 },
    { visual: "🏆", prompt: "Who is the very first Pokémon in the Pokédex?", options: ["Bulbasaur", "Pikachu", "Mew", "Charmander"], answer: 0 },
    { visual: "👻", prompt: "Gengar is what type?", options: ["Ghost/Poison", "Dark/Ghost", "Psychic/Ghost", "Ghost/Fire"], answer: 0 },
    { visual: "🐉", prompt: "Which is a legendary dragon Pokémon?", options: ["Rayquaza", "Snorlax", "Eevee", "Jigglypuff"], answer: 0 },
    { visual: "✨", prompt: "What do shiny Pokémon have that's special?", options: ["Different color", "Bigger size", "Extra moves", "Two types"], answer: 0 },
    { visual: "🔮", prompt: "Mewtwo is what type?", options: ["Psychic", "Dark", "Ghost", "Fairy"], answer: 0 },
    { visual: "💤", prompt: "Which Pokémon sleeps all the time?", options: ["Snorlax", "Jigglypuff", "Slowpoke", "Drowzee"], answer: 0 },
    { visual: "🌊", prompt: "What type is Gyarados?", options: ["Water/Flying", "Water/Dragon", "Water/Dark", "Water/Ice"], answer: 0 },
    { visual: "🐙", prompt: "How many Pokémon types are there?", options: ["18", "15", "20", "12"], answer: 0 },
    { visual: "🦊", prompt: "Eevee can evolve into how many different Pokémon?", options: ["8", "5", "6", "10"], answer: 0 },
    { visual: "🌙", prompt: "Which stone evolves Eevee into Umbreon?", options: ["Friendship at night", "Moon Stone", "Dark Stone", "Shadow Stone"], answer: 0 },
    { visual: "🏟️", prompt: "Where do Pokémon trainers battle gym leaders?", options: ["Gym", "Arena", "Stadium", "Colosseum"], answer: 0 },
    { visual: "🎮", prompt: "Which was the first Pokémon game released?", options: ["Red & Blue", "Gold & Silver", "Yellow", "Crystal"], answer: 0 },
    { visual: "🐦", prompt: "What type is Charizard?", options: ["Fire/Flying", "Fire/Dragon", "Fire/Dark", "Fire only"], answer: 0 },
    { visual: "🧊", prompt: "Which Pokémon is the ice legendary bird?", options: ["Articuno", "Zapdos", "Moltres", "Lugia"], answer: 0 },
  ]),
};

const boyMath: Quiz = {
  id: "boy-math",
  mode: "boy",
  title: "Math Sprints",
  tagline: "Quick brain workouts",
  cover: coverBlocks,
  accent: "from-blue-400 to-indigo-500",
  questions: finalize([
    { visual: "7 × 8", prompt: "Solve:", options: ["56", "54", "64", "48"], answer: 0 },
    { visual: "12 × 12", prompt: "Solve:", options: ["144", "124", "132", "164"], answer: 0 },
    { visual: "144 ÷ 12", prompt: "Solve:", options: ["12", "10", "14", "11"], answer: 0 },
    { visual: "9²", prompt: "What is 9 squared?", options: ["81", "18", "99", "72"], answer: 0 },
    { visual: "√64", prompt: "Square root of 64?", options: ["8", "6", "9", "7"], answer: 0 },
    { visual: "25%", prompt: "25% of 200?", options: ["50", "25", "75", "100"], answer: 0 },
    { visual: "180°", prompt: "Sum of angles in a triangle?", options: ["180°", "90°", "360°", "270°"], answer: 0 },
    { visual: "π", prompt: "Pi to 2 decimal places?", options: ["3.14", "3.41", "2.14", "3.12"], answer: 0 },
    { visual: "6 × 7", prompt: "Solve:", options: ["42", "36", "48", "54"], answer: 0 },
    { visual: "11 × 11", prompt: "Solve:", options: ["121", "111", "131", "101"], answer: 0 },
    { visual: "√144", prompt: "Square root of 144?", options: ["12", "11", "13", "14"], answer: 0 },
    { visual: "2⁸", prompt: "What is 2 to the power of 8?", options: ["256", "128", "512", "64"], answer: 0 },
    { visual: "50%", prompt: "50% of 90?", options: ["45", "50", "40", "55"], answer: 0 },
    { visual: "360°", prompt: "Sum of angles in a quadrilateral?", options: ["360°", "180°", "270°", "90°"], answer: 0 },
    { visual: "3 × 3 × 3", prompt: "What is 3 cubed?", options: ["27", "9", "18", "21"], answer: 0 },
    { visual: "1000", prompt: "How many meters in a kilometer?", options: ["1000", "100", "10000", "500"], answer: 0 },
    { visual: "🔢", prompt: "What is the next prime number after 7?", options: ["11", "9", "10", "13"], answer: 0 },
    { visual: "÷", prompt: "What is 252 ÷ 9?", options: ["28", "27", "29", "26"], answer: 0 },
  ]),
};

const boySpace: Quiz = {
  id: "boy-space",
  mode: "boy",
  title: "Space Explorer",
  tagline: "Planets, rockets & stars",
  cover: coverSpace,
  accent: "from-indigo-400 to-purple-500",
  questions: finalize([
    { visual: "🪐", prompt: "Which planet has the famous rings?", options: ["Saturn", "Jupiter", "Mars", "Venus"], answer: 0 },
    { visual: "🔴", prompt: "Which planet is called the Red Planet?", options: ["Mars", "Mercury", "Jupiter", "Pluto"], answer: 0 },
    { visual: "☀️", prompt: "How many planets in our solar system?", options: ["8", "9", "7", "10"], answer: 0 },
    { visual: "🌕", prompt: "Earth's natural satellite is called…", options: ["The Moon", "Phobos", "Titan", "Europa"], answer: 0 },
    { visual: "🚀", prompt: "First person on the Moon was…", options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "John Glenn"], answer: 0 },
    { visual: "🌌", prompt: "Our galaxy is called…", options: ["Milky Way", "Andromeda", "Whirlpool", "Sombrero"], answer: 0 },
    { visual: "⭐", prompt: "The closest star to Earth is…", options: ["The Sun", "Sirius", "Polaris", "Proxima"], answer: 0 },
    { visual: "🪐", prompt: "Largest planet in the solar system?", options: ["Jupiter", "Saturn", "Neptune", "Earth"], answer: 0 },
    { visual: "🌑", prompt: "Which planet is closest to the Sun?", options: ["Mercury", "Venus", "Earth", "Mars"], answer: 0 },
    { visual: "💨", prompt: "Which planet is known for its Great Red Spot storm?", options: ["Jupiter", "Saturn", "Neptune", "Mars"], answer: 0 },
    { visual: "🥶", prompt: "Which is the coldest planet in the solar system?", options: ["Neptune", "Uranus", "Pluto", "Saturn"], answer: 0 },
    { visual: "🌍", prompt: "What is Earth's position from the Sun?", options: ["3rd", "2nd", "4th", "1st"], answer: 0 },
    { visual: "🛸", prompt: "First human in space was…", options: ["Yuri Gagarin", "Neil Armstrong", "Buzz Aldrin", "Alan Shepard"], answer: 0, fact: "Gagarin orbited Earth in 1961." },
    { visual: "🌙", prompt: "How long does it take the Moon to orbit Earth?", options: ["~27 days", "~365 days", "~7 days", "~90 days"], answer: 0 },
    { visual: "☄️", prompt: "A rock that burns up entering Earth's atmosphere is called a…", options: ["Meteor", "Comet", "Asteroid", "Nebula"], answer: 0 },
    { visual: "🔭", prompt: "Who invented the first telescope used for astronomy?", options: ["Galileo", "Newton", "Hubble", "Copernicus"], answer: 0 },
    { visual: "🌐", prompt: "How long does Earth take to orbit the Sun?", options: ["365 days", "24 hours", "28 days", "100 days"], answer: 0 },
    { visual: "🪐", prompt: "Which planet rotates on its side?", options: ["Uranus", "Neptune", "Saturn", "Mars"], answer: 0 },
  ]),
};

const boyLandmarks: Quiz = {
  id: "boy-landmarks",
  mode: "boy",
  title: "World Landmarks",
  tagline: "Wonders of the world",
  cover: coverLandmarks,
  accent: "from-orange-400 to-rose-500",
  questions: finalize([
    { visual: "🗼", prompt: "Where is the Eiffel Tower?", options: ["Paris", "London", "Rome", "Berlin"], answer: 0 },
    { visual: "🗽", prompt: "Where is the Statue of Liberty?", options: ["New York", "Los Angeles", "Chicago", "Boston"], answer: 0 },
    { visual: "🏯", prompt: "The Great Wall is in…", options: ["China", "Japan", "Korea", "Mongolia"], answer: 0 },
    { visual: "🕌", prompt: "The Taj Mahal is in…", options: ["India", "Pakistan", "Iran", "UAE"], answer: 0 },
    { visual: "🏛️", prompt: "The Colosseum is in…", options: ["Rome", "Athens", "Cairo", "Istanbul"], answer: 0 },
    { visual: "🗿", prompt: "Moai stone heads are on…", options: ["Easter Island", "Hawaii", "Tahiti", "Fiji"], answer: 0 },
    { visual: "⛩️", prompt: "Torii gates are found in…", options: ["Japan", "China", "Vietnam", "Thailand"], answer: 0 },
    { visual: "🐪", prompt: "The Pyramids of Giza are in…", options: ["Egypt", "Mexico", "Sudan", "Iraq"], answer: 0 },
    { visual: "🌉", prompt: "The Golden Gate Bridge is in…", options: ["San Francisco", "New York", "Sydney", "London"], answer: 0 },
    { visual: "🏔️", prompt: "Machu Picchu is in…", options: ["Peru", "Brazil", "Chile", "Colombia"], answer: 0, fact: "Built by the Inca Empire high in the Andes." },
    { visual: "🎡", prompt: "Big Ben clock tower is in…", options: ["London", "Paris", "Brussels", "Amsterdam"], answer: 0 },
    { visual: "🕍", prompt: "The Wailing Wall is in…", options: ["Jerusalem", "Cairo", "Baghdad", "Amman"], answer: 0 },
    { visual: "🏟️", prompt: "The Acropolis and Parthenon are in…", options: ["Athens", "Rome", "Istanbul", "Cairo"], answer: 0 },
    { visual: "🌁", prompt: "Angkor Wat temple is in…", options: ["Cambodia", "Thailand", "Vietnam", "Indonesia"], answer: 0 },
    { visual: "🏰", prompt: "Neuschwanstein Castle (fairy-tale castle) is in…", options: ["Germany", "France", "Austria", "Switzerland"], answer: 0 },
    { visual: "🌊", prompt: "The Sydney Opera House is in…", options: ["Australia", "New Zealand", "UK", "Canada"], answer: 0 },
    { visual: "🛕", prompt: "Chichen Itza pyramid is in…", options: ["Mexico", "Peru", "Guatemala", "Brazil"], answer: 0, fact: "Built by the ancient Maya civilization." },
    { visual: "🗼", prompt: "The Leaning Tower of Pisa is in…", options: ["Italy", "Spain", "France", "Greece"], answer: 0 },
  ]),
};

/* ──────────────────────────────────────────────────────────────
   5th-GRADE SUBTRACTION  —  Lesson · Practice · Quiz
   ────────────────────────────────────────────────────────────── */

const boyMathSubLesson: Quiz = {
  id: "boy-math-sub-lesson",
  mode: "boy",
  section: "math-subtraction",
  sectionLabel: "📖 Lesson",
  title: "Subtraction: Lesson",
  tagline: "Understand the WHY behind subtraction",
  cover: coverBlocks,
  accent: "from-sky-400 to-blue-500",
  questions: finalize([
    {
      visual: "Minuend",
      prompt: "In 8 − 3 = 5, what is the MINUEND?",
      options: ["8", "3", "5", "−"],
      answer: 0,
      fact: "The minuend is the starting number — the one you subtract FROM.",
      steps: ["Write the equation: 8 − 3 = 5", "The FIRST number (8) is what we start with", "We subtract FROM this number", "So the minuend = 8 ✓"],
    },
    {
      visual: "Subtrahend",
      prompt: "In 8 − 3 = 5, what is the SUBTRAHEND?",
      options: ["3", "8", "5", "="],
      answer: 0,
      fact: "The subtrahend is the number being taken away.",
      steps: ["Write the equation: 8 − 3 = 5", "The SECOND number (3) is taken away", "Think: 'subtract' → 'subtrahend'", "So the subtrahend = 3 ✓"],
    },
    {
      visual: "Difference",
      prompt: "In 8 − 3 = 5, what is the DIFFERENCE?",
      options: ["5", "8", "3", "11"],
      answer: 0,
      fact: "The difference is the result — what remains after subtracting.",
      steps: ["Write: 8 − 3 = 5", "After subtracting, we get the answer", "This result is called the DIFFERENCE", "Difference = 5 ✓"],
    },
    {
      visual: "🔄 Regroup",
      prompt: "In 53 − 27, do we need to regroup in the ones column?",
      options: ["Yes — 3 < 7, so borrow from tens", "No — always subtract top from bottom", "Only if numbers are even", "Never needed"],
      answer: 0,
      fact: "Since 3 < 7, borrow 1 ten → ones become 13. Then 13−7=6, 4−2=2. Answer: 26.",
      steps: ["Ones column: 3 − 7", "Problem! 3 is less than 7", "Borrow 1 ten from the tens place", "Ones: 13 − 7 = 6", "Tens: 4 − 2 = 2 (tens went 5→4)", "Answer: 26 ✓"],
    },
    {
      visual: "1 ten = ?",
      prompt: "When regrouping, 1 ten equals how many ones?",
      options: ["10 ones", "5 ones", "100 ones", "2 ones"],
      answer: 0,
      fact: "Place value rule: 1 ten = 10 ones, 1 hundred = 10 tens, 1 thousand = 10 hundreds.",
      steps: ["Think of a $10 note", "Break it into $1 coins → 10 coins", "Same with numbers: 1 ten = 10 ones", "1 hundred = 10 tens", "1 thousand = 10 hundreds ✓"],
    },
    {
      visual: "5,000 − 1",
      prompt: "Why is 5,000 − 1 tricky?",
      options: ["Must regroup through three zeros", "The 5 is too big", "You can't subtract from 5,000", "It's actually easy"],
      answer: 0,
      fact: "5,000 → 4,999. You regroup thousands → hundreds → tens → ones.",
      steps: ["Ones: 0 − 1, can't! Need to borrow", "Tens: also 0 → borrow from hundreds", "Hundreds: also 0 → borrow from thousands", "5 thousands → 4 thousands, 10 hundreds", "10 hundreds → 9 hundreds, 10 tens", "10 tens → 9 tens, 10 ones", "10 − 1 = 9 ones → Answer: 4,999 ✓"],
    },
    {
      visual: "✅ Check",
      prompt: "Best way to check if 100 − 37 = 63 is correct?",
      options: ["Add: 63 + 37 = 100 ✓", "Subtract again", "Multiply by 2", "Divide by the answer"],
      answer: 0,
      fact: "Subtraction and addition are inverse operations — they undo each other.",
      steps: ["You got: 100 − 37 = 63", "To verify, REVERSE the operation", "Add the answer + subtrahend", "63 + 37 = 100", "100 = 100 ✓ Correct!"],
    },
    {
      visual: "n − n",
      prompt: "Any number minus ITSELF equals…",
      options: ["0", "1", "2", "The number"],
      answer: 0,
      fact: "e.g. 9,999 − 9,999 = 0. Subtracting a number from itself always gives zero.",
      steps: ["Try: 999 − 999", "Ones: 9 − 9 = 0", "Tens: 9 − 9 = 0", "Hundreds: 9 − 9 = 0", "Result: 000 = 0 ✓", "Works for ANY number!"],
    },
    {
      visual: "n − 0",
      prompt: "Any number minus ZERO equals…",
      options: ["The number itself", "0", "1", "Undefined"],
      answer: 0,
      fact: "e.g. 847 − 0 = 847. Subtracting zero changes nothing.",
      steps: ["Removing ZERO things from a group", "leaves the group exactly the same", "847 − 0 = 847", "Zero is the identity element ✓"],
    },
    {
      visual: "0.7 − 0.3",
      prompt: "Key rule when subtracting decimals?",
      options: ["Line up the decimal points", "Ignore the decimals", "Multiply by 10 first", "Use fractions instead"],
      answer: 0,
      fact: "0.7 − 0.3 = 0.4. Lining up decimals keeps tenths with tenths.",
      steps: ["  0.7", "− 0.3", "─────", "Tenths: 7 − 3 = 4", "Answer: 0.4 ✓", "Key: decimal points must line up!"],
    },
    {
      visual: "½ − ¼",
      prompt: "To subtract ½ − ¼, you must first…",
      options: ["Find a common denominator", "Flip one fraction", "Add numerators", "Subtract denominators"],
      answer: 0,
      fact: "½ = 2/4. So 2/4 − 1/4 = 1/4. Always get a common denominator first!",
      steps: ["Denominators: 2 and 4 — different!", "Find LCD (Lowest Common Denominator)", "LCD of 2 and 4 = 4", "Convert ½ → 2/4", "Now: 2/4 − 1/4 = 1/4 ✓"],
    },
    {
      visual: "3½ − 1¾",
      prompt: "Subtracting mixed numbers: when the fraction part is too small, you…",
      options: ["Borrow 1 from the whole and add it as a fraction", "Subtract whole parts only", "Flip the second fraction", "Convert to decimals always"],
      answer: 0,
      fact: "3½ = 3 2/4. Borrow 1 → 2 6/4. Then 2 6/4 − 1 3/4 = 1 3/4.",
      steps: ["Same denominator: 3 2/4 − 1 3/4", "Fractions: 2/4 < 3/4 → need to borrow!", "Borrow 1 whole from 3 → become 2", "Add 4/4 to fraction: 2/4 + 4/4 = 6/4", "Now: 2 6/4 − 1 3/4", "Whole: 2−1=1, Fraction: 6/4−3/4=3/4", "Answer: 1 3/4 ✓"],
    },
    {
      visual: "📐 Rule",
      prompt: "Can subtraction be done in any order? (Is it commutative?)",
      options: ["No — 8 − 3 ≠ 3 − 8", "Yes — same as addition", "Only with even numbers", "Only with decimals"],
      answer: 0,
      fact: "Subtraction is NOT commutative. Order matters! 8 − 3 = 5, but 3 − 8 = −5.",
      steps: ["Addition: 3 + 5 = 5 + 3 = 8 ✓ (commutative)", "Try subtraction: 8 − 3 = 5", "Swap order: 3 − 8 = −5", "5 ≠ −5, so NOT commutative!", "Always keep the ORDER in subtraction ✓"],
    },
    {
      visual: "1,000,000",
      prompt: "1,000,000 − 999,999 = ?",
      options: ["1", "11", "101", "1,000"],
      answer: 0,
      fact: "Even with huge numbers, the answer can be tiny. Think addition to check!",
      steps: ["Big numbers can have tiny differences!", "Think: 999,999 + ? = 1,000,000", "999,999 + 1 = 1,000,000 ✓", "So 1,000,000 − 999,999 = 1", "Tip: use the inverse (addition) shortcut ✓"],
    },
  ]),
};

const boyMathSubPractice: Quiz = {
  id: "boy-math-sub-practice",
  mode: "boy",
  section: "math-subtraction",
  sectionLabel: "✏️ Practice",
  title: "Subtraction: Practice",
  tagline: "Drill multi-digit, decimals & fractions",
  cover: coverScience,
  accent: "from-emerald-400 to-teal-500",
  questions: finalize([
    {
      visual: "534 − 278", prompt: "Solve:",
      options: ["256", "266", "246", "276"], answer: 0,
      steps: ["  5 3 4", "− 2 7 8", "Ones: 4 < 8 → borrow from tens", "Ones → 14, tens 3→2:  14−8 = 6", "Tens: 2 < 7 → borrow from hundreds", "Tens → 12, hundreds 5→4:  12−7 = 5", "Hundreds: 4 − 2 = 2", "Answer: 2 5 6 ✓"],
    },
    {
      visual: "1,000 − 387", prompt: "Solve:",
      options: ["613", "623", "713", "603"], answer: 0,
      steps: ["  1,0 0 0", "−    3 8 7", "Ones: 0 < 7 → borrow chain through zeros", "1,000 → 0,999 + 10 ones", "Ones: 10 − 7 = 3", "Tens: 9 − 8 = 1", "Hundreds: 9 − 3 = 6", "Answer: 6 1 3 ✓"],
    },
    {
      visual: "7,500 − 3,847", prompt: "Solve:",
      options: ["3,653", "3,763", "4,653", "3,543"], answer: 0,
      steps: ["  7,5 0 0", "− 3,8 4 7", "Ones: 0 < 7, tens also 0 → borrow chain", "Hundreds 5→4, tens 0→9, ones 0→10", "10 − 7 = 3 (ones)", "9 − 4 = 5 (tens)", "Hundreds: 4 < 8 → borrow from thousands", "14 − 8 = 6 (hundreds)", "6 − 3 = 3 (thousands)", "Answer: 3,6 5 3 ✓"],
    },
    {
      visual: "10,000 − 4,999", prompt: "Solve:",
      options: ["5,001", "5,000", "4,001", "5,011"], answer: 0,
      steps: ["Shortcut: 10,000 − 5,000 = 5,000", "But we subtract 4,999 not 5,000", "4,999 is 1 LESS than 5,000", "So answer is 1 MORE than 5,000", "10,000 − 4,999 = 5,001 ✓"],
    },
    {
      visual: "8.5 − 3.7", prompt: "Solve (decimals):",
      options: ["4.8", "4.2", "5.2", "3.8"], answer: 0,
      steps: ["Line up decimals:", "  8.5", "− 3.7", "Tenths: 5 < 7 → borrow from ones", "Ones 8→7, tenths 5→15:  15−7 = 8", "Ones: 7 − 3 = 4", "Answer: 4.8 ✓"],
    },
    {
      visual: "12.00 − 5.75", prompt: "Solve (decimals):",
      options: ["6.25", "6.75", "7.25", "6.35"], answer: 0,
      steps: ["  1 2.0 0", "−  5.7 5", "Hundredths: 0 < 5 → borrow chain", "Ones 2→1, tenths 0→9, hundredths 0→10", "10 − 5 = 5 (hundredths)", "9 − 7 = 2 (tenths)", "Ones: 1 < 5 → borrow from tens: 11−5 = 6", "Answer: 6.2 5 ✓"],
    },
    {
      visual: "100 − 63.5", prompt: "Solve (decimal):",
      options: ["36.5", "37.5", "36.0", "38.5"], answer: 0,
      steps: ["Write as 100.0 − 63.5", "Tenths: 0 < 5 → borrow chain", "100.0 → 099.10 (regroup once)", "10 − 5 = 5 (tenths)", "9 − 3 = 6 (ones)", "9 − 6 = 3 (tens)", "Answer: 36.5 ✓"],
    },
    {
      visual: "3/4 − 1/4", prompt: "Solve (fractions):",
      options: ["2/4 = 1/2", "2/8", "1/4", "3/8"], answer: 0,
      steps: ["Same denominator (4) → easy!", "Just subtract numerators:", "3 − 1 = 2", "Answer: 2/4", "Simplify: 2/4 = 1/2 ✓"],
    },
    {
      visual: "5/6 − 1/3", prompt: "Solve (LCD = 6):",
      options: ["3/6 = 1/2", "4/6", "1/6", "2/3"], answer: 0,
      fact: "1/3 = 2/6. So 5/6 − 2/6 = 3/6 = 1/2.",
      steps: ["Different denominators: 6 and 3", "LCD = 6", "Convert 1/3: multiply top & bottom by 2", "1/3 = 2/6", "Now: 5/6 − 2/6 = 3/6", "Simplify: 3/6 = 1/2 ✓"],
    },
    {
      visual: "7/8 − 3/8", prompt: "Solve (fractions):",
      options: ["4/8 = 1/2", "4/16", "1/4", "3/4"], answer: 0,
      steps: ["Same denominator (8) → easy!", "Subtract numerators: 7 − 3 = 4", "Answer: 4/8", "Simplify: 4/8 = 1/2 ✓"],
    },
    {
      visual: "3½ − 1¼", prompt: "Solve (mixed numbers):",
      options: ["2¼", "2½", "1¾", "2¾"], answer: 0,
      fact: "3½ = 3 2/4, 1¼ = 1 1/4. Answer: 2 1/4.",
      steps: ["LCD = 4: convert ½ → 2/4", "3 2/4 − 1 1/4", "Fractions: 2/4 > 1/4 → no borrowing needed", "Whole: 3 − 1 = 2", "Fraction: 2/4 − 1/4 = 1/4", "Answer: 2 1/4 ✓"],
    },
    {
      visual: "6⅓ − 2⅔", prompt: "Solve (borrow needed):",
      options: ["3⅔", "4⅓", "3⅓", "4⅔"], answer: 0,
      fact: "Borrow 1 from 6 → 5 4/3. Then 5 4/3 − 2 2/3 = 3 2/3.",
      steps: ["LCD = 3: 6 1/3 − 2 2/3", "Fractions: 1/3 < 2/3 → need to borrow!", "Borrow 1 whole from 6 → becomes 5", "Add 3/3 to fraction: 1/3 + 3/3 = 4/3", "Now: 5 4/3 − 2 2/3", "Whole: 5−2=3, Fraction: 4/3−2/3=2/3", "Answer: 3 2/3 ✓"],
    },
    {
      visual: "20,000 − 8,563", prompt: "Solve:",
      options: ["11,437", "12,437", "11,537", "10,437"], answer: 0,
      steps: ["  2 0,0 0 0", "−  8,5 6 3", "Regroup the chain of zeros:", "19,999 + 1 = 20,000 (regroup trick)", "Ones: 10−3=7  wait → 0−3: borrow chain", "Result: 11,437", "Check: 11,437 + 8,563 = 20,000 ✓"],
    },
    {
      visual: "15 − 7.89", prompt: "Solve (decimal):",
      options: ["7.11", "7.01", "8.11", "6.11"], answer: 0,
      steps: ["Write as 15.00 − 7.89", "Hundredths: 0 < 9 → borrow chain", "Ones 5→4, tenths 0→9, hundredths 0→10", "10 − 9 = 1 (hundredths)", "9 − 8 = 1 (tenths)", "Ones: 4 < 7 → borrow from tens: 14−7=7", "Answer: 7.11 ✓"],
    },
    {
      visual: "1,000,000 − 1", prompt: "Solve:",
      options: ["999,999", "99,999", "1,000,001", "900,000"], answer: 0,
      steps: ["1,000,000: one 1 followed by six 0s", "Subtracting 1 triggers a full regroup chain", "All 6 zeros become 9s", "The leading 1 becomes 0 (disappears)", "Answer: 999,999 ✓", "Check: 999,999 + 1 = 1,000,000 ✓"],
    },
  ]),
};

const boyMathSubQuiz: Quiz = {
  id: "boy-math-sub-quiz",
  mode: "boy",
  section: "math-subtraction",
  sectionLabel: "🏆 Quiz",
  title: "Subtraction: Quiz",
  tagline: "Word problems & mixed challenges",
  cover: coverChess,
  accent: "from-violet-400 to-purple-600",
  questions: finalize([
    {
      visual: "🛒",
      prompt: "A shirt costs $24.99. You pay $30. How much change do you get?",
      options: ["$5.01", "$5.11", "$4.01", "$5.99"],
      answer: 0,
      fact: "$30.00 − $24.99 = $5.01",
      steps: ["Write: $30.00 − $24.99", "Cents: 0 < 9 → borrow chain", "10 − 9 = 1¢", "Dimes: 9 − 9 = 0", "Dollars: 29 − 24 = 5 (after borrow)", "Change = $5.01 ✓"],
    },
    {
      visual: "📏",
      prompt: "A rope is 8.5 m long. 3.75 m is cut off. How much remains?",
      options: ["4.75 m", "4.25 m", "5.25 m", "4.50 m"],
      answer: 0,
      steps: ["Write: 8.50 − 3.75", "Hundredths: 0 < 5 → borrow: 10−5=5", "Tenths: 4 < 7 → borrow from ones: 14−7=7", "Ones: 7 − 3 = 4", "Answer: 4.75 m ✓"],
    },
    {
      visual: "🏃",
      prompt: "Rajan ran 5½ km total but turned back after 2¾ km. How far still to go?",
      options: ["2¾ km", "3 km", "2½ km", "3¼ km"],
      answer: 0,
      fact: "5½ − 2¾: borrow → 4 6/4 − 2 3/4 = 2 3/4 km.",
      steps: ["Total = 5½ km, ran so far = 2¾ km", "LCD = 4:  5 2/4 − 2 3/4", "Fraction: 2/4 < 3/4 → borrow from whole", "5 2/4 → 4 6/4 (borrow 1 whole = 4/4)", "4 6/4 − 2 3/4:", "Whole: 4−2=2, Fraction: 6/4−3/4=3/4", "Answer: 2¾ km ✓"],
    },
    {
      visual: "📦",
      prompt: "A warehouse had 15,000 boxes. 6,348 were shipped. How many remain?",
      options: ["8,652", "8,752", "9,652", "8,542"],
      answer: 0,
      steps: ["15,000 − 6,348", "Regroup through three zeros:", "14,999 + 1 = 15,000", "Ones: 10−8=2", "Tens: 9−4=5", "Hundreds: 9−3=6", "Thousands: 14−6=8", "Answer: 8,652 ✓"],
    },
    {
      visual: "🌡️",
      prompt: "Temperature dropped from 12.5°C to −3°C. By how many degrees did it fall?",
      options: ["15.5°C", "9.5°C", "15°C", "16°C"],
      answer: 0,
      fact: "12.5 − (−3) = 12.5 + 3 = 15.5°C. Subtracting a negative = adding!",
      steps: ["Start: 12.5°C, End: −3°C", "Change = 12.5 − (−3)", "Rule: subtracting a negative = adding!", "12.5 − (−3) = 12.5 + 3", "= 15.5°C ✓"],
    },
    {
      visual: "⛽",
      prompt: "Fuel tank: 50.4 L. After a trip, 18.75 L remains. How much was used?",
      options: ["31.65 L", "32.35 L", "31.25 L", "29.65 L"],
      answer: 0,
      steps: ["Used = Full − Remaining", "50.40 − 18.75", "Hundredths: 0 < 5 → borrow: 10−5=5", "Tenths: 3 < 7 → borrow chain: 13−7=6", "Ones: 9 − 8 = 1", "Tens: 4 − 1 = 3", "Answer: 31.65 L ✓"],
    },
    {
      visual: "📚",
      prompt: "Book has 320 pages. Emma has read 147. How many pages to go?",
      options: ["173", "183", "163", "193"],
      answer: 0,
      steps: ["Remaining = Total − Read", "320 − 147", "Ones: 0 < 7 → borrow: 10−7=3", "Tens: 1 < 4 → borrow: 11−4=7", "Hundreds: 2 − 1 = 1", "Answer: 173 pages ✓"],
    },
    {
      visual: "🏦",
      prompt: "Bank balance: $3,450.00. You spend $876.55. New balance?",
      options: ["$2,573.45", "$2,473.45", "$2,674.45", "$2,583.45"],
      answer: 0,
      steps: ["$3,450.00 − $876.55", "Cents: 0 < 5 → borrow chain", "10−5=5¢, then 9−5=4 dimes", "Ones: 9 − 6 = 3", "Tens: 4 < 7 → borrow: 14−7=7", "Hundreds: 3 < 8 → borrow: 13−8=5", "Thousands: 2 − 0 = 2", "Answer: $2,573.45 ✓"],
    },
    {
      visual: "🧪",
      prompt: "Beaker had 5/6 L. 1/4 L evaporated. How much is left? (LCD = 12)",
      options: ["7/12 L", "4/6 L", "1/2 L", "8/12 L"],
      answer: 0,
      fact: "5/6 = 10/12, 1/4 = 3/12. 10/12 − 3/12 = 7/12.",
      steps: ["5/6 − 1/4 (different denominators)", "LCD of 6 and 4 = 12", "5/6 = 10/12 (×2 top and bottom)", "1/4 = 3/12 (×3 top and bottom)", "10/12 − 3/12 = 7/12 ✓"],
    },
    {
      visual: "⏱️",
      prompt: "Race takes 2 h 40 min. After 1 h 55 min, how long remains?",
      options: ["45 min", "55 min", "1 hr 5 min", "40 min"],
      answer: 0,
      fact: "2h 40m − 1h 55m: borrow 1 hour → 1h 100m − 55m = 45 min.",
      steps: ["2h 40m − 1h 55m", "Minutes: 40 < 55 → borrow 1 hour", "2h 40m → 1h 100m", "Minutes: 100 − 55 = 45", "Hours: 1 − 1 = 0", "Answer: 45 minutes ✓"],
    },
    {
      visual: "🏗️",
      prompt: "Project needs 10,000 bricks. 3,764 laid so far. How many left?",
      options: ["6,236", "6,336", "7,236", "6,264"],
      answer: 0,
      steps: ["10,000 − 3,764", "Regroup through four zeros:", "10,000 → 9,999 + 1", "Ones: 10−4=6", "Tens: 9−6=3", "Hundreds: 9−7=2", "Thousands: 9−3=6", "Answer: 6,236 ✓"],
    },
    {
      visual: "💰",
      prompt: "You saved $500. Spend $127.49 then $83.75. How much left?",
      options: ["$288.76", "$298.76", "$278.76", "$308.76"],
      answer: 0,
      fact: "$500 − $211.24 = $288.76.",
      steps: ["Combine both spends first:", "$127.49 + $83.75 = $211.24", "Then: $500.00 − $211.24", "Hundredths: 0 < 4 → borrow chain", "Dollars: 499 − 211 (roughly)", "Answer: $288.76 ✓"],
    },
    {
      visual: "🍕",
      prompt: "Pizza has 8 slices. You eat 3, your brother eats 2. Fraction left?",
      options: ["3/8", "5/8", "2/8", "1/2"],
      answer: 0,
      fact: "8/8 − 3/8 − 2/8 = 3/8.",
      steps: ["Start with the whole: 8/8", "You eat: 8/8 − 3/8 = 5/8", "Brother eats: 5/8 − 2/8 = 3/8", "Or combine first: 3+2=5 eaten", "8 − 5 = 3 slices left = 3/8 ✓"],
    },
    {
      visual: "🌊",
      prompt: "Diver is at 42.6 m depth, swims up 17.85 m. New depth?",
      options: ["24.75 m", "25.25 m", "24.25 m", "60.45 m"],
      answer: 0,
      steps: ["Swimming UP = subtracting depth", "42.60 − 17.85", "Hundredths: 0 < 5 → borrow: 10−5=5", "Tenths: 5 < 8 → borrow: 15−8=7", "Ones: 1 < 7 → borrow: 11−7=4", "Tens: 3 − 1 = 2", "New depth: 24.75 m ✓"],
    },
    {
      visual: "🎯",
      prompt: "What is 1,000,000 − 999,001?",
      options: ["999", "1,001", "99", "9,999"],
      answer: 0,
      fact: "Don't let big numbers scare you — think addition!",
      steps: ["999,001 + ? = 1,000,000", "Think: 999,001 + 999 = 1,000,000?", "Check: 999,001 + 999 = 1,000,000 ✓", "So 1,000,000 − 999,001 = 999 ✓", "Tip: use the addition inverse shortcut!"],
    },
  ]),
};

export const QUIZZES: Quiz[] = [
  girlAnimals, girlColors, girlPrincess, girlFriends, girlFlags, girlDays,
  boyFlags, boyCapitals, boyScience, boyChess, boyDragons, boyPokemon, boyMath, boySpace, boyLandmarks,
  boyMathSubLesson, boyMathSubPractice, boyMathSubQuiz,
];

export function getQuizzesByMode(mode: Mode) {
  return QUIZZES.filter((q) => q.mode === mode);
}

export function getQuiz(id: string) {
  return QUIZZES.find((q) => q.id === id);
}
