import process from "node:process";
import { loadCanonicalData } from "./lib/canonical-data.mjs";
import { canonicalJsonEqual } from "./lib/canonical-equality.mjs";
import { buildPublicRecords } from "./lib/public-records.mjs";

const canonical = loadCanonicalData(process.cwd(), process.env);
const origin = (process.env.PUBLIC_SITE_ORIGIN ?? canonical.config.canonical_origin).replace(/\/$/, "");
const timeoutMs = Number(process.env.BIR_PRODUCTION_TIMEOUT_MS ?? 30000);
const concurrency = Math.max(1, Number(process.env.BIR_RECORD_JSON_CONCURRENCY ?? 8));
const expectedPublic = buildPublicRecords({
  ...canonical,
  generatedAt: "1970-01-01T00:00:00.000Z"
});
const errors = [];

function absolute(route) {
  return new URL(route.replace(/^\//, ""), `${origin}/`).toString();
}

function normalizeGeneratedAt(value) {
  return { ...value, generated_at: "__GENERATED_AT__" };
}

async function fetchDossier(route, expected, label) {
  try {
    const response = await fetch(absolute(route), {
      headers: {
        accept: "application/json",
        "cache-control": "no-cache",
        "user-agent": "BIR-production-record-json-verifier/1.0"
      },
      signal: AbortSignal.timeout(timeoutMs)
    });
    const text = await response.text();
    if (response.status !== 200) {
      errors.push(`${label}: expected HTTP 200, received ${response.status}`);
      return;
    }
    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      errors.push(`${label}: expected application/json, received ${contentType || "missing"}`);
      return;
    }
    let actual;
    try {
      actual = JSON.parse(text);
    } catch (error) {
      errors.push(`${label}: invalid JSON: ${error.message}`);
      return;
    }
    if (!canonicalJsonEqual(normalizeGeneratedAt(actual), normalizeGeneratedAt(expected))) {
      errors.push(`${label}: dossier content does not match canonical-derived expected output`);
    }
  } catch (error) {
    errors.push(`${label}: request failed: ${error.message}`);
  }
}

const tasks = [
  ...expectedPublic.dossiers.bridges.map((dossier) => ({
    route: `/data/bridge/${dossier.slug}.json`,
    expected: dossier,
    label: `bridge ${dossier.record_id}`
  })),
  ...expectedPublic.dossiers.incidents.map((dossier) => ({
    route: `/data/incident/${dossier.slug}.json`,
    expected: dossier,
    label: `incident ${dossier.record_id}`
  }))
];

for (let index = 0; index < tasks.length; index += concurrency) {
  const batch = tasks.slice(index, index + concurrency);
  await Promise.all(batch.map((task) => fetchDossier(task.route, task.expected, task.label)));
}

if (errors.length > 0) {
  console.error("Production record-level JSON verification failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Production record-level JSON verification passed.");
console.log(`Verified ${expectedPublic.dossiers.bridges.length} bridge dossiers and ${expectedPublic.dossiers.incidents.length} incident dossiers against canonical-derived expected output.`);
