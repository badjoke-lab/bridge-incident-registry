import chains from "../../data/reference/chains.json";
import assets from "../../data/reference/assets.json";
import type { ReferenceDictionary, ReferenceEntry } from "./types";

export const chainReferences = chains as ReferenceDictionary;
export const assetReferences = assets as ReferenceDictionary;

export function getReferenceEntry(
  dictionary: ReferenceDictionary,
  key: string | null | undefined
): ReferenceEntry | undefined {
  if (!key) return undefined;
  return dictionary[key];
}

export function getChainLabel(key: string | null | undefined): string {
  return getReferenceEntry(chainReferences, key)?.display_name ?? key ?? "Unknown";
}

export function getAssetLabel(key: string | null | undefined): string {
  return getReferenceEntry(assetReferences, key)?.display_name ?? key ?? "Unknown";
}

export function getChainLabels(keys: string[] | undefined): string[] {
  return (keys ?? []).map(getChainLabel);
}

export function getAssetLabels(keys: string[] | undefined): string[] {
  return (keys ?? []).map(getAssetLabel);
}

export function getReferenceSearchTerms(dictionary: ReferenceDictionary, key: string): string[] {
  const entry = dictionary[key];
  if (!entry) return [key];
  return [entry.display_name, ...entry.aliases, key];
}
