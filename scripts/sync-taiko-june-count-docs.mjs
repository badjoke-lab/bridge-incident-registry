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
  text = replaceFirstCountLine(text, "Evidence", 325, 327, file);
  fs.writeFileSync(target, text);
}

const statusPath = path.join(root, "docs/runbooks/current-status.md");
let status = fs.readFileSync(statusPath, "utf8");
const replacements = [
  ["Primary evidence                     229 / 325", "Primary evidence                     231 / 327"],
  ["Tier 1 evidence                      246 / 325", "Tier 1 evidence                      248 / 327"],
  ["Evidence with archived_url           130 / 325", "Evidence with archived_url           130 / 327"]
];
for (const [from, to] of replacements) {
  if (!status.includes(from)) throw new Error(`current-status.md: missing expected quality baseline: ${from}`);
  status = status.replace(from, to);
}
fs.writeFileSync(statusPath, status);

console.log("Synced evidence-count authority docs for Taiko June 2026 enrichment.");
