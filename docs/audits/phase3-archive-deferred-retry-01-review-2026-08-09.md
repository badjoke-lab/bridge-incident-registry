# Phase 3 Archive Deferred Retry 01 review — 2026-08-09

Status: complete review only  
Canonical data changed: no

## Inventory boundary

After Archive Capture Batch 18 exhausted the previously-unreviewed archive candidate set, a repository-derived inventory scanned all permanent archive review audits and current canonical evidence.

```text
Review files scanned                         17
Reviewed evidence IDs                       159
Reviewed but still unarchived records        45
Reviewed but still unarchived unique URLs    32
Terminal reviewed-unarchived records          25
Risky-host reviewed-unarchived records        26
X/Twitter reviewed-unarchived records         23
```

Deferred Retry 01 selected ten high-value previously-reviewed unresolved URLs. The scope prioritised terminal records and first-party/official evidence, while excluding X/Twitter from this first retry pass.

## Execution

```text
Initial workflow-syntax run  31266786147
Successful review run        31266830122
Successful review job        93126223521
Selected URLs                          10
Approved URLs                           2
Approved records                        2
```

The initial run failed before any review job started because the temporary workflow embedded an invalid YAML block. The workflow definition was corrected without changing canonical data or the archive acceptance boundary.

The successful run reused the established bounded archive reviewer and ran two independent exact-CDX and replay passes. Approval required the same exact archive URL in both passes, HTTP 200 HTML, at least 65,536 bytes, and a snapshot date compatible with the latest grouped canonical publication date.

## Reproducible approved mappings

### Qubit — Our Compensation Plan 1

```text
Evidence ID    bir_src_000037
Canonical URL  https://medium.com/@QubitFin/our-compensation-plan-1-63e7c64738ed
Archive URL    https://web.archive.org/web/20220208083931/https://medium.com/@QubitFin/our-compensation-plan-1-63e7c64738ed
Run 1 bytes    93552
Run 2 bytes    93552
```

The exact snapshot was the only discovered capture and reproduced identically in both passes.

### Harmony — Summary of the Horizon Bridge Incident

```text
Evidence ID    bir_src_000068
Canonical URL  https://talk.harmony.one/t/summary-of-the-horizon-bridge-incident/20990
Archive URL    https://web.archive.org/web/20221009125416/https://talk.harmony.one/t/summary-of-the-horizon-bridge-incident/20990
Run 1 bytes    76658
Run 2 bytes    76658
```

Sixteen exact captures were discovered in each pass, fourteen were temporally eligible, and the same accepted snapshot reproduced in both passes.

## Deferred again

The following eight retry targets still did not satisfy the unchanged reproducible exact-replay boundary:

- `bir_src_000144`, `bir_src_000145`, `bir_src_000146`, `bir_src_000147` — ShuttleFlow closure forum post: six captures, three temporally eligible, no accepted replay in either pass.
- `bir_src_000191` — Everclear Q3 recap: three captures, all temporally eligible, no accepted replay in either pass.
- `bir_src_000148` — KinetFlow launch: one temporally eligible capture, no accepted replay in either pass.
- `bir_src_000189`, `bir_src_000260` — Everclear blog archive: twenty-two captures, five temporally eligible, no accepted replay in either pass.
- `bir_src_000195`, `bir_src_000263` — Commons shutdown page: seven captures, one temporally eligible, no accepted replay in either pass.
- `bir_src_000092` — pTokens application end-of-life: seven captures, none temporally eligible.
- `bir_src_000131` — Ren Foundation: eleven captures, one temporally eligible, no accepted replay in either pass.
- `bir_src_000015` — Reuters Harmony report: no exact capture discovered in either pass.

No acceptance rule was weakened to convert these records.

## Projected canonical effect

If and only if the two approved mappings are applied in a separate canonical PR, the expected source-quality state is:

```text
Evidence with archived_url          124 -> 126
Terminal unarchived unique URLs      17 -> 15
Terminal unarchived records          27 -> 25
Risky-host unarchived unique URLs    18 -> 17
Risky-host unarchived records        32 -> 31
X/Twitter records unarchived         29 -> 29
```

The permanent validator remains authoritative. Any mismatch between these projections and the validator must fail the canonical application rather than weakening a ceiling.

## Safety boundary

This review changes no canonical data. A separate fresh branch may apply only `bir_src_000037` and `bir_src_000068` with the exact archive URLs reproduced above. Source URLs, titles, claims, publication dates, source hierarchy, reliability, and record linkages must remain unchanged.
