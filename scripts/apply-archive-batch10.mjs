import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const evidencePath = path.join(root, "data/evidence.json");
const baselinePath = path.join(root, "scripts/check-source-quality-baseline.mjs");
const auditPath = path.join(root, "docs/audits/phase3-archive-capture-batch10-2026-08-03.md");

const mappings = new Map([
  ["bir_src_000025", "https://web.archive.org/web/20230706234540/https://twitter.com/MultichainOrg/status/1677096839731097600"],
  ["bir_src_000028", "https://web.archive.org/web/20230707164230/https://twitter.com/MultichainOrg/status/1677180114227056641"],
  ["bir_src_000216", "https://web.archive.org/web/20230707164230/https://twitter.com/MultichainOrg/status/1677180114227056641"]
]);

const expectedSources = new Map([
  ["bir_src_000025", "https://twitter.com/MultichainOrg/status/1677096839731097600"],
  ["bir_src_000028", "https://twitter.com/MultichainOrg/status/1677180114227056641"],
  ["bir_src_000216", "https://twitter.com/MultichainOrg/status/1677180114227056641"]
]);

const originalEvidenceText = fs.readFileSync(evidencePath, "utf8");
const parsedEvidence = JSON.parse(originalEvidenceText);
const byId = new Map(parsedEvidence.map((item) => [item.id, item]));

for (const [id, expectedUrl] of expectedSources) {
  const record = byId.get(id);
  if (!record) throw new Error(`Missing canonical evidence record: ${id}`);
  if (record.url !== expectedUrl) {
    throw new Error(`${id} source URL drifted: expected ${expectedUrl}, found ${record.url}`);
  }
  if (record.archived_url && record.archived_url !== mappings.get(id)) {
    throw new Error(`${id} already has a different archived_url`);
  }
}

const evidenceLines = originalEvidenceText.split("\n");
for (const [id, archivedUrl] of mappings) {
  const index = evidenceLines.findIndex((line) => line.includes(`"id":"${id}"`));
  if (index < 0) throw new Error(`Could not locate canonical line for ${id}`);
  const line = evidenceLines[index];
  if (line.includes(`"archived_url":"${archivedUrl}"`)) continue;
  if (line.includes('"archived_url":')) throw new Error(`${id} has an unexpected archived_url field`);
  const marker = ',"accessed_at":';
  if (!line.includes(marker)) throw new Error(`${id} line has no accessed_at insertion point`);
  evidenceLines[index] = line.replace(marker, `,"archived_url":"${archivedUrl}"${marker}`);
}
fs.writeFileSync(evidencePath, evidenceLines.join("\n"));

const updatedEvidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
for (const [id, archivedUrl] of mappings) {
  const record = updatedEvidence.find((item) => item.id === id);
  if (record?.archived_url !== archivedUrl) throw new Error(`Archive mapping failed for ${id}`);
}

let baseline = fs.readFileSync(baselinePath, "utf8");
if (baseline.includes("terminal_unarchived: 39")) {
  baseline = baseline.replace("terminal_unarchived: 39", "terminal_unarchived: 37");
} else if (!baseline.includes("terminal_unarchived: 37")) {
  throw new Error("Unexpected terminal_unarchived baseline");
}
if (baseline.includes("risky_host_unarchived: 36")) {
  baseline = baseline.replace("risky_host_unarchived: 36", "risky_host_unarchived: 34");
} else if (!baseline.includes("risky_host_unarchived: 34")) {
  throw new Error("Unexpected risky_host_unarchived baseline");
}
fs.writeFileSync(baselinePath, baseline);

const audit = `# Phase 3 archive capture Batch 10 — 2026-08-03

Status: canonical migration complete; production verification required  
Review boundary: PR #148

## Canonical result

\`\`\`text
Bridges                              33
Incidents                            34
Events                              183
Evidence                            284
Evidence with archived_url      81 -> 84
Terminal unique-URL queue       39 -> 37
Risky-host unique-URL queue     36 -> 34
Terminal evidence records       51 -> 48
Risky-host evidence records     55 -> 52
Incident source mismatches             0
Event source mismatches                0
Unknown URL status                     0
\`\`\`

## Applied mappings

\`\`\`text
bir_src_000025
https://web.archive.org/web/20230706234540/https://twitter.com/MultichainOrg/status/1677096839731097600

bir_src_000028
bir_src_000216
https://web.archive.org/web/20230707164230/https://twitter.com/MultichainOrg/status/1677180114227056641
\`\`\`

The first mapping preserves Multichain's official abnormal MPC asset-movement statement. The second preserves the official indefinite-stop statement and is reused by two separately scoped evidence records sharing the same canonical source URL.

## Safety

- only the two exact mappings approved in the Batch 10 review are applied;
- source URLs, claims, source tiers, reliability, primary status, publication dates, and record linkages remain unchanged;
- source and record counts remain unchanged;
- archive-risk ceilings count normalized unique source URLs rather than duplicate evidence records;
- terminal and risky-host unique-URL ceilings each decrease by two;
- eight deferred review candidates remain unarchived and receive no wildcard, short replay, or guessed snapshot;
- complete production-content verification remains mandatory after merge.
`;
fs.writeFileSync(auditPath, audit);

console.log("Archive Capture Batch 10 canonical mappings applied.");
