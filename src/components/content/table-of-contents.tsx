import type { TocItem } from "@/types/content";

export function TableOfContents({ items, label }: { items: TocItem[]; label: string }) {
  if (items.length === 0) return null;
  return (
    <nav aria-label={label}>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">{label}</p>
      <ol className="mt-3 space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? "pl-3" : undefined}>
            <a href={`#${item.id}`} className="text-muted-foreground hover:text-foreground">
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
