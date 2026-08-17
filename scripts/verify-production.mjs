import process from "node:process";
import { loadCanonicalData } from "./lib/canonical-data.mjs";
import { canonicalJsonEqual, firstRecordMismatch } from "./lib/canonical-equality.mjs";
import { buildLegacyRedirects } from "./lib/legacy-redirects.mjs";
import { buildPublicRecords } from "./lib/public-records.mjs";

const canonical = loadCanonicalData(process.cwd(), process.env);
const expectedPublic = buildPublicRecords({
  ...canonical,
  generatedAt: canonical.latestVerifiedAt ?? "1970-01-01T00:00:00.000Z"
});
const origin = (process.env.PUBLIC_SITE_ORIGIN ?? canonical.config.canonical_origin).replace(/\/$/, "");
const timeoutMs = Number(process.env.BIR_PRODUCTION_TIMEOUT_MS ?? 20000);
const publicationAttempts = Number(process.env.BIR_PUBLICATION_ATTEMPTS ?? 20);
const publicationDelayMs = Number(process.env.BIR_PUBLICATION_DELAY_MS ?? 15000);
const userAgent = process.env.BIR_PRODUCTION_USER_AGENT
  ?? "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";
const errors = [];
const observations = [];
const canonicalKeys = ["bridges", "incidents", "events", "evidence"];

