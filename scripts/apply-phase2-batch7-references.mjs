import fs from "node:fs";
import path from "node:path";

const target = path.join(process.cwd(), "data/reference/chains.json");
const chains = JSON.parse(fs.readFileSync(target, "utf8"));

chains.taiko ??= {
  display_name: "Taiko",
  aliases: ["Taiko Alethia", "Taiko Network"]
};
chains.base ??= {
  display_name: "Base",
  aliases: ["Base Mainnet"]
};
chains["commons-chain"] ??= {
  display_name: "Commons Chain",
  aliases: ["Commons", "Syndicate Commons"]
};

fs.writeFileSync(target, `${JSON.stringify(chains, null, 2)}\n`);
console.log("Applied Phase 2 Batch 7 chain references.");
