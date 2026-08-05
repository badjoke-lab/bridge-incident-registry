import fs from "node:fs";
import path from "node:path";

const MIN_REPLAY_BYTES = 65_536;
const FETCH_TIMEOUT_MS = 12_000;
const MAX_REPLAYS_PER_URL = 12;
const OUTPUT_DIR = "artifacts";
const TERMINAL_TARGET = 5;
const RISKY_TARGET = 5;

const terminalStatuses = new Set(["dead", "deprecated", "migrated"]);
const riskyHosts = [
  "x.com",
  "twitter.com",
  "medium.com",
  "mirror.xyz",
  "substack.com",
  "docs.google.com",
  "notion.site"
];

const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const bridges = readJson("data/bridges.json");
const evidence = readJson("data/evidence.json");
const bridgesById = new Map(bridges.map((item) => [item.id, item]));

function hostOf(rawUrl) {
  try {
    return new URL(rawUrl).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "invalid-url";
  }
}

function isRiskyHost(host) {
  return riskyHosts.some((base) => host === base || host.endsWith(`.${base}`));
}

function hasArchive(source) {
  return typeof source.archived_url === "string" && source.archived_url.trim().length > 0;
}

function canonicalUrlKey(rawUrl) {
  const url = new URL(rawUrl);
  url.hash = "";
  url.hostname = url.hostname.replace(/^www\./, "").toLowerCase();
  if (url.hostname === "x.com") url.hostname = "twitter.com";
  if (url.pathname.length > 1) url.pathname = url.pathname.replace(/\/+$/, "");
  return url.toString();
}

function reviewedEvidenceIds() {
  const auditDir = "docs/audits";
  const ids = new Set();
  for (const name of fs.readdirSync(auditDir)) {
    if (!/^phase3-archive-capture-batch\d+-review.*\.md$/.test(name)) continue;
    const text = fs.readFileSync(path.join(auditDir, name), "utf8");
    for (const match of text.matchAll(/bir_src_\d{6}/g)) ids.add(match[0]);
  }
  return ids;
}

function sortCandidates(items) {
  return [...items].sort((a, b) => {
    const date = a.published_at.localeCompare(b.published_at);
    if (date !== 0) return date;
    return a.evidence_ids[0].localeCompare(b.evidence_ids[0]);
  });
}

function buildCandidates() {
  const reviewedIds = reviewedEvidenceIds();
  const grouped = new Map();

  for (const source of evidence) {
    if (hasArchive(source)) continue;
    const bridge = bridgesById.get(source.bridge_id);
    if (!bridge) continue;

    const terminal = terminalStatuses.has(bridge.status);
    const risky = isRiskyHost(hostOf(source.url));
    if (!terminal && !risky) continue;

    let key;
    try {
      key = canonicalUrlKey(source.url);
    } catch {
      continue;
    }

    const group = grouped.get(key) ?? {
      key,
      records: [],
      terminal: false,
      risky: false
    };
    group.records.push(source);
    group.terminal ||= terminal;
    group.risky ||= risky;
    grouped.set(key, group);
  }

  const unreviewed = [];
  for (const group of grouped.values()) {
    if (group.records.some((record) => reviewedIds.has(record.id))) continue;
    const records = [...group.records].sort((a, b) => a.id.localeCompare(b.id));
    const publishedAt = records
      .map((record) => record.published_at)
      .filter(Boolean)
      .sort()
      .at(-1);
    if (!publishedAt) continue;

    unreviewed.push({
      label: records[0].title,
      url: records[0].url,
      published_at: publishedAt,
      evidence_ids: records.map((record) => record.id),
      bridge_ids: [...new Set(records.map((record) => record.bridge_id))],
      queue: group.terminal && group.risky ? "terminal+risky" : group.terminal ? "terminal" : "risky",
      terminal: group.terminal,
      risky: group.risky
    });
  }

  const selected = [];
  const selectedKeys = new Set();
  const add = (candidate) => {
    const key = canonicalUrlKey(candidate.url);
    if (selectedKeys.has(key)) return false;
    selected.push(candidate);
    selectedKeys.add(key);
    return true;
  };

  for (const candidate of sortCandidates(unreviewed.filter((item) => item.terminal))) {
    if (selected.filter((item) => item.terminal).length >= TERMINAL_TARGET) break;
    add(candidate);
  }
  for (const candidate of sortCandidates(unreviewed.filter((item) => item.risky))) {
    if (selected.filter((item) => item.risky && !item.terminal).length >= RISKY_TARGET) break;
    add(candidate);
  }
  for (const candidate of sortCandidates(unreviewed)) {
    if (selected.length >= TERMINAL_TARGET + RISKY_TARGET) break;
    add(candidate);
  }

  if (selected.length !== TERMINAL_TARGET + RISKY_TARGET) {
    throw new Error(`Expected 10 unreviewed candidates, selected ${selected.length}`);
  }

  return {
    reviewed_ids: reviewedIds.size,
    eligible_unique_urls: unreviewed.length,
    selected
  };
}

