import type { DatePrecision } from "./enums";

export function formatLabel(value: string | null | undefined): string {
  if (!value) return "Unknown";
  return value
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function formatDateWithPrecision(date: string | null | undefined, precision: DatePrecision | undefined): string {
  if (!date || precision === "unknown") return "Unknown";
  if (precision === "year") return date.slice(0, 4);
  if (precision === "month") return date.slice(0, 7);
  if (precision === "approximate") return `Approx. ${date}`;
  return date;
}

export function formatUsd(amount: number | null | undefined): string {
  if (typeof amount !== "number") return "Unknown";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(amount);
}

export function joinLabels(labels: string[] | undefined): string {
  if (!labels || labels.length === 0) return "Unknown";
  return labels.join(", ");
}
