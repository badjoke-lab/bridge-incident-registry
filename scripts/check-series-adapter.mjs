import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const publicRoot = path.resolve(root, "public");
const authorityPath = path.join(root, "config", "ledger-series-phase9-stage5-relationship-authority.json");

function readJson(relativePath) {
  const target = path.join(publicRoot, relativePath);
  if (!fs.existsSync(target)) throw new Error(`Missing ${relativePath}`);
  return JSON.parse(fs.readFileSync(target, "utf8"));
}

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])]));
  }
  return value;
}

function same(left, right) {
  return JSON.stringify(stable(left)) === JSON.stringify(stable(right));
}

function endpointGlobalKey(endpoint) {
  return `${endpoint?.registry_id}:${endpoint?.native_record_type}:${endpoint?.native_record_id}`;
}

function expectedRelationshipId(relationType, sourceGlobalKey, targetGlobalKey) {
  return `series_rel_${createHash("sha256")
    .update(`${relationType}\n${sourceGlobalKey}\n${targetGlobalKey}`, "utf8")
    .digest("hex")}`;
}

const manifest = readJson("data/manifest.json");
const bridges = readJson("data/bridges.json");
const incidents = readJson("data/incidents.json");
const descriptor = readJson("data/series/registry.json");
const index = readJson("data/series/index.json");
const relationships = readJson("data/series/relationships.json");
const authority = JSON.parse(fs.readFileSync(authorityPath, "utf8"));
const errors = [];
const fail = (message) => errors.push(message);

if (authority.authority_id !== "bir-ledger-series-phase9-stage5-relationship-2026-08-21") fail("unexpected Stage 5 authority id");
if (authority.registry_id !== "bridge-incident-registry" || authority.accepted_count !== 44) fail("Stage 5 authority registry/count mismatch");
if (!Array.isArray(authority.finite_allowlist) || authority.finite_allowlist.length !== 44) fail("Stage 5 finite allowlist must contain 44 rows");

if (descriptor.series_schema_version !== "1.0.0") fail("Series schema version mismatch");
if (descriptor.registry?.id !== "bridge-incident-registry") fail("registry id mismatch");
if (descriptor.registry?.origin !== "https://bir.badjoke-lab.com") fail("registry origin mismatch");
if (descriptor.canonical_only !== true) fail("descriptor must be canonical_only");
if (descriptor.record_counts?.primary_records !== bridges.length) fail("primary record count mismatch");
if (descriptor.record_counts?.series_records !== bridges.length + incidents.length) fail("Series record count mismatch");
if (descriptor.record_counts?.relationships !== 44) fail("relationship count must be exactly 44");
if (descriptor.routes?.relationships !== "/data/series/relationships.json") fail("relationship route mismatch");
if (descriptor.capabilities?.relationships !== "adapter") fail("relationship capability mismatch");
if (descriptor.routes?.search !== "/incidents/") fail("search route mismatch");
if (descriptor.routes?.compare !== "/compare/") fail("compare route mismatch");
if (descriptor.routes?.stats !== "/stats/") fail("stats route mismatch");
if (descriptor.verification?.verification_marker !== manifest.verification_marker) fail("verification marker mismatch");
if (descriptor.verification?.generated_at !== manifest.generated_at) fail("generated_at mismatch");
if (descriptor.verification?.last_verified_at !== manifest.latest_verified_at) fail("last_verified_at mismatch");
if (descriptor.data_safety?.canonical_only !== true) fail("Series data safety mismatch");
if (descriptor.data_safety?.includes_unreviewed_candidates !== false) fail("candidate boundary mismatch");
if (descriptor.data_safety?.includes_internal_monitoring !== false) fail("monitoring boundary mismatch");
if (descriptor.data_safety?.includes_private_notes !== false) fail("private-note boundary mismatch");
if (descriptor.data_safety?.ai_generated_canonical_facts !== false) fail("AI canonical fact boundary mismatch");

