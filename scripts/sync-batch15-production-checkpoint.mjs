import fs from "node:fs";

const files = {
  readme: "README.md",
  status: "docs/runbooks/current-status.md",
  roadmap: "docs/runbooks/development-roadmap.md",
  recovery: "docs/runbooks/recovery-checkpoint.md",
  position: "docs/operations/current-position.md",
  schedule: "docs/operations/current-schedule.md",
  audit: "docs/audits/production-verification-phase3-archive-capture-batch15-2026-08-05.md"
};

function read(path) {
  return fs.readFileSync(path, "utf8");
}

function write(path, content) {
  fs.writeFileSync(path, content);
}

function replaceOnce(content, from, to, label) {
  const first = content.indexOf(from);
  if (first < 0) throw new Error(`Missing checkpoint text: ${label}`);
  if (content.indexOf(from, first + from.length) >= 0) {
    throw new Error(`Checkpoint text occurs more than once: ${label}`);
  }
  return content.slice(0, first) + to + content.slice(first + from.length);
}

const evidence = JSON.parse(read("data/evidence.json"));
const archived = evidence.filter((item) => typeof item.archived_url === "string" && item.archived_url.trim()).length;
const uniqueSnapshots = new Set(
  evidence
    .map((item) => (typeof item.archived_url === "string" ? item.archived_url.trim() : ""))
    .filter(Boolean)
).size;
if (archived !== 110) throw new Error(`Expected 110 archived evidence records, got ${archived}`);
if (uniqueSnapshots !== 73) throw new Error(`Expected 73 unique archived snapshots, got ${uniqueSnapshots}`);

let content = read(files.readme);
content = replaceOnce(content,
  "Archive Capture Batches 1 through 14 are complete and production-verified.",
  "Archive Capture Batches 1 through 15 are complete and production-verified.",
  "README completed batches"
);
content = replaceOnce(content,
  "Evidence remains 284. Event primary gaps are 16, event Tier 1 gaps are six, and all remaining Tier 1 gaps are reviewed and intentionally secondary. One hundred one evidence records now publish sixty-seven verified Wayback snapshots.",
  "Evidence remains 284. Event primary gaps are 16, event Tier 1 gaps are six, and all remaining Tier 1 gaps are reviewed and intentionally secondary. One hundred ten evidence records now publish seventy-three verified Wayback snapshots.",
  "README archive totals"
);
content = replaceOnce(content,
  "Current unarchived queues are 33 terminal unique URLs and 24 risky-host unique URLs.",
  "Current unarchived queues are 28 terminal unique URLs and 21 risky-host unique URLs.",
  "README queue totals"
);
content = replaceOnce(content,
  "Archive Batch 14 added five reproducible exact snapshots to seven Qubit, Harmony, BNB Chain, and LI.FI evidence records. A Harmony forum capture that passed only the first run was rejected as non-reproducible; pNetwork, Wormhole, and Rainbow Bridge candidates remained missing or below the permanent replay-size boundary. Exact replay, temporal fit, and reproducibility remain mandatory.",
  "Archive Batch 15 added seven reproducible exact mappings to nine evidence records covering Elliptic, BNB Chain, SlowMist, the FBI, and Dcentralab. Aurora and two QuillAudits candidates remained unavailable or non-reproducible. Exact replay, temporal fit, minimum size, and two-run reproducibility remain mandatory.",
  "README Batch 15 summary"
);
content = replaceOnce(content,
  "Production verification compares every transformed field in all four public datasets with the generated public contract. Counts and IDs alone cannot prove publication. Batch 14 remained on prior same-count evidence content through the initial, immediate post-refresh, and first delayed twenty-attempt windows. No second refresh was added. The next delayed run converged on attempt 1 and confirmed all one hundred one `archived_url` fields.",
  "Production verification compares every transformed field in all four public datasets with the generated public contract. Counts and IDs alone cannot prove publication. Batch 15 exposed a Cloudflare Pages queue caused by preview builds for every temporary branch. Sixteen queued previews were removed, preview deployment was restricted to `none`, all production deployments were preserved, and the unchanged verifier then converged on attempt 1 with all one hundred ten `archived_url` fields.",
  "README production summary"
);
content = replaceOnce(content, "Evidence with archived_url      101", "Evidence with archived_url      110", "README archived state");
content = replaceOnce(content, "Terminal unarchived URLs         33", "Terminal unarchived URLs         28", "README terminal state");
content = replaceOnce(content, "Risky-host unarchived URLs       24", "Risky-host unarchived URLs       21", "README risky state");
content = replaceOnce(content,
`Canonical merge      ca225d1df10b4a81d72a0fe60fd2713b6e8b543a
Build-input refresh  3f0514b568e84b17daf9e0a2d14649b3a329c787
Production run       30977144358
Production job       92213419237
Generated at         2026-08-05T05:06:09.501Z
Publication attempt  1 on second delayed rerun`,
`Canonical merge      39134a5d7b717c467a49d96b5fd7104047cd0a50
Build-input refresh  7e13955c725e07ca66e01f7f9e321db7f7c764ff
Production run       30986003440
Production job       92245512645
Generated at         2026-08-05T08:02:41.108Z
Publication attempt  1 after preview-queue remediation`,
  "README production checkpoint"
);
content = replaceOnce(content,
  "- `docs/audits/production-verification-phase3-archive-capture-batch14-2026-08-05.md` — Archive Batch 14 production audit\n- `docs/batches/` — reviewed batch scopes",
  "- `docs/audits/production-verification-phase3-archive-capture-batch14-2026-08-05.md` — Archive Batch 14 production audit\n- `docs/audits/phase3-archive-capture-batch15-review-2026-08-05.md` — Archive Batch 15 reproducible review boundary\n- `docs/audits/phase3-archive-capture-batch15-2026-08-05.md` — Archive Batch 15 canonical migration\n- `docs/audits/phase3-archive-capture-batch15-deployment-refresh-2026-08-05.md` — Archive Batch 15 deployment refresh\n- `docs/audits/production-verification-phase3-archive-capture-batch15-2026-08-05.md` — Archive Batch 15 production and Pages queue audit\n- `docs/batches/` — reviewed batch scopes",
  "README audit list"
);
write(files.readme, content);

