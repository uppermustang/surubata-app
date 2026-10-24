import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { Link } from "@/i18n/navigation";
import { getSearchDocuments } from "@/lib/content";
import { resolveLocale } from "@/lib/locale";
import { rankDocuments } from "@/lib/score";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, path: "/search", title: t("searchTitle"), description: t("searchDescription") });
}

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const locale = await resolveLocale(params);
  const { q = "" } = await searchParams;
  const t = await getTranslations("search");
  const types = await getTranslations("contentTypes");
  const query = q.trim();
  const results = query ? rankDocuments(getSearchDocuments(locale), query, 20) : [];

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <Container className="py-12 sm:py-16">
        <header className="max-w-3xl">
          <h1 className="font-display text-4xl sm:text-5xl">{t("label")}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("prompt")}</p>
        </header>
        <form action="" method="get" role="search" className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
          <label htmlFor="q" className="sr-only">
            {t("label")}
          </label>
          <input
            id="q"
            name="q"
            defaultValue={query}
            placeholder={t("placeholder")}
            className="h-12 w-full rounded-md border border-border bg-card px-3 text-base"
          />
          <button type="submit" className="h-12 rounded-md bg-accent px-5 text-sm font-semibold text-accent-foreground">
            {t("submit")}
          </button>
        </form>
        {query ? (
          <section className="mt-10" aria-live="polite">
            <h2 className="text-sm text-muted-foreground">{t("results", { count: results.length, query })}</h2>
            {results.length === 0 ? (
              <p className="mt-6 max-w-xl leading-relaxed">
                {t("empty")}{" "}
                <Link href="/request" className="underline underline-offset-4">
                  {t("ask")}
                </Link>
              </p>
            ) : (
              <ul className="mt-4 max-w-3xl divide-y divide-border border-y border-border">
                {results.map((result) => (
                  <li key={result.id}>
                    <Link href={result.href} className="block py-4">
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-forest">{types(result.type)}</span>
                      <span className="mt-1 block text-xl">{result.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{result.excerpt}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ) : null}
      </Container>
    </main>
  );
}
