export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
}

export function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${siteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}
