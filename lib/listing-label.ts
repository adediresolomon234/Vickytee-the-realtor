export function displayListingLabel(value: string) {
  const normalized = value.trim().toLowerCase();
  if (normalized === "buy" || normalized === "both" || normalized === "for sale") return "For sale";
  return normalized.replace(/\b\w/g, (letter) => letter.toUpperCase());
}
