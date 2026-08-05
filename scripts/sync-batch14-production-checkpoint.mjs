import fs from "node:fs";

function read(path) {
  return fs.readFileSync(path, "utf8");
}

function write(path, content) {
  fs.writeFileSync(path, content.endsWith("\n") ? content : `${content}\n`);
}

function replaceOnce(content, oldValue, newValue, label) {
  const count = content.split(oldValue).length - 1;
  if (count !== 1) throw new Error(`${label}: expected one match, observed ${count}`);
  return content.replace(oldValue, newValue);
}

const auditPath = "docs/audits/production-verification-phase3-archive-capture-batch14-2026-08-05.md";
write(auditPath, `# Production verification — Phase 3 Archive Capture Batch 14 — 2026-08-05

Status: complete  
Review PR: \`#177\`  
Review merge: \`09c11e838a3b157a9efb7388f531ff04f723e4ff\`  
Canonical PR: \`#178\`  
Canonical merge: \`ca225d1df10b4a81d72a0fe60fd2713b6e8b543a\`  
Build-input refresh PR: \`#179\`  
Build-input refresh: \`3f0514b568e84b17daf9e0a2d14649b3a329c787\`

## Verified production state

\`\`\`text
Bridges                              33
Incidents                            34
Events                              183
Evidence                            284
Evidence with archived_url          101
Terminal unarchived unique URLs      33
Terminal unarchived records          45
Risky-host unarchived unique URLs    24
Risky-host unarchived records        38
X/Twitter records unarchived         30
Canonical public content match       true
HTML routes                          72
Redirects                            74
Generated at                         2026-08-05T05:06:09.501Z
\`\`\`

## Publication sequence

\`\`\`text
Initial verification run             30976024931
Initial failed job                    92210067226
Immediate post-refresh run            30976430766
Immediate post-refresh failed job     92211270159
First delayed verification run        30976783627
First delayed failed job              92212328360
Successful delayed verification run   30977144358
Successful verification job           92213419237
Successful publication attempt        1 / 20
\`\`\`

The first three twenty-attempt windows correctly rejected stale same-count evidence content at \`bir_src_000013\` while \`generated_at\` remained \`2026-08-05T04:41:17.057Z\`. Only one behavior-neutral build-input refresh was committed. No second refresh was introduced.

The next delayed verifier observed \`generated_at 2026-08-05T05:06:09.501Z\` on attempt 1 and confirmed complete canonical-derived public-content equality.

## Verified contract

- all transformed fields in all four public datasets exactly equal canonical-derived output;
- all seven Batch 14 \`archived_url\` fields are published;
- version and manifest counts and canonical-only markers match;
- five static routes, 33 bridge routes, and 34 incident routes pass;
- canonical metadata and JSON-LD are exact;
- sitemap contains the exact 72 canonical routes;
- robots points to the custom-domain sitemap;
- all 74 legacy redirects resolve as specified;
- expected content types and observable cache signals are present.

## Completion boundary

Batch 14 is complete only because the custom-domain output passed full-content equality. Count equality alone was rejected throughout the stale publication windows.
`);

let readme = read("README.md");
readme = replaceOnce(readme,
  "Archive Capture Batches 1 through 13 are complete and production-verified.",
  "Archive Capture Batches 1 through 14 are complete and production-verified.",
  "README completed batches");
readme = replaceOnce(readme,
  "Ninety-four evidence records now publish sixty-two verified Wayback snapshots.",
  "One hundred one evidence records now publish sixty-seven verified Wayback snapshots.",
  "README archive count");
readme = replaceOnce(readme,
  "Current unarchived queues are 36 terminal unique URLs and 27 risky-host unique URLs.",
  "Current unarchived queues are 33 terminal unique URLs and 24 risky-host unique URLs.",
  "README queues");
readme = replaceOnce(readme,
  "Archive Batch 13 added three exact snapshots to the SlowMist Transit Swap analysis, SOCKET recovery update, and Transit Finance recovery update. Holograph and Unizen exact replays remained below the permanent size boundary; Taiko, Syndicate Commons, and Everclear returned no accepted exact capture. Replay validity and claim-time compatibility remain mandatory.",
  "Archive Batch 14 added five reproducible exact snapshots to seven Qubit, Harmony, BNB Chain, and LI.FI evidence records. A Harmony forum capture that passed only the first run was rejected as non-reproducible; pNetwork, Wormhole, and Rainbow Bridge candidates remained missing or below the permanent replay-size boundary. Exact replay, temporal fit, and reproducibility remain mandatory.",
  "README Batch 14 summary");
