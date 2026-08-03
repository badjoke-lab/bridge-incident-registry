import fs from "node:fs";

const evidencePath = "data/evidence.json";
const baselinePath = "scripts/check-source-quality-baseline.mjs";
const targetId = "bir_src_000029";
const targetUrl = "https://twitter.com/MultichainOrg/status/1679768407628185600";
const archiveUrl = "https://web.archive.org/web/20250725204239/https://x.com/MultichainOrg/status/1679768407628185600";

const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
const target = evidence.find((record) => record.id === targetId);

if (!target) throw new Error(`Missing target evidence ${targetId}`);
if (target.url !== targetUrl) {
  throw new Error(`Source URL drift for ${targetId}: ${target.url}`);
}
if (target.archived_url != null && target.archived_url !== archiveUrl) {
  throw new Error(`Unexpected existing archive for ${targetId}: ${target.archived_url}`);
}

target.archived_url = archiveUrl;
fs.writeFileSync(
  evidencePath,
  `[` + "\n  " + evidence.map((record) => JSON.stringify(record)).join(",\n  ") + "\n]\n"
);

let baseline = fs.readFileSync(baselinePath, "utf8");
const replacements = [
  ["terminal_unarchived: 37,", "terminal_unarchived: 36,"],
  ["risky_host_unarchived: 34,", "risky_host_unarchived: 33,"]
];

for (const [before, after] of replacements) {
  const matches = baseline.split(before).length - 1;
  if (matches !== 1) throw new Error(`Expected one baseline match for ${before}; found ${matches}`);
  baseline = baseline.replace(before, after);
}

fs.writeFileSync(baselinePath, baseline);
console.log(`Applied Archive Capture Batch 11 to ${targetId}.`);
