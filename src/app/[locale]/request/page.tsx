import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { RequestDesk } from "@/components/content/request-desk";
import { Container } from "@/components/layout/container";
import { getSearchDocuments } from "@/lib/content";
import { resolveLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, path: "/request", title: t("requestTitle"), description: t("requestDescription") });
}

export default async function RequestPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ kind?: string }>;
}) {
  const locale = await resolveLocale(params);
  const { kind } = await searchParams;
  const t = await getTranslations("request");
  const documents = getSearchDocuments(locale).map((item) => ({ ...item, haystack: item.haystack.slice(0, 1600) }));

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <Container className="py-12 sm:py-16">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">{t("eyebrow")}</p>
          <h1 className="font-display mt-3 text-4xl leading-tight sm:text-5xl">{t("title")}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t("description")}</p>
        </header>
        <div className="mt-10">
          <RequestDesk documents={documents} initialKind={kind === "topic" ? "topic" : "need"} />
        </div>
      </Container>
    </main>
  );
}
