import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { NewsletterForm } from "@/components/content/newsletter-form";
import { Container } from "@/components/layout/container";
import { getIssues } from "@/lib/content";
import { resolveLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, path: "/newsletter", title: t("newsletterTitle"), description: t("newsletterDescription") });
}

export default async function NewsletterPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const t = await getTranslations("newsletter");
  const issues = getIssues(locale);
  const benefits = [t("benefit1"), t("benefit2"), t("benefit3"), t("benefit4")];

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <Container className="grid gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">{t("eyebrow")}</p>
          <h1 className="font-display mt-3 text-4xl leading-tight sm:text-5xl">{t("title")}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{t("description")}</p>
          <h2 className="mt-8 text-sm font-semibold">{t("benefitsTitle")}</h2>
          <ul className="mt-3 space-y-2">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex gap-3 text-sm leading-relaxed">
                <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-accent" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
          <NewsletterForm id="newsletter-page" />
        </div>
      </Container>
      <Container className="pb-16">
        <h2 className="font-display text-3xl">{t("archive")}</h2>
        <ol className="mt-6 max-w-3xl divide-y divide-border border-y border-border">
          {issues.map((issue) => (
            <li key={issue.number} id={`issue-${issue.number}`} className="py-6">
              <p className="text-sm text-muted-foreground">
                {t("issue", { number: issue.number })} · {issue.dateLabel}
              </p>
              <h3 className="font-display mt-2 text-2xl">{issue.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{issue.summary}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed">
                {issue.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Container>
    </main>
  );
}
