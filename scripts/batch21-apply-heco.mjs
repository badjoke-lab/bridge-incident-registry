import fs from 'node:fs';

const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const write = (p, v) => fs.writeFileSync(p, JSON.stringify(v, null, 2) + '\n');

const bridges = read('data/bridges.json');
const incidents = read('data/incidents.json');
const events = read('data/events.json');
const evidence = read('data/evidence.json');

if (!bridges.some((r) => r.id === 'bir_bridge_000078')) {
  bridges.push({
    id: 'bir_bridge_000078',
    slug: 'heco-bridge',
    previous_slugs: [],
    redirect_from: [],
    canonical_name: 'HECO Bridge',
    type: 'asset_bridge',
    status: 'limited',
    summary: 'HECO Bridge was the cross-chain gateway used to move assets between HECO Chain and external networks including Ethereum. On November 22, 2023, the bridge was compromised in an incident independently attributed to compromise of the bridge operator wallet/private key, with approximately $86.6 million reported drained from the bridge. HTX and HECO suspended affected gateway and exchange transfer services while investigating.',
    confidence: 'high',
    record_maturity: 'reviewed',
    update_status: 'current',
    last_reviewed_at: '2026-09-04',
    last_verified_at: '2026-09-04',
    aliases: ['Heco Bridge', 'HECO Cross-Chain Bridge', 'HECO cross-chain gateway'],
    launch_date: null,
    launch_date_precision: 'unknown',
    end_date: null,
    end_date_precision: 'unknown',
    terminal_reason: null,
    official_url: 'https://www.htx.com/vi-vi/support/104954980569005/',
    official_domain: 'htx.com',
    official_url_status: 'live_verified',
    archived_url: null,
    primary_chains: ['ethereum', 'unknown'],
    primary_assets: ['unknown'],
    operator_name: 'HECO Chain / HTX ecosystem',
    operator_type: 'protocol ecosystem',
    ecosystem_name: 'HECO Chain',
    related_protocols: ['HTX'],
    brand_history_notes: null,
    major_incident_count: 1,
    has_unresolved_incident: true,
    has_reimbursement_history: false,
    successor_id: null,
    predecessor_id: null,
    replacement_bridge_id: null,
    duplicate_of: null,
    merged_into: null,
    notes: 'HECO has no dedicated BIR chain-reference key, so that side is represented as unknown. The reviewed evidence does not establish a dated unrestricted HECO Bridge reopening, final bridge-specific recovery, or bridge-specific reimbursement. HTX hot-wallet compensation is not generalized to the bridge loss.'
  });
}

if (!incidents.some((r) => r.id === 'bir_inc_000057')) {
  incidents.push({
    id: 'bir_inc_000057',
    bridge_id: 'bir_bridge_000078',
    slug: 'heco-bridge-2023-operator-key-compromise',
    previous_slugs: [],
    redirect_from: [],
    title: 'HECO Bridge 2023 operator-key compromise',
    incident_date: '2023-11-22',
    incident_date_precision: 'day',
    incident_type: 'exploit',
    summary: 'On November 22, 2023, HECO Bridge was drained after the bridge operator wallet was compromised. HTX confirmed a cyberattack affecting HTX and HECO Chain and suspended affected transfer services; independent security analysis attributed the bridge component to operator-key compromise and estimated approximately $86.6 million drained from HECO Bridge.',
    confidence: 'high',
    record_maturity: 'reviewed',
    update_status: 'current',
    source_count: 2,
    last_reviewed_at: '2026-09-04',
    last_verified_at: '2026-09-04',
    is_major_incident: true,
    reported_loss_usd_display: 'Approximately $86.6 million',
    reported_loss_usd: 86600000,
    reported_loss_usd_min: null,
    reported_loss_usd_max: null,
    reported_loss_text: 'Independent security analysis and contemporaneous reporting estimated approximately $86.6 million drained from HECO Bridge. HTX separately reported hot-wallet losses; those exchange losses are excluded from this bridge amount.',
    reported_loss_assets: ['unknown'],
    usd_valuation_date: '2023-11-22',
    loss_amount_basis: 'independent security analysis corroborated by contemporaneous reporting',
    amount_confidence: 'medium',
    amount_note: 'The canonical amount is bridge-specific. It must not be combined with HTX hot-wallet losses disclosed in the same incident window.',
    amount_claims: [{
      amount_text: 'HECO Bridge drain',
      amount_usd_text: 'approximately $86.6 million',
      source_id: 'bir_src_000417',
      basis: 'independent security analysis',
      usd_valuation_date: '2023-11-22',
      notes: 'Bridge-specific estimate from CertiK; HTX exchange hot-wallet losses remain outside this claim.'
    }],
    recovery_status: 'unknown',
    reimbursement_status: 'unknown',
    restart_status: 'paused',
    current_outcome: 'unknown',
    is_unresolved: true,
    unresolved_reason: [
      'Final HECO Bridge attacker-fund recovery is not established in the admitted evidence.',
      'HTX hot-wallet compensation does not establish HECO Bridge reimbursement.',
      'A dated unrestricted HECO Bridge reopening is not established.'
    ],
    affected_chains: ['ethereum', 'unknown'],
    affected_assets: ['unknown'],
    attack_vector_category: 'private_key_compromise',
    postmortem_available: 'partial',
    known_unknowns: [
      'The official HTX notice did not publish a bridge-specific technical root cause; operator-key compromise is supported by independent security analysis.',
      'Final recovered amount and reimbursement status remain unknown.',
      'Current unrestricted bridge operation is not established by the reviewed source package.'
    ],
    conflicting_claims: [],
    duplicate_of: null,
    merged_into: null,
    split_from: null,
    split_reason: null
  });
}

