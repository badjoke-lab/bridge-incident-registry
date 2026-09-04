import fs from 'node:fs';

const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const write = (p, v) => fs.writeFileSync(p, JSON.stringify(v, null, 2) + '\n');

const bridges = read('data/bridges.json');
const incidents = read('data/incidents.json');
const events = read('data/events.json');
const evidence = read('data/evidence.json');

if (!bridges.some((r) => r.id === 'bir_bridge_000079')) {
  bridges.push({
    id: 'bir_bridge_000079',
    slug: 'icon-sodax-migration-bridge',
    previous_slugs: [],
    redirect_from: [],
    canonical_name: 'ICON–SODAX Migration Bridge',
    type: 'asset_bridge',
    status: 'active',
    summary: 'The ICON–SODAX migration bridge is the migration and withdrawal path connecting ICON-held ICX/bnUSD with SODAX-side assets through the ICON migration contract and SODAX Asset Manager. On August 27, 2026, a replay defect in signed withdrawal-message uniqueness handling allowed repeated releases of foundation-held assets. The affected withdrawal path was paused, the ICON Network was temporarily halted, and a corrected contract was deployed before network operation resumed on August 28.',
    confidence: 'high',
    record_maturity: 'reviewed',
    update_status: 'current',
    last_reviewed_at: '2026-09-04',
    last_verified_at: '2026-09-04',
    aliases: ['ICON migration bridge', 'ICON–SODAX bridge', 'SODAX Asset Manager withdrawal path'],
    launch_date: null,
    launch_date_precision: 'unknown',
    end_date: null,
    end_date_precision: 'unknown',
    terminal_reason: null,
    official_url: 'https://www.icon.foundation/blog/2026/icon-network-replay-exploit-post-mortem',
    official_domain: 'icon.foundation',
    official_url_status: 'live',
    archived_url: null,
    primary_chains: ['unknown'],
    primary_assets: ['unknown'],
    operator_name: 'ICON Foundation / SODAX',
    operator_type: 'protocol ecosystem',
    ecosystem_name: 'ICON / SODAX',
    related_protocols: ['ICON Network', 'SODAX'],
    brand_history_notes: 'This record is scoped to the migration/withdrawal bridge path during the ICON-to-SODAX transition, not to the ICON L1 or SODAX protocol generally.',
    major_incident_count: 1,
    has_unresolved_incident: true,
    has_reimbursement_history: false,
    successor_id: null,
    predecessor_id: null,
    replacement_bridge_id: null,
    duplicate_of: null,
    merged_into: null,
    notes: 'BIR has no dedicated ICON or Sonic chain-reference key in the current vocabulary, so the chain side remains unknown. The first-party postmortem states all affected assets were foundation-held and no user deposits, balances, or positions were accessed or affected.'
  });
}

