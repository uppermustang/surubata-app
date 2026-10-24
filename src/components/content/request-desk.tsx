"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { rankDocuments } from "@/lib/score";
import type { SearchDocument } from "@/types/content";
import { cn } from "@/lib/utils";

type Kind = "need" | "topic";
type Persist = "database" | "file" | "none";

export function RequestDesk({
  documents,
  initialKind = "need",
  lockKind = false,
}: {
  documents: SearchDocument[];
  initialKind?: Kind;
  lockKind?: boolean;
}) {
  const t = useTranslations("request");
  const types = useTranslations("contentTypes");
  const locale = useLocale();
  const [kind, setKind] = useState<Kind>(initialKind);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | Persist | "invalid" | "error">("idle");

  const matches = useMemo(() => (kind === "need" ? rankDocuments(documents, query, 4) : []), [documents, kind, query]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("loading");
    const response = await fetch("/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind,
        message: String(data.get("message") ?? ""),
        name: String(data.get("name") ?? ""),
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
    setStatus(payload.persisted ?? "none");
  }

  const message =
    status === "database" || status === "file" || status === "none"
      ? `${t("sent")} ${status === "file" ? t("sentFile") : status === "none" ? t("sentNone") : ""}`.trim()
      : status === "invalid"
        ? t("invalid")
        : status === "error"
          ? t("error")
          : "";

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        {lockKind ? null : (
          <div role="group" aria-label={t("switchLabel")} className="flex flex-wrap gap-2">
            {(["need", "topic"] as const).map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={kind === option}
                onClick={() => setKind(option)}
                className={cn(
                  "h-10 rounded-full border px-4 text-sm font-semibold",
                  kind === option ? "border-foreground bg-foreground text-background" : "border-border",
                )}
              >
                {t(option)}
              </button>
            ))}
          </div>
        )}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label>
            Company
            <input name="company" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <div>
          <label htmlFor="request-message" className="text-sm font-medium">
            {kind === "topic" ? t("topicLabel") : t("messageLabel")}
          </label>
          <textarea
            id="request-message"
            name="message"
            required
            minLength={12}
            rows={5}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={kind === "topic" ? t("placeholderTopic") : t("placeholderNeed")}
            className="mt-2 w-full rounded-md border border-border bg-card px-3 py-3 text-base leading-relaxed"
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="request-name" className="text-sm font-medium">
              {t("nameLabel")}
            </label>
            <input id="request-name" name="name" className="mt-2 h-11 w-full rounded-md border border-border bg-card px-3 text-base" />
          </div>
          <div>
            <label htmlFor="request-email" className="text-sm font-medium">
              {t("emailLabel")}
            </label>
            <input id="request-email" name="email" type="email" className="mt-2 h-11 w-full rounded-md border border-border bg-card px-3 text-base" />
          </div>
        </div>
        <button type="submit" disabled={status === "loading"} className="h-11 rounded-md bg-accent px-4 text-sm font-semibold text-accent-foreground disabled:opacity-60">
          {kind === "topic" ? t("submitTopic") : t("submitNeed")}
        </button>
        <p role="status" aria-live="polite" className="text-sm">
          {message}
        </p>
      </form>
      <aside>
        <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">{t("matches")}</h2>
        {kind === "topic" ? null : matches.length === 0 ? (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{query.trim().length > 2 ? t("noMatches") : t("description")}</p>
        ) : (
          <ul className="mt-3 divide-y divide-border border-y border-border">
            {matches.map((match) => (
              <li key={match.id}>
                <Link href={match.href} className="block py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{types(match.type)}</p>
                  <p className="mt-1 font-medium">{match.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  );
}
