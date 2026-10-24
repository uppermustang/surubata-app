"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("lang");

  const item = "rounded-md px-2 py-2 text-xs font-semibold";

  return (
    <div role="group" aria-label={t("switch")} className={cn("flex items-center", className)}>
      <Link
        href={pathname}
        locale="ne"
        hrefLang="ne"
        lang="ne"
        aria-label={t("ne")}
        aria-current={locale === "ne" ? "true" : undefined}
        className={cn(item, locale === "ne" ? "text-foreground" : "text-muted-foreground")}
      >
        ने
      </Link>
      <span aria-hidden className="text-border">
        /
      </span>
      <Link
        href={pathname}
        locale="en"
        hrefLang="en"
        lang="en"
        aria-label={t("en")}
        aria-current={locale === "en" ? "true" : undefined}
        className={cn(item, locale === "en" ? "text-foreground" : "text-muted-foreground")}
      >
        EN
      </Link>
    </div>
  );
}