if (!incidents.some((r) => r.id === 'bir_inc_000058')) {
  incidents.push({
    id: 'bir_inc_000058',
    bridge_id: 'bir_bridge_000079',
    slug: 'icon-sodax-2026-withdrawal-message-replay-exploit',
    previous_slugs: [],
    redirect_from: [],
    title: 'ICON–SODAX 2026 withdrawal-message replay exploit',
    incident_date: '2026-08-27',
    incident_date_precision: 'day',
    incident_type: 'exploit',
    summary: 'On August 27, 2026, an attacker replayed two previously legitimate signed withdrawal messages through the ICON migration contract / SODAX Asset Manager path. A serial-number precision defect meant the uniqueness check and signature verification did not validate the same exact value, allowing 1,490 successful repeated calls and unauthorized release of foundation-held assets. The withdrawal path was paused and ICON Network was temporarily halted before a corrected contract and additional relayer control were deployed.',
    confidence: 'high',
    record_maturity: 'reviewed',
    update_status: 'current',
    source_count: 3,
    last_reviewed_at: '2026-09-04',
    last_verified_at: '2026-09-04',
    is_major_incident: true,
    reported_loss_usd_display: '150.2 ETH + 31,204 USDC confirmed net loss',
    reported_loss_usd: null,
    reported_loss_usd_min: null,
    reported_loss_usd_max: null,
    reported_loss_text: 'The ICON Foundation postmortem reported confirmed net loss of approximately 150.2 ETH plus 31,204 USDC. The gross 119,866,000 ICX release is not treated as final realized loss because most ICX was traced/frozen at exchanges and recovery remained active.',
    reported_loss_assets: ['eth', 'usdc'],
    usd_valuation_date: null,
    loss_amount_basis: 'official postmortem; token amounts preserved without USD conversion',
    amount_confidence: 'high',
    amount_note: 'Preserves the first-party confirmed-net-loss boundary rather than converting gross released ICX into a USD loss estimate.',
    amount_claims: [{
      amount_text: 'approximately 150.2 ETH plus 31,204 USDC confirmed net loss',
      amount_usd_text: null,
      source_id: 'bir_src_000419',
      basis: 'official postmortem',
      usd_valuation_date: null,
      notes: 'The same postmortem says most exploited ICX was traced/frozen and in active recovery.'
    }],
    recovery_status: 'partial_recovery',
    reimbursement_status: 'unknown',
    restart_status: 'reopened',
    current_outcome: 'active_after_incident',
    is_unresolved: true,
    unresolved_reason: [
      'Exchange-frozen ICX recovery was still active at postmortem publication.',
      'No reimbursement program or final reimbursement outcome is established in the admitted evidence.'
    ],
    affected_chains: ['unknown', 'ethereum'],
    affected_assets: ['unknown', 'eth', 'usdc'],
    attack_vector_category: 'message_verification_failure',
    postmortem_available: 'full',
    known_unknowns: [
      'Final amount of frozen ICX ultimately recovered after the August 30 postmortem is not established here.',
      'No canonical ICON or Sonic chain-reference key exists in this batch.'
    ],
    conflicting_claims: [],
    duplicate_of: null,
    merged_into: null,
    split_from: null,
    split_reason: null
  });
}

if (!events.some((r) => r.id === 'bir_ev_000259')) {
  events.push({
    id: 'bir_ev_000259',
    bridge_id: 'bir_bridge_000079',
    incident_id: 'bir_inc_000058',
    event_type: 'exploit_disclosed',
    event_date: '2026-08-27',
    event_date_precision: 'day',
    title: 'Withdrawal-message replay exploit releases foundation-held assets',
    description: 'Two previously legitimate signed withdrawal messages were replayed 1,492 times; 1,490 calls succeeded, releasing 119,866,000 ICX and 531,600 bnUSD to an attacker-controlled relayer wallet. The postmortem distinguishes gross released assets from later confirmed net loss and states user deposits, balances, and positions were not affected.',
    confidence: 'high',
    record_maturity: 'reviewed',
    update_status: 'current',
    impact_level: 'major',
    status_effect: 'Unauthorized bridge-path releases occurred',
    source_count: 1,
    sort_order: 10,
    amount_text: '119,866,000 ICX and 531,600 bnUSD gross released; confirmed net loss later reported as 150.2 ETH + 31,204 USDC',
    recovered_amount_text: null,
    reimbursement_status: 'unknown',
    restart_status: 'unknown',
    affected_chains: ['unknown'],
    affected_assets: ['unknown'],
    notes: 'Gross released ICX/bnUSD is not treated as final realized loss.',
    duplicate_of: null,
    merged_into: null
  });
}

if (!events.some((r) => r.id === 'bir_ev_000260')) {
  events.push({
    id: 'bir_ev_000260',
    bridge_id: 'bir_bridge_000079',
    incident_id: 'bir_inc_000058',
    event_type: 'service_suspended',
    event_date: '2026-08-27',
    event_date_precision: 'day',
    title: 'Withdrawal path paused and ICON Network halted for containment',
    description: 'The affected withdrawal path was paused at 03:53 UTC. ICON Network was then halted at 06:18:54 UTC as an additional containment measure, freezing balances on-chain while exchange-side freeze coordination continued.',
    confidence: 'high',
    record_maturity: 'reviewed',
    update_status: 'current',
    impact_level: 'major',
    status_effect: 'Affected withdrawal path paused; ICON Network temporarily halted',
    source_count: 1,
    sort_order: 20,
    amount_text: null,
    recovered_amount_text: null,
    reimbursement_status: 'unknown',
    restart_status: 'paused',
    affected_chains: ['unknown'],
    affected_assets: ['unknown'],
    notes: 'Bridge-path pause and network-wide halt are distinct containment actions.',
    duplicate_of: null,
    merged_into: null
  });
}

