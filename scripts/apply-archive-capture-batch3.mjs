import fs from "node:fs";

const mappings = new Map([
  ["bir_src_000141", "https://web.archive.org/web/20220922034804/https://medium.com/conflux-network/shuttleflow-protocol-passes-peckshield-security-audit-fe0aa0f20d27"],
  ["bir_src_000142", "https://web.archive.org/web/20241112012055/https://medium.com/conflux-network/shuttleflow-enabling-the-future-of-defi-through-true-multi-chain-connection-e60c2bada7d4"],
  ["bir_src_000143", "https://web.archive.org/web/20220921220844/https://medium.com/conflux-network/shuttleflow-v1-3-0-front-end-upgrade-released-301b2ab59437"],
  ["bir_src_000085", "https://web.archive.org/web/20220901155603/https://medium.com/pnetwork/introducing-pnetwork-v2-bfa7fcdcedb8"],
  ["bir_src_000089", "https://web.archive.org/web/20250523153354/https://medium.com/pnetwork/lessons-learnt-from-the-pgala-exploit-50e686730b98"],
  ["bir_src_000038", "https://web.archive.org/web/20251115174815/https://pancakebunny.medium.com/the-next-chapter-dao-9630b2c087b"]
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
  ["terminal_unarchived: 46,", "terminal_unarchived: 40,"],
  ["risky_host_unarchived: 75,", "risky_host_unarchived: 69,"]
];
for (const [before, after] of replacements) {
  const count = quality.split(before).length - 1;
  if (count !== 1) throw new Error(`Expected exactly one quality limit: ${before}; observed ${count}`);
  quality = quality.replace(before, after);
}
fs.writeFileSync(qualityPath, quality);

console.log(`Applied ${mappings.size} archive fields.`);
