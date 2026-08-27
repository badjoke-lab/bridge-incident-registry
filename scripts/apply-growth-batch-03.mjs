import fs from 'node:fs';

const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const write = (p, v) => fs.writeFileSync(p, JSON.stringify(v, null, 2) + '\n');

const bridges = read('data/bridges.json');
const incidents = read('data/incidents.json');
const events = read('data/events.json');
const evidence = read('data/evidence.json');

if (bridges.length !== 43 || incidents.length !== 49 || events.length !== 218 || evidence.length !== 356) {
  throw new Error(`unexpected fresh-main counts ${bridges.length}/${incidents.length}/${events.length}/${evidence.length}`);
}
for (const id of ['bir_bridge_000044','bir_bridge_000045']) if (bridges.some(x => x.id === id)) throw new Error(`collision ${id}`);
for (const id of ['bir_inc_000050','bir_inc_000051']) if (incidents.some(x => x.id === id)) throw new Error(`collision ${id}`);
for (const id of ['bir_ev_000219','bir_ev_000220']) if (events.some(x => x.id === id)) throw new Error(`collision ${id}`);
for (const id of ['bir_src_000358','bir_src_000359']) if (evidence.some(x => x.id === id)) throw new Error(`collision ${id}`);

const b0 = structuredClone(bridges.at(-1));
const i0 = structuredClone(incidents.at(-1));
const e0 = structuredClone(events.at(-1));
const s0 = structuredClone(evidence.at(-1));

const bxhBridge = {...b0,
  id:'bir_bridge_000044', slug:'bxh-cross-chain-bridge', previous_slugs:[], redirect_from:[],
  canonical_name:'BXH Cross-chain Bridge', type:'asset_bridge', status:'dead',
  summary:'BXH operated cross-chain bridge functionality within its DeFi platform. BXH states that a September 21, 2022 security incident affected user assets including cross-chain bridge positions, followed by a compensation program and an announced exit from the DeFi product.',
  confidence:'high', record_maturity:'reviewed', update_status:'current', last_reviewed_at:'2026-08-27', last_verified_at:'2026-08-27',
  aliases:['BXH Bridge','BXH Cross-chain Bridge'], launch_date:null, launch_date_precision:'unknown', end_date:'2022-09', end_date_precision:'month', terminal_reason:'BXH announced that its DeFi platform would exit and compensation work would move toward the BXH Exchange.',
  official_url:'https://bxh.gitbook.io/english/notice/bxhs-latest-announcement-on-compensation-program-30-sep-2022', official_domain:'bxh.gitbook.io', official_url_status:'live', archived_url:'https://web.archive.org/web/*/https://bxh.gitbook.io/english/notice/bxhs-latest-announcement-on-compensation-program-30-sep-2022',
  primary_chains:['avalanche','unknown'], primary_assets:['unknown'], operator_name:'BXH', operator_type:'protocol ecosystem', ecosystem_name:'BXH', related_protocols:['BXH DeFi'], brand_history_notes:null,
  major_incident_count:1, has_unresolved_incident:true, has_reimbursement_history:true, successor_id:null, predecessor_id:null, replacement_bridge_id:null, duplicate_of:null, merged_into:null,
  notes:'HECO and OEC are named in the first-party compensation material but are retained as unknown chain references here because BIR does not currently define dedicated HECO/OEC reference keys. Bridge-only USD loss is intentionally not inferred from mixed LP/bridge material.'
};

const cellBridge = {...b0,
  id:'bir_bridge_000045', slug:'cellframe-bridge', previous_slugs:[], redirect_from:[],
  canonical_name:'Cellframe Bridge', type:'asset_bridge', status:'limited',
  summary:'Cellframe operates a bridge for assets including USDC. In a May 2026 AMA, the team said it had announced a bridge hack and illegal token issuance, then hardened the bridge by separating hot and cold components and moving USDC away from older protocols while investigation continued.',
  confidence:'high', record_maturity:'reviewed', update_status:'current', last_reviewed_at:'2026-08-27', last_verified_at:'2026-08-27',
  aliases:['Cellframe bridge'], launch_date:null, launch_date_precision:'unknown', end_date:null, end_date_precision:'unknown', terminal_reason:null,
  official_url:'https://cellframe.net/', official_domain:'cellframe.net', official_url_status:'live', archived_url:null,
  primary_chains:['unknown'], primary_assets:['usdc','unknown'], operator_name:'Cellframe', operator_type:'protocol ecosystem', ecosystem_name:'Cellframe', related_protocols:['Cellframe'], brand_history_notes:null,
  major_incident_count:1, has_unresolved_incident:true, has_reimbursement_history:false, successor_id:null, predecessor_id:null, replacement_bridge_id:null, duplicate_of:null, merged_into:null,
  notes:'Current operation is kept limited because the official May 2026 AMA describes ongoing investigation and hardening but does not establish a fully resolved incident boundary or total damage.'
};

