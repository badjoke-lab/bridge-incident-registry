# Phase 3 archive-risk inventory and Batch 1 review — 2026-07-31

Status: complete review boundary

## Inventory

```text
Terminal unarchived unique URLs      59
Risky-host unarchived unique URLs    88
Terminal-and-risky overlap           29
Union                               118
```

Archive obligations are counted by normalized unique source URL. Duplicate evidence records sharing one URL create one preservation obligation.

## Verified Batch 1

Five unique Wayback snapshots returned HTTP 200 and cover ten evidence records:

```text
bir_src_000035
  snapshot 20260322055923
bir_src_000039
  snapshot 20220222022746
bir_src_000086, bir_src_000230, bir_src_000231
  snapshot 20250317192844
bir_src_000088, bir_src_000232, bir_src_000233, bir_src_000234
  snapshot 20250717123748
bir_src_000090
  snapshot 20251115013400
```

The canonical migration must use the exact HTTPS Wayback snapshot routes captured in the reviewed workflow artifact.

## Deferred

`bir_src_000037` returned no available Wayback snapshot. It remains unarchived. No guessed timestamp or unrelated capture is approved.

## Expected result

```text
Evidence with archived_url              0 -> 10
Terminal unique-URL queue              59 -> 54
Risky-host unique-URL queue            88 -> 83
Terminal evidence-record queue         79 -> 69
Risky-host evidence-record queue      136 -> 126
Source-count mismatches                  0
Unknown URL status                       0
```

## Safety

Source URLs, tiers, reliability, primary status, claims, and linkages remain unchanged. Duplicate evidence records receive the same verified archive URL. Canonical migration must happen on a fresh branch.
