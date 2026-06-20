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
};

export type Quiz = {
  id: string;
  mode: Mode;
  title: string;
  tagline: string;
  cover: string;
  accent: string; // tailwind class for chip
  questions: Question[];
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

export const QUIZZES: Quiz[] = [
  girlAnimals, girlColors, girlPrincess, girlFriends, girlFlags, girlDays,
  boyFlags, boyCapitals, boyScience, boyChess, boyDragons, boyPokemon, boyMath, boySpace, boyLandmarks,
];

export function getQuizzesByMode(mode: Mode) {
  return QUIZZES.filter((q) => q.mode === mode);
}

export function getQuiz(id: string) {
  return QUIZZES.find((q) => q.id === id);
}
