import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { Link } from "@/i18n/navigation";
import { getTopics } from "@/lib/content";
import { resolveLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, path: "/topics", title: t("topicsTitle"), description: t("topicsDescription") });
}

export default async function TopicsPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const t = await getTranslations("topics");
  const topics = getTopics(locale);

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <Container className="py-12 sm:py-16">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">{t("eyebrow")}</p>
          <h1 className="font-display mt-3 text-4xl leading-tight sm:text-5xl">{t("title")}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t("description")}</p>
        </header>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <li key={topic.slug}>
              <Link href={`/topics/${topic.slug}`} className="flex items-baseline justify-between rounded-xl border border-border bg-card px-4 py-4 hover:bg-highlight">
                <span className="font-medium">{topic.label}</span>
                <span className="text-sm text-muted-foreground">{t("count", { count: topic.count })}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}
