import fs from "node:fs";

const outputPath = "docs/audits/phase3-archive-capture-batch4-candidate-verification.json";
const bridges = JSON.parse(fs.readFileSync("data/bridges.json", "utf8"));
const evidence = JSON.parse(fs.readFileSync("data/evidence.json", "utf8"));
const bridgesById = new Map(bridges.map((item) => [item.id, item]));
const terminalStatuses = new Set(["dead", "deprecated", "migrated"]);
const excludedUrls = new Set([
  "https://medium.com/@QubitFin/our-compensation-plan-1-63e7c64738ed"
]);

function hostOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "invalid";
  }
}

function normalizedUrl(url) {
  try {
    return new URL(url).toString();
  } catch {
    return null;
  }
}

function isOfficialCandidate(source) {
  const host = hostOf(source.url);
  const supportedHost = host === "medium.com" || host.endsWith(".medium.com") || host === "mirror.xyz" || host.endsWith(".mirror.xyz") || host === "substack.com" || host.endsWith(".substack.com");
  const officialSignal = source.is_primary === true || source.is_official_domain === true || String(source.source_type).startsWith("official_");
  return supportedHost && officialSignal && !source.archived_url && !excludedUrls.has(source.url);
}

const grouped = new Map();
for (const source of evidence) {
  if (!isOfficialCandidate(source)) continue;
  const key = normalizedUrl(source.url);
  if (!key) continue;
  const bridge = bridgesById.get(source.bridge_id);
  const current = grouped.get(key) ?? {
    url: source.url,
    evidence_ids: [],
    bridge_ids: [],
    bridge_slugs: [],
    bridge_statuses: [],
    publishers: [],
    source_tiers: [],
    primary_records: 0,
    terminal_records: 0
  };
  current.evidence_ids.push(source.id);
  if (!current.bridge_ids.includes(source.bridge_id)) current.bridge_ids.push(source.bridge_id);
  if (bridge?.slug && !current.bridge_slugs.includes(bridge.slug)) current.bridge_slugs.push(bridge.slug);
  if (bridge?.status && !current.bridge_statuses.includes(bridge.status)) current.bridge_statuses.push(bridge.status);
  if (source.publisher && !current.publishers.includes(source.publisher)) current.publishers.push(source.publisher);
  if (source.source_tier && !current.source_tiers.includes(source.source_tier)) current.source_tiers.push(source.source_tier);
  if (source.is_primary === true) current.primary_records += 1;
  if (bridge && terminalStatuses.has(bridge.status)) current.terminal_records += 1;
  grouped.set(key, current);
}

const candidates = [...grouped.values()]
  .sort((a, b) => {
    const aTerminal = a.terminal_records > 0 ? 1 : 0;
    const bTerminal = b.terminal_records > 0 ? 1 : 0;
    if (aTerminal !== bTerminal) return bTerminal - aTerminal;
    const aTierOne = a.source_tiers.includes("tier_1") ? 1 : 0;
    const bTierOne = b.source_tiers.includes("tier_1") ? 1 : 0;
    if (aTierOne !== bTierOne) return bTierOne - aTierOne;
    if (a.primary_records !== b.primary_records) return b.primary_records - a.primary_records;
    return a.evidence_ids[0].localeCompare(b.evidence_ids[0]);
  })
  .slice(0, 10);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function request(url, attempts = 2) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(url, {
        redirect: "follow",
        signal: controller.signal,
        headers: {
          "user-agent": "BridgeIncidentRegistryArchiveVerifier/1.0 (+https://bridge-incident-registry.pages.dev)"
        }
      });
      clearTimeout(timeout);
      if (response.status === 429 || response.status >= 500) {
        lastError = new Error(`HTTP ${response.status}`);
        await sleep(1500 * attempt);
        continue;
      }
      return response;
    } catch (error) {
      clearTimeout(timeout);
      lastError = error;
      await sleep(1500 * attempt);
    }
  }
  throw lastError;
}

async function readPrefix(response, maximumBytes = 65536) {
  if (!response.body) return { bytes: 0, text: "" };
  const reader = response.body.getReader();
  const chunks = [];
  let total = 0;
  while (total < maximumBytes) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(Buffer.from(value));
    total += value.byteLength;
  }
  await reader.cancel().catch(() => {});
  const joined = Buffer.concat(chunks);
  return { bytes: joined.byteLength, text: joined.toString("utf8") };
}

