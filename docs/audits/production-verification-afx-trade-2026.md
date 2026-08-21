# AFX Trade 2026 production verification

Status: pending read-only verification  
Canonical merge: `fe41d1adc79d18039f41cfbcd21451c8695a7e23`  
Canonical counts: 41 bridges / 44 incidents / 206 events / 341 evidence

This verification-only branch is reset from exact merged `main` and exists only to prove publication of the reviewed AFX Trade July 2026 canonical package.

Acceptance requires:

- complete native production equality against exact merged main;
- all 41 bridge and 44 incident native JSON dossiers to match canonical-derived output;
- existing reviewed Series relationship transport to remain exactly valid;
- complete semantic equality for every generated `/data/series/**/*.json` file against exact-main build output, ignoring only environment-specific `generated_at` values;
- the AFX bridge and incident human routes to return HTTP 200.

No production mutation, deployment trigger, scheduler change, public-reader change, canonical JSON change, source-quality relaxation, performance-budget relaxation, or verifier relaxation is authorized by this PR. Close the PR without merge after successful verification.