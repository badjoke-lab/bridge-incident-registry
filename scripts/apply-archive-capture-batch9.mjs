import fs from "node:fs";

const mappings = new Map([
  ["bir_src_000203", "https://web.archive.org/web/20230101195631/https://medium.com/poly-network/poly-network-mainnet-upgrade-goes-live-d708f4fa2cf1"]
]);

const evidencePath = "data/evidence.json";
const qualityPath = "scripts/check-source-quality-baseline.mjs";
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
const byId = new Map(evidence.map((item) => [item.id, item]));

for (const [id, archivedUrl] of mappings) {
  const record = byId.get(id);
  if (!record) throw new Error(`Missing evidence record: ${id}`);
  if (record.archived_url && record.archived_url !== archivedUrl) {
    throw new Error(`Conflicting archived_url for ${id}`);
  }
  record.archived_url = archivedUrl;
}

const applied = evidence.filter((item) => mappings.has(item.id) && item.archived_url === mappings.get(item.id));
if (applied.length !== mappings.size) {
  throw new Error(`Expected ${mappings.size} archive field, observed ${applied.length}`);
}

const serialized = `[{BODY}]\n`.replace("{BODY}", `\n${evidence.map((item) => `  ${JSON.stringify(item)}`).join(",\n")}\n`);
fs.writeFileSync(evidencePath, serialized);

let quality = fs.readFileSync(qualityPath, "utf8");
const before = "risky_host_unarchived: 37,";
const after = "risky_host_unarchived: 36,";
const count = quality.split(before).length - 1;
if (count !== 1) throw new Error(`Expected exactly one quality limit: ${before}; observed ${count}`);
quality = quality.replace(before, after);
fs.writeFileSync(qualityPath, quality);

console.log(`Applied ${mappings.size} archive field.`);
