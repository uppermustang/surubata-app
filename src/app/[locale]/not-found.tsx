import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <main id="main" className="outline-none">
      <Container className="py-24">
        <h1 className="font-display text-4xl">{t("title")}</h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">{t("description")}</p>
        <Link href="/" className="mt-8 inline-flex h-11 items-center rounded-md bg-accent px-4 text-sm font-semibold text-accent-foreground">
          {t("cta")}
        </Link>
      </Container>
    </main>
  );
}
