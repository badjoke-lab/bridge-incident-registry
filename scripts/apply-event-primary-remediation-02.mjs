import fs from "node:fs";

const read = (path) => JSON.parse(fs.readFileSync(path, "utf8"));
const writeCompactArray = (path, data) => {
  fs.writeFileSync(path, `[\n${data.map((item) => `  ${JSON.stringify(item)}`).join(",\n")}\n]\n`);
};
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
const replaceRequired = (path, pattern, replacement, label) => {
  const before = fs.readFileSync(path, "utf8");
  const after = before.replace(pattern, replacement);
  assert(after !== before, `documentation sync failed: ${label}`);
  fs.writeFileSync(path, after);
};
const replaceCount = (path, label, beforeCount, afterCount) => {
  replaceRequired(
    path,
    new RegExp(`\\b${label}(\\s+)${beforeCount}\\b`),
    (_match, spacing) => `${label}${spacing}${afterCount}`,
    `${path} ${label} ${beforeCount}->${afterCount}`
  );
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

// Keep every permanent current-state/count document aligned with the canonical count.
const countDocs = [
  "README.md",
  "docs/runbooks/current-status.md",
  "docs/runbooks/recovery-checkpoint.md",
  "docs/runbooks/development-roadmap.md",
  "docs/runbooks/public-consistency-remediation.md",
  "docs/operations/current-position.md",
  "docs/operations/current-schedule.md"
];
for (const path of countDocs) replaceCount(path, "Evidence", 284, 287);

replaceRequired("README.md", "Evidence remains 284. Event primary gaps are 16, event Tier 1 gaps are six", "Evidence is 287. Event primary gaps are 11, event Tier 1 gaps are six", "README current quality sentence");
replaceRequired("README.md", "One hundred twenty-seven evidence records now include verified archive URLs.", "One hundred thirty evidence records now include verified archive URLs.", "README archive count sentence");
replaceRequired("README.md", /Events without primary\s+16/, "Events without primary           11", "README primary-gap count");
replaceRequired("README.md", /Evidence with archived_url\s+127/, "Evidence with archived_url      130", "README archived count");

replaceRequired("docs/runbooks/current-status.md", /Primary evidence\s+203 \/ 284/, "Primary evidence                         206 / 287", "current-status primary evidence");
replaceRequired("docs/runbooks/current-status.md", /Tier 1 evidence\s+220 \/ 284/, "Tier 1 evidence                          223 / 287", "current-status tier1 evidence");
replaceRequired("docs/runbooks/current-status.md", /Official-domain evidence\s+131 \/ 284/, "Official-domain evidence                 131 / 287", "current-status official-domain denominator");
replaceRequired("docs/runbooks/current-status.md", /Evidence with archived_url\s+127 \/ 284/, "Evidence with archived_url               130 / 287", "current-status archive evidence");
replaceRequired("docs/runbooks/current-status.md", /Events without primary evidence\s+14 \/ 183/, "Events without primary evidence           11 / 183", "current-status event primary gaps");
replaceRequired("docs/runbooks/current-status.md", "Event Primary Remediation 01         production-verified — PRs #207–#209", "Event Primary Remediation 01         production-verified — PRs #207–#209\nEvent Primary Remediation 02         canonical migration complete; production verification pending", "current-status phase marker");
replaceRequired("docs/runbooks/current-status.md", "## Next\n\n1. review the remaining 14 events without primary evidence", "## Next\n\n1. review the remaining 11 events without primary evidence", "current-status next gap count");

replaceRequired("docs/runbooks/recovery-checkpoint.md", /Events without primary\s+14/, "Events without primary               11", "recovery primary gaps");
replaceRequired("docs/runbooks/recovery-checkpoint.md", /Evidence with archived_url\s+127/, "Evidence with archived_url          130", "recovery archive evidence");
replaceRequired("docs/runbooks/recovery-checkpoint.md", "## Cloudflare Pages boundary", "## Event Primary Remediation 02 boundary\n\nReview PR #211 approved three event-scoped first-party additions using already-canonical Poly Network and Transit Finance source URLs with exact verified archive mappings. The canonical migration adds `bir_src_000285`–`bir_src_000287`, raises evidence to 287, lowers events without primary evidence from 14 to 11, and leaves terminal/risky-host unique URL ceilings unchanged. Production verification is still required after merge.\n\n## Cloudflare Pages boundary", "recovery remediation02 boundary");
replaceRequired("docs/runbooks/recovery-checkpoint.md", "1. review the remaining 14 event primary-evidence gaps", "1. review the remaining 11 event primary-evidence gaps", "recovery next gap count");

replaceRequired("docs/runbooks/development-roadmap.md", /Events without primary\s+14/, "Events without primary                11", "roadmap primary gaps");
replaceRequired("docs/runbooks/development-roadmap.md", /Evidence with archived_url\s+127/, "Evidence with archived_url           130", "roadmap archive evidence");
replaceRequired("docs/runbooks/development-roadmap.md", "Event Primary Remediation 01              production-verified — PRs #207–#209", "Event Primary Remediation 01              production-verified — PRs #207–#209\n         Event Primary Remediation 02              canonical migration complete; production verification pending", "roadmap phase marker");
replaceRequired("docs/runbooks/development-roadmap.md", "1. review the remaining 14 events without primary evidence", "1. review the remaining 11 events without primary evidence", "roadmap next gap count");

replaceRequired("docs/runbooks/public-consistency-remediation.md", /Archived evidence\s+91/, "Archived evidence 130", "public consistency current archived count");

replaceRequired("docs/operations/current-position.md", "Evidence with `archived_url` remains 127 / 284.", "Canonical evidence with `archived_url` is now 130 / 287.", "current-position archive state");
replaceRequired("docs/operations/current-position.md", "The latest completed canonical publication checkpoint is Event Primary Remediation 01:", "The latest production-verified checkpoint remains Event Primary Remediation 01; Event Primary Remediation 02 is the current canonical migration and still requires production verification:\n\nLatest verified production checkpoint:", "current-position checkpoint wording");
replaceRequired("docs/operations/current-position.md", "1. review the remaining 14 events without primary evidence", "1. review the remaining 11 events without primary evidence", "current-position next gap count");

replaceRequired("docs/operations/current-schedule.md", /Evidence with archived_url\s+127/, "Evidence with archived_url           130", "current-schedule archive evidence");
replaceRequired("docs/operations/current-schedule.md", /Events without primary\s+14/, "Events without primary                11", "current-schedule primary gaps");
replaceRequired("docs/operations/current-schedule.md", "- Event Primary Remediation 01: complete and production-verified", "- Event Primary Remediation 01: complete and production-verified\n  - Event Primary Remediation 02: canonical migration complete; production verification pending", "current-schedule remediation marker");
replaceRequired("docs/operations/current-schedule.md", "1. inventory the remaining 14 events without primary evidence;", "1. inventory the remaining 11 events without primary evidence;", "current-schedule next gap count");

const audit = `# Phase 3 Event Primary Remediation 02 — Canonical Application\n\nDate: 2026-08-09\nReview PR: #211\nReview audit: \`docs/audits/phase3-event-primary-review-02-2026-08-09.md\`\n\n## Canonical changes\n\n- added \`bir_src_000285\`, an event-scoped primary/Tier 1 duplicate of already-canonical Poly Network source \`bir_src_000270\`, linked to \`bir_ev_000013\`;\n- added \`bir_src_000286\`, an event-scoped primary/Tier 1 duplicate of already-canonical Transit Finance source \`bir_src_000279\`, linked to \`bir_ev_000124\`;\n- added \`bir_src_000287\`, a separate event-scoped duplicate of the same Transit Finance source linked to \`bir_ev_000125\`;\n- updated direct source counts for \`bir_inc_000005\`, \`bir_inc_000028\`, \`bir_ev_000013\`, \`bir_ev_000124\`, and \`bir_ev_000125\`;\n- tightened \`events_without_primary\` from 14 to 11;\n- synchronized permanent count/checkpoint documents required by post-build consistency.\n\nThe three new records reuse exact source URLs and archived snapshots that were already canonical and reviewed. No unique risky-host or terminal unarchived URL is introduced.\n\n## Expected state\n\n\`\`\`text\nBridges                            33\nIncidents                          34\nEvents                            183\nEvidence                          287\nPrimary evidence                  206\nTier 1 evidence                   223\nEvidence with archived_url        130\nEvents without primary             11\nEvents without Tier 1               6\nTerminal unarchived unique URLs     15\nRisky-host unarchived unique URLs   16\nUnknown URL status                   0\n\`\`\`\n\n## Safety boundary\n\nNo event wording, dates, amounts, lifecycle status, recovery state, reimbursement state, or existing evidence classification is changed. No secondary/security-firm source is upgraded to primary. The one-shot applicator removes itself before commit. Permanent state documents are synchronized to the new canonical count while the latest production-verified checkpoint remains explicitly identified until live verification completes.\n`;
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
  events_without_primary_limit: 11,
  synchronized_docs: countDocs
}, null, 2));
