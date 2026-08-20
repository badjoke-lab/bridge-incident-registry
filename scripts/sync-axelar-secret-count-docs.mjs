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

function replaceFirstCountLine(text, label, from, to, file) {
  const pattern = new RegExp(`^(\\s*${label}\\s+)${from}(\\s*)$`, "m");
  if (!pattern.test(text)) throw new Error(`${file}: missing current ${label} ${from} line`);
  return text.replace(pattern, (_match, prefix, suffix) => `${prefix}${to}${suffix}`);
}

for (const file of files) {
  const target = path.join(root, file);
  let text = fs.readFileSync(target, "utf8");
  text = replaceFirstCountLine(text, "Bridges", 39, 40, file);
  text = replaceFirstCountLine(text, "Incidents", 42, 43, file);
  text = replaceFirstCountLine(text, "Events", 199, 203, file);
  text = replaceFirstCountLine(text, "Evidence", 327, 335, file);
  fs.writeFileSync(target, text);
}

const statusPath = path.join(root, "docs/runbooks/current-status.md");
let status = fs.readFileSync(statusPath, "utf8");
const replacements = [
  ["Primary evidence                     231 / 327", "Primary evidence                     237 / 335"],
  ["Tier 1 evidence                      248 / 327", "Tier 1 evidence                      254 / 335"],
  ["Evidence with archived_url           130 / 327", "Evidence with archived_url           130 / 335"],
  ["Incidents without primary              1 / 42", "Incidents without primary              1 / 43"],
  ["Incidents without Tier 1               1 / 42", "Incidents without Tier 1               1 / 43"],
  ["Events without primary                11 / 199", "Events without primary                11 / 203"],
  ["Events without Tier 1                  6 / 199", "Events without Tier 1                  6 / 203"]
];
for (const [from, to] of replacements) {
  if (!status.includes(from)) throw new Error(`current-status.md: missing expected quality baseline: ${from}`);
  status = status.replace(from, to);
}
fs.writeFileSync(statusPath, status);

console.log("Synced canonical count authority docs for Axelar-Secret June 2026 application.");
