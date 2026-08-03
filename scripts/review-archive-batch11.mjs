import process from "node:process";

const MIN_REPLAY_BYTES = 65_536;
const REQUEST_TIMEOUT_MS = 12_000;
const CDX_ATTEMPTS = 3;
const REPLAY_ATTEMPTS = 2;
const MAX_CAPTURES_PER_CANDIDATE = 16;
const WORKERS = 3;

const candidates = [
  {
    key: "multichain-cessation",
    title: "Multichain cessation of operations",
    url: "https://twitter.com/MultichainOrg/status/1679768407628185600",
    evidence_ids: ["bir_src_000029"],
    terminal: true
  },
  {
    key: "everclear-wind-down",
    title: "Everclear wind-down announcement",
    url: "https://twitter.com/EverclearOrg/status/2057488000003477886",
    evidence_ids: ["bir_src_000187", "bir_src_000284"],
    terminal: true
  },
  {
    key: "syndicate-compromise",
    title: "Syndicate Commons Bridge compromise statement",
    url: "https://twitter.com/syndicateio/status/2049352309784904187",
    evidence_ids: ["bir_src_000193"],
    terminal: true
  },
  {
    key: "syndicate-wind-down",
    title: "Syndicate Labs wind-down and reimbursement thread",
    url: "https://x.com/syndicateio/status/2057291537860706672",
    evidence_ids: ["bir_src_000194"],
    terminal: true
  },
  {
    key: "holograph-exploit",
    title: "Holograph Operator exploit statement",
    url: "https://x.com/holographxyz/status/1801332482262110301",
    evidence_ids: ["bir_src_000112", "bir_src_000239"],
    terminal: true
  },
  {
    key: "holograph-postmortem",
    title: "Holograph incident postmortem announcement",
    url: "https://x.com/holographxyz/status/1807946057235718349",
    evidence_ids: ["bir_src_000277"],
    terminal: true
  },
  {
    key: "wormhole-exploit",
    title: "Wormhole exploit acknowledgement",
    url: "https://x.com/wormhole/status/1489001949881978883",
    evidence_ids: ["bir_src_000063"],
    terminal: false
  },
  {
    key: "wormhole-restoration",
    title: "Wormhole restoration of funds and service",
    url: "https://x.com/wormhole/status/1489232008521859079",
    evidence_ids: ["bir_src_000064", "bir_src_000202"],
    terminal: false
  },
  {
    key: "taiko-incident",
    title: "Taiko incident and containment statement",
    url: "https://x.com/taikoxyz/status/2068858818352865626",
    evidence_ids: ["bir_src_000182", "bir_src_000273"],
    terminal: false
  },
  {
    key: "taiko-reopening",
    title: "Taiko bridge reopening and make-whole statement",
    url: "https://x.com/taikoxyz/status/2072533556224548918",
    evidence_ids: ["bir_src_000183", "bir_src_000283"],
    terminal: false
  }
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function aliasesFor(sourceUrl) {
  const parsed = new URL(sourceUrl);
  const aliases = new Set([sourceUrl]);
  if (parsed.hostname === "x.com") {
    parsed.hostname = "twitter.com";
    aliases.add(parsed.toString());
  } else if (parsed.hostname === "twitter.com") {
    parsed.hostname = "x.com";
    aliases.add(parsed.toString());
  }
  for (const value of [...aliases]) {
    const http = new URL(value);
    http.protocol = "http:";
    aliases.add(http.toString());
  }
  return [...aliases];
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(url, {
      ...options,
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "BIR-Archive-Review/1.0 (+https://bridge-incident-registry.pages.dev)",
        ...(options.headers ?? {})
      }
    });
  } finally {
    clearTimeout(timer);
  }
}

async function getCdxRows(alias) {
  const endpoint = new URL("https://web.archive.org/cdx/search/cdx");
  endpoint.searchParams.set("url", alias);
  endpoint.searchParams.set("output", "json");
  endpoint.searchParams.set("fl", "timestamp,original,statuscode,mimetype,digest");
  endpoint.searchParams.append("filter", "statuscode:200");
  endpoint.searchParams.append("filter", "mimetype:text/html");
  endpoint.searchParams.set("collapse", "digest");
  endpoint.searchParams.set("limit", "50");

  let lastError = null;
  for (let attempt = 1; attempt <= CDX_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetchWithTimeout(endpoint);
      const body = await response.text();
      if (!response.ok) throw new Error(`CDX HTTP ${response.status}: ${body.slice(0, 160)}`);
      const rows = JSON.parse(body);
      if (!Array.isArray(rows) || rows.length === 0) return [];
      const [header, ...values] = rows;
      return values.map((row) => Object.fromEntries(header.map((name, index) => [name, row[index]])));
    } catch (error) {
      lastError = error;
      if (attempt < CDX_ATTEMPTS) await sleep(attempt * 1_500);
    }
  }
  throw lastError;
}

