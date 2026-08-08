import fs from "node:fs";

const evidencePath = "data/evidence.json";
const qualityPath = "scripts/check-source-quality-baseline.mjs";
const auditPath = "docs/audits/phase3-archive-capture-batch17-2026-08-09.md";

const mappings = [
  {
    id: "bir_src_000188",
    url: "https://docs.everclear.org/developers/getting-started",
    archived_url: "https://web.archive.org/web/20240920172006/https://docs.everclear.org/developers/getting-started"
  },
  {
    id: "bir_src_000024",
    url: "https://www.bnbchain.org/en/bnb-chain-fusion",
    archived_url: "https://web.archive.org/web/20240205063709/https://www.bnbchain.org/en/bnb-chain-fusion"
  },
  {
    id: "bir_src_000070",
    url: "https://talk.harmony.one/t/proposal-utilitydao-recovery-partner-for-harmony-protocol/26467",
    archived_url: "https://web.archive.org/web/20250715114205/https://talk.harmony.one/t/proposal-utilitydao-recovery-partner-for-harmony-protocol/26467"
  },
  {
    id: "bir_src_000196",
    url: "https://docs.syndicate.io/en/docs/synd/bridging",
    archived_url: "https://web.archive.org/web/20260124112950/https://docs.syndicate.io/en/docs/synd/bridging"
  }
];

const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
const originals = new Map(evidence.map((item) => [item.id, structuredClone(item)]));
const byId = new Map(evidence.map((item) => [item.id, item]));
const hasArchive = (item) => typeof item.archived_url === "string" && item.archived_url.trim().length > 0;

const initialArchiveCount = evidence.filter(hasArchive).length;
if (initialArchiveCount !== 116) throw new Error(`Expected 116 archived evidence records before Batch 17, got ${initialArchiveCount}`);

for (const mapping of mappings) {
  const item = byId.get(mapping.id);
  if (!item) throw new Error(`Missing expected evidence ID: ${mapping.id}`);
  if (item.url !== mapping.url) throw new Error(`${mapping.id} canonical URL mismatch: ${item.url}`);
  if (hasArchive(item)) throw new Error(`${mapping.id} already has archived_url: ${item.archived_url}`);
  item.archived_url = mapping.archived_url;
}

const changedIds = mappings.map((mapping) => mapping.id);
if (changedIds.length !== 4 || new Set(changedIds).size !== 4) throw new Error("Batch 17 mapping IDs are not exactly four unique records");

for (const item of evidence) {
  const original = originals.get(item.id);
  if (!original) throw new Error(`Missing original snapshot for ${item.id}`);
  if (!changedIds.includes(item.id)) {
    if (JSON.stringify(item) !== JSON.stringify(original)) throw new Error(`Unexpected evidence mutation: ${item.id}`);
    continue;
  }
  const mapping = mappings.find((entry) => entry.id === item.id);
  const expected = { ...original, archived_url: mapping.archived_url };
  if (JSON.stringify(item) !== JSON.stringify(expected)) throw new Error(`Unexpected field mutation on ${item.id}`);
}

const compactEvidence = `\n${evidence.map((item) => `  ${JSON.stringify(item)}`).join(",\n")}\n`;
fs.writeFileSync(evidencePath, `[${compactEvidence}]\n`);

let quality = fs.readFileSync(qualityPath, "utf8");
const replacements = [
  ["terminal_unarchived: 25,", "terminal_unarchived: 21,"]
];
for (const [from, to] of replacements) {
  if (!quality.includes(from)) throw new Error(`Missing exact quality ceiling: ${from}`);
  if (quality.includes(to)) throw new Error(`Target quality ceiling already present before replacement: ${to}`);
  quality = quality.replace(from, to);
}
fs.writeFileSync(qualityPath, quality);

const bridges = JSON.parse(fs.readFileSync("data/bridges.json", "utf8"));
const bridgesById = new Map(bridges.map((item) => [item.id, item]));
const terminalStatuses = new Set(["dead", "deprecated", "migrated"]);
const riskyHosts = ["x.com", "twitter.com", "medium.com", "mirror.xyz", "substack.com", "docs.google.com", "notion.site"];
const hostOf = (raw) => new URL(raw).hostname.replace(/^www\./, "").toLowerCase();
const isRisky = (host) => riskyHosts.some((base) => host === base || host.endsWith(`.${base}`));
const uniqueCount = (records) => new Set(records.map((item) => new URL(item.url).toString())).size;
const terminalRecords = evidence.filter((item) => terminalStatuses.has(bridgesById.get(item.bridge_id)?.status) && !hasArchive(item));
const riskyRecords = evidence.filter((item) => isRisky(hostOf(item.url)) && !hasArchive(item));
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
  archived: 120,
  terminal_unique: 21,
  terminal_records: 31,
  risky_unique: 18,
  risky_records: 32,
  x_records: 29
};
if (JSON.stringify(metrics) !== JSON.stringify(expected)) {
  throw new Error(`Batch 17 metric mismatch: ${JSON.stringify({ metrics, expected })}`);
}

const audit = `# Phase 3 Archive Capture Batch 17 canonical migration — 2026-08-09

Status: complete  
Review audit: \`docs/audits/phase3-archive-capture-batch17-review-2026-08-09.md\`  
Canonical branch: \`agent/phase3-archive-capture-batch17-canonical\`  
Application run: \`${process.env.GITHUB_RUN_ID ?? "local"}\`

## Canonical change

Four evidence records received only the exact archive URLs approved by the reproducible Batch 17 review:

\`\`\`text
${changedIds.join("\n")}
\`\`\`

No source URL, title, claim, publication date, source tier, reliability value, bridge linkage, incident linkage, event linkage, or other evidence field changed.

## Resulting source-quality state

\`\`\`text
Evidence with archived_url          120
Terminal unarchived unique URLs      21
Terminal unarchived records          31
Risky-host unarchived unique URLs    18
Risky-host unarchived records        32
X/Twitter records unarchived         29
\`\`\`

## Validation boundary

The application required exact evidence IDs and canonical source URLs, empty pre-existing archive fields, exactly four unique changed records, unchanged non-target records, and exact resulting queue metrics. The permanent terminal unique-URL ceiling was lowered from 25 to 21. The risky-host ceiling remains 18.

The canonical JSON compact one-record-per-line representation was preserved. The temporary applicator and write-enabled workflow must not remain in the final branch diff.
`;
fs.writeFileSync(auditPath, audit);

console.log(JSON.stringify({ changed_ids: changedIds, metrics }, null, 2));
