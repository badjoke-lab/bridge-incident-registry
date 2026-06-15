import process from "node:process";
import { DefaultArtifactClient } from "@actions/artifact";

if (process.env.GITHUB_ACTIONS === "true") {
  const client = new DefaultArtifactClient();
  await client.uploadArtifact(
    "phase2-batch2-generated",
    [
      "data/bridges.json",
      "data/incidents.json",
      "data/events.json",
      "data/evidence.json"
    ],
    process.cwd(),
    { retentionDays: 1 }
  );
}