function absolute(route) {
  return new URL(route.replace(/^\//, ""), `${origin}/`).toString();
}

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
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
  return fetch(absolute(route), {
    redirect: options.redirect ?? "follow",
    headers: {
      "user-agent": userAgent,
      accept: options.accept ?? "*/*",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache"
    },
    signal: AbortSignal.timeout(timeoutMs)
  });
}

function countsMatch(actual) {
  return canonicalJsonEqual(actual, canonical.recordCounts);
}

async function publicationContentState(attempt) {
  const mismatches = [];
  const statuses = {};

  for (const key of canonicalKeys) {
    const route = `/data/${key}.json`;
    try {
      const response = await request(route, { accept: "application/json" });
      statuses[key] = response.status;
      const text = await response.text();
      if (response.status !== 200) {
        mismatches.push(`${key}: HTTP ${response.status}`);
        continue;
      }
      let actual = null;
      try {
        actual = JSON.parse(text);
      } catch (error) {
        mismatches.push(`${key}: invalid JSON: ${error.message}`);
        continue;
      }
      if (!canonicalJsonEqual(actual, expectedPublic[key])) {
        const mismatch = firstRecordMismatch(actual, expectedPublic[key]);
        const location = mismatch?.id ?? (mismatch?.index === null ? "dataset" : `index ${mismatch?.index}`);
        mismatches.push(`${key}: public content mismatch at ${location}; ${mismatch?.reason ?? "unknown difference"}`);
      }
    } catch (error) {
      statuses[key] = null;
      mismatches.push(`${key}: request failed: ${error.message}`);
    }
  }

  observations.push({
    route: "/data/{bridges,incidents,events,evidence}.json",
    phase: "publication_content_wait",
    attempt,
    content_match: mismatches.length === 0,
    dataset_statuses: statuses,
    content_mismatches: mismatches
  });

  return { matches: mismatches.length === 0, mismatches };
}

async function waitForCanonicalPublication() {
  let latestCounts = null;
  let latestGeneratedAt = null;
  let latestStatus = null;
  let latestError = null;

  for (let attempt = 1; attempt <= publicationAttempts; attempt += 1) {
    try {
      const response = await request("/version.json", { accept: "application/json" });
      latestStatus = response.status;
      const text = await response.text();
      let version = null;
      try {
        version = JSON.parse(text);
      } catch (error) {
        latestError = `invalid version JSON: ${error.message}`;
      }
      latestCounts = version?.record_counts ?? null;
      latestGeneratedAt = version?.generated_at ?? null;
      record("/version.json", response, {
        phase: "publication_wait",
        attempt,
        generated_at: latestGeneratedAt,
        observed_counts: latestCounts
      });

      if (response.status === 200 && version?.canonical_only === true && countsMatch(latestCounts)) {
        const contentState = await publicationContentState(attempt);
        if (contentState.matches) {
          console.log(`Canonical production content available on attempt ${attempt}.`);
          return true;
        }
        latestError = contentState.mismatches.join("; ");
      } else {
        latestError = `expected ${JSON.stringify(canonical.recordCounts)}, observed ${JSON.stringify(latestCounts)}`;
      }
    } catch (error) {
      latestError = error.message;
      observations.push({
        route: "/version.json",
        phase: "publication_wait",
        attempt,
        request_error: error.message
      });
    }

    if (attempt < publicationAttempts) {
      console.log(`Production has not converged on attempt ${attempt}/${publicationAttempts}; retrying in ${publicationDelayMs}ms.`);
      await sleep(publicationDelayMs);
    }
  }

  errors.push(
    `production did not converge after ${publicationAttempts} attempts: status ${latestStatus ?? "unknown"}; `
    + `generated_at ${latestGeneratedAt ?? "unknown"}; ${latestError ?? "unknown mismatch"}`
  );
  return false;
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

function comparePublicRecords(label, actual, expected) {
  if (!Array.isArray(actual)) {
    errors.push(`${label}: expected an array`);
    return;
  }
  if (!canonicalJsonEqual(actual, expected)) {
    const mismatch = firstRecordMismatch(actual, expected);
    const location = mismatch?.id ?? (mismatch?.index === null ? "dataset" : `index ${mismatch?.index}`);
    errors.push(`${label}: public content mismatch at ${location}; ${mismatch?.reason ?? "unknown difference"}`);
  }
}

const publicationReady = await waitForCanonicalPublication();
if (!publicationReady) {
  console.error("Production verification failed before route checks:");
  for (const error of errors) console.error(`- ${error}`);
  console.error(JSON.stringify({ origin, record_counts: canonical.recordCounts, observations }, null, 2));
  process.exit(1);
}

const staticRoutes = ["/", "/bridges/", "/incidents/", "/compare/", "/stats/", "/methodology/", "/about/", "/support/"];
for (const route of staticRoutes) await verifyHtml(route);
for (const bridge of canonical.data.bridges) await verifyHtml(`/bridge/${bridge.slug}/`, bridge.id);
for (const incident of canonical.data.incidents) await verifyHtml(`/incident/${incident.slug}/`, incident.id);

const version = await fetchJson("/version.json");
const manifest = await fetchJson("/data/manifest.json");
const publicData = {};
for (const key of canonicalKeys) {
  publicData[key] = await fetchJson(`/data/${key}.json`);
}

if (version) {
  if (!countsMatch(version.record_counts)) errors.push("version.json: record_counts mismatch");
  if (version.canonical_only !== true) errors.push("version.json: canonical_only must be true");
  if (version.canonical_origin !== origin) errors.push("version.json: canonical_origin mismatch");
}
if (manifest) {
  if (!countsMatch(manifest.record_counts)) errors.push("manifest: record_counts mismatch");
  if (manifest.canonical_only !== true || manifest.data_safety?.canonical_only !== true) errors.push("manifest: canonical-only markers missing");
}
for (const key of canonicalKeys) {
  comparePublicRecords(`/data/${key}.json`, publicData[key], expectedPublic[key]);
}

const publicAssets = await fetchJson("/data/reference/assets.json");
if (publicAssets && !canonicalJsonEqual(publicAssets, expectedPublic.references.assets)) {
  errors.push("/data/reference/assets.json: reference data mismatch");
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
  if (!canonicalJsonEqual(actualUrls, expectedUrls)) errors.push(`/sitemap.xml: URL set mismatch; expected ${expectedUrls.length}, received ${actualUrls.length}`);
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
  canonical_public_content_match: true,
  html_routes: staticRoutes.length + canonical.data.bridges.length + canonical.data.incidents.length,
  redirects: buildLegacyRedirects(canonical.data).length,
  observations
}, null, 2));
