import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PodcastBrowser } from "@/components/content/browsers";
import { EpisodePlayer } from "@/components/content/episode-player";
import { RequestDesk } from "@/components/content/request-desk";
import { Container } from "@/components/layout/container";
import { getEpisodes, getSearchDocuments } from "@/lib/content";
import { resolveLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, path: "/podcast", title: t("podcastTitle"), description: t("podcastDescription") });
}

export default async function PodcastPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const t = await getTranslations("podcast");
  const episodes = getEpisodes(locale);
  const documents = getSearchDocuments(locale).map((item) => ({ ...item, haystack: item.haystack.slice(0, 1200) }));

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <Container className="py-12 sm:py-16">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">{t("eyebrow")}</p>
          <h1 className="font-display mt-3 text-4xl leading-tight sm:text-5xl">{t("title")}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t("description")}</p>
        </header>
        {episodes[0] ? (
          <div className="mt-10">
            <EpisodePlayer episode={episodes[0]} />
          </div>
        ) : null}
        <div className="mt-12">
          <PodcastBrowser items={episodes} />
        </div>
        <section className="mt-16 border-t border-border pt-12">
          <h2 className="font-display text-3xl">{t("requestTitle")}</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">{t("requestLede")}</p>
          <div className="mt-8">
            <RequestDesk documents={documents} initialKind="topic" lockKind />
          </div>
        </section>
      </Container>
    </main>
  );
}
