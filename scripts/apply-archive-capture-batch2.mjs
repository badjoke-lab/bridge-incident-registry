import fs from "node:fs";

const mappings = new Map([
  ["bir_src_000126", "https://web.archive.org/web/20250521035806/https://medium.com/renprotocol/renvm-mainnet-release-98cac4c6fa8e"],
  ["bir_src_000127", "https://web.archive.org/web/20250308100903/https://medium.com/renprotocol/introducing-renbridge-3-0-2b5f49aaf722"],
  ["bir_src_000128", "https://web.archive.org/web/20260226145159/https://medium.com/renprotocol/introducing-ren-2-0-43025b3d5d6"],
  ["bir_src_000129", "https://web.archive.org/web/20260725170101/https://medium.com/renprotocol/moving-on-from-alameda-da62a823ce93"],
  ["bir_src_000130", "https://web.archive.org/web/20260725170101/https://medium.com/renprotocol/moving-on-from-alameda-da62a823ce93"],
  ["bir_src_000133", "https://web.archive.org/web/20221113235304/https://medium.com/avalancheavax/introducing-the-avalanche-ethereum-light-bridge-aelb-through-the-cyberfi-asset-management-b280e830702f"],
  ["bir_src_000134", "https://web.archive.org/web/20221113235737/https://medium.com/avalancheavax/preparing-for-the-next-generation-avalanche-bridge-ab-26f7521485e7"],
  ["bir_src_000135", "https://web.archive.org/web/20260429222010/https://medium.com/avalancheavax/new-avalanche-bridge-builds-on-intel-sgx-technology-in-breakthrough-for-cross-chain-8f854e0e72e0"],
  ["bir_src_000136", "https://web.archive.org/web/20230604024916/https://medium.com/avalancheavax/avalanche-bridge-secure-cross-chain-asset-transfers-using-intel-sgx-b04f5a4c7ad1"],
  ["bir_src_000138", "https://web.archive.org/web/20260429222010/https://medium.com/avalancheavax/new-avalanche-bridge-builds-on-intel-sgx-technology-in-breakthrough-for-cross-chain-8f854e0e72e0"],
  ["bir_src_000139", "https://web.archive.org/web/20230604024916/https://medium.com/avalancheavax/avalanche-bridge-secure-cross-chain-asset-transfers-using-intel-sgx-b04f5a4c7ad1"]
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
  ["terminal_unarchived: 54,", "terminal_unarchived: 46,"],
  ["risky_host_unarchived: 83,", "risky_host_unarchived: 75,"]
];
for (const [before, after] of replacements) {
  const count = quality.split(before).length - 1;
  if (count !== 1) throw new Error(`Expected exactly one quality limit: ${before}; observed ${count}`);
  quality = quality.replace(before, after);
}
fs.writeFileSync(qualityPath, quality);

console.log(`Applied ${mappings.size} archive fields.`);
