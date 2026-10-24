import { isLocale } from "@/i18n/routing";
import { getArticles, getEpisodes, getNews } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";
import { escapeXml } from "@/lib/utils";

export async function GET(_request: Request, context: { params: Promise<{ locale: string }> }) {
  const { locale } = await context.params;
  if (!isLocale(locale)) return new Response("Not found", { status: 404 });

  const items = [
    ...getNews(locale).map((item) => ({
      title: item.title,
      description: item.summary,
      url: absoluteUrl(`/${locale}/news/${item.slug}`),
      date: item.publishedAt,
    })),
    ...getArticles(locale).map((item) => ({
      title: item.title,
      description: item.excerpt,
      url: absoluteUrl(`/${locale}/articles/${item.slug}`),
      date: item.publishedAt,
    })),
    ...getEpisodes(locale).map((item) => ({
      title: item.title,
      description: item.description,
      url: absoluteUrl(`/${locale}/podcast/${item.slug}`),
      date: item.publishedAt,
    })),
  ]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 20);

  const channelTitle = locale === "ne" ? "सुरुबाट" : "Surubata";
  const description =
    locale === "ne"
      ? "नेपाली निर्माणकर्ताका लागि काम लाग्ने एआई र अटोमेसन।"
      : "Practical AI and automation for Nepali builders.";

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(channelTitle)}</title>
    <link>${escapeXml(absoluteUrl(`/${locale}`))}</link>
    <description>${escapeXml(description)}</description>
    <language>${locale === "ne" ? "ne" : "en"}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items
      .map(
        (item) => `<item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.url)}</link>
      <guid>${escapeXml(item.url)}</guid>
      <pubDate>${new Date(`${item.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(item.description)}</description>
    </item>`,
      )
      .join("\n")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
