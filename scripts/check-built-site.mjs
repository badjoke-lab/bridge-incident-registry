import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { loadCanonicalData } from "./lib/canonical-data.mjs";
import { buildLegacyRedirects } from "./lib/legacy-redirects.mjs";
import {
  assertCanonicalMetadata,
  assertIdOrder,
  assertRecordCounts,
  assertRedirectGraph,
  assertSafePublicValue,
  assertSitemapCoverage,
  extractAttribute,
  findTag,
  parseJsonLd,
  visibleText
} from "./lib/consistency-guards.mjs";

const root = process.cwd();
const distRoot = path.join(root, "dist");
const canonical = loadCanonicalData(root, process.env);
const origin = canonical.config.canonical_origin;
const errors = [];
const blockedKeys = new Set([
  "candidate_status",
  "internal_notes",
  "private_notes",
  "monitoring_status",
  "review_queue",
  "draft_status",
  "is_candidate",
  "unverified_candidate"
]);
const blockedSegments = new Set([
  "candidate",
  "candidates",
  "monitoring",
  "internal",
  "private",
  "staging",
  "draft",
  "drafts",
  ".generated"
]);

function capture(label, fn) {
  try { fn(); }
  catch (error) { errors.push(`${label}: ${error.message}`); }
}

function readText(relativePath) {
  try { return fs.readFileSync(path.join(distRoot, relativePath), "utf8"); }
  catch (error) { errors.push(`${relativePath}: ${error.message}`); return ""; }
}

function readJson(relativePath) {
  const text = readText(relativePath);
  if (!text) return null;
  try { return JSON.parse(text); }
  catch (error) { errors.push(`${relativePath}: invalid JSON: ${error.message}`); return null; }
}

