import { createFileRoute } from "@tanstack/react-router";

const VOICE_SETTINGS = {
  stability: 0.42,
  similarity_boost: 0.9,
  style: 0.72,
};
const MODEL_ID = "eleven_v3";
const MAX_TEXT_LENGTH = 300;

// All available voices keyed by short name (matches ELEVENLABS_VOICE_<NAME> env vars)
const VOICE_MAP: Record<string, string | undefined> = {
  anvi:     process.env.ELEVENLABS_VOICE_ANVI,
  tara:     process.env.ELEVENLABS_VOICE_TARA,
  lia:      process.env.ELEVENLABS_VOICE_LIA,
  talethia: process.env.ELEVENLABS_VOICE_TALETHIA,
  charlie:  process.env.ELEVENLABS_VOICE_CHARLIE,
  saanvik:  process.env.ELEVENLABS_VOICE_SAANVIK,
  guddu:    process.env.ELEVENLABS_VOICE_GUDDU,
};

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonError(body: Record<string, unknown>, status: number) {
  return Response.json(body, { status, headers: CORS_HEADERS });
}

export const Route = createFileRoute("/api/tts")({
  server: {
    handlers: {
      OPTIONS: async () =>
        new Response(null, { status: 204, headers: CORS_HEADERS }),

      POST: async ({ request }) => {
        const apiKey = process.env.ELEVENLABS_API_KEY;
        if (!apiKey) {
          return jsonError({ error: "Missing ELEVENLABS_API_KEY." }, 500);
        }

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return jsonError({ error: "Invalid JSON body." }, 400);
        }

        const b = body as Record<string, unknown>;
        const text = typeof b?.text === "string" ? b.text.trim() : "";
        const voiceName = typeof b?.voice === "string" ? b.voice : "anvi";

        if (!text) {
          return jsonError({ error: "Field 'text' is required." }, 400);
        }
        if (text.length > MAX_TEXT_LENGTH) {
          return jsonError({ error: `Text exceeds ${MAX_TEXT_LENGTH} chars.` }, 400);
        }

        const voiceId = VOICE_MAP[voiceName] ?? VOICE_MAP["anvi"];
        if (!voiceId) {
          return jsonError({ error: `Voice "${voiceName}" not configured.` }, 500);
        }

        const ttsRes = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
          {
            method: "POST",
            headers: {
              "xi-api-key": apiKey,
              "Content-Type": "application/json",
              Accept: "audio/mpeg",
            },
            body: JSON.stringify({
              text,
              model_id: MODEL_ID,
              voice_settings: VOICE_SETTINGS,
            }),
          },
        );

        if (!ttsRes.ok) {
          const err = await ttsRes.text().catch(() => "");
          return jsonError({ error: "ElevenLabs TTS failed.", detail: err.slice(0, 300) }, 502);
        }

        return new Response(ttsRes.body, {
          status: 200,
          headers: {
            ...CORS_HEADERS,
            "Content-Type": "audio/mpeg",
            "Cache-Control": "public, max-age=86400, immutable",
          },
        });
      },
    },
  },
});
