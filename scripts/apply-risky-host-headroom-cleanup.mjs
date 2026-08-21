import fs from "node:fs";

const read = (path) => JSON.parse(fs.readFileSync(path, "utf8"));
const write = (path, rows) => fs.writeFileSync(path, `[\n${rows.map((row) => `  ${JSON.stringify(row)}`).join(",\n")}\n]\n`);
const assert = (condition, message) => { if (!condition) throw new Error(message); };

const evidencePath = "data/evidence.json";
const eventsPath = "data/events.json";
const incidentsPath = "data/incidents.json";
const evidence = read(evidencePath);
const events = read(eventsPath);
const incidents = read(incidentsPath);

assert(evidence.length === 335, `expected 335 evidence before cleanup, found ${evidence.length}`);
assert(events.length === 203, `expected 203 events, found ${events.length}`);
assert(incidents.length === 43, `expected 43 incidents, found ${incidents.length}`);

// Revert the Holograph review-only substitution because notion.site remains a risky host
// and neither exact Notion nor exact X Wayback captures passed the permanent 65,536-byte floor.
const holographId = "bir_src_000277";
const holographIndex = evidence.findIndex((row) => row.id === holographId);
assert(holographIndex >= 0, `${holographId} missing`);
assert(evidence.filter((row) => row.id === holographId).length === 1, `${holographId} not unique`);
assert(evidence[holographIndex].url === "https://garnet-tilapia-acb.notion.site/Holograph-Incident-Post-Mortem-b5f1e14da7b2456aa3c3a1bde796daa4", `${holographId} is not the staged Notion substitution`);
evidence[holographIndex] = {
  id: "bir_src_000277",
  bridge_id: "bir_bridge_000021",
  incident_id: "bir_inc_000027",
  event_id: "bir_ev_000093",
  source_type: "official_social",
  title: "Holograph incident postmortem announcement",
  url: "https://x.com/holographxyz/status/1807946057235718349",
  publisher: "Holograph",
  published_at: "2024-07-02",
  published_at_precision: "day",
  reliability: "high",
  source_tier: "tier_1",
  url_status: "live",
  archived_url: null,
  accessed_at: "2026-07-30",
  claim_scope: "root_cause",
  language: "en",
  author: "Holograph",
  quote_excerpt: null,
  is_primary: true,
  is_paywalled: false,
  is_official_domain: false,
  supports_amount: true,
  supports_recovery: false,
  supports_reimbursement: false,
  supports_reopen: true,
  supports_shutdown: false,
  supports_migration: false,
  notes: "First-party announcement of the completed postmortem with Halborn, including the former-contractor access path and the protocol response."
};

// Remove only the redundant unarchived risky-host Tier-2 Rubic corroboration.
const removeId = "bir_src_000164";
const removeIndex = evidence.findIndex((row) => row.id === removeId);
assert(removeIndex >= 0, `${removeId} missing`);
const redundant = evidence[removeIndex];
assert(redundant.url === "https://quillaudits.medium.com/november-2022-kickstart-with-32-million-in-defi-hacks-7898032cb7c0", `${removeId} URL changed`);
assert(redundant.event_id === "bir_ev_000136", `${removeId} event changed`);
assert(redundant.incident_id === "bir_inc_000030", `${removeId} incident changed`);
assert(redundant.source_tier === "tier_2", `${removeId} tier changed`);
assert(redundant.is_primary === false, `${removeId} unexpectedly primary`);
assert(redundant.archived_url == null, `${removeId} unexpectedly archived`);

const retainedPrimary = evidence.find((row) => row.id === "bir_src_000280");
assert(retainedPrimary, "bir_src_000280 missing");
assert(retainedPrimary.event_id === "bir_ev_000136", "bir_src_000280 event changed");
assert(retainedPrimary.incident_id === "bir_inc_000030", "bir_src_000280 incident changed");
assert(retainedPrimary.source_tier === "tier_1", "bir_src_000280 must remain Tier 1");
assert(retainedPrimary.is_primary === true, "bir_src_000280 must remain primary");
assert(typeof retainedPrimary.archived_url === "string" && retainedPrimary.archived_url.startsWith("https://web.archive.org/"), "bir_src_000280 must remain archived");

evidence.splice(removeIndex, 1);
assert(evidence.length === 334, `expected 334 evidence after cleanup, found ${evidence.length}`);
assert(!evidence.some((row) => row.id === removeId), `${removeId} still present`);

const event = events.find((row) => row.id === "bir_ev_000136");
assert(event, "bir_ev_000136 missing");
assert(event.source_count === 2, `bir_ev_000136 expected source_count 2, found ${event.source_count}`);
event.source_count = 1;

const incident = incidents.find((row) => row.id === "bir_inc_000030");
assert(incident, "bir_inc_000030 missing");
assert(incident.source_count === 5, `bir_inc_000030 expected source_count 5, found ${incident.source_count}`);
incident.source_count = 4;

write(evidencePath, evidence);
write(eventsPath, events);
write(incidentsPath, incidents);
console.log("Applied bounded risky-host headroom cleanup: restored bir_src_000277, removed bir_src_000164, updated exact source counts.");
