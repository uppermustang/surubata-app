import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getByTag, getTopics } from "@/lib/content";
import { resolveLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";
import { tagLabel } from "@/content/taxonomy";

export function generateStaticParams() {
  const topics = getTopics("en");
  return routing.locales.flatMap((locale) => topics.map((topic) => ({ locale, tag: topic.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; tag: string }> }): Promise<Metadata> {
  const { tag } = await params;
  const locale = await resolveLocale(params);
  const label = tagLabel(decodeURIComponent(tag), locale);
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    locale,
    path: `/topics/${tag}`,
    title: label,
    description: t("topicsDescription"),
  });
}

export default async function TopicPage({ params }: { params: Promise<{ locale: string; tag: string }> }) {
  const { tag } = await params;
  const locale = await resolveLocale(params);
  const slug = decodeURIComponent(tag);
  const known = getTopics(locale).some((topic) => topic.slug === slug);
  if (!known) notFound();
  const t = await getTranslations();
  const items = getByTag(slug, locale);
  const label = tagLabel(slug, locale);

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <Container className="py-12 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">{t("topics.eyebrow")}</p>
        <h1 className="font-display mt-3 text-4xl sm:text-5xl">{label}</h1>
        <p className="mt-3 text-muted-foreground">{t("topics.count", { count: items.length })}</p>
        {items.length === 0 ? (
          <p className="mt-8">{t("topics.empty")}</p>
        ) : (
          <ul className="mt-8 max-w-3xl divide-y divide-border border-y border-border">
            {items.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className="block py-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-forest">{t(`contentTypes.${item.type}`)}</span>
                  <span className="mt-1 block text-xl">{item.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{item.excerpt}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </main>
  );
}