content = read(files.status);
content = replaceOnce(content,
  "Archive capture Batch 14             production-verified — PRs #177–#180",
  "Archive capture Batch 14             production-verified — PRs #177–#180\nArchive capture Batch 15             production-verified — PRs #181, #182, #184, #185",
  "status completed Batch 15"
);
content = replaceOnce(content, "Evidence with archived_url               101 / 284", "Evidence with archived_url               110 / 284", "status archived");
content = replaceOnce(content, "Terminal unarchived unique URLs          33", "Terminal unarchived unique URLs          28", "status terminal unique");
content = replaceOnce(content, "Terminal unarchived evidence records     45", "Terminal unarchived evidence records     38", "status terminal records");
content = replaceOnce(content, "Risky-host unarchived unique URLs        24", "Risky-host unarchived unique URLs        21", "status risky unique");
content = replaceOnce(content, "Risky-host unarchived evidence records   38", "Risky-host unarchived evidence records   35", "status risky records");
content = replaceOnce(content,
`Archive Capture Batch 14 reviewed ten previously unreviewed exact canonical source URLs. Five reproducible exact captures were approved and published to seven records covering Qubit, Harmony Horizon reporting, BNB Chain, and two LI.FI analyses. The permanent validator confirmed 101 archived evidence records, 33 terminal unique URLs, and 24 risky-host unique URLs.

One Harmony forum capture was rejected because it passed only the first review run. pNetwork returned no exact capture; Wormhole replay content remained short or absent; Rainbow Bridge returned no exact capture on the completed rerun. No wildcard, guessed, short, failed, temporally incompatible, or non-reproducible capture was accepted.

The initial verifier, immediate post-refresh verifier, and first delayed verifier each rejected stale same-count evidence content at \`bir_src_000013\` for twenty attempts. Only one behavior-neutral build-input refresh was committed. The second delayed run converged on attempt 1 at \`generated_at 2026-08-05T05:06:09.501Z\`, confirming complete equality for all four datasets, 72 HTML routes, and 74 redirects.`,
`Archive Capture Batch 15 reviewed ten previously unreviewed exact canonical source URLs. Seven reproducible mappings were approved and published to nine records covering Elliptic, BNB Chain, SlowMist, the FBI, and Dcentralab. The permanent validator confirmed 110 archived evidence records, 28 terminal unique URLs, and 21 risky-host unique URLs.

Aurora returned no accepted replay. One QuillAudits source remained unavailable and another passed only the second run, so both were deferred. No wildcard, guessed, short, failed, temporally incompatible, or non-reproducible capture was accepted.

Repeated full-content verifiers rejected stale same-count evidence at \`bir_src_000014\`. Cloudflare Pages was configured to build previews for every temporary branch, creating a queue ahead of production. The account-level remediation set previews to \`none\`, deleted 16 queued previews, preserved all production deployments, and allowed the Batch 15 canonical deployment to complete. The unchanged verifier then passed on attempt 1 at \`generated_at 2026-08-05T08:02:41.108Z\`.`,
  "status Batch 15 narrative"
);
content = replaceOnce(content,
`Review PR                     #177
Review merge                  09c11e838a3b157a9efb7388f531ff04f723e4ff
Canonical data PR             #178
Canonical merge               ca225d1df10b4a81d72a0fe60fd2713b6e8b543a
Build-input refresh PR        #179
Build-input refresh           3f0514b568e84b17daf9e0a2d14649b3a329c787
Production audit PR           #180
Initial production run        30976024931
Initial failed job            92210067226
Immediate refresh run         30976430766
Immediate refresh failed job  92211270159
First delayed run             30976783627
First delayed failed job      92212328360
Production verify run         30977144358
Production verify job         92213419237
Verified state                33 / 34 / 183 / 284
Archived evidence             101 / 284
Canonical content match       true
Verified HTML routes          72
Verified redirects            74
Generated at                  2026-08-05T05:06:09.501Z
Publication attempt           1 on second delayed rerun after one refresh`,
`Review PR                     #181
Review merge                  fcf932b51445831e1d67c3c14c3ee342eff854dc
Canonical data PR             #182
Canonical merge               39134a5d7b717c467a49d96b5fd7104047cd0a50
Build-input refresh PR        #184
Build-input refresh           7e13955c725e07ca66e01f7f9e321db7f7c764ff
Production audit PR           #185
Initial production run        30983843765
Cloudflare remediation run    30987353553
Cloudflare remediation job    92245106402
Production verify run         30986003440
Production verify job         92245512645
Verified state                33 / 34 / 183 / 284
Archived evidence             110 / 284
Canonical content match       true
Verified HTML routes          72
Verified redirects            74
Generated at                  2026-08-05T08:02:41.108Z
Publication attempt           1 after preview-queue remediation`,
  "status production checkpoint"
);
content = replaceOnce(content, "from 24 risky-host and 33 terminal unique URLs", "from 21 risky-host and 28 terminal unique URLs", "status next queues");
write(files.status, content);

