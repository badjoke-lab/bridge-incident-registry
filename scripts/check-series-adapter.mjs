import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const publicRoot = path.resolve(root, "public");

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

const manifest = readJson("data/manifest.json");
const bridges = readJson("data/bridges.json");
const incidents = readJson("data/incidents.json");
const descriptor = readJson("data/series/registry.json");
const index = readJson("data/series/index.json");
const errors = [];
const fail = (message) => errors.push(message);

if (descriptor.series_schema_version !== "1.0.0") fail("Series schema version mismatch");
if (descriptor.registry?.id !== "bridge-incident-registry") fail("registry id mismatch");
if (descriptor.registry?.origin !== "https://bir.badjoke-lab.com") fail("registry origin mismatch");
if (descriptor.canonical_only !== true) fail("descriptor must be canonical_only");
if (descriptor.record_counts?.primary_records !== bridges.length) fail("primary record count mismatch");
if (descriptor.record_counts?.series_records !== bridges.length + incidents.length) fail("Series record count mismatch");
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
    if ((envelope.relationships ?? []).length !== 0) fail(`${row.series_slug}: typed bridge relationships emitted during Stage 3`);
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
    if ((envelope.relationships ?? []).length !== 0) fail(`${row.series_slug}: typed incident relationships emitted during Stage 3`);
  } else {
    fail(`${row.series_slug}: unknown native record type ${row.native_record_type}`);
  }
}

const recordDir = path.join(publicRoot, "data", "series", "records");
const recordFiles = fs.readdirSync(recordDir).filter((name) => name.endsWith(".json"));
if (recordFiles.length !== expectedCount) fail(`Series record file count ${recordFiles.length} != ${expectedCount}`);

if (errors.length) {
  console.error(`BIR Series adapter validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`BIR Series adapter validation passed: ${bridges.length} bridges + ${incidents.length} incidents.`);
