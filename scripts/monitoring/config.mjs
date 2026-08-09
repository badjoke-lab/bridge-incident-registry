export const CANONICAL_PATHS = Object.freeze([
  "data/bridges.json",
  "data/incidents.json",
  "data/events.json",
  "data/evidence.json"
]);

export const OUTPUT_ROOT = "data-staging/monitoring";
export const WATCHLIST_ROOT = "data-staging/watchlists/auto";
export const STATE_PATH = "data-staging/monitoring/state.json";

export const CANDIDATE_CLASSES = Object.freeze(["A", "B", "C"]);
export const SEVERITIES = Object.freeze(["critical", "high", "medium", "low"]);

export const MONITOR_NAMES = Object.freeze([
  "github-issue-watch",
  "evidence-health-watch",
  "monitoring-health-watch"
]);
