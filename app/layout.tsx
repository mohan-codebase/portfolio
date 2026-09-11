import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, JetBrains_Mono, Mona_Sans } from 'next/font/google';

import { Header } from '@/components/navigation/Header';
import { Cursor } from '@/components/ui/Cursor';
import { GridOverlay } from '@/components/ui/GridOverlay';
import { Intro } from '@/components/ui/Intro';
import { RevealObserver } from '@/components/ui/RevealObserver';
import { site } from '@/data/site';

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
const description = `${site.name} is a fullstack developer in ${site.location.city} building fast, accessible and carefully detailed websites with React and Next.js.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s — ${site.name}` },
  description,
  authors: [{ name: site.name, url: site.url }],
  alternates: { canonical: '/' },
  openGraph: { type: 'website', url: '/', siteName: site.name, title, description, locale: 'en_US' },
  twitter: { card: 'summary_large_image', title, description },
};

export const viewport: Viewport = {
  themeColor: '#08060b',
  colorScheme: 'dark',
};

/**
 * Runs before first paint. Flags that JS is available (reveal states only hide
 * content when it is), and skips the intro for repeat visits in the same
 * session or when the visitor prefers reduced motion.
 */
const boot = `(function(){var d=document.documentElement;d.classList.add('js');try{if(matchMedia('(prefers-reduced-motion: reduce)').matches||sessionStorage.getItem('intro-seen')){d.setAttribute('data-intro','skip')}else{sessionStorage.setItem('intro-seen','1')}}catch(e){d.setAttribute('data-intro','skip')}})();`;

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${mona.variable} ${instrument.variable} ${jetbrains.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Intro />
        <Header />
        {children}
        <Cursor />
        <GridOverlay />
        <RevealObserver />
      </body>
    </html>
  );
}
