import { spawnSync } from "node:child_process";
import process from "node:process";

const steps = [
  "scripts/build-public-data.mjs",
  "scripts/publish-machine-data.mjs",
  "scripts/publish-discovery.mjs",
  "scripts/check-machine-data.mjs",
  "scripts/check-discovery.mjs"
];

for (const step of steps) {
  const result = spawnSync(process.execPath, [step], {
    stdio: "inherit",
    env: process.env
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