readme = replaceOnce(readme,
  "Production verification compares every transformed field in all four public datasets with the generated public contract. Counts and IDs alone cannot prove publication. Batch 13 remained on the prior same-count evidence content for an initial twenty-attempt job. After one behavior-neutral build-input refresh, the unchanged verifier continued to reject the old build through attempt 19 and converged at attempt 20, confirming all ninety-four `archived_url` fields.",
  "Production verification compares every transformed field in all four public datasets with the generated public contract. Counts and IDs alone cannot prove publication. Batch 14 remained on prior same-count evidence content through the initial, immediate post-refresh, and first delayed twenty-attempt windows. No second refresh was added. The next delayed run converged on attempt 1 and confirmed all one hundred one `archived_url` fields.",
  "README production narrative");
readme = replaceOnce(readme, "Evidence with archived_url       94", "Evidence with archived_url      101", "README archived metric");
readme = replaceOnce(readme, "Terminal unarchived URLs         36", "Terminal unarchived URLs         33", "README terminal metric");
readme = replaceOnce(readme, "Risky-host unarchived URLs       27", "Risky-host unarchived URLs       24", "README risky metric");
readme = replaceOnce(readme,
`Canonical merge      ab0b45fb1f1cbe6cdddd1238c37fb99f201c934f
Build-input refresh  15472395efdb4435380dbd0fdae8c7fe71e54b06
Production run       30970746866
Production job       92194294438
Generated at         2026-08-05T03:00:56.755Z
Publication attempt  20
HTML routes          72
Redirects            74`,
`Canonical merge      ca225d1df10b4a81d72a0fe60fd2713b6e8b543a
Build-input refresh  3f0514b568e84b17daf9e0a2d14649b3a329c787
Production run       30977144358
Production job       92213419237
Generated at         2026-08-05T05:06:09.501Z
Publication attempt  1 on second delayed rerun
HTML routes          72
Redirects            74`,
  "README checkpoint");
readme = replaceOnce(readme,
  "- `docs/batches/` — reviewed batch scopes",
  "- `docs/audits/phase3-archive-capture-batch14-review-2026-08-05.md` — Archive Batch 14 reproducible review boundary\n- `docs/audits/phase3-archive-capture-batch14-2026-08-05.md` — Archive Batch 14 canonical migration\n- `docs/audits/phase3-archive-capture-batch14-deployment-refresh-2026-08-05.md` — Archive Batch 14 deployment refresh\n- `docs/audits/production-verification-phase3-archive-capture-batch14-2026-08-05.md` — Archive Batch 14 production audit\n- `docs/batches/` — reviewed batch scopes",
  "README Batch 14 links");
write("README.md", readme);

let status = read("docs/runbooks/current-status.md");
status = replaceOnce(status,
  "Archive capture Batch 13             production-verified — PRs #173–#176",
  "Archive capture Batch 13             production-verified — PRs #173–#176\nArchive capture Batch 14             production-verified — PRs #177–#180",
  "status phase line");
