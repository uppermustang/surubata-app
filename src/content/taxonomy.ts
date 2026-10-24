import type { CategoryId, Localized, RegionId } from "@/types/content";

/** Sample labels. Add a tag here when you use it in content. */
export const tagLabels: Record<string, Localized> = {
  ai: { en: "AI", ne: "एआई" },
  automation: { en: "Automation", ne: "अटोमेसन" },
  whatsapp: { en: "WhatsApp", ne: "व्हाट्सएप" },
  content: { en: "Content", ne: "कन्टेन्ट" },
  proposals: { en: "Proposals", ne: "प्रस्ताव" },
  nepal: { en: "Nepal", ne: "नेपाल" },
  productivity: { en: "Productivity", ne: "उत्पादकत्व" },
  "social-media": { en: "Social media", ne: "सामाजिक सञ्जाल" },
  clients: { en: "Clients", ne: "ग्राहक" },
  prompts: { en: "Prompts", ne: "प्रम्प्ट" },
  diaspora: { en: "Diaspora", ne: "डायस्पोरा" },
  invoices: { en: "Invoices", ne: "बिल" },
  offers: { en: "Offers", ne: "अफर" },
  news: { en: "News habit", ne: "समाचार बानी" },
  mobile: { en: "Mobile", ne: "मोबाइल" },
};

export const categoryIds: CategoryId[] = [
  "ai-tools",
  "automation",
  "social-media",
  "startups",
  "nepal-tech",
  "productivity",
];

export const regionIds: RegionId[] = ["nepal", "silicon-valley", "global"];

export function tagLabel(slug: string, locale: keyof Localized) {
  return tagLabels[slug]?.[locale] ?? slug;
}
