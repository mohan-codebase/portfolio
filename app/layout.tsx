import type { Metadata, Viewport } from 'next';
import { siteUrl, siteTitle, siteDescription, isPreview } from '@/lib/metadata';
import { Archivo, Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import Navbar from '@/components/Navbar';
import SectionAnimations from '@/components/SectionAnimations';
import ContactPopup from '@/components/ContactPopup';
import BackToTop from '@/components/BackToTop';
import ThemeToggle from '@/components/ThemeToggle';
import CustomCursor from '@/components/CustomCursor';
import Footer from '@/components/Footer';
import NoiseOverlay from '@/components/NoiseOverlay';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: '%s — Mohan' },
  description: siteDescription,
  applicationName: 'Mohan Portfolio',
  authors: [{ name: 'Mohan', url: siteUrl }],
  creator: 'Mohan',
  robots: isPreview ? { index: false, follow: false } : { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
};

const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivo.variable} ${inter.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-[#faf7f3] text-[#111111] dark:bg-[#0d0d0e] dark:text-[#f4f4f6] antialiased selection:bg-[#111111] selection:text-[#faf7f3] dark:selection:bg-[#f4f4f6] dark:selection:text-[#0d0d0e] transition-colors duration-300">
        <ThemeProvider>
          <SmoothScrollProvider>
            <NoiseOverlay />
            <SectionAnimations />
            <CustomCursor />
            <Navbar />
            <ContactPopup />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <BackToTop />
            <div className="fixed bottom-[env(safe-area-inset-bottom)] left-[env(safe-area-inset-left)] z-40 mix-blend-difference">
              <ThemeToggle className="h-12 w-12" />
            </div>
          </SmoothScrollProvider>
        </ThemeProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            { '@type': 'Person', '@id': `${siteUrl}/#person`, name: 'Mohan', url: siteUrl, jobTitle: 'UI Designer & Full-Stack Developer', sameAs: ['https://github.com/mohan-codebase'] },
            { '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: siteUrl, name: 'Mohan Portfolio', inLanguage: 'en', publisher: { '@id': `${siteUrl}/#person` } },
          ],
        }).replace(/</g, '\\u003c') }} />
        <Analytics />
      </body>
    </html>
  );
}