content = read(files.roadmap);
content = replaceOnce(content,
  "Archive capture Batch 14                  production-verified — PRs #177–#180",
  "Archive capture Batch 14                  production-verified — PRs #177–#180\n         Archive capture Batch 15                  production-verified — PRs #181, #182, #184, #185",
  "roadmap completed Batch 15"
);
content = replaceOnce(content,
`Review PR                     #177
Review merge                  09c11e838a3b157a9efb7388f531ff04f723e4ff
Canonical data PR             #178
Canonical merge               ca225d1df10b4a81d72a0fe60fd2713b6e8b543a
Build-input refresh PR        #179
Build-input refresh           3f0514b568e84b17daf9e0a2d14649b3a329c787
Production audit PR           #180
Initial production run        30976024931
Immediate post-refresh run    30976430766
First delayed run             30976783627
Production verify run         30977144358
Production verify job         92213419237
Verified state                33 / 34 / 183 / 284
Archived evidence             101 / 284
Canonical content match       true
Verified HTML routes          72
Verified redirects            74
Generated at                  2026-08-05T05:06:09.501Z
Publication attempt           1 on second delayed rerun after one refresh`,
`Review PR                     #181
Review merge                  fcf932b51445831e1d67c3c14c3ee342eff854dc
Canonical data PR             #182
Canonical merge               39134a5d7b717c467a49d96b5fd7104047cd0a50
Build-input refresh PR        #184
Build-input refresh           7e13955c725e07ca66e01f7f9e321db7f7c764ff
Production audit PR           #185
Initial production run        30983843765
Cloudflare remediation run    30987353553
Cloudflare remediation job    92245106402
Production verify run         30986003440
Production verify job         92245512645
Verified state                33 / 34 / 183 / 284
Archived evidence             110 / 284
Canonical content match       true
Verified HTML routes          72
Verified redirects            74
Generated at                  2026-08-05T08:02:41.108Z
Publication attempt           1 after preview-queue remediation`,
  "roadmap production checkpoint"
);
content = replaceOnce(content,
  "The first three twenty-attempt windows rejected stale same-count content at `bir_src_000013`. One behavior-neutral refresh was committed and no second refresh was introduced. The next delayed run observed the new build on attempt 1 and proved complete equality.",
  "Batch 15 verifiers repeatedly rejected stale same-count content at `bir_src_000014`. One behavior-neutral refresh was committed and no second refresh was introduced. Cloudflare queue inspection showed preview builds for every temporary branch; 16 queued previews were removed, preview deployment was set to `none`, and the unchanged verifier then proved complete equality on attempt 1.",
  "roadmap production narrative"
);
content = replaceOnce(content, "Evidence with archived_url           101", "Evidence with archived_url           110", "roadmap archived");
content = replaceOnce(content, "Terminal unarchived unique URLs       33", "Terminal unarchived unique URLs       28", "roadmap terminal unique");
content = replaceOnce(content, "Terminal unarchived records           45", "Terminal unarchived records           38", "roadmap terminal records");
content = replaceOnce(content, "Risky-host unarchived unique URLs     24", "Risky-host unarchived unique URLs     21", "roadmap risky unique");
content = replaceOnce(content, "Risky-host unarchived records         38", "Risky-host unarchived records         35", "roadmap risky records");
content = replaceOnce(content,
  "Archive Capture Batch 14 added five reproducible exact snapshots to seven Qubit, Harmony, BNB Chain, and LI.FI records. A first-run-only Harmony forum replay was rejected as non-reproducible; pNetwork, Wormhole, and Rainbow Bridge candidates remain deferred under the unchanged exact replay, temporal-fit, size, and reproducibility boundaries.",
  "Archive Capture Batch 15 added seven reproducible exact mappings to nine Elliptic, BNB Chain, SlowMist, FBI, and Dcentralab records. Aurora and QuillAudits candidates remain deferred under the unchanged exact replay, temporal-fit, size, and reproducibility boundaries.",
  "roadmap Batch 15 narrative"
);
content = replaceOnce(content, "from the 24 risky-host and 33 terminal unique-URL queues", "from the 21 risky-host and 28 terminal unique-URL queues", "roadmap target queues");
content = replaceOnce(content,
  "Batch 14 reconfirmed that a valid Pages build may become visible only after multiple unchanged five-minute verification windows. When `generated_at` remains unchanged after one reviewed build-input refresh, do not stack another refresh commit. Preserve the same verifier expectations and allow deployment latency.",
  "Batch 15 proved that arbitrary preview builds can saturate the Pages queue and delay production. The project now uses `preview_deployment_setting: none`; temporary branches must not create Pages previews. When `generated_at` remains unchanged after one reviewed build-input refresh, inspect the production queue without weakening expectations or stacking refresh commits.",
  "roadmap publication rule"
);
content = content.replace(
  "19. An unchanged `generated_at` after a build-input refresh is evidence of deployment latency, not permission to weaken or reset verification expectations.\n",
  "19. An unchanged `generated_at` after a build-input refresh is evidence of deployment latency, not permission to weaken or reset verification expectations.\n20. Cloudflare Pages preview deployment remains `none`; intentional preview support requires a separately reviewed configuration change.\n"
);
write(files.roadmap, content);

