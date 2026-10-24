import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ResourceBrowser } from "@/components/content/browsers";
import { Container } from "@/components/layout/container";
import { categoryIds } from "@/content/taxonomy";
import { Link } from "@/i18n/navigation";
import { getResources } from "@/lib/content";
import { resolveLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, path: "/resources", title: t("resourcesTitle"), description: t("resourcesDescription") });
}

export default async function ResourcesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const locale = await resolveLocale(params);
  const query = await searchParams;
  const t = await getTranslations("resources");
  const resources = getResources(locale);
  const initial = query.category && categoryIds.includes(query.category as (typeof categoryIds)[number]) ? query.category : "all";
  const mostUsed = resources.slice(0, 3);

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <Container className="py-12 sm:py-16">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">{t("eyebrow")}</p>
          <h1 className="font-display mt-3 text-4xl leading-tight sm:text-5xl">{t("title")}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t("description")}</p>
        </header>
        <section className="mt-10" aria-labelledby="most-used">
          <h2 id="most-used" className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">
            {t("mostUsed")}
          </h2>
          <ol className="mt-4 grid gap-3 sm:grid-cols-3">
            {mostUsed.map((resource, index) => (
              <li key={resource.slug} className="rounded-xl border border-border bg-card p-4">
                <p className="font-display text-3xl text-accent">{String(index + 1).padStart(2, "0")}</p>
                <Link href={`/resources/${resource.slug}`} className="mt-2 block font-medium leading-snug hover:underline">
                  {resource.title}
                </Link>
              </li>
            ))}
          </ol>
        </section>
        <div className="mt-10">
          <ResourceBrowser items={resources} initialCategory={initial} initialQuery={query.q ?? ""} />
        </div>
      </Container>
    </main>
  );
}
