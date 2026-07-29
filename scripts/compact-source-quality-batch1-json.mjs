import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

for (const relativePath of ["data/incidents.json", "data/events.json", "data/evidence.json"]) {
  const target = path.join(root, relativePath);
  const value = JSON.parse(fs.readFileSync(target, "utf8"));
  if (!Array.isArray(value)) throw new Error(`${relativePath} must contain an array`);
  const content = `[\n${value.map((record) => `  ${JSON.stringify(record)}`).join(",\n")}\n]\n`;
  fs.writeFileSync(target, content);
  console.log(`Compacted ${relativePath}: ${value.length} records`);
}
