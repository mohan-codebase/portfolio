import type { Metadata } from 'next';
import { Archivo, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
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

export const metadata: Metadata = {
  title: {
    default: 'Mohan - Web Developer',
    template: '%s - Mohan',
  },
  description:
    'Web developer crafting modern, high-performance web applications and digital experiences.',
  openGraph: {
    title: 'Mohan - Web Developer',
    description:
      'Web developer crafting modern, high-performance web applications and digital experiences.',
    url: 'https://mohan-portfolio.vercel.app',
    siteName: 'Mohan',
    images: [
      {
        url: 'https://framerusercontent.com/images/ue9IClg37SpZ5YcBTAPeavvDUNo.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: 'https://framerusercontent.com/images/ue9IClg37SpZ5YcBTAPeavvDUNo.png',
  },
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
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
