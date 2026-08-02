import fs from "node:fs";

const mappings = new Map([
  ["bir_src_000073", "https://web.archive.org/web/20240305013123/https://chain-swap.medium.com/asap-token-important-update-67073aae925c"],
  ["bir_src_000102", "https://web.archive.org/web/20250624094748/https://medium.com/synapse-protocol/introducing-synapse-protocol-2af926143deb"],
  ["bir_src_000162", "https://web.archive.org/web/20250317123228/https://cryptorubic.medium.com/introducing-the-new-rubic-tokenomics-the-way-forward-abca6cf11d8d"],
  ["bir_src_000163", "https://web.archive.org/web/20221130071532/https://cryptorubic.medium.com/cross-chain-bridge-rbc-brbc-and-brbc-tutorial-92158999cabe"],
  ["bir_src_000170", "https://web.archive.org/web/20251010113314/https://cryptorubic.medium.com/how-to-swap-using-rubic-contracts-3da46f0c830c"],
  ["bir_src_000204", "https://web.archive.org/web/20221126020156/https://medium.com/poly-network/poly-network-monthly-report-sep-a4cdd9f3fb7a"],
  ["bir_src_000268", "https://web.archive.org/web/20230401061939/https://roninblockchain.substack.com/p/community-alert-ronin-validators"],
  ["bir_src_000270", "https://web.archive.org/web/20221013202750/https://medium.com/poly-network/poly-network-asset-recovery-complete-a7ba33c2f2e4"],
  ["bir_src_000279", "https://web.archive.org/web/20221020165004/https://medium.com/@TransitSwap/updates-about-transitfinance-d05176918897"]
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
const before = "risky_host_unarchived: 46,";
const after = "risky_host_unarchived: 37,";
const count = quality.split(before).length - 1;
if (count !== 1) throw new Error(`Expected exactly one quality limit: ${before}; observed ${count}`);
quality = quality.replace(before, after);
fs.writeFileSync(qualityPath, quality);

console.log(`Applied ${mappings.size} archive fields.`);
