import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const authority = JSON.parse(fs.readFileSync(path.join(root, "config", "ledger-series-phase9-stage5-relationship-authority.json"), "utf8"));
const origin = (process.env.PUBLIC_SITE_ORIGIN ?? "https://bir.badjoke-lab.com").replace(/\/$/, "");
const timeoutMs = Number(process.env.BIR_PRODUCTION_TIMEOUT_MS ?? 30000);
const concurrency = Math.max(1, Number(process.env.BIR_RECORD_JSON_CONCURRENCY ?? 8));
const errors = [];

function absolute(route) {
  return new URL(route.replace(/^\//, ""), `${origin}/`).toString();
}

function endpointGlobalKey(endpoint) {
  return `${endpoint?.registry_id}:${endpoint?.native_record_type}:${endpoint?.native_record_id}`;
}

function expectedRelationshipId(relationType, sourceGlobalKey, targetGlobalKey) {
  return `series_rel_${createHash("sha256")
    .update(`${relationType}\n${sourceGlobalKey}\n${targetGlobalKey}`, "utf8")
    .digest("hex")}`;
}

async function fetchJson(route, label) {
  try {
    const response = await fetch(absolute(route), {
      headers: {
        accept: "application/json",
        "cache-control": "no-cache",
        "user-agent": "BIR-production-series-relationship-verifier/1.0"
      },
      signal: AbortSignal.timeout(timeoutMs)
    });
    const text = await response.text();
    if (response.status !== 200) {
      errors.push(`${label}: expected HTTP 200, received ${response.status}`);
      return null;
    }
    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      errors.push(`${label}: expected application/json, received ${contentType || "missing"}`);
      return null;
    }
    try {
      return JSON.parse(text);
    } catch (error) {
      errors.push(`${label}: invalid JSON: ${error.message}`);
      return null;
    }
  } catch (error) {
    errors.push(`${label}: request failed: ${error.message}`);
    return null;
  }
}

if (authority.authority_id !== "bir-ledger-series-phase9-stage5-relationship-2026-08-21") {
  throw new Error("Unexpected BIR Stage 5 relationship authority");
}
if (!Array.isArray(authority.finite_allowlist) || authority.finite_allowlist.length !== 44) {
  throw new Error("BIR Stage 5 production verifier requires exactly 44 authorized tuples");
}

const [descriptor, index, relationships] = await Promise.all([
  fetchJson("/data/series/registry.json", "Series descriptor"),
  fetchJson("/data/series/index.json", "Series index"),
  fetchJson("/data/series/relationships.json", "Series relationships")
]);

if (descriptor) {
  if (descriptor.registry?.id !== "bridge-incident-registry") errors.push("Series descriptor registry ID mismatch");
  if (descriptor.record_counts?.relationships !== 44) errors.push(`Series descriptor relationship count must be 44, found ${descriptor.record_counts?.relationships}`);
  if (descriptor.routes?.relationships !== "/data/series/relationships.json") errors.push("Series descriptor relationship route mismatch");
  if (descriptor.capabilities?.relationships !== "adapter") errors.push("Series descriptor relationship capability mismatch");
}

const indexRows = Array.isArray(index?.records) ? index.records : [];
const indexKeys = new Set(indexRows.map((row) => row.global_record_key));
if (!index || indexKeys.size !== indexRows.length) errors.push("Series index missing or contains duplicate global keys");

const expectedTupleSet = new Set(authority.finite_allowlist.map(([type, source, target]) => `${type}\n${source}\n${target}`));
if (expectedTupleSet.size !== 44) errors.push("Authority finite allowlist contains duplicate tuples");
const actualTupleSet = new Set();
const ids = new Set();
const endpointKeys = new Set();
let incidentOfCount = 0;
let predecessorCount = 0;
let successorCount = 0;

if (!Array.isArray(relationships) || relationships.length !== 44) {
  errors.push(`Series relationship transport must contain 44 records, found ${Array.isArray(relationships) ? relationships.length : "non-array"}`);
} else {
  for (const [relationshipIndex, relationship] of relationships.entries()) {
    const label = `relationship ${relationshipIndex + 1}`;
    const source = endpointGlobalKey(relationship.source);
    const target = endpointGlobalKey(relationship.target);
    const tuple = `${relationship.relation_type}\n${source}\n${target}`;
    if (relationship.series_schema_version !== "1.0.0" || relationship.object_type !== "relationship_record") errors.push(`${label}: Series object contract mismatch`);
    if (!["incident_of", "predecessor_of", "successor_of"].includes(relationship.relation_type)) errors.push(`${label}: unauthorized relation type ${relationship.relation_type}`);
    if (relationship.relation_type === "incident_of") incidentOfCount += 1;
    if (relationship.relation_type === "predecessor_of") predecessorCount += 1;
    if (relationship.relation_type === "successor_of") successorCount += 1;
    if (relationship.direction !== "directed") errors.push(`${label}: direction mismatch`);
    if (relationship.provenance?.basis !== "native_reviewed_relationship") errors.push(`${label}: provenance basis mismatch`);
    if (!Array.isArray(relationship.provenance?.native_evidence_refs)) errors.push(`${label}: native_evidence_refs must be an array`);
    if (!indexKeys.has(source)) errors.push(`${label}: source endpoint missing from live Series index`);
    if (!indexKeys.has(target)) errors.push(`${label}: target endpoint missing from live Series index`);
    if (source === target) errors.push(`${label}: self-loop`);
    if (!expectedTupleSet.has(tuple)) errors.push(`${label}: tuple outside reviewed allowlist`);
    if (actualTupleSet.has(tuple)) errors.push(`${label}: duplicate tuple`);
    actualTupleSet.add(tuple);
    const expectedId = expectedRelationshipId(relationship.relation_type, source, target);
    if (relationship.id !== expectedId) errors.push(`${label}: deterministic ID mismatch`);
    if (ids.has(relationship.id)) errors.push(`${label}: duplicate relationship ID`);
    ids.add(relationship.id);
    endpointKeys.add(source);
    endpointKeys.add(target);
  }
}

if (incidentOfCount !== 42 || predecessorCount !== 1 || successorCount !== 1) {
  errors.push(`relationship type counts must be 42/1/1, found ${incidentOfCount}/${predecessorCount}/${successorCount}`);
}
if (actualTupleSet.size !== expectedTupleSet.size || [...expectedTupleSet].some((tuple) => !actualTupleSet.has(tuple))) {
  errors.push("Live relationship set does not exactly equal reviewed finite allowlist");
}

const rowsByKey = new Map(indexRows.map((row) => [row.global_record_key, row]));
const endpointTasks = [...endpointKeys].map((key) => {
  const row = rowsByKey.get(key);
  return row ? { key, route: new URL(row.machine_url).pathname } : null;
}).filter(Boolean);

for (let offset = 0; offset < endpointTasks.length; offset += concurrency) {
  const batch = endpointTasks.slice(offset, offset + concurrency);
  await Promise.all(batch.map(async ({ key, route }) => {
    const envelope = await fetchJson(route, `Series endpoint ${key}`);
    if (!envelope) return;
    if (envelope.global_record_key !== key) errors.push(`Series endpoint ${key}: global key mismatch`);
    if (!Array.isArray(envelope.relationships) || envelope.relationships.length !== 0) errors.push(`Series endpoint ${key}: record-envelope relationships must remain empty`);
  }));
}

if (errors.length) {
  console.error("Production Series relationship verification failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Production Series relationship verification passed: 44 reviewed relationships and ${endpointTasks.length} referenced Stage 3 endpoints.`);
