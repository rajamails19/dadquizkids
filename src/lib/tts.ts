/**
 * QuestKid TTS — ElevenLabs eleven_v3, mode-aware voice mixing
 *
 * Girl mode → randomly picks from: Anvi, Tara, Lia, Talethia
 * Boy  mode → randomly picks from: Charlie, Saanvik, Guddu
 *
 * Overlap & cut-off prevention:
 *   - Module-level AbortController: every new speak() call aborts the
 *     previous in-flight ElevenLabs fetch before starting its own.
 *   - cancelSpeak() stops both the active <audio> element AND any
 *     pending fetch — call it whenever the card changes.
 */
import { getCachedAudio, putCachedAudio } from "./ttsCache";
import type { Mode } from "./mode";

// ── Voice pools ──────────────────────────────────────────────────────
const GIRL_VOICES = ["anvi", "tara", "lia", "talethia"] as const;
const BOY_VOICES  = ["charlie", "saanvik", "guddu"] as const;

function pickVoice(mode: Mode): string {
  const pool = mode === "girl" ? GIRL_VOICES : BOY_VOICES;
  return pool[Math.floor(Math.random() * pool.length)];
}

// ── Celebration & result phrases ────────────────────────────────────
const GIRL_CELEBRATE = [
  "Hooray! You got it!",
  "Yay! Brilliant work!",
  "Yes! You're a superstar!",
  "Wonderful! That's right!",
  "Amazing! Gold star for you!",
  "Woohoo! You're so smart!",
];
const BOY_CELEBRATE = [
  "Yes! Nailed it!",
  "Correct! You're on fire!",
  "Boom! Right answer!",
  "Brilliant! Keep going!",
  "Perfect! You legend!",
  "Awesome! That's the one!",
];

/**
 * Speak a celebration or correction after the kid answers.
 *
 * Correct  → e.g. "Hooray! You got it!  Elephants sleep standing up!"
 * Wrong    → e.g. "Oops! The answer was Elephant.  They are the biggest land animal!"
 */
export function speakResult(
  isCorrect: boolean,
  mode: Mode,
  correctAnswer: string,
  fact?: string,
) {
  const celebPool = mode === "girl" ? GIRL_CELEBRATE : BOY_CELEBRATE;
  let phrase: string;

  if (isCorrect) {
    phrase = celebPool[Math.floor(Math.random() * celebPool.length)];
  } else {
    phrase = `Oops! The answer was ${correctAnswer}.`;
  }

  // Append the fun fact if there is one
  if (fact) phrase += "  " + fact;

  speak(phrase, mode); // fire & forget
}

// ── Audio plumbing ───────────────────────────────────────────────────
let currentAudio: HTMLAudioElement | null = null;
let currentController: AbortController | null = null;

export function cancelSpeak() {
  if (currentController) {
    currentController.abort();
    currentController = null;
  }
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.src = "";
    currentAudio = null;
  }
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

async function playBlob(blob: Blob): Promise<void> {
  return new Promise((resolve) => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.src = "";
    }
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    currentAudio = audio;
    audio.onended = () => {
      URL.revokeObjectURL(url);
      if (currentAudio === audio) currentAudio = null;
      resolve();
    };
    audio.onerror = () => {
      URL.revokeObjectURL(url);
      if (currentAudio === audio) currentAudio = null;
      resolve();
    };
    audio.play().catch(() => resolve());
  });
}

function browserFallback(text: string, mode: Mode): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.88;
  u.pitch = mode === "girl" ? 1.2 : 1.0;
  window.speechSynthesis.speak(u);
}

export async function speak(text: string, mode: Mode = "girl"): Promise<void> {
  if (!text?.trim()) return;
  const cleaned = text.trim().slice(0, 300);
  const voice = pickVoice(mode);

  cancelSpeak();
  const controller = new AbortController();
  currentController = controller;

  try {
    const cached = await getCachedAudio(cleaned, voice);
    if (controller.signal.aborted) return;
    if (cached) {
      currentController = null;
      await playBlob(cached);
      return;
    }

    const res = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: cleaned, voice }),
      signal: controller.signal,
    });

    if (controller.signal.aborted) return;
    currentController = null;

    if (!res.ok) {
      browserFallback(cleaned, mode);
      return;
    }

    const blob = await res.blob();
    if (controller.signal.aborted) return;

    putCachedAudio(cleaned, blob, voice).catch(() => {});
    await playBlob(blob);
  } catch (err: unknown) {
    if (err instanceof Error && err.name === "AbortError") return;
    browserFallback(cleaned, mode);
  }
}
