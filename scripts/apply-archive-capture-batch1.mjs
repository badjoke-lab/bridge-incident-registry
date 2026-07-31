import fs from "node:fs";

const evidencePath = "data/evidence.json";
const qualityPath = "scripts/check-source-quality-baseline.mjs";

const updates = new Map([
  ["bir_src_000035", {
    source_url: "https://medium.com/@QubitFin/protocol-exploit-report-305c34540fa3",
    archived_url: "https://web.archive.org/web/20260322055923/https://medium.com/@QubitFin/protocol-exploit-report-305c34540fa3"
  }],
  ["bir_src_000039", {
    source_url: "https://medium.com/@QubitFin/qubit-markets-reopening-d1d25f4fbfc4",
    archived_url: "https://web.archive.org/web/20220222022746/https://medium.com/@QubitFin/qubit-markets-reopening-d1d25f4fbfc4"
  }],
  ["bir_src_000086", {
    source_url: "https://medium.com/pnetwork/pnetwork-post-mortem-pbtc-on-bsc-exploit-170890c58d5f",
    archived_url: "https://web.archive.org/web/20250317192844/https://medium.com/pnetwork/pnetwork-post-mortem-pbtc-on-bsc-exploit-170890c58d5f"
  }],
  ["bir_src_000230", {
    source_url: "https://medium.com/pnetwork/pnetwork-post-mortem-pbtc-on-bsc-exploit-170890c58d5f",
    archived_url: "https://web.archive.org/web/20250317192844/https://medium.com/pnetwork/pnetwork-post-mortem-pbtc-on-bsc-exploit-170890c58d5f"
  }],
  ["bir_src_000231", {
    source_url: "https://medium.com/pnetwork/pnetwork-post-mortem-pbtc-on-bsc-exploit-170890c58d5f",
    archived_url: "https://web.archive.org/web/20250317192844/https://medium.com/pnetwork/pnetwork-post-mortem-pbtc-on-bsc-exploit-170890c58d5f"
  }],
  ["bir_src_000088", {
    source_url: "https://medium.com/pnetwork/pgala-post-mortem-measures-taken-to-safeguard-the-ecosystem-from-malicious-actors-and-recovery-6407048f4497",
    archived_url: "https://web.archive.org/web/20250717123748/https://medium.com/pnetwork/pgala-post-mortem-measures-taken-to-safeguard-the-ecosystem-from-malicious-actors-and-recovery-6407048f4497"
  }],
  ["bir_src_000232", {
    source_url: "https://medium.com/pnetwork/pgala-post-mortem-measures-taken-to-safeguard-the-ecosystem-from-malicious-actors-and-recovery-6407048f4497",
    archived_url: "https://web.archive.org/web/20250717123748/https://medium.com/pnetwork/pgala-post-mortem-measures-taken-to-safeguard-the-ecosystem-from-malicious-actors-and-recovery-6407048f4497"
  }],
  ["bir_src_000233", {
    source_url: "https://medium.com/pnetwork/pgala-post-mortem-measures-taken-to-safeguard-the-ecosystem-from-malicious-actors-and-recovery-6407048f4497",
    archived_url: "https://web.archive.org/web/20250717123748/https://medium.com/pnetwork/pgala-post-mortem-measures-taken-to-safeguard-the-ecosystem-from-malicious-actors-and-recovery-6407048f4497"
  }],
  ["bir_src_000234", {
    source_url: "https://medium.com/pnetwork/pgala-post-mortem-measures-taken-to-safeguard-the-ecosystem-from-malicious-actors-and-recovery-6407048f4497",
    archived_url: "https://web.archive.org/web/20250717123748/https://medium.com/pnetwork/pgala-post-mortem-measures-taken-to-safeguard-the-ecosystem-from-malicious-actors-and-recovery-6407048f4497"
  }],
  ["bir_src_000090", {
    source_url: "https://gogalagames.medium.com/pgala-what-happened-and-the-dangers-of-decentralization-62d64e1ea569",
    archived_url: "https://web.archive.org/web/20251115013400/https://gogalagames.medium.com/pgala-what-happened-and-the-dangers-of-decentralization-62d64e1ea569"
  }]
]);

const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
const evidenceById = new Map(evidence.map((source) => [source.id, source]));

for (const [id, update] of updates) {
  const source = evidenceById.get(id);
  if (!source) throw new Error(`Missing evidence record: ${id}`);
  if (source.url !== update.source_url) {
    throw new Error(`Source URL drift for ${id}: ${source.url}`);
  }
  if (source.archived_url && source.archived_url !== update.archived_url) {
    throw new Error(`Existing archive conflict for ${id}: ${source.archived_url}`);
  }
  source.archived_url = update.archived_url;
}

const formattedEvidence = `[
  ${evidence.map((source) => JSON.stringify(source)).join(",\n  ")}
]\n`;
fs.writeFileSync(evidencePath, formattedEvidence);

let quality = fs.readFileSync(qualityPath, "utf8");
const replacements = [
  ["terminal_unarchived: 59", "terminal_unarchived: 54"],
  ["risky_host_unarchived: 88", "risky_host_unarchived: 83"]
];

for (const [before, after] of replacements) {
  if (!quality.includes(before)) throw new Error(`Missing quality baseline token: ${before}`);
  quality = quality.replace(before, after);
}
fs.writeFileSync(qualityPath, quality);

console.log(`Applied ${updates.size} archive fields.`);