const expectedCount = bridges.length + incidents.length;
if (index.record_count !== expectedCount) fail(`index count ${index.record_count} != ${expectedCount}`);
if (index.record_counts?.bridges !== bridges.length) fail("bridge index count mismatch");
if (index.record_counts?.incidents !== incidents.length) fail("incident index count mismatch");
if (index.generated_at !== manifest.generated_at) fail("index generated_at mismatch");
if (index.last_verified_at !== manifest.latest_verified_at) fail("index last_verified_at mismatch");

const keys = new Set();
for (const row of index.records ?? []) {
  if (keys.has(row.global_record_key)) fail(`duplicate global key ${row.global_record_key}`);
  keys.add(row.global_record_key);

  if (row.native_record_type === "bridge") {
    const native = bridges.find((record) => record.id === row.native_record_id && record.slug === row.slug);
    if (!native) {
      fail(`${row.series_slug}: missing native bridge`);
      continue;
    }
    const dossier = readJson(`data/bridge/${native.slug}.json`);
    const envelope = readJson(`data/series/records/${row.series_slug}.json`);
    const expectedKey = `bridge-incident-registry:bridge:${native.id}`;
    if (row.global_record_key !== expectedKey || envelope.global_record_key !== expectedKey) fail(`${row.series_slug}: bridge key mismatch`);
    if (envelope.record_key?.native_record_id !== native.id) fail(`${row.series_slug}: bridge id mismatch`);
    if (envelope.identity?.name !== native.canonical_name) fail(`${row.series_slug}: bridge name mismatch`);
    if (!same(envelope.current_state?.native?.record, dossier.record)) fail(`${row.series_slug}: bridge native record mismatch`);
    if (envelope.current_state?.status !== native.status) fail(`${row.series_slug}: bridge status mismatch`);
    if (envelope.urls?.human !== dossier.canonical_page_url) fail(`${row.series_slug}: bridge human URL mismatch`);
    if (envelope.urls?.native_machine !== dossier.self_url) fail(`${row.series_slug}: bridge native machine URL mismatch`);
    if (!same(envelope.events?.records ?? [], dossier.related?.events ?? [])) fail(`${row.series_slug}: bridge events mismatch`);
    if (!same(envelope.evidence?.records ?? [], dossier.related?.evidence ?? [])) fail(`${row.series_slug}: bridge evidence mismatch`);
    const incidentIds = (dossier.related?.incidents ?? []).map((incident) => incident.id);
    if (!same(envelope.current_state?.native?.related_incident_ids ?? [], incidentIds)) fail(`${row.series_slug}: bridge incident IDs mismatch`);
    if ((envelope.relationships ?? []).length !== 0) fail(`${row.series_slug}: record-envelope bridge relationships must remain empty during Stage 5 publication`);
  } else if (row.native_record_type === "incident") {
    const native = incidents.find((record) => record.id === row.native_record_id && record.slug === row.slug);
    if (!native) {
      fail(`${row.series_slug}: missing native incident`);
      continue;
    }
    const dossier = readJson(`data/incident/${native.slug}.json`);
    const envelope = readJson(`data/series/records/${row.series_slug}.json`);
    const expectedKey = `bridge-incident-registry:incident:${native.id}`;
    if (row.global_record_key !== expectedKey || envelope.global_record_key !== expectedKey) fail(`${row.series_slug}: incident key mismatch`);
    if (envelope.record_key?.native_record_id !== native.id) fail(`${row.series_slug}: incident id mismatch`);
    if (envelope.identity?.name !== native.title) fail(`${row.series_slug}: incident name mismatch`);
    if (!same(envelope.current_state?.native?.record, dossier.record)) fail(`${row.series_slug}: incident native record mismatch`);
    if (envelope.current_state?.status !== (native.current_outcome ?? null)) fail(`${row.series_slug}: incident outcome mismatch`);
    if (envelope.current_state?.native?.parent_bridge?.id !== native.bridge_id) fail(`${row.series_slug}: incident parent bridge mismatch`);
    if (envelope.urls?.human !== dossier.canonical_page_url) fail(`${row.series_slug}: incident human URL mismatch`);
    if (envelope.urls?.native_machine !== dossier.self_url) fail(`${row.series_slug}: incident native machine URL mismatch`);
    if (!same(envelope.events?.records ?? [], dossier.related?.events ?? [])) fail(`${row.series_slug}: incident events mismatch`);
    if (!same(envelope.evidence?.records ?? [], dossier.related?.evidence ?? [])) fail(`${row.series_slug}: incident evidence mismatch`);
    if ((envelope.relationships ?? []).length !== 0) fail(`${row.series_slug}: record-envelope incident relationships must remain empty during Stage 5 publication`);
  } else {
    fail(`${row.series_slug}: unknown native record type ${row.native_record_type}`);
  }
}

