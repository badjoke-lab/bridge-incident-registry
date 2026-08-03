import process from "node:process";

const candidates = [
  {
    key: "multichain-abnormal-movement",
    title: "Multichain abnormal MPC asset movement",
    url: "https://twitter.com/MultichainOrg/status/1677096839731097600",
    publishedAt: "2023-07-06",
    bridgeStatus: "dead",
    evidenceIds: ["bir_src_000025"]
  },
  {
    key: "multichain-indefinite-stop",
    title: "Multichain service stopped indefinitely",
    url: "https://twitter.com/MultichainOrg/status/1677180114227056641",
    publishedAt: "2023-07-07",
    bridgeStatus: "dead",
    evidenceIds: ["bir_src_000028", "bir_src_000216"]
  },
  {
    key: "multichain-cessation",
    title: "Multichain cessation of operations",
    url: "https://twitter.com/MultichainOrg/status/1679768407628185600",
    publishedAt: "2023-07-14",
    bridgeStatus: "dead",
    evidenceIds: ["bir_src_000029"]
  },
  {
    key: "everclear-wind-down",
    title: "Everclear wind-down announcement",
    url: "https://twitter.com/EverclearOrg/status/2057488000003477886",
    publishedAt: "2026-05-21",
    bridgeStatus: "dead",
    evidenceIds: ["bir_src_000187", "bir_src_000284"]
  },
  {
    key: "syndicate-compromise",
    title: "Syndicate Commons Bridge compromise statement",
    url: "https://twitter.com/syndicateio/status/2049352309784904187",
    publishedAt: "2026-04-29",
    bridgeStatus: "dead",
    evidenceIds: [
      "bir_src_000193",
      "bir_src_000261",
      "bir_src_000262",
      "bir_src_000266",
      "bir_src_000267"
    ]
  },
  {
    key: "syndicate-wind-down",
    title: "Syndicate Labs wind-down and reimbursement thread",
    url: "https://x.com/syndicateio/status/2057291537860706672",
    publishedAt: "2026-05-21",
    bridgeStatus: "dead",
    evidenceIds: ["bir_src_000194"]
  },
  {
    key: "holograph-exploit",
    title: "Holograph exploit statement",
    url: "https://x.com/holographxyz/status/1801332482262110301",
    publishedAt: "2024-06-13",
    bridgeStatus: "inactive",
    evidenceIds: ["bir_src_000112", "bir_src_000239"]
  },
  {
    key: "holograph-postmortem",
    title: "Holograph postmortem announcement",
    url: "https://x.com/holographxyz/status/1807946057235718349",
    publishedAt: "2024-07-02",
    bridgeStatus: "inactive",
    evidenceIds: ["bir_src_000277"]
  },
  {
    key: "wormhole-exploit",
    title: "Wormhole exploit acknowledgement",
    url: "https://x.com/wormhole/status/1489001949881978883",
    publishedAt: "2022-02-02",
    bridgeStatus: "active",
    evidenceIds: ["bir_src_000063"]
  },
  {
    key: "wormhole-restoration",
    title: "Wormhole restoration of funds and service",
    url: "https://x.com/wormhole/status/1489232008521859079",
    publishedAt: "2022-02-03",
    bridgeStatus: "active",
    evidenceIds: ["bir_src_000064", "bir_src_000202"]
  }
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const requestTimeoutMs = 30_000;
const minimumReplayBytes = 65_536;
const maximumReplayBytes = 262_144;
const terminalStatuses = new Set(["dead", "deprecated", "migrated"]);

function aliases(urlString) {
  const url = new URL(urlString);
  const variants = new Set([url.toString()]);
  if (url.hostname === "x.com") {
    url.hostname = "twitter.com";
    variants.add(url.toString());
  } else if (url.hostname === "twitter.com") {
    url.hostname = "x.com";
    variants.add(url.toString());
  }
  return [...variants];
}

async function fetchWithRetry(url, options = {}, attempts = 4) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), requestTimeoutMs);
    try {
      const response = await fetch(url, {
        redirect: "follow",
        ...options,
        headers: {
          "user-agent": "BridgeIncidentRegistryArchiveReview/1.0",
          ...(options.headers ?? {})
        },
        signal: controller.signal
      });
      if ((response.status === 429 || response.status >= 500) && attempt < attempts) {
        await response.arrayBuffer().catch(() => undefined);
        await sleep(attempt * 2_000);
        continue;
      }
      return response;
    } catch (error) {
      lastError = error;
      if (attempt < attempts) {
        await sleep(attempt * 2_000);
        continue;
      }
    } finally {
      clearTimeout(timer);
    }
  }
  throw lastError ?? new Error(`request failed: ${url}`);
}

function timestampToMillis(timestamp) {
  const match = /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/.exec(timestamp);
  if (!match) return Number.POSITIVE_INFINITY;
  const [, year, month, day, hour, minute, second] = match;
  return Date.UTC(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
    Number(second)
  );
}

