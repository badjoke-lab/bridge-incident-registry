import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const branch = process.env.GITHUB_HEAD_REF || null;

const runGit = (args, options = {}) =>
  execFileSync("git", args, {
    cwd: root,
    encoding: "utf8",
    stdio: options.stdio ?? "pipe",
  });

if (process.env.GITHUB_ACTIONS === "true" && branch) {
  runGit(["fetch", "origin", branch], { stdio: "inherit" });
  runGit(["checkout", "-B", branch, `origin/${branch}`], { stdio: "inherit" });
}

const read = (file) => JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
const writeCompact = (file, rows) => {
  const text = `[\n${rows.map((row) => `  ${JSON.stringify(row)}`).join(",\n")}\n]\n`;
  fs.writeFileSync(path.join(root, file), text);
};

const events = read("data/events.json");
const incidents = read("data/incidents.json");
const evidence = read("data/evidence.json");

const evidenceById = new Map(evidence.map((source) => [source.id, source]));
const eventById = new Map(events.map((event) => [event.id, event]));
const incidentById = new Map(incidents.map((incident) => [incident.id, incident]));

const additions = [
  ["bir_src_000242", "bir_src_000120", "bir_ev_000097", "security_context", "Event-scoped duplicate supporting Dragonberry discovery, risk characterization, and the absence of known exploitation."],
  ["bir_src_000243", "bir_src_000119", "bir_ev_000098", "security_patch", "Event-scoped duplicate supporting confidential validator and chain-team patch coordination."],
  ["bir_src_000244", "bir_src_000120", "bir_ev_000098", "security_patch", "Event-scoped duplicate independently supporting the private mitigation timeline."],
  ["bir_src_000245", "bir_src_000119", "bir_ev_000099", "security_patch", "Event-scoped duplicate supporting affected release lines and the coordinated public patch response."],
  ["bir_src_000246", "bir_src_000120", "bir_ev_000099", "security_patch", "Event-scoped duplicate supporting the October 14 public release and remediation sequence."],
  ["bir_src_000247", "bir_src_000122", "bir_ev_000102", "security_patch", "Event-scoped duplicate supporting affected Huckleberry versions and patched release lines."],
  ["bir_src_000248", "bir_src_000149", "bir_ev_000125", "incident_case", "Event-scoped duplicate supporting Transit Swap disclosure, attacker tracing, and early response."],
  ["bir_src_000249", "bir_src_000150", "bir_ev_000125", "incident_case", "Event-scoped duplicate independently supporting the disclosed routing and approval exploit."],
  ["bir_src_000250", "bir_src_000150", "bir_ev_000126", "recovery", "Event-scoped duplicate supporting the approximately 70 percent asset return."],
  ["bir_src_000251", "bir_src_000156", "bir_ev_000130", "incident_case", "Event-scoped duplicate supporting the MagpieRouterV2 exploit, affected wallets, and amount."],
  ["bir_src_000252", "bir_src_000156", "bir_ev_000131", "shutdown", "Event-scoped duplicate supporting the Magpie dApp pause during containment."],
  ["bir_src_000253", "bir_src_000157", "bir_ev_000131", "shutdown", "Event-scoped duplicate independently supporting the incident-response shutdown before relaunch."],
  ["bir_src_000254", "bir_src_000156", "bir_ev_000132", "reimbursement", "Event-scoped duplicate supporting full reimbursement with original assets."],
  ["bir_src_000255", "bir_src_000157", "bir_ev_000132", "reimbursement", "Event-scoped duplicate independently confirming completion of full refunds."],
  ["bir_src_000256", "bir_src_000182", "bir_ev_000153", "shutdown", "Event-scoped duplicate supporting suspension of Taiko bridge withdrawals during containment."],
];

for (const [newId, templateId, eventId, claimScope, note] of additions) {
  if (evidenceById.has(newId)) continue;
  const template = evidenceById.get(templateId);
  if (!template) throw new Error(`Missing evidence template ${templateId}`);
  if (!eventById.has(eventId)) throw new Error(`Missing target event ${eventId}`);
  const clone = {
    ...template,
    id: newId,
    event_id: eventId,
    claim_scope: claimScope,
    notes: note,
  };
  evidence.push(clone);
  evidenceById.set(newId, clone);
}

const affectedIncidents = new Set([
  "bir_inc_000028",
  "bir_inc_000029",
  "bir_inc_000033",
]);
const incidentDirectCounts = new Map(incidents.map((incident) => [incident.id, 0]));
for (const source of evidence) {
  if (source.incident_id && incidentDirectCounts.has(source.incident_id)) {
    incidentDirectCounts.set(source.incident_id, incidentDirectCounts.get(source.incident_id) + 1);
  }
}
for (const incidentId of affectedIncidents) {
  const incident = incidentById.get(incidentId);
  if (!incident) throw new Error(`Missing incident ${incidentId}`);
  incident.source_count = incidentDirectCounts.get(incidentId);
}

if (evidence.length !== 256) throw new Error(`Expected 256 evidence records, received ${evidence.length}`);
if (events.length !== 183) throw new Error(`Expected 183 events, received ${events.length}`);
if (incidents.length !== 34) throw new Error(`Expected 34 incidents, received ${incidents.length}`);

const eventDirectCounts = new Map(events.map((event) => [event.id, 0]));
for (const source of evidence) {
  if (source.event_id && eventDirectCounts.has(source.event_id)) {
    eventDirectCounts.set(source.event_id, eventDirectCounts.get(source.event_id) + 1);
  }
}
const eventMismatches = events.filter((event) => event.source_count !== eventDirectCounts.get(event.id));
const incidentMismatches = incidents.filter(
  (incident) => incident.source_count !== incidentDirectCounts.get(incident.id),
);
if (eventMismatches.length !== 7) {
  throw new Error(`Expected 7 event source-count mismatches, received ${eventMismatches.length}`);
}
if (incidentMismatches.length !== 0) {
  throw new Error(`Expected 0 incident source-count mismatches, received ${incidentMismatches.length}`);
}

writeCompact("data/incidents.json", incidents);
writeCompact("data/evidence.json", evidence);

console.log(
  JSON.stringify(
    {
      bridges: read("data/bridges.json").length,
      incidents: incidents.length,
      events: events.length,
      evidence: evidence.length,
      event_source_count_mismatches: eventMismatches.length,
      incident_source_count_mismatches: incidentMismatches.length,
      added_evidence_ids: additions.map(([id]) => id),
    },
    null,
    2,
  ),
);

if (process.env.GITHUB_ACTIONS === "true" && branch) {
  const changed = runGit(["status", "--porcelain", "--", "data/incidents.json", "data/evidence.json"]).trim();
  if (changed) {
    runGit(["config", "user.name", "github-actions[bot]"]);
    runGit(["config", "user.email", "41898282+github-actions[bot]@users.noreply.github.com"]);
    runGit(["add", "data/incidents.json", "data/evidence.json"]);
    runGit(["commit", "-m", "data: add source-count Batch 4 evidence [batch4-applied]"], { stdio: "inherit" });
    try {
      runGit(["push", "origin", `HEAD:${branch}`], { stdio: "inherit" });
      console.log(`BATCH4_PUSH=success branch=${branch}`);
    } catch (error) {
      console.error(`BATCH4_PUSH=failed branch=${branch}`);
      console.error(error instanceof Error ? error.message : String(error));
    }
  } else {
    console.log(`BATCH4_PUSH=not_needed branch=${branch}`);
  }
}
