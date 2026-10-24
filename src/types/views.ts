import type { CategoryId, ContentType, RegionId, ResourceType, TocItem } from "@/types/content";

export type TagRef = { slug: string; label: string };

export type CoverView = { src: string; alt: string };

export type EpisodeView = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  dateLabel: string;
  durationMinutes: number;
  seriesId: string;
  series: string;
  guest?: string;
  youtubeId?: string;
  videoUrl?: string;
  sample?: boolean;
  audioUrl?: string;
  takeaways: string[];
  timestamps: { seconds: number; label: string }[];
  transcript: string[];
  resourceSlugs: string[];
  tags: TagRef[];
  popular: boolean;
  image?: CoverView;
};

export type NewsView = {
  slug: string;
  title: string;
  summary: string;
  tldr: string;
  whyItMatters?: string;
  sourceName: string;
  sourceUrl: string;
  category: CategoryId;
  region: RegionId;
  publishedAt: string;
  dateLabel: string;
  tags: TagRef[];
  image?: CoverView;
};

export type ArticleSummary = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  dateLabel: string;
  minutes: number;
  tags: TagRef[];
  image?: CoverView;
};

export type ArticleView = ArticleSummary & {
  body: string;
  toc: TocItem[];
  relatedEpisodes: string[];
  relatedResources: string[];
  relatedNews: string[];
};

export type ResourceView = {
  slug: string;
  title: string;
  description: string;
  howTo: string;
  body: string;
  category: CategoryId;
  type: ResourceType;
  tags: TagRef[];
  usageCount: number;
  updatedAt: string;
  dateLabel: string;
  image?: CoverView;
};

export type IssueView = {
  number: number;
  publishedAt: string;
  dateLabel: string;
  title: string;
  summary: string;
  points: string[];
};

export type RelatedLink = {
  href: string;
  title: string;
  type: ContentType;
  meta: string;
};
