import fs from "node:fs";

const read = (path) => JSON.parse(fs.readFileSync(path, "utf8"));
const writeCompactArray = (path, data) => {
  fs.writeFileSync(path, `[\n${data.map((item) => `  ${JSON.stringify(item)}`).join(",\n")}\n]\n`);
};
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
const replaceOne = (text, oldText, newText, label) => {
  const count = text.split(oldText).length - 1;
  assert(count === 1, `${label}: expected one boundary, found ${count}`);
  return text.replace(oldText, newText);
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
assert(polyBase.is_primary === true && polyBase.source_tier === "tier_1", "Poly template boundary changed");
assert(transitBase.url === "https://medium.com/@TransitSwap/updates-about-transitfinance-d05176918897", "unexpected Transit source URL");
assert(transitBase.archived_url === "https://web.archive.org/web/20221020165004/https://medium.com/@TransitSwap/updates-about-transitfinance-d05176918897", "unexpected Transit archive URL");
assert(transitBase.is_primary === true && transitBase.source_tier === "tier_1", "Transit template boundary changed");

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

const bump = (records, id, before, after) => {
  const record = records.find((item) => item.id === id);
  assert(record, `missing ${id}`);
  assert(record.source_count === before, `${id} source_count expected ${before}, got ${record.source_count}`);
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
baseline = replaceOne(
  baseline,
  "  events_without_primary: 14,",
  "  events_without_primary: 11,",
  "source-quality baseline"
);
fs.writeFileSync(baselinePath, baseline);

// README: make the canonical state current while retaining the explicitly labeled prior production checkpoint.
{
  const path = "README.md";
  let text = fs.readFileSync(path, "utf8");
  text = replaceOne(
    text,
    "Phase 2 record expansion is complete through Batch 7. Source-count remediation is complete with permanent exact-equality CI. A source-quality no-regression baseline is active. Event Tier 1 remediation, the Nerve source review boundary, Archive Capture Batches 1 through 18, and Deferred Archive Retries 01 and 02 are complete and production-verified.",
    "Phase 2 record expansion is complete through Batch 7. Source-count remediation is complete with permanent exact-equality CI. A source-quality no-regression baseline is active. Event Tier 1 remediation, the Nerve source review boundary, Archive Capture Batches 1 through 18, and Deferred Archive Retries 01 and 02 are complete and production-verified. Deferred Retries 03–04 exhausted the fresh retry pool without new approvals. Event Primary Remediation 01 is production-verified, and Remediation 02 adds three reviewed event-scoped first-party evidence records without introducing new unique source URLs.",
    "README phase status"
  );
  text = replaceOne(
    text,
    "Evidence remains 284. Event primary gaps are 16, event Tier 1 gaps are six, and all remaining Tier 1 gaps are reviewed and intentionally secondary. One hundred twenty-seven evidence records now include verified archive URLs.",
    "Canonical evidence is now 287. Event primary gaps are 11, event Tier 1 gaps remain six, and all remaining Tier 1 gaps are reviewed and intentionally secondary. Primary evidence is 206 / 287, Tier 1 evidence is 223 / 287, and 130 evidence records include verified archive URLs. The three new archive fields reuse already-canonical snapshots, so unique archive-risk queues do not increase.",
    "README quality summary"
  );
  text = replaceOne(
    text,
    "Current canonical and production counts:\n\n```text\nBridges     33\nIncidents   34\nEvents      183\nEvidence    284\n```",
    "Current canonical counts:\n\n```text\nBridges     33\nIncidents   34\nEvents      183\nEvidence    287\n```",
    "README count block"
  );
  text = replaceOne(text, "Events without primary           16", "Events without primary           11", "README primary gap");
  text = replaceOne(text, "Evidence with archived_url      127", "Evidence with archived_url      130", "README archive count");
  text = replaceOne(
    text,
    "Latest verified production checkpoint:",
    "Latest verified production checkpoint before Remediation 02 publication verification:",
    "README production label"
  );
  fs.writeFileSync(path, text);
}

// Current status: synchronize canonical quality state; the prior #209 block remains explicitly the latest completed production checkpoint.
{
  const path = "docs/runbooks/current-status.md";
  let text = fs.readFileSync(path, "utf8");
  text = replaceOne(text, "Evidence    284", "Evidence    287", "current-status count block");
  text = replaceOne(text, "data/evidence.json      284", "data/evidence.json      287", "current-status data count");
  text = replaceOne(
    text,
    "Event Primary Remediation 01         production-verified — PRs #207–#209",
    "Event Primary Remediation 01         production-verified — PRs #207–#209\nEvent Primary Review 02                complete — PR #211\nEvent Primary Remediation 02           canonical application in progress",
    "current-status phase"
  );
  text = replaceOne(text, "Primary evidence                         203 / 284", "Primary evidence                         206 / 287", "current-status primary");
  text = replaceOne(text, "Tier 1 evidence                          220 / 284", "Tier 1 evidence                          223 / 287", "current-status tier1");
  text = replaceOne(text, "Official-domain evidence                 131 / 284", "Official-domain evidence                 131 / 287", "current-status official");
  text = replaceOne(text, "Evidence with archived_url               127 / 284", "Evidence with archived_url               130 / 287", "current-status archive");
  text = replaceOne(text, "Events without primary evidence           14 / 183", "Events without primary evidence           11 / 183", "current-status gaps");
  text = replaceOne(
    text,
    "The other seven reviewed candidates remain deferred pending stronger source-content support:\n\n```text\nbir_ev_000013\nbir_ev_000014\nbir_ev_000124\nbir_ev_000125\nbir_ev_000143\nbir_ev_000144\nbir_ev_000148\n```",
    "Event Primary Review 02 approved three additional event-scoped first-party copies without adding unique source URLs:\n\n```text\nbir_ev_000013  Poly Network first-party source copy\nbir_ev_000124  Transit Finance first-party source copy\nbir_ev_000125  Transit Finance first-party source copy\n```\n\nFour non-intentional reviewed candidates remain deferred pending stronger source-content support:\n\n```text\nbir_ev_000014\nbir_ev_000143\nbir_ev_000144\nbir_ev_000148\n```",
    "current-status remediation02"
  );
  text = replaceOne(
    text,
    "## Latest completed production checkpoint",
    "## Latest completed production checkpoint before Remediation 02",
    "current-status production label"
  );
  text = replaceOne(
    text,
    "1. review the remaining 14 events without primary evidence and remediate only gaps with defensible claim-relative primary sources;",
    "1. production-verify Event Primary Remediation 02, then review the remaining 11 events without primary evidence while preserving intentional secondary-only boundaries;",
    "current-status next"
  );
  fs.writeFileSync(path, text);
}

// Recovery checkpoint: synchronize canonical state and retain prior production proof as prior checkpoint.
{
  const path = "docs/runbooks/recovery-checkpoint.md";
  let text = fs.readFileSync(path, "utf8");
  text = replaceOne(text, "Evidence    284", "Evidence    287", "recovery count");
  text = replaceOne(
    text,
    "PR #209      Event Primary Remediation 01 production verification",
    "PR #209      Event Primary Remediation 01 production verification\nPR #211      Event Primary Review 02 — three approved\nPR #212      Event Tier 1 controlled-failure fixture strengthening",
    "recovery checkpoint list"
  );
  text = replaceOne(text, "Events without primary               14", "Events without primary               11", "recovery gaps");
  text = replaceOne(text, "Evidence with archived_url          127", "Evidence with archived_url          130", "recovery archive");
  text = replaceOne(
    text,
    "The source-quality ceiling is now `events_without_primary = 14`. Seven reviewed candidates remain deferred pending stronger source-content support. Intentional secondary-only boundaries remain explicit and must not be reclassified merely to improve coverage.",
    "Event Primary Review 02 approved event-scoped first-party copies for `bir_ev_000013`, `bir_ev_000124`, and `bir_ev_000125`. Remediation 02 raises evidence to 287 and tightens `events_without_primary` to 11 without increasing unique archive-risk queues. Four non-intentional reviewed candidates remain deferred: `bir_ev_000014`, `bir_ev_000143`, `bir_ev_000144`, and `bir_ev_000148`. Intentional secondary-only boundaries remain explicit and must not be reclassified merely to improve coverage.",
    "recovery remediation02"
  );
  text = replaceOne(
    text,
    "## Latest completed production checkpoint",
    "## Latest completed production checkpoint before Remediation 02",
    "recovery production label"
  );
  text = replaceOne(
    text,
    "1. review the remaining 14 event primary-evidence gaps under the same claim-relative evidence standard;",
    "1. production-verify Event Primary Remediation 02, then continue only with the four deferred non-intentional primary gaps and the explicitly intentional secondary-only set;",
    "recovery next"
  );
  fs.writeFileSync(path, text);
}

// Development roadmap: canonical counts/quality move forward; production checkpoint remains explicitly previous.
{
  const path = "docs/runbooks/development-roadmap.md";
  let text = fs.readFileSync(path, "utf8");
  text = replaceOne(text, "Evidence    284", "Evidence    287", "roadmap count");
  text = replaceOne(
    text,
    "         Event Primary Remediation 01              production-verified — PRs #207–#209",
    "         Event Primary Remediation 01              production-verified — PRs #207–#209\n         Event Primary Review 02                    complete — PR #211\n         Event Primary Remediation 02               canonical application in progress",
    "roadmap phase"
  );
  text = replaceOne(text, "Events without primary                14", "Events without primary                11", "roadmap gaps");
  text = replaceOne(text, "Evidence with archived_url           127", "Evidence with archived_url           130", "roadmap archive");
  text = replaceOne(
    text,
    "Event Primary Remediation 01 reviewed the nine non-intentional event primary gaps. Exactly two bounded remediations were approved and published: the corrected OFAC Ronin/Lazarus attribution source and the FBI Horizon attribution source. Events without primary evidence fell from 16 to 14. The other seven reviewed candidates remain deferred pending stronger source-content support.",
    "Event Primary Remediation 01 reduced event primary gaps from 16 to 14. Event Primary Review 02 then approved three event-scoped copies of already-canonical archived first-party evidence for Poly Network and Transit Finance. Remediation 02 raises evidence from 284 to 287, primary evidence from 203 to 206, Tier 1 evidence from 220 to 223, and reduces event primary gaps from 14 to 11 without increasing unique archive-risk queues. Four non-intentional reviewed candidates remain deferred pending stronger source-content support.",
    "roadmap remediation02"
  );
  text = replaceOne(
    text,
    "1. review the remaining 14 events without primary evidence under the same claim-relative primary-source standard;",
    "1. production-verify Event Primary Remediation 02, then review only the four deferred non-intentional gaps under the same claim-relative primary-source standard;",
    "roadmap next"
  );
  text = replaceOne(
    text,
    "## Latest completed production checkpoint",
    "## Latest completed production checkpoint before Remediation 02",
    "roadmap production label"
  );
  fs.writeFileSync(path, text);
}

// Public consistency contract: update only the current canonical baseline; historical Batch 12 proof stays historical.
{
  const path = "docs/runbooks/public-consistency-remediation.md";
  let text = fs.readFileSync(path, "utf8");
  text = replaceOne(
    text,
    "Bridges            33\nIncidents          34\nEvents            183\nEvidence          284\nArchived evidence  91",
    "Bridges            33\nIncidents          34\nEvents            183\nEvidence          287\nArchived evidence 130",
    "public-consistency baseline"
  );
  fs.writeFileSync(path, text);
}

const audit = `# Phase 3 Event Primary Remediation 02 — Canonical Application\n\nDate: 2026-08-09\nReview PR: #211\nReview audit: \`docs/audits/phase3-event-primary-review-02-2026-08-09.md\`\n\n## Canonical changes\n\n- added \`bir_src_000285\`, an event-scoped primary/Tier 1 copy of already-canonical Poly Network source \`bir_src_000270\`, linked to \`bir_ev_000013\`;\n- added \`bir_src_000286\`, an event-scoped primary/Tier 1 copy of already-canonical Transit Finance source \`bir_src_000279\`, linked to \`bir_ev_000124\`;\n- added \`bir_src_000287\`, a separate event-scoped copy of the same Transit Finance source linked to \`bir_ev_000125\`;\n- synchronized source counts for \`bir_inc_000005\`, \`bir_inc_000028\`, \`bir_ev_000013\`, \`bir_ev_000124\`, and \`bir_ev_000125\`;\n- tightened \`events_without_primary\` from 14 to 11;\n- synchronized the five permanent document-count contract files to canonical Evidence 287.\n\nThe three new records reuse exact source URLs and archived snapshots that were already canonical and reviewed. No unique risky-host or terminal unarchived URL is introduced. PR #212 already strengthened the event Tier 1 controlled-failure fixture on main before this fresh application.\n\n## Expected state\n\n\`\`\`text\nBridges                            33\nIncidents                          34\nEvents                            183\nEvidence                          287\nPrimary evidence                  206\nTier 1 evidence                   223\nEvidence with archived_url        130\nEvents without primary             11\nEvents without Tier 1               6\nTerminal unarchived unique URLs     15\nRisky-host unarchived unique URLs   16\nUnknown URL status                   0\n\`\`\`\n\n## Safety boundary\n\nNo event wording, dates, amounts, lifecycle status, recovery state, reimbursement state, or existing evidence classification is changed. No secondary/security-firm source is upgraded to primary. The document changes are required by the existing post-build consistency contract and distinguish the new canonical state from the prior completed production checkpoint. The one-shot applicator removes itself before commit.\n`;
fs.writeFileSync(auditPath, audit);

console.log(JSON.stringify({
  evidence: evidence.length,
  added_ids: additions.map((item) => item.id),
  primary_gap_limit: 11,
  permanent_document_count_files: [
    "README.md",
    "docs/runbooks/current-status.md",
    "docs/runbooks/recovery-checkpoint.md",
    "docs/runbooks/development-roadmap.md",
    "docs/runbooks/public-consistency-remediation.md"
  ]
}, null, 2));
