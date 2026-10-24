import type { Metadata } from "next";
import { headers } from "next/headers";
import { Manrope, Newsreader, Noto_Sans_Devanagari, Noto_Serif_Devanagari } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const notoSans = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-sans",
});

const notoSerif = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-noto-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "Surubata",
    template: "%s · Surubata",
  },
  applicationName: "Surubata",
  authors: [{ name: "Surubata" }],
  creator: "Surubata",
  formatDetection: { telephone: false, email: false, address: false },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const locale = headerList.get("x-next-intl-locale") === "en" ? "en" : "ne";

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${newsreader.variable} ${manrope.variable} ${notoSans.variable} ${notoSerif.variable} h-full`}
    >
      <body className="min-h-dvh bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem storageKey="surubata-theme" disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
