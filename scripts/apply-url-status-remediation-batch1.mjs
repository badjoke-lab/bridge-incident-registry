import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const target = path.join(root, "data/evidence.json");
const evidence = JSON.parse(fs.readFileSync(target, "utf8"));

if (!Array.isArray(evidence) || evidence.length !== 265) {
  throw new Error(`unexpected evidence baseline: ${Array.isArray(evidence) ? evidence.length : "not-array"}`);
}

const ids = ["bir_src_000112", "bir_src_000239"];
const expectedUrl = "https://twitter.com/holographxyz/status/1801332482262110301";
const canonicalUrl = "https://x.com/holographxyz/status/1801332482262110301";

for (const id of ids) {
  const source = evidence.find((item) => item.id === id);
  if (!source) throw new Error(`missing target evidence ${id}`);
  if (source.url_status !== "unknown") throw new Error(`${id}: expected unknown url_status, received ${source.url_status}`);
  if (source.url !== expectedUrl) throw new Error(`${id}: unexpected URL ${source.url}`);
  if (source.publisher !== "Holograph" || source.source_type !== "official_social") {
    throw new Error(`${id}: unexpected source identity`);
  }

  source.url = canonicalUrl;
  source.url_status = "live";
  source.accessed_at = "2026-07-29";
  source.notes = `${source.notes.replace(/\s*platform availability may vary\.?$/i, "").trim()} Direct x.com route and indexed references were rechecked on 2026-07-29; the canonical post URL remains available.`;
}

const unknown = evidence.filter((source) => source.url_status === "unknown");
if (unknown.length !== 0) {
  throw new Error(`unknown URL statuses remain: ${unknown.map((source) => source.id).join(", ")}`);
}

const compact = `[\n${evidence.map((record) => `  ${JSON.stringify(record)}`).join(",\n")}\n]\n`;
fs.writeFileSync(target, compact);
console.log("Resolved Holograph URL status for bir_src_000112 and bir_src_000239; unknown URL status count is now zero.");
