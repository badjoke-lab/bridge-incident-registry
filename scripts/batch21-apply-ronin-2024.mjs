import fs from 'node:fs';

const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const write = (p, v) => fs.writeFileSync(p, JSON.stringify(v, null, 2) + '\n');

const bridges = read('data/bridges.json');
const incidents = read('data/incidents.json');
const events = read('data/events.json');
const evidence = read('data/evidence.json');

const ronin = bridges.find((r) => r.id === 'bir_bridge_000001');
if (!ronin) throw new Error('bir_bridge_000001 missing');
ronin.summary = 'Ronin Bridge is the bridge associated with the Ronin network. BIR records the March 2022 validator-key compromise and the distinct August 2024 bridge-upgrade incident in which operator-weight initialization failed, enabling temporary unauthorized withdrawals that were returned by whitehat/MEV actors before the vulnerability was fixed and independently audited.';
ronin.major_incident_count = 2;
ronin.has_unresolved_incident = false;
ronin.last_reviewed_at = '2026-09-04';
ronin.last_verified_at = '2026-09-04';
ronin.notes = 'The 2022 and 2024 incidents are separate lineages: 2022 involved validator-key compromise; 2024 involved an upgrade/operator-weight initialization failure. The 2024 outflow was returned and the fix was verified in a Ronin-hosted Beosin audit.';

if (!incidents.some((r) => r.id === 'bir_inc_000059')) {
  incidents.push({
    id: 'bir_inc_000059',
    bridge_id: 'bir_bridge_000001',
    slug: 'ronin-bridge-2024-operator-weight-initialization-incident',
    previous_slugs: [],
    redirect_from: [],
    title: 'Ronin Bridge 2024 operator-weight initialization incident',
    incident_date: '2024-08-06',
    incident_date_precision: 'day',
    incident_type: 'security_misconfiguration',
    summary: 'On August 6, 2024, a Ronin Bridge upgrade left bridge-operator weight parameters uninitialized, causing the withdrawal authorization threshold to be misinterpreted. Whitehat/MEV actors temporarily withdrew approximately 4,000 ETH and 2 million USDC, the bridge was paused, the assets were returned, and a recovery proposal restored the operator weights. A Ronin-hosted Beosin audit later verified that fake-credential withdrawals failed after the fix.',
    confidence: 'high',
    record_maturity: 'reviewed',
    update_status: 'current',
    source_count: 3,
    last_reviewed_at: '2026-09-04',
    last_verified_at: '2026-09-04',
    is_major_incident: true,
    reported_loss_usd_display: '4,000 ETH + 2M USDC temporarily withdrawn; returned',
    reported_loss_usd: null,
    reported_loss_usd_min: null,
    reported_loss_usd_max: null,
    reported_loss_text: 'Approximately 4,000 ETH and 2 million USDC were temporarily withdrawn. Contemporaneous reporting states both assets were returned, so the temporary roughly $11.8M–$12M valuation is not treated as final unrecovered loss.',
    reported_loss_assets: ['eth', 'usdc'],
    usd_valuation_date: null,
    loss_amount_basis: 'official security audit and contemporaneous reporting; returned assets preserved as token amounts',
    amount_confidence: 'high',
    amount_note: 'Temporary outflow is kept in token units and not converted into a canonical final-loss USD amount because the assets were returned.',
    amount_claims: [{
      amount_text: 'approximately 4,000 ETH and 2 million USDC temporarily withdrawn',
      amount_usd_text: null,
      source_id: 'bir_src_000423',
      basis: 'contemporaneous reporting quoting Ronin incident updates',
      usd_valuation_date: null,
      notes: 'Both ETH and USDC were subsequently reported returned.'
    }],
    recovery_status: 'whitehat_recovery',
    reimbursement_status: 'not_required',
    restart_status: 'unknown',
    current_outcome: 'active_after_incident',
    is_unresolved: false,
    unresolved_reason: [],
    affected_chains: ['ronin', 'ethereum'],
    affected_assets: ['eth', 'usdc'],
    attack_vector_category: 'contract_ownership_misconfiguration',
    postmortem_available: 'partial',
    known_unknowns: [
      'The admitted evidence package does not pin an exact unrestricted bridge-reopening timestamp.'
    ],
    conflicting_claims: [],
    duplicate_of: null,
    merged_into: null,
    split_from: null,
    split_reason: null
  });
}

if (!events.some((r) => r.id === 'bir_ev_000262')) {
  events.push({
    id: 'bir_ev_000262',
    bridge_id: 'bir_bridge_000001',
    incident_id: 'bir_inc_000059',
    event_type: 'exploit_detected_and_bridge_paused',
    event_date: '2024-08-06',
    event_date_precision: 'day',
    title: 'Upgrade misconfiguration exploited and Ronin Bridge paused',
    description: 'After a governance-deployed bridge upgrade, required operator-weight parameters were left uninitialized and the withdrawal threshold could be bypassed. Approximately 4,000 ETH and 2 million USDC were temporarily withdrawn before the bridge was paused.',
    confidence: 'high',
    record_maturity: 'reviewed',
    update_status: 'current',
    impact_level: 'major',
    status_effect: 'Bridge paused for investigation and remediation',
    source_count: 1,
    sort_order: 10,
    amount_text: 'approximately 4,000 ETH and 2 million USDC temporarily withdrawn',
    recovered_amount_text: null,
    reimbursement_status: 'not_required',
    restart_status: 'paused',
    affected_chains: ['ronin', 'ethereum'],
    affected_assets: ['eth', 'usdc'],
    notes: 'The temporary outflow was bounded by bridge withdrawal limits and was later returned.',
    duplicate_of: null,
    merged_into: null
  });
}