async function lookupCaptures(sourceUrl, publishedAt) {
  const rows = [];
  const lookupErrors = [];
  for (const variant of aliases(sourceUrl)) {
    const params = new URLSearchParams({
      url: variant,
      output: "json",
      fl: "timestamp,original,statuscode,mimetype,digest",
      filter: "statuscode:200",
      collapse: "digest"
    });
    const cdxUrl = `https://web.archive.org/cdx/search/cdx?${params.toString()}`;
    try {
      const response = await fetchWithRetry(cdxUrl, { headers: { accept: "application/json" } });
      const body = await response.text();
      if (!response.ok) {
        lookupErrors.push(`${variant}: CDX HTTP ${response.status}`);
        continue;
      }
      let parsed;
      try {
        parsed = JSON.parse(body);
      } catch {
        lookupErrors.push(`${variant}: CDX returned non-JSON`);
        continue;
      }
      if (!Array.isArray(parsed) || parsed.length < 2) continue;
      const header = parsed[0];
      for (const values of parsed.slice(1)) {
        const item = Object.fromEntries(header.map((name, index) => [name, values[index]]));
        if (item.timestamp && item.original) rows.push(item);
      }
    } catch (error) {
      lookupErrors.push(`${variant}: ${error instanceof Error ? error.message : String(error)}`);
    }
    await sleep(1_000);
  }

  const published = Date.parse(`${publishedAt}T00:00:00Z`);
  const unique = new Map();
  for (const row of rows) {
    const key = `${row.timestamp}|${row.original}`;
    if (!unique.has(key)) unique.set(key, row);
  }
  return {
    captures: [...unique.values()].sort((a, b) => {
      const aDistance = Math.abs(timestampToMillis(a.timestamp) - published);
      const bDistance = Math.abs(timestampToMillis(b.timestamp) - published);
      return aDistance - bDistance || a.timestamp.localeCompare(b.timestamp);
    }),
    lookupErrors
  };
}

async function readReplayPrefix(response) {
  if (!response.body) return 0;
  const reader = response.body.getReader();
  let bytes = 0;
  try {
    while (bytes < maximumReplayBytes) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes >= minimumReplayBytes) break;
    }
  } finally {
    await reader.cancel().catch(() => undefined);
  }
  return bytes;
}

async function verifyCandidate(candidate) {
  const { captures, lookupErrors } = await lookupCaptures(candidate.url, candidate.publishedAt);
  const replayAttempts = [];

  for (const capture of captures.slice(0, 12)) {
    const archivedUrl = `https://web.archive.org/web/${capture.timestamp}/${capture.original}`;
    try {
      const response = await fetchWithRetry(archivedUrl, {
        headers: { accept: "text/html,application/xhtml+xml" }
      }, 3);
      const contentType = response.headers.get("content-type") ?? "";
      const bytes = await readReplayPrefix(response);
      const accepted = response.status === 200 && contentType.toLowerCase().includes("text/html") && bytes >= minimumReplayBytes;
      replayAttempts.push({
        archivedUrl,
        status: response.status,
        contentType,
        bytes,
        accepted
      });
      if (accepted) {
        return {
          ...candidate,
          verified: true,
          archivedUrl,
          captureTimestamp: capture.timestamp,
          captureOriginal: capture.original,
          replayStatus: response.status,
          replayContentType: contentType,
          replayBytes: bytes,
          capturesFound: captures.length,
          lookupErrors,
          replayAttempts
        };
      }
    } catch (error) {
      replayAttempts.push({
        archivedUrl,
        error: error instanceof Error ? error.message : String(error),
        accepted: false
      });
    }
    await sleep(1_000);
  }

  return {
    ...candidate,
    verified: false,
    capturesFound: captures.length,
    lookupErrors,
    replayAttempts
  };
}

const results = [];
for (const candidate of candidates) {
  console.log(`Reviewing ${candidate.key}: ${candidate.url}`);
  const result = await verifyCandidate(candidate);
  results.push(result);
  console.log(`${candidate.key}: ${result.verified ? `verified ${result.archivedUrl}` : "not verified"}`);
  await sleep(1_000);
}

const verified = results.filter((item) => item.verified);
const terminalVerified = verified.filter((item) => terminalStatuses.has(item.bridgeStatus));
const summary = {
  selectedUniqueUrls: candidates.length,
  verifiedUniqueUrls: verified.length,
  affectedEvidenceRecords: verified.reduce((sum, item) => sum + item.evidenceIds.length, 0),
  verifiedTerminalUniqueUrls: terminalVerified.length,
  affectedTerminalEvidenceRecords: terminalVerified.reduce((sum, item) => sum + item.evidenceIds.length, 0),
  minimumReplayBytes,
  results
};

console.log("BIR_BATCH10_RESULT_JSON_START");
console.log(JSON.stringify(summary, null, 2));
console.log("BIR_BATCH10_RESULT_JSON_END");

if (verified.length === 0) {
  console.error("No candidate passed the exact replay boundary.");
}
