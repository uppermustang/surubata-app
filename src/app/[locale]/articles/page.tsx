import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CoverImage } from "@/components/content/cover-image";
import { Container } from "@/components/layout/container";
import { Link } from "@/i18n/navigation";
import { getArticles } from "@/lib/content";
import { resolveLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, path: "/articles", title: t("articlesTitle"), description: t("articlesDescription") });
}

export default async function ArticlesPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const t = await getTranslations("articles");
  const common = await getTranslations("common");
  const articles = getArticles(locale);

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <Container className="py-12 sm:py-16">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">{t("eyebrow")}</p>
          <h1 className="font-display mt-3 text-4xl leading-tight sm:text-5xl">{t("title")}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t("description")}</p>
        </header>
        <ul className="mt-10 max-w-3xl divide-y divide-border border-y border-border">
          {articles.map((article) => (
            <li key={article.slug}>
              <Link href={`/articles/${article.slug}`} className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-start gap-4 py-7 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6">
                {article.image ? (
                  <span className="relative mt-1 block aspect-[4/3] overflow-hidden rounded-md bg-muted">
                    <CoverImage src={article.image.src} alt="" sizes="144px" />
                  </span>
                ) : (
                  <span className="block" />
                )}
                <span>
                <p className="text-sm text-muted-foreground">
                  {article.dateLabel} · {common("minRead", { minutes: article.minutes })}
                </p>
                <h2 className="font-display mt-2 text-3xl leading-tight">{article.title}</h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{article.excerpt}</p>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}
