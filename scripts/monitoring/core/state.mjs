import fs from "node:fs";
import path from "node:path";
import { STATE_PATH } from "../config.mjs";

export function loadState() {
  if (!fs.existsSync(STATE_PATH)) return { version: 1, signals: {} };
  const state = JSON.parse(fs.readFileSync(STATE_PATH, "utf8"));
  if (state.version !== 1 || typeof state.signals !== "object" || state.signals === null) {
    throw new Error("invalid monitoring state");
  }
  return state;
}

export function applySignal(state, { key, fingerprint, observedAt }) {
  const previous = state.signals[key];
  if (previous?.fingerprint === fingerprint) return { changed: false, previous };

  state.signals[key] = {
    fingerprint,
    first_seen_at: previous?.first_seen_at ?? observedAt,
    last_changed_at: observedAt
  };
  return { changed: true, previous };
}

export function writeState(state) {
  fs.mkdirSync(path.dirname(STATE_PATH), { recursive: true });
  fs.writeFileSync(STATE_PATH, `${JSON.stringify(state, null, 2)}\n`);
}