if (!events.some((r) => r.id === 'bir_ev_000261')) {
  events.push({
    id: 'bir_ev_000261',
    bridge_id: 'bir_bridge_000079',
    incident_id: 'bir_inc_000058',
    event_type: 'network_resumed',
    event_date: '2026-08-28',
    event_date_precision: 'day',
    title: 'Corrected contract deployed and ICON Network resumed',
    description: 'The serialization defect was corrected, authorized-relayer allowlisting was added, and the ICON Network resumed at approximately 07:51 UTC on August 28, 2026. The postmortem reported bnUSD and SODA recovery while exchange-frozen ICX recovery remained active.',
    confidence: 'high',
    record_maturity: 'reviewed',
    update_status: 'current',
    impact_level: 'major',
    status_effect: 'Network resumed after bridge-path fix; recovery remained in progress',
    source_count: 1,
    sort_order: 30,
    amount_text: 'Confirmed net loss approximately 150.2 ETH + 31,204 USDC at postmortem publication',
    recovered_amount_text: '531,600 bnUSD and 1,366,000 SODA reported recovered in full; 82,430 USDC recovered; most ICX traced/frozen and recovery ongoing',
    reimbursement_status: 'unknown',
    restart_status: 'reopened',
    affected_chains: ['unknown', 'ethereum'],
    affected_assets: ['unknown', 'eth', 'usdc'],
    notes: 'Restart does not imply completed recovery.',
    duplicate_of: null,
    merged_into: null
  });
}

for (const src of [
  {
    id: 'bir_src_000419', event_id: 'bir_ev_000259', claim_scope: 'incident_case', supports_amount: true, supports_recovery: false, supports_reopen: false, supports_shutdown: false,
    notes: 'Primary first-party postmortem for the replay exploit, root cause, gross released assets, and confirmed net-loss boundary.'
  },
  {
    id: 'bir_src_000420', event_id: 'bir_ev_000260', claim_scope: 'incident_followup', supports_amount: false, supports_recovery: false, supports_reopen: false, supports_shutdown: true,
    notes: 'Primary first-party postmortem for the withdrawal-path pause, ICON network halt, and containment timeline.'
  },
  {
    id: 'bir_src_000421', event_id: 'bir_ev_000261', claim_scope: 'recovery', supports_amount: true, supports_recovery: true, supports_reopen: true, supports_shutdown: false,
    notes: 'Primary first-party postmortem for the corrected contract, August 28 restart, recovered bnUSD/SODA/USDC amounts, and ongoing exchange-frozen ICX recovery.'
  }
]) {
  if (!evidence.some((r) => r.id === src.id)) {
    evidence.push({
      id: src.id,
      bridge_id: 'bir_bridge_000079',
      incident_id: 'bir_inc_000058',
      event_id: src.event_id,
      source_type: 'official_blog',
      title: 'ICON Network: Replay Exploit Post-Mortem',
      url: 'https://www.icon.foundation/blog/2026/icon-network-replay-exploit-post-mortem',
      publisher: 'ICON Foundation',
      published_at: '2026-08-30',
      published_at_precision: 'day',
      reliability: 'high',
      source_tier: 'tier_1',
      url_status: 'live',
      accessed_at: '2026-09-04',
      claim_scope: src.claim_scope,
      language: 'en',
      author: null,
      quote_excerpt: null,
      is_primary: true,
      is_paywalled: false,
      is_official_domain: true,
      supports_amount: src.supports_amount,
      supports_recovery: src.supports_recovery,
      supports_reimbursement: false,
      supports_reopen: src.supports_reopen,
      supports_shutdown: src.supports_shutdown,
      supports_migration: true,
      notes: src.notes
    });
  }
}

write('data/bridges.json', bridges);
write('data/incidents.json', incidents);
write('data/events.json', events);
write('data/evidence.json', evidence);
console.log('Applied ICON/SODAX Batch 21 tranche 04 canonical records.');