async function availableSnapshot(originalUrl) {
  const response = await request(`https://archive.org/wayback/available?url=${encodeURIComponent(originalUrl)}`);
  const body = await response.json();
  const closest = body?.archived_snapshots?.closest;
  if (!closest?.available || String(closest.status) !== "200" || !closest.url) return null;
  return {
    archived_url: closest.url.replace(/^http:/, "https:"),
    timestamp: closest.timestamp ?? null,
    discovery_method: "availability_api"
  };
}

async function cdxSnapshots(originalUrl) {
  const params = new URLSearchParams({
    url: originalUrl,
    output: "json",
    fl: "timestamp,original,statuscode",
    limit: "-5"
  });
  params.append("filter", "statuscode:200");
  const response = await request(`https://web.archive.org/cdx/search/cdx?${params.toString()}`, 1);
  if (!response.ok) return [];
  const parsed = await response.json();
  if (!Array.isArray(parsed) || parsed.length < 2) return [];
  return parsed.slice(1).reverse().map(([timestamp]) => ({
    archived_url: `https://web.archive.org/web/${timestamp}/${originalUrl}`,
    timestamp,
    discovery_method: "cdx_fallback"
  }));
}

async function replay(snapshot) {
  const response = await request(snapshot.archived_url, 2);
  const prefix = await readPrefix(response);
  const contentType = response.headers.get("content-type") ?? "";
  const lower = prefix.text.toLowerCase();
  const valid = response.status === 200
    && contentType.toLowerCase().includes("text/html")
    && prefix.bytes >= 1000
    && !lower.includes("wayback machine has not archived that url")
    && !lower.includes("this url has been excluded from the wayback machine");
  return {
    ...snapshot,
    status: response.status,
    final_url: response.url,
    content_type: contentType,
    prefix_bytes: prefix.bytes,
    valid
  };
}

async function verifyCandidate(candidate) {
  const discoveries = [];
  const errors = [];
  try {
    const closest = await availableSnapshot(candidate.url);
    if (closest) discoveries.push(closest);
  } catch (error) {
    errors.push(`availability: ${String(error)}`);
  }
  if (discoveries.length === 0) {
    try {
      discoveries.push(...await cdxSnapshots(candidate.url));
    } catch (error) {
      errors.push(`cdx: ${String(error)}`);
    }
  }
  const replay_attempts = [];
  for (const snapshot of discoveries.slice(0, 5)) {
    try {
      const result = await replay(snapshot);
      replay_attempts.push(result);
      if (result.valid) {
        return {
          ...candidate,
          result: "verified",
          archived_url: result.archived_url,
          timestamp: result.timestamp,
          discovery_method: result.discovery_method,
          replay: result
        };
      }
    } catch (error) {
      replay_attempts.push({ ...snapshot, valid: false, error: String(error) });
    }
  }
  return {
    ...candidate,
    result: discoveries.length === 0 ? "no_capture_discovered" : "no_verified_replay",
    errors,
    replay_attempts
  };
}

const results = [];
for (let index = 0; index < candidates.length; index += 2) {
  results.push(...await Promise.all(candidates.slice(index, index + 2).map(verifyCandidate)));
  await sleep(1000);
}

const verified = results.filter((item) => item.result === "verified");
const report = {
  generated_at: new Date().toISOString(),
  policy: {
    selection: "first ten unique unarchived first-party or official Medium/Mirror/Substack URLs, terminal-first, Tier-1-first",
    exclusion: "known unavailable Qubit compensation-plan URL",
    discovery: "Wayback availability API with bounded CDX fallback",
    acceptance: "exact snapshot replay returns HTTP 200 HTML with a non-trivial body",
    canonical_limit: "review only; no canonical file is modified by this verifier"
  },
  selected_candidate_count: candidates.length,
  verified_url_count: verified.length,
  verified_evidence_record_count: verified.reduce((sum, item) => sum + item.evidence_ids.length, 0),
  candidates: results
};

fs.mkdirSync("docs/audits", { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({
  outputPath,
  selected_candidate_count: report.selected_candidate_count,
  verified_url_count: report.verified_url_count,
  verified_evidence_record_count: report.verified_evidence_record_count
}, null, 2));