const bxhIncident = {...i0,
  id:'bir_inc_000050', bridge_id:'bir_bridge_000044', slug:'bxh-cross-chain-bridge-2022-security-incident', previous_slugs:[], redirect_from:[], title:'BXH Cross-chain Bridge 2022 security incident',
  incident_date:'2022-09-21', incident_date_precision:'day', incident_type:'exploit',
  summary:'BXH states that its DeFi platform was hacked on September 21, 2022. Its later compensation notice explicitly includes users whose assets were lost in the cross-chain bridge, while keeping those losses distinct from LP positions and from a separate September 27 flash-loan attack.',
  confidence:'high', record_maturity:'reviewed', update_status:'current', source_count:1, last_reviewed_at:'2026-08-27', last_verified_at:'2026-08-27', is_major_incident:true,
  reported_loss_usd_display:null, reported_loss_usd:null, reported_loss_usd_min:null, reported_loss_usd_max:null, reported_loss_text:'No reviewed first-party source supports one bridge-only USD loss total.', reported_loss_assets:['unknown'], usd_valuation_date:null, loss_amount_basis:'first-party compensation material; bridge-only amount intentionally unresolved', amount_confidence:'high', amount_note:'Mixed DeFi loss figures are not assigned to the bridge record.', amount_claims:[],
  recovery_status:'none_confirmed', reimbursement_status:'announced', restart_status:'not_reopened', current_outcome:'limited_after_incident', is_unresolved:true,
  unresolved_reason:['Final bridge-user compensation completion is not established by the reviewed evidence.','A bridge-only loss total is not established.'],
  affected_chains:['avalanche','unknown'], affected_assets:['unknown'], attack_vector_category:'private_key_compromise', postmortem_available:'partial',
  known_unknowns:['Bridge-only stolen-value total is not established.','Final compensation completion for cross-chain bridge positions is not established.'], conflicting_claims:[], duplicate_of:null, merged_into:null, split_from:null, split_reason:null
};

const cellIncident = {...i0,
  id:'bir_inc_000051', bridge_id:'bir_bridge_000045', slug:'cellframe-bridge-2026-hack-illegal-token-issuance', previous_slugs:[], redirect_from:[], title:'Cellframe Bridge 2026 hack and illegal token issuance',
  incident_date:'2026-05', incident_date_precision:'month', incident_type:'exploit',
  summary:'In a May 14, 2026 AMA, Cellframe said the team had announced a hack of the Cellframe bridge and illegal token issuance. The AMA cited about $2,000 for the illegal issuance in the question boundary, while explicitly stating that total damage had not yet been calculated and the internal investigation continued.',
  confidence:'high', record_maturity:'reviewed', update_status:'current', source_count:1, last_reviewed_at:'2026-08-27', last_verified_at:'2026-08-27', is_major_incident:true,
  reported_loss_usd_display:null, reported_loss_usd:null, reported_loss_usd_min:null, reported_loss_usd_max:null, reported_loss_text:'Approximately $2,000 was cited for illegal token issuance; total incident damage was explicitly not yet calculated.', reported_loss_assets:['unknown'], usd_valuation_date:null, loss_amount_basis:'first-party AMA; partial amount only', amount_confidence:'high', amount_note:'The $2,000 figure is not promoted to a total-loss estimate.', amount_claims:[],
  recovery_status:'partial', reimbursement_status:'unknown', restart_status:'limited', current_outcome:'limited_after_incident', is_unresolved:true,
  unresolved_reason:['Cellframe said the internal investigation was continuing and total damage had not been calculated.'], affected_chains:['unknown'], affected_assets:['usdc','unknown'], attack_vector_category:'unknown', postmortem_available:'partial',
  known_unknowns:['Total damage remains unquantified in the reviewed first-party source.','The complete attack path and final recovery boundary are not established.'], conflicting_claims:[], duplicate_of:null, merged_into:null, split_from:null, split_reason:null
};

const bxhEvent = {...e0,
  id:'bir_ev_000219', bridge_id:'bir_bridge_000044', incident_id:'bir_inc_000050', event_type:'exploit_disclosed', event_date:'2022-09-21', event_date_precision:'day', title:'BXH September 2022 security incident affects bridge positions',
  description:'BXH later identified the September 21 hack and explicitly included users with assets lost in cross-chain bridge positions in its compensation program.', confidence:'high', record_maturity:'reviewed', update_status:'current', impact_level:'major', status_effect:'bridge positions affected; compensation announced', source_count:1, sort_order:10,
  amount_text:'Bridge-only amount not established', recovered_amount_text:null, reimbursement_status:'announced', restart_status:'not_reopened', affected_chains:['avalanche','unknown'], affected_assets:['unknown'], notes:'Separate September 27 flash-loan losses are not merged into this bridge incident.', duplicate_of:null, merged_into:null
};

