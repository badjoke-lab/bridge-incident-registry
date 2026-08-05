import fs from "node:fs";

const evidencePath = "data/evidence.json";
const qualityPath = "scripts/check-source-quality-baseline.mjs";
const auditPath = "docs/audits/phase3-archive-capture-batch15-2026-08-05.md";

const mappings = [
  {
    ids: ["bir_src_000023"],
    url: "https://www.elliptic.co/blog/analysis/attack-mints-569-million-worth-of-bnb-tokens-in-bsc-bridge-exploit",
    archived_url: "https://web.archive.org/web/20230922124338/https://www.elliptic.co/blog/analysis/attack-mints-569-million-worth-of-bnb-tokens-in-bsc-bridge-exploit"
  },
  {
    ids: ["bir_src_000022", "bir_src_000205", "bir_src_000214"],
    url: "https://www.bnbchain.org/en/blog/bnb-chain-a-decentralized-response",
    archived_url: "https://web.archive.org/web/20221011125745/https://www.bnbchain.org/en/blog/bnb-chain-a-decentralized-response/"
  },
  {
    ids: ["bir_src_000091"],
    url: "https://slowmist.medium.com/slowmist-the-root-cause-of-the-pgala-event-is-that-the-plaintext-of-the-private-key-was-leaked-on-6e117ccf5473",
    archived_url: "https://web.archive.org/web/20250913010536/https://slowmist.medium.com/slowmist-the-root-cause-of-the-pgala-event-is-that-the-plaintext-of-the-private-key-was-leaked-on-6e117ccf5473"
  },
  {
    ids: ["bir_src_000206"],
    url: "https://www.bnbchain.org/en/blog/technology-update-of-bnb-chain-in-october-2022",
    archived_url: "https://web.archive.org/web/20221108164017/https://bnbchain.org/en/blog/technology-update-of-bnb-chain-in-october-2022/"
  },
  {
    ids: ["bir_src_000014"],
    url: "https://www.fbi.gov/news/press-releases/fbi-confirms-lazarus-group-cyber-actors-responsible-for-harmonys-horizon-bridge-currency-theft",
    archived_url: "https://web.archive.org/web/20230124144331/https://www.fbi.gov/news/press-releases/fbi-confirms-lazarus-group-cyber-actors-responsible-for-harmonys-horizon-bridge-currency-theft"
  },
  {
    ids: ["bir_src_000149"],
    url: "https://slowmist.medium.com/cross-chain-dex-aggregator-transit-swap-hacked-analysis-74ba39c22020",
    archived_url: "https://web.archive.org/web/20221002090056/https://slowmist.medium.com/cross-chain-dex-aggregator-transit-swap-hacked-analysis-74ba39c22020"
  },
  {
    ids: ["bir_src_000167"],
    url: "https://medium.com/dcentralab-diligence/dcentralab-diligence-analysis-rubic-dex-aggregator-hack-d5ffd2505239",
    archived_url: "https://web.archive.org/web/20221226210143/https://medium.com/dcentralab-diligence/dcentralab-diligence-analysis-rubic-dex-aggregator-hack-d5ffd2505239"
  }
];

const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
const byId = new Map(evidence.map((item) => [item.id, item]));
const before = JSON.stringify(evidence);
const changedIds = [];

for (const mapping of mappings) {
  for (const id of mapping.ids) {
    const item = byId.get(id);
    if (!item) throw new Error(`Missing expected evidence ID: ${id}`);
    if (item.url !== mapping.url) {
      throw new Error(`${id} canonical URL mismatch: ${item.url}`);
    }
    if (typeof item.archived_url === "string" && item.archived_url.trim()) {
      throw new Error(`${id} already has archived_url: ${item.archived_url}`);
    }
    item.archived_url = mapping.archived_url;
    changedIds.push(id);
  }
}

if (changedIds.length !== 9 || new Set(changedIds).size !== 9) {
  throw new Error(`Expected 9 unique changed IDs, got ${changedIds.length}`);
}

for (const item of evidence) {
  const original = JSON.parse(before).find((entry) => entry.id === item.id);
  if (!changedIds.includes(item.id) && JSON.stringify(item) !== JSON.stringify(original)) {
    throw new Error(`Unexpected evidence mutation: ${item.id}`);
  }
}

