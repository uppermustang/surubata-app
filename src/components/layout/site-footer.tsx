import { getTranslations } from "next-intl/server";
import { NewsletterForm } from "@/components/content/newsletter-form";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export async function SiteFooter({ locale, topics }: { locale: Locale; topics: { slug: string; label: string }[] }) {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-border bg-card">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">{t("blurb")}</p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:contents">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">{t("explore")}</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/podcast" className="hover:underline">{nav("podcast")}</Link></li>
              <li><Link href="/news" className="hover:underline">{nav("news")}</Link></li>
              <li><Link href="/articles" className="hover:underline">{nav("articles")}</Link></li>
              <li><Link href="/resources" className="hover:underline">{nav("resources")}</Link></li>
              <li><Link href="/newsletter" className="hover:underline">{nav("newsletter")}</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">{nav("topics")}</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {topics.slice(0, 6).map((topic) => (
                <li key={topic.slug}>
                  <Link href={`/topics/${topic.slug}`} className="hover:underline">
                    {topic.label}
                  </Link>
                </li>
              ))}
              <li><Link href="/about" className="hover:underline">{nav("about")}</Link></li>
              <li><Link href="/request" className="hover:underline">{nav("request")}</Link></li>
            </ul>
          </div>
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">{nav("newsletter")}</h2>
          <div className="mt-4">
            <NewsletterForm id={`footer-newsletter-${locale}`} />
          </div>
        </div>
      </Container>
      <Container className="flex flex-col gap-3 border-t border-border py-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>{t("rights", { year })}</p>
        <div className="flex items-center gap-4">
          <span>{t("language")}</span>
          <Link href="/feed.xml" className="underline underline-offset-4">
            RSS
          </Link>
        </div>
      </Container>
    </footer>
  );
}
