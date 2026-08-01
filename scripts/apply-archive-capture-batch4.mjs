import fs from "node:fs";

const mappings = new Map([
  ["bir_src_000190", "https://web.archive.org/web/20251010212405/https://medium.com/connext/xpollinate-is-now-connext-bridge-d294baea94c2"],
  ["bir_src_000053", "https://web.archive.org/web/20260727170405/https://allbridge.medium.com/allbridge-core-updates-following-the-relaunch-9f7716eeb5da"],
  ["bir_src_000210", "https://web.archive.org/web/20260727170405/https://allbridge.medium.com/allbridge-core-updates-following-the-relaunch-9f7716eeb5da"],
  ["bir_src_000222", "https://web.archive.org/web/20260727170405/https://allbridge.medium.com/allbridge-core-updates-following-the-relaunch-9f7716eeb5da"],
  ["bir_src_000224", "https://web.archive.org/web/20260727170405/https://allbridge.medium.com/allbridge-core-updates-following-the-relaunch-9f7716eeb5da"],
  ["bir_src_000156", "https://web.archive.org/web/20250427092212/https://medium.com/@Magpieprotocol/magpie-protocol-smart-contract-vulnerability-post-mortem-f6400db0a25e"],
  ["bir_src_000251", "https://web.archive.org/web/20250427092212/https://medium.com/@Magpieprotocol/magpie-protocol-smart-contract-vulnerability-post-mortem-f6400db0a25e"],
  ["bir_src_000252", "https://web.archive.org/web/20250427092212/https://medium.com/@Magpieprotocol/magpie-protocol-smart-contract-vulnerability-post-mortem-f6400db0a25e"],
  ["bir_src_000254", "https://web.archive.org/web/20250427092212/https://medium.com/@Magpieprotocol/magpie-protocol-smart-contract-vulnerability-post-mortem-f6400db0a25e"],
  ["bir_src_000207", "https://web.archive.org/web/20260421175030/https://medium.com/thorchain/thorchains-layers-of-security-e308d537acf1"],
  ["bir_src_000208", "https://web.archive.org/web/20260421175030/https://medium.com/thorchain/thorchains-layers-of-security-e308d537acf1"],
  ["bir_src_000209", "https://web.archive.org/web/20260421175030/https://medium.com/thorchain/thorchains-layers-of-security-e308d537acf1"],
  ["bir_src_000218", "https://web.archive.org/web/20260421175030/https://medium.com/thorchain/thorchains-layers-of-security-e308d537acf1"]
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
const replacements = [
  ["terminal_unarchived: 40,", "terminal_unarchived: 39,"],
  ["risky_host_unarchived: 69,", "risky_host_unarchived: 65,"]
];
for (const [before, after] of replacements) {
  const count = quality.split(before).length - 1;
  if (count !== 1) throw new Error(`Expected exactly one quality limit: ${before}; observed ${count}`);
  quality = quality.replace(before, after);
}
fs.writeFileSync(qualityPath, quality);

console.log(`Applied ${mappings.size} archive fields.`);
