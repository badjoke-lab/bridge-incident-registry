import json
from pathlib import Path

from batch5_bridges import BRIDGES
from batch5_events import EVENTS
from batch5_evidence import EVIDENCE

ROOT = Path(__file__).resolve().parents[1]


def append_records(path, records):
    raw = path.read_text()
    existing = json.loads(raw)
    existing_ids = {item["id"] for item in existing}
    new = [item for item in records if item["id"] not in existing_ids]
    if not new:
        return 0
    text = raw.rstrip()
    if not text.endswith("]"):
        raise RuntimeError(f"{path} is not a JSON array")
    text = text[:-1].rstrip()
    text += "\n" if text.endswith("[") else ",\n"
    text += ",\n".join("  " + json.dumps(item, ensure_ascii=False, separators=(",", ":")) for item in new)
    path.write_text(text + "\n]\n")
    return len(new)


def update_references():
    chains_path = ROOT / "data/reference/chains.json"
    chains = json.loads(chains_path.read_text())
    chains.setdefault("conflux-core-space", {"display_name": "Conflux Core Space", "aliases": ["Conflux Core", "Conflux Network"]})
    chains.setdefault("conflux-espace", {"display_name": "Conflux eSpace", "aliases": ["Conflux eSpace EVM"]})
    chains_path.write_text(json.dumps(chains, indent=2, ensure_ascii=False) + "\n")

    assets_path = ROOT / "data/reference/assets.json"
    assets = json.loads(assets_path.read_text())
    assets.setdefault("renbtc", {"display_name": "renBTC", "aliases": ["Ren Bitcoin"]})
    assets.setdefault("cfx", {"display_name": "CFX", "aliases": ["Conflux"]})
    assets_path.write_text(json.dumps(assets, indent=2, ensure_ascii=False) + "\n")


update_references()
print(json.dumps({
    "bridges": append_records(ROOT / "data/bridges.json", BRIDGES),
    "events": append_records(ROOT / "data/events.json", EVENTS),
    "evidence": append_records(ROOT / "data/evidence.json", EVIDENCE),
}))