for (const [oldValue, newValue, label] of [
  ["Evidence with archived_url                94 / 284", "Evidence with archived_url               101 / 284", "status archived"],
  ["Terminal unarchived unique URLs          36", "Terminal unarchived unique URLs          33", "status terminal unique"],
  ["Terminal unarchived evidence records     49", "Terminal unarchived evidence records     45", "status terminal records"],
  ["Risky-host unarchived unique URLs        27", "Risky-host unarchived unique URLs        24", "status risky unique"],
  ["Risky-host unarchived evidence records   42", "Risky-host unarchived evidence records   38", "status risky records"]
]) status = replaceOnce(status, oldValue, newValue, label);
const statusNarrativeStart = status.indexOf("Archive Capture Batch 13 reviewed ten exact canonical source URLs.");
const statusNarrativeEnd = status.indexOf("All event Tier 1 gaps are reviewed.");
if (statusNarrativeStart < 0 || statusNarrativeEnd <= statusNarrativeStart) throw new Error("status narrative boundary missing");
status = `${status.slice(0, statusNarrativeStart)}Archive Capture Batch 14 reviewed ten previously unreviewed exact canonical source URLs. Five reproducible exact captures were approved and published to seven records covering Qubit, Harmony Horizon reporting, BNB Chain, and two LI.FI analyses. The permanent validator confirmed 101 archived evidence records, 33 terminal unique URLs, and 24 risky-host unique URLs.\n\nOne Harmony forum capture was rejected because it passed only the first review run. pNetwork returned no exact capture; Wormhole replay content remained short or absent; Rainbow Bridge returned no exact capture on the completed rerun. No wildcard, guessed, short, failed, temporally incompatible, or non-reproducible capture was accepted.\n\nThe initial verifier, immediate post-refresh verifier, and first delayed verifier each rejected stale same-count evidence content at \`bir_src_000013\` for twenty attempts. Only one behavior-neutral build-input refresh was committed. The second delayed run converged on attempt 1 at \`generated_at 2026-08-05T05:06:09.501Z\`, confirming complete equality for all four datasets, 72 HTML routes, and 74 redirects.\n\n${status.slice(statusNarrativeEnd)}`;
const statusCheckpointStart = status.indexOf("## Latest completed production checkpoint");
const statusNextStart = status.indexOf("## Next");
if (statusCheckpointStart < 0 || statusNextStart <= statusCheckpointStart) throw new Error("status checkpoint boundary missing");
status = `${status.slice(0, statusCheckpointStart)}## Latest completed production checkpoint

\`\`\`text
Review PR                     #177
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
Publication attempt           1 on second delayed rerun after one refresh
\`\`\`

${status.slice(statusNextStart)}`;
status = replaceOnce(status,
  "continue bounded archive capture work from 27 risky-host and 36 terminal unique URLs",
  "continue bounded archive capture work from 24 risky-host and 33 terminal unique URLs",
  "status next queues");
write("docs/runbooks/current-status.md", status);

let roadmap = read("docs/runbooks/development-roadmap.md");
roadmap = replaceOnce(roadmap,
  "Archive capture Batch 13                  production-verified — PRs #173–#176",
  "Archive capture Batch 13                  production-verified — PRs #173–#176\n         Archive capture Batch 14                  production-verified — PRs #177–#180",
  "roadmap phase line");
const roadmapCheckpointStart = roadmap.indexOf("## Latest completed production checkpoint");
const roadmapQualityStart = roadmap.indexOf("## Current quality state");
if (roadmapCheckpointStart < 0 || roadmapQualityStart <= roadmapCheckpointStart) throw new Error("roadmap checkpoint boundary missing");
roadmap = `${roadmap.slice(0, roadmapCheckpointStart)}## Latest completed production checkpoint

\`\`\`text
Review PR                     #177
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
Publication attempt           1 on second delayed rerun after one refresh
\`\`\`

The first three twenty-attempt windows rejected stale same-count content at \`bir_src_000013\`. One behavior-neutral refresh was committed and no second refresh was introduced. The next delayed run observed the new build on attempt 1 and proved complete equality.

${roadmap.slice(roadmapQualityStart)}`;
for (const [oldValue, newValue, label] of [
  ["Evidence with archived_url            94", "Evidence with archived_url           101", "roadmap archived"],
  ["Terminal unarchived unique URLs       36", "Terminal unarchived unique URLs       33", "roadmap terminal unique"],
  ["Terminal unarchived records           49", "Terminal unarchived records           45", "roadmap terminal records"],
  ["Risky-host unarchived unique URLs     27", "Risky-host unarchived unique URLs     24", "roadmap risky unique"],
  ["Risky-host unarchived records         42", "Risky-host unarchived records         38", "roadmap risky records"]
]) roadmap = replaceOnce(roadmap, oldValue, newValue, label);
roadmap = replaceOnce(roadmap,
  "Archive Capture Batch 13 added three exact snapshots covering the SlowMist Transit Swap analysis, SOCKET recovery update, and Transit Finance recovery update. Holograph and Unizen short replays, plus Taiko, Syndicate Commons, and Everclear missing captures, remain deferred under the unchanged exact replay and temporal-fit boundary.",
  "Archive Capture Batch 14 added five reproducible exact snapshots to seven Qubit, Harmony, BNB Chain, and LI.FI records. A first-run-only Harmony forum replay was rejected as non-reproducible; pNetwork, Wormhole, and Rainbow Bridge candidates remain deferred under the unchanged exact replay, temporal-fit, size, and reproducibility boundaries.",
  "roadmap Batch summary");
roadmap = replaceOnce(roadmap,
  "continue verified archive captures from the 27 risky-host and 36 terminal unique-URL queues",
  "continue verified archive captures from the 24 risky-host and 33 terminal unique-URL queues",
  "roadmap queues");