content = read(files.recovery);
content = replaceOnce(content,
  "PR #180      Archive Capture Batch 14 production verification and checkpoint sync",
  "PR #180      Archive Capture Batch 14 production verification and checkpoint sync\nPR #181      Archive Capture Batch 15 reproducible review\nPR #182      Archive Capture Batch 15 canonical migration\nPR #184      Archive Capture Batch 15 build-input refresh\nPR #185      Archive Capture Batch 15 production verification, queue remediation, and checkpoint sync",
  "recovery completed Batch 15"
);
content = replaceOnce(content,
`Review PR                     #177
Review merge                  09c11e838a3b157a9efb7388f531ff04f723e4ff
Canonical data PR             #178
Canonical merge               ca225d1df10b4a81d72a0fe60fd2713b6e8b543a
Build-input refresh PR        #179
Build-input refresh           3f0514b568e84b17daf9e0a2d14649b3a329c787
Production audit PR           #180
Initial production run        30976024931
Immediate post-refresh run    30976430766
First delayed run             30976783627
Production verify run         30977144358
Production verify job         92213419237
Verified state                33 / 34 / 183 / 284
Archived evidence             101 / 284
Canonical content match       true
HTML routes                   72
Redirects                     74
Generated at                  2026-08-05T05:06:09.501Z
Publication attempt           1 on second delayed rerun after one refresh`,
`Review PR                     #181
Review merge                  fcf932b51445831e1d67c3c14c3ee342eff854dc
Canonical data PR             #182
Canonical merge               39134a5d7b717c467a49d96b5fd7104047cd0a50
Build-input refresh PR        #184
Build-input refresh           7e13955c725e07ca66e01f7f9e321db7f7c764ff
Production audit PR           #185
Initial production run        30983843765
Cloudflare remediation run    30987353553
Cloudflare remediation job    92245106402
Production verify run         30986003440
Production verify job         92245512645
Verified state                33 / 34 / 183 / 284
Archived evidence             110 / 284
Canonical content match       true
HTML routes                   72
Redirects                     74
Generated at                  2026-08-05T08:02:41.108Z
Publication attempt           1 after preview-queue remediation`,
  "recovery production checkpoint"
);
content = replaceOnce(content,
  "The initial, immediate post-refresh, and first delayed verifiers each rejected stale same-count content for twenty attempts while `generated_at` remained `2026-08-05T04:41:17.057Z`. No second refresh was committed. The next delayed run switched to `2026-08-05T05:06:09.501Z` on attempt 1 and passed complete public-content equality.",
  "Batch 15 verifiers rejected stale same-count content while `generated_at` remained `2026-08-05T06:55:22.730Z`. No second refresh was committed. Cloudflare queue remediation removed 16 queued previews, preserved all production deployments, set preview deployment to `none`, and the unchanged verifier switched to `2026-08-05T08:02:41.108Z` on attempt 1.",
  "recovery production narrative"
);
content = replaceOnce(content, "Evidence with archived_url          101", "Evidence with archived_url          110", "recovery archived");
content = replaceOnce(content, "Terminal unarchived unique URLs      33", "Terminal unarchived unique URLs      28", "recovery terminal unique");
content = replaceOnce(content, "Terminal unarchived records          45", "Terminal unarchived records          38", "recovery terminal records");
content = replaceOnce(content, "Risky-host unarchived unique URLs    24", "Risky-host unarchived unique URLs    21", "recovery risky unique");
content = replaceOnce(content, "Risky-host unarchived records        38", "Risky-host unarchived records        35", "recovery risky records");
const batch14Start = content.indexOf("## Archive Capture Batch 14");
const deploymentStart = content.indexOf("## Deployment resume rule", batch14Start);
if (batch14Start < 0 || deploymentStart < 0) throw new Error("Missing recovery Batch 14 section");
const batch15Section = `## Archive Capture Batch 15

\`\`\`text
Review boundary                    PR #181
Canonical migration                PR #182
Build-input refresh                PR #184
Production audit                   PR #185
Reviewed unique URLs                    10
Verified Wayback mappings                7
Evidence records updated                 9
Terminal unique queue           33 -> 28
Terminal record queue           45 -> 38
Risky-host unique queue         24 -> 21
Risky-host record queue         38 -> 35
X/Twitter record queue          30 -> 30
Source-count drift                      0
\`\`\`

Updated evidence IDs:

\`\`\`text
bir_src_000014
bir_src_000022
bir_src_000023
bir_src_000091
bir_src_000149
bir_src_000167
bir_src_000205
bir_src_000206
bir_src_000214
\`\`\`

Only captures reproduced in both completed review runs were accepted. Aurora had no accepted replay; one QuillAudits source remained unavailable and another passed only the second run, so all three candidates remain deferred.

## Cloudflare Pages queue boundary

The project now uses production branch \`main\`, production deployments enabled, and \`preview_deployment_setting: none\`. Batch 15 removed 16 queued previews and preserved all production deployments. Arbitrary temporary branches must not restore preview builds.

`;
content = content.slice(0, batch14Start) + batch15Section + content.slice(deploymentStart);
content = replaceOnce(content,
  "A docs-only commit is not assumed to start a Cloudflare Pages build. A reviewed behavior-neutral build-input change may be used once when publication remains stale. When an immediate or in-window rerun still shows the same `generated_at`, do not stack another refresh automatically. Allow deployment latency and keep the full-content equality requirement unchanged.",
  "A docs-only commit is not assumed to start a Cloudflare Pages build. A reviewed behavior-neutral build-input change may be used once when publication remains stale. When an immediate or in-window rerun still shows the same `generated_at`, do not stack another refresh automatically. Inspect the Cloudflare production queue, keep preview deployment at `none`, allow deployment latency, and preserve full-content equality requirements.",
  "recovery deployment rule"
);
content = replaceOnce(content, "from 24 risky-host and 33 terminal unique URLs", "from 21 risky-host and 28 terminal unique URLs", "recovery next queues");
write(files.recovery, content);

