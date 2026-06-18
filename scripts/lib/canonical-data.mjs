import fs from "node:fs";
import path from "node:path";

function readJsonFile(root, relativePath) {
  const absolutePath = path.join(root, relativePath);
  let parsed;

  try {
    parsed = JSON.parse(fs.readFileSync(absolutePath, "utf8"));
  } catch (error) {
    throw new Error(`Failed to read or parse ${relativePath}: ${error.message}`);
  }

  return parsed;
}

function expectArray(value, label) {
  if (!Array.isArray(value)) {
    throw new Error(`${label} must be an array`);
  }
  return value;
}

function expectObject(value, label) {
  if (!value || Array.isArray(value) || typeof value !== "object") {
    throw new Error(`${label} must be an object`);
  }
  return value;
}

function assertUnique(records, field, label) {
  const seen = new Set();

  for (const record of records) {
    const value = record?.[field];
    if (typeof value !== "string" || value.length === 0) {
      throw new Error(`${label} contains a record without ${field}`);
    }
    if (seen.has(value)) {
      throw new Error(`${label} contains duplicate ${field}: ${value}`);
    }
    seen.add(value);
  }
}

function normalizeOrigin(value) {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error("canonical_origin must be a non-empty string");
  }

  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error(`Invalid canonical_origin: ${value}`);
  }

  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    throw new Error(`canonical_origin must use http or https: ${value}`);
  }

  return parsed.toString().replace(/\/$/, "");
}

function latestDate(values) {
  const valid = values
    .filter((value) => typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value))
    .sort((a, b) => a.localeCompare(b));

  return valid.at(-1) ?? null;
}

export function resolveGeneratedAt(env = process.env, now = new Date()) {
  if (env.SOURCE_DATE_EPOCH) {
    const seconds = Number(env.SOURCE_DATE_EPOCH);
    if (!Number.isFinite(seconds)) {
      throw new Error("SOURCE_DATE_EPOCH must be a finite Unix timestamp in seconds");
    }
    return new Date(seconds * 1000).toISOString();
  }

  for (const key of ["PUBLIC_GENERATED_AT", "CF_PAGES_BUILD_TIMESTAMP", "BUILD_TIMESTAMP"]) {
    const value = env[key];
    if (!value) continue;
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      throw new Error(`${key} must be a valid date or timestamp`);
    }
    return parsed.toISOString();
  }

  return now.toISOString();
}

export function loadPublicConfig(root = process.cwd(), env = process.env) {
  const config = expectObject(readJsonFile(root, "config/public-data.json"), "public data config");
  const sourceFiles = expectObject(config.source_files, "source_files");

  for (const key of ["bridges", "incidents", "events", "evidence", "chains", "assets"]) {
    if (typeof sourceFiles[key] !== "string" || sourceFiles[key].length === 0) {
      throw new Error(`source_files.${key} must be a non-empty string`);
    }
  }

  if (config.canonical_only !== true) {
    throw new Error("canonical_only must be true");
  }

  return {
    ...config,
    canonical_origin: normalizeOrigin(env.PUBLIC_SITE_ORIGIN ?? config.canonical_origin),
    generated_output_dir: env.PUBLIC_GENERATED_OUTPUT_DIR ?? config.generated_output_dir,
    source_files: sourceFiles
  };
}

export function loadCanonicalData(root = process.cwd(), env = process.env) {
  const config = loadPublicConfig(root, env);
  const sourceFiles = config.source_files;

  const bridges = expectArray(readJsonFile(root, sourceFiles.bridges), "bridges");
  const incidents = expectArray(readJsonFile(root, sourceFiles.incidents), "incidents");
  const events = expectArray(readJsonFile(root, sourceFiles.events), "events");
  const evidence = expectArray(readJsonFile(root, sourceFiles.evidence), "evidence");
  const chains = expectObject(readJsonFile(root, sourceFiles.chains), "chains");
  const assets = expectObject(readJsonFile(root, sourceFiles.assets), "assets");

  assertUnique(bridges, "id", "bridges");
  assertUnique(bridges, "slug", "bridges");
  assertUnique(incidents, "id", "incidents");
  assertUnique(incidents, "slug", "incidents");
  assertUnique(events, "id", "events");
  assertUnique(evidence, "id", "evidence");

  const recordCounts = {
    bridges: bridges.length,
    incidents: incidents.length,
    events: events.length,
    evidence: evidence.length
  };

  const latestVerifiedAt = latestDate([
    ...bridges.map((record) => record.last_verified_at),
    ...incidents.map((record) => record.last_verified_at),
    ...evidence.map((record) => record.accessed_at)
  ]);

  return {
    config,
    data: { bridges, incidents, events, evidence, chains, assets },
    recordCounts,
    latestVerifiedAt
  };
}
