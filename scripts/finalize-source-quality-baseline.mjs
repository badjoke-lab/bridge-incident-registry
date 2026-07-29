import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const temporaryPath = path.join(root, "docs/audits/.source-quality-baseline-inventory.md");
const finalPath = path.join(root, "docs/audits/phase3-source-quality-baseline-2026-07-29.md");

let content = fs.readFileSync(temporaryPath, "utf8");
content = content.replace(
  "# Phase 3 source-quality baseline inventory",
  "# Phase 3 source-quality baseline — 2026-07-29"
);
content = content.replace(
  "Status: temporary generated inventory",
  "Status: complete"
);

const contract = `## No-regression contract\n\nThe baseline is enforced in normal CI. Future changes must not increase any of these gap or archive-risk counts:\n\n\`\`\`text\nBridges without primary evidence      0\nBridges without tier 1 evidence       0\nIncidents without primary evidence    2\nIncidents without tier 1 evidence     1\nEvents without primary evidence      36\nEvents without tier 1 evidence       25\nTerminal evidence without archive    76\nRisky-host evidence without archive  90\nUnknown URL status                    2\n\`\`\`\n\nThe gate also rejects invalid source URLs and invalid archive URLs. These values are ceilings, not targets. Remediation PRs must reduce them and tighten the corresponding limits.\n\n`;

content = content.replace("## Evidence distributions\n", `${contract}## Evidence distributions\n`);
fs.writeFileSync(finalPath, content);
console.log(`Wrote ${path.relative(root, finalPath)}`);
