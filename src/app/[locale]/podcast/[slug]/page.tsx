import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { EpisodePlayer } from "@/components/content/episode-player";
import { ShareBar } from "@/components/content/share-bar";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { episodes } from "@/content/episodes";
import { getEpisode, getResources } from "@/lib/content";
import { resolveLocale } from "@/lib/locale";
import { absoluteUrl } from "@/lib/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => episodes.map((episode) => ({ locale, slug: episode.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const episode = getEpisode(slug, locale);
  if (!episode) return {};
  return pageMetadata({
    locale,
    path: `/podcast/${slug}`,
    title: episode.title,
    description: episode.description,
    type: "article",
    image: episode.image?.src,
    imageAlt: episode.image?.alt,
  });
}

export default async function EpisodePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const episode = getEpisode(slug, locale);
  if (!episode) notFound();
  const t = await getTranslations();
  const resources = getResources(locale).filter((resource) => episode.resourceSlugs.includes(resource.slug));
  const url = absoluteUrl(`/${locale}/podcast/${episode.slug}`);

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "PodcastEpisode",
          name: episode.title,
          description: episode.description,
          datePublished: episode.publishedAt,
          image: episode.image ? absoluteUrl(episode.image.src) : undefined,
          timeRequired: `PT${episode.durationMinutes}M`,
          inLanguage: locale,
          url,
          partOfSeries: { "@type": "PodcastSeries", name: "Surubata" },
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t("nav.home"), path: `/${locale}` },
          { name: t("nav.podcast"), path: `/${locale}/podcast` },
          { name: episode.title, path: `/${locale}/podcast/${episode.slug}` },
        ])}
      />
      <Container className="py-10 sm:py-14">
        <Breadcrumbs
          items={[
            { href: "/", label: t("nav.home") },
            { href: "/podcast", label: t("nav.podcast") },
            { label: episode.title },
          ]}
        />
        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">
            {episode.series}
            {episode.guest ? ` · ${t("common.guest")}: ${episode.guest}` : ""}
          </p>
          <h1 className="font-display mt-3 text-4xl leading-tight sm:text-5xl">{episode.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{episode.description}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            {episode.dateLabel} · {t("common.minListen", { minutes: episode.durationMinutes })}
          </p>
          <div className="mt-5">
            <ShareBar url={url} title={episode.title} />
          </div>
        </header>
        <div className="mt-8 max-w-4xl">
          <EpisodePlayer episode={episode} />
        </div>
        <section className="mt-10 max-w-3xl rounded-xl border border-border bg-highlight/50 p-5 sm:p-6">
          <h2 className="font-display text-2xl">{t("episode.takeaways")}</h2>
          <ul className="mt-4 space-y-3">
            {episode.takeaways.map((item) => (
              <li key={item} className="border-l-2 border-forest pl-3 leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </section>
        <section className="prose-article mt-12 max-w-prose">
          <h2>{t("episode.transcript")}</h2>
          {episode.transcript.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </section>
        {resources.length > 0 ? (
          <section className="mt-12 max-w-3xl">
            <h2 className="font-display text-2xl">{t("episode.mentioned")}</h2>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {resources.map((resource) => (
                <li key={resource.slug}>
                  <Link href={`/resources/${resource.slug}`} className="block py-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-forest">{t(`resourceTypes.${resource.type}`)}</span>
                    <span className="mt-1 block text-lg">{resource.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        <p className="mt-10">
          <Link href="/request?kind=topic" className="text-sm font-semibold underline underline-offset-4">
            {t("podcast.requestTitle")}
          </Link>
        </p>
      </Container>
    </main>
  );
}