async function readReplayBytes(response) {
  if (!response.body) return 0;
  const reader = response.body.getReader();
  let total = 0;
  try {
    while (total < MIN_REPLAY_BYTES) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
    }
  } finally {
    await reader.cancel().catch(() => {});
  }
  return total;
}

async function testCapture(capture) {
  const archiveUrl = `https://web.archive.org/web/${capture.timestamp}/${capture.original}`;
  let last = null;
  for (let attempt = 1; attempt <= REPLAY_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetchWithTimeout(archiveUrl, {
        headers: { range: `bytes=0-${MIN_REPLAY_BYTES - 1}` }
      });
      const contentType = response.headers.get("content-type") ?? "";
      const bytes = await readReplayBytes(response);
      last = {
        archive_url: archiveUrl,
        timestamp: capture.timestamp,
        captured_original: capture.original,
        status: response.status,
        content_type: contentType,
        replay_bytes: bytes,
        accepted: response.status === 200 && contentType.toLowerCase().includes("text/html") && bytes >= MIN_REPLAY_BYTES
      };
      if (last.accepted) return last;
    } catch (error) {
      last = {
        archive_url: archiveUrl,
        timestamp: capture.timestamp,
        captured_original: capture.original,
        error: error instanceof Error ? error.message : String(error),
        accepted: false
      };
    }
    if (attempt < REPLAY_ATTEMPTS) await sleep(1_000);
  }
  return last;
}

async function reviewCandidate(candidate) {
  const aliases = aliasesFor(candidate.url);
  const capturesByKey = new Map();
  const cdx_errors = [];

  for (const alias of aliases) {
    try {
      const rows = await getCdxRows(alias);
      for (const row of rows) {
        const key = `${row.timestamp}|${row.original}`;
        if (!capturesByKey.has(key)) capturesByKey.set(key, row);
      }
    } catch (error) {
      cdx_errors.push({ alias, error: error instanceof Error ? error.message : String(error) });
    }
  }

  const captures = [...capturesByKey.values()]
    .sort((a, b) => String(b.timestamp).localeCompare(String(a.timestamp)))
    .slice(0, MAX_CAPTURES_PER_CANDIDATE);

  const attempts = [];
  for (const capture of captures) {
    const result = await testCapture(capture);
    attempts.push(result);
    if (result?.accepted) {
      return {
        ...candidate,
        aliases,
        cdx_capture_count: capturesByKey.size,
        cdx_errors,
        accepted: result,
        replay_attempts: attempts
      };
    }
  }

  return {
    ...candidate,
    aliases,
    cdx_capture_count: capturesByKey.size,
    cdx_errors,
    accepted: null,
    replay_attempts: attempts
  };
}

const results = new Array(candidates.length);
let nextIndex = 0;

async function worker() {
  while (true) {
    const index = nextIndex;
    nextIndex += 1;
    if (index >= candidates.length) return;
    const candidate = candidates[index];
    console.log(`Reviewing ${index + 1}/${candidates.length}: ${candidate.title}`);
    results[index] = await reviewCandidate(candidate);
    const accepted = results[index].accepted;
    console.log(accepted
      ? `ACCEPT ${candidate.key} ${accepted.archive_url} ${accepted.replay_bytes} bytes`
      : `DEFER ${candidate.key} captures=${results[index].cdx_capture_count}`);
  }
}

await Promise.all(Array.from({ length: WORKERS }, () => worker()));

const approved = results.filter((result) => result.accepted);
const summary = {
  generated_at: new Date().toISOString(),
  acceptance_boundary: {
    status: 200,
    content_type_contains: "text/html",
    minimum_replay_bytes: MIN_REPLAY_BYTES,
    concrete_timestamp_required: true
  },
  selected_unique_urls: candidates.length,
  approved_unique_urls: approved.length,
  affected_evidence_records: approved.reduce((sum, item) => sum + item.evidence_ids.length, 0),
  terminal_approved_unique_urls: approved.filter((item) => item.terminal).length,
  results
};

console.log("BATCH11_REVIEW_JSON_START");
console.log(JSON.stringify(summary, null, 2));
console.log("BATCH11_REVIEW_JSON_END");

if (results.length !== candidates.length) {
  console.error("Batch 11 review did not produce one result per candidate.");
  process.exit(1);
}