content = read(files.position);
content = replaceOnce(content,
  "Archive Capture Batches 1 through 14 are complete and production-verified. Evidence with `archived_url` is 101 / 284. The remaining archive queues are 24 risky-host unique URLs and 33 terminal unique URLs.",
  "Archive Capture Batches 1 through 15 are complete and production-verified. Evidence with `archived_url` is 110 / 284. The remaining archive queues are 21 risky-host unique URLs and 28 terminal unique URLs.",
  "position Batch 15 state"
);
content = replaceOnce(content,
  "The latest production checkpoint completed after one behavior-neutral build-input refresh and two additional delayed verifier windows:",
  "The latest production checkpoint completed after one behavior-neutral build-input refresh and Cloudflare preview-queue remediation:",
  "position checkpoint intro"
);
content = replaceOnce(content,
`Canonical merge       ca225d1df10b4a81d72a0fe60fd2713b6e8b543a
Build-input refresh   3f0514b568e84b17daf9e0a2d14649b3a329c787
Production run        30977144358
Production job        92213419237
Generated at          2026-08-05T05:06:09.501Z
Publication attempt   1 on second delayed rerun`,
`Canonical merge       39134a5d7b717c467a49d96b5fd7104047cd0a50
Build-input refresh   7e13955c725e07ca66e01f7f9e321db7f7c764ff
Production run        30986003440
Production job        92245512645
Generated at          2026-08-05T08:02:41.108Z
Publication attempt   1 after preview-queue remediation`,
  "position production checkpoint"
);
content = replaceOnce(content, "from the 24 risky-host and 33 terminal unique-URL queues", "from the 21 risky-host and 28 terminal unique-URL queues", "position next queues");
write(files.position, content);

