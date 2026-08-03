import process from "node:process";

const MIN_REPLAY_BYTES = 65_536;
const FETCH_TIMEOUT_MS = 12_000;
const CONCURRENCY = 3;

const candidates = [
  {
    label: "BNB Chain Fusion retirement notice",
    url: "https://www.bnbchain.org/en/bnb-chain-fusion",
    record_ids: ["bir_src_000024"],
    queue: ["terminal"]
  },
  {
    label: "Celer cBridge DNS incident warning",
    url: "https://x.com/CelerNetwork/status/1560046913436946432",
    record_ids: ["bir_src_000076"],
    queue: ["terminal", "risky_host"]
  },
  {
    label: "Celer cBridge restoration and compensation update",
    url: "https://x.com/CelerNetwork/status/1560123830844411904",
    record_ids: ["bir_src_000271", "bir_src_000274"],
    queue: ["terminal", "risky_host"]
  },
  {
    label: "SOCKET incident acknowledgement",
    url: "https://x.com/SocketDotTech/status/1747349422730813525",
    record_ids: ["bir_src_000080"],
    queue: ["terminal", "risky_host"]
  },
  {
    label: "SOCKET route-removal and restart update",
    url: "https://x.com/SocketDotTech/status/1747363921265344812",
    record_ids: ["bir_src_000081"],
    queue: ["terminal", "risky_host"]
  },
  {
    label: "pNetwork v2 end-of-life page",
    url: "https://dapp.p.network/",
    record_ids: ["bir_src_000092"],
    queue: ["terminal"]
  },
  {
    label: "Holograph post-protocol documentation state",
    url: "https://docs.holograph.xyz/",
    record_ids: ["bir_src_000116"],
    queue: ["terminal"]
  },
  {
    label: "Syndicate Commons terminal reimbursement page",
    url: "https://commons.syndicate.io/",
    record_ids: ["bir_src_000195", "bir_src_000263"],
    queue: ["terminal"]
  },
  {
    label: "Rubic incident announcement",
    url: "https://x.com/CryptoRubic/status/1606970530032230403",
    record_ids: ["bir_src_000165", "bir_src_000272"],
    queue: ["terminal", "risky_host"]
  },
  {
    label: "Transit Finance 70 percent recovery update",
    url: "https://x.com/TransitFinance/status/1576463550557483008",
    record_ids: ["bir_src_000278"],
    queue: ["risky_host"]
  }
];

function aliasesFor(url) {
  const parsed = new URL(url);
  const aliases = [url];
  if (parsed.hostname === "x.com") {
    parsed.hostname = "twitter.com";
    aliases.push(parsed.toString());
  } else if (parsed.hostname === "twitter.com") {
    parsed.hostname = "x.com";
    aliases.push(parsed.toString());
  }
  return [...new Set(aliases)];
}

async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "BIR-Archive-Review/12 (+https://bridge-incident-registry.pages.dev)"
      }
    });
  } finally {
    clearTimeout(timer);
  }
}

async function cdxRows(exactUrl) {
  const endpoint = new URL("https://web.archive.org/cdx/search/cdx");
  endpoint.searchParams.set("url", exactUrl);
  endpoint.searchParams.set("output", "json");
  endpoint.searchParams.set("fl", "timestamp,original,statuscode,mimetype,digest");
  endpoint.searchParams.append("filter", "statuscode:200");
  endpoint.searchParams.append("filter", "mimetype:text/html");
  endpoint.searchParams.set("collapse", "digest");
  endpoint.searchParams.set("limit", "12");
  endpoint.searchParams.set("from", "2000");

  const response = await fetchWithTimeout(endpoint);
  if (!response.ok) {
    throw new Error(`CDX ${response.status}`);
  }
  const payload = await response.json();
  if (!Array.isArray(payload) || payload.length < 2) return [];
  const [header, ...rows] = payload;
  const positions = Object.fromEntries(header.map((name, index) => [name, index]));
  return rows.map((row) => ({
    timestamp: row[positions.timestamp],
    original: row[positions.original],
    statuscode: row[positions.statuscode],
    mimetype: row[positions.mimetype],
    digest: row[positions.digest]
  })).sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}

