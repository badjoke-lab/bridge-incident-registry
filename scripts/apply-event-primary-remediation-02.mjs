import fs from "node:fs";

const read = (path) => JSON.parse(fs.readFileSync(path, "utf8"));
const writeCompactArray = (path, data) => {
  fs.writeFileSync(path, `[\n${data.map((item) => `  ${JSON.stringify(item)}`).join(",\n")}\n]\n`);
};
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const evidencePath = "data/evidence.json";
const eventsPath = "data/events.json";
const incidentsPath = "data/incidents.json";
const baselinePath = "scripts/check-source-quality-baseline.mjs";
const auditPath = "docs/audits/phase3-event-primary-remediation-02-canonical-2026-08-09.md";

const evidence = read(evidencePath);
const events = read(eventsPath);
const incidents = read(incidentsPath);

assert(evidence.length === 284, `expected 284 evidence records, got ${evidence.length}`);
for (const id of ["bir_src_000285", "bir_src_000286", "bir_src_000287"]) {
  assert(!evidence.some((item) => item.id === id), `${id} already exists`);
}

const polyBase = evidence.find((item) => item.id === "bir_src_000270");
const transitBase = evidence.find((item) => item.id === "bir_src_000279");
assert(polyBase, "missing bir_src_000270");
assert(transitBase, "missing bir_src_000279");
assert(polyBase.url === "https://medium.com/poly-network/poly-network-asset-recovery-complete-a7ba33c2f2e4", "unexpected Poly source URL");
assert(polyBase.archived_url === "https://web.archive.org/web/20221013202750/https://medium.com/poly-network/poly-network-asset-recovery-complete-a7ba33c2f2e4", "unexpected Poly archive URL");
assert(polyBase.is_primary === true && polyBase.source_tier === "tier_1", "Poly template is not primary tier 1");
assert(transitBase.url === "https://medium.com/@TransitSwap/updates-about-transitfinance-d05176918897", "unexpected Transit source URL");
assert(transitBase.archived_url === "https://web.archive.org/web/20221020165004/https://medium.com/@TransitSwap/updates-about-transitfinance-d05176918897", "unexpected Transit archive URL");
assert(transitBase.is_primary === true && transitBase.source_tier === "tier_1", "Transit template is not primary tier 1");

const additions = [
  {
    ...polyBase,
    id: "bir_src_000285",
    event_id: "bir_ev_000013",
    claim_scope: "incident_case",
    accessed_at: "2026-08-09",
    notes: "Event-scoped duplicate of bir_src_000270: first-party Poly Network evidence supports the attack occurrence and USD 610 million affected-asset scope; existing secondary evidence retains exact August 10 chronology and independent technical framing."
  },
  {
    ...transitBase,
    id: "bir_src_000286",
    event_id: "bir_ev_000124",
    claim_scope: "incident_case",
    accessed_at: "2026-08-09",
    notes: "Event-scoped duplicate of bir_src_000279: Transit Finance states that hackers attacked at 18:33 UTC on October 1, 2022 and reports the later reconciled USD 28.9 million scope; technical routing-path analysis remains supported by independent security sources."
  },
  {
    ...transitBase,
    id: "bir_src_000287",
    event_id: "bir_ev_000125",
    claim_scope: "incident_case",
    accessed_at: "2026-08-09",
    notes: "Event-scoped duplicate of bir_src_000279: Transit Finance directly acknowledges the incident and documents attacker/white-hat buckets, returned and unrecovered amounts, and continuing recovery/legal handling; independent security sources retain detailed tracing analysis."
  }
];

evidence.push(...additions);
assert(evidence.length === 287, `expected 287 evidence records after additions, got ${evidence.length}`);

const bump = (records, id, expectedBefore, after) => {
  const record = records.find((item) => item.id === id);
  assert(record, `missing ${id}`);
  assert(record.source_count === expectedBefore, `${id} source_count expected ${expectedBefore}, got ${record.source_count}`);
  record.source_count = after;
};