content = read(files.schedule);
content = replaceOnce(content,
  "Archive Capture Batches 1–14: complete and production-verified\n  - next: Batch 15 or justified primary-evidence remediation",
  "Archive Capture Batches 1–15: complete and production-verified\n  - next: Batch 16 or justified primary-evidence remediation",
  "schedule Batch 15 completion"
);
content = replaceOnce(content, "Evidence with archived_url           101", "Evidence with archived_url           110", "schedule archived");
content = replaceOnce(content, "Terminal unarchived unique URLs       33", "Terminal unarchived unique URLs       28", "schedule terminal");
content = replaceOnce(content, "Risky-host unarchived unique URLs     24", "Risky-host unarchived unique URLs     21", "schedule risky");
content = replaceOnce(content,
  "1. choose Batch 15 from the remaining 24 risky-host and 33 terminal unique-URL queues;",
  "1. choose Batch 16 from the remaining 21 risky-host and 28 terminal unique-URL queues;",
  "schedule next batch"
);
content = content.replace(
  "- unchanged `generated_at` values after the one refresh require delayed reruns, not stacked refresh commits.\n",
  "- unchanged `generated_at` values after the one refresh require queue inspection and delayed reruns, not stacked refresh commits;\n- Cloudflare Pages preview deployment remains `none`; arbitrary temporary branches must not enqueue previews.\n"
);
write(files.schedule, content);

content = read(files.audit);
content = replaceOnce(content,
  "Build-input refresh: `7e13955c725e07ca66e01f7f9e321db7f7c764ff`",
  "Build-input refresh: `7e13955c725e07ca66e01f7f9e321db7f7c764ff`  \nProduction checkpoint PR: `#185`",
  "audit PR number"
);
write(files.audit, content);

for (const path of Object.values(files)) {
  const final = read(path);
  if (final.includes("PENDING")) throw new Error(`Pending marker remains in ${path}`);
}

console.log(JSON.stringify({
  archived_evidence: archived,
  unique_archived_snapshots: uniqueSnapshots,
  synchronized_files: Object.values(files)
}, null, 2));
