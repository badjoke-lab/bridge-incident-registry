import fs from "node:fs";

const mappings = new Map([
  ["bir_src_000157", "https://web.archive.org/web/20241205032757/https://medium.com/@Magpieprotocol/magpie-protocol-charting-a-secure-path-following-exploit-c7046d9fc3ca"],
  ["bir_src_000253", "https://web.archive.org/web/20241205032757/https://medium.com/@Magpieprotocol/magpie-protocol-charting-a-secure-path-following-exploit-c7046d9fc3ca"],
  ["bir_src_000255", "https://web.archive.org/web/20241205032757/https://medium.com/@Magpieprotocol/magpie-protocol-charting-a-secure-path-following-exploit-c7046d9fc3ca"],
  ["bir_src_000071", "https://web.archive.org/web/20260306154253/https://chain-swap.medium.com/chainswap-post-mortem-and-compensation-plan-90cad50898ab"],
  ["bir_src_000228", "https://web.archive.org/web/20260306154253/https://chain-swap.medium.com/chainswap-post-mortem-and-compensation-plan-90cad50898ab"],
  ["bir_src_000074", "https://web.archive.org/web/20220929042722/https://chain-swap.medium.com/chainswap-re-launch-we-are-live-5e85d2f9c80f"],
  ["bir_src_000211", "https://web.archive.org/web/20220929042722/https://chain-swap.medium.com/chainswap-re-launch-we-are-live-5e85d2f9c80f"],
  ["bir_src_000161", "https://web.archive.org/web/20221104145206/https://cryptorubic.medium.com/rubic-weekly-report-11-04-2022-ce6196be68b8"],
  ["bir_src_000280", "https://web.archive.org/web/20221104145206/https://cryptorubic.medium.com/rubic-weekly-report-11-04-2022-ce6196be68b8"],
  ["bir_src_000032", "https://web.archive.org/web/20260713041951/https://medium.com/orbit-chain/orbit-bridge-strategies-for-service-resumption-draft-250c1acb3ecc"],
  ["bir_src_000033", "https://web.archive.org/web/20260713041950/https://medium.com/orbit-chain/orbit-bridge-follow-up-plan-e65d8cbabbb5"]
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
const before = "risky_host_unarchived: 59,";
const after = "risky_host_unarchived: 53,";
const count = quality.split(before).length - 1;
if (count !== 1) throw new Error(`Expected exactly one quality limit: ${before}; observed ${count}`);
quality = quality.replace(before, after);
fs.writeFileSync(qualityPath, quality);

console.log(`Applied ${mappings.size} archive fields.`);
