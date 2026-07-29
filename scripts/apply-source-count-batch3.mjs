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
  ["bir_src_000232", "bir_src_000088", "bir_ev_000071", "recovery", "Event-scoped duplicate supporting the emergency whitehat pool drain and recovered BNB amount."],
  ["bir_src_000233", "bir_src_000088", "bir_ev_000072", "recovery", "Event-scoped duplicate supporting the replacement contract and snapshot-based recovery plan."],
  ["bir_src_000234", "bir_src_000088", "bir_ev_000073", "reimbursement", "Event-scoped duplicate supporting the legal and compliance delay to the planned redistribution."],
  ["bir_src_000235", "bir_src_000100", "bir_ev_000079", "shutdown", "Event-scoped duplicate supporting the Ethereum Merge maintenance pause."],
  ["bir_src_000236", "bir_src_000104", "bir_ev_000085", "restart", "Event-scoped duplicate supporting validator restoration, transaction processing, and pool migration."],
  ["bir_src_000237", "bir_src_000109", "bir_ev_000087", "incident_case", "Event-scoped duplicate independently supporting the Nerve metapool exploit and amount."],
  ["bir_src_000238", "bir_src_000108", "bir_ev_000088", "root_cause", "Event-scoped duplicate supporting the inconsistent exchange-amount calculation root cause."],
  ["bir_src_000239", "bir_src_000112", "bir_ev_000091", "recovery", "Event-scoped duplicate supporting the protocol lock and coordinated freezing response."],
  ["bir_src_000240", "bir_src_000113", "bir_ev_000091", "recovery", "Event-scoped duplicate independently supporting the freeze and containment context."],
  ["bir_src_000241", "bir_src_000118", "bir_ev_000095", "launch_date", "Event-scoped duplicate supporting the March 29 inaugural IBC connection date."],
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

for (const [eventId, expected] of [
  ["bir_ev_000079", 1],
  ["bir_ev_000096", 1],
]) {
  const event = eventById.get(eventId);
  if (!event) throw new Error(`Missing event ${eventId}`);
  event.source_count = expected;
}

const affectedIncidents = new Set([
  "bir_inc_000022",
  "bir_inc_000025",
  "bir_inc_000026",
  "bir_inc_000027",
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

if (evidence.length !== 241) throw new Error(`Expected 241 evidence records, received ${evidence.length}`);
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
if (eventMismatches.length !== 17) {
  throw new Error(`Expected 17 event source-count mismatches, received ${eventMismatches.length}`);
}
if (incidentMismatches.length !== 0) {
  throw new Error(`Expected 0 incident source-count mismatches, received ${incidentMismatches.length}`);
}

writeCompact("data/events.json", events);
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
  const changed = runGit(["status", "--porcelain", "--", "data/events.json", "data/incidents.json", "data/evidence.json"]).trim();
  if (changed) {
    runGit(["config", "user.name", "github-actions[bot]"]);
    runGit(["config", "user.email", "41898282+github-actions[bot]@users.noreply.github.com"]);
    runGit(["add", "data/events.json", "data/incidents.json", "data/evidence.json"]);
    runGit(["commit", "-m", "data: add source-count Batch 3 evidence [batch3-applied]"], { stdio: "inherit" });
    try {
      runGit(["push", "origin", `HEAD:${branch}`], { stdio: "inherit" });
      console.log(`BATCH3_PUSH=success branch=${branch}`);
    } catch (error) {
      console.error(`BATCH3_PUSH=failed branch=${branch}`);
      console.error(error instanceof Error ? error.message : String(error));
    }
  } else {
    console.log(`BATCH3_PUSH=not_needed branch=${branch}`);
  }
}
