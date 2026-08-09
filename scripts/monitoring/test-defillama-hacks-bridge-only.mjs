import fs from "node:fs";
import { applySignal } from "./core/state.mjs";
import { watchDefillamaHacksPage } from "./monitors/defillama-hacks-page-watch.mjs";

const bridges = JSON.parse(fs.readFileSync("data/bridges.json", "utf8"));
const evidence = JSON.parse(fs.readFileSync("data/evidence.json", "utf8"));
const filler = Array.from({ length: 20 }, (_, index) => ({
  name: `Filler ${index}`,
  date: 1700000000 + index,
  amount: index + 1,
  bridgeHack: false,
  technique: "fixture",
  classification: "fixture"
}));
const rows = [
  ...filler,
  {
    name: "THORChain DEX",
    date: 1626912000,
    amount: 8000000,
    bridgeHack: false,
    technique: "Refund Logic Exploit",
    classification: "Protocol Logic",
    targetType: "DeFi Protocol"
  },
  {
    name: "Unknown Bridge Fixture",
    date: 1780000000,
    amount: 1234,
    bridgeHack: true,
    technique: "Bridge fixture exploit",
    classification: "Infrastructure",
    targetType: "DeFi Protocol"
  }
];
const envelope = `<script id="__NEXT_DATA__" type="application/json">${JSON.stringify({ props: { pageProps: { data: rows } } })}</script>`;
const state = { version: 1, signals: {} };
const result = watchDefillamaHacksPage({
  html: envelope,
  canonicalBridges: bridges,
  canonicalEvidence: evidence,
  state,
  applySignal,
  observedAt: "2026-08-09T09:10:00Z",
  sourceUrl: "https://api.llama.fi/hacks",
  sourceKind: "legacy_public_json",
  sourceSha256: "c".repeat(64)
});

if (result.relevant_count !== 1 || result.bridge_flag_rows !== 1 || result.baseline_seeded_count !== 1) {
  throw new Error(`bridgeHack=false canonical-name rows must not enter the bridge-incident baseline: ${JSON.stringify(result)}`);
}
if (result.exact_canonical_matches !== 0) {
  throw new Error(`non-bridge canonical-name exploit leaked into exact bridge matches: ${JSON.stringify(result)}`);
}
console.log("DefiLlama bridge-only relevance test passed (canonical-name protocol exploit excluded unless bridgeHack=true).");
