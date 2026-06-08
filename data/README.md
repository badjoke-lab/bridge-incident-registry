# Data Directory

This directory contains canonical static JSON data for Bridge Incident Registry.

## Canonical record files

```text
bridges.json
incidents.json
events.json
evidence.json
```

These files are the public registry data source for the static site.

## Reference dictionaries

```text
reference/chains.json
reference/assets.json
```

Canonical records should use normalized keys from the reference dictionaries where possible.

## Current state

PR-006 adds the data file structure and reference dictionaries only.

It intentionally does not add production bridge, incident, event, or evidence records yet.

## Rules

- Canonical JSON changes must go through pull requests.
- Automated discovery or monitoring must not directly publish canonical data.
- Unknown values should use `unknown` when the value has been researched but is still unclear.
- Optional fields may be omitted or set to `null` depending on the schema used by later validation.