function timestampDate(timestamp) {
  return `${timestamp.slice(0, 4)}-${timestamp.slice(4, 6)}-${timestamp.slice(6, 8)}`;
}

function exactAliases(rawUrl) {
  const url = new URL(rawUrl);
  const urls = new Set([url.toString()]);
  if (url.hostname === "x.com") {
    const alias = new URL(url);
    alias.hostname = "twitter.com";
    urls.add(alias.toString());
  } else if (url.hostname === "twitter.com") {
    const alias = new URL(url);
    alias.hostname = "x.com";
    urls.add(alias.toString());
  }
  return [...urls];
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, {
      ...options,
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "BIR archive review/1.0",
        ...(options.headers ?? {})
      }
    });
  } finally {
    clearTimeout(timer);
  }
}

async function discover(aliasUrl) {
  const endpoint = new URL("https://web.archive.org/cdx/search/cdx");
  endpoint.searchParams.set("url", aliasUrl);
  endpoint.searchParams.set("matchType", "exact");
  endpoint.searchParams.set("output", "json");
  endpoint.searchParams.set("fl", "timestamp,original,statuscode,mimetype,digest");
  endpoint.searchParams.append("filter", "statuscode:200");
  endpoint.searchParams.set("collapse", "digest");

  const response = await fetchWithTimeout(endpoint);
  if (!response.ok) throw new Error(`CDX ${response.status}`);
  const rows = await response.json();
  if (!Array.isArray(rows) || rows.length < 2) return [];
  const [header, ...records] = rows;
  return records.map((row) => Object.fromEntries(header.map((key, index) => [key, row[index]])));
}

