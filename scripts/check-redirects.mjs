import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { loadCanonicalData } from "./lib/canonical-data.mjs";
import { buildLegacyRedirects, formatCloudflareRedirects } from "./lib/legacy-redirects.mjs";

const root = process.cwd();
const canonical = loadCanonicalData(root, process.env);
const publicRoot = path.resolve(root, canonical.config.public_output_dir ?? "public");
const target = path.join(publicRoot, "_redirects");
const errors = [];

let actual = "";
try {
  actual = fs.readFileSync(target, "utf8");
} catch (error) {
  errors.push(`public/_redirects: ${error.message}`);
}

const expectedRedirects = buildLegacyRedirects(canonical.data);
const expected = formatCloudflareRedirects(expectedRedirects);
if (actual !== expected) {
  errors.push("public/_redirects does not match canonical slug history");
}

const parsed = new Map();
for (const [index, rawLine] of actual.split(/\r?\n/).entries()) {
  const line = rawLine.trim();
  if (!line || line.startsWith("#")) continue;
  const parts = line.split(/\s+/);
  if (parts.length !== 3) {
    errors.push(`public/_redirects line ${index + 1}: expected source target status`);
    continue;
  }
  const [source, destination, status] = parts;
  if (status !== "301") errors.push(`public/_redirects line ${index + 1}: status must be 301`);
  const existing = parsed.get(source);
  if (existing && existing !== destination) errors.push(`public/_redirects: conflicting source ${source}`);
  parsed.set(source, destination);
}

const canonicalTargets = new Set([
  ...canonical.data.bridges.map((record) => `/bridge/${record.slug}/`),
  ...canonical.data.incidents.map((record) => `/incident/${record.slug}/`)
]);

for (const [records, prefix, label] of [
  [canonical.data.bridges, "/bridge/", "bridge"],
  [canonical.data.incidents, "/incident/", "incident"]
]) {
  for (const record of records) {
    const legacySlugs = new Set([...(record.previous_slugs ?? []), ...(record.redirect_from ?? [])]);
    const destination = `${prefix}${record.slug}/`;
    for (const slug of legacySlugs) {
      for (const source of [`${prefix}${slug}`, `${prefix}${slug}/`]) {
        if (parsed.get(source) !== destination) {
          errors.push(`${label} ${record.id}: missing exact legacy redirect ${source} -> ${destination}`);
        }
      }
    }
  }
}

for (const [source, destination] of parsed) {
  if (source === destination) errors.push(`public/_redirects: self redirect ${source}`);
  if (!canonicalTargets.has(destination)) errors.push(`public/_redirects: missing canonical target ${destination}`);
  const seen = new Set([source]);
  let current = destination;
  while (parsed.has(current)) {
    if (seen.has(current)) {
      errors.push(`public/_redirects: loop from ${source}`);
      break;
    }
    seen.add(current);
    current = parsed.get(current);
  }
}

let sitemap = "";
try {
  sitemap = fs.readFileSync(path.join(publicRoot, "sitemap.xml"), "utf8");
} catch (error) {
  errors.push(`public/sitemap.xml: ${error.message}`);
}
for (const source of parsed.keys()) {
  const absolute = new URL(source.replace(/^\//, ""), `${canonical.config.canonical_origin}/`).toString();
  if (sitemap.includes(`<loc>${absolute}</loc>`)) errors.push(`sitemap.xml contains legacy route ${source}`);
}

if (errors.length > 0) {
  console.error("Legacy redirect check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Legacy redirect check passed for ${expectedRedirects.length} routes.`);