if (!events.some((r) => r.id === 'bir_ev_000258')) {
  events.push({
    id: 'bir_ev_000258',
    bridge_id: 'bir_bridge_000078',
    incident_id: 'bir_inc_000057',
    event_type: 'exploit_detected_and_bridge_paused',
    event_date: '2023-11-22',
    event_date_precision: 'day',
    title: 'HECO Bridge compromised and affected transfer services suspended',
    description: 'HTX confirmed a cyberattack affecting HTX and HECO Chain and suspended affected deposits, withdrawals, and the HECO Chain gateway while investigating. Independent analysis attributed the bridge drain to compromise of the bridge operator wallet.',
    confidence: 'high',
    record_maturity: 'reviewed',
    update_status: 'current',
    impact_level: 'major',
    status_effect: 'HECO gateway and affected transfer services suspended',
    source_count: 2,
    sort_order: 10,
    amount_text: 'approximately $86.6 million bridge-specific estimate',
    recovered_amount_text: null,
    reimbursement_status: 'unknown',
    restart_status: 'paused',
    affected_chains: ['ethereum', 'unknown'],
    affected_assets: ['unknown'],
    notes: 'HTX hot-wallet compensation is outside the HECO Bridge reimbursement boundary.',
    duplicate_of: null,
    merged_into: null
  });
}

if (!evidence.some((r) => r.id === 'bir_src_000416')) {
  evidence.push({
    id: 'bir_src_000416',
    bridge_id: 'bir_bridge_000078',
    incident_id: 'bir_inc_000057',
    event_id: 'bir_ev_000258',
    source_type: 'official_statement',
    title: 'HTX and HECO Chain Suffer Cyberattack',
    url: 'https://www.htx.com/vi-vi/support/104954980569005/',
    publisher: 'HTX',
    published_at: '2023-11-22',
    published_at_precision: 'day',
    reliability: 'high',
    source_tier: 'tier_1',
    url_status: 'live',
    accessed_at: '2026-09-04',
    claim_scope: 'incident_case',
    language: 'vi',
    author: null,
    quote_excerpt: null,
    is_primary: true,
    is_paywalled: false,
    is_official_domain: true,
    supports_amount: false,
    supports_recovery: false,
    supports_reimbursement: false,
    supports_reopen: false,
    supports_shutdown: true,
    supports_migration: false,
    notes: 'Primary evidence for the combined HTX/HECO attack response and gateway suspension. The notice quantifies HTX hot-wallet impact only, so it is not used for the HECO Bridge loss amount.'
  });
}

if (!evidence.some((r) => r.id === 'bir_src_000417')) {
  evidence.push({
    id: 'bir_src_000417',
    bridge_id: 'bir_bridge_000078',
    incident_id: 'bir_inc_000057',
    event_id: 'bir_ev_000258',
    source_type: 'security_analysis',
    title: 'Heco Bridge Exploit',
    url: 'https://www.certik.com/blog/heco-bridge-exploit',
    publisher: 'CertiK',
    published_at: '2023-11-23',
    published_at_precision: 'day',
    reliability: 'high',
    source_tier: 'tier_1',
    url_status: 'live',
    accessed_at: '2026-09-04',
    claim_scope: 'root_cause',
    language: 'en',
    author: null,
    quote_excerpt: null,
    is_primary: false,
    is_paywalled: false,
    is_official_domain: false,
    supports_amount: true,
    supports_recovery: false,
    supports_reimbursement: false,
    supports_reopen: false,
    supports_shutdown: false,
    supports_migration: false,
    notes: 'Independent technical analysis supporting bridge-operator/private-key compromise and the approximately $86.6 million HECO Bridge-specific loss estimate.'
  });
}

write('data/bridges.json', bridges);
write('data/incidents.json', incidents);
write('data/events.json', events);
write('data/evidence.json', evidence);
console.log('Applied HECO Bridge tranche 03 canonical records.');
