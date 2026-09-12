import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, JetBrains_Mono, Mona_Sans } from 'next/font/google';

import { CommandPalette } from '@/components/navigation/CommandPalette';
import { Header } from '@/components/navigation/Header';
import { Preloader } from '@/components/preloader/Preloader';
import { SmoothScroll } from '@/components/scroll/SmoothScroll';
import { Footer } from '@/components/sections/Footer/Footer';
import { Curtain } from '@/components/transition/Curtain';
import { Cursor } from '@/components/ui/Cursor';
import { GridOverlay } from '@/components/ui/GridOverlay';
import { RevealObserver } from '@/components/ui/RevealObserver';
import { featured } from '@/data/projects';
import { site } from '@/data/site';
import { siteDescription as description } from '@/lib/metadata';

import './globals.css';

const mona = Mona_Sans({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-mona',
  display: 'swap',
});

const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  variable: '--font-instrument',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-jetbrains',
  display: 'swap',
});

const title = `${site.name} — ${site.role}`;

// Each page sets its own canonical URL and social card through `pageMetadata`.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s — ${site.name}` },
  description,
  authors: [{ name: site.name, url: site.url }],
  openGraph: { type: 'website', siteName: site.name, title, description, locale: 'en_US' },
  twitter: { card: 'summary_large_image', title, description },
};

export const viewport: Viewport = {
  themeColor: '#08060b',
  colorScheme: 'dark',
};

/** The name the page curtain shows on its way to each route. */
const routeLabels = Object.fromEntries([
  ...site.pages.map((page) => [page.href, page.label] as const),
  ...featured.map((project) => [`/work/${project.slug}`, project.title] as const),
]);

/**
 * Runs before first paint. Flags that JS is available (reveal states only hide
 * content when it is), and skips the preloader for repeat visits in the same
 * session or when the visitor prefers reduced motion.
 */
const boot = `(function(){var d=document.documentElement;d.classList.add('js');try{if(matchMedia('(prefers-reduced-motion: reduce)').matches||sessionStorage.getItem('intro-seen')){d.setAttribute('data-intro','skip')}else{sessionStorage.setItem('intro-seen','1')}}catch(e){d.setAttribute('data-intro','skip')}})();`;

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${mona.variable} ${instrument.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Preloader />
        <Header />
        {children}
        <Footer />
        <Curtain labels={routeLabels} />
        <Cursor />
        <GridOverlay />
        <CommandPalette />
        <RevealObserver />
        <SmoothScroll />
      </body>
    </html>
  );
}
