import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useMode } from "@/lib/mode";

/**
 * Procedural ambient background music using the Web Audio API.
 * - Girl mode: dreamy C-major bell arpeggios + soft pad (princess / sparkle)
 * - Boy mode:  D-minor low pulses + airy pad + tom hits (Wings of Fire epic)
 *
 * Audio context is only created after the first user gesture (browser policy).
 */

const STORAGE_MUTE = "quiz-muted";

type Engine = {
  ctx: AudioContext;
  master: GainNode;
  stop: () => void;
};

function startGirlTheme(ctx: AudioContext, master: GainNode): () => void {
  // Soft pad
  const pad = ctx.createOscillator();
  const padGain = ctx.createGain();
  pad.type = "sine";
  pad.frequency.value = 261.63; // C4
  padGain.gain.value = 0.04;
  pad.connect(padGain).connect(master);
  pad.start();

  const pad2 = ctx.createOscillator();
  const pad2Gain = ctx.createGain();
  pad2.type = "triangle";
  pad2.frequency.value = 392.0; // G4
  pad2Gain.gain.value = 0.025;
  pad2.connect(pad2Gain).connect(master);
  pad2.start();

  // Bell arpeggio in C major pentatonic-ish (C E G A C E)
  const scale = [523.25, 659.25, 783.99, 880.0, 1046.5, 1318.51];
  let step = 0;
  const playBell = () => {
    const freq = scale[step % scale.length];
    step = (step + 1) % scale.length;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = freq;
    const now = ctx.currentTime;
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.18, now + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);
    o.connect(g).connect(master);
    o.start(now);
    o.stop(now + 1.7);
  };
  const bellTimer = window.setInterval(playBell, 650);

  // Gentle shimmer (random higher bell)
  const shimmerTimer = window.setInterval(() => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "triangle";
    o.frequency.value = 1760 + Math.random() * 400;
    const now = ctx.currentTime;
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.06, now + 0.05);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);
    o.connect(g).connect(master);
    o.start(now);
    o.stop(now + 2.3);
  }, 3200);

  return () => {
    window.clearInterval(bellTimer);
    window.clearInterval(shimmerTimer);
    try { pad.stop(); } catch { /* */ }
    try { pad2.stop(); } catch { /* */ }
  };
}

function startBoyTheme(ctx: AudioContext, master: GainNode): () => void {
  // Deep drone (D2 + A2) — epic dragon vibe
  const drone = ctx.createOscillator();
  const droneGain = ctx.createGain();
  drone.type = "sawtooth";
  drone.frequency.value = 73.42; // D2
  droneGain.gain.value = 0.05;
  const droneFilter = ctx.createBiquadFilter();
  droneFilter.type = "lowpass";
  droneFilter.frequency.value = 320;
  drone.connect(droneFilter).connect(droneGain).connect(master);
  drone.start();

  const fifth = ctx.createOscillator();
  const fifthGain = ctx.createGain();
  fifth.type = "triangle";
  fifth.frequency.value = 110.0; // A2
  fifthGain.gain.value = 0.04;
  fifth.connect(fifthGain).connect(master);
  fifth.start();

  // Pulse hits (heart-beat / dragon wingbeat)
  const pulse = () => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = 55;
    const now = ctx.currentTime;
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.32, now + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
    o.connect(g).connect(master);
    o.start(now);
    o.stop(now + 0.5);
  };
  const pulseTimer = window.setInterval(pulse, 1100);

  // Sparse minor melody notes (D minor: D F A C)
  const notes = [293.66, 349.23, 440.0, 523.25, 440.0, 349.23];
  let i = 0;
  const melodyTimer = window.setInterval(() => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "triangle";
    o.frequency.value = notes[i % notes.length];
    i++;
    const now = ctx.currentTime;
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.1, now + 0.04);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);
    o.connect(g).connect(master);
    o.start(now);
    o.stop(now + 2.1);
  }, 2200);

  return () => {
    window.clearInterval(pulseTimer);
    window.clearInterval(melodyTimer);
    try { drone.stop(); } catch { /* */ }
    try { fifth.stop(); } catch { /* */ }
  };
}

export function MusicPlayer() {
  const { mode } = useMode();
  const [muted, setMuted] = useState<boolean>(true); // starts muted until user clicks
  const [started, setStarted] = useState(false);
  const engineRef = useRef<Engine | null>(null);

  // load persisted mute
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_MUTE);
      if (saved === "false") setMuted(false);
    } catch { /* */ }
  }, []);

  // (re)build engine when mode changes & not muted
  useEffect(() => {
    if (muted) return;
    let cancelled = false;

    const build = () => {
      if (cancelled) return;
      // tear down previous
      if (engineRef.current) {
        engineRef.current.stop();
        engineRef.current.master.disconnect();
        engineRef.current.ctx.close().catch(() => {});
        engineRef.current = null;
      }
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      const master = ctx.createGain();
      master.gain.value = 0.0;
      master.connect(ctx.destination);
      const stop = mode === "girl" ? startGirlTheme(ctx, master) : startBoyTheme(ctx, master);
      // fade in
      const now = ctx.currentTime;
      master.gain.linearRampToValueAtTime(0.6, now + 1.2);
      engineRef.current = { ctx, master, stop };
      setStarted(true);
    };

    build();
    return () => {
      cancelled = true;
    };
  }, [mode, muted]);

  // teardown when muted
  useEffect(() => {
    if (!muted) return;
    if (engineRef.current) {
      const { ctx, master, stop } = engineRef.current;
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.linearRampToValueAtTime(0.0, now + 0.4);
      window.setTimeout(() => {
        stop();
        master.disconnect();
        ctx.close().catch(() => {});
      }, 500);
      engineRef.current = null;
      setStarted(false);
    }
  }, [muted]);

  const toggle = () => {
    setMuted((m) => {
      const next = !m;
      try { localStorage.setItem(STORAGE_MUTE, String(next)); } catch { /* */ }
      return next;
    });
  };

  const label = muted ? "Unmute background music" : "Mute background music";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="fixed right-4 top-4 z-50 grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-white/30 text-foreground shadow-lg backdrop-blur-xl transition hover:scale-105 hover:bg-white/50"
    >
      {muted ? (
        <VolumeX className="h-5 w-5" />
      ) : (
        <Volume2 className={`h-5 w-5 ${started ? "animate-pulse" : ""}`} />
      )}
    </button>
  );
}

export default MusicPlayer;
