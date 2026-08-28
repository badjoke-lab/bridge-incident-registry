import fs from "node:fs";

const files = [
  "README.md",
  "docs/runbooks/current-status.md",
  "docs/runbooks/recovery-checkpoint.md",
  "docs/runbooks/development-roadmap.md",
  "docs/runbooks/public-consistency-remediation.md"
];

for (const file of files) {
  let text = fs.readFileSync(file, "utf8");
  const before = text;
  text = text.replace(/Bridges\s+55\b/g, (m) => m.replace("55", "58"));
  text = text.replace(/Events\s+229\b/g, (m) => m.replace("229", "232"));
  text = text.replace(/Evidence\s+377\b/g, (m) => m.replace("377", "383"));
  if (text === before) throw new Error(`No current Batch 05 count block found in ${file}`);
  fs.writeFileSync(file, text);
}
console.log("Synced Batch 06 count-bearing docs to 58 / 51 / 232 / 383.");
