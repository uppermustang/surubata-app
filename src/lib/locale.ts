import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { isLocale, type Locale } from "@/i18n/routing";

export async function resolveLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  return locale;
}
