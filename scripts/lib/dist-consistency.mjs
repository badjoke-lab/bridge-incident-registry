import fs from "node:fs";
import path from "node:path";
import { loadCanonicalData } from "./canonical-data.mjs";
import { buildLegacyRedirects, formatCloudflareRedirects } from "./legacy-redirects.mjs";

const STATIC_ROUTES = ["/", "/bridges/", "/incidents/", "/compare/", "/stats/", "/methodology/", "/about/", "/support/"];
const DOCUMENT_COUNT_FILES = [
  "README.md",
  "docs/runbooks/current-status.md",
  "docs/runbooks/recovery-checkpoint.md",
  "docs/runbooks/development-roadmap.md",
  "docs/runbooks/public-consistency-remediation.md"
];
const STATIC_ALLOWED_JSON_FILES = new Set([
  "version.json",
  "data/manifest.json",
  "data/bridges.json",
  "data/incidents.json",
  "data/events.json",
  "data/evidence.json",
  "data/reference/chains.json",
  "data/reference/assets.json",
  "data/series/registry.json",
  "data/series/index.json"
]);
const FORBIDDEN_PREFIXES = [
  ".generated/",
  "data-staging/",
  "research/",
  "candidates/",
  "watchlists/",
  "private/"
];
const FORBIDDEN_EXTENSIONS = new Set([".csv", ".env", ".jsonl", ".md", ".sqlite", ".sqlite3"]);

function normalizeRelative(value) {
  return value.split(path.sep).join("/").replace(/^\.\//, "");
}

function routeFile(distRoot, route) {
  if (route === "/") return path.join(distRoot, "index.html");
  return path.join(distRoot, route.replace(/^\//, "").replace(/\/$/, ""), "index.html");
}

function absoluteUrl(origin, route) {
  return new URL(route.replace(/^\//, ""), `${origin}/`).toString();
}

function listFiles(root) {
  if (!fs.existsSync(root)) return [];
  const files = [];
  const stack = [root];
  while (stack.length > 0) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const target = path.join(current, entry.name);
      if (entry.isDirectory()) stack.push(target);
      else if (entry.isFile()) files.push(normalizeRelative(path.relative(root, target)));
    }
  }
  return files.sort();
}

function readText(target, label, errors) {
  try {
    return fs.readFileSync(target, "utf8");
  } catch (error) {
    errors.push(`${label}: ${error.message}`);
    return "";
  }
}

function readJson(target, label, errors) {
  const text = readText(target, label, errors);
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch (error) {
    errors.push(`${label}: invalid JSON: ${error.message}`);
    return null;
  }
}

function compareJson(label, actual, expected, errors) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    errors.push(`${label}: value does not match canonical data`);
  }
}

function compareIds(label, actual, expected, errors) {
  if (!Array.isArray(actual)) {
    errors.push(`${label}: dataset must be an array`);
    return;
  }
  const actualIds = actual.map((record) => record?.id);
  const expectedIds = expected.map((record) => record.id);
  if (JSON.stringify(actualIds) !== JSON.stringify(expectedIds)) {
    errors.push(`${label}: IDs do not match canonical IDs in canonical order`);
  }
}

function parseJsonLd(html, label, errors) {
  const entries = [];
  const pattern = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  for (const match of html.matchAll(pattern)) {
    try {
      entries.push(JSON.parse(match[1].trim()));
    } catch (error) {
      errors.push(`${label}: invalid JSON-LD: ${error.message}`);
    }
  }
  if (entries.length === 0) errors.push(`${label}: missing JSON-LD`);
  return entries;
}

function extractCanonicalUrl(html) {
  const match = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i);
  return match?.[1] ?? null;
}

function routeSlugs(distRoot, kind) {
  const root = path.join(distRoot, kind);
  if (!fs.existsSync(root)) return [];
  return fs.readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(root, entry.name, "index.html")))
    .map((entry) => entry.name)
    .sort();
}

function expectDocumentCounts(docsRoot, recordCounts, errors) {
  for (const relativePath of DOCUMENT_COUNT_FILES) {
    const text = readText(path.join(docsRoot, relativePath), relativePath, errors);
    if (!text) continue;
    for (const [label, key] of [["Bridges", "bridges"], ["Incidents", "incidents"], ["Events", "events"], ["Evidence", "evidence"]]) {
      const pattern = new RegExp(`\\b${label}\\s+${recordCounts[key]}\\b`);
      if (!pattern.test(text)) errors.push(`${relativePath}: ${label} count does not match canonical count ${recordCounts[key]}`);
    }
  }
}

