import fs from "node:fs";

const evidencePath = "data/evidence.json";
const baselinePath = "scripts/check-source-quality-baseline.mjs";

const mappings = new Map([
  ["bir_src_000076", {
    source_url: "https://x.com/CelerNetwork/status/1560046913436946432",
    archived_url: "https://web.archive.org/web/20220826131239/https://twitter.com/celernetwork/status/1560046913436946432"
  }],
  ["bir_src_000271", {
    source_url: "https://x.com/CelerNetwork/status/1560123830844411904",
    archived_url: "https://web.archive.org/web/20250725082946/https://x.com/CelerNetwork/status/1560123830844411904"
  }],
  ["bir_src_000274", {
    source_url: "https://x.com/CelerNetwork/status/1560123830844411904",
    archived_url: "https://web.archive.org/web/20250725082946/https://x.com/CelerNetwork/status/1560123830844411904"
  }],
  ["bir_src_000080", {
    source_url: "https://x.com/SocketDotTech/status/1747349422730813525",
    archived_url: "https://web.archive.org/web/20240123172459/https://twitter.com/SocketDotTech/status/1747349422730813525"
  }],
  ["bir_src_000165", {
    source_url: "https://x.com/CryptoRubic/status/1606970530032230403",
    archived_url: "https://web.archive.org/web/20221231003917/https://twitter.com/CryptoRubic/status/1606970530032230403"
  }],
  ["bir_src_000272", {
    source_url: "https://x.com/CryptoRubic/status/1606970530032230403",
    archived_url: "https://web.archive.org/web/20221231003917/https://twitter.com/CryptoRubic/status/1606970530032230403"
  }]
]);

const evidenceLines = fs.readFileSync(evidencePath, "utf8").split("\n");
const seen = new Set();
let evidenceChanged = false;

for (let index = 0; index < evidenceLines.length; index += 1) {
  const rawLine = evidenceLines[index];
  const trimmed = rawLine.trim();
  if (!trimmed.startsWith("{")) continue;

  const hasComma = trimmed.endsWith(",");
  const jsonText = hasComma ? trimmed.slice(0, -1) : trimmed;
  let record;
  try {
    record = JSON.parse(jsonText);
  } catch {
    continue;
  }

  const mapping = mappings.get(record.id);
  if (!mapping) continue;
  seen.add(record.id);

  if (record.url !== mapping.source_url) {
    throw new Error(`${record.id}: source URL drift: ${record.url}`);
  }

  if (record.archived_url === mapping.archived_url) continue;
  if (record.archived_url !== undefined && record.archived_url !== null) {
    throw new Error(`${record.id}: existing archive differs: ${record.archived_url}`);
  }

  record.archived_url = mapping.archived_url;
  const indentation = rawLine.match(/^\s*/)?.[0] ?? "";
  evidenceLines[index] = `${indentation}${JSON.stringify(record)}${hasComma ? "," : ""}`;
  evidenceChanged = true;
}

const missing = [...mappings.keys()].filter((id) => !seen.has(id));
if (missing.length > 0) throw new Error(`Missing evidence IDs: ${missing.join(", ")}`);

if (evidenceChanged) {
  fs.writeFileSync(evidencePath, evidenceLines.join("\n"), "utf8");
}

let baseline = fs.readFileSync(baselinePath, "utf8");
const before = "risky_host_unarchived: 33,";
const after = "risky_host_unarchived: 29,";
let baselineChanged = false;
if (!baseline.includes(after)) {
  const occurrences = baseline.split(before).length - 1;
  if (occurrences !== 1) throw new Error(`Expected exactly one baseline token: ${before}`);
  baseline = baseline.replace(before, after);
  baselineChanged = true;
}
if (baselineChanged) fs.writeFileSync(baselinePath, baseline, "utf8");

console.log(JSON.stringify({
  evidence_changed: evidenceChanged,
  baseline_changed: baselineChanged,
  terminal_ceiling_unchanged: 36,
  risky_host_ceiling: 29,
  evidence_ids: [...mappings.keys()]
}, null, 2));
