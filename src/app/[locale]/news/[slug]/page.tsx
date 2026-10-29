import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { CoverImage } from "@/components/content/cover-image";
import { ShareBar } from "@/components/content/share-bar";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { news } from "@/content/news";
import { getNews, getNewsItem } from "@/lib/content";
import { resolveLocale } from "@/lib/locale";
import { absoluteUrl } from "@/lib/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => news.map((item) => ({ locale, slug: item.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const item = getNewsItem(slug, locale);
  if (!item) return {};
  return pageMetadata({
    locale,
    path: `/news/${slug}`,
    title: item.title,
    description: item.summary,
    type: "article",
    image: item.image?.src,
    imageAlt: item.image?.alt,
  });
}

export default async function NewsDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const item = getNewsItem(slug, locale);
  if (!item) notFound();
  const t = await getTranslations();
  const related = getNews(locale).filter((entry) => entry.slug !== item.slug && entry.category === item.category).slice(0, 3);
  const url = absoluteUrl(`/${locale}/news/${item.slug}`);

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: item.title,
          description: item.summary,
          datePublished: item.publishedAt,
          image: item.image ? absoluteUrl(item.image.src) : undefined,
          inLanguage: locale,
          url,
          citation: item.sourceUrl,
          author: { "@type": "Organization", name: "BotDawn" },
          publisher: { "@type": "Organization", name: "BotDawn" },
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t("nav.home"), path: `/${locale}` },
          { name: t("nav.news"), path: `/${locale}/news` },
          { name: item.title, path: `/${locale}/news/${item.slug}` },
        ])}
      />
      <Container className="py-10 sm:py-14">
        <Breadcrumbs items={[{ href: "/", label: t("nav.home") }, { href: "/news", label: t("nav.news") }, { label: item.title }]} />
        <article className="mt-6 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {t(`regions.${item.region}`)} · {t(`categories.${item.category}`)} · {item.dateLabel}
          </p>
          <h1 className="font-display mt-3 text-4xl leading-tight sm:text-5xl">{item.title}</h1>
          {item.image ? (
            <figure className="relative mt-6 aspect-[16/9] overflow-hidden rounded-xl bg-muted">
              <CoverImage src={item.image.src} alt={item.image.alt} sizes="(min-width: 768px) 768px, 100vw" priority />
            </figure>
          ) : null}
          <p className="mt-6 text-xl leading-relaxed">{item.summary}</p>
          <p className="mt-4 text-sm text-muted-foreground">{t("news.notFull")}</p>
          {item.whyItMatters ? (
            <aside className="mt-8 border-l-2 border-forest pl-4">
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">{t("common.why")}</h2>
              <p className="mt-2 text-lg leading-relaxed">{item.whyItMatters}</p>
            </aside>
          ) : null}
          <p className="mt-8">
            <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center rounded-md bg-foreground px-4 text-sm font-semibold text-background">
              {t("news.readSource")} · {item.sourceName}
              <span className="sr-only"> ({t("common.external")})</span>
            </a>
          </p>
          <div className="mt-6">
            <ShareBar url={url} title={item.title} />
          </div>
          <ul className="mt-8 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <li key={tag.slug}>
                <Link href={`/topics/${tag.slug}`} className="rounded-full border border-border px-3 py-1 text-xs font-medium hover:bg-muted">
                  {tag.label}
                </Link>
              </li>
            ))}
          </ul>
        </article>
        {related.length > 0 ? (
          <section className="mt-14 max-w-3xl">
            <h2 className="font-display text-2xl">{t("common.related")}</h2>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {related.map((entry) => (
                <li key={entry.slug}>
                  <Link href={`/news/${entry.slug}`} className="block py-4 text-lg">
                    {entry.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </Container>
    </main>
  );
}
