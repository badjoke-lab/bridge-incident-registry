import fs from "node:fs";

const mappings = new Map([
  ["bir_src_000040", "https://web.archive.org/web/20260508231435/https://medium.com/thorchain/post-mortem-eth-router-exploits-1-2-and-premature-return-to-trading-incident-2908928c5fb"],
  ["bir_src_000042", "https://web.archive.org/web/20260508231435/https://medium.com/thorchain/post-mortem-eth-router-exploits-1-2-and-premature-return-to-trading-incident-2908928c5fb"],
  ["bir_src_000217", "https://web.archive.org/web/20260508231435/https://medium.com/thorchain/post-mortem-eth-router-exploits-1-2-and-premature-return-to-trading-incident-2908928c5fb"],
  ["bir_src_000048", "https://web.archive.org/web/20260725205241/https://medium.com/meter-io/post-mortem-report-meter-passport-12af6b50393d"],
  ["bir_src_000220", "https://web.archive.org/web/20260725205241/https://medium.com/meter-io/post-mortem-report-meter-passport-12af6b50393d"],
  ["bir_src_000221", "https://web.archive.org/web/20260725205241/https://medium.com/meter-io/post-mortem-report-meter-passport-12af6b50393d"],
  ["bir_src_000104", "https://web.archive.org/web/20220628053149/https://synapseprotocol.medium.com/11-06-2021-post-mortem-of-synapse-metapool-exploit-3003b4df4ef4"],
  ["bir_src_000236", "https://web.archive.org/web/20220628053149/https://synapseprotocol.medium.com/11-06-2021-post-mortem-of-synapse-metapool-exploit-3003b4df4ef4"],
  ["bir_src_000276", "https://web.archive.org/web/20220628053149/https://synapseprotocol.medium.com/11-06-2021-post-mortem-of-synapse-metapool-exploit-3003b4df4ef4"],
  ["bir_src_000065", "https://web.archive.org/web/20250729023040/https://medium.com/nomad-xyz-blog/nomad-bridge-hack-root-cause-analysis-875ad2e5aacd"],
  ["bir_src_000269", "https://web.archive.org/web/20250729023040/https://medium.com/nomad-xyz-blog/nomad-bridge-hack-root-cause-analysis-875ad2e5aacd"],
  ["bir_src_000030", "https://web.archive.org/web/20260715114539/https://medium.com/orbit-chain/official-statement-regarding-orbit-bridge-exploit-551928f3dc52"],
  ["bir_src_000031", "https://web.archive.org/web/20240512005240/https://medium.com/orbit-chain/orbit-bridge-exploit-asset-recovery-and-ecosystem-normalization-plan-draft-3aa7ac2a6e4a"]
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
const before = "risky_host_unarchived: 65,";
const after = "risky_host_unarchived: 59,";
const count = quality.split(before).length - 1;
if (count !== 1) throw new Error(`Expected exactly one quality limit: ${before}; observed ${count}`);
quality = quality.replace(before, after);
fs.writeFileSync(qualityPath, quality);

console.log(`Applied ${mappings.size} archive fields.`);
