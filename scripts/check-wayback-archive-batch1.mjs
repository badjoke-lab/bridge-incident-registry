import fs from "node:fs";

const targets = [
  {
    evidence_ids: ["bir_src_000035"],
    label: "Qubit protocol exploit report",
    url: "https://medium.com/@QubitFin/protocol-exploit-report-305c34540fa3"
  },
  {
    evidence_ids: ["bir_src_000037"],
    label: "Qubit compensation plan",
    url: "https://medium.com/@QubitFin/our-compensation-plan-1-63e7c64738ed"
  },
  {
    evidence_ids: ["bir_src_000039"],
    label: "Qubit markets reopening",
    url: "https://medium.com/@QubitFin/qubit-markets-reopening-d1d25f4fbfc4"
  },
  {
    evidence_ids: ["bir_src_000086", "bir_src_000230", "bir_src_000231"],
    label: "pNetwork pBTC on BSC postmortem",
    url: "https://medium.com/pnetwork/pnetwork-post-mortem-pbtc-on-bsc-exploit-170890c58d5f"
  },
  {
    evidence_ids: ["bir_src_000088", "bir_src_000232", "bir_src_000233", "bir_src_000234"],
    label: "pNetwork pGALA postmortem",
    url: "https://medium.com/pnetwork/pgala-post-mortem-measures-taken-to-safeguard-the-ecosystem-from-malicious-actors-and-recovery-6407048f4497"
  }
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function inspect(target) {
  const endpoint = `https://archive.org/wayback/available?url=${encodeURIComponent(target.url)}`;
  const response = await fetch(endpoint, {
    headers: { "user-agent": "BridgeIncidentRegistry/1.0 archive verification" }
  });

  if (!response.ok) {
    return {
      ...target,
      api_status: response.status,
      available: false,
      error: `Wayback availability API returned ${response.status}`
    };
  }

  const payload = await response.json();
  const snapshot = payload?.archived_snapshots?.closest;
  if (!snapshot?.available || !snapshot?.url) {
    return {
      ...target,
      api_status: response.status,
      available: false,
      error: "No available snapshot returned"
    };
  }

  let snapshotStatus = null;
  let finalUrl = snapshot.url;
  let verificationError = null;

  try {
    const snapshotResponse = await fetch(snapshot.url, {
      redirect: "follow",
      headers: { "user-agent": "BridgeIncidentRegistry/1.0 archive verification" }
    });
    snapshotStatus = snapshotResponse.status;
    finalUrl = snapshotResponse.url || snapshot.url;
    if (!snapshotResponse.ok) {
      verificationError = `Snapshot request returned ${snapshotResponse.status}`;
    }
  } catch (error) {
    verificationError = error instanceof Error ? error.message : String(error);
  }

  return {
    ...target,
    api_status: response.status,
    available: true,
    archived_url: snapshot.url,
    snapshot_timestamp: snapshot.timestamp ?? null,
    snapshot_status: snapshot.status ?? null,
    verified_http_status: snapshotStatus,
    verified_final_url: finalUrl,
    verification_error: verificationError
  };
}

const results = [];
for (const target of targets) {
  results.push(await inspect(target));
  await sleep(750);
}

const output = {
  generated_at: new Date().toISOString(),
  target_count: targets.length,
  evidence_record_count: targets.reduce((sum, target) => sum + target.evidence_ids.length, 0),
  available_count: results.filter((result) => result.available).length,
  verified_ok_count: results.filter((result) => result.available && result.verified_http_status >= 200 && result.verified_http_status < 400).length,
  results
};

fs.writeFileSync("archive-capture-batch1-candidates.json", `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify(output, null, 2));

if (output.available_count !== targets.length) process.exitCode = 1;
