import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { loadPublicConfig } from "./lib/canonical-data.mjs";
import { buildMachineGuides } from "./lib/machine-guides.mjs";

const root = process.cwd();
const config = loadPublicConfig(root, process.env);
const stagingRoot = path.resolve(root, config.generated_output_dir);
const publicRoot = path.resolve(root, config.public_output_dir ?? "public");

function readJson(relativePath) {
  try {
    return JSON.parse(fs.readFileSync(path.join(stagingRoot, relativePath), "utf8"));
  } catch (error) {
    throw new Error(`Failed to read generated staging file ${relativePath}: ${error.message}`);
  }
}

function writeJson(relativePath, value) {
  const target = path.join(publicRoot, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function writeText(relativePath, value) {
  const target = path.join(publicRoot, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, value.endsWith("\n") ? value : `${value}\n`, "utf8");
}

function absoluteUrl(pathname) {
  return new URL(pathname.replace(/^\//, ""), `${config.canonical_origin}/`).toString();
}

const metadata = readJson("registry-meta.json");
const datasets = {
  bridges: readJson("bridges.json"),
  incidents: readJson("incidents.json"),
  events: readJson("events.json"),
  evidence: readJson("evidence.json"),
  chains: readJson("reference/chains.json"),
  assets: readJson("reference/assets.json")
};

const endpoints = Object.fromEntries(
  Object.entries({
    version: "/version.json",
    manifest: "/data/manifest.json",
    bridges: "/data/bridges.json",
    incidents: "/data/incidents.json",
    events: "/data/events.json",
    evidence: "/data/evidence.json",
    chains: "/data/reference/chains.json",
    assets: "/data/reference/assets.json",
    llms: "/llms.txt",
    ai: "/ai.txt"
  }).map(([key, value]) => [key, absoluteUrl(value)])
);

const version = {
  project_id: metadata.project_id,
  site_name: metadata.site_name,
  registry_type: metadata.registry_type,
  schema_version: metadata.schema_version,
  generated_at: metadata.generated_at,
  latest_verified_at: metadata.latest_verified_at,
  canonical_origin: metadata.canonical_origin,
  verification_marker: config.verification_marker,
  canonical_only: true,
  record_counts: metadata.record_counts
};

const manifest = {
  ...version,
  data_model: {
    primary_record: "bridge",
    supporting_records: ["incident", "event", "evidence"],
    reference_records: ["chain", "asset"]
  },
  endpoints,
  human_page_patterns: {
    bridge: absoluteUrl("/bridge/{slug}/"),
    incident: absoluteUrl("/incident/{slug}/")
  },
  data_safety: {
    canonical_only: true,
    excludes_noncanonical_working_material: true
  }
};

const guides = buildMachineGuides({ metadata, endpoints, absoluteUrl });

fs.rmSync(path.join(publicRoot, "data"), { recursive: true, force: true });
for (const filename of ["version.json", "llms.txt", "ai.txt"]) {
  fs.rmSync(path.join(publicRoot, filename), { force: true });
}

writeJson("version.json", version);
writeJson("data/manifest.json", manifest);
for (const key of ["bridges", "incidents", "events", "evidence"]) {
  writeJson(`data/${key}.json`, datasets[key]);
}
writeJson("data/reference/chains.json", datasets.chains);
writeJson("data/reference/assets.json", datasets.assets);
writeText("llms.txt", guides.llms);
writeText("ai.txt", guides.ai);

const counts = metadata.record_counts;
console.log(`Published machine-readable files under ${path.relative(root, publicRoot) || "."}.`);
console.log(`Counts: ${counts.bridges} bridges, ${counts.incidents} incidents, ${counts.events} events, ${counts.evidence} evidence sources.`);