async function replay(capture) {
  const archiveUrl = `https://web.archive.org/web/${capture.timestamp}/${capture.original}`;
  try {
    const response = await fetchWithTimeout(archiveUrl);
    const contentType = response.headers.get("content-type") ?? "";
    const body = await response.arrayBuffer();
    const bytes = body.byteLength;
    return {
      archive_url: archiveUrl,
      status: response.status,
      content_type: contentType,
      bytes,
      accepted:
        response.status === 200 &&
        contentType.toLowerCase().includes("text/html") &&
        bytes >= MIN_REPLAY_BYTES,
      error: null
    };
  } catch (error) {
    return {
      archive_url: archiveUrl,
      status: null,
      content_type: null,
      bytes: 0,
      accepted: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

async function reviewCandidate(candidate) {
  const aliases = exactAliases(candidate.url);
  const discovery = [];
  const discoveryErrors = [];

  for (const alias of aliases) {
    try {
      discovery.push(...(await discover(alias)));
    } catch (error) {
      discoveryErrors.push({ alias, error: error instanceof Error ? error.message : String(error) });
    }
  }

  const unique = new Map();
  for (const capture of discovery) {
    const key = `${capture.timestamp}:${capture.original}`;
    if (!unique.has(key)) unique.set(key, capture);
  }

  const temporallyEligible = [...unique.values()]
    .filter((capture) => /^\d{14}$/.test(capture.timestamp ?? ""))
    .filter((capture) => timestampDate(capture.timestamp) >= candidate.published_at)
    .sort((a, b) => a.timestamp.localeCompare(b.timestamp));

  const attempts = [];
  let approved = null;
  for (const capture of temporallyEligible.slice(0, MAX_REPLAYS_PER_URL)) {
    const result = await replay(capture);
    attempts.push({ timestamp: capture.timestamp, original: capture.original, ...result });
    if (result.accepted) {
      approved = {
        timestamp: capture.timestamp,
        original: capture.original,
        archive_url: result.archive_url,
        status: result.status,
        content_type: result.content_type,
        bytes: result.bytes
      };
      break;
    }
  }

  return {
    ...candidate,
    aliases_checked: aliases,
    captures_discovered: unique.size,
    temporally_eligible_captures: temporallyEligible.length,
    discovery_errors: discoveryErrors,
    attempts,
    approved,
    decision: approved ? "approved_technical_and_temporal" : "deferred_no_accepted_exact_replay"
  };
}

function markdownReport(report) {
  const lines = [
    "# Phase 3 Archive Capture Batch 14 review",
    "",
    `Generated: ${report.generated_at}`,
    "",
    "## Selection boundary",
    "",
    `- prior reviewed evidence IDs excluded: ${report.selection.reviewed_ids}`,
    `- eligible previously unreviewed unique URLs: ${report.selection.eligible_unique_urls}`,
    `- selected exact canonical source URLs: ${report.results.length}`,
    `- terminal target: ${TERMINAL_TARGET}`,
    `- risky-host target: ${RISKY_TARGET}`,
    "- oldest publication date first within each queue",
    "",
    "## Replay boundary",
    "",
    `- replay minimum: ${report.minimum_replay_bytes.toLocaleString()} bytes`,
    `- timeout: ${report.fetch_timeout_ms / 1000} seconds`,
    "- wildcard and guessed captures: prohibited",
    "- snapshot date must be on or after the latest canonical publication date for the grouped URL",
    "- x.com/twitter.com aliases are accepted only for the same account and status ID",
    "",
    "## Selected scope",
    ""
  ];

  for (const item of report.results) {
    lines.push(`- ${item.label}`, `  - queue: ${item.queue}`, `  - canonical: ${item.url}`, `  - evidence: ${item.evidence_ids.join(", ")}`);
  }

  lines.push("", "## Approved mappings", "");
  const approved = report.results.filter((item) => item.approved);
  if (approved.length === 0) lines.push("No candidate passed the full boundary.", "");
  for (const item of approved) {
    lines.push(
      `### ${item.label}`,
      "",
      "```text",
      `Queue          ${item.queue}`,
      `Canonical URL  ${item.url}`,
      `Archive URL    ${item.approved.archive_url}`,
      `Replay status  ${item.approved.status}`,
      `Content-Type   ${item.approved.content_type}`,
      `Replay bytes   ${item.approved.bytes.toLocaleString()}`,
      `Evidence IDs   ${item.evidence_ids.join(", ")}`,
      "```",
      ""
    );
  }

  lines.push("## Deferred", "");
  const deferred = report.results.filter((item) => !item.approved);
  if (deferred.length === 0) lines.push("None.", "");
  for (const item of deferred) {
    const largest = Math.max(0, ...item.attempts.map((attempt) => attempt.bytes ?? 0));
    lines.push(
      `- ${item.label}`,
      `  - queue: ${item.queue}`,
      `  - canonical: ${item.url}`,
      `  - evidence: ${item.evidence_ids.join(", ")}`,
      `  - captures discovered: ${item.captures_discovered}`,
      `  - temporally eligible: ${item.temporally_eligible_captures}`,
      `  - replay attempts: ${item.attempts.length}`,
      `  - largest replay bytes: ${largest}`,
      `  - discovery errors: ${item.discovery_errors.map((entry) => `${entry.alias} (${entry.error})`).join("; ") || "none"}`
    );
  }

  lines.push(
    "",
    "## Safety",
    "",
    "This review changes no canonical data. Any approved mapping must be applied on a fresh branch in a separate canonical PR, with source URLs, claims, dates, source hierarchy, reliability, and linkages unchanged.",
    ""
  );
  return lines.join("\n");
}

const selection = buildCandidates();
const results = [];
for (const candidate of selection.selected) {
  console.log(`Reviewing ${candidate.label}: ${candidate.url}`);
  results.push(await reviewCandidate(candidate));
}

const report = {
  generated_at: new Date().toISOString(),
  selection: {
    reviewed_ids: selection.reviewed_ids,
    eligible_unique_urls: selection.eligible_unique_urls
  },
  minimum_replay_bytes: MIN_REPLAY_BYTES,
  fetch_timeout_ms: FETCH_TIMEOUT_MS,
  approved_unique_urls: results.filter((item) => item.approved).length,
  approved_evidence_records: results
    .filter((item) => item.approved)
    .reduce((sum, item) => sum + item.evidence_ids.length, 0),
  results
};

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.writeFileSync(`${OUTPUT_DIR}/archive-capture-batch14-review.json`, `${JSON.stringify(report, null, 2)}\n`);
fs.writeFileSync(`${OUTPUT_DIR}/archive-capture-batch14-review.md`, markdownReport(report));

console.log(JSON.stringify({
  selected: report.results.map((item) => ({
    label: item.label,
    queue: item.queue,
    url: item.url,
    evidence_ids: item.evidence_ids
  })),
  approved_unique_urls: report.approved_unique_urls,
  approved_evidence_records: report.approved_evidence_records,
  results: report.results.map((item) => ({
    label: item.label,
    queue: item.queue,
    url: item.url,
    decision: item.decision,
    archive_url: item.approved?.archive_url ?? null,
    replay_bytes: item.approved?.bytes ?? null
  }))
}, null, 2));
