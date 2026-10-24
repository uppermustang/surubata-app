import "server-only";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { coverFor } from "@/content/covers";
import { episodes, type Episode } from "@/content/episodes";
import { news } from "@/content/news";
import { newsletterIssues } from "@/content/newsletters";
import { resources } from "@/content/resources";
import { tagLabel } from "@/content/taxonomy";
import { formatDate, readingMinutes } from "@/lib/format";
import { extractToc } from "@/lib/toc";
import { plainText } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";
import type { ContentType, SearchDocument } from "@/types/content";
import type {
  ArticleSummary,
  ArticleView,
  EpisodeView,
  IssueView,
  NewsView,
  RelatedLink,
  ResourceView,
  TagRef,
} from "@/types/views";

export type {
  ArticleSummary,
  ArticleView,
  EpisodeView,
  IssueView,
  NewsView,
  RelatedLink,
  ResourceView,
  TagRef,
};

const articlesDir = path.join(process.cwd(), "content", "articles");

function tagsFor(slugs: string[], locale: Locale): TagRef[] {
  return slugs.map((slug) => ({ slug, label: tagLabel(slug, locale) }));
}

function imageFor(slug: string, locale: Locale) {
  const cover = coverFor(slug);
  if (!cover) return undefined;
  return { src: cover.src, alt: cover.alt[locale] };
}

function asDate(value: unknown) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  return String(value ?? "");
}

function asList(value: unknown) {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string" && value.trim()) return [value.trim()];
  return [];
}

