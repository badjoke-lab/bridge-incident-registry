import bridges from "../../data/bridges.json";
import events from "../../data/events.json";
import evidence from "../../data/evidence.json";
import incidents from "../../data/incidents.json";
import type { BridgeEntity, BridgeEvent, BridgeEvidence, IncidentCase, RegistryData } from "./types";

export const registryData: RegistryData = {
  bridges: bridges as BridgeEntity[],
  incidents: incidents as IncidentCase[],
  events: events as BridgeEvent[],
  evidence: evidence as BridgeEvidence[]
};

export function getBridgeBySlug(slug: string): BridgeEntity | undefined {
  return registryData.bridges.find((bridge) => bridge.slug === slug || bridge.previous_slugs?.includes(slug));
}

export function getIncidentBySlug(slug: string): IncidentCase | undefined {
  return registryData.incidents.find((incident) => incident.slug === slug || incident.previous_slugs?.includes(slug));
}

export function getIncidentsForBridge(bridgeId: string): IncidentCase[] {
  return registryData.incidents.filter((incident) => incident.bridge_id === bridgeId);
}

export function getEventsForIncident(incidentId: string): BridgeEvent[] {
  return registryData.events
    .filter((event) => event.incident_id === incidentId)
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0) || a.event_date.localeCompare(b.event_date));
}

export function getEvidenceForIncident(incidentId: string): BridgeEvidence[] {
  return registryData.evidence.filter((source) => source.incident_id === incidentId);
}

export function getEvidenceForBridge(bridgeId: string): BridgeEvidence[] {
  return registryData.evidence.filter((source) => source.bridge_id === bridgeId);
}

export function getRegistryCounts() {
  return {
    bridges: registryData.bridges.length,
    incidents: registryData.incidents.length,
    events: registryData.events.length,
    evidence: registryData.evidence.length
  };
}