function expectHtmlPage({ distRoot, origin, route, identifier, errors }) {
  const target = routeFile(distRoot, route);
  const label = normalizeRelative(path.relative(distRoot, target));
  if (!fs.existsSync(target)) {
    errors.push(`${label}: missing required file`);
    return;
  }
  const html = readText(target, label, errors);
  const expectedUrl = absoluteUrl(origin, route);
  const canonicalUrl = extractCanonicalUrl(html);
  if (canonicalUrl !== expectedUrl) {
    errors.push(`${label}: canonical link mismatch; expected ${expectedUrl}, received ${canonicalUrl ?? "missing"}`);
  }
  if (!html.includes('name="robots" content="index, follow"')) {
    errors.push(`${label}: production robots metadata must be index, follow`);
  }
  if (!html.includes(`${origin}/data/manifest.json`) || !html.includes(`${origin}/version.json`)) {
    errors.push(`${label}: missing canonical data discovery links`);
  }
  const jsonLd = parseJsonLd(html, label, errors);
  if (!jsonLd.some((entry) => entry?.url === expectedUrl)) {
    errors.push(`${label}: JSON-LD is missing canonical page URL ${expectedUrl}`);
  }
  if (identifier && !jsonLd.some((entry) => entry?.identifier === identifier && entry?.url === expectedUrl)) {
    errors.push(`${label}: JSON-LD identifier/url mismatch for ${identifier}`);
  }
}

function buildAllowedJsonFiles(canonical) {
  return new Set([
    ...STATIC_ALLOWED_JSON_FILES,
    ...canonical.data.bridges.map((record) => `data/bridge/${record.slug}.json`),
    ...canonical.data.incidents.map((record) => `data/incident/${record.slug}.json`),
    ...canonical.data.bridges.map((record) => `data/series/records/bridge--${record.slug}.json`),
    ...canonical.data.incidents.map((record) => `data/series/records/incident--${record.slug}.json`)
  ]);
}