function byDateDesc<T extends { publishedAt: string }>(items: T[]) {
  return [...items].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

function readArticle(slug: string, locale: Locale) {
  const file = path.join(articlesDir, `${slug}.${locale}.mdx`);
  if (!fs.existsSync(file)) return null;
  const parsed = matter(fs.readFileSync(file, "utf8"));
  const data = parsed.data as Record<string, unknown>;
  return {
    title: String(data.title ?? slug),
    excerpt: String(data.excerpt ?? ""),
    publishedAt: asDate(data.publishedAt),
    tags: asList(data.tags),
    relatedEpisodes: asList(data.relatedEpisodes),
    relatedResources: asList(data.relatedResources),
    relatedNews: asList(data.relatedNews),
    body: parsed.content.trim(),
  };
}

export function getArticleSlugs() {
  if (!fs.existsSync(articlesDir)) return [];
  const slugs = new Set<string>();
  for (const file of fs.readdirSync(articlesDir)) {
    const match = /^(.+)\.(en|ne)\.mdx$/.exec(file);
    if (match) slugs.add(match[1]);
  }
  return [...slugs];
}

function toEpisode(episode: Episode, locale: Locale): EpisodeView {
  return {
    slug: episode.slug,
    title: episode.title[locale],
    description: episode.description[locale],
    publishedAt: episode.publishedAt,
    dateLabel: formatDate(episode.publishedAt, locale),
    durationMinutes: episode.durationMinutes,
    seriesId: episode.seriesId,
    series: episode.series[locale],
    guest: episode.guest?.[locale],
    youtubeId: episode.youtubeId || undefined,
    videoUrl: episode.videoUrl,
    sample: episode.sample,
    audioUrl: episode.audioUrl,
    takeaways: episode.takeaways[locale],
    timestamps: episode.timestamps.map((item) => ({
      seconds: item.seconds,
      label: item.label[locale],
    })),
    transcript: episode.transcript[locale],
    resourceSlugs: episode.resourceSlugs,
    tags: tagsFor(episode.tags, locale),
    popular: Boolean(episode.popular),
    image: imageFor(episode.slug, locale),
  };
}

export function getEpisodes(locale: Locale) {
  return byDateDesc(episodes.map((episode) => toEpisode(episode, locale)));
}

export function getEpisode(slug: string, locale: Locale) {
  const episode = episodes.find((item) => item.slug === slug);
  return episode ? toEpisode(episode, locale) : null;
}

export function getNews(locale: Locale) {
  return byDateDesc(
    news.map((item) => ({
      slug: item.slug,
      title: item.title[locale],
      summary: item.summary[locale],
      tldr: item.tldr[locale],
      whyItMatters: item.whyItMatters?.[locale],
      sourceName: item.sourceName,
      sourceUrl: item.sourceUrl,
      category: item.category,
      region: item.region,
      publishedAt: item.publishedAt,
      dateLabel: formatDate(item.publishedAt, locale),
      tags: tagsFor(item.tags, locale),
      image: imageFor(item.slug, locale),
    })),
  );
}

export function getNewsItem(slug: string, locale: Locale) {
  return getNews(locale).find((item) => item.slug === slug) ?? null;
}

export function getArticles(locale: Locale): ArticleSummary[] {
  const items = getArticleSlugs()
    .map((slug): ArticleSummary | null => {
      const article = readArticle(slug, locale);
      if (!article) return null;
      return {
        slug,
        title: article.title,
        excerpt: article.excerpt,
        publishedAt: article.publishedAt,
        dateLabel: formatDate(article.publishedAt, locale),
        minutes: readingMinutes(article.body),
        tags: tagsFor(article.tags, locale),
        image: imageFor(slug, locale),
      };
    })
    .filter((item): item is ArticleSummary => item !== null);
  return byDateDesc(items);
}

export function getArticle(slug: string, locale: Locale): ArticleView | null {
  const article = readArticle(slug, locale);
  if (!article) return null;
  return {
    slug,
    title: article.title,
    excerpt: article.excerpt,
    publishedAt: article.publishedAt,
    dateLabel: formatDate(article.publishedAt, locale),
    minutes: readingMinutes(article.body),
    tags: tagsFor(article.tags, locale),
    image: imageFor(slug, locale),
    body: article.body,
    toc: extractToc(article.body),
    relatedEpisodes: article.relatedEpisodes,
    relatedResources: article.relatedResources,
    relatedNews: article.relatedNews,
  };
}

export function getResources(locale: Locale): ResourceView[] {
  return [...resources]
    .sort((a, b) => b.usageCount - a.usageCount)
    .map((resource) => ({
      slug: resource.slug,
      title: resource.title[locale],
      description: resource.description[locale],
      howTo: resource.howTo[locale],
      body: resource.body[locale],
      category: resource.category,
      type: resource.type,
      tags: tagsFor(resource.tags, locale),
      usageCount: resource.usageCount,
      updatedAt: resource.updatedAt,
      dateLabel: formatDate(resource.updatedAt, locale),
      image: imageFor(resource.slug, locale),
    }));
}

export function getResource(slug: string, locale: Locale) {
  return getResources(locale).find((resource) => resource.slug === slug) ?? null;
}

export function getIssues(locale: Locale): IssueView[] {
  return [...newsletterIssues]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .map((issue) => ({
      number: issue.number,
      publishedAt: issue.publishedAt,
      dateLabel: formatDate(issue.publishedAt, locale),
      title: issue.title[locale],
      summary: issue.summary[locale],
      points: issue.points[locale],
    }));
}

const newsletterTags: Record<number, string[]> = {
  12: ["whatsapp", "automation"],
  11: ["proposals", "offers"],
  10: ["news", "ai"],
};

export function getSearchDocuments(locale: Locale): SearchDocument[] {
  const documents: SearchDocument[] = [];

  for (const episode of episodes) {
    documents.push({
      id: `episode-${episode.slug}`,
      type: "episode",
      title: episode.title[locale],
      excerpt: episode.description[locale],
      href: `/podcast/${episode.slug}`,
      tags: episode.tags,
      haystack: [
        episode.title.en,
        episode.title.ne,
        episode.description.en,
        episode.description.ne,
        episode.series.en,
        episode.series.ne,
        episode.guest?.en,
        episode.guest?.ne,
        ...episode.takeaways.en,
        ...episode.takeaways.ne,
        ...episode.transcript.en,
        ...episode.transcript.ne,
        episode.tags.join(" "),
      ]
        .filter(Boolean)
        .join("\n"),
    });
  }

  for (const item of news) {
    documents.push({
      id: `news-${item.slug}`,
      type: "news",
      title: item.title[locale],
      excerpt: item.summary[locale],
      href: `/news/${item.slug}`,
      tags: item.tags,
      haystack: [item.title.en, item.title.ne, item.summary.en, item.summary.ne, item.tldr.en, item.tldr.ne, item.whyItMatters?.en, item.whyItMatters?.ne, item.tags.join(" ")]
        .filter(Boolean)
        .join("\n"),
    });
  }

  for (const slug of getArticleSlugs()) {
    const en = readArticle(slug, "en");
    const ne = readArticle(slug, "ne");
    const current = locale === "en" ? en : ne;
    if (!current) continue;
    documents.push({
      id: `article-${slug}`,
      type: "article",
      title: current.title,
      excerpt: current.excerpt,
      href: `/articles/${slug}`,
      tags: current.tags,
      haystack: [en?.title, ne?.title, en?.excerpt, ne?.excerpt, en ? plainText(en.body) : "", ne ? plainText(ne.body) : "", current.tags.join(" ")]
        .filter(Boolean)
        .join("\n"),
    });
  }

  for (const resource of resources) {
    documents.push({
      id: `resource-${resource.slug}`,
      type: "resource",
      title: resource.title[locale],
      excerpt: resource.description[locale],
      href: `/resources/${resource.slug}`,
      tags: resource.tags,
      haystack: [resource.title.en, resource.title.ne, resource.description.en, resource.description.ne, resource.body.en, resource.body.ne, resource.tags.join(" ")].join("\n"),
    });
  }

  for (const issue of newsletterIssues) {
    documents.push({
      id: `issue-${issue.number}`,
      type: "newsletter",
      title: issue.title[locale],
      excerpt: issue.summary[locale],
      href: `/newsletter#issue-${issue.number}`,
      tags: newsletterTags[issue.number] ?? [],
      haystack: [issue.title.en, issue.title.ne, issue.summary.en, issue.summary.ne, ...issue.points.en, ...issue.points.ne].join("\n"),
    });
  }

  return documents;
}

export function getTopics(locale: Locale) {
  const counts = new Map<string, number>();
  for (const document of getSearchDocuments(locale)) {
    for (const tag of document.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([slug, count]) => ({ slug, count, label: tagLabel(slug, locale) }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

export function getByTag(tag: string, locale: Locale) {
  return getSearchDocuments(locale).filter((document) => document.tags.includes(tag));
}

export function linksForSlugs(slugs: string[], type: ContentType, locale: Locale): RelatedLink[] {
  const documents = getSearchDocuments(locale);
  return slugs
    .map((slug) => documents.find((document) => document.href.endsWith(`/${slug}`) && document.type === type))
    .filter((document): document is SearchDocument => Boolean(document))
    .map((document) => ({
      href: document.href,
      title: document.title,
      type: document.type,
      meta: document.excerpt,
    }));
}

export function listPublicPaths() {
  const staticPaths = [
    "",
    "/podcast",
    "/news",
    "/articles",
    "/resources",
    "/newsletter",
    "/about",
    "/search",
    "/topics",
    "/request",
  ];
  return [
    ...staticPaths,
    ...episodes.map((item) => `/podcast/${item.slug}`),
    ...news.map((item) => `/news/${item.slug}`),
    ...getArticleSlugs().map((slug) => `/articles/${slug}`),
    ...resources.map((item) => `/resources/${item.slug}`),
    ...getTopics("en").map((topic) => `/topics/${topic.slug}`),
  ];
}
