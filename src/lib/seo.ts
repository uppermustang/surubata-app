import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { absoluteUrl, siteUrl } from "@/lib/site";

export function pageMetadata({
  title,
  description,
  path,
  locale,
  absolute = false,
  type = "website",
  image,
  imageAlt,
}: {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  absolute?: boolean;
  type?: "website" | "article";
  image?: string;
  imageAlt?: string;
}): Metadata {
  const pathname = path === "" ? "" : path;
  const url = absoluteUrl(`/${locale}${pathname}`);

  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ne: absoluteUrl(`/ne${pathname}`),
        en: absoluteUrl(`/en${pathname}`),
        "x-default": absoluteUrl(`/ne${pathname}`),
      },
      types: {
        "application/rss+xml": absoluteUrl(`/${locale}/feed.xml`),
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Surubata",
      locale: locale === "ne" ? "ne_NP" : "en_US",
      alternateLocale: locale === "ne" ? ["en_US"] : ["ne_NP"],
      type,
      images: image ? [{ url: absoluteUrl(image), alt: imageAlt }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [absoluteUrl(image)] : undefined,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function organizationJsonLd() {
  const url = siteUrl();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Surubata",
        alternateName: "सुरुबाट",
        url,
        logo: `${url}/icon`,
        description:
          "Practical AI and automation for Nepali solopreneurs, small businesses, and creators.",
      },
      {
        "@type": "WebSite",
        name: "Surubata",
        url,
        inLanguage: ["ne", "en"],
        potentialAction: {
          "@type": "SearchAction",
          target: `${url}/ne/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
}
