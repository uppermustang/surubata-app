"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";

type Persist = "database" | "file" | "none";

export function NewsletterForm({ id, tone = "default" }: { id: string; tone?: "default" | "band" }) {
  const t = useTranslations("newsletter");
  const locale = useLocale();
  const [status, setStatus] = useState<"idle" | "loading" | Persist | "invalid" | "error">("idle");
  const inverse = tone === "band";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("loading");
    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: String(data.get("email") ?? ""),
        locale,
        company: String(data.get("company") ?? ""),
      }),
    });
    const payload = (await response.json().catch(() => null)) as { ok?: boolean; persisted?: Persist; error?: string } | null;
    if (!response.ok || !payload?.ok) {
      setStatus(payload?.error === "invalid" ? "invalid" : "error");
      return;
    }
    form.reset();
    setStatus(payload.persisted ?? "none");
  }

  const message =
    status === "database"
      ? t("successDb")
      : status === "file"
        ? t("successFile")
        : status === "none"
          ? t("successNone")
          : status === "invalid"
            ? t("invalid")
            : status === "error"
              ? t("error")
              : "";

  return (
    <form onSubmit={onSubmit} className="space-y-3" noValidate>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          {t("honeypot")}
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label htmlFor={id} className={cn("block text-sm font-medium", inverse && "text-band-foreground")}>
        {t("emailLabel")}
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id={id}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={t("placeholder")}
          className={cn(
            "h-11 w-full rounded-md border px-3 text-base",
            inverse
              ? "border-band-foreground/30 bg-transparent text-band-foreground placeholder:text-band-foreground/60"
              : "border-border bg-background",
          )}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="h-11 shrink-0 rounded-md bg-accent px-4 text-sm font-semibold text-accent-foreground hover:bg-accent/90 disabled:opacity-60"
        >
          {t("submit")}
        </button>
      </div>
      <p className={cn("text-xs leading-relaxed", inverse ? "text-band-foreground/75" : "text-muted-foreground")}>{t("privacy")}</p>
      <p role="status" aria-live="polite" className={cn("text-sm", message ? "min-h-5" : "sr-only", inverse && "text-band-foreground")}>
        {message}
      </p>
    </form>
  );
}
