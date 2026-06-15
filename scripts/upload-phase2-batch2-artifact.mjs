import path from "node:path";
import process from "node:process";
import { DefaultArtifactClient } from "@actions/artifact";

if (process.env.GITHUB_ACTIONS === "true") {
  const root = process.cwd();
  const client = new DefaultArtifactClient();
  await client.uploadArtifact(
    "phase2-batch2-generated",
    [
      path.join(root, "data/bridges.json"),
      path.join(root, "data/incidents.json"),
      path.join(root, "data/events.json"),
      path.join(root, "data/evidence.json")
    ],
    root,
    { retentionDays: 1 }
  );
}
