TODAY = "2026-06-18"


def bridge(**kw):
    base = {
        "previous_slugs": [], "redirect_from": [], "confidence": "high",
        "record_maturity": "reviewed", "update_status": "current",
        "last_reviewed_at": TODAY, "last_verified_at": TODAY,
        "aliases": [], "launch_date": None, "launch_date_precision": "unknown",
        "end_date": None, "end_date_precision": "unknown", "terminal_reason": None,
        "archived_url": None, "primary_chains": ["unknown"], "primary_assets": ["unknown"],
        "operator_name": None, "operator_type": "protocol ecosystem", "ecosystem_name": None,
        "related_protocols": [], "brand_history_notes": None,
        "major_incident_count": 0, "has_unresolved_incident": False,
        "has_reimbursement_history": False, "successor_id": None, "predecessor_id": None,
        "replacement_bridge_id": None, "duplicate_of": None, "merged_into": None, "notes": None,
    }
    base.update(kw)
    return base


def event(**kw):
    base = {
        "incident_id": None, "confidence": "high", "record_maturity": "reviewed",
        "update_status": "current", "impact_level": "context", "status_effect": "none",
        "source_count": 1, "sort_order": 10, "amount_text": None,
        "recovered_amount_text": None, "reimbursement_status": "not_applicable",
        "restart_status": "not_applicable", "affected_chains": ["unknown"],
        "affected_assets": ["unknown"], "notes": None, "duplicate_of": None, "merged_into": None,
    }
    base.update(kw)
    return base


def evidence(**kw):
    base = {
        "incident_id": None, "event_id": None, "published_at_precision": "day",
        "reliability": "high", "source_tier": "tier_1", "url_status": "live",
        "archived_url": None, "accessed_at": TODAY, "claim_scope": "entity_history",
        "language": "en", "author": None, "quote_excerpt": None, "is_primary": True,
        "is_paywalled": False, "is_official_domain": False, "supports_amount": False,
        "supports_recovery": False, "supports_reimbursement": False,
        "supports_reopen": False, "supports_shutdown": False, "supports_migration": False,
        "notes": None,
    }
    base.update(kw)
    return base