const recordDir = path.join(publicRoot, "data", "series", "records");
const recordFiles = fs.readdirSync(recordDir).filter((name) => name.endsWith(".json"));
if (recordFiles.length !== expectedCount) fail(`Series record file count ${recordFiles.length} != ${expectedCount}`);

if (!Array.isArray(relationships) || relationships.length !== 44) fail(`relationship transport must contain exactly 44 records, found ${Array.isArray(relationships) ? relationships.length : "non-array"}`);
const expectedTupleSet = new Set(authority.finite_allowlist.map(([type, source, target]) => `${type}\n${source}\n${target}`));
if (expectedTupleSet.size !== 44) fail("authority finite allowlist contains duplicate tuples");
const actualTupleSet = new Set();
const relationshipIds = new Set();
let incidentOfCount = 0;
let predecessorCount = 0;
let successorCount = 0;
for (const [relationshipIndex, relationship] of (relationships ?? []).entries()) {
  const label = `relationship ${relationshipIndex + 1}`;
  if (relationship.series_schema_version !== "1.0.0") fail(`${label}: schema version mismatch`);
  if (relationship.object_type !== "relationship_record") fail(`${label}: object type mismatch`);
  if (!["incident_of", "predecessor_of", "successor_of"].includes(relationship.relation_type)) fail(`${label}: unauthorized relation type`);
  if (relationship.relation_type === "incident_of") incidentOfCount += 1;
  if (relationship.relation_type === "predecessor_of") predecessorCount += 1;
  if (relationship.relation_type === "successor_of") successorCount += 1;
  if (relationship.direction !== "directed") fail(`${label}: direction mismatch`);
  if (relationship.provenance?.basis !== "native_reviewed_relationship") fail(`${label}: provenance basis mismatch`);
  if (!Array.isArray(relationship.provenance?.native_evidence_refs)) fail(`${label}: native evidence refs must be an array`);

  const source = endpointGlobalKey(relationship.source);
  const target = endpointGlobalKey(relationship.target);
  if (!keys.has(source)) fail(`${label}: source endpoint missing from Stage 3 index`);
  if (!keys.has(target)) fail(`${label}: target endpoint missing from Stage 3 index`);
  if (source === target) fail(`${label}: self-loop is not authorized`);
  const tuple = `${relationship.relation_type}\n${source}\n${target}`;
  if (!expectedTupleSet.has(tuple)) fail(`${label}: tuple outside reviewed finite allowlist`);
  if (actualTupleSet.has(tuple)) fail(`${label}: duplicate tuple`);
  actualTupleSet.add(tuple);

  const expectedId = expectedRelationshipId(relationship.relation_type, source, target);
  if (relationship.id !== expectedId) fail(`${label}: deterministic ID mismatch`);
  if (relationshipIds.has(relationship.id)) fail(`${label}: duplicate relationship ID`);
  relationshipIds.add(relationship.id);
}
if (incidentOfCount !== 42 || predecessorCount !== 1 || successorCount !== 1) fail(`relationship type counts must be 42/1/1, found ${incidentOfCount}/${predecessorCount}/${successorCount}`);
if (actualTupleSet.size !== expectedTupleSet.size || [...expectedTupleSet].some((tuple) => !actualTupleSet.has(tuple))) fail("generated relationship set does not exactly equal reviewed finite allowlist");

if (errors.length) {
  console.error(`BIR Series adapter validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`BIR Series adapter validation passed: ${bridges.length} bridges + ${incidents.length} incidents, ${relationships.length} reviewed relationships.`);
