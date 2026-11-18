import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/data/site";
import { pageSeo } from "@/data/seo";
import { siteUrl } from "@/lib/env/public";
import { organizationJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/ui/json-ld";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import "./globals.css";

/**
 * The marketing site has no per-request data, so the whole app must
 * prerender to static output. This fails dev/build if anything (e.g. a
 * cookies() call) would make a page dynamic (BRD §N performance).
 */
export const ensureStatic = "navigation";

const geistSans = Geist({ subsets: ["latin"], display: "swap", variable: "--font-geist-sans" });
// Mono is decorative (labels): "optional" never swaps after first paint, so it cannot cause layout shift.
const geistMono = Geist_Mono({ subsets: ["latin"], display: "optional", variable: "--font-geist-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Live Online AI Courses`,
    template: `%s | ${site.name}`,
  },
  description: pageSeo.home.description,
  applicationName: site.name,
  category: "education",
  formatDetection: { telephone: false, address: false, email: false },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title: `${site.name} — Live Online AI Courses`,
    description: site.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Live Online AI Courses`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-US" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-control bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
