import fs from "node:fs";

const mappings = new Map([
  ["bir_src_000049", "https://web.archive.org/web/20221110135030/https://medium.com/meter-io/the-meter-monthly-february-2022-7172b75f40a5"],
  ["bir_src_000051", "https://web.archive.org/web/20260726003029/https://medium.com/meter-io/meter-passport-v1-5-completes-a-rigorous-audit-by-haechi-760cbda5959"],
  ["bir_src_000054", "https://web.archive.org/web/20230405082243/https://allbridge.medium.com/compensation-plan-announcement-3c0593987763"],
  ["bir_src_000066", "https://web.archive.org/web/20250612171546/https://medium.com/nomad-xyz-blog/the-road-to-recovery-6abe5eec8ff1"],
  ["bir_src_000067", "https://web.archive.org/web/20251117051032/https://medium.com/nomad-xyz-blog/nomad-bridge-relaunch-guide-3a4ef6624f90"],
  ["bir_src_000072", "https://web.archive.org/web/20260322055929/https://chain-swap.medium.com/chainswap-exploit-11-july-2021-post-mortem-6e4e346e5a32"],
  ["bir_src_000103", "https://web.archive.org/web/20240714155645/https://medium.com/synapse-protocol/synapses-mainnet-launch-the-hadean-phase-d09fc74b2272"]
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
  throw new Error(`Expected ${mappings.size} archive fields, observed ${applied.length}`);
}

const serialized = `[{BODY}]\n`.replace("{BODY}", `\n${evidence.map((item) => `  ${JSON.stringify(item)}`).join(",\n")}\n`);
fs.writeFileSync(evidencePath, serialized);

let quality = fs.readFileSync(qualityPath, "utf8");
const before = "risky_host_unarchived: 53,";
const after = "risky_host_unarchived: 46,";
const count = quality.split(before).length - 1;
if (count !== 1) throw new Error(`Expected exactly one quality limit: ${before}; observed ${count}`);
quality = quality.replace(before, after);
fs.writeFileSync(qualityPath, quality);

console.log(`Applied ${mappings.size} archive fields.`);
