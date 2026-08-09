import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { applySignal } from "./core/state.mjs";
import { parseDefillamaHacksPage, watchDefillamaHacksPage } from "./monitors/defillama-hacks-page-watch.mjs";

const root = process.cwd();
const bridges = JSON.parse(fs.readFileSync(path.join(root, "data/bridges.json"), "utf8"));
const evidence = JSON.parse(fs.readFileSync(path.join(root, "data/evidence.json"), "utf8"));

function html(rows) {
  const nextData = { props: { pageProps: { arbitraryWrapper: { data: rows } } } };
  return `<!doctype html><html><body><script id="__NEXT_DATA__" type="application/json">${JSON.stringify(nextData)}</script></body></html>`;
}

function fillerRows() {
  return Array.from({ length: 24 }, (_, index) => ({
    name: `Non Bridge Protocol ${index}`,
    date: 1700000000 + index * 86400,
    amount: 1000 + index,
    classification: "Protocol Logic",
    technique: "Fixture exploit",
    bridge: false,
    link: `https://news.example/nonbridge-${index}`,
    chains: ["Ethereum"]
  }));
}

let malformedFailed = false;
try {
  parseDefillamaHacksPage("<html>missing next data</html>");
} catch {
  malformedFailed = true;
}
if (!malformedFailed) throw new Error("missing __NEXT_DATA__ must fail closed");

const initialRows = [
  ...fillerRows(),
  {
    name: "Ronin Bridge",
    date: 1710000000,
    amount: 1000000,
    classification: "Protocol Logic",
    technique: "Fixture verification exploit",
    bridge: true,
    link: "https://news.example/ronin-old",
    chains: ["Ethereum", "Ronin"]
  },
  {
    name: "Historical Unknown Bridge",
    date: 1710086400,
    amount: 2000000,
    classification: "Infrastructure",
    technique: "Fixture key compromise",
    bridge: true,
    link: "https://news.example/unknown-old",
    chains: ["Ethereum"]
  }
];

const parsed = parseDefillamaHacksPage(html(initialRows));
if (parsed.length !== 26) throw new Error(`expected 26 parsed hack rows, got ${parsed.length}`);

const state = { version: 1, signals: {} };
const baseline = watchDefillamaHacksPage({
  html: html(initialRows), canonicalBridges: bridges, canonicalEvidence: evidence,
  state, applySignal, observedAt: "2026-08-09T08:20:00.000Z", limit: 8
});
if (!baseline.baseline_initialized || !baseline.state_changed || baseline.candidates.length !== 0) {
  throw new Error(`first hacks page run must be zero-candidate baseline: ${JSON.stringify(baseline)}`);
}
if (baseline.relevant_count !== 2 || baseline.baseline_seeded_count !== 2 || baseline.exact_canonical_matches !== 1) {
  throw new Error(`baseline relevant counts mismatch: ${JSON.stringify(baseline)}`);
}

const repeat = watchDefillamaHacksPage({
  html: html(initialRows), canonicalBridges: bridges, canonicalEvidence: evidence,
  state, applySignal, observedAt: "2026-08-09T08:21:00.000Z", limit: 8
});
if (repeat.state_changed || repeat.emitted_count !== 0 || repeat.unchanged_count !== 2) {
  throw new Error(`unchanged hacks page must be silent: ${JSON.stringify(repeat)}`);
}

const canonicalDuplicateUrl = evidence.find((row) => typeof row.url === "string" && row.url.startsWith("http"))?.url;
if (!canonicalDuplicateUrl) throw new Error("fixture requires one canonical evidence URL");

const changedRows = [
  ...initialRows,
  {
    name: "Wormhole",
    date: 1786204800,
    amount: 3000000,
    classification: "Protocol Logic",
    technique: "New fixture exploit",
    bridge: true,
    link: "https://news.example/wormhole-new",
    chains: ["Ethereum", "Solana"]
  },
  {
    name: "New Unknown Bridge",
    date: 1786291200,
    amount: 4000000,
    classification: "Infrastructure",
    technique: "New fixture compromise",
    bridge: true,
    link: "https://news.example/new-unknown",
    chains: ["Ethereum"]
  },
  {
    name: "Canonical Duplicate Bridge",
    date: 1786377600,
    amount: 5000000,
    classification: "Protocol Logic",
    technique: "Duplicate fixture",
    bridge: true,
    link: canonicalDuplicateUrl,
    chains: ["Ethereum"]
  }
];

const changed = watchDefillamaHacksPage({
  html: html(changedRows), canonicalBridges: bridges, canonicalEvidence: evidence,
  state, applySignal, observedAt: "2026-08-09T08:22:00.000Z", limit: 8
});
if (changed.emitted_count !== 2 || changed.canonical_evidence_duplicates !== 1) {
  throw new Error(`expected two candidates and one canonical URL suppression: ${JSON.stringify(changed)}`);
}
const known = changed.candidates.find((candidate) => candidate.candidate_class === "B");
const unresolved = changed.candidates.find((candidate) => candidate.candidate_class === "C");
if (!known || known.canonical_name !== "Wormhole") throw new Error(`exact canonical hack name must be B/hold: ${JSON.stringify(known)}`);
if (!unresolved || unresolved.canonical_name !== "New Unknown Bridge") throw new Error(`unresolved bridge-flag hack must be C/hold: ${JSON.stringify(unresolved)}`);

const capState = { version: 1, signals: {} };
watchDefillamaHacksPage({ html: html(initialRows), canonicalBridges: bridges, canonicalEvidence: evidence, state: capState, applySignal, observedAt: "2026-08-09T08:23:00.000Z", limit: 8 });
const capRows = [
  ...initialRows,
  { name: "Cap Bridge A", date: 1786464000, amount: 1, bridge: true, technique: "x", link: "https://cap.example/a" },
  { name: "Cap Bridge B", date: 1786550400, amount: 2, bridge: true, technique: "y", link: "https://cap.example/b" }
];
const capped = watchDefillamaHacksPage({ html: html(capRows), canonicalBridges: bridges, canonicalEvidence: evidence, state: capState, applySignal, observedAt: "2026-08-09T08:24:00.000Z", limit: 1 });
if (capped.emitted_count !== 1 || capped.deferred_changed_count !== 1) throw new Error(`candidate ceiling must defer overflow: ${JSON.stringify(capped)}`);

console.log("DefiLlama hacks page controlled tests passed (fail-closed parser, bridge baseline, B/C classification, canonical URL suppression, cap deferral).");
