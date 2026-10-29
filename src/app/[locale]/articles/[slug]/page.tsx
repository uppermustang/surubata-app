import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { CoverImage } from "@/components/content/cover-image";
import { mdxComponents } from "@/components/content/mdx";
import { ReadingProgress } from "@/components/content/reading-progress";
import { ShareBar } from "@/components/content/share-bar";
import { TableOfContents } from "@/components/content/table-of-contents";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getArticle, getArticleSlugs, linksForSlugs } from "@/lib/content";
import { resolveLocale } from "@/lib/locale";
import { absoluteUrl } from "@/lib/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getArticleSlugs().map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const article = getArticle(slug, locale);
  if (!article) return {};
  return pageMetadata({
    locale,
    path: `/articles/${slug}`,
    title: article.title,
    description: article.excerpt,
    type: "article",
    image: article.image?.src,
    imageAlt: article.image?.alt,
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const article = getArticle(slug, locale);
  if (!article) notFound();
  const t = await getTranslations();
  const url = absoluteUrl(`/${locale}/articles/${article.slug}`);
  const related = [
    ...linksForSlugs(article.relatedEpisodes, "episode", locale),
    ...linksForSlugs(article.relatedResources, "resource", locale),
    ...linksForSlugs(article.relatedNews, "news", locale),
  ];

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <ReadingProgress />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.excerpt,
          datePublished: article.publishedAt,
          image: article.image ? absoluteUrl(article.image.src) : undefined,
          inLanguage: locale,
          url,
          author: { "@type": "Organization", name: "BotDawn" },
          publisher: { "@type": "Organization", name: "BotDawn", logo: { "@type": "ImageObject", url: absoluteUrl("/icon") } },
          mainEntityOfPage: url,
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t("nav.home"), path: `/${locale}` },
          { name: t("nav.articles"), path: `/${locale}/articles` },
          { name: article.title, path: `/${locale}/articles/${article.slug}` },
        ])}
      />
      <Container className="py-10 sm:py-14">
        <Breadcrumbs items={[{ href: "/", label: t("nav.home") }, { href: "/articles", label: t("nav.articles") }, { label: article.title }]} />
        <div className="mt-8 lg:grid lg:grid-cols-[minmax(0,42rem)_16rem] lg:justify-between lg:gap-16">
          <article id="article-body" className="max-w-prose">
            <header>
              <p className="text-sm text-muted-foreground">
                {t("common.by")} {t("common.desk")} · {article.dateLabel} · {t("common.minRead", { minutes: article.minutes })}
              </p>
              <h1 className="font-display mt-3 text-4xl leading-tight sm:text-5xl">{article.title}</h1>
              <p className="mt-5 text-xl leading-relaxed text-muted-foreground">{article.excerpt}</p>
              <div className="mt-5">
                <ShareBar url={url} title={article.title} />
              </div>
              {article.image ? (
                <figure className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl bg-muted">
                  <CoverImage src={article.image.src} alt={article.image.alt} sizes="(min-width: 768px) 672px, 100vw" priority />
                </figure>
              ) : null}
            </header>
            {article.toc.length > 0 ? (
              <details className="no-print mt-8 rounded-xl border border-border p-4 lg:hidden">
                <summary className="cursor-pointer text-sm font-semibold">{t("articles.toc")}</summary>
                <div className="mt-4">
                  <TableOfContents items={article.toc} label={t("articles.toc")} />
                </div>
              </details>
            ) : null}
            <div className="prose-article mt-8">
              <MDXRemote source={article.body} components={mdxComponents} />
            </div>
            <ul className="mt-10 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <li key={tag.slug}>
                  <Link href={`/topics/${tag.slug}`} className="rounded-full border border-border px-3 py-1 text-xs font-medium hover:bg-muted">
                    {tag.label}
                  </Link>
                </li>
              ))}
            </ul>
          </article>
          <aside className="no-print hidden lg:block">
            <div className="sticky top-28">
              <TableOfContents items={article.toc} label={t("articles.toc")} />
            </div>
          </aside>
        </div>
        {related.length > 0 ? (
          <section className="mt-14 max-w-3xl border-t border-border pt-8">
            <h2 className="font-display text-2xl">{t("common.related")}</h2>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {related.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="block py-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-forest">{t(`contentTypes.${item.type}`)}</span>
                    <span className="mt-1 block text-lg">{item.title}</span>
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
