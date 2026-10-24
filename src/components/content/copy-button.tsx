"use client";

import { Check, Copy, Download } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function CopyButton({
  text,
  label,
  copiedLabel,
  className,
}: {
  text: string;
  label: string;
  copiedLabel: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className={cn(
        "inline-flex h-11 items-center gap-2 rounded-md bg-accent px-4 text-sm font-semibold text-accent-foreground hover:bg-accent/90",
        className,
      )}
    >
      {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
      {copied ? copiedLabel : label}
    </button>
  );
}

export function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print inline-flex h-11 items-center rounded-md border border-border bg-card px-4 text-sm font-semibold hover:bg-muted"
    >
      {label}
    </button>
  );
}

export function DownloadButton({ text, filename, label }: { text: string; filename: string; label: string }) {
  function onClick() {
    const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
    const href = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(href);
  }

  return (
    <button type="button" onClick={onClick} className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-card px-4 text-sm font-semibold hover:bg-muted">
      <Download className="size-4" aria-hidden />
      {label}
    </button>
  );
}
