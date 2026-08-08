import fs from "node:fs";

const evidencePath = "data/evidence.json";
const qualityPath = "scripts/check-source-quality-baseline.mjs";
const auditPath = "docs/audits/phase3-archive-deferred-retry-01-2026-08-09.md";

const mappings = [
  {
    id: "bir_src_000037",
    url: "https://medium.com/@QubitFin/our-compensation-plan-1-63e7c64738ed",
    archived_url: "https://web.archive.org/web/20220208083931/https://medium.com/@QubitFin/our-compensation-plan-1-63e7c64738ed"
  },
  {
    id: "bir_src_000068",
    url: "https://talk.harmony.one/t/summary-of-the-horizon-bridge-incident/20990",
    archived_url: "https://web.archive.org/web/20221009125416/https://talk.harmony.one/t/summary-of-the-horizon-bridge-incident/20990"
  }
];

const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
const originals = new Map(evidence.map((item) => [item.id, structuredClone(item)]));
const byId = new Map(evidence.map((item) => [item.id, item]));
const hasArchive = (item) => typeof item.archived_url === "string" && item.archived_url.trim().length > 0;

const initialArchiveCount = evidence.filter(hasArchive).length;
if (initialArchiveCount !== 124) throw new Error(`Expected 124 archived evidence records before Deferred Retry 01, got ${initialArchiveCount}`);

for (const mapping of mappings) {
  const item = byId.get(mapping.id);
  if (!item) throw new Error(`Missing expected evidence ID: ${mapping.id}`);
  if (item.url !== mapping.url) throw new Error(`${mapping.id} canonical URL mismatch: ${item.url}`);
  if (hasArchive(item)) throw new Error(`${mapping.id} already has archived_url: ${item.archived_url}`);
  item.archived_url = mapping.archived_url;
}

const changedIds = mappings.map((mapping) => mapping.id);
if (changedIds.length !== 2 || new Set(changedIds).size !== 2) throw new Error("Deferred Retry 01 mapping IDs are not exactly two unique records");

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
for (const [from, to] of [
  ["terminal_unarchived: 17,", "terminal_unarchived: 15,"],
  ["risky_host_unarchived: 18,", "risky_host_unarchived: 17,"]
]) {
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
  archived: 126,
  terminal_unique: 15,
  terminal_records: 25,
  risky_unique: 17,
  risky_records: 31,
  x_records: 29
};
if (JSON.stringify(metrics) !== JSON.stringify(expected)) {
  throw new Error(`Deferred Retry 01 metric mismatch: ${JSON.stringify({ metrics, expected })}`);
}

const audit = `# Phase 3 Archive Deferred Retry 01 canonical migration — 2026-08-09

Status: complete  
Review audit: \`docs/audits/phase3-archive-deferred-retry-01-review-2026-08-09.md\`  
Canonical branch: \`agent/phase3-archive-deferred-retry-01-canonical\`  
Application run: \`${process.env.GITHUB_RUN_ID ?? "local"}\`

## Canonical change

Two evidence records received only the exact archive URLs approved by Deferred Retry 01:

\`\`\`text
${changedIds.join("\n")}
\`\`\`

No source URL, title, claim, publication date, source tier, reliability value, bridge linkage, incident linkage, event linkage, or other evidence field changed.

## Resulting source-quality state

\`\`\`text
Evidence with archived_url          126
Terminal unarchived unique URLs      15
Terminal unarchived records          25
Risky-host unarchived unique URLs    17
Risky-host unarchived records        31
X/Twitter records unarchived         29
\`\`\`

## Validation boundary

The application required exact evidence IDs and canonical source URLs, empty pre-existing archive fields, exactly two unique changed records, unchanged non-target records, and exact resulting queue metrics. The permanent terminal unique-URL ceiling was lowered from 17 to 15 and the risky-host unique-URL ceiling from 18 to 17.

The canonical JSON compact one-record-per-line representation was preserved. The temporary applicator and write-enabled workflow must not remain in the final branch diff.
`;
fs.writeFileSync(auditPath, audit);

console.log(JSON.stringify({ changed_ids: changedIds, metrics }, null, 2));
