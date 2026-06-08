import type {
  AttackVectorCategory,
  BridgeStatus,
  BridgeType,
  ClaimScope,
  Confidence,
  CurrentOutcome,
  DatePrecision,
  EvidenceUrlStatus,
  IncidentType,
  RecordMaturity,
  RecoveryStatus,
  ReimbursementStatus,
  RestartStatus,
  SourceTier,
  SourceType,
  UpdateStatus
} from "./enums";

export interface ReferenceEntry {
  display_name: string;
  aliases: string[];
}

export type ReferenceDictionary = Record<string, ReferenceEntry>;

export interface BridgeEntity {
  id: string;
  slug: string;
  previous_slugs: string[];
  redirect_from: string[];
  canonical_name: string;
  type: BridgeType;
  status: BridgeStatus;
  summary: string;
  confidence: Confidence;
  record_maturity: RecordMaturity;
  update_status: UpdateStatus;
  last_reviewed_at: string;
  last_verified_at: string;
  aliases?: string[];
  launch_date?: string | null;
  launch_date_precision?: DatePrecision;
  end_date?: string | null;
  end_date_precision?: DatePrecision;
  terminal_reason?: string | null;
  official_url?: string | null;
  official_domain?: string | null;
  official_url_status?: string;
  archived_url?: string | null;
  primary_chains?: string[];
  primary_assets?: string[];
  operator_name?: string | null;
  operator_type?: string | null;
  ecosystem_name?: string | null;
  related_protocols?: string[];
  brand_history_notes?: string | null;
  major_incident_count?: number;
  has_unresolved_incident?: boolean;
  has_reimbursement_history?: boolean;
  successor_id?: string | null;
  predecessor_id?: string | null;
  replacement_bridge_id?: string | null;
  duplicate_of?: string | null;
  merged_into?: string | null;
  notes?: string | null;
}

export interface AmountClaim {
  amount_text: string;
  amount_usd_text?: string;
  source_id: string;
  basis: string;
  usd_valuation_date?: string;
  notes?: string;
}

export interface ConflictingClaim {
  claim: string;
  values: string[];
  source_ids: string[];
  resolution: string;
}

export interface IncidentCase {
  id: string;
  bridge_id: string;
  slug: string;
  previous_slugs: string[];
  redirect_from: string[];
  title: string;
  incident_date: string;
  incident_date_precision: DatePrecision;
  incident_type: IncidentType;
  summary: string;
  confidence: Confidence;
  record_maturity: RecordMaturity;
  update_status: UpdateStatus;
  source_count: number;
  last_reviewed_at: string;
  last_verified_at: string;
  is_major_incident?: boolean;
  reported_loss_usd_display?: string | null;
  reported_loss_usd?: number | null;
  reported_loss_usd_min?: number | null;
  reported_loss_usd_max?: number | null;
  reported_loss_text?: string | null;
  reported_loss_assets?: string[];
  usd_valuation_date?: string | null;
  loss_amount_basis?: string;
  amount_confidence?: string;
  amount_note?: string | null;
  amount_claims?: AmountClaim[];
  recovery_status?: RecoveryStatus;
  reimbursement_status?: ReimbursementStatus;
  restart_status?: RestartStatus;
  current_outcome?: CurrentOutcome;
  is_unresolved?: boolean;
  unresolved_reason?: string[];
  affected_chains?: string[];
  affected_assets?: string[];
  attack_vector_category?: AttackVectorCategory;
  postmortem_available?: string;
  known_unknowns?: string[];
  conflicting_claims?: ConflictingClaim[];
  duplicate_of?: string | null;
  merged_into?: string | null;
  split_from?: string | null;
  split_reason?: string | null;
}

export interface BridgeEvent {
  id: string;
  bridge_id: string;
  incident_id: string | null;
  event_type: string;
  event_date: string;
  event_date_precision: DatePrecision;
  title: string;
  description: string;
  confidence: Confidence;
  record_maturity: RecordMaturity;
  update_status: UpdateStatus;
  impact_level?: string;
  status_effect?: string;
  source_count?: number;
  sort_order?: number;
  amount_text?: string | null;
  recovered_amount_text?: string | null;
  reimbursement_status?: ReimbursementStatus;
  restart_status?: RestartStatus;
  affected_chains?: string[];
  affected_assets?: string[];
  notes?: string | null;
  duplicate_of?: string | null;
  merged_into?: string | null;
}

export interface BridgeEvidence {
  id: string;
  bridge_id: string;
  source_type: SourceType;
  title: string;
  url: string;
  publisher: string;
  published_at: string;
  published_at_precision: DatePrecision;
  reliability: Confidence;
  source_tier: SourceTier;
  url_status: EvidenceUrlStatus;
  incident_id?: string | null;
  event_id?: string | null;
  archived_url?: string | null;
  accessed_at?: string | null;
  claim_scope?: ClaimScope;
  notes?: string | null;
  language?: string;
  author?: string | null;
  quote_excerpt?: string | null;
  snapshot_date?: string | null;
  is_primary?: boolean;
  is_paywalled?: boolean;
  is_official_domain?: boolean;
  supports_amount?: boolean;
  supports_recovery?: boolean;
  supports_reimbursement?: boolean;
  supports_reopen?: boolean;
  supports_shutdown?: boolean;
  supports_migration?: boolean;
}

export interface RegistryData {
  bridges: BridgeEntity[];
  incidents: IncidentCase[];
  events: BridgeEvent[];
  evidence: BridgeEvidence[];
}