roadmap = replaceOnce(roadmap,
  "Batch 13 reconfirmed that a valid Pages build may become visible only at the end of the five-minute verification window.",
  "Batch 14 reconfirmed that a valid Pages build may become visible only after multiple unchanged five-minute verification windows.",
  "roadmap publication lesson");
write("docs/runbooks/development-roadmap.md", roadmap);

let recovery = read("docs/runbooks/recovery-checkpoint.md");
recovery = replaceOnce(recovery,
  "PR #176      Archive Capture Batch 13 production verification and checkpoint sync",
  "PR #176      Archive Capture Batch 13 production verification and checkpoint sync\nPR #177      Archive Capture Batch 14 reproducible review\nPR #178      Archive Capture Batch 14 canonical migration\nPR #179      Archive Capture Batch 14 build-input refresh\nPR #180      Archive Capture Batch 14 production verification and checkpoint sync",
  "recovery checkpoint list");
const recoveryCheckpointStart = recovery.indexOf("## Latest completed production checkpoint");
const recoveryGuardsStart = recovery.indexOf("## Permanent guards");
if (recoveryCheckpointStart < 0 || recoveryGuardsStart <= recoveryCheckpointStart) throw new Error("recovery checkpoint boundary missing");
recovery = `${recovery.slice(0, recoveryCheckpointStart)}## Latest completed production checkpoint

\`\`\`text
Review PR                     #177
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
Publication attempt           1 on second delayed rerun after one refresh
\`\`\`

The initial, immediate post-refresh, and first delayed verifiers each rejected stale same-count content for twenty attempts while \`generated_at\` remained \`2026-08-05T04:41:17.057Z\`. No second refresh was committed. The next delayed run switched to \`2026-08-05T05:06:09.501Z\` on attempt 1 and passed complete public-content equality.

${recovery.slice(recoveryGuardsStart)}`;
for (const [oldValue, newValue, label] of [
  ["Evidence with archived_url           94", "Evidence with archived_url          101", "recovery archived"],
  ["Terminal unarchived unique URLs      36", "Terminal unarchived unique URLs      33", "recovery terminal unique"],
  ["Terminal unarchived records          49", "Terminal unarchived records          45", "recovery terminal records"],
  ["Risky-host unarchived unique URLs    27", "Risky-host unarchived unique URLs    24", "recovery risky unique"],
  ["Risky-host unarchived records        42", "Risky-host unarchived records        38", "recovery risky records"]
]) recovery = replaceOnce(recovery, oldValue, newValue, label);
const batchStart = recovery.indexOf("## Archive Capture Batch 13");
const deploymentStart = recovery.indexOf("## Deployment resume rule");
if (batchStart < 0 || deploymentStart <= batchStart) throw new Error("recovery batch boundary missing");
recovery = `${recovery.slice(0, batchStart)}## Archive Capture Batch 14

\`\`\`text
Review boundary                    PR #177
Canonical migration                PR #178
Build-input refresh                PR #179
Production audit                   PR #180
Reviewed unique URLs                    10
Verified Wayback URLs                    5
Evidence records updated                 7
Terminal unique queue           36 -> 33
Terminal record queue           49 -> 45
Risky-host unique queue         27 -> 24
Risky-host record queue         42 -> 38
X/Twitter record queue          30 -> 30
Source-count drift                      0
\`\`\`

Updated evidence IDs:

\`\`\`text
bir_src_000036
bir_src_000013
bir_src_000021
bir_src_000215
bir_src_000057
bir_src_000226
bir_src_000059
\`\`\`

Only captures reproduced in both completed review runs were accepted. The first-run-only Harmony forum replay was rejected. pNetwork, Wormhole, and Rainbow Bridge candidates remain deferred.

${recovery.slice(deploymentStart)}`;
recovery = replaceOnce(recovery,
  "continue bounded archive work from 27 risky-host and 36 terminal unique URLs",
  "continue bounded archive work from 24 risky-host and 33 terminal unique URLs",
  "recovery next queues");
write("docs/runbooks/recovery-checkpoint.md", recovery);

write("docs/operations/current-position.md", `# Current position

Status: active  
Updated: 2026-08-05

This file is a compact compatibility pointer. The authoritative live state is maintained in:

- \`docs/runbooks/recovery-checkpoint.md\`
- \`docs/runbooks/current-status.md\`
- \`docs/runbooks/development-roadmap.md\`
- current \`main\`, canonical JSON, open pull requests, and GitHub Actions

## Canonical and production baseline

\`\`\`text
Bridges     33
Incidents   34
Events      183
Evidence    284
\`\`\`

## Current phase

- Phase 3 — full-corpus quality strengthening: active
- Phase 4 — public contract stabilization: complete
- Phase 5 — monitoring and candidate collection: planned
- v1 hardening: planned

Archive Capture Batches 1 through 14 are complete and production-verified. Evidence with \`archived_url\` is 101 / 284. The remaining archive queues are 24 risky-host unique URLs and 33 terminal unique URLs. Source-count mismatches and unknown URL statuses remain at zero, and complete canonical-derived public-content equality is enforced.

The latest production checkpoint completed after one behavior-neutral build-input refresh and two additional delayed verifier windows:

\`\`\`text
Canonical merge       ca225d1df10b4a81d72a0fe60fd2713b6e8b543a
Build-input refresh   3f0514b568e84b17daf9e0a2d14649b3a329c787
Production run        30977144358
Production job        92213419237
Generated at          2026-08-05T05:06:09.501Z
Publication attempt   1 on second delayed rerun
Content match         true
HTML routes           72
Redirects             74
\`\`\`

The Boltz 2026 swap shutdown remains a monitoring signal in Issue #171. It is not canonical because the available first-party material does not identify one reviewable bridge incident boundary.

## Next bounded work

1. continue archive preservation from the 24 risky-host and 33 terminal unique-URL queues;
2. retry deferred official-source candidates without weakening exact-replay, temporal-fit, size, or reproducibility requirements;
3. reduce the remaining 16 events without primary evidence where justified;
4. strengthen validators;
5. begin review-gated monitoring and candidate collection without automatic canonical publication;
6. continue v1 hardening.
`);

write("docs/operations/current-schedule.md", `# BIR implementation schedule

Status: active  
Updated: 2026-08-05

This file no longer carries an independent historical schedule. The authoritative roadmap is \`docs/runbooks/development-roadmap.md\`; the restart point is \`docs/runbooks/recovery-checkpoint.md\`.

## Reporting rule

After every merged pull request, report:

1. the full schedule,
2. the current position,
3. what the merge changed,
4. the next action before continuing.

## Current schedule

- Phase 0 — specification and foundation: complete
- Phase 1 — canonical model, UI, validation, and seeds: complete
- Phase 2 — record expansion: complete through Batch 7
- Phase 3 — full-corpus quality strengthening: active
  - source-count remediation: complete
  - source-quality baseline and remediation: complete
  - event Tier 1 remediation: complete and production-verified
  - Archive Capture Batches 1–14: complete and production-verified
  - next: Batch 15 or justified primary-evidence remediation
- Phase 4 — public contract stabilization: complete
- Phase 5 — monitoring and candidate collection: planned
- Release — v1 documentation, accessibility, performance, compatibility, and release checks: planned

## Current baseline

\`\`\`text
Bridges     33
Incidents   34
Events      183
Evidence    284
\`\`\`

## Current quality boundary

\`\`\`text
Evidence with archived_url           101
Terminal unarchived unique URLs       33
Risky-host unarchived unique URLs     24
Events without primary                16
Events without Tier 1                  6
Unknown URL status                     0
Canonical production content match  true
\`\`\`

## Immediate execution order

1. choose Batch 15 from the remaining 24 risky-host and 33 terminal unique-URL queues;
2. run a review-only exact replay, temporal-fit, size, and reproducibility audit;
3. apply only reviewed mappings in a separate canonical PR;
4. explicitly verify production when canonical public content changes;
5. remediate event primary-evidence gaps where source hierarchy can be improved safely;
6. strengthen validators;
7. implement review-gated monitoring and candidate collection;
8. complete v1 hardening and release closure.

## Permanent boundary

- never write canonical records directly to \`main\`;
- do not treat monitoring signals as canonical incidents;
- do not accept wildcard, guessed, short, failed, temporally incompatible, or non-reproducible archive captures;
- repository checks are the normal merge gate;
- production verification is required for explicit canonical publication and release gates;
- a build-input refresh may be used once when necessary, but it must not change canonical content or verification expectations;
- unchanged \`generated_at\` values after the one refresh require delayed reruns, not stacked refresh commits.
`);

console.log(JSON.stringify({
  updated: [
    auditPath,
    "README.md",
    "docs/runbooks/current-status.md",
    "docs/runbooks/development-roadmap.md",
    "docs/runbooks/recovery-checkpoint.md",
    "docs/operations/current-position.md",
    "docs/operations/current-schedule.md"
  ]
}, null, 2));
