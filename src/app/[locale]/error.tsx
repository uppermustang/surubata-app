"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";

export default function LocaleError({ reset }: { error: Error; reset: () => void }) {
  const t = useTranslations("error");

  return (
    <main id="main" className="outline-none">
      <Container className="py-24">
        <h1 className="font-display text-4xl">{t("title")}</h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">{t("description")}</p>
        <button type="button" onClick={reset} className="mt-8 h-11 rounded-md bg-accent px-4 text-sm font-semibold text-accent-foreground">
          {t("retry")}
        </button>
      </Container>
    </main>
  );
}
