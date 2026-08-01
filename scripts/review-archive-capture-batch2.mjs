import fs from "node:fs";

const outputPath = "docs/audits/phase3-archive-capture-batch2-candidate-verification.json";

const candidates = [
  {
    url: "https://medium.com/renprotocol/renvm-mainnet-release-98cac4c6fa8e",
    evidence_ids: ["bir_src_000126"],
    bridge: "ren-protocol",
    publisher: "Ren Protocol"
  },
  {
    url: "https://medium.com/renprotocol/introducing-renbridge-3-0-2b5f49aaf722",
    evidence_ids: ["bir_src_000127"],
    bridge: "ren-protocol",
    publisher: "Ren Protocol"
  },
  {
    url: "https://medium.com/renprotocol/introducing-ren-2-0-43025b3d5d6",
    evidence_ids: ["bir_src_000128"],
    bridge: "ren-protocol",
    publisher: "Ren Protocol"
  },
  {
    url: "https://medium.com/renprotocol/moving-on-from-alameda-da62a823ce93",
    evidence_ids: ["bir_src_000129", "bir_src_000130"],
    bridge: "ren-protocol",
    publisher: "Ren Protocol"
  },
  {
    url: "https://medium.com/avalancheavax/introducing-the-avalanche-ethereum-light-bridge-aelb-through-the-cyberfi-asset-management-b280e830702f",
    evidence_ids: ["bir_src_000133"],
    bridge: "avalanche-ethereum-bridge",
    publisher: "Avalanche"
  },
  {
    url: "https://medium.com/avalancheavax/preparing-for-the-next-generation-avalanche-bridge-ab-26f7521485e7",
    evidence_ids: ["bir_src_000134"],
    bridge: "avalanche-ethereum-bridge",
    publisher: "Avalanche"
  },
  {
    url: "https://medium.com/avalancheavax/new-avalanche-bridge-builds-on-intel-sgx-technology-in-breakthrough-for-cross-chain-8f854e0e72e0",
    evidence_ids: ["bir_src_000135", "bir_src_000138"],
    bridge: "avalanche-bridge-family",
    publisher: "Avalanche"
  },
  {
    url: "https://medium.com/avalancheavax/avalanche-bridge-secure-cross-chain-asset-transfers-using-intel-sgx-b04f5a4c7ad1",
    evidence_ids: ["bir_src_000136", "bir_src_000139"],
    bridge: "avalanche-bridge-family",
    publisher: "Avalanche"
  }
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithRetry(url, options = {}, attempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch(url, {
        redirect: "follow",
        headers: {
          "user-agent": "BridgeIncidentRegistryArchiveVerifier/1.0 (+https://bridge-incident-registry.pages.dev)",
          ...(options.headers ?? {})
        },
        ...options,
        signal: controller.signal
      });
      clearTimeout(timeout);
      if (response.status === 429 || response.status >= 500) {
        lastError = new Error(`HTTP ${response.status}`);
        await sleep(attempt * 3000);
        continue;
      }
      return response;
    } catch (error) {
      clearTimeout(timeout);
      lastError = error;
      await sleep(attempt * 3000);
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
    chunks.push(value);
    total += value.byteLength;
  }
  await reader.cancel().catch(() => {});
  const joined = Buffer.concat(chunks.map((chunk) => Buffer.from(chunk)));
  return {
    bytes: joined.byteLength,
    text: joined.toString("utf8")
  };
}

async function cdxRows(originalUrl) {
  const params = new URLSearchParams();
  params.set("url", originalUrl);
  params.set("output", "json");
  params.append("filter", "statuscode:200");
  params.append("filter", "mimetype:text/html");
  params.set("fl", "timestamp,original,statuscode,digest");
  params.set("collapse", "digest");
  const cdxUrl = `https://web.archive.org/cdx/search/cdx?${params.toString()}`;
  const response = await fetchWithRetry(cdxUrl);
  const body = await response.text();
  if (!response.ok) {
    throw new Error(`CDX ${response.status}: ${body.slice(0, 200)}`);
  }
  const parsed = JSON.parse(body);
  if (!Array.isArray(parsed) || parsed.length < 2) return [];
  const [header, ...rows] = parsed;
  return rows.map((row) => Object.fromEntries(header.map((key, index) => [key, row[index]])));
}

async function verifyCandidate(candidate) {
  try {
    const rows = await cdxRows(candidate.url);
    const attempts = [];
    for (const row of rows.slice().reverse().slice(0, 8)) {
      const archivedUrl = `https://web.archive.org/web/${row.timestamp}/${candidate.url}`;
      try {
        const response = await fetchWithRetry(archivedUrl, {
          headers: { range: "bytes=0-65535" }
        }, 2);
        const prefix = await readPrefix(response);
        const contentType = response.headers.get("content-type") ?? "";
        const valid = response.status === 200
          && contentType.toLowerCase().includes("text/html")
          && prefix.bytes >= 1000
          && !prefix.text.toLowerCase().includes("wayback machine has not archived that url");
        attempts.push({
          timestamp: row.timestamp,
          archived_url: archivedUrl,
          status: response.status,
          final_url: response.url,
          content_type: contentType,
          prefix_bytes: prefix.bytes,
          valid
        });
        if (valid) {
          return {
            ...candidate,
            result: "verified",
            archived_url: archivedUrl,
            timestamp: row.timestamp,
            cdx_capture_count: rows.length,
            replay: attempts.at(-1)
          };
        }
      } catch (error) {
        attempts.push({
          timestamp: row.timestamp,
          archived_url: archivedUrl,
          error: String(error),
          valid: false
        });
      }
      await sleep(1200);
    }
    return {
      ...candidate,
      result: rows.length === 0 ? "no_cdx_capture" : "no_verified_replay",
      cdx_capture_count: rows.length,
      replay_attempts: attempts
    };
  } catch (error) {
    return {
      ...candidate,
      result: "verification_error",
      error: String(error)
    };
  }
}

const results = [];
for (const candidate of candidates) {
  results.push(await verifyCandidate(candidate));
  await sleep(1500);
}

const verified = results.filter((item) => item.result === "verified");
const report = {
  generated_at: new Date().toISOString(),
  policy: {
    source_scope: "official Medium URLs belonging to terminal or deprecated bridges",
    acceptance: "exact CDX capture plus live HTTP 200 HTML replay with non-trivial body",
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