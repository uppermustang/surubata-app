import type { Metadata } from "next";
import { Play } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { CoverImage } from "@/components/content/cover-image";
import { CopyButton } from "@/components/content/copy-button";
import { FadeIn } from "@/components/content/fade-in";
import { VideoStage } from "@/components/content/video-stage";
import { NewsletterForm } from "@/components/content/newsletter-form";
import { Container } from "@/components/layout/container";
import { Link } from "@/i18n/navigation";
import { getArticles, getEpisodes, getNews, getResources } from "@/lib/content";
import { resolveLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    locale,
    path: "",
    title: t("homeTitle"),
    description: t("homeDescription"),
    absolute: true,
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const t = await getTranslations("home");
  const common = await getTranslations("common");
  const episodeCopy = await getTranslations("episode");
  const regions = await getTranslations("regions");
  const categories = await getTranslations("categories");
  const types = await getTranslations("resourceTypes");
  const brief = getNews(locale).slice(0, 4);
  const episodes = getEpisodes(locale);
  const episode = episodes[0];
  const articles = getArticles(locale).slice(0, 3);
  const resources = getResources(locale).slice(0, 3);
  const [lead, ...rest] = articles;

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <Container className="py-10 sm:py-14 lg:py-16">
        <div className="lg:grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start lg:gap-x-12 xl:gap-x-16">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest">{t("eyebrow")}</p>
            <h1 className="font-display mt-4 text-4xl leading-[1.08] sm:text-5xl xl:text-[3.4rem]">
              <span className="block">{t("titleLead")}</span>
              <span className="mt-1 block text-accent">{t("titleRest")}</span>
            </h1>
          </FadeIn>
          {episode?.image ? (
            <div className="mt-8 lg:row-span-2 lg:mt-0">
              <VideoStage
                title={episode.title}
                poster={episode.image.src}
                posterAlt={episode.image.alt}
                videoUrl={episode.videoUrl}
                youtubeId={episode.youtubeId}
                playLabel={episodeCopy("playVideo")}
              />
            </div>
          ) : null}
          <div className="mt-8 max-w-xl lg:mt-6">
            <p className="text-lg leading-relaxed text-muted-foreground">{t("lede")}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href="#brief" className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-4 text-sm font-semibold text-accent-foreground">
                {t("primaryCta")}
              </a>
              <a href="#newsletter" className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-card px-4 text-sm font-semibold">
                {t("secondaryCta")}
              </a>
            </div>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-3 lg:col-span-2 lg:mt-10">
            {[
              { href: "/podcast", title: t("path1"), detail: t("path1Detail") },
              { href: "/news", title: t("path2"), detail: t("path2Detail") },
              { href: "/resources", title: t("path3"), detail: t("path3Detail") },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="group flex h-full flex-col rounded-xl border border-border bg-card px-4 py-4 transition-colors hover:border-accent">
                  <span className="font-medium group-hover:underline">{item.title}</span>
                  <span className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.detail}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <Container className="pb-4">
        <aside id="brief" className="rounded-xl border border-border bg-card p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">{t("briefEyebrow")}</p>
          <h2 className="font-display mt-2 text-2xl">{t("briefTitle")}</h2>
          <ol className="mt-5 grid gap-x-10 gap-y-5 lg:grid-cols-2">
            {brief.map((item, index) => (
              <li key={item.slug}>
                <Link href={`/news/${item.slug}`} className="group block">
                  <span className="text-xs font-semibold text-muted-foreground">
                    {String(index + 1).padStart(2, "0")} · {regions(item.region)}
                  </span>
                  <span className="mt-1 block font-medium leading-snug group-hover:underline">{item.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{item.tldr}</span>
                </Link>
              </li>
            ))}
          </ol>
        </aside>
      </Container>

      {episode ? (
        <section className="border-t border-border">
          <Container className="py-14">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl">{t("episodeEyebrow")}</h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{t("episodeLede")}</p>
              </div>
              <Link href="/podcast" className="shrink-0 text-sm font-medium underline underline-offset-4">
                {common("listen")}
              </Link>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {episodes.map((item) => (
                <li key={item.slug}>
                  <Link href={`/podcast/${item.slug}`} className="group block overflow-hidden rounded-xl border border-border bg-card">
                    <span className="relative block aspect-video bg-muted">
                      {item.image ? <CoverImage src={item.image.src} alt="" sizes="(min-width: 1024px) 30vw, 100vw" /> : null}
                      <span className="absolute bottom-3 left-3 inline-flex size-11 items-center justify-center rounded-full bg-white text-neutral-950 shadow-md">
                        <Play className="ml-0.5 size-4" fill="currentColor" aria-hidden />
                      </span>
                    </span>
                    <span className="block p-4">
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-forest">{item.series}</span>
                      <span className="font-display mt-2 block text-xl leading-tight group-hover:underline">{item.title}</span>
                      <span className="mt-2 block text-sm text-muted-foreground">
                        {item.dateLabel} · {common("minListen", { minutes: item.durationMinutes })}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <section className="border-t border-border">
        <Container className="py-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">{t("newsEyebrow")}</p>
              <h2 className="font-display mt-2 text-3xl sm:text-4xl">{t("newsTitle")}</h2>
            </div>
            <Link href="/news" className="shrink-0 text-sm font-medium underline underline-offset-4">
              {t("newsLink")}
            </Link>
          </div>
          <ul className="divide-y divide-border border-y border-border">
            {getNews(locale).slice(0, 5).map((item) => (
              <li key={item.slug}>
                <Link href={`/news/${item.slug}`} className="flex items-start gap-4 py-5 md:grid md:grid-cols-[10rem_9rem_minmax(0,1fr)] md:gap-6">
                  {item.image ? (
                    <span className="relative block h-24 w-32 shrink-0 overflow-hidden rounded-md bg-muted md:h-28 md:w-full">
                      <CoverImage src={item.image.src} alt="" sizes="160px" />
                    </span>
                  ) : null}
                  <p className="hidden min-w-0 text-xs font-semibold uppercase leading-relaxed tracking-[0.14em] text-muted-foreground md:block">
                    {regions(item.region)}
                    <span className="mt-1 block normal-case tracking-normal">{categories(item.category)}</span>
                  </p>
                  <span className="min-w-0">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground md:hidden">
                      {regions(item.region)} · {categories(item.category)}
                    </span>
                    <span className="font-display mt-1 block text-2xl leading-tight sm:mt-0">{item.title}</span>
                    <span className="mt-2 block max-w-3xl text-sm leading-relaxed text-muted-foreground">{item.summary}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {lead ? (
        <section className="border-t border-border">
          <Container className="py-14">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">{t("articlesEyebrow")}</p>
                <h2 className="font-display mt-2 text-3xl sm:text-4xl">{t("articlesTitle")}</h2>
              </div>
              <Link href="/articles" className="shrink-0 text-sm font-medium underline underline-offset-4">
                {t("articlesLink")}
              </Link>
            </div>
            <div className="grid gap-10 lg:grid-cols-2">
              <Link href={`/articles/${lead.slug}`} className="block">
                {lead.image ? (
                  <span className="relative mb-5 block aspect-[16/10] overflow-hidden rounded-xl bg-muted">
                    <CoverImage src={lead.image.src} alt="" sizes="(min-width: 1024px) 40vw, 100vw" />
                  </span>
                ) : null}
                <p className="text-sm text-muted-foreground">
                  {lead.dateLabel} · {common("minRead", { minutes: lead.minutes })}
                </p>
                <h3 className="font-display mt-3 text-4xl leading-tight">{lead.title}</h3>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">{lead.excerpt}</p>
              </Link>
              <ul className="divide-y divide-border border-y border-border">
                {rest.map((article) => (
                  <li key={article.slug}>
                    <Link href={`/articles/${article.slug}`} className="grid grid-cols-[5rem_minmax(0,1fr)] items-start gap-4 py-5">
                      {article.image ? (
                        <span className="relative mt-1 block aspect-[4/3] overflow-hidden rounded-md bg-muted">
                          <CoverImage src={article.image.src} alt="" sizes="80px" />
                        </span>
                      ) : (
                        <span className="block" />
                      )}
                      <span>
                      <p className="text-sm text-muted-foreground">{common("minRead", { minutes: article.minutes })}</p>
                      <h3 className="font-display mt-2 text-2xl leading-tight">{article.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="border-t border-border">
        <Container className="py-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">{t("resourcesEyebrow")}</p>
              <h2 className="font-display mt-2 text-3xl sm:text-4xl">{t("resourcesTitle")}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{t("mostUsed")}</p>
            </div>
            <Link href="/resources" className="shrink-0 text-sm font-medium underline underline-offset-4">
              {t("resourcesLink")}
            </Link>
          </div>
          <ul className="flex snap-x gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible">
            {resources.map((resource) => (
              <li key={resource.slug} className="w-[82%] shrink-0 snap-start overflow-hidden rounded-xl border border-border bg-card sm:w-[46%] lg:w-auto">
                {resource.image ? (
                  <Link href={`/resources/${resource.slug}`} aria-label={resource.title} className="relative block aspect-[16/9] bg-muted">
                    <CoverImage src={resource.image.src} alt="" sizes="(min-width: 1024px) 30vw, 80vw" />
                  </Link>
                ) : null}
                <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-forest">{types(resource.type)}</p>
                <Link href={`/resources/${resource.slug}`} className="font-display mt-3 block text-2xl leading-tight hover:underline">
                  {resource.title}
                </Link>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{resource.description}</p>
                <div className="mt-4">
                  <CopyButton text={resource.body} label={common("copy")} copiedLabel={common("copied")} />
                </div>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="newsletter" className="bg-band text-band-foreground">
        <Container className="grid gap-8 py-14 lg:grid-cols-2 lg:items-center lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-band-foreground/70">{t("newsletterEyebrow")}</p>
            <h2 className="font-display mt-3 text-4xl leading-tight">{t("newsletterTitle")}</h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-band-foreground/80">{t("newsletterLede")}</p>
          </div>
          <NewsletterForm id="home-newsletter" tone="band" />
        </Container>
      </section>
    </main>
  );
}
