# Production Verification — Deferred Archive Retry 02

Date: 2026-08-09
Canonical PR: #203
Canonical merge: `46b6e19700d8553c75c4555549b9ca308cbc7292`

## Expected production state

- 33 bridges
- 34 incidents
- 183 events
- 284 evidence records
- `bir_src_000166.archived_url` equals `https://web.archive.org/web/20221227131535/https://quillaudits.medium.com/decoding-rubic-exchange-exploit-quillaudits-44828e71c417`
- source-quality archive count: 127
- terminal unarchived unique URLs: 15
- risky-host unarchived unique URLs: 16

## Verification boundary

The production verifier must compare all four public canonical datasets against the merged canonical data at field level. Matching record counts alone are insufficient. The normal publication window remains 20 attempts with 15 seconds between attempts; the equality requirement is not weakened.

Production run result and live `generated_at` will be recorded after verification completes.
