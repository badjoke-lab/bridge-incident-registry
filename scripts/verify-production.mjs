import process from "node:process";
import { loadCanonicalData } from "./lib/canonical-data.mjs";
import { buildLegacyRedirects } from "./lib/legacy-redirects.mjs";

const canonical = loadCanonicalData(process.cwd(), process.env);
const origin = (process.env.PUBLIC_SITE_ORIGIN ?? canonical.config.canonical_origin).replace(/\/$/, "");
const timeoutMs = Number(process.env.BIR_PRODUCTION_TIMEOUT_MS ?? 20000);
const userAgent = process.env.BIR_PRODUCTION_USER_AGENT
  ?? "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";
const errors = [];
const observations = [];

function absolute(route) {
  return new URL(route.replace(/^\//, ""), `${origin}/`).toString();
}

function record(route, response, extra = {}) {
  observations.push({
    route,
    status: response.status,
    content_type: response.headers.get("content-type"),
    cache_control: response.headers.get("cache-control"),
    cf_cache_status: response.headers.get("cf-cache-status"),
    etag: response.headers.get("etag"),
    location: response.headers.get("location"),
    ...extra
  });
}

async function request(route, options = {}) {
  const response = await fetch(absolute(route), {
    redirect: options.redirect ?? "follow",
    headers: {
      "user-agent": userAgent,
      accept: options.accept ?? "*/*",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache"
    },
    signal: AbortSignal.timeout(timeoutMs)
  });
  return response;
}

async function fetchText(route, options = {}) {
  try {
    const response = await request(route, options);
    const text = await response.text();
    record(route, response, { bytes: Buffer.byteLength(text) });
    return { response, text };
  } catch (error) {
    errors.push(`${route}: request failed: ${error.message}`);
    return null;
  }
}

async function fetchJson(route) {
  const result = await fetchText(route, { accept: "application/json" });
  if (!result) return null;
  if (result.response.status !== 200) {
    errors.push(`${route}: expected HTTP 200, received ${result.response.status}`);
    return null;
  }
  const contentType = result.response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    errors.push(`${route}: expected application/json, received ${contentType || "missing"}`);
  }
  try {
    return JSON.parse(result.text);
  } catch (error) {
    errors.push(`${route}: invalid JSON: ${error.message}`);
    return null;
  }
}

function extractCanonical(html) {
  return html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)?.[1] ?? null;
}

function parseJsonLd(html, route) {
  const entries = [];
  const pattern = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  for (const match of html.matchAll(pattern)) {
    try {
      entries.push(JSON.parse(match[1].trim()));
    } catch (error) {
      errors.push(`${route}: invalid JSON-LD: ${error.message}`);
    }
  }
  if (entries.length === 0) errors.push(`${route}: missing JSON-LD`);
  return entries;
}

async function verifyHtml(route, identifier = null) {
  const result = await fetchText(route, { accept: "text/html" });
  if (!result) return;
  const { response, text } = result;
  if (response.status !== 200) errors.push(`${route}: expected HTTP 200, received ${response.status}`);
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("text/html")) errors.push(`${route}: expected text/html, received ${contentType || "missing"}`);
  const expectedUrl = absolute(route);
  const canonicalUrl = extractCanonical(text);
  if (canonicalUrl !== expectedUrl) errors.push(`${route}: canonical mismatch; expected ${expectedUrl}, received ${canonicalUrl ?? "missing"}`);
  if (!text.includes('name="robots" content="index, follow"')) errors.push(`${route}: production robots metadata mismatch`);
  if (!text.includes(`${origin}/data/manifest.json`) || !text.includes(`${origin}/version.json`)) {
    errors.push(`${route}: canonical data discovery links missing`);
  }
  const jsonLd = parseJsonLd(text, route);
  if (!jsonLd.some((entry) => entry?.url === expectedUrl)) errors.push(`${route}: JSON-LD canonical URL missing`);
  if (identifier && !jsonLd.some((entry) => entry?.identifier === identifier && entry?.url === expectedUrl)) {
    errors.push(`${route}: JSON-LD identifier mismatch for ${identifier}`);
  }
  const hasCacheSignal = ["cache-control", "etag", "last-modified", "cf-cache-status"].some((name) => response.headers.has(name));
  if (!hasCacheSignal) errors.push(`${route}: no cache observation header present`);
}

