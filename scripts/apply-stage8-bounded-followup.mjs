import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relative) => JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));
const writeArray = (relative, records) => {
  const text = `[\n${records.map((record) => `  ${JSON.stringify(record)}`).join(",\n")}\n]\n`;
  fs.writeFileSync(path.join(root, relative), text);
};

const incidents = read("data/incidents.json");
const events = read("data/events.json");
const evidence = read("data/evidence.json");

if (incidents.length !== 38 || events.length !== 188 || evidence.length !== 297) {
  throw new Error(`Stage 8 baseline mismatch: ${incidents.length} incidents / ${events.length} events / ${evidence.length} evidence`);
}

for (const id of ["bir_ev_000189", "bir_ev_000190"]) {
  if (events.some((event) => event.id === id)) throw new Error(`Unexpected existing event id ${id}`);
}
for (const id of ["bir_src_000298", "bir_src_000299"]) {
  if (evidence.some((source) => source.id === id)) throw new Error(`Unexpected existing evidence id ${id}`);
}

const lifiIncident = incidents.find((incident) => incident.id === "bir_inc_000015");
const allbridgeIncident = incidents.find((incident) => incident.id === "bir_inc_000035");
const lifiSource = evidence.find((source) => source.id === "bir_src_000265");
const allbridgeSource = evidence.find((source) => source.id === "bir_src_000290");

if (!lifiIncident || !allbridgeIncident || !lifiSource || !allbridgeSource) {
  throw new Error("Stage 8 reviewed authority records are missing");
}
if (lifiIncident.reimbursement_status !== "completed" || lifiIncident.restart_status !== "reopened") {
  throw new Error("LI.FI lifecycle state no longer matches the reviewed Stage 8 boundary");
}
if (allbridgeIncident.restart_status !== "reopened" || allbridgeIncident.current_outcome !== "active_after_incident") {
  throw new Error("Allbridge lifecycle state no longer matches the reviewed Stage 8 boundary");
}
if (lifiSource.is_primary !== true || lifiSource.source_tier !== "tier_1" || lifiSource.supports_reimbursement !== true) {
  throw new Error("LI.FI reviewed first-party reimbursement authority changed");
}
if (allbridgeSource.is_primary !== true || allbridgeSource.source_tier !== "tier_1" || allbridgeSource.supports_reopen !== true) {
  throw new Error("Allbridge reviewed first-party restart authority changed");
}

const lifiEvent = {
  id: "bir_ev_000189",
  bridge_id: "bir_bridge_000013",
  incident_id: "bir_inc_000015",
  event_type: "reimbursement_completed",
  event_date: "2022-03-21",
  event_date_precision: "day",
  title: "LI.FI completed reimbursement for all affected wallets",
  description: "LI.FI's first-party postmortem reported that all 29 affected wallets were reimbursed after the March 2022 approval-drain exploit, with USD 570,000 in total operator-funded compensation.",
  confidence: "high",
  record_maturity: "reviewed",
  update_status: "current",
  impact_level: "high",
  status_effect: "reimbursement completed",
  source_count: 1,
  sort_order: 30,
  amount_text: null,
  recovered_amount_text: "29 of 29 wallets reimbursed; USD 570,000 total operator-funded compensation",
  reimbursement_status: "completed",
  restart_status: "reopened",
  affected_chains: ["ethereum"],
  affected_assets: ["usdc", "usdt", "dai", "matic", "unknown"],
  notes: "Discrete reimbursement milestone split from the semantically overloaded reopen event; operator-funded reimbursement remains separate from attacker-fund recovery.",
  duplicate_of: null,
  merged_into: null
};

const allbridgeEvent = {
  id: "bir_ev_000190",
  bridge_id: "bir_bridge_000012",
  incident_id: "bir_inc_000035",
  event_type: "bridge_reopened",
  event_date: "2026-07-20",
  event_date_precision: "approximate",
  title: "Allbridge Core relaunched without liquidity pools",
  description: "Allbridge reported that Core was back up using CCTP and LayerZero transfer routes without liquidity pools after the July 2026 Solana pool exploit and pause.",
  confidence: "high",
  record_maturity: "reviewed",
  update_status: "current",
  impact_level: "high",
  status_effect: "Core reopened on pool-less transfer routes",
  source_count: 1,
  sort_order: 20,
  amount_text: null,
  recovered_amount_text: null,
  reimbursement_status: "unknown",
  restart_status: "reopened",
  affected_chains: ["solana"],
  affected_assets: ["usdc", "usdt"],
  notes: "Approximate day precision is preserved from the admitted first-party relaunch evidence; this event does not resolve attacker-fund recovery or LP reimbursement.",
  duplicate_of: null,
  merged_into: null
};

const lifiEvidence = {
  ...lifiSource,
  id: "bir_src_000298",
  event_id: "bir_ev_000189",
  accessed_at: "2026-08-17",
  claim_scope: "reimbursement",
  notes: "Event-scoped first-party copy of bir_src_000265 supporting the discrete completed-reimbursement milestone: 29 of 29 affected wallets reimbursed and USD 570,000 total operator-funded compensation."
};
const allbridgeEvidence = {
  ...allbridgeSource,
  id: "bir_src_000299",
  event_id: "bir_ev_000190",
  accessed_at: "2026-08-17",
  claim_scope: "restart",
  notes: "Event-scoped first-party copy of bir_src_000290 supporting the discrete Core relaunch milestone on CCTP and LayerZero without liquidity pools."
};

events.push(lifiEvent, allbridgeEvent);
evidence.push(lifiEvidence, allbridgeEvidence);

for (const incident of [lifiIncident, allbridgeIncident]) {
  incident.source_count = evidence.filter((source) => source.incident_id === incident.id).length;
}

if (events.length !== 190 || evidence.length !== 299 || lifiIncident.source_count !== 8 || allbridgeIncident.source_count !== 5) {
  throw new Error(`Stage 8 post-application counts are unexpected: events=${events.length}, evidence=${evidence.length}, LI.FI sources=${lifiIncident.source_count}, Allbridge sources=${allbridgeIncident.source_count}`);
}

writeArray("data/incidents.json", incidents);
writeArray("data/events.json", events);
writeArray("data/evidence.json", evidence);

console.log("Applied bounded Stage 8 canonical follow-up: +2 events / +2 event-scoped first-party evidence records.");
