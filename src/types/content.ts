import type { Locale } from "@/i18n/routing";

export type Localized<T = string> = Record<Locale, T>;

export type CategoryId =
  | "ai-tools"
  | "automation"
  | "social-media"
  | "startups"
  | "nepal-tech"
  | "productivity";

export type RegionId = "nepal" | "silicon-valley" | "global";

export type ResourceType = "prompt" | "checklist" | "template" | "workflow" | "tool";

export type ContentType = "article" | "news" | "episode" | "resource" | "newsletter";

export type SearchDocument = {
  id: string;
  type: ContentType;
  title: string;
  excerpt: string;
  href: string;
  tags: string[];
  haystack: string;
};

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};
