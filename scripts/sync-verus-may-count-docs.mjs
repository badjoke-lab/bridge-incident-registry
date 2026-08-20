import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const files = [
  "README.md",
  "docs/runbooks/current-status.md",
  "docs/runbooks/recovery-checkpoint.md",
  "docs/runbooks/development-roadmap.md",
  "docs/runbooks/public-consistency-remediation.md"
];

function replaceCountLine(text, label, from, to, file) {
  const pattern = new RegExp(`^(\\s*${label}\\s+)${from}(\\s*)$`, "gm");
  let replacements = 0;
  const next = text.replace(pattern, (_match, prefix, suffix) => {
    replacements += 1;
    return `${prefix}${to}${suffix}`;
  });
  if (replacements === 0) throw new Error(`${file}: missing ${label} ${from} current-count line`);
  return next;
}

for (const file of files) {
  const target = path.join(root, file);
  let text = fs.readFileSync(target, "utf8");
  text = replaceCountLine(text, "Incidents", 41, 42, file);
  text = replaceCountLine(text, "Events", 194, 199, file);
  text = replaceCountLine(text, "Evidence", 316, 325, file);
  fs.writeFileSync(target, text);
}

const statusPath = path.join(root, "docs/runbooks/current-status.md");
let status = fs.readFileSync(statusPath, "utf8");
const replacements = [
  [/Primary evidence\s+224 \/ 316/g, "Primary evidence                     229 / 325"],
  [/Tier 1 evidence\s+241 \/ 316/g, "Tier 1 evidence                      246 / 325"],
  [/Evidence with archived_url\s+130 \/ 316/g, "Evidence with archived_url           130 / 325"],
  [/Incidents without primary\s+1 \/ 41/g, "Incidents without primary              1 / 42"],
  [/Incidents without Tier 1\s+1 \/ 41/g, "Incidents without Tier 1               1 / 42"],
  [/Events without primary\s+11 \/ 194/g, "Events without primary                11 / 199"],
  [/Events without Tier 1\s+6 \/ 194/g, "Events without Tier 1                  6 / 199"]
];
for (const [pattern, replacement] of replacements) {
  if (!pattern.test(status)) throw new Error(`current-status.md: missing expected quality baseline ${pattern}`);
  pattern.lastIndex = 0;
  status = status.replace(pattern, replacement);
}
status = status.replace(
  "Later reviewed maintenance added WanBridge, ChainConnect and the Verus-Ethereum Bridge July 2026 incident without reopening Phase 2.",
  "Later reviewed maintenance added WanBridge, ChainConnect and separate May and July 2026 Verus-Ethereum Bridge incidents without reopening Phase 2."
);
status = status.replace(
  "2. current evidence-gated targets are #331 Verus May, #303 AFX, #279 XRPL-TX, #299 Nerve, #171 Boltz, and #270 Oraichain under their latest review audits/comments;",
  "2. current evidence-gated targets are #303 AFX, #279 XRPL-TX, #299 Nerve, #171 Boltz, and #270 Oraichain under their latest review audits/comments;"
);
fs.writeFileSync(statusPath, status);

console.log("Synced canonical count authority docs for Verus May 2026 application.");