export function checkDistConsistency(options = {}) {
  const root = path.resolve(options.root ?? process.cwd());
  const env = options.env ?? process.env;
  const canonical = loadCanonicalData(root, env);
  const distRoot = path.resolve(options.distRoot ?? env.BIR_DIST_ROOT ?? path.join(root, "dist"));
  const docsRoot = path.resolve(options.docsRoot ?? root);
  const origin = canonical.config.canonical_origin;
  const errors = [];
  const allowedJsonFiles = buildAllowedJsonFiles(canonical);

  if (!fs.existsSync(distRoot)) {
    errors.push(`dist root does not exist: ${distRoot}`);
    return { errors, summary: { ...canonical.recordCounts, routes: 0, files: 0 } };
  }

  const version = readJson(path.join(distRoot, "version.json"), "dist/version.json", errors);
  const manifest = readJson(path.join(distRoot, "data/manifest.json"), "dist/data/manifest.json", errors);
  if (version) {
    compareJson("dist/version.json record_counts", version.record_counts, canonical.recordCounts, errors);
    if (version.canonical_only !== true) errors.push("dist/version.json: canonical_only must be true");
    if (version.canonical_origin !== origin) errors.push("dist/version.json: canonical_origin mismatch");
  }
  if (manifest) {
    compareJson("dist/data/manifest.json record_counts", manifest.record_counts, canonical.recordCounts, errors);
    if (manifest.canonical_only !== true || manifest.data_safety?.canonical_only !== true) {
      errors.push("dist/data/manifest.json: canonical-only markers are missing");
    }
  }

  for (const key of ["bridges", "incidents", "events", "evidence"]) {
    const actual = readJson(path.join(distRoot, `data/${key}.json`), `dist/data/${key}.json`, errors);
    compareIds(`dist/data/${key}.json`, actual, canonical.data[key], errors);
  }
  compareJson(
    "dist/data/reference/chains.json",
    readJson(path.join(distRoot, "data/reference/chains.json"), "dist/data/reference/chains.json", errors),
    canonical.data.chains,
    errors
  );
  compareJson(
    "dist/data/reference/assets.json",
    readJson(path.join(distRoot, "data/reference/assets.json"), "dist/data/reference/assets.json", errors),
    canonical.data.assets,
    errors
  );

  for (const route of STATIC_ROUTES) expectHtmlPage({ distRoot, origin, route, errors });
  for (const record of canonical.data.bridges) {
    expectHtmlPage({ distRoot, origin, route: `/bridge/${record.slug}/`, identifier: record.id, errors });
  }
  for (const record of canonical.data.incidents) {
    expectHtmlPage({ distRoot, origin, route: `/incident/${record.slug}/`, identifier: record.id, errors });
  }

  const expectedBridgeSlugs = canonical.data.bridges.map((record) => record.slug).sort();
  const expectedIncidentSlugs = canonical.data.incidents.map((record) => record.slug).sort();
  compareJson("dist bridge route slugs", routeSlugs(distRoot, "bridge"), expectedBridgeSlugs, errors);
  compareJson("dist incident route slugs", routeSlugs(distRoot, "incident"), expectedIncidentSlugs, errors);

  const homeHtml = readText(path.join(distRoot, "index.html"), "dist/index.html", errors);
  for (const [label, key] of [["Bridge records", "bridges"], ["Incident cases", "incidents"], ["Timeline events", "events"], ["Evidence records", "evidence"]]) {
    const pattern = new RegExp(`>${canonical.recordCounts[key]}<\\/div>\\s*<div class=["']stat-label["']>${label}`);
    if (!pattern.test(homeHtml)) {
      errors.push(`dist/index.html: ${label} count does not match canonical count ${canonical.recordCounts[key]}`);
    }
  }
  const bridgeIndex = readText(path.join(distRoot, "bridges/index.html"), "dist/bridges/index.html", errors);
  if (!bridgeIndex.includes(`${canonical.recordCounts.bridges} bridge records`)) {
    errors.push("dist/bridges/index.html: bridge result count mismatch");
  }
  const incidentIndex = readText(path.join(distRoot, "incidents/index.html"), "dist/incidents/index.html", errors);
  if (!incidentIndex.includes(`${canonical.recordCounts.incidents} incident cases`)) {
    errors.push("dist/incidents/index.html: incident result count mismatch");
  }

  const expectedRoutes = [
    ...STATIC_ROUTES,
    ...canonical.data.bridges.map((record) => `/bridge/${record.slug}/`),
    ...canonical.data.incidents.map((record) => `/incident/${record.slug}/`)
  ];
  const expectedUrls = expectedRoutes.map((route) => absoluteUrl(origin, route)).sort();
  const sitemap = readText(path.join(distRoot, "sitemap.xml"), "dist/sitemap.xml", errors);
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).sort();
  if (JSON.stringify(sitemapUrls) !== JSON.stringify(expectedUrls)) {
    errors.push(`dist/sitemap.xml: URL set mismatch; expected ${expectedUrls.length}, received ${sitemapUrls.length}`);
  }

  const robots = readText(path.join(distRoot, "robots.txt"), "dist/robots.txt", errors);
  if (!robots.includes("Allow: /") || !robots.includes(`Sitemap: ${absoluteUrl(origin, "/sitemap.xml")}`)) {
    errors.push("dist/robots.txt: production crawl policy or sitemap URL mismatch");
  }
  const headers = readText(path.join(distRoot, "_headers"), "dist/_headers", errors);
  if (!headers.includes("/data/*") || !headers.includes("Content-Type: application/json")) {
    errors.push("dist/_headers: JSON response headers missing");
  }
  const redirects = readText(path.join(distRoot, "_redirects"), "dist/_redirects", errors);
  const expectedRedirects = formatCloudflareRedirects(buildLegacyRedirects(canonical.data));
  if (redirects !== expectedRedirects) errors.push("dist/_redirects: output does not match canonical slug history");
  for (const redirect of buildLegacyRedirects(canonical.data)) {
    if (fs.existsSync(routeFile(distRoot, redirect.source))) {
      errors.push(`dist legacy route must not publish HTML: ${redirect.source}`);
    }
  }

  expectDocumentCounts(docsRoot, canonical.recordCounts, errors);

  const files = listFiles(distRoot);
  for (const relativePath of files) {
    const lowered = relativePath.toLowerCase();
    if (FORBIDDEN_PREFIXES.some((prefix) => lowered.startsWith(prefix))) {
      errors.push(`forbidden published path: ${relativePath}`);
    }
    if (FORBIDDEN_EXTENSIONS.has(path.extname(lowered))) {
      errors.push(`forbidden published file type: ${relativePath}`);
    }
    if (lowered.endsWith(".json") && !allowedJsonFiles.has(relativePath)) {
      errors.push(`unexpected published JSON outside canonical contract: ${relativePath}`);
    }
  }

  return {
    errors,
    summary: {
      ...canonical.recordCounts,
      routes: expectedRoutes.length,
      files: files.length
    }
  };
}