fs.writeFileSync(evidencePath, `${JSON.stringify(evidence, null, 2)}\n`);

let quality = fs.readFileSync(qualityPath, "utf8");
const replacements = [
  ["terminal_unarchived: 33,", "terminal_unarchived: 28,"],
  ["risky_host_unarchived: 24,", "risky_host_unarchived: 21,"]
];
for (const [from, to] of replacements) {
  if (!quality.includes(from)) throw new Error(`Missing exact quality ceiling: ${from}`);
  quality = quality.replace(from, to);
}
fs.writeFileSync(qualityPath, quality);

const bridges = JSON.parse(fs.readFileSync("data/bridges.json", "utf8"));
const bridgesById = new Map(bridges.map((item) => [item.id, item]));
const terminalStatuses = new Set(["dead", "deprecated", "migrated"]);
const riskyHosts = ["x.com", "twitter.com", "medium.com", "mirror.xyz", "substack.com", "docs.google.com", "notion.site"];
const hasArchive = (item) => typeof item.archived_url === "string" && item.archived_url.trim().length > 0;
const hostOf = (raw) => new URL(raw).hostname.replace(/^www\./, "").toLowerCase();
const risky = (host) => riskyHosts.some((base) => host === base || host.endsWith(`.${base}`));
const uniqueCount = (records) => new Set(records.map((item) => new URL(item.url).toString())).size;
const terminalRecords = evidence.filter((item) => terminalStatuses.has(bridgesById.get(item.bridge_id)?.status) && !hasArchive(item));
const riskyRecords = evidence.filter((item) => risky(hostOf(item.url)) && !hasArchive(item));
const xRecords = evidence.filter((item) => ["x.com", "twitter.com"].includes(hostOf(item.url)) && !hasArchive(item));
const metrics = {
  archived: evidence.filter(hasArchive).length,
  terminal_unique: uniqueCount(terminalRecords),
  terminal_records: terminalRecords.length,
  risky_unique: uniqueCount(riskyRecords),
  risky_records: riskyRecords.length,
  x_records: xRecords.length
};
const expected = {
  archived: 110,
  terminal_unique: 28,
  terminal_records: 38,
  risky_unique: 21,
  risky_records: 35,
  x_records: 30
};
if (JSON.stringify(metrics) !== JSON.stringify(expected)) {
  throw new Error(`Batch 15 metric mismatch: ${JSON.stringify({ metrics, expected })}`);
}

const audit = `# Phase 3 Archive Capture Batch 15 canonical migration — 2026-08-05

Status: complete  
Review audit: \`docs/audits/phase3-archive-capture-batch15-review-2026-08-05.md\`  
Canonical branch: \`agent/phase3-archive-capture-batch15-canonical\`  
Application run: \`${process.env.GITHUB_RUN_ID ?? "local"}\`

## Canonical change

Nine evidence records received only the exact reviewed \`archived_url\` values:

\`\`\`text
${changedIds.join("\n")}
\`\`\`

Seven exact snapshot mappings were applied. The BNB Chain decentralized-response source is shared by three evidence records. The Transit Swap SlowMist source reuses the exact snapshot already verified for another canonical evidence record.

No source URL, title, claim, publication date, source tier, reliability value, bridge linkage, incident linkage, event linkage, or other evidence field changed.

## Resulting source-quality state

\`\`\`text
Evidence with archived_url          110
Terminal unarchived unique URLs      28
Terminal unarchived records          38
Risky-host unarchived unique URLs    21
Risky-host unarchived records        35
X/Twitter records unarchived         30
\`\`\`

## Validation boundary

The application requires exact ID and canonical-URL matches, an empty pre-existing \`archived_url\`, exactly nine unique changed records, and exact resulting queue metrics. The permanent source-quality validator ceilings were lowered from 33 to 28 terminal unique URLs and from 24 to 21 risky-host unique URLs.

The temporary applicator and write-enabled workflow must be removed before the canonical pull request is opened.
`;
fs.writeFileSync(auditPath, audit);

console.log(JSON.stringify({ changed_ids: changedIds, metrics }, null, 2));
