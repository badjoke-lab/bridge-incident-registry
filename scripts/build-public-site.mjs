import { spawnSync } from "node:child_process";
import process from "node:process";

// Batch 14 deployment refresh: execution order and public contract are unchanged.
const steps = [
  "scripts/build-public-data.mjs",
  "scripts/publish-machine-data.mjs",
  "scripts/publish-discovery.mjs",
  "scripts/publish-redirects.mjs",
  "scripts/check-machine-data.mjs",
  "scripts/check-discovery.mjs",
  "scripts/check-redirects.mjs"
];

for (const step of steps) {
  const result = spawnSync(process.execPath, [step], {
    stdio: "inherit",
    env: process.env
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
