const candidates = [
  ["multichain-abnormal-movement", "Multichain abnormal MPC asset movement", "https://twitter.com/MultichainOrg/status/1677096839731097600", "2023-07-06", "dead", ["bir_src_000025"]],
  ["multichain-indefinite-stop", "Multichain service stopped indefinitely", "https://twitter.com/MultichainOrg/status/1677180114227056641", "2023-07-07", "dead", ["bir_src_000028", "bir_src_000216"]],
  ["multichain-cessation", "Multichain cessation of operations", "https://twitter.com/MultichainOrg/status/1679768407628185600", "2023-07-14", "dead", ["bir_src_000029"]],
  ["everclear-wind-down", "Everclear wind-down announcement", "https://twitter.com/EverclearOrg/status/2057488000003477886", "2026-05-21", "dead", ["bir_src_000187", "bir_src_000284"]],
  ["syndicate-compromise", "Syndicate Commons Bridge compromise statement", "https://twitter.com/syndicateio/status/2049352309784904187", "2026-04-29", "dead", ["bir_src_000193", "bir_src_000261", "bir_src_000262", "bir_src_000266", "bir_src_000267"]],
  ["syndicate-wind-down", "Syndicate Labs wind-down and reimbursement thread", "https://x.com/syndicateio/status/2057291537860706672", "2026-05-21", "dead", ["bir_src_000194"]],
  ["holograph-exploit", "Holograph exploit statement", "https://x.com/holographxyz/status/1801332482262110301", "2024-06-13", "inactive", ["bir_src_000112", "bir_src_000239"]],
  ["holograph-postmortem", "Holograph postmortem announcement", "https://x.com/holographxyz/status/1807946057235718349", "2024-07-02", "inactive", ["bir_src_000277"]],
  ["wormhole-exploit", "Wormhole exploit acknowledgement", "https://x.com/wormhole/status/1489001949881978883", "2022-02-02", "active", ["bir_src_000063"]],
  ["wormhole-restoration", "Wormhole restoration of funds and service", "https://x.com/wormhole/status/1489232008521859079", "2022-02-03", "active", ["bir_src_000064", "bir_src_000202"]]
].map(([key, title, url, publishedAt, bridgeStatus, evidenceIds]) => ({ key, title, url, publishedAt, bridgeStatus, evidenceIds }));

const minimumReplayBytes = 65_536;
const terminalStatuses = new Set(["dead", "deprecated", "migrated"]);

function aliases(source) {
  const url = new URL(source);
  const alternate = new URL(source);
  if (url.hostname === "x.com") alternate.hostname = "twitter.com";
  else alternate.hostname = "x.com";
  return [...new Set([url.toString(), alternate.toString()])];
}

async function request(url, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "BridgeIncidentRegistryArchiveReview/1.0" }
    });
  } finally {
    clearTimeout(timer);
  }
}

function captureMillis(timestamp) {
  const m = /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/.exec(timestamp);
  return m ? Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +m[6]) : Number.POSITIVE_INFINITY;
}

async function lookupVariant(variant) {
  const query = new URLSearchParams({
    url: variant,
    output: "json",
    fl: "timestamp,original,statuscode,mimetype,digest",
    filter: "statuscode:200",
    collapse: "digest"
  });
  const response = await request(`https://web.archive.org/cdx/search/cdx?${query}`, 8_000);
  const text = await response.text();
  if (!response.ok) throw new Error(`CDX HTTP ${response.status}`);
  const rows = JSON.parse(text);
  if (!Array.isArray(rows) || rows.length < 2) return [];
  const header = rows[0];
  return rows.slice(1).map((row) => Object.fromEntries(header.map((name, index) => [name, row[index]])));
}

async function lookup(source, publishedAt) {
  const attempts = await Promise.allSettled(aliases(source).map((variant) => lookupVariant(variant)));
  const errors = [];
  const unique = new Map();
  for (let index = 0; index < attempts.length; index += 1) {
    const result = attempts[index];
    if (result.status === "rejected") {
      errors.push(`${aliases(source)[index]}: ${result.reason instanceof Error ? result.reason.message : String(result.reason)}`);
      continue;
    }
    for (const capture of result.value) unique.set(`${capture.timestamp}|${capture.original}`, capture);
  }
  const published = Date.parse(`${publishedAt}T00:00:00Z`);
  const captures = [...unique.values()].sort((a, b) => Math.abs(captureMillis(a.timestamp) - published) - Math.abs(captureMillis(b.timestamp) - published));
  return { captures, errors };
}

async function replay(capture) {
  const archivedUrl = `https://web.archive.org/web/${capture.timestamp}/${capture.original}`;
  try {
    const response = await request(archivedUrl, 10_000);
    const contentType = response.headers.get("content-type") ?? "";
    if (!response.body) return { archivedUrl, status: response.status, contentType, bytes: 0, accepted: false };
    const reader = response.body.getReader();
    let bytes = 0;
    while (bytes < minimumReplayBytes) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
    }
    await reader.cancel().catch(() => undefined);
    return {
      archivedUrl,
      status: response.status,
      contentType,
      bytes,
      accepted: response.status === 200 && contentType.toLowerCase().includes("text/html") && bytes >= minimumReplayBytes
    };
  } catch (error) {
    return { archivedUrl, error: error instanceof Error ? error.message : String(error), accepted: false };
  }
}

async function verify(candidate) {
  console.log(`Reviewing ${candidate.key}`);
  const { captures, errors } = await lookup(candidate.url, candidate.publishedAt);
  const replayAttempts = [];
  let approved = null;
  for (const capture of captures.slice(0, 3)) {
    const result = await replay(capture);
    replayAttempts.push(result);
    if (result.accepted) {
      approved = { ...capture, ...result };
      break;
    }
  }
  console.log(`${candidate.key}: ${approved ? `verified ${approved.archivedUrl}` : "not verified"}`);
  return {
    ...candidate,
    verified: Boolean(approved),
    archivedUrl: approved?.archivedUrl ?? null,
    captureTimestamp: approved?.timestamp ?? null,
    captureOriginal: approved?.original ?? null,
    replayStatus: approved?.status ?? null,
    replayContentType: approved?.contentType ?? null,
    replayBytes: approved?.bytes ?? null,
    capturesFound: captures.length,
    lookupErrors: errors,
    replayAttempts
  };
}

async function mapLimit(items, limit, mapper) {
  const results = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await mapper(items[index]);
    }
  }
  await Promise.all(Array.from({ length: limit }, () => worker()));
  return results;
}

const results = await mapLimit(candidates, 3, verify);
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