function pagePath(pathname) {
  if (pathname === "/") return "index.html";
  return path.join(pathname.replace(/^\//, ""), "index.html");
}

function absolute(pathname) {
  return new URL(pathname.replace(/^\//, ""), `${origin}/`).toString();
}

function assertAlternate(html, href, label) {
  const tags = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => match[0]);
  const found = tags.some((tag) => extractAttribute(tag, "rel") === "alternate" && extractAttribute(tag, "href") === href);
  if (!found) throw new Error(`${label}: missing alternate ${href}`);
}

function checkHtml(pathname, options = {}) {
  const label = `HTML ${pathname}`;
  const html = readText(pagePath(pathname));
  if (!html) return;
  capture(label, () => assertCanonicalMetadata(html, absolute(pathname), label));
  capture(label, () => parseJsonLd(html, label));
  const robotsTag = findTag(html, "meta", "name", "robots");
  if (!robotsTag || extractAttribute(robotsTag, "content") !== "index, follow") {
    errors.push(`${label}: production robots metadata must be index, follow`);
  }
  for (const href of [absolute("/data/manifest.json"), absolute("/version.json"), absolute("/llms.txt"), absolute("/ai.txt")]) {
    capture(label, () => assertAlternate(html, href, label));
  }
  if (options.dataPath) capture(label, () => assertAlternate(html, absolute(options.dataPath), label));
  if (options.identifier) {
    capture(label, () => {
      const entries = parseJsonLd(html, label);
      if (!entries.some((entry) => entry?.identifier === options.identifier)) {
        throw new Error(`${label}: JSON-LD missing identifier ${options.identifier}`);
      }
    });
  }
  return html;
}

if (!fs.existsSync(distRoot)) {
  errors.push("dist directory does not exist; run npm run build first");
}

const home = checkHtml("/", { dataPath: "/data/manifest.json" });
const bridgeIndex = checkHtml("/bridges/", { dataPath: "/data/bridges.json" });
const incidentIndex = checkHtml("/incidents/", { dataPath: "/data/incidents.json" });
checkHtml("/methodology/");
checkHtml("/about/");

if (home) {
  const text = visibleText(home);
  for (const expected of [
    `${canonical.recordCounts.bridges} Bridge records`,
    `${canonical.recordCounts.incidents} Incident cases`,
    `${canonical.recordCounts.events} Timeline events`,
    `${canonical.recordCounts.evidence} Evidence records`
  ]) {
    if (!text.includes(expected)) errors.push(`homepage: missing visible count '${expected}'`);
  }
}
if (bridgeIndex && !visibleText(bridgeIndex).includes(`${canonical.recordCounts.bridges} bridge records`)) {
  errors.push("bridge index: visible count mismatch");
}
if (incidentIndex && !visibleText(incidentIndex).includes(`${canonical.recordCounts.incidents} incident cases`)) {
  errors.push("incident index: visible count mismatch");
}

for (const bridge of canonical.data.bridges) {
  checkHtml(`/bridge/${bridge.slug}/`, { dataPath: "/data/bridges.json", identifier: bridge.id });
}
for (const incident of canonical.data.incidents) {
  checkHtml(`/incident/${incident.slug}/`, { dataPath: "/data/incidents.json", identifier: incident.id });
}

const version = readJson("version.json");
const manifest = readJson("data/manifest.json");
const publicData = {
  bridges: readJson("data/bridges.json"),
  incidents: readJson("data/incidents.json"),
  events: readJson("data/events.json"),
  evidence: readJson("data/evidence.json")
};

if (version) capture("version counts", () => assertRecordCounts(canonical.recordCounts, version.record_counts, "version.json"));
if (manifest) capture("manifest counts", () => assertRecordCounts(canonical.recordCounts, manifest.record_counts, "manifest.json"));
for (const key of ["bridges", "incidents", "events", "evidence"]) {
  if (publicData[key]) capture(`${key} IDs`, () => assertIdOrder(canonical.data[key], publicData[key], key));
  if (publicData[key]) capture(`${key} safety`, () => assertSafePublicValue(publicData[key], blockedKeys, key));
}

const expectedUrls = [
  absolute("/"),
  absolute("/bridges/"),
  absolute("/incidents/"),
  absolute("/methodology/"),
  absolute("/about/"),
  ...canonical.data.bridges.map((record) => absolute(`/bridge/${record.slug}/`)),
  ...canonical.data.incidents.map((record) => absolute(`/incident/${record.slug}/`))
];
const sitemap = readText("sitemap.xml");
if (sitemap) capture("sitemap", () => assertSitemapCoverage(sitemap, expectedUrls));

const robots = readText("robots.txt");
if (robots && !robots.includes(`Sitemap: ${absolute("/sitemap.xml")}`)) errors.push("robots.txt: canonical sitemap missing");
if (robots && !robots.includes("Allow: /")) errors.push("robots.txt: production crawl allowance missing");

const aliasesText = readText("_redirects");
const aliases = aliasesText.split(/\r?\n/).filter(Boolean).map((line) => {
  const [source, target, status] = line.trim().split(/\s+/);
  return { source, target, status: Number(status) };
});
const canonicalTargets = new Set([
  ...canonical.data.bridges.map((record) => `/bridge/${record.slug}/`),
  ...canonical.data.incidents.map((record) => `/incident/${record.slug}/`)
]);
capture("path aliases", () => assertRedirectGraph(aliases, canonicalTargets));
const expectedAliases = buildLegacyRedirects(canonical.data);
if (JSON.stringify(aliases) !== JSON.stringify(expectedAliases)) errors.push("_redirects: generated aliases differ from canonical expectation");

const headers = readText("_headers");
if (headers && !headers.includes("/data/*")) errors.push("_headers: data rule missing");
if (headers && !headers.includes("Content-Type: application/json")) errors.push("_headers: JSON content type missing");

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(absolutePath) : [absolutePath];
  });
}
for (const file of walk(distRoot)) {
  const relative = path.relative(distRoot, file).split(path.sep);
  for (const segment of relative) {
    if (blockedSegments.has(segment.toLowerCase())) errors.push(`dist contains blocked path segment: ${path.relative(distRoot, file)}`);
  }
}

if (errors.length > 0) {
  console.error("Built-site consistency check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Built-site consistency check passed for ${expectedUrls.length} canonical HTML URLs.`);
console.log(`Records: ${canonical.recordCounts.bridges} bridges, ${canonical.recordCounts.incidents} incidents, ${canonical.recordCounts.events} events, ${canonical.recordCounts.evidence} evidence sources.`);
