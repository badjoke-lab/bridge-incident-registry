import fs from "node:fs";

const outputPath = "docs/audits/phase3-archive-capture-batch2-candidate-verification.json";

const candidates = [
  ["https://medium.com/renprotocol/renvm-mainnet-release-98cac4c6fa8e", ["bir_src_000126"], "ren-protocol", "Ren Protocol"],
  ["https://medium.com/renprotocol/introducing-renbridge-3-0-2b5f49aaf722", ["bir_src_000127"], "ren-protocol", "Ren Protocol"],
  ["https://medium.com/renprotocol/introducing-ren-2-0-43025b3d5d6", ["bir_src_000128"], "ren-protocol", "Ren Protocol"],
  ["https://medium.com/renprotocol/moving-on-from-alameda-da62a823ce93", ["bir_src_000129", "bir_src_000130"], "ren-protocol", "Ren Protocol"],
  ["https://medium.com/avalancheavax/introducing-the-avalanche-ethereum-light-bridge-aelb-through-the-cyberfi-asset-management-b280e830702f", ["bir_src_000133"], "avalanche-ethereum-bridge", "Avalanche"],
  ["https://medium.com/avalancheavax/preparing-for-the-next-generation-avalanche-bridge-ab-26f7521485e7", ["bir_src_000134"], "avalanche-ethereum-bridge", "Avalanche"],
  ["https://medium.com/avalancheavax/new-avalanche-bridge-builds-on-intel-sgx-technology-in-breakthrough-for-cross-chain-8f854e0e72e0", ["bir_src_000135", "bir_src_000138"], "avalanche-bridge-family", "Avalanche"],
  ["https://medium.com/avalancheavax/avalanche-bridge-secure-cross-chain-asset-transfers-using-intel-sgx-b04f5a4c7ad1", ["bir_src_000136", "bir_src_000139"], "avalanche-bridge-family", "Avalanche"]
].map(([url, evidence_ids, bridge, publisher]) => ({ url, evidence_ids, bridge, publisher }));

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
    source_scope: "official Medium URLs belonging to terminal or deprecated bridges",
    discovery: "Wayback availability API with bounded CDX fallback",
    acceptance: "exact snapshot replay returns HTTP 200 HTML with a non-trivial body",
    canonical_limit: "review only; no canonical file is modified by this verifier"
  },
  candidate_count: candidates.length,
  verified_url_count: verified.length,
  verified_evidence_record_count: verified.reduce((sum, item) => sum + item.evidence_ids.length, 0),
  results
};

fs.mkdirSync("docs/audits", { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({
  outputPath,
  candidate_count: report.candidate_count,
  verified_url_count: report.verified_url_count,
  verified_evidence_record_count: report.verified_evidence_record_count
}, null, 2));
