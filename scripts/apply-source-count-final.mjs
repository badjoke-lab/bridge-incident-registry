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
  ["bir_src_000257", "bir_src_000182", "bir_ev_000154", "amount", "Event-scoped duplicate supporting Taiko's approximate USD 1.7 million loss estimate before containment."],
  ["bir_src_000258", "bir_src_000183", "bir_ev_000155", "restart", "Event-scoped duplicate supporting restored backing, reviewed fixes, and the reopening boundary."],
  ["bir_src_000259", "bir_src_000183", "bir_ev_000158", "status", "Event-scoped duplicate supporting temporary conservative withdrawal quotas after reopening."],
  ["bir_src_000260", "bir_src_000189", "bir_ev_000159", "launch_date", "Event-scoped duplicate supporting the historical Connext launch and publication chronology."],
  ["bir_src_000261", "bir_src_000193", "bir_ev_000168", "shutdown", "Event-scoped duplicate supporting the Commons Bridge and liquidity pause during containment."],
  ["bir_src_000262", "bir_src_000193", "bir_ev_000170", "reimbursement", "Event-scoped duplicate supporting committed SYND reserves for affected users."],
  ["bir_src_000263", "bir_src_000195", "bir_ev_000171", "reimbursement", "Event-scoped duplicate supporting automatic reimbursement to Base wallets plus 15 percent."],
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

const affectedIncidents = new Set(["bir_inc_000033", "bir_inc_000034"]);
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

if (evidence.length !== 263) throw new Error(`Expected 263 evidence records, received ${evidence.length}`);
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
if (eventMismatches.length !== 0) {
  throw new Error(`Expected 0 event source-count mismatches, received ${eventMismatches.length}`);
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
      event_source_count_mismatches: 0,
      incident_source_count_mismatches: 0,
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
    runGit(["commit", "-m", "data: close final source-count mismatches [source-count-equal]"], { stdio: "inherit" });
    try {
      runGit(["push", "origin", `HEAD:${branch}`], { stdio: "inherit" });
      console.log(`FINAL_SOURCE_COUNT_PUSH=success branch=${branch}`);
    } catch (error) {
      console.error(`FINAL_SOURCE_COUNT_PUSH=failed branch=${branch}`);
      console.error(error instanceof Error ? error.message : String(error));
    }
  } else {
    console.log(`FINAL_SOURCE_COUNT_PUSH=not_needed branch=${branch}`);
  }
}
