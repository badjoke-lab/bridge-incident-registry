import fs from "node:fs";

const MIN_REPLAY_BYTES = 65_536;
const FETCH_TIMEOUT_MS = 12_000;
const MAX_REPLAYS_PER_URL = 12;
const OUTPUT_DIR = "artifacts";

const candidates = [
  {
    label: "Holograph incident and containment statement",
    url: "https://x.com/holographxyz/status/1801332482262110301",
    published_at: "2024-06-13",
    evidence_ids: ["bir_src_000239"]
  },
  {
    label: "SlowMist Transit Swap exploit analysis",
    url: "https://slowmist.medium.com/cross-chain-dex-aggregator-transit-swap-hacked-analysis-74ba39c22020",
    published_at: "2022-10-02",
    evidence_ids: ["bir_src_000248"]
  },
  {
    label: "Taiko incident and containment statement",
    url: "https://x.com/taikoxyz/status/2068858818352865626",
    published_at: "2026-06-22",
    evidence_ids: ["bir_src_000256", "bir_src_000257", "bir_src_000273"]
  },
  {
    label: "Taiko bridge reopening and make-whole statement",
    url: "https://x.com/taikoxyz/status/2072533556224548918",
    published_at: "2026-07-02",
    evidence_ids: ["bir_src_000258", "bir_src_000259", "bir_src_000283"]
  },
  {
    label: "Syndicate Commons Bridge compromise statement",
    url: "https://twitter.com/syndicateio/status/2049352309784904187",
    published_at: "2026-04-29",
    evidence_ids: ["bir_src_000261", "bir_src_000262", "bir_src_000266", "bir_src_000267"]
  },
  {
    label: "SOCKET fund recovery update",
    url: "https://x.com/SocketDotTech/status/1749734794320363802",
    published_at: "2024-01-23",
    evidence_ids: ["bir_src_000275"]
  },
  {
    label: "Holograph incident postmortem announcement",
    url: "https://x.com/holographxyz/status/1807946057235718349",
    published_at: "2024-07-02",
    evidence_ids: ["bir_src_000277"]
  },
  {
    label: "Transit Finance recovery update",
    url: "https://x.com/TransitFinance/status/1576463550557483008",
    published_at: "2022-10-02",
    evidence_ids: ["bir_src_000278"]
  },
  {
    label: "Unizen reimbursement announcement",
    url: "https://x.com/unizen_io/status/1767075963475505522",
    published_at: "2024-03-11",
    evidence_ids: ["bir_src_000281"]
  },
  {
    label: "Everclear wind-down announcement",
    url: "https://twitter.com/EverclearOrg/status/2057488000003477886",
    published_at: "2026-05-21",
    evidence_ids: ["bir_src_000284"]
  }
];

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
  if (!response.ok) {
    throw new Error(`CDX ${response.status}`);
  }
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
      const captures = await discover(alias);
      discovery.push(...captures);
    } catch (error) {
      discoveryErrors.push({
        alias,
        error: error instanceof Error ? error.message : String(error)
      });
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
    "# Phase 3 Archive Capture Batch 13 review",
    "",
    `Generated: ${report.generated_at}`,
    "",
    "## Boundary",
    "",
    `- exact canonical source URLs: ${report.candidates}`,
    `- replay minimum: ${report.minimum_replay_bytes.toLocaleString()} bytes`,
    `- timeout: ${report.fetch_timeout_ms / 1000} seconds`,
    "- wildcard and guessed captures: prohibited",
    "- snapshot date must be on or after the canonical source publication date",
    "- x.com/twitter.com aliases are accepted only for the same account and status ID",
    "",
    "## Approved mappings",
    ""
  ];

  const approved = report.results.filter((item) => item.approved);
  if (approved.length === 0) lines.push("No candidate passed the full boundary.", "");
  for (const item of approved) {
    lines.push(
      `### ${item.label}`,
      "",
      "```text",
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
    lines.push(
      `- ${item.label}`,
      `  - canonical: ${item.url}`,
      `  - evidence: ${item.evidence_ids.join(", ")}`,
      `  - captures discovered: ${item.captures_discovered}`,
      `  - temporally eligible: ${item.temporally_eligible_captures}`,
      `  - replay attempts: ${item.attempts.length}`,
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

const results = [];
for (const candidate of candidates) {
  console.log(`Reviewing ${candidate.label}: ${candidate.url}`);
  results.push(await reviewCandidate(candidate));
}

const report = {
  generated_at: new Date().toISOString(),
  candidates: candidates.length,
  minimum_replay_bytes: MIN_REPLAY_BYTES,
  fetch_timeout_ms: FETCH_TIMEOUT_MS,
  approved_unique_urls: results.filter((item) => item.approved).length,
  approved_evidence_records: results
    .filter((item) => item.approved)
    .reduce((sum, item) => sum + item.evidence_ids.length, 0),
  results
};

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.writeFileSync(`${OUTPUT_DIR}/archive-capture-batch13-review.json`, `${JSON.stringify(report, null, 2)}\n`);
fs.writeFileSync(`${OUTPUT_DIR}/archive-capture-batch13-review.md`, markdownReport(report));

console.log(JSON.stringify({
  approved_unique_urls: report.approved_unique_urls,
  approved_evidence_records: report.approved_evidence_records,
  results: report.results.map((item) => ({
    label: item.label,
    url: item.url,
    decision: item.decision,
    archive_url: item.approved?.archive_url ?? null,
    replay_bytes: item.approved?.bytes ?? null
  }))
}, null, 2));
