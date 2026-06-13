export const bridgeTypes = [
  "asset_bridge",
  "wrapped_asset_bridge",
  "canonical_bridge",
  "third_party_bridge",
  "cross_chain_router",
  "cross_chain_messaging",
  "interoperability_protocol",
  "bridge_aggregator",
  "hybrid",
  "unknown"
] as const;

export const bridgeStatuses = [
  "active",
  "limited",
  "paused",
  "inactive",
  "deprecated",
  "migrated",
  "dead",
  "unknown"
] as const;

export const recordMaturities = ["stub", "reviewed", "full"] as const;

export const updateStatuses = ["current", "stale", "needs_review", "under_revision"] as const;

export const confidences = ["high", "medium", "low"] as const;

export const datePrecisions = ["day", "month", "year", "approximate", "unknown"] as const;

export const incidentTypes = [
  "exploit",
  "hack",
  "vulnerability_disclosure",
  "funds_loss",
  "abnormal_transfers",
  "bridge_pause",
  "shutdown",
  "migration",
  "reimbursement",
  "legal_or_regulatory",
  "other"
] as const;

export const recoveryStatuses = ["none", "partial_recovery", "full_recovery", "unknown", "not_applicable"] as const;

export const reimbursementStatuses = [
  "not_announced",
  "announced",
  "in_progress",
  "completed",
  "partial",
  "denied",
  "unknown",
  "not_applicable"
] as const;

export const restartStatuses = [
  "never_paused",
  "paused",
  "reopened",
  "partially_reopened",
  "replaced",
  "not_reopened",
  "unknown",
  "not_applicable"
] as const;

export const currentOutcomes = [
  "active_after_incident",
  "limited_after_incident",
  "paused_long_term",
  "migrated_after_incident",
  "deprecated_after_incident",
  "dead_after_incident",
  "unknown",
  "not_applicable"
] as const;

export const attackVectorCategories = [
  "validator_key_compromise",
  "message_verification_failure",
  "smart_contract_bug",
  // Exploitation of a cross-chain contract or privileged call path spanning bridge components.
  "cross_chain_contract_exploit",
  "relayer_or_oracle_issue",
  "configuration_error",
  "frontend_or_dns_compromise",
  "liquidity_or_accounting_failure",
  "operator_or_governance_issue",
  "unknown",
  "not_applicable"
] as const;

export const sourceTypes = [
  "official_statement",
  "official_blog",
  "official_social",
  "postmortem",
  "audit_report",
  "security_firm_report",
  "blockchain_analytics_report",
  "news_article",
  "court_document",
  "regulatory_notice",
  "archive_capture",
  "database_reference",
  "community_reference",
  "other"
] as const;

export const sourceTiers = ["tier_1", "tier_2", "tier_3", "unknown"] as const;

export const urlStatuses = ["live", "archived", "dead", "redirected", "paywalled", "unknown"] as const;

export const claimScopes = [
  "bridge_entity",
  "incident_case",
  "event",
  "amount",
  "recovery",
  "reimbursement",
  "restart",
  "shutdown",
  "migration",
  "status",
  "url_history",
  "ownership"
] as const;

export type BridgeType = (typeof bridgeTypes)[number];
export type BridgeStatus = (typeof bridgeStatuses)[number];
export type RecordMaturity = (typeof recordMaturities)[number];
export type UpdateStatus = (typeof updateStatuses)[number];
export type Confidence = (typeof confidences)[number];
export type DatePrecision = (typeof datePrecisions)[number];
export type IncidentType = (typeof incidentTypes)[number];
export type RecoveryStatus = (typeof recoveryStatuses)[number];
export type ReimbursementStatus = (typeof reimbursementStatuses)[number];
export type RestartStatus = (typeof restartStatuses)[number];
export type CurrentOutcome = (typeof currentOutcomes)[number];
export type AttackVectorCategory = (typeof attackVectorCategories)[number];
export type SourceType = (typeof sourceTypes)[number];
export type SourceTier = (typeof sourceTiers)[number];
export type EvidenceUrlStatus = (typeof urlStatuses)[number];
export type ClaimScope = (typeof claimScopes)[number];
