/**
 * Procedural sound effects via Web Audio API — no audio files needed.
 * All functions are safe to call server-side (they check for window).
 */

let _ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!_ctx) {
    try {
      _ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    } catch { return null; }
  }
  if (_ctx.state === "suspended") _ctx.resume().catch(() => {});
  return _ctx;
}

function tone(
  freq: number,
  duration = 0.15,
  type: OscillatorType = "sine",
  gain = 0.18,
  startOffset = 0,
) {
  const ctx = getCtx();
  if (!ctx) return;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.value = freq;
  const t = ctx.currentTime + startOffset;
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(gain, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  o.connect(g).connect(ctx.destination);
  o.start(t);
  o.stop(t + duration + 0.02);
}

/** Short noise burst — one single clap hit */
function singleClap(startOffset = 0, gainMul = 1) {
  const ctx = getCtx();
  if (!ctx) return;
  const duration = 0.12;
  const bufLen = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, bufLen, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufLen; i++) {
    // White noise with fast exponential decay
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.025));
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;

  // Light bandpass to make it sound more hand-claplike
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 1200;
  bp.Q.value = 0.8;

  const g = ctx.createGain();
  const t = ctx.currentTime + startOffset;
  g.gain.setValueAtTime(0.55 * gainMul, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + duration);

  source.connect(bp).connect(g).connect(ctx.destination);
  source.start(t);
  source.stop(t + duration + 0.02);
}

// ── Public sound effects ─────────────────────────────────────────────

/** Three quick claps — plays on correct answer */
export function playClaps() {
  singleClap(0,    1.0);
  singleClap(0.18, 0.9);
  singleClap(0.36, 0.8);
}

/** Rising two-note chime — correct answer musical cue */
export function playChime() {
  tone(880,  0.12, "triangle", 0.20, 0);
  tone(1320, 0.18, "triangle", 0.18, 0.09);
}

/** Low double buzz — wrong answer cue */
export function playBuzz() {
  tone(180, 0.18, "sawtooth", 0.12, 0);
  tone(140, 0.22, "sawtooth", 0.10, 0.09);
}

/** Claps + chime together for a bigger correct celebration */
export function playCelebration() {
  playClaps();
  // Chime comes in slightly after the claps settle
  setTimeout(playChime, 420);
}
