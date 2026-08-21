import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const publicRoot = path.resolve(root, "public");
const dataRoot = path.join(publicRoot, "data");
const outputRoot = path.join(dataRoot, "series");
const recordRoot = path.join(outputRoot, "records");
const authorityPath = path.join(root, "config", "ledger-series-phase9-stage5-relationship-authority.json");
const seriesSchemaVersion = "1.0.0";
const adapterVersion = "1.0.0";
const registryId = "bridge-incident-registry";

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(publicRoot, relativePath), "utf8"));
}

function readAuthority() {
  return JSON.parse(fs.readFileSync(authorityPath, "utf8"));
}

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])]));
  }
  return value;
}

function writeJson(target, value) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${JSON.stringify(stable(value), null, 2)}\n`, "utf8");
}

function parseGlobalKey(globalKey) {
  const parts = String(globalKey).split(":");
  if (parts.length !== 3 || parts.some((part) => !part)) throw new Error(`Invalid Series global record key: ${globalKey}`);
  return {
    registry_id: parts[0],
    native_record_type: parts[1],
    native_record_id: parts[2]
  };
}

function relationshipId(relationType, sourceGlobalKey, targetGlobalKey) {
  return `series_rel_${createHash("sha256")
    .update(`${relationType}\n${sourceGlobalKey}\n${targetGlobalKey}`, "utf8")
    .digest("hex")}`;
}

const manifest = readJson("data/manifest.json");
const bridges = readJson("data/bridges.json");
const incidents = readJson("data/incidents.json");
const authority = readAuthority();

if (manifest.project_id !== registryId) throw new Error(`Unexpected BIR project_id: ${manifest.project_id}`);
if (manifest.canonical_only !== true || manifest.data_safety?.canonical_only !== true) {
  throw new Error("BIR native machine layer must remain canonical_only");
}
if (bridges.length !== manifest.record_counts?.bridges) throw new Error("Bridge count differs from native manifest");
if (incidents.length !== manifest.record_counts?.incidents) throw new Error("Incident count differs from native manifest");
if (authority.authority_id !== "bir-ledger-series-phase9-stage5-relationship-2026-08-21") throw new Error("Unexpected BIR Stage 5 relationship authority");
if (authority.registry_id !== registryId || authority.accepted_count !== 44) throw new Error("BIR Stage 5 relationship authority count/registry mismatch");
if (!Array.isArray(authority.finite_allowlist) || authority.finite_allowlist.length !== 44) throw new Error("BIR Stage 5 finite allowlist must contain exactly 44 rows");

fs.rmSync(outputRoot, { recursive: true, force: true });
fs.mkdirSync(recordRoot, { recursive: true });

const rows = [];
const origin = manifest.canonical_origin;

for (const bridge of [...bridges].sort((a, b) => a.slug.localeCompare(b.slug))) {
  const dossier = readJson(`data/bridge/${bridge.slug}.json`);
  if (dossier.record_type !== "bridge" || dossier.record_id !== bridge.id || dossier.slug !== bridge.slug) {
    throw new Error(`${bridge.slug}: native bridge dossier identity mismatch`);
  }
  if (dossier.canonical_only !== true) throw new Error(`${bridge.slug}: bridge dossier is not canonical_only`);

  const globalKey = `${registryId}:bridge:${bridge.id}`;
  const seriesPath = `/data/series/records/bridge--${bridge.slug}.json`;
  const relatedIncidentIds = (dossier.related?.incidents ?? []).map((incident) => incident.id);
  const envelope = {
    series_schema_version: seriesSchemaVersion,
    object_type: "record_envelope",
    registry_id: registryId,
    global_record_key: globalKey,
    record_key: {
      native_record_type: "bridge",
      native_record_id: bridge.id,
      slug: bridge.slug
    },
    urls: {
      human: dossier.canonical_page_url,
      machine: `${origin}${seriesPath}`,
      native_machine: dossier.self_url
    },
    identity: {
      name: bridge.canonical_name,
      aliases: bridge.aliases ?? []
    },
    current_state: {
      status: bridge.status ?? null,
      native: {
        record: dossier.record,
        related_incident_ids: relatedIncidentIds
      }
    },
    events: {
      mode: "inline",
      records: dossier.related?.events ?? []
    },
    evidence: {
      mode: "inline",
      records: dossier.related?.evidence ?? []
    },
    relationships: [],
    verification: {
      generated_at: dossier.generated_at ?? manifest.generated_at ?? null,
      last_verified_at: bridge.last_verified_at ?? manifest.latest_verified_at ?? null,
      verification_marker: dossier.verification_marker ?? manifest.verification_marker ?? null
    },
    provenance: {
      canonical_only: true,
      adapter: {
        id: "series-adapter-bridge-incident-registry",
        version: adapterVersion
      },
      native_manifest: `${origin}/data/manifest.json`,
      native_record: dossier.self_url,
      relationship_boundary: "reviewed Stage 5 typed bridge lineage is published only as standalone relationship_record objects; native dossier lineage remains unchanged"
    }
  };

  writeJson(path.join(recordRoot, `bridge--${bridge.slug}.json`), envelope);
  rows.push({
    global_record_key: globalKey,
    native_record_type: "bridge",
    native_record_id: bridge.id,
    slug: bridge.slug,
    series_slug: `bridge--${bridge.slug}`,
    name: bridge.canonical_name,
    status: bridge.status ?? null,
    human_url: dossier.canonical_page_url,
    machine_url: `${origin}${seriesPath}`,
    native_machine_url: dossier.self_url
  });
}

for (const incident of [...incidents].sort((a, b) => a.slug.localeCompare(b.slug))) {
  const dossier = readJson(`data/incident/${incident.slug}.json`);
  if (dossier.record_type !== "incident" || dossier.record_id !== incident.id || dossier.slug !== incident.slug) {
    throw new Error(`${incident.slug}: native incident dossier identity mismatch`);
  }
  if (dossier.canonical_only !== true) throw new Error(`${incident.slug}: incident dossier is not canonical_only`);

  const globalKey = `${registryId}:incident:${incident.id}`;
  const seriesPath = `/data/series/records/incident--${incident.slug}.json`;
  const parentBridge = dossier.bridge
    ? {
        id: dossier.bridge.id,
        slug: dossier.bridge.slug,
        canonical_name: dossier.bridge.canonical_name,
        status: dossier.bridge.status
      }
    : null;
  const envelope = {
    series_schema_version: seriesSchemaVersion,
    object_type: "record_envelope",
    registry_id: registryId,
    global_record_key: globalKey,
    record_key: {
      native_record_type: "incident",
      native_record_id: incident.id,
      slug: incident.slug
    },
    urls: {
      human: dossier.canonical_page_url,
      machine: `${origin}${seriesPath}`,
      native_machine: dossier.self_url
    },
    identity: {
      name: incident.title,
      aliases: []
    },
    current_state: {
      status: incident.current_outcome ?? null,
      native: {
        record: dossier.record,
        parent_bridge: parentBridge
      }
    },
    events: {
      mode: "inline",
      records: dossier.related?.events ?? []
    },
    evidence: {
      mode: "inline",
      records: dossier.related?.evidence ?? []
    },
    relationships: [],
    verification: {
      generated_at: dossier.generated_at ?? manifest.generated_at ?? null,
      last_verified_at: incident.last_verified_at ?? manifest.latest_verified_at ?? null,
      verification_marker: dossier.verification_marker ?? manifest.verification_marker ?? null
    },
    provenance: {
      canonical_only: true,
      adapter: {
        id: "series-adapter-bridge-incident-registry",
        version: adapterVersion
      },
      native_manifest: `${origin}/data/manifest.json`,
      native_record: dossier.self_url,
      relationship_boundary: "reviewed Stage 5 incident_of mappings are published only as standalone relationship_record objects; native parent bridge facts remain unchanged"
    }
  };

  writeJson(path.join(recordRoot, `incident--${incident.slug}.json`), envelope);
  rows.push({
    global_record_key: globalKey,
    native_record_type: "incident",
    native_record_id: incident.id,
    slug: incident.slug,
    series_slug: `incident--${incident.slug}`,
    name: incident.title,
    status: incident.current_outcome ?? null,
    human_url: dossier.canonical_page_url,
    machine_url: `${origin}${seriesPath}`,
    native_machine_url: dossier.self_url
  });
}

const availableGlobalKeys = new Set(rows.map((row) => row.global_record_key));
const tuples = new Set();
const ids = new Set();
const relationshipRecords = authority.finite_allowlist.map((entry, index) => {
  if (!Array.isArray(entry) || entry.length !== 3) throw new Error(`BIR Stage 5 relationship row ${index + 1} must contain type/source/target`);
  const [relationType, sourceGlobalKey, targetGlobalKey] = entry;
  if (!["incident_of", "predecessor_of", "successor_of"].includes(relationType)) throw new Error(`BIR Stage 5 unauthorized relation type: ${relationType}`);
  if (!availableGlobalKeys.has(sourceGlobalKey) || !availableGlobalKeys.has(targetGlobalKey)) throw new Error(`BIR Stage 5 row ${index + 1} references a missing Stage 3 endpoint`);
  if (sourceGlobalKey === targetGlobalKey) throw new Error(`BIR Stage 5 row ${index + 1} is a self-loop`);
  const tuple = `${relationType}\n${sourceGlobalKey}\n${targetGlobalKey}`;
  if (tuples.has(tuple)) throw new Error(`BIR Stage 5 duplicate relationship tuple at row ${index + 1}`);
  tuples.add(tuple);
  const id = relationshipId(relationType, sourceGlobalKey, targetGlobalKey);
  if (ids.has(id)) throw new Error(`BIR Stage 5 relationship ID collision: ${id}`);
  ids.add(id);
  return {
    series_schema_version: seriesSchemaVersion,
    object_type: "relationship_record",
    id,
    relation_type: relationType,
    source: parseGlobalKey(sourceGlobalKey),
    target: parseGlobalKey(targetGlobalKey),
    direction: "directed",
    provenance: {
      basis: "native_reviewed_relationship",
      native_evidence_refs: []
    }
  };
});

const descriptor = {
  series_schema_version: seriesSchemaVersion,
  object_type: "registry_descriptor",
  registry: {
    id: registryId,
    native_project_id: manifest.project_id,
    name: manifest.site_name,
    type: manifest.registry_type,
    origin,
    repository: "https://github.com/badjoke-lab/bridge-incident-registry"
  },
  canonical_only: true,
  native_contract: {
    schema_version: manifest.schema_version,
    verification_marker: manifest.verification_marker,
    version_url: `${origin}/version.json`,
    manifest_url: `${origin}/data/manifest.json`
  },
  record_counts: {
    primary_records: bridges.length,
    series_records: rows.length,
    relationships: relationshipRecords.length,
    native: manifest.record_counts
  },
  record_types: [
    {
      series_record_type: "bridge",
      native_record_type: "bridge",
      machine_template: "/data/series/records/bridge--{slug}.json"
    },
    {
      series_record_type: "bridge_incident",
      native_record_type: "incident",
      machine_template: "/data/series/records/incident--{slug}.json"
    }
  ],
  routes: {
    descriptor: "/data/series/registry.json",
    index: "/data/series/index.json",
    relationships: "/data/series/relationships.json",
    record_templates: [
      "/data/series/records/bridge--{slug}.json",
      "/data/series/records/incident--{slug}.json"
    ],
    search: "/incidents/",
    compare: "/compare/",
    stats: "/stats/"
  },
  capabilities: {
    record_json: true,
    events: "inline",
    evidence: "inline",
    relationships: "adapter",
    search: true,
    compare: true,
    stats: true
  },
  verification: {
    generated_at: manifest.generated_at ?? null,
    last_verified_at: manifest.latest_verified_at ?? null,
    verification_marker: manifest.verification_marker ?? null
  },
  data_safety: {
    canonical_only: true,
    includes_unreviewed_candidates: false,
    includes_internal_monitoring: false,
    includes_private_notes: false,
    ai_generated_canonical_facts: false
  }
};

const index = {
  series_schema_version: seriesSchemaVersion,
  object_type: "record_index",
  registry_id: registryId,
  canonical_only: true,
  generated_at: manifest.generated_at ?? null,
  last_verified_at: manifest.latest_verified_at ?? null,
  record_count: rows.length,
  record_counts: {
    bridges: bridges.length,
    incidents: incidents.length
  },
  records: rows.sort((a, b) => a.global_record_key.localeCompare(b.global_record_key))
};

writeJson(path.join(outputRoot, "registry.json"), descriptor);
writeJson(path.join(outputRoot, "index.json"), index);
writeJson(path.join(outputRoot, "relationships.json"), relationshipRecords);
console.log(`Published BIR Series adapter: ${bridges.length} bridge + ${incidents.length} incident envelopes, ${relationshipRecords.length} reviewed relationships.`);
