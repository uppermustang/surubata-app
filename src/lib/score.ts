import type { SearchDocument } from "@/types/content";

export function scoreDocument(document: SearchDocument, query: string) {
  const normalized = query.trim().toLowerCase();
  if (normalized.length < 2) return 0;
  const terms = normalized.split(/\s+/).filter((term) => term.length > 1);
  const haystack = document.haystack.toLowerCase();
  const title = document.title.toLowerCase();
  let score = 0;
  if (haystack.includes(normalized)) score += 6;
  if (title.includes(normalized)) score += 4;
  for (const term of terms) {
    if (title.includes(term)) score += 3;
    if (document.tags.some((tag) => tag.includes(term))) score += 2;
    if (haystack.includes(term)) score += 1;
  }
  return score;
}

export function rankDocuments(documents: SearchDocument[], query: string, limit = 12) {
  return documents
    .map((document) => ({ document, score: scoreDocument(document, query) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.document.title.localeCompare(b.document.title))
    .slice(0, limit)
    .map((entry) => entry.document);
}
