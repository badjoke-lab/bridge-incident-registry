import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { loadCanonicalData } from "./lib/canonical-data.mjs";

const root = process.cwd();
const canonical = loadCanonicalData(root, process.env);
const counts = canonical.recordCounts;
const errors = [];
const documents = [
  "README.md",
  "CHANGELOG.md",
  "docs/runbooks/development-roadmap.md",
  "docs/runbooks/recovery-checkpoint.md",
  "docs/runbooks/public-consistency-remediation.md"
];

function read(file) {
  try { return fs.readFileSync(path.join(root, file), "utf8"); }
  catch (error) { errors.push(`${file}: ${error.message}`); return ""; }
}

const expected = [
  `Bridges     ${counts.bridges}`,
  `Incidents   ${counts.incidents}`,
  `Events      ${counts.events}`,
  `Evidence    ${counts.evidence}`
];

for (const file of documents) {
  const content = read(file);
  for (const line of expected) {
    if (!content.includes(line)) errors.push(`${file}: missing '${line}'`);
  }
}

const statusFile = "docs/runbooks/current-status.md";
const status = read(statusFile);
const statusPairs = [
  ["data/bridges.json", counts.bridges],
  ["data/incidents.json", counts.incidents],
  ["data/events.json", counts.events],
  ["data/evidence.json", counts.evidence]
];
for (const [file, count] of statusPairs) {
  const escaped = file.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (!new RegExp(`${escaped}\\s+${count}(?:\\s|$)`).test(status)) {
    errors.push(`${statusFile}: missing ${file} count ${count}`);
  }
}

if (errors.length) {
  console.error("Documentation count check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Documentation count check passed.");
