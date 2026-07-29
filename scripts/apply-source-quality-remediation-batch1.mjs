import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
const write = (file, value) => fs.writeFileSync(path.join(root, file), `${JSON.stringify(value, null, 2)}\n`);

const incidents = read("data/incidents.json");
const events = read("data/events.json");
const evidence = read("data/evidence.json");

if (evidence.length !== 263 || evidence.at(-1)?.id !== "bir_src_000263") {
  throw new Error(`unexpected evidence baseline: length=${evidence.length}, last=${evidence.at(-1)?.id}`);
}
if (evidence.some((source) => ["bir_src_000264", "bir_src_000265"].includes(source.id))) {
  throw new Error("Batch 1 evidence IDs already exist");
}

const incident = incidents.find((item) => item.id === "bir_inc_000015");
const exploitEvent = events.find((item) => item.id === "bir_ev_000043");
const resolutionEvent = events.find((item) => item.id === "bir_ev_000044");

if (!incident || !exploitEvent || !resolutionEvent) throw new Error("LI.FI canonical targets missing");
if (incident.source_count !== 5 || exploitEvent.source_count !== 3 || resolutionEvent.source_count !== 2) {
  throw new Error("LI.FI source-count baseline changed");
}
if (incident.reimbursement_status !== "partial" || incident.is_unresolved !== true) {
  throw new Error("LI.FI incident outcome baseline changed");
}

const sourceBase = {
  bridge_id: "bir_bridge_000013",
  incident_id: "bir_inc_000015",
  source_type: "postmortem",
  title: "LI.FI Smart Contract Vulnerability Post Mortem",
  url: "https://blog.li.finance/20th-march-the-exploit-e9e1c5c03eb9",
  publisher: "LI.FI",
  published_at: "2022-03-21",
  published_at_precision: "day",
  reliability: "high",
  source_tier: "tier_1",
  url_status: "live",
  archived_url: null,
  accessed_at: "2026-07-29",
  language: "en",
  author: "Zord4n",
  quote_excerpt: null,
  is_primary: true,
  is_paywalled: false,
  is_official_domain: true,
  supports_amount: true,
  supports_recovery: false,
  supports_reimbursement: true,
  supports_reopen: true,
  supports_shutdown: true,
  supports_migration: false
};

evidence.push(
  {
    id: "bir_src_000264",
    ...sourceBase,
    event_id: "bir_ev_000043",
    claim_scope: "incident_case",
    notes: "First-party postmortem supporting the unchecked external-call root cause, 29 affected wallets, approximately USD 600,000 stolen, and immediate swap-method containment."
  },
  {
    id: "bir_src_000265",
    ...sourceBase,
    event_id: "bir_ev_000044",
    claim_scope: "reimbursement",
    notes: "Event-scoped duplicate supporting the deployed whitelist fix, swaps reenabled, 29 of 29 wallets reimbursed, and USD 570,000 total compensation."
  }
);

incident.source_count = 7;
incident.last_reviewed_at = "2026-07-29";
incident.last_verified_at = "2026-07-29";
incident.reported_loss_text = "LI.FI's official postmortem reported approximately USD 600,000 stolen from 29 wallets, later valued at USD 587,500 or 205 ETH in the same report.";
incident.loss_amount_basis = "reported_by_project";
incident.amount_claims = [
  {
    amount_text: "tokens drained from 29 wallets and converted to approximately 205 ETH",
    amount_usd_text: "approximately USD 600,000",
    source_id: "bir_src_000264",
    basis: "reported_by_project",
    usd_valuation_date: "2022-03-20",
    notes: "Canonical amount from the first-party postmortem; the same report later valued the assets at USD 587,500."
  }
];
incident.recovery_status = "none";
incident.reimbursement_status = "completed";
incident.restart_status = "reopened";
incident.current_outcome = "active_after_incident";
incident.is_unresolved = false;
incident.unresolved_reason = [];
incident.postmortem_available = "full";
incident.known_unknowns = [
  "The attacker-held funds were not reported recovered in the reviewed first-party postmortem; user reimbursement was operator-funded.",
  "The postmortem states that one of four larger affected users partially accepted an angel-investment arrangement while all 29 wallets were reimbursed."
];

exploitEvent.source_count = 4;
exploitEvent.reimbursement_status = "unknown";

resolutionEvent.title = "Vulnerability patched and all affected wallets reimbursed";
resolutionEvent.description = "LI.FI deployed a whitelist-based fix, reenabled swaps, disabled infinite approvals by default, and reported that all 29 affected wallets were reimbursed for a total of USD 570,000.";
resolutionEvent.source_count = 3;
resolutionEvent.recovered_amount_text = "29 of 29 wallets reimbursed; USD 570,000 total operator-funded compensation";
resolutionEvent.reimbursement_status = "completed";
resolutionEvent.restart_status = "reopened";
resolutionEvent.notes = "LI.FI offered four larger affected users an angel-investment arrangement; one accepted it partially, and the official postmortem still reports all 29 wallets reimbursed.";

write("data/incidents.json", incidents);
write("data/events.json", events);
write("data/evidence.json", evidence);

console.log("Applied source-quality remediation Batch 1: LI.FI 2022 first-party postmortem and completed reimbursement correction.");
