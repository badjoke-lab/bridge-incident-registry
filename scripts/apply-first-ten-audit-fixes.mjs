import fs from "node:fs";
import path from "node:path";

const filePath = path.join(process.cwd(), "data/incidents.json");
const incidents = JSON.parse(fs.readFileSync(filePath, "utf8"));
const incident = incidents.find((record) => record.id === "bir_inc_000012");

if (!incident) {
  throw new Error("bir_inc_000012 not found");
}

incident.last_reviewed_at = "2026-06-15";
incident.last_verified_at = "2026-06-15";
incident.restart_status = "paused";
incident.current_outcome = "paused_long_term";
incident.unresolved_reason = [
  "The final recovery path remained subject to community governance in the reviewed official report.",
  "The investigation and complete technical follow-up were still pending.",
  "Normal trading remained temporarily paused at the latest verification."
];

fs.writeFileSync(filePath, `${JSON.stringify(incidents, null, 2)}\n`);
console.log("Applied THORChain first-ten audit corrections.");
