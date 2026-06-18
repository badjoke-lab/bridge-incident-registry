import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { loadCanonicalData } from "./lib/canonical-data.mjs";

const root = process.cwd();
const canonical = loadCanonicalData(root, process.env);
const publicRoot = path.resolve(root, canonical.config.public_output_dir ?? "public");
const errors = [];

function readJson(relativePath) {
  const target = path.join(publicRoot, relativePath);
  try {
    return JSON.parse(fs.readFileSync(target, "utf8"));
  } catch (error) {
    errors.push(`${relativePath}: ${error.message}`);
    return null;
  }
}

function readText(relativePath) {
  const target = path.join(publicRoot, relativePath);
  try {
    return fs.readFileSync(target, "utf8");
  } catch (error) {
    errors.push(`${relativePath}: ${error.message}`);
    return "";
  }
}

function compareIds(label, canonicalRecords, publicRecords) {
  if (!Array.isArray(publicRecords)) {
    errors.push(`${label}: public dataset must be an array`);
    return;
  }

  const expected = canonicalRecords.map((record) => record.id);
  const actual = publicRecords.map((record) => record.id);

  if (JSON.stringify(expected) !== JSON.stringify(actual)) {
    errors.push(`${label}: public IDs do not match canonical IDs in canonical order`);
  }
}

function compareCounts(label, value) {
  if (JSON.stringify(value) !== JSON.stringify(canonical.recordCounts)) {
    errors.push(`${label}: record_counts do not match canonical counts`);
  }
}

function expectAbsoluteUrl(value, context) {
  try {
    const parsed = new URL(value);
    if (!parsed.href.startsWith(`${canonical.config.canonical_origin}/`)) {
      errors.push(`${context}: URL is outside canonical origin: ${value}`);
    }
  } catch {
    errors.push(`${context}: invalid absolute URL: ${value}`);
  }
}

const version = readJson("version.json");
const manifest = readJson("data/manifest.json");
const publicData = {
  bridges: readJson("data/bridges.json"),
  incidents: readJson("data/incidents.json"),
  events: readJson("data/events.json"),
  evidence: readJson("data/evidence.json")
};
const chains = readJson("data/reference/chains.json");
const assets = readJson("data/reference/assets.json");
const llms = readText("llms.txt");
const ai = readText("ai.txt");

if (version) {
  compareCounts("version.json", version.record_counts);
  if (version.canonical_only !== true) errors.push("version.json: canonical_only must be true");
  if (version.schema_version !== canonical.config.schema_version) errors.push("version.json: schema_version mismatch");
  if (version.canonical_origin !== canonical.config.canonical_origin) errors.push("version.json: canonical_origin mismatch");
  if (version.verification_marker !== canonical.config.verification_marker) errors.push("version.json: verification_marker mismatch");
}

if (manifest) {
  compareCounts("data/manifest.json", manifest.record_counts);
  if (manifest.canonical_only !== true) errors.push("data/manifest.json: canonical_only must be true");
  if (manifest.data_safety?.canonical_only !== true) errors.push("data/manifest.json: data_safety.canonical_only must be true");
  for (const [key, value] of Object.entries(manifest.endpoints ?? {})) {
    expectAbsoluteUrl(value, `manifest endpoint ${key}`);
  }
}

for (const key of ["bridges", "incidents", "events", "evidence"]) {
  compareIds(key, canonical.data[key], publicData[key]);
}

for (const bridge of publicData.bridges ?? []) {
  expectAbsoluteUrl(bridge.canonical_page_url, `bridge ${bridge.id} canonical_page_url`);
  expectAbsoluteUrl(bridge.canonical_data_url, `bridge ${bridge.id} canonical_data_url`);
}

for (const incident of publicData.incidents ?? []) {
  expectAbsoluteUrl(incident.canonical_page_url, `incident ${incident.id} canonical_page_url`);
  expectAbsoluteUrl(incident.bridge_page_url, `incident ${incident.id} bridge_page_url`);
}

if (JSON.stringify(chains) !== JSON.stringify(canonical.data.chains)) {
  errors.push("chain references do not match canonical references");
}
if (JSON.stringify(assets) !== JSON.stringify(canonical.data.assets)) {
  errors.push("asset references do not match canonical references");
}

for (const [label, text] of [["llms.txt", llms], ["ai.txt", ai]]) {
  if (!text.includes(canonical.config.canonical_origin)) errors.push(`${label}: missing canonical origin`);
  if (!text.includes("canonical")) errors.push(`${label}: missing canonical guidance`);
}

if (errors.length > 0) {
  console.error("Machine-readable public layer check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Machine-readable public layer check passed.");
console.log(`Records: ${canonical.recordCounts.bridges} bridges, ${canonical.recordCounts.incidents} incidents, ${canonical.recordCounts.events} events, ${canonical.recordCounts.evidence} evidence sources.`);
