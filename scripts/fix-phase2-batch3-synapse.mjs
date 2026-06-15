import fs from "node:fs";

function read(path) {
  return JSON.parse(fs.readFileSync(path, "utf8"));
}

function write(path, records) {
  fs.writeFileSync(path, `[\n${records.map((record) => `  ${JSON.stringify(record)}`).join(",\n")}\n]\n`);
}

const bridges = read("data/bridges.json");
const events = read("data/events.json");
const evidence = read("data/evidence.json");

const synapse = bridges.find((record) => record.id === "bir_bridge_000019");
const launch = events.find((record) => record.id === "bir_ev_000082");
const introSource = evidence.find((record) => record.id === "bir_src_000102");
const launchSource = evidence.find((record) => record.id === "bir_src_000103");

if (!synapse || !launch || !introSource || !launchSource) {
  throw new Error("Expected Synapse Batch 3 records were not found.");
}

synapse.launch_date = "2021-08-29";
launch.event_date = "2021-08-29";
introSource.url = "https://medium.com/synapse-protocol/introducing-synapse-protocol-2af926143deb";
launchSource.url = "https://medium.com/synapse-protocol/synapses-mainnet-launch-the-hadean-phase-d09fc74b2272";

write("data/bridges.json", bridges);
write("data/events.json", events);
write("data/evidence.json", evidence);
