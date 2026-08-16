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

function compareRecordIds(label, expectedRecords, actualRecords) {
  const expected = expectedRecords.map((record) => record.id);
  const actual = Array.isArray(actualRecords) ? actualRecords.map((record) => record.id) : null;
  if (JSON.stringify(expected) !== JSON.stringify(actual)) {
    errors.push(`${label}: related record IDs do not match canonical-derived order`);
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

function expectDossierMetadata(dossier, record, recordType, context) {
  if (!dossier) return;
  if (dossier.canonical_only !== true) errors.push(`${context}: canonical_only must be true`);
  if (dossier.schema_version !== canonical.config.schema_version) errors.push(`${context}: schema_version mismatch`);
  if (dossier.verification_marker !== canonical.config.verification_marker) errors.push(`${context}: verification_marker mismatch`);
  if (dossier.record_type !== recordType) errors.push(`${context}: record_type mismatch`);
  if (dossier.record_id !== record.id) errors.push(`${context}: record_id mismatch`);
  if (dossier.slug !== record.slug) errors.push(`${context}: slug mismatch`);
  if (dossier.self_url !== record.record_data_url) errors.push(`${context}: self_url mismatch`);
  if (dossier.canonical_page_url !== record.canonical_page_url) errors.push(`${context}: canonical_page_url mismatch`);
  if (JSON.stringify(dossier.record) !== JSON.stringify(record)) errors.push(`${context}: primary record does not match public canonical-derived record`);
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
  for (const [key, value] of Object.entries(manifest.record_endpoints ?? {})) {
    expectAbsoluteUrl(value, `manifest record endpoint ${key}`);
  }
  if (!manifest.record_endpoints?.bridge?.includes("{slug}")) errors.push("data/manifest.json: missing bridge record endpoint pattern");
  if (!manifest.record_endpoints?.incident?.includes("{slug}")) errors.push("data/manifest.json: missing incident record endpoint pattern");
}

for (const key of ["bridges", "incidents", "events", "evidence"]) {
  compareIds(key, canonical.data[key], publicData[key]);
}

for (const bridge of publicData.bridges ?? []) {
  expectAbsoluteUrl(bridge.canonical_page_url, `bridge ${bridge.id} canonical_page_url`);
  expectAbsoluteUrl(bridge.canonical_data_url, `bridge ${bridge.id} canonical_data_url`);
  expectAbsoluteUrl(bridge.record_data_url, `bridge ${bridge.id} record_data_url`);

  const dossier = readJson(`data/bridge/${bridge.slug}.json`);
  const relatedIncidents = (publicData.incidents ?? []).filter((incident) => incident.bridge_id === bridge.id);
  const relatedEvents = (publicData.events ?? []).filter((event) => event.bridge_id === bridge.id);
  const relatedEvidence = (publicData.evidence ?? []).filter((source) => source.bridge_id === bridge.id);

  expectDossierMetadata(dossier, bridge, "bridge", `bridge dossier ${bridge.id}`);
  if (dossier) {
    compareRecordIds(`bridge dossier ${bridge.id} incidents`, relatedIncidents, dossier.related?.incidents);
    compareRecordIds(`bridge dossier ${bridge.id} events`, relatedEvents, dossier.related?.events);
    compareRecordIds(`bridge dossier ${bridge.id} evidence`, relatedEvidence, dossier.related?.evidence);
    const expectedCounts = {
      incidents: relatedIncidents.length,
      events: relatedEvents.length,
      evidence: relatedEvidence.length
    };
    if (JSON.stringify(dossier.record_counts) !== JSON.stringify(expectedCounts)) {
      errors.push(`bridge dossier ${bridge.id}: record_counts mismatch`);
    }
  }
}

for (const incident of publicData.incidents ?? []) {
  expectAbsoluteUrl(incident.canonical_page_url, `incident ${incident.id} canonical_page_url`);
  expectAbsoluteUrl(incident.bridge_page_url, `incident ${incident.id} bridge_page_url`);
  expectAbsoluteUrl(incident.canonical_data_url, `incident ${incident.id} canonical_data_url`);
  expectAbsoluteUrl(incident.record_data_url, `incident ${incident.id} record_data_url`);

  const dossier = readJson(`data/incident/${incident.slug}.json`);
  const bridge = (publicData.bridges ?? []).find((record) => record.id === incident.bridge_id);
  const relatedEvents = (publicData.events ?? []).filter((event) => event.incident_id === incident.id);
  const relatedEvidence = (publicData.evidence ?? []).filter((source) => source.incident_id === incident.id);

  expectDossierMetadata(dossier, incident, "incident", `incident dossier ${incident.id}`);
  if (dossier) {
    if (JSON.stringify(dossier.bridge) !== JSON.stringify(bridge)) errors.push(`incident dossier ${incident.id}: bridge record mismatch`);
    compareRecordIds(`incident dossier ${incident.id} events`, relatedEvents, dossier.related?.events);
    compareRecordIds(`incident dossier ${incident.id} evidence`, relatedEvidence, dossier.related?.evidence);
    const expectedCounts = {
      events: relatedEvents.length,
      evidence: relatedEvidence.length
    };
    if (JSON.stringify(dossier.record_counts) !== JSON.stringify(expectedCounts)) {
      errors.push(`incident dossier ${incident.id}: record_counts mismatch`);
    }
  }
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
  if (!text.includes("/data/bridge/{slug}.json")) errors.push(`${label}: missing bridge record JSON guidance`);
  if (!text.includes("/data/incident/{slug}.json")) errors.push(`${label}: missing incident record JSON guidance`);
}

if (errors.length > 0) {
  console.error("Machine-readable public layer check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Machine-readable public layer check passed.");
console.log(`Records: ${canonical.recordCounts.bridges} bridges, ${canonical.recordCounts.incidents} incidents, ${canonical.recordCounts.events} events, ${canonical.recordCounts.evidence} evidence sources.`);
console.log(`Record dossiers: ${canonical.recordCounts.bridges} bridges, ${canonical.recordCounts.incidents} incidents.`);
