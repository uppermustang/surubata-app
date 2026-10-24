import { slugify } from "@/lib/utils";
import type { TocItem } from "@/types/content";

export function extractToc(markdown: string): TocItem[] {
  const items: TocItem[] = [];
  for (const line of markdown.split("\n")) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (!match) continue;
    const text = match[2].replace(/[*_`]/g, "").trim();
    const level = match[1].length === 2 ? 2 : 3;
    items.push({ level, text, id: slugify(text) });
  }
  return items;
}
