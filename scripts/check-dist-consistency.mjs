import process from "node:process";
import { checkDistConsistency } from "./lib/dist-consistency.mjs";

const result = checkDistConsistency();
if (result.errors.length > 0) {
  console.error("Post-build consistency check failed:");
  for (const error of result.errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Post-build consistency check passed.");
console.log(`Records: ${result.summary.bridges} bridges, ${result.summary.incidents} incidents, ${result.summary.events} events, ${result.summary.evidence} evidence sources.`);
console.log(`Published: ${result.summary.routes} canonical HTML routes across ${result.summary.files} files.`);
