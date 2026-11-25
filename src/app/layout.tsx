import type { Metadata, Viewport } from "next";
import { Inter_Tight } from "next/font/google";

import { Atmosphere } from "@/components/atmosphere";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import { profile } from "@/content/site";

import "./globals.css";

const sans = Inter_Tight({
  variable: "--font-sans-family",
  subsets: ["latin"],
  display: "swap",
});

/** Short browser-tab title for the homepage, in the style of "Apple (India)". */
const tabTitle = `${profile.name} (${profile.location.split(",").at(-1)?.trim()})`;
/** Longer, keyword-rich title used where it is shown in full: link previews and shares. */
const title = `${profile.seoTitle} | ${profile.name}`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.url),
  title: { default: tabTitle, template: `%s | ${profile.name}` },
  description: profile.description,
  applicationName: `${profile.name} — Portfolio`,
  authors: [{ name: profile.name, url: profile.url }],
  creator: profile.name,
  keywords: [
    profile.name,
    "portfolio",
    "full-stack developer",
    "software developer",
    "Next.js",
    "TypeScript",
    profile.location,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: `${profile.name} — Portfolio`,
    title,
    description: profile.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: profile.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0c" },
  ],
  colorScheme: "light dark",
};

/**
 * Runs before first paint: applies the saved or system theme (no flash) and
 * marks that JS is available so scroll-reveal styles can safely hide content.
 */
const themeScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');var dark=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;d.classList.toggle('dark',dark)}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={sans.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="fixed top-3 left-3 z-[60] -translate-y-20 bg-fg px-4 py-3 label text-bg transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Atmosphere />
        <SiteHeader name={profile.name} email={profile.email} />
        {children}
        <SiteFooter />
        <StructuredData />
      </body>
    </html>
  );
}
