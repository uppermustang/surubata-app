import type { Locale } from "@/i18n/routing";

export function formatDate(value: string, locale: Locale) {
  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat(locale === "ne" ? "ne-NP" : "en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(year, (month ?? 1) - 1, day ?? 1));
}

export function formatClock(seconds: number) {
  const safe = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(safe / 60);
  const rest = safe % 60;
  return `${minutes}:${rest.toString().padStart(2, "0")}`;
}

export function readingMinutes(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
