import fs from "node:fs";

const read = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const write = (p, rows) => fs.writeFileSync(p, `[\n${rows.map((r) => `  ${JSON.stringify(r)}`).join(",\n")}\n]\n`);
const assert = (ok, message) => { if (!ok) throw new Error(message); };

const incidentsPath = "data/incidents.json";
const eventsPath = "data/events.json";
const evidencePath = "data/evidence.json";
const incidents = read(incidentsPath);
const events = read(eventsPath);
const evidence = read(evidencePath);

assert(incidents.length === 44, `expected 44 incidents, found ${incidents.length}`);
assert(events.length === 206, `expected 206 events, found ${events.length}`);
assert(evidence.length === 341, `expected 341 evidence records, found ${evidence.length}`);
assert(!evidence.some((x) => x.id === "bir_src_000343"), "bir_src_000343 already exists");

const incident = incidents.find((x) => x.id === "bir_inc_000038");
const event = events.find((x) => x.id === "bir_ev_000188");
assert(incident, "bir_inc_000038 missing");
assert(event, "bir_ev_000188 missing");
assert(incident.source_count === 2, `incident source_count=${incident.source_count}`);
assert(event.source_count === 2, `event source_count=${event.source_count}`);
assert(incident.attack_vector_category === "unknown", "root-cause boundary moved before bounded application");
assert(incident.recovery_status === "unknown", "recovery boundary moved before bounded application");
assert(incident.reimbursement_status === "unknown", "reimbursement boundary moved before bounded application");
assert(incident.restart_status === "paused", "restart boundary moved before bounded application");

const sourceId = "bir_src_000343";
evidence.push({
  id: sourceId,
  bridge_id: "bir_bridge_000036",
  incident_id: "bir_inc_000038",
  event_id: "bir_ev_000188",
  source_type: "other",
  title: "Coreum Bridge $200K Exploit: 17 Signers and One Missing Destination Check",
  url: "https://sigintzero.com/blog/coreum-bridge-200k-xrp-rippling-deposit-forgery",
  publisher: "SigIntZero",
  published_at: "2026-08-18",
  published_at_precision: "day",
  reliability: "high",
  source_tier: "tier_2",
  url_status: "live",
  archived_url: null,
  accessed_at: "2026-08-23",
  claim_scope: "amount",
  language: "en",
  author: null,
  quote_excerpt: null,
  is_primary: false,
  is_paywalled: false,
  is_official_domain: false,
  supports_amount: true,
  supports_recovery: false,
  supports_reimbursement: false,
  supports_reopen: false,
  supports_shutdown: false,
  supports_migration: false,
  notes: "Independent reproducible XRPL analysis supporting 94 successful outgoing XRP payments, a gross total of 199,916.3 XRP, an approximately 87-minute XRP-only drain window, no inbound bridge payments during that window, and the observed 17-of-28 signer configuration. It corroborates the public relayer verification-gap hypothesis but is not tx/Coreum first-party incident authority and does not establish recovery, reimbursement completion, reopening, or the exact production relayer build."
});

incident.source_count = 3;
incident.last_reviewed_at = "2026-08-23";
incident.last_verified_at = "2026-08-23";
incident.summary = "Independent reproducible on-chain analysis supports a gross 199,916.3 XRP outflow from the XRPL-Coreum / current XRPL-TX Bridge through 94 successful outgoing payments over about 87 minutes on August 9, 2026. A broader approximately 97-minute activity window includes preceding wrapped-TX activity and is not used as the duration of the XRP-only drain. Current public relayer source code contains a validation path consistent with the reported relayer-logic hypothesis, but BIR does not treat that code observation or the independent reproduction as tx/Coreum first-party proof of the production exploit path.";
incident.reported_loss_text = "199,916.3 XRP were independently reproduced as the gross total of 94 successful outgoing XRP payments over about 87 minutes.";
incident.amount_note = "The 199,916.3 XRP gross outflow is now independently reproduced from public XRPL queries. A lower 198,715.88 XRP figure attributed to tx technical leadership remains unreconciled in review authority and is not silently substituted. No USD value is canonicalized without a sourced valuation basis.";
incident.amount_claims = [
  {
    amount_text: "199,916.3 XRP reported transferred out in 94 payments",
    source_id: "bir_src_000297",
    basis: "reported_by_news",
    notes: "Contemporaneous secondary report summarizing on-chain analysis; no unsourced USD conversion is added."
  },
  {
    amount_text: "199,916.3 XRP gross outgoing total across 94 successful payments",
    source_id: sourceId,
    basis: "on_chain_reproduction",
    notes: "Independent reproducible XRPL analysis; the XRP-only payment window is about 87 minutes."
  }
];
incident.known_unknowns = [
  "Whether the missing destination-address check visible in the reviewed relayer path was the exact production root cause is not established by admitted first-party incident authority.",
  "Relayer-key compromise is not established; the observed 17-of-28 signature pattern is not treated as proof that private keys were stolen.",
  "A later 198,715.88 XRP figure attributed to tx technical leadership remains unreconciled against the independently reproduced 199,916.3 XRP gross reserve outflow.",
  "Recovery, reimbursement, reserve-restoration completion, and reopening status remain unverified."
];

event.source_count = 3;
event.description = "Independent reproducible XRPL analysis supports 199,916.3 XRP leaving the bridge through 94 successful outgoing payments over about 87 minutes on August 9, 2026. A broader approximately 97-minute activity window includes preceding wrapped-TX activity. Contemporaneous reporting described the bridge as halted after the incident. BIR keeps the production root cause provisional because direct tx/Coreum first-party incident authority has not yet been admitted.";
event.notes = "The gross XRP outflow and 94-payment sequence are independently reproducible. The 94 XRP payments themselves span about 87 minutes; the broader 97-minute activity window includes preceding wrapped-TX activity. The pinned first-party relayer source remains technical context only and does not independently prove the production exploit path.";

write(incidentsPath, incidents);
write(eventsPath, events);
write(evidencePath, evidence);

const docs = [
  ["README.md", "Evidence    341", "Evidence    342"],
  ["docs/runbooks/current-status.md", "Evidence    341", "Evidence    342"],
  ["docs/runbooks/development-roadmap.md", "Evidence    341", "Evidence    342"],
  ["docs/runbooks/public-consistency-remediation.md", "Evidence    341", "Evidence    342"],
  ["docs/runbooks/recovery-checkpoint.md", "Evidence                 341", "Evidence                 342"]
];
for (const [path, oldText, newText] of docs) {
  const text = fs.readFileSync(path, "utf8");
  assert(text.includes(oldText), `${path}: missing current evidence-count marker`);
  fs.writeFileSync(path, text.replace(oldText, newText));
}

assert(evidence.length === 342, `final evidence=${evidence.length}`);
assert(incident.source_count === 3, "incident source count not updated");
assert(event.source_count === 3, "event source count not updated");
assert(incident.attack_vector_category === "unknown", "root-cause classification changed");
assert(incident.recovery_status === "unknown", "recovery status changed");
assert(incident.reimbursement_status === "unknown", "reimbursement status changed");
assert(incident.restart_status === "paused", "restart status changed");
