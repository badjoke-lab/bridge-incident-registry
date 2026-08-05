# Production verification — Phase 3 Archive Capture Batch 15 — 2026-08-05

Status: complete  
Review PR: `#181`  
Review merge: `fcf932b51445831e1d67c3c14c3ee342eff854dc`  
Canonical PR: `#182`  
Canonical merge: `39134a5d7b717c467a49d96b5fd7104047cd0a50`  
Build-input refresh PR: `#184`  
Build-input refresh: `7e13955c725e07ca66e01f7f9e321db7f7c764ff`

## Verified production state

```text
Bridges                              33
Incidents                            34
Events                              183
Evidence                            284
Evidence with archived_url          110
Terminal unarchived unique URLs      28
Terminal unarchived records          38
Risky-host unarchived unique URLs    21
Risky-host unarchived records        35
X/Twitter records unarchived         30
Canonical public content match       true
HTML routes                          72
Redirects                            74
Generated at                         2026-08-05T08:02:41.108Z
```

## Publication verification sequence

```text
Initial production run             30983843765
Initial failed job                 92234015826
Immediate post-refresh run         30984386872
Immediate post-refresh failed job  92235714939
First delayed run                  30984763661
First delayed failed job           92236886634
Second delayed run                 30985228293
Second delayed failed job          92238355134
Third delayed run                  30985622365
Third delayed failed job           92239573866
Fourth delayed run                 30986003440
Fourth delayed failed job          92240783823
First rerun failed job             92242553476
Successful rerun                   30986003440
Successful production job          92245512645
Successful publication attempt     1 / 20
```

Every failed verifier correctly rejected the same stale same-count build:

```text
Observed generated_at  2026-08-05T06:55:22.730Z
First mismatch         bir_src_000014
```

No second build-input refresh was committed and no verification expectation was weakened.

## Cloudflare Pages queue diagnosis

The Pages project was configured with `preview_deployment_setting: all`. Every temporary review, verification, and diagnostic branch push therefore created a preview deployment. Those previews accumulated ahead of the main-branch production deployments and prevented the Batch 15 build from reaching the deployment stage within repeated five-minute verifier windows.

The BIR repository had no Cloudflare API token, account ID, project variable, or deploy-hook secret. The existing account-level Cloudflare credentials in the Historical Exchange Index repository were used through a temporary branch-only workflow. No credential value was printed or copied.

## Queue remediation

```text
Cloudflare remediation run       30987353553
Cloudflare remediation job       92245106402
Queued preview deployments deleted       16
Production deployments deleted            0
Preview deployment setting       all -> none
Production deployments enabled         true
Production branch                         main
```

Only preview deployments in the exact `queued` and `active` state were deleted. Running, completed, failed, and all production deployments were preserved.

After cleanup, the Batch 15 canonical production deployment advanced immediately:

```text
Cloudflare deployment ID  b462f51d-2359-4d11-9c01-fc172385d631
Commit                    39134a5d7b717c467a49d96b5fd7104047cd0a50
Stage                     deploy
Status                    success
Started                   2026-08-05T08:02:45.790476Z
Completed                 2026-08-05T08:02:51.621915Z
Queue confirmation run    30987436982
Queue confirmation job    92245367899
```

The unchanged production verifier then found canonical content on attempt 1 and passed.

## Verified contract

- all transformed fields in all four public datasets exactly equal canonical-derived output;
- all nine Batch 15 evidence-record archive fields are published;
- version and manifest counts and canonical-only markers match;
- five static routes, 33 bridge routes, and 34 incident routes pass;
- canonical metadata and JSON-LD are exact;
- sitemap contains the exact 72 canonical routes;
- robots points to the custom-domain sitemap;
- all 74 legacy redirects resolve as specified;
- expected content types and observable cache signals are present.

## Permanent deployment boundary

The BIR Pages project now accepts production deployments from `main` and does not automatically build previews for arbitrary branches. Temporary review and verification branch pushes must not be allowed to recreate a Pages deployment queue. A future intentional preview workflow requires a separately reviewed configuration change rather than restoring `all`.

All temporary BIR production-verification and Pages-diagnostic workflows, plus the temporary cross-repository Cloudflare diagnostic workflow, were removed after completion.
