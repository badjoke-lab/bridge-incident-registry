import fs from "node:fs";

const path = "README.md";
let text = fs.readFileSync(path, "utf8");
const replaceOne = (pattern, replacement, label) => {
  const matches = [...text.matchAll(new RegExp(pattern.source, pattern.flags.includes("g") ? pattern.flags : `${pattern.flags}g`))];
  if (matches.length !== 1) throw new Error(`${label}: expected one boundary, found ${matches.length}`);
  text = text.replace(pattern, replacement);
};

replaceOne(
  /Event Primary Remediation 01 is production-verified, and Remediation 02 adds three reviewed event-scoped first-party evidence records without introducing new unique source URLs\./,
  "Event Primary Remediations 01 and 02 are production-verified. Remediation 02 added three reviewed event-scoped first-party evidence records without introducing new unique source URLs.",
  "remediation status"
);

replaceOne(
  /There is no untouched archive-review Batch 19\.[^\n]*\n/,
  "There is no untouched archive-review Batch 19. Deferred Retries 01–02 recovered three reviewed URLs; Retries 03–04 then exhausted all 12 not-recently-retried fresh URLs without another accepted mapping. The remaining reviewed-unarchived pool has already been explicitly retried under the current boundary and should not be immediately recycled.\n",
  "archive retry boundary"
);

replaceOne(
  /Production verification compares every transformed field in all four public datasets with the generated public contract\.[^\n]*\n/,
  "Production verification compares every transformed field in all four public datasets with the generated public contract. Counts and IDs alone cannot prove publication. Event Primary Remediation 02 again demonstrated the boundary: attempts 1–2 still exposed 284 evidence and were rejected; attempt 3 exposed 287 evidence and passed complete four-dataset field-level equality at `generated_at 2026-08-09T07:08:45.362Z`. No build-input refresh was required. Cloudflare Pages preview deployment remains restricted to `none`.\n",
  "production verification paragraph"
);

replaceOne(
  /Latest verified production checkpoint before Remediation 02 publication verification:\n\n```text\n[\s\S]*?\n```/,
  [
    "Latest verified production checkpoint:",
    "",
    "```text",
    "Review PR              #211",
    "Canonical data PR      #213",
    "Canonical merge        f2874a2d0ffe6877eadf6619cd6100a9b9b3991b",
    "Production audit PR    #214",
    "Production verify      31300484236 / 93212360938",
    "Generated at           2026-08-09T07:08:45.362Z",
    "Publication attempt    3 / 20",
    "HTML routes            72",
    "Redirects              74",
    "Build-input refresh    not required",
    "```"
  ].join("\n"),
  "production checkpoint"
);

fs.writeFileSync(path, text);
console.log("README synchronized through Event Primary Remediation 02.");
