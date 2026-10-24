"use client";

import { Play } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { EpisodeView, NewsView, ResourceView } from "@/types/views";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/content/copy-button";
import { CoverImage } from "@/components/content/cover-image";

function Chip({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "h-9 rounded-full border px-3 text-sm",
        pressed ? "border-foreground bg-foreground text-background" : "border-border bg-card hover:bg-muted",
      )}
    >
      {children}
    </button>
  );
}

export function PodcastBrowser({ items }: { items: EpisodeView[] }) {
  const t = useTranslations();
  const [view, setView] = useState<"latest" | "popular" | "series" | "guests">("latest");

  const filtered = useMemo(() => {
    if (view === "popular") return items.filter((item) => item.popular);
    if (view === "guests") return items.filter((item) => item.guest);
    return items;
  }, [items, view]);

  const groups = useMemo(() => {
    if (view !== "series") return null;
    const map = new Map<string, EpisodeView[]>();
    for (const item of filtered) {
      const list = map.get(item.series) ?? [];
      list.push(item);
      map.set(item.series, list);
    }
    return [...map.entries()];
  }, [filtered, view]);

  const views = [
    ["latest", t("common.latest")],
    ["popular", t("common.popular")],
    ["series", t("common.series")],
    ["guests", t("common.guests")],
  ] as const;

  return (
    <div>
      <div role="group" aria-label={t("podcast.filterLabel")} className="flex flex-wrap gap-2">
        {views.map(([id, label]) => (
          <Chip key={id} pressed={view === id} onClick={() => setView(id)}>
            {label}
          </Chip>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {t("podcast.showing", { count: filtered.length })}
      </p>
      {filtered.length === 0 ? <p className="mt-8 text-muted-foreground">{t("common.noResults")}</p> : null}
      {groups ? (
        <div className="mt-8 space-y-10">
          {groups.map(([series, seriesItems]) => (
            <section key={series}>
              <h2 className="font-display text-2xl">{series}</h2>
              <EpisodeRows items={seriesItems} />
            </section>
          ))}
        </div>
      ) : (
        <EpisodeRows items={filtered} />
      )}
    </div>
  );
}

function EpisodeRows({ items }: { items: EpisodeView[] }) {
  const t = useTranslations("common");
  return (
    <ul className="mt-6 grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.slug}>
          <Link href={`/podcast/${item.slug}`} className="group block overflow-hidden rounded-xl border border-border bg-card">
            <span className="relative block aspect-video bg-muted">
              {item.image ? <CoverImage src={item.image.src} alt="" sizes="(min-width: 640px) 40vw, 100vw" /> : null}
              <span className="absolute bottom-3 left-3 inline-flex size-11 items-center justify-center rounded-full bg-white text-neutral-950 shadow-md">
                <Play className="ml-0.5 size-4" fill="currentColor" aria-hidden />
              </span>
            </span>
            <span className="block p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-forest">
                {item.series}
                {item.guest ? ` · ${item.guest}` : ""}
              </p>
              <h3 className="font-display mt-2 text-2xl leading-tight group-hover:underline">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              <p className="mt-3 text-sm text-muted-foreground">
                {item.dateLabel} · {t("minListen", { minutes: item.durationMinutes })}
              </p>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

const categories = ["all", "ai-tools", "automation", "social-media", "startups", "nepal-tech", "productivity"] as const;

export function NewsBrowser({ items, initialCategory = "all" }: { items: NewsView[]; initialCategory?: string }) {
  const t = useTranslations();
  const [category, setCategory] = useState(initialCategory);

  const filtered = items.filter((item) => category === "all" || item.category === category);

  return (
    <div>
      <div role="group" aria-label={t("news.filterLabel")} className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((id) => (
          <Chip key={id} pressed={category === id} onClick={() => setCategory(id)}>
            {id === "all" ? t("common.all") : t(`categories.${id}`)}
          </Chip>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {t("news.showing", { count: filtered.length })}
      </p>
      <ul className="mt-6 divide-y divide-border border-y border-border">
        {filtered.map((item) => (
          <li key={item.slug}>
            <Link href={`/news/${item.slug}`} className="flex items-start gap-4 py-5">
              {item.image ? (
                <span className="relative block h-20 w-20 shrink-0 overflow-hidden rounded-md bg-muted sm:h-24 sm:w-36">
                  <CoverImage src={item.image.src} alt="" sizes="144px" />
                </span>
              ) : null}
              <span className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <span className={cn("mr-2 inline-block size-1.5 rounded-full", item.region === "nepal" ? "bg-forest" : item.region === "silicon-valley" ? "bg-accent" : "bg-foreground/40")} aria-hidden />
                {t(`regions.${item.region}`)} · {t(`categories.${item.category}`)} · {item.dateLabel}
              </p>
              <h2 className="font-display mt-2 text-2xl leading-tight">{item.title}</h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
              {item.whyItMatters ? (
                <p className="mt-3 max-w-3xl border-l-2 border-forest pl-3 text-sm leading-relaxed">
                  <span className="font-semibold text-forest">{t("common.why")}. </span>
                  {item.whyItMatters}
                </p>
              ) : null}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {filtered.length === 0 ? <p className="mt-8 text-muted-foreground">{t("common.noResults")}</p> : null}
    </div>
  );
}

export function ResourceBrowser({
  items,
  initialCategory = "all",
  initialQuery = "",
}: {
  items: ResourceView[];
  initialCategory?: string;
  initialQuery?: string;
}) {
  const t = useTranslations();
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState(initialQuery);
  const normalized = query.trim().toLowerCase();

  const filtered = items.filter((item) => {
    const categoryOk = category === "all" || item.category === category;
    const queryOk =
      !normalized ||
      item.title.toLowerCase().includes(normalized) ||
      item.description.toLowerCase().includes(normalized) ||
      item.body.toLowerCase().includes(normalized) ||
      item.tags.some((tag) => tag.label.toLowerCase().includes(normalized) || tag.slug.includes(normalized));
    return categoryOk && queryOk;
  });

  return (
    <div>
      <label htmlFor="resource-search" className="sr-only">
        {t("resources.searchLabel")}
      </label>
      <input
        id="resource-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t("resources.searchPlaceholder")}
        className="h-11 w-full rounded-md border border-border bg-card px-3 text-base sm:max-w-md"
      />
      <div role="group" aria-label={t("resources.filterLabel")} className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {categories.map((id) => (
          <Chip key={id} pressed={category === id} onClick={() => setCategory(id)}>
            {id === "all" ? t("common.all") : t(`categories.${id}`)}
          </Chip>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {t("resources.showing", { count: filtered.length })}
      </p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {filtered.map((item) => (
          <li key={item.slug} className="flex flex-col overflow-hidden rounded-xl border border-border bg-card">
            {item.image ? (
              <Link href={`/resources/${item.slug}`} aria-label={item.title} className="relative block aspect-[16/9] bg-muted">
                <CoverImage src={item.image.src} alt="" sizes="(min-width: 640px) 40vw, 100vw" />
              </Link>
            ) : null}
            <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-forest">
              {t(`resourceTypes.${item.type}`)} · {t(`categories.${item.category}`)}
            </p>
            <Link href={`/resources/${item.slug}`} className="font-display mt-3 text-2xl leading-tight hover:underline">
              {item.title}
            </Link>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            <div className="mt-4">
              <CopyButton text={item.body} label={t("common.copy")} copiedLabel={t("common.copied")} />
            </div>
            </div>
          </li>
        ))}
      </ul>
      {filtered.length === 0 ? <p className="mt-8 text-muted-foreground">{t("common.noResults")}</p> : null}
    </div>
  );
}
