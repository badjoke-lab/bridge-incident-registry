import fs from "node:fs";

const EVIDENCE_PATH = "data/evidence.json";
const QUALITY_PATH = "scripts/check-source-quality-baseline.mjs";

const mappings = new Map([
  [
    "bir_src_000248",
    {
      source_url: "https://slowmist.medium.com/cross-chain-dex-aggregator-transit-swap-hacked-analysis-74ba39c22020",
      archived_url: "https://web.archive.org/web/20221002090056/https://slowmist.medium.com/cross-chain-dex-aggregator-transit-swap-hacked-analysis-74ba39c22020"
    }
  ],
  [
    "bir_src_000275",
    {
      source_url: "https://x.com/SocketDotTech/status/1749734794320363802",
      archived_url: "https://web.archive.org/web/20240123171406/https://twitter.com/socketdottech/status/1749734794320363802"
    }
  ],
  [
    "bir_src_000278",
    {
      source_url: "https://x.com/TransitFinance/status/1576463550557483008",
      archived_url: "https://web.archive.org/web/20221002214601/https://twitter.com/transitfinance/status/1576463550557483008"
    }
  ]
]);

const evidence = JSON.parse(fs.readFileSync(EVIDENCE_PATH, "utf8"));
if (!Array.isArray(evidence) || evidence.length !== 284) {
  throw new Error(`Unexpected evidence corpus size: ${Array.isArray(evidence) ? evidence.length : "not-array"}`);
}

const evidenceById = new Map(evidence.map((record) => [record.id, record]));
for (const [id, mapping] of mappings) {
  const record = evidenceById.get(id);
  if (!record) throw new Error(`Missing evidence record: ${id}`);
  if (record.url !== mapping.source_url) {
    throw new Error(`${id}: source URL drift; expected ${mapping.source_url}, observed ${record.url}`);
  }
  if (record.archived_url !== undefined && record.archived_url !== null && record.archived_url !== "") {
    throw new Error(`${id}: archived_url already populated: ${record.archived_url}`);
  }
  record.archived_url = mapping.archived_url;
}

const updatedIds = evidence.filter((record) => mappings.has(record.id) && mappings.get(record.id).archived_url === record.archived_url).map((record) => record.id);
if (updatedIds.length !== mappings.size) {
  throw new Error(`Expected ${mappings.size} updated records, observed ${updatedIds.length}`);
}

fs.writeFileSync(EVIDENCE_PATH, `[\n  ${evidence.map((record) => JSON.stringify(record)).join(",\n  ")}\n]\n`);

let qualitySource = fs.readFileSync(QUALITY_PATH, "utf8");
const oldCeiling = "  risky_host_unarchived: 29,";
const newCeiling = "  risky_host_unarchived: 27,";
const occurrences = qualitySource.split(oldCeiling).length - 1;
if (occurrences !== 1) {
  throw new Error(`Expected one risky-host ceiling occurrence, observed ${occurrences}`);
}
qualitySource = qualitySource.replace(oldCeiling, newCeiling);
fs.writeFileSync(QUALITY_PATH, qualitySource);

console.log(JSON.stringify({
  evidence_records: evidence.length,
  updated_ids: updatedIds,
  risky_host_ceiling: { before: 29, after: 27 }
}, null, 2));
