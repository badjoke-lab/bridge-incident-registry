# Phase 3 Archive Capture Batch 18 review — 2026-08-09

Status: complete review only  
Canonical data changed: no

## Execution

```text
Initial fixed-ten tooling run  31265648638
Initial tooling job            93123213481
Successful review run          31265683543
Successful review job          93123299099
Selected URLs                            9
Approved URLs                            4
Approved records                         4
```

The initial run failed before any candidate replay because the established historical reviewer required exactly ten unreviewed candidates while only nine eligible unique URLs remained. The temporary Batch 18 wrapper was corrected to preserve the existing selection order and review all remaining candidates when fewer than ten remain. No canonical data was changed by either run.

The successful review reused the established bounded archive-capture reviewer from immutable commit `7bd452ee8a86073355266cd0bbeec4bada8eb1b9` and ran two independent exact-CDX and replay passes.

Approval required all of the following in both passes:

- exact canonical source URL lookup, with only the established x.com/twitter.com same-status alias exception;
- snapshot date on or after the latest canonical `published_at` for the grouped URL;
- HTTP 200 HTML replay;
- at least 65,536 replay bytes;
- the same exact archive URL reproduced in both passes.

Wildcard, guessed, short, failed, temporally incompatible, or non-reproducible captures were not approved.

## Selection boundary

```text
Previously reviewed evidence IDs excluded  149
Eligible previously unreviewed unique URLs    9
Selected exact canonical source URLs          9
```

Batch 18 therefore exhausts the previously-unreviewed terminal/risky-host candidate set visible to the established reviewer. Future archive-preservation work must operate on explicitly deferred reviewed candidates or newly introduced canonical source URLs rather than pretending another untouched ten-URL batch exists.

## Reproducible approved mappings

### Avalanche Bridge AEB asset upgrade instructions

```text
Evidence ID    bir_src_000137
Queue          terminal
Canonical URL  https://support.avax.network/en/articles/6752048-how-do-i-upgrade-old-avalanche-bridge-aeb-assets
Archive URL    https://web.archive.org/web/20260515110436/https://support.avax.network/en/articles/6752048-how-do-i-upgrade-old-avalanche-bridge-aeb-assets
Run 1 bytes    97391
Run 2 bytes    97391
```

### Syndicate exploit linked to Commons Bridge compromise

```text
Evidence ID    bir_src_000197
Queue          terminal
Canonical URL  https://www.theblock.co/post/399318/syndicate-exploit
Archive URL    https://web.archive.org/web/20260430113142/https://www.theblock.co/post/399318/syndicate-exploit
Run 1 bytes    408326
Run 2 bytes    408326
```

### Everclear winds down protocol, Foundation and Labs

```text
Evidence ID    bir_src_000192
Queue          terminal
Canonical URL  https://www.theblock.co/post/402252/clear-token-tanks-48-everclear-winds-down-protocol-foundation-labs-unit
Archive URL    https://web.archive.org/web/20260524004034/https://www.theblock.co/post/402252/clear-token-tanks-48-everclear-winds-down-protocol-foundation-labs-unit
Run 1 bytes    418067
Run 2 bytes    418067
```

### renproject GitHub organization

```text
Evidence ID    bir_src_000132
Queue          terminal
Canonical URL  https://github.com/renproject
Archive URL    https://web.archive.org/web/20260724030838/https://github.com/renproject
Run 1 bytes    300186
Run 2 bytes    300186
```

## Deferred

The following five remaining previously-unreviewed URLs did not satisfy the reproducible exact-replay boundary and remain unmodified:

- `bir_src_000198` — DarkNavy Syndicate Commons Bridge analysis: no exact capture discovered in either pass.
- `bir_src_000195`, `bir_src_000263` — Commons shutdown page: seven captures discovered, one temporally eligible, but no accepted replay in either pass.
- `bir_src_000199` — The Block Syndicate Labs wind-down report: no exact capture discovered in either pass.
- `bir_src_000092` — pTokens end-of-life page: seven captures existed but none met the canonical publication-date boundary.
- `bir_src_000131` — Ren Foundation: eleven captures discovered and one temporally eligible, but no accepted replay in either pass.

## Projected canonical effect

If and only if the four approved mappings are applied in a separate canonical PR, the expected source-quality state is:

```text
Evidence with archived_url          120 -> 124
Terminal unarchived unique URLs      21 -> 17
Terminal unarchived records          31 -> 27
Risky-host unarchived unique URLs    18 -> 18
Risky-host unarchived records        32 -> 32
X/Twitter records unarchived         29 -> 29
```

The permanent validator remains authoritative. Any mismatch between these projections and the validator must fail the canonical application rather than weakening a ceiling.

## Safety boundary

This review changes no canonical data. A separate fresh branch may apply only the four mappings reproduced identically in both passes. Source URLs, titles, claims, dates, source tier, reliability, bridge linkage, incident linkage, event linkage, and all other evidence fields must remain unchanged.
