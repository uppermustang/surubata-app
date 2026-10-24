"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function ReadingProgress() {
  const t = useTranslations("articles");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const article = document.getElementById("article-body");
    if (!article) return;

    function onScroll() {
      if (!article) return;
      const start = article.offsetTop;
      const height = article.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(window.scrollY - start, 0), Math.max(height, 1));
      setProgress(height > 0 ? scrolled / height : 0);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent"
      role="progressbar"
      aria-label={t("progress")}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
    >
      <div className="h-full bg-accent" style={{ width: `${progress * 100}%` }} />
    </div>
  );
}
