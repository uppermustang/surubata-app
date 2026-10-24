import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { isLocale, routing } from "@/i18n/routing";
import { getTopics } from "@/lib/content";
import { organizationJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations("nav");
  const topics = getTopics(locale);
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  return (
    <NextIntlClientProvider messages={messages}>
      <JsonLd data={organizationJsonLd()} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-md focus:bg-background focus:px-4 focus:py-3 focus:text-sm focus:shadow"
      >
        {t("skip")}
      </a>
      <SiteHeader />
      {children}
      <SiteFooter locale={locale} topics={topics} />
      <Analytics />
      {domain ? (
        <Script defer data-domain={domain} src="https://plausible.io/js/script.js" strategy="afterInteractive" />
      ) : null}
    </NextIntlClientProvider>
  );
}
