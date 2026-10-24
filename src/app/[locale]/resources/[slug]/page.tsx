import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { CoverImage } from "@/components/content/cover-image";
import { CopyButton, DownloadButton, PrintButton } from "@/components/content/copy-button";
import { ShareBar } from "@/components/content/share-bar";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { resources } from "@/content/resources";
import { getResource, getResources } from "@/lib/content";
import { resolveLocale } from "@/lib/locale";
import { absoluteUrl } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => resources.map((resource) => ({ locale, slug: resource.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const resource = getResource(slug, locale);
  if (!resource) return {};
  return pageMetadata({
    locale,
    path: `/resources/${slug}`,
    title: resource.title,
    description: resource.description,
    type: "article",
    image: resource.image?.src,
    imageAlt: resource.image?.alt,
  });
}

export default async function ResourcePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const resource = getResource(slug, locale);
  if (!resource) notFound();
  const t = await getTranslations();
  const related = getResources(locale).filter((item) => item.slug !== resource.slug && item.category === resource.category).slice(0, 3);
  const url = absoluteUrl(`/${locale}/resources/${resource.slug}`);

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <Container className="py-10 sm:py-14">
        <Breadcrumbs items={[{ href: "/", label: t("nav.home") }, { href: "/resources", label: t("nav.resources") }, { label: resource.title }]} />
        <article className="mt-6 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-forest">
            {t(`resourceTypes.${resource.type}`)} · {t(`categories.${resource.category}`)}
          </p>
          <h1 className="font-display mt-3 text-4xl leading-tight sm:text-5xl">{resource.title}</h1>
          {resource.image ? (
            <figure className="relative mt-6 aspect-[16/9] overflow-hidden rounded-xl bg-muted">
              <CoverImage src={resource.image.src} alt={resource.image.alt} sizes="(min-width: 768px) 768px, 100vw" priority />
            </figure>
          ) : null}
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{resource.description}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            {t("common.published")} {resource.dateLabel}
          </p>
          <div className="mt-5">
            <ShareBar url={url} title={resource.title} />
          </div>
          <section className="mt-8 rounded-xl border border-border bg-highlight/40 p-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">{t("resources.howTo")}</h2>
            <p className="mt-2 leading-relaxed">{resource.howTo}</p>
          </section>
          <div className="no-print mt-6 flex flex-wrap gap-2">
            <CopyButton text={resource.body} label={t("common.copy")} copiedLabel={t("common.copied")} />
            <DownloadButton text={resource.body} filename={`${resource.slug}.md`} label={t("common.download")} />
            <PrintButton label={t("common.print")} />
          </div>
          <h2 className="mt-10 text-xs font-semibold uppercase tracking-[0.16em] text-forest">{t("resources.bodyLabel")}</h2>
          <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-card p-5 font-sans text-sm leading-relaxed whitespace-pre-wrap">
            {resource.body}
          </pre>
          <ul className="mt-6 flex flex-wrap gap-2">
            {resource.tags.map((tag) => (
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
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/resources/${item.slug}`} className="block py-4 text-lg">
                    {item.title}
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
