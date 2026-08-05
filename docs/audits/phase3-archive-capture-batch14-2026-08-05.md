# Phase 3 Archive Capture Batch 14 canonical migration — 2026-08-05

Status: canonical application complete  
Base main: `09c11e838a3b157a9efb7388f531ff04f723e4ff`  
Review PR: `#177`  
Review merge: `09c11e838a3b157a9efb7388f531ff04f723e4ff`  
Canonical application run: `30975819411`  
Canonical application job: `92209470596`  
Canonical branch result: `63deeb810948f8cf5ce6b2dd75b7ccf8bd420e92`

## Applied canonical scope

Only the five mappings reproduced in both completed review runs were applied:

```text
bir_src_000036
bir_src_000013
bir_src_000021
bir_src_000215
bir_src_000057
bir_src_000226
bir_src_000059
```

## Exact mappings

```text
bir_src_000036
https://web.archive.org/web/20220128170828/https://certik.medium.com/qubit-bridge-collapse-exploited-to-the-tune-of-80-million-a7ab9068e1a0

bir_src_000013
https://web.archive.org/web/20220624104205/https://www.cnbc.com/2022/06/24/hackers-steal-100-million-in-crypto-from-harmonys-horizon-bridge.html

bir_src_000021
bir_src_000215
https://web.archive.org/web/20221007090234/https://www.bnbchain.org/en/blog/bnb-chain-ecosystem-update/

bir_src_000057
bir_src_000226
https://web.archive.org/web/20221101043044/https://medium.com/@Knownsec_Blockchain_Lab/knownsec-blockchain-lab-li-finance-attack-incident-6304c6c728c9

bir_src_000059
https://web.archive.org/web/20220325073816/https://blocksecteam.medium.com/li-fi-attack-a-cross-chain-bridge-vulnerability-no-its-due-to-unchecked-external-call-c31e7dadf60f
```

## Verified result

```text
Bridges                              33
Incidents                            34
Events                              183
Evidence                            284
Evidence with archived_url      94 -> 101
Terminal unarchived unique URLs 36 -> 33
Terminal unarchived records     49 -> 45
Risky-host unarchived unique URLs 27 -> 24
Risky-host unarchived records   42 -> 38
X/Twitter unarchived records    30 -> 30
Incident source mismatches       0 -> 0
Event source mismatches          0 -> 0
Unknown URL status               0 -> 0
Invalid source URLs                   0
Invalid archived URLs                 0
```

The permanent source-quality validator observed exactly the expected values. Archive-risk units remain normalized unique source URLs with exact-or-subdomain host matching.

## Mutation safety

The completed applicator:

- asserted the corpus remained exactly 284 evidence records;
- asserted every evidence ID and canonical source URL exactly;
- rejected any target with a pre-existing `archived_url`;
- modified only the seven approved `archived_url` fields;
- lowered the permanent terminal unique-URL ceiling from 36 to 33;
- lowered the permanent risky-host unique-URL ceiling from 27 to 24;
- preserved every other field, count, source hierarchy, date, claim, reliability value, and linkage;
- removed its temporary script and write-enabled workflow before the final branch state.

## Verification

The successful bounded run passed:

- Type and Astro checks;
- canonical data and enum validation;
- first-ten and full-corpus audits;
- exact source-count equality;
- source-quality no-regression validation;
- controlled full-corpus, source-count, and source-quality failure tests;
- production-content equality tests;
- static build;
- 72 canonical HTML routes;
- 74 legacy redirects;
- built-output consistency and controlled failure fixtures.

Explicit full-content production verification remains required after merge.
