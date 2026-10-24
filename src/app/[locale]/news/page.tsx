import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { NewsBrowser } from "@/components/content/browsers";
import { Container } from "@/components/layout/container";
import { categoryIds } from "@/content/taxonomy";
import { getNews } from "@/lib/content";
import { resolveLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, path: "/news", title: t("newsTitle"), description: t("newsDescription") });
}

export default async function NewsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const locale = await resolveLocale(params);
  const { category } = await searchParams;
  const t = await getTranslations("news");
  const initial = category && categoryIds.includes(category as (typeof categoryIds)[number]) ? category : "all";

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <Container className="py-12 sm:py-16">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">{t("eyebrow")}</p>
          <h1 className="font-display mt-3 text-4xl leading-tight sm:text-5xl">{t("title")}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t("description")}</p>
          <p className="mt-3 text-sm text-muted-foreground">{t("notFull")}</p>
        </header>
        <div className="mt-10">
          <NewsBrowser items={getNews(locale)} initialCategory={initial} />
        </div>
      </Container>
    </main>
  );
}
