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
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function aliases(source) {
  const values = [source];
  const url = new URL(source);
  if (url.hostname === "x.com") url.hostname = "twitter.com";
  else if (url.hostname === "twitter.com") url.hostname = "x.com";
  values.push(url.toString());
  return [...new Set(values)];
}

async function request(url, timeoutMs = 10_000, attempts = 2) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, {
        redirect: "follow",
        signal: controller.signal,
        headers: { "user-agent": "BridgeIncidentRegistryArchiveReview/1.0" }
      });
      if ((response.status === 429 || response.status >= 500) && attempt < attempts) {
        await response.arrayBuffer().catch(() => undefined);
        await sleep(1_000 * attempt);
        continue;
      }
      return response;
    } catch (error) {
      lastError = error;
      if (attempt < attempts) await sleep(1_000 * attempt);
    } finally {
      clearTimeout(timer);
    }
  }
  throw lastError ?? new Error(`request failed: ${url}`);
}

function captureMillis(timestamp) {
  const match = /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/.exec(timestamp);
  if (!match) return Number.POSITIVE_INFINITY;
  return Date.UTC(+match[1], +match[2] - 1, +match[3], +match[4], +match[5], +match[6]);
}

async function lookup(source, publishedAt) {
  const errors = [];
  for (const variant of aliases(source)) {
    const query = new URLSearchParams({
      url: variant,
      output: "json",
      fl: "timestamp,original,statuscode,mimetype,digest",
      filter: "statuscode:200",
      collapse: "digest"
    });
    try {
      const response = await request(`https://web.archive.org/cdx/search/cdx?${query}`);
      const text = await response.text();
      if (!response.ok) {
        errors.push(`${variant}: CDX HTTP ${response.status}`);
        continue;
      }
      const rows = JSON.parse(text);
      if (!Array.isArray(rows) || rows.length < 2) continue;
      const header = rows[0];
      const captures = rows.slice(1).map((row) => Object.fromEntries(header.map((name, index) => [name, row[index]])));
      const published = Date.parse(`${publishedAt}T00:00:00Z`);
      captures.sort((a, b) => Math.abs(captureMillis(a.timestamp) - published) - Math.abs(captureMillis(b.timestamp) - published));
      return { captures, errors };
    } catch (error) {
      errors.push(`${variant}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  return { captures: [], errors };
}

async function replay(capture) {
  const archivedUrl = `https://web.archive.org/web/${capture.timestamp}/${capture.original}`;
  try {
    const response = await request(archivedUrl, 12_000, 1);
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

const results = [];
for (const candidate of candidates) {
  console.log(`Reviewing ${candidate.key}`);
  const { captures, errors } = await lookup(candidate.url, candidate.publishedAt);
  const attempts = [];
  let approved = null;
  for (const capture of captures.slice(0, 4)) {
    const result = await replay(capture);
    attempts.push(result);
    if (result.accepted) {
      approved = { ...capture, ...result };
      break;
    }
    await sleep(500);
  }
  results.push({
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
    replayAttempts: attempts
  });
  console.log(`${candidate.key}: ${approved ? `verified ${approved.archivedUrl}` : "not verified"}`);
  await sleep(500);
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
