import process from "node:process";
import { loadCanonicalData } from "./lib/canonical-data.mjs";
import { buildLegacyRedirects } from "./lib/legacy-redirects.mjs";

const canonical = loadCanonicalData(process.cwd(), process.env);
const origin = (process.env.PUBLIC_SITE_ORIGIN ?? canonical.config.canonical_origin).replace(/\/$/, "");
const timeoutMs = Number(process.env.BIR_PRODUCTION_TIMEOUT_MS ?? 20000);
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
      "user-agent": "Bridge-Incident-Registry-Production-Verification/1.0",
      accept: options.accept ?? "*/*"
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

await Promise.all([
  verifyHtml("/"),
  verifyHtml("/bridges/"),
  verifyHtml("/incidents/"),
  verifyHtml("/methodology/"),
  verifyHtml("/about/")
]);

for (const bridge of canonical.data.bridges) await verifyHtml(`/bridge/${bridge.slug}/`, bridge.id);
for (const incident of canonical.data.incidents) await verifyHtml(`/incident/${incident.slug}/`, incident.id);

const version = await fetchJson("/version.json");
const manifest = await fetchJson("/data/manifest.json");
const publicData = {
  bridges: await fetchJson("/data/bridges.json"),
  incidents: await fetchJson("/data/incidents.json"),
  events: await fetchJson("/data/events.json"),
  evidence: await fetchJson("/data/evidence.json")
};

if (version) {
  if (JSON.stringify(version.record_counts) !== JSON.stringify(canonical.recordCounts)) errors.push("/version.json: record_counts mismatch");
  if (version.canonical_only !== true) errors.push("/version.json: canonical_only must be true");
  if (version.canonical_origin !== origin) errors.push("/version.json: canonical_origin mismatch");
}
if (manifest) {
  if (JSON.stringify(manifest.record_counts) !== JSON.stringify(canonical.recordCounts)) errors.push("/data/manifest.json: record_counts mismatch");
  if (manifest.canonical_only !== true || manifest.data_safety?.canonical_only !== true) errors.push("/data/manifest.json: canonical safety markers missing");
}
for (const key of ["bridges", "incidents", "events", "evidence"]) compareIds(`/data/${key}.json`, publicData[key], canonical.data[key]);

const robotsResult = await fetchText("/robots.txt", { accept: "text/plain" });
if (robotsResult) {
  if (robotsResult.response.status !== 200) errors.push(`/robots.txt: expected HTTP 200, received ${robotsResult.response.status}`);
  if (!robotsResult.text.includes("Allow: /") || !robotsResult.text.includes(`Sitemap: ${absolute("/sitemap.xml")}`)) {
    errors.push("/robots.txt: production crawl policy or sitemap URL mismatch");
  }
}

const sitemapResult = await fetchText("/sitemap.xml", { accept: "application/xml,text/xml" });
if (sitemapResult) {
  if (sitemapResult.response.status !== 200) errors.push(`/sitemap.xml: expected HTTP 200, received ${sitemapResult.response.status}`);
  const expectedRoutes = [
    "/", "/bridges/", "/incidents/", "/methodology/", "/about/",
    ...canonical.data.bridges.map((record) => `/bridge/${record.slug}/`),
    ...canonical.data.incidents.map((record) => `/incident/${record.slug}/`)
  ];
  const expectedUrls = expectedRoutes.map(absolute).sort();
  const actualUrls = [...sitemapResult.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).sort();
  if (JSON.stringify(actualUrls) !== JSON.stringify(expectedUrls)) {
    errors.push(`/sitemap.xml: URL set mismatch; expected ${expectedUrls.length}, received ${actualUrls.length}`);
  }
}

for (const redirect of buildLegacyRedirects(canonical.data)) {
  const result = await fetchText(redirect.source, { redirect: "manual", accept: "text/html" });
  if (!result) continue;
  if (![301, 302, 307, 308].includes(result.response.status)) {
    errors.push(`${redirect.source}: expected redirect, received HTTP ${result.response.status}`);
    continue;
  }
  const location = result.response.headers.get("location");
  const expectedLocation = absolute(redirect.target);
  let actualLocation = null;
  try { actualLocation = location ? new URL(location, `${origin}/`).toString() : null; } catch {}
  if (actualLocation !== expectedLocation) {
    errors.push(`${redirect.source}: redirect target mismatch; expected ${expectedLocation}, received ${actualLocation ?? "missing"}`);
  }
}

const report = {
  verified_at: new Date().toISOString(),
  origin,
  commit: process.env.GITHUB_SHA ?? null,
  record_counts: canonical.recordCounts,
  observations,
  errors
};

console.log(JSON.stringify(report, null, 2));
if (errors.length > 0) {
  console.error(`Production verification failed with ${errors.length} error(s).`);
  process.exit(1);
}
console.log(`Production verification passed for ${observations.length} HTTP observations at ${origin}.`);
