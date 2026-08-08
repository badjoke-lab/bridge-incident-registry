import fs from "node:fs";

const evidencePath = "data/evidence.json";
const qualityPath = "scripts/check-source-quality-baseline.mjs";
const auditPath = "docs/audits/phase3-archive-capture-batch18-2026-08-09.md";

const mappings = [
  {
    id: "bir_src_000137",
    url: "https://support.avax.network/en/articles/6752048-how-do-i-upgrade-old-avalanche-bridge-aeb-assets",
    archived_url: "https://web.archive.org/web/20260515110436/https://support.avax.network/en/articles/6752048-how-do-i-upgrade-old-avalanche-bridge-aeb-assets"
  },
  {
    id: "bir_src_000197",
    url: "https://www.theblock.co/post/399318/syndicate-exploit",
    archived_url: "https://web.archive.org/web/20260430113142/https://www.theblock.co/post/399318/syndicate-exploit"
  },
  {
    id: "bir_src_000192",
    url: "https://www.theblock.co/post/402252/clear-token-tanks-48-everclear-winds-down-protocol-foundation-labs-unit",
    archived_url: "https://web.archive.org/web/20260524004034/https://www.theblock.co/post/402252/clear-token-tanks-48-everclear-winds-down-protocol-foundation-labs-unit"
  },
  {
    id: "bir_src_000132",
    url: "https://github.com/renproject",
    archived_url: "https://web.archive.org/web/20260724030838/https://github.com/renproject"
  }
];

const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
const originals = new Map(evidence.map((item) => [item.id, structuredClone(item)]));
const byId = new Map(evidence.map((item) => [item.id, item]));
const hasArchive = (item) => typeof item.archived_url === "string" && item.archived_url.trim().length > 0;

const initialArchiveCount = evidence.filter(hasArchive).length;
if (initialArchiveCount !== 120) throw new Error(`Expected 120 archived evidence records before Batch 18, got ${initialArchiveCount}`);

for (const mapping of mappings) {
  const item = byId.get(mapping.id);
  if (!item) throw new Error(`Missing expected evidence ID: ${mapping.id}`);
  if (item.url !== mapping.url) throw new Error(`${mapping.id} canonical URL mismatch: ${item.url}`);
  if (hasArchive(item)) throw new Error(`${mapping.id} already has archived_url: ${item.archived_url}`);
  item.archived_url = mapping.archived_url;
}

const changedIds = mappings.map((mapping) => mapping.id);
if (changedIds.length !== 4 || new Set(changedIds).size !== 4) throw new Error("Batch 18 mapping IDs are not exactly four unique records");

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
const from = "terminal_unarchived: 21,";
const to = "terminal_unarchived: 17,";
if (!quality.includes(from)) throw new Error(`Missing exact quality ceiling: ${from}`);
if (quality.includes(to)) throw new Error(`Target quality ceiling already present before replacement: ${to}`);
quality = quality.replace(from, to);
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
  archived: 124,
  terminal_unique: 17,
  terminal_records: 27,
  risky_unique: 18,
  risky_records: 32,
  x_records: 29
};
if (JSON.stringify(metrics) !== JSON.stringify(expected)) {
  throw new Error(`Batch 18 metric mismatch: ${JSON.stringify({ metrics, expected })}`);
}

const audit = `# Phase 3 Archive Capture Batch 18 canonical migration — 2026-08-09

Status: complete  
Review audit: \`docs/audits/phase3-archive-capture-batch18-review-2026-08-09.md\`  
Canonical branch: \`agent/phase3-archive-capture-batch18-canonical\`  
Application run: \`${process.env.GITHUB_RUN_ID ?? "local"}\`

## Canonical change

Four evidence records received only the exact archive URLs approved by the reproducible Batch 18 review:

\`\`\`text
${changedIds.join("\n")}
\`\`\`

No source URL, title, claim, publication date, source tier, reliability value, bridge linkage, incident linkage, event linkage, or other evidence field changed.

## Resulting source-quality state

\`\`\`text
Evidence with archived_url          124
Terminal unarchived unique URLs      17
Terminal unarchived records          27
Risky-host unarchived unique URLs    18
Risky-host unarchived records        32
X/Twitter records unarchived         29
\`\`\`

## Review-queue boundary

Batch 18 reviewed all nine remaining previously-unreviewed terminal/risky-host candidate URLs visible to the established reviewer. After this migration, further archive-preservation work must target already-reviewed deferred candidates or newly introduced canonical source URLs.

## Validation boundary

The application required exact evidence IDs and canonical source URLs, empty pre-existing archive fields, exactly four unique changed records, unchanged non-target records, and exact resulting queue metrics. The permanent terminal unique-URL ceiling was lowered from 21 to 17. The risky-host ceiling remains 18.

The canonical JSON compact one-record-per-line representation was preserved. The temporary applicator and write-enabled workflow must not remain in the final branch diff.
`;
fs.writeFileSync(auditPath, audit);

console.log(JSON.stringify({ changed_ids: changedIds, metrics }, null, 2));
