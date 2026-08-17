import fs from "node:fs";

const files = [
  "README.md",
  "docs/runbooks/current-status.md",
  "docs/runbooks/recovery-checkpoint.md",
  "docs/runbooks/development-roadmap.md",
  "docs/runbooks/public-consistency-remediation.md"
];

for (const file of files) {
  const before = fs.readFileSync(file, "utf8");
  const oldEvents = (before.match(/\bEvents\s+188\b/g) ?? []).length;
  const oldEvidence = (before.match(/\bEvidence\s+297\b/g) ?? []).length;
  if (oldEvents === 0 || oldEvidence === 0) {
    throw new Error(`${file}: expected current baseline labels Events 188 / Evidence 297`);
  }
  const after = before
    .replace(/\bEvents(\s+)188\b/g, "Events$1190")
    .replace(/\bEvidence(\s+)297\b/g, "Evidence$1299");
  if (!/\bEvents\s+190\b/.test(after) || !/\bEvidence\s+299\b/.test(after)) {
    throw new Error(`${file}: failed to establish Stage 8 canonical counts`);
  }
  fs.writeFileSync(file, after);
  console.log(`${file}: updated ${oldEvents} Events count(s), ${oldEvidence} Evidence count(s)`);
}