if (!events.some((r) => r.id === 'bir_ev_000263')) {
  events.push({
    id: 'bir_ev_000263',
    bridge_id: 'bir_bridge_000001',
    incident_id: 'bir_inc_000059',
    event_type: 'recovery_completed',
    event_date: '2024-08-06',
    event_date_precision: 'day',
    title: 'Whitehat actors return withdrawn ETH and USDC',
    description: 'Ronin reported that the approximately 4,000 ETH was returned and that the remaining 2 million USDC was subsequently received. The actors were treated as whitehats/MEV actors and a $500,000 bounty was announced.',
    confidence: 'high',
    record_maturity: 'reviewed',
    update_status: 'current',
    impact_level: 'major',
    status_effect: 'Temporary bridge outflow returned',
    source_count: 1,
    sort_order: 20,
    amount_text: 'approximately 4,000 ETH and 2 million USDC',
    recovered_amount_text: 'approximately 4,000 ETH and 2 million USDC returned',
    reimbursement_status: 'not_required',
    restart_status: 'unknown',
    affected_chains: ['ronin', 'ethereum'],
    affected_assets: ['eth', 'usdc'],
    notes: 'Return of the withdrawn assets is modeled as recovery, not user reimbursement.',
    duplicate_of: null,
    merged_into: null
  });
}

if (!events.some((r) => r.id === 'bir_ev_000264')) {
  events.push({
    id: 'bir_ev_000264',
    bridge_id: 'bir_bridge_000001',
    incident_id: 'bir_inc_000059',
    event_type: 'security_audit_completed',
    event_date: '2024-08-21',
    event_date_precision: 'day',
    title: 'Ronin-hosted security audit verifies operator-weight recovery fix',
    description: 'Beosin’s Ronin-hosted audit confirmed that the affected upgrade had omitted operator-weight initialization, reviewed the recovery script, and verified that fake-credential withdrawals failed after the operator weights were restored.',
    confidence: 'high',
    record_maturity: 'reviewed',
    update_status: 'current',
    impact_level: 'major',
    status_effect: 'Recovery fix independently verified',
    source_count: 1,
    sort_order: 30,
    amount_text: null,
    recovered_amount_text: null,
    reimbursement_status: 'not_required',
    restart_status: 'unknown',
    affected_chains: ['ronin', 'ethereum'],
    affected_assets: ['eth', 'usdc'],
    notes: 'Event date uses the audit publication date, not an inferred deployment timestamp.',
    duplicate_of: null,
    merged_into: null
  });
}

for (const src of [
  {
    id: 'bir_src_000422', event_id: 'bir_ev_000262', source_type: 'security_report', title: 'Ronin Bridge Security Audit', url: 'https://docs.roninchain.com/assets/files/Beosin-Audit-Ronin-Bridge-August-24-cce7cef08749809d6353fe1443711e99.pdf', publisher: 'Beosin Security Team', published_at: '2024-08-21', claim_scope: 'root_cause', is_primary: true, is_official_domain: true, supports_amount: false, supports_recovery: false, supports_reopen: false, supports_shutdown: false, notes: 'Ronin-hosted technical audit confirming the affected upgrade omitted operator-weight initialization and documenting the attack-related scripts.'
  },
  {
    id: 'bir_src_000423', event_id: 'bir_ev_000263', source_type: 'news_article', title: 'Ronin bridge pauses amid $11.8 million outflow to MEV bot white hats', url: 'https://www.theblock.co/news/regulation/2024-08-06-ronin-bridge-pauses-309707', publisher: 'The Block', published_at: '2024-08-06', claim_scope: 'recovery', is_primary: false, is_official_domain: false, supports_amount: true, supports_recovery: true, supports_reopen: false, supports_shutdown: true, notes: 'Contemporaneous report quoting Ronin incident updates for the 4,000 ETH + 2M USDC outflow, pause, whitehat framing, and subsequent return of both assets.'
  },
  {
    id: 'bir_src_000424', event_id: 'bir_ev_000264', source_type: 'security_report', title: 'Ronin Bridge Security Audit', url: 'https://docs.roninchain.com/assets/files/Beosin-Audit-Ronin-Bridge-August-24-cce7cef08749809d6353fe1443711e99.pdf', publisher: 'Beosin Security Team', published_at: '2024-08-21', claim_scope: 'security_patch', is_primary: true, is_official_domain: true, supports_amount: false, supports_recovery: false, supports_reopen: false, supports_shutdown: false, notes: 'Ronin-hosted audit verifying the recovery proposal restored operator weights and fake-credential withdrawal attempts failed after the fix.'
  }
]) {
  if (!evidence.some((r) => r.id === src.id)) {
    evidence.push({
      id: src.id,
      bridge_id: 'bir_bridge_000001',
      incident_id: 'bir_inc_000059',
      event_id: src.event_id,
      source_type: src.source_type,
      title: src.title,
      url: src.url,
      publisher: src.publisher,
      published_at: src.published_at,
      published_at_precision: 'day',
      reliability: 'high',
      source_tier: 'tier_1',
      url_status: 'live',
      accessed_at: '2026-09-04',
      claim_scope: src.claim_scope,
      language: 'en',
      author: null,
      quote_excerpt: null,
      is_primary: src.is_primary,
      is_paywalled: false,
      is_official_domain: src.is_official_domain,
      supports_amount: src.supports_amount,
      supports_recovery: src.supports_recovery,
      supports_reimbursement: false,
      supports_reopen: src.supports_reopen,
      supports_shutdown: src.supports_shutdown,
      supports_migration: false,
      notes: src.notes
    });
  }
}

write('data/bridges.json', bridges);
write('data/incidents.json', incidents);
write('data/events.json', events);
write('data/evidence.json', evidence);
console.log('Applied Ronin 2024 Batch 21 tranche 05 canonical records.');
