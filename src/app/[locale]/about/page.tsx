import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { aboutPage } from "@/content/about";
import { coverFor } from "@/content/covers";
import { CoverImage } from "@/components/content/cover-image";
import { Container } from "@/components/layout/container";
import { resolveLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "meta" });
  const cover = coverFor("about");
  return pageMetadata({
    locale,
    path: "/about",
    title: t("aboutTitle"),
    description: t("aboutDescription"),
    image: cover?.src,
    imageAlt: cover?.alt[locale],
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const t = await getTranslations("meta");
  const cover = coverFor("about");

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <Container className="py-12 sm:py-16">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">{t("aboutTitle")}</p>
          <h1 className="font-display mt-3 text-4xl leading-tight sm:text-6xl">{aboutPage.meaning[locale]}</h1>
          {cover ? (
            <figure className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl bg-muted sm:aspect-[2/1]">
              <CoverImage src={cover.src} alt={cover.alt[locale]} sizes="(min-width: 1024px) 960px, 100vw" priority />
            </figure>
          ) : null}
        </header>
        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,42rem)_minmax(16rem,20rem)]">
          <div className="space-y-10">
            <section>
              <h2 className="font-display text-3xl">{aboutPage.storyTitle[locale]}</h2>
              {aboutPage.story[locale].map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="mt-4 text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </section>
            <section>
              <h2 className="font-display text-3xl">{aboutPage.missionTitle[locale]}</h2>
              {aboutPage.mission[locale].map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="mt-4 text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </section>
            <section>
              <h2 className="font-display text-3xl">{aboutPage.audienceTitle[locale]}</h2>
              {aboutPage.audience[locale].map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="mt-4 text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </section>
            <section>
              <h2 className="font-display text-3xl">{aboutPage.valuesTitle[locale]}</h2>
              <ul className="mt-4 space-y-4">
                {aboutPage.values.map((value) => (
                  <li key={value.title.en} className="border-l-2 border-accent pl-4">
                    <h3 className="font-semibold">{value.title[locale]}</h3>
                    <p className="mt-1 leading-relaxed text-muted-foreground">{value.body[locale]}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <aside className="h-fit rounded-xl border border-border bg-card p-6 lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">{aboutPage.hostTitle[locale]}</p>
            <h2 className="font-display mt-3 text-3xl">{aboutPage.hostName[locale]}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{aboutPage.hostRole[locale]}</p>
            {aboutPage.hostBio[locale].map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="mt-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{aboutPage.hostNote[locale]}</p>
          </aside>
        </div>
      </Container>
    </main>
  );
}
