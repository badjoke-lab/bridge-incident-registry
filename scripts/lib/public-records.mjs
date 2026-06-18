function joinUrl(origin, pathname) {
  return new URL(pathname.replace(/^\//, ""), `${origin}/`).toString();
}

function assertKnownBridge(record, bridgeById, label) {
  if (!bridgeById.has(record.bridge_id)) {
    throw new Error(`${label} ${record.id} references missing bridge ${record.bridge_id}`);
  }
}

function assertKnownIncident(record, incidentById, label) {
  if (record.incident_id && !incidentById.has(record.incident_id)) {
    throw new Error(`${label} ${record.id} references missing incident ${record.incident_id}`);
  }
}

function assertMatchingIds(label, canonicalRecords, publicRecords) {
  const canonicalIds = canonicalRecords.map((record) => record.id);
  const publicIds = publicRecords.map((record) => record.id);

  if (canonicalIds.length !== publicIds.length) {
    throw new Error(`${label} count changed during public transformation`);
  }

  for (let index = 0; index < canonicalIds.length; index += 1) {
    if (canonicalIds[index] !== publicIds[index]) {
      throw new Error(`${label} ID order changed at index ${index}: ${canonicalIds[index]} != ${publicIds[index]}`);
    }
  }
}

export function buildPublicRecords({ config, data, recordCounts, latestVerifiedAt, generatedAt }) {
  const origin = config.canonical_origin;
  const bridgeById = new Map(data.bridges.map((record) => [record.id, record]));
  const incidentById = new Map(data.incidents.map((record) => [record.id, record]));

  const bridges = data.bridges.map((record) => ({
    ...record,
    canonical_page_url: joinUrl(origin, `/bridge/${record.slug}/`),
    canonical_data_url: joinUrl(origin, "/data/bridges.json")
  }));

  const incidents = data.incidents.map((record) => {
    assertKnownBridge(record, bridgeById, "incident");
    const bridge = bridgeById.get(record.bridge_id);

    return {
      ...record,
      canonical_page_url: joinUrl(origin, `/incident/${record.slug}/`),
      bridge_page_url: joinUrl(origin, `/bridge/${bridge.slug}/`),
      canonical_data_url: joinUrl(origin, "/data/incidents.json")
    };
  });

  const events = data.events.map((record) => {
    assertKnownBridge(record, bridgeById, "event");
    assertKnownIncident(record, incidentById, "event");
    const bridge = bridgeById.get(record.bridge_id);
    const incident = record.incident_id ? incidentById.get(record.incident_id) : null;

    return {
      ...record,
      bridge_page_url: joinUrl(origin, `/bridge/${bridge.slug}/`),
      incident_page_url: incident ? joinUrl(origin, `/incident/${incident.slug}/`) : null,
      canonical_data_url: joinUrl(origin, "/data/events.json")
    };
  });

  const evidence = data.evidence.map((record) => {
    assertKnownBridge(record, bridgeById, "evidence");
    assertKnownIncident(record, incidentById, "evidence");
    const bridge = bridgeById.get(record.bridge_id);
    const incident = record.incident_id ? incidentById.get(record.incident_id) : null;

    return {
      ...record,
      bridge_page_url: joinUrl(origin, `/bridge/${bridge.slug}/`),
      incident_page_url: incident ? joinUrl(origin, `/incident/${incident.slug}/`) : null,
      canonical_data_url: joinUrl(origin, "/data/evidence.json")
    };
  });

  assertMatchingIds("bridges", data.bridges, bridges);
  assertMatchingIds("incidents", data.incidents, incidents);
  assertMatchingIds("events", data.events, events);
  assertMatchingIds("evidence", data.evidence, evidence);

  const metadata = {
    project_id: config.project_id,
    site_name: config.site_name,
    registry_type: config.registry_type,
    schema_version: config.schema_version,
    generated_at: generatedAt,
    latest_verified_at: latestVerifiedAt,
    canonical_origin: origin,
    canonical_only: true,
    record_counts: recordCounts,
    source_files: config.source_files
  };

  return {
    metadata,
    bridges,
    incidents,
    events,
    evidence,
    references: {
      chains: data.chains,
      assets: data.assets
    }
  };
}