function compareIds(label, actual, expected) {
  if (!Array.isArray(actual)) {
    errors.push(`${label}: expected an array`);
    return;
  }
  const actualIds = actual.map((record) => record?.id);
  const expectedIds = expected.map((record) => record.id);
  if (JSON.stringify(actualIds) !== JSON.stringify(expectedIds)) errors.push(`${label}: ID set/order mismatch`);
}

const staticRoutes = ["/", "/bridges/", "/incidents/", "/methodology/", "/about/"];
for (const route of staticRoutes) await verifyHtml(route);
for (const bridge of canonical.data.bridges) await verifyHtml(`/bridge/${bridge.slug}/`, bridge.id);
for (const incident of canonical.data.incidents) await verifyHtml(`/incident/${incident.slug}/`, incident.id);

const version = await fetchJson("/version.json");
const manifest = await fetchJson("/data/manifest.json");
const publicData = {};
for (const key of ["bridges", "incidents", "events", "evidence"]) {
  publicData[key] = await fetchJson(`/data/${key}.json`);
}

if (version) {
  if (JSON.stringify(version.record_counts) !== JSON.stringify(canonical.recordCounts)) errors.push("version.json: record_counts mismatch");
  if (version.canonical_only !== true) errors.push("version.json: canonical_only must be true");
  if (version.canonical_origin !== origin) errors.push("version.json: canonical_origin mismatch");
}
if (manifest) {
  if (JSON.stringify(manifest.record_counts) !== JSON.stringify(canonical.recordCounts)) errors.push("manifest: record_counts mismatch");
  if (manifest.canonical_only !== true || manifest.data_safety?.canonical_only !== true) errors.push("manifest: canonical-only markers missing");
}
for (const key of ["bridges", "incidents", "events", "evidence"]) {
  compareIds(`/data/${key}.json`, publicData[key], canonical.data[key]);
}

const sitemapResult = await fetchText("/sitemap.xml", { accept: "application/xml,text/xml" });
if (sitemapResult) {
  if (sitemapResult.response.status !== 200) errors.push(`/sitemap.xml: expected HTTP 200, received ${sitemapResult.response.status}`);
  const expectedRoutes = [
    ...staticRoutes,
    ...canonical.data.bridges.map((record) => `/bridge/${record.slug}/`),
    ...canonical.data.incidents.map((record) => `/incident/${record.slug}/`)
  ];
  const expectedUrls = expectedRoutes.map(absolute).sort();
  const actualUrls = [...sitemapResult.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).sort();
  if (JSON.stringify(actualUrls) !== JSON.stringify(expectedUrls)) errors.push(`/sitemap.xml: URL set mismatch; expected ${expectedUrls.length}, received ${actualUrls.length}`);
}

const robotsResult = await fetchText("/robots.txt", { accept: "text/plain" });
if (robotsResult) {
  if (robotsResult.response.status !== 200) errors.push(`/robots.txt: expected HTTP 200, received ${robotsResult.response.status}`);
  if (!robotsResult.text.includes("Allow: /") || !robotsResult.text.includes(`Sitemap: ${absolute("/sitemap.xml")}`)) {
    errors.push("/robots.txt: crawl policy or sitemap URL mismatch");
  }
}

for (const redirect of buildLegacyRedirects(canonical.data)) {
  try {
    const response = await request(redirect.source, { redirect: "manual", accept: "text/html" });
    record(redirect.source, response, { expected_location: redirect.target });
    if (response.status !== 301) errors.push(`${redirect.source}: expected HTTP 301, received ${response.status}`);
    const location = response.headers.get("location");
    const expectedLocation = absolute(redirect.target);
    if (location !== expectedLocation && location !== redirect.target) {
      errors.push(`${redirect.source}: expected redirect to ${redirect.target}, received ${location ?? "missing"}`);
    }
  } catch (error) {
    errors.push(`${redirect.source}: redirect request failed: ${error.message}`);
  }
}

if (errors.length > 0) {
  console.error("Production verification failed:");
  for (const error of errors) console.error(`- ${error}`);
  console.error(JSON.stringify({ origin, record_counts: canonical.recordCounts, observations }, null, 2));
  process.exit(1);
}

console.log("Production verification passed.");
console.log(JSON.stringify({
  origin,
  record_counts: canonical.recordCounts,
  html_routes: staticRoutes.length + canonical.data.bridges.length + canonical.data.incidents.length,
  redirects: buildLegacyRedirects(canonical.data).length,
  observations
}, null, 2));
