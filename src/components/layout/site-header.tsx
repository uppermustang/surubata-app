"use client";

import { Menu, Search } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect } from "react";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Container } from "@/components/layout/container";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/podcast", key: "podcast" },
  { href: "/news", key: "news" },
  { href: "/articles", key: "articles" },
  { href: "/resources", key: "resources" },
] as const;

function NavLinks({
  onNavigate,
  className,
  itemClassName,
}: {
  onNavigate?: () => void;
  className?: string;
  itemClassName?: string;
}) {
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <nav aria-label={t("primary")} className={className}>
      {links.map((link) => {
        const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            onClick={onNavigate}
            className={cn(
              "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
              active ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground",
              itemClassName,
            )}
          >
            {t(link.key)}
          </Link>
        );
      })}
    </nav>
  );
}

export function SiteHeader() {
  const t = useTranslations("nav");
  const search = useTranslations("search");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) return;
      const input = document.getElementById("site-search") as HTMLInputElement | null;
      if (input && input.offsetParent !== null) {
        event.preventDefault();
        input.focus();
        return;
      }
      event.preventDefault();
      router.push("/search");
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-xl">
      <div className="h-0.5 bg-accent" aria-hidden />
      <Container className="flex h-20 max-w-7xl items-center gap-3 sm:h-24 sm:gap-8">
        <Logo variant="sans" />
        <NavLinks className="hidden items-center gap-1 lg:flex" />
        <div className="ml-auto flex items-center gap-0.5 sm:gap-2">
          <form action={`/${locale}/search`} role="search" className="relative hidden md:block">
            <label htmlFor="site-search" className="sr-only">
              {search("label")}
            </label>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <input
              id="site-search"
              name="q"
              placeholder={search("short")}
              className="h-11 w-44 rounded-full border border-border bg-muted/70 pr-9 pl-10 text-sm outline-none transition focus:border-foreground/20 focus:bg-card xl:w-60"
            />
            <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 text-[10px] text-muted-foreground lg:inline" aria-hidden>
              /
            </kbd>
          </form>
          <Link href="/search" className="inline-flex size-11 items-center justify-center rounded-md hover:bg-muted md:hidden" aria-label={search("label")}>
            <Search className="size-4" />
          </Link>
          <Link
            href="/request"
            className={cn(
              "hidden h-11 items-center rounded-full border border-border px-4 text-sm font-semibold transition-colors hover:bg-muted xl:inline-flex",
              pathname.startsWith("/request") && "bg-muted",
            )}
          >
            {t("request")}
          </Link>
          <LanguageSwitcher className="rounded-full bg-muted/70 px-1" />
          <ThemeToggle />
          <Sheet>
            <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-md hover:bg-muted lg:hidden" aria-label={t("menu")}>
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent closeLabel={t("close")}>
              <SheetTitle className="pr-10">
                <Logo variant="sans" />
              </SheetTitle>
              <form action={`/${locale}/search`} role="search" className="mt-6">
                <label htmlFor="menu-search" className="sr-only">
                  {search("label")}
                </label>
                <input
                  id="menu-search"
                  name="q"
                  placeholder={search("placeholder")}
                  className="h-11 w-full rounded-md border border-border bg-card px-3 text-base"
                />
              </form>
              <nav aria-label={t("primary")} className="mt-6 flex flex-col gap-1">
                {links.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link href={link.href} className="rounded-md py-2 text-lg font-medium">
                      {t(link.key)}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-6 flex flex-col gap-1 border-t border-border pt-6 text-base">
                {[
                  ["/newsletter", t("newsletter")],
                  ["/request", t("request")],
                  ["/topics", t("topics")],
                  ["/about", t("about")],
                ].map(([href, label]) => (
                  <SheetClose asChild key={href}>
                    <Link href={href} className="rounded-md py-2 font-medium">
                      {label}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
