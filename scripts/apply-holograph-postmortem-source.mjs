import fs from "node:fs";

const path = "data/evidence.json";
const evidence = JSON.parse(fs.readFileSync(path, "utf8"));
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

assert(Array.isArray(evidence), "evidence.json must be an array");
assert(evidence.length === 335, `expected 335 evidence records, found ${evidence.length}`);

const id = "bir_src_000277";
const oldUrl = "https://x.com/holographxyz/status/1807946057235718349";
const newUrl = "https://garnet-tilapia-acb.notion.site/Holograph-Incident-Post-Mortem-b5f1e14da7b2456aa3c3a1bde796daa4";
const index = evidence.findIndex((record) => record.id === id);
assert(index >= 0, `${id} not found`);
assert(evidence.filter((record) => record.id === id).length === 1, `${id} is not unique`);
assert(evidence[index].url === oldUrl, `${id} URL changed; re-review current branch`);
assert(evidence[index].bridge_id === "bir_bridge_000021", `${id} bridge changed`);
assert(evidence[index].incident_id === "bir_inc_000027", `${id} incident changed`);
assert(evidence[index].event_id === "bir_ev_000093", `${id} event changed`);
assert(evidence[index].claim_scope === "root_cause", `${id} claim scope changed`);
assert(!evidence.some((record, i) => i !== index && record.url === newUrl), "Holograph Notion postmortem URL already exists elsewhere");

const prior = evidence[index];
evidence[index] = {
  ...prior,
  source_type: "postmortem",
  title: "Holograph Incident Post-Mortem",
  url: newUrl,
  publisher: "Holograph",
  accessed_at: "2026-08-21",
  author: "Holograph / Halborn",
  supports_reopen: false,
  notes: "First-party Holograph incident postmortem linked from Holograph's July 2, 2024 announcement and prepared alongside Halborn. The public Notion page-data response was reproduced twice on 2026-08-21 and contained Holograph, Halborn, former-contractor, privileged/admin-access, one-billion, and HLG root-cause markers. This source replaces the risky-host announcement URL for the same event-scoped root-cause claim; it does not independently assert reopening."
};

assert(evidence[index].is_primary === true, "primary-source classification must be preserved");
assert(evidence[index].source_tier === "tier_1", "tier-1 classification must be preserved");
assert(evidence[index].is_official_domain === false, "Notion source must not be marked official-domain");
assert(evidence[index].archived_url == null, "unexpected archive metadata on replacement source");
assert(evidence.length === 335, "evidence count changed unexpectedly");

fs.writeFileSync(path, `[\n${evidence.map((record) => `  ${JSON.stringify(record)}`).join(",\n")}\n]\n`);
console.log(`Replaced ${id}: ${oldUrl} -> ${newUrl}`);