async function testReplay(capture) {
  const archiveUrl = `https://web.archive.org/web/${capture.timestamp}/${capture.original}`;
  try {
    const response = await fetchWithTimeout(archiveUrl);
    const body = Buffer.from(await response.arrayBuffer());
    const contentType = response.headers.get("content-type") ?? "";
    const accepted = response.status === 200 && contentType.toLowerCase().includes("text/html") && body.length >= MIN_REPLAY_BYTES;
    return {
      archive_url: archiveUrl,
      timestamp: capture.timestamp,
      captured_original: capture.original,
      status: response.status,
      content_type: contentType,
      bytes: body.length,
      accepted
    };
  } catch (error) {
    return {
      archive_url: archiveUrl,
      timestamp: capture.timestamp,
      captured_original: capture.original,
      status: null,
      content_type: null,
      bytes: 0,
      accepted: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

async function reviewCandidate(candidate) {
  const aliases = aliasesFor(candidate.url);
  const aliasResults = [];
  const seenCaptures = new Set();
  let approved = null;

  for (const alias of aliases) {
    let captures = [];
    let cdxError = null;
    try {
      captures = await cdxRows(alias);
    } catch (error) {
      cdxError = error instanceof Error ? error.message : String(error);
    }

    const tested = [];
    for (const capture of captures) {
      const key = `${capture.timestamp}\n${capture.original}`;
      if (seenCaptures.has(key)) continue;
      seenCaptures.add(key);
      const replay = await testReplay(capture);
      tested.push(replay);
      if (replay.accepted) {
        approved = replay;
        break;
      }
    }

    aliasResults.push({ alias, cdx_error: cdxError, capture_count: captures.length, tested });
    if (approved) break;
  }

  return {
    ...candidate,
    aliases,
    approved,
    decision: approved ? "approved" : "deferred",
    alias_results: aliasResults
  };
}

async function mapConcurrent(items, limit, worker) {
  const results = new Array(items.length);
  let next = 0;
  async function run() {
    while (true) {
      const index = next++;
      if (index >= items.length) return;
      results[index] = await worker(items[index]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
  return results;
}

const results = await mapConcurrent(candidates, CONCURRENCY, reviewCandidate);
const approved = results.filter((item) => item.decision === "approved");
const deferred = results.filter((item) => item.decision === "deferred");

const report = {
  batch: 12,
  boundary: {
    exact_cdx_only: true,
    wildcard_or_guessed_captures: false,
    accepted_status: 200,
    accepted_content_type: "text/html",
    minimum_replay_bytes: MIN_REPLAY_BYTES,
    fetch_timeout_ms: FETCH_TIMEOUT_MS
  },
  summary: {
    candidates: results.length,
    approved_unique_urls: approved.length,
    approved_records: approved.reduce((sum, item) => sum + item.record_ids.length, 0),
    deferred_unique_urls: deferred.length
  },
  results
};

console.log("BIR_ARCHIVE_BATCH12_RESULT_START");
console.log(JSON.stringify(report, null, 2));
console.log("BIR_ARCHIVE_BATCH12_RESULT_END");

if (process.env.GITHUB_STEP_SUMMARY) {
  const fs = await import("node:fs");
  const lines = [
    "# Archive Capture Batch 12 review",
    "",
    `- Candidates: ${results.length}`,
    `- Approved unique URLs: ${approved.length}`,
    `- Approved evidence records: ${report.summary.approved_records}`,
    `- Deferred unique URLs: ${deferred.length}`,
    "",
    "## Approved",
    ""
  ];
  for (const item of approved) {
    lines.push(`- ${item.url} → ${item.approved.archive_url} (${item.approved.bytes} bytes)`);
  }
  if (approved.length === 0) lines.push("- None");
  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${lines.join("\n")}\n`, "utf8");
}
