"use client";

import { Check, Link2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, type ReactNode } from "react";

function BrandIcon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden>
      {children}
    </svg>
  );
}

const control =
  "inline-flex h-10 items-center justify-center rounded-full border border-border text-foreground hover:bg-muted";

export function ShareBar({ url, title }: { url: string; title: string }) {
  const t = useTranslations("share");
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(`${title} ${url}`);

  const links: { href: string; label: string; icon: ReactNode }[] = [
    {
      href: `https://wa.me/?text=${encodedText}`,
      label: t("whatsapp"),
      icon: (
        <BrandIcon>
          <path d="M20.52 3.48A11.8 11.8 0 0 0 12.06 0C5.5 0 .16 5.33.16 11.89c0 2.1.55 4.14 1.59 5.95L0 24l6.3-1.65a11.9 11.9 0 0 0 5.7 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.16-3.48-8.42zM12.05 21.8h-.01a9.9 9.9 0 0 1-5.03-1.38l-.36-.21-3.74.98.99-3.65-.23-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.34z" />
        </BrandIcon>
      ),
    },
    {
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodedUrl}`,
      label: t("x"),
      icon: (
        <BrandIcon>
          <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-4.71-6.23-5.4 6.23H2.74l7.73-8.84L2.25 2.25h6.83l4.25 5.62 4.91-5.62zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z" />
        </BrandIcon>
      ),
    },
    {
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      label: t("facebook"),
      icon: (
        <BrandIcon>
          <path d="M24 12.07C24 5.44 18.63 0 12 0S0 5.44 0 12.07c0 5.99 4.39 10.95 10.13 11.85v-8.39H7.08v-3.47h3.05V9.43c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.69.23 2.69.23v2.95h-1.51c-1.49 0-1.96.93-1.96 1.87v2.25h3.33l-.53 3.47h-2.8v8.39C19.61 23.02 24 18.06 24 12.07z" />
        </BrandIcon>
      ),
    },
    {
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      label: t("linkedin"),
      icon: (
        <BrandIcon>
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.23 0z" />
        </BrandIcon>
      ),
    },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="no-print flex flex-wrap items-center gap-2" role="group" aria-label={t("label")}>
      {links.map((link) => (
        <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label} title={link.label} className={`${control} size-10`}>
          {link.icon}
        </a>
      ))}
      <button type="button" onClick={copy} className={`${control} gap-2 px-3 text-sm`}>
        {copied ? <Check className="size-4" aria-hidden /> : <Link2 className="size-4" aria-hidden />}
        {copied ? t("copied") : t("copy")}
      </button>
    </div>
  );
}