const cellEvent = {...e0,
  id:'bir_ev_000220', bridge_id:'bir_bridge_000045', incident_id:'bir_inc_000051', event_type:'exploit_disclosed', event_date:'2026-05', event_date_precision:'month', title:'Cellframe discloses bridge hack and illegal token issuance',
  description:'Cellframe described a bridge hack and illegal token issuance, said USDC was moved off older protocols, and described hot/cold bridge hardening while investigation continued.', confidence:'high', record_maturity:'reviewed', update_status:'current', impact_level:'major', status_effect:'bridge hardened; investigation ongoing', source_count:1, sort_order:10,
  amount_text:'approximately $2,000 cited for illegal issuance; total damage not calculated', recovered_amount_text:'some funds frozen, but full compensation not assured', reimbursement_status:'unknown', restart_status:'limited', affected_chains:['unknown'], affected_assets:['usdc','unknown'], notes:'The official AMA does not provide a complete total-loss figure.', duplicate_of:null, merged_into:null
};

const bxhSource = {...s0,
  id:'bir_src_000358', bridge_id:'bir_bridge_000044', incident_id:'bir_inc_000050', event_id:'bir_ev_000219', source_type:'official_website', title:'BXH latest announcement on compensation program',
  url:'https://bxh.gitbook.io/english/notice/bxhs-latest-announcement-on-compensation-program-30-sep-2022', publisher:'BXH', published_at:'2022-09-30', published_at_precision:'day', reliability:'high', source_tier:'tier_1', url_status:'live', accessed_at:'2026-08-27', claim_scope:'incident_case', language:'en', author:null, quote_excerpt:null,
  is_primary:true, is_paywalled:false, is_official_domain:false, supports_amount:false, supports_recovery:false, supports_reimbursement:true, supports_reopen:false, supports_shutdown:true, supports_migration:false,
  notes:'First-party BXH notice stating the DeFi platform was hacked on September 21, announcing DeFi exit, and explicitly including cross-chain bridge losses in the compensation program.', archived_url:'https://web.archive.org/web/*/https://bxh.gitbook.io/english/notice/bxhs-latest-announcement-on-compensation-program-30-sep-2022'
};

const cellSource = {...s0,
  id:'bir_src_000359', bridge_id:'bir_bridge_000045', incident_id:'bir_inc_000051', event_id:'bir_ev_000220', source_type:'official_website', title:'AMA with Dmitry Gerasimov, May 7, 2026',
  url:'https://cellframe.net/blog/ama-with-dmitry-gerasimov-may-7-2026/', publisher:'Cellframe', published_at:'2026-05-14', published_at_precision:'day', reliability:'high', source_tier:'tier_1', url_status:'live', accessed_at:'2026-08-27', claim_scope:'incident_case', language:'en', author:'Dmitry Gerasimov', quote_excerpt:null,
  is_primary:true, is_paywalled:false, is_official_domain:true, supports_amount:true, supports_recovery:true, supports_reimbursement:false, supports_reopen:false, supports_shutdown:false, supports_migration:false,
  notes:'First-party AMA documenting the bridge hack / illegal token issuance boundary, bridge hardening, partial frozen funds, ongoing investigation, and explicit uncertainty around total damage.', archived_url:null
};

bridges.push(bxhBridge, cellBridge);
incidents.push(bxhIncident, cellIncident);
events.push(bxhEvent, cellEvent);
evidence.push(bxhSource, cellSource);
write('data/bridges.json', bridges); write('data/incidents.json', incidents); write('data/events.json', events); write('data/evidence.json', evidence);

const docPaths = ['README.md','docs/runbooks/current-status.md','docs/runbooks/recovery-checkpoint.md','docs/runbooks/development-roadmap.md','docs/runbooks/public-consistency-remediation.md'];
for (const p of docPaths) {
  if (!fs.existsSync(p)) continue;
  let t = fs.readFileSync(p,'utf8');
  t = t.replaceAll('43 bridges', '45 bridges').replaceAll('43 Bridges', '45 Bridges')
       .replaceAll('49 incidents', '51 incidents').replaceAll('49 Incidents', '51 Incidents')
       .replaceAll('218 events', '220 events').replaceAll('218 Events', '220 Events')
       .replaceAll('356 evidence', '358 evidence').replaceAll('356 Evidence', '358 Evidence')
       .replaceAll('Bridges   43', 'Bridges   45').replaceAll('Incidents   49', 'Incidents   51')
       .replaceAll('Events   218', 'Events   220').replaceAll('Evidence   356', 'Evidence   358');
  fs.writeFileSync(p,t);
}
console.log(`Applied Batch 03: ${bridges.length}/${incidents.length}/${events.length}/${evidence.length}`);