bump(incidents, "bir_inc_000005", 9, 10);
bump(events, "bir_ev_000013", 2, 3);
bump(incidents, "bir_inc_000028", 12, 14);
bump(events, "bir_ev_000124", 2, 3);
bump(events, "bir_ev_000125", 2, 3);

writeCompactArray(evidencePath, evidence);
writeCompactArray(eventsPath, events);
writeCompactArray(incidentsPath, incidents);

let baseline = fs.readFileSync(baselinePath, "utf8");
const before = "  events_without_primary: 14,";
const after = "  events_without_primary: 11,";
assert(baseline.includes(before), "source-quality baseline is not at 14");
assert(!baseline.includes(after), "source-quality baseline already at 11");
baseline = baseline.replace(before, after);
fs.writeFileSync(baselinePath, baseline);

const audit = `# Phase 3 Event Primary Remediation 02 — Canonical Application\n\nDate: 2026-08-09\nReview PR: #211\nReview audit: \`docs/audits/phase3-event-primary-review-02-2026-08-09.md\`\n\n## Canonical changes\n\n- added \`bir_src_000285\`, an event-scoped primary/Tier 1 duplicate of already-canonical Poly Network source \`bir_src_000270\`, linked to \`bir_ev_000013\`;\n- added \`bir_src_000286\`, an event-scoped primary/Tier 1 duplicate of already-canonical Transit Finance source \`bir_src_000279\`, linked to \`bir_ev_000124\`;\n- added \`bir_src_000287\`, a separate event-scoped duplicate of the same Transit Finance source linked to \`bir_ev_000125\`;\n- updated direct source counts for \`bir_inc_000005\`, \`bir_inc_000028\`, \`bir_ev_000013\`, \`bir_ev_000124\`, and \`bir_ev_000125\`;\n- tightened \`events_without_primary\` from 14 to 11;\n- made the controlled \`event-tier-one-regression\` fixture composition-safe so it removes all Tier 1 evidence from an event whose Tier 1 evidence is entirely non-primary, rather than accidentally selecting an event that now has a separate primary Tier 1 source.\n\nThe three new records reuse exact source URLs and archived snapshots that were already canonical and reviewed. No unique risky-host or terminal unarchived URL is introduced.\n\n## Expected state\n\n\`\`\`text\nBridges                            33\nIncidents                          34\nEvents                            183\nEvidence                          287\nPrimary evidence                  206\nTier 1 evidence                   223\nEvents without primary             11\nEvents without Tier 1               6\nTerminal unarchived unique URLs     15\nRisky-host unarchived unique URLs   16\nUnknown URL status                   0\n\`\`\`\n\n## Safety boundary\n\nNo event wording, dates, amounts, lifecycle status, recovery state, reimbursement state, or existing evidence classification is changed. No secondary/security-firm source is upgraded to primary. The source-quality failure test changes only its fixture-selection logic and does not weaken any production ceiling. The one-shot applicator removes itself before commit; permanent scope is canonical evidence/count updates, the tightened baseline, the composition-safe controlled-failure fixture, and this audit.\n`;
fs.writeFileSync(auditPath, audit);

console.log(JSON.stringify({
  evidence: evidence.length,
  added_ids: additions.map((item) => item.id),
  event_source_counts: {
    bir_ev_000013: events.find((item) => item.id === "bir_ev_000013").source_count,
    bir_ev_000124: events.find((item) => item.id === "bir_ev_000124").source_count,
    bir_ev_000125: events.find((item) => item.id === "bir_ev_000125").source_count
  },
  incident_source_counts: {
    bir_inc_000005: incidents.find((item) => item.id === "bir_inc_000005").source_count,
    bir_inc_000028: incidents.find((item) => item.id === "bir_inc_000028").source_count
  },
  events_without_primary_limit: 11
}, null, 2));
