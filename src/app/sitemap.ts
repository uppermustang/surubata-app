import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { listPublicPaths } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = listPublicPaths();
  const now = new Date();

  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: absoluteUrl(`/${locale}${path}`),
      lastModified: now,
      changeFrequency: path === "" ? "daily" : "weekly",
      priority: path === "" ? 1 : 0.7,
    })),
  );
}
