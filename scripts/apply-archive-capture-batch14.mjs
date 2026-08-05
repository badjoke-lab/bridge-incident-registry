import fs from "node:fs";

const EVIDENCE_PATH = "data/evidence.json";
const QUALITY_PATH = "scripts/check-source-quality-baseline.mjs";

const mappings = new Map([
  [
    "bir_src_000036",
    {
      source_url: "https://certik.medium.com/qubit-bridge-collapse-exploited-to-the-tune-of-80-million-a7ab9068e1a0",
      archived_url: "https://web.archive.org/web/20220128170828/https://certik.medium.com/qubit-bridge-collapse-exploited-to-the-tune-of-80-million-a7ab9068e1a0"
    }
  ],
  [
    "bir_src_000013",
    {
      source_url: "https://www.cnbc.com/2022/06/24/hackers-steal-100-million-in-crypto-from-harmonys-horizon-bridge.html",
      archived_url: "https://web.archive.org/web/20220624104205/https://www.cnbc.com/2022/06/24/hackers-steal-100-million-in-crypto-from-harmonys-horizon-bridge.html"
    }
  ],
  [
    "bir_src_000021",
    {
      source_url: "https://www.bnbchain.org/en/blog/bnb-chain-ecosystem-update",
      archived_url: "https://web.archive.org/web/20221007090234/https://www.bnbchain.org/en/blog/bnb-chain-ecosystem-update/"
    }
  ],
  [
    "bir_src_000215",
    {
      source_url: "https://www.bnbchain.org/en/blog/bnb-chain-ecosystem-update",
      archived_url: "https://web.archive.org/web/20221007090234/https://www.bnbchain.org/en/blog/bnb-chain-ecosystem-update/"
    }
  ],
  [
    "bir_src_000057",
    {
      source_url: "https://medium.com/@Knownsec_Blockchain_Lab/knownsec-blockchain-lab-li-finance-attack-incident-6304c6c728c9",
      archived_url: "https://web.archive.org/web/20221101043044/https://medium.com/@Knownsec_Blockchain_Lab/knownsec-blockchain-lab-li-finance-attack-incident-6304c6c728c9"
    }
  ],
  [
    "bir_src_000226",
    {
      source_url: "https://medium.com/@Knownsec_Blockchain_Lab/knownsec-blockchain-lab-li-finance-attack-incident-6304c6c728c9",
      archived_url: "https://web.archive.org/web/20221101043044/https://medium.com/@Knownsec_Blockchain_Lab/knownsec-blockchain-lab-li-finance-attack-incident-6304c6c728c9"
    }
  ],
  [
    "bir_src_000059",
    {
      source_url: "https://blocksecteam.medium.com/li-fi-attack-a-cross-chain-bridge-vulnerability-no-its-due-to-unchecked-external-call-c31e7dadf60f",
      archived_url: "https://web.archive.org/web/20220325073816/https://blocksecteam.medium.com/li-fi-attack-a-cross-chain-bridge-vulnerability-no-its-due-to-unchecked-external-call-c31e7dadf60f"
    }
  ]
]);

const evidence = JSON.parse(fs.readFileSync(EVIDENCE_PATH, "utf8"));
if (!Array.isArray(evidence) || evidence.length !== 284) {
  throw new Error(`Unexpected evidence corpus size: ${Array.isArray(evidence) ? evidence.length : "not-array"}`);
}

const evidenceById = new Map(evidence.map((record) => [record.id, record]));
for (const [id, mapping] of mappings) {
  const record = evidenceById.get(id);
  if (!record) throw new Error(`Missing evidence record: ${id}`);
  if (record.url !== mapping.source_url) {
    throw new Error(`${id}: source URL drift; expected ${mapping.source_url}, observed ${record.url}`);
  }
  if (record.archived_url !== undefined && record.archived_url !== null && record.archived_url !== "") {
    throw new Error(`${id}: archived_url already populated: ${record.archived_url}`);
  }
  record.archived_url = mapping.archived_url;
}

const updatedIds = evidence
  .filter((record) => mappings.has(record.id) && mappings.get(record.id).archived_url === record.archived_url)
  .map((record) => record.id);
if (updatedIds.length !== mappings.size) {
  throw new Error(`Expected ${mappings.size} updated records, observed ${updatedIds.length}`);
}

fs.writeFileSync(EVIDENCE_PATH, `[\n  ${evidence.map((record) => JSON.stringify(record)).join(",\n  ")}\n]\n`);

let qualitySource = fs.readFileSync(QUALITY_PATH, "utf8");
const replacements = [
  ["  terminal_unarchived: 36,", "  terminal_unarchived: 33,"],
  ["  risky_host_unarchived: 27,", "  risky_host_unarchived: 24,"]
];
for (const [oldCeiling, newCeiling] of replacements) {
  const occurrences = qualitySource.split(oldCeiling).length - 1;
  if (occurrences !== 1) {
    throw new Error(`Expected one ceiling occurrence for ${oldCeiling.trim()}, observed ${occurrences}`);
  }
  qualitySource = qualitySource.replace(oldCeiling, newCeiling);
}
fs.writeFileSync(QUALITY_PATH, qualitySource);

console.log(JSON.stringify({
  evidence_records: evidence.length,
  updated_ids: updatedIds,
  ceilings: {
    terminal_unarchived: { before: 36, after: 33 },
    risky_host_unarchived: { before: 27, after: 24 }
  }
}, null, 2));
