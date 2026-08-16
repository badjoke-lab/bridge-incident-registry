import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { loadCanonicalData, resolveGeneratedAt } from "./lib/canonical-data.mjs";
import { buildPublicRecords } from "./lib/public-records.mjs";

const root = process.cwd();
const canonical = loadCanonicalData(root, process.env);
const generatedAt = resolveGeneratedAt(process.env);
const output = buildPublicRecords({
  ...canonical,
  generatedAt
});

const outputRoot = path.resolve(root, canonical.config.generated_output_dir);

function writeJson(relativePath, value) {
  const absolutePath = path.join(outputRoot, relativePath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(absolutePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

fs.rmSync(outputRoot, { recursive: true, force: true });
fs.mkdirSync(outputRoot, { recursive: true });

writeJson("registry-meta.json", output.metadata);
writeJson("bridges.json", output.bridges);
writeJson("incidents.json", output.incidents);
writeJson("events.json", output.events);
writeJson("evidence.json", output.evidence);
writeJson("reference/chains.json", output.references.chains);
writeJson("reference/assets.json", output.references.assets);

for (const dossier of output.dossiers.bridges) {
  writeJson(`record/bridge/${dossier.slug}.json`, dossier);
}
for (const dossier of output.dossiers.incidents) {
  writeJson(`record/incident/${dossier.slug}.json`, dossier);
}

console.log(`Generated canonical-derived public staging data in ${path.relative(root, outputRoot) || "."}.`);
console.log(
  `Records: ${output.metadata.record_counts.bridges} bridges, ${output.metadata.record_counts.incidents} incidents, ${output.metadata.record_counts.events} events, ${output.metadata.record_counts.evidence} evidence sources.`
);
console.log(`Record dossiers: ${output.dossiers.bridges.length} bridges, ${output.dossiers.incidents.length} incidents.`);
console.log(`Canonical only: ${output.metadata.canonical_only}`);
console.log(`Generated at: ${output.metadata.generated_at}`);
