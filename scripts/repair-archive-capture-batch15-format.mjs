import fs from "node:fs";
import { execFileSync } from "node:child_process";

const evidencePath = "data/evidence.json";
const mappings = new Map([
  ["bir_src_000023", ["https://www.elliptic.co/blog/analysis/attack-mints-569-million-worth-of-bnb-tokens-in-bsc-bridge-exploit", "https://web.archive.org/web/20230922124338/https://www.elliptic.co/blog/analysis/attack-mints-569-million-worth-of-bnb-tokens-in-bsc-bridge-exploit"]],
  ["bir_src_000022", ["https://www.bnbchain.org/en/blog/bnb-chain-a-decentralized-response", "https://web.archive.org/web/20221011125745/https://www.bnbchain.org/en/blog/bnb-chain-a-decentralized-response/"]],
  ["bir_src_000205", ["https://www.bnbchain.org/en/blog/bnb-chain-a-decentralized-response", "https://web.archive.org/web/20221011125745/https://www.bnbchain.org/en/blog/bnb-chain-a-decentralized-response/"]],
  ["bir_src_000214", ["https://www.bnbchain.org/en/blog/bnb-chain-a-decentralized-response", "https://web.archive.org/web/20221011125745/https://www.bnbchain.org/en/blog/bnb-chain-a-decentralized-response/"]],
  ["bir_src_000091", ["https://slowmist.medium.com/slowmist-the-root-cause-of-the-pgala-event-is-that-the-plaintext-of-the-private-key-was-leaked-on-6e117ccf5473", "https://web.archive.org/web/20250913010536/https://slowmist.medium.com/slowmist-the-root-cause-of-the-pgala-event-is-that-the-plaintext-of-the-private-key-was-leaked-on-6e117ccf5473"]],
  ["bir_src_000206", ["https://www.bnbchain.org/en/blog/technology-update-of-bnb-chain-in-october-2022", "https://web.archive.org/web/20221108164017/https://bnbchain.org/en/blog/technology-update-of-bnb-chain-in-october-2022/"]],
  ["bir_src_000014", ["https://www.fbi.gov/news/press-releases/fbi-confirms-lazarus-group-cyber-actors-responsible-for-harmonys-horizon-bridge-currency-theft", "https://web.archive.org/web/20230124144331/https://www.fbi.gov/news/press-releases/fbi-confirms-lazarus-group-cyber-actors-responsible-for-harmonys-horizon-bridge-currency-theft"]],
  ["bir_src_000149", ["https://slowmist.medium.com/cross-chain-dex-aggregator-transit-swap-hacked-analysis-74ba39c22020", "https://web.archive.org/web/20221002090056/https://slowmist.medium.com/cross-chain-dex-aggregator-transit-swap-hacked-analysis-74ba39c22020"]],
  ["bir_src_000167", ["https://medium.com/dcentralab-diligence/dcentralab-diligence-analysis-rubic-dex-aggregator-hack-d5ffd2505239", "https://web.archive.org/web/20221226210143/https://medium.com/dcentralab-diligence/dcentralab-diligence-analysis-rubic-dex-aggregator-hack-d5ffd2505239"]]
]);

const canonicalMain = execFileSync("git", ["show", "origin/main:data/evidence.json"], { encoding: "utf8" });
const lines = canonicalMain.trimEnd().split("\n");
const changed = [];
const output = lines.map((line) => {
  const trimmed = line.trim();
  if (!trimmed.startsWith("{")) return line;
  const hasComma = trimmed.endsWith(",");
  const jsonText = hasComma ? trimmed.slice(0, -1) : trimmed;
  const item = JSON.parse(jsonText);
  const mapping = mappings.get(item.id);
  if (!mapping) return line;
  const [expectedUrl, archiveUrl] = mapping;
  if (item.url !== expectedUrl) throw new Error(`${item.id} URL mismatch: ${item.url}`);
  if (Object.hasOwn(item, "archived_url")) throw new Error(`${item.id} unexpectedly already archived on main`);
  item.archived_url = archiveUrl;
  changed.push(item.id);
  return `  ${JSON.stringify(item)}${hasComma ? "," : ""}`;
});

if (changed.length !== 9 || new Set(changed).size !== 9) {
  throw new Error(`Expected 9 repaired record lines, got ${changed.length}: ${changed.join(", ")}`);
}
for (const id of mappings.keys()) {
  if (!changed.includes(id)) throw new Error(`Missing repaired ID: ${id}`);
}

fs.writeFileSync(evidencePath, `${output.join("\n")}\n`);
const parsed = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
if (parsed.length !== 284) throw new Error(`Expected 284 evidence records, got ${parsed.length}`);
for (const [id, [, archiveUrl]] of mappings) {
  const item = parsed.find((entry) => entry.id === id);
  if (item?.archived_url !== archiveUrl) throw new Error(`Archive mismatch after repair: ${id}`);
}
console.log(JSON.stringify({ repaired_ids: changed, evidence_records: parsed.length }, null, 2));
