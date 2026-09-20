import type { Metadata } from 'next';
import { Archivo, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NoiseOverlay from '@/components/NoiseOverlay';
import SmoothScroll from '@/components/SmoothScroll';

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
    default: 'Majd',
    template: '%s - Majd',
  },
  description:
    'Software engineer and Framer creator with a strong focus on building modern, scalable, and conversion-driven web experiences.',
  openGraph: {
    title: 'Majd',
    description:
      'Software engineer and Framer creator with a strong focus on building modern, scalable, and conversion-driven web experiences.',
    url: 'https://majd-portfolio.framer.website/',
    siteName: 'Majd',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable}`}>
      <body className="bg-[#faf7f3] text-[#111111] antialiased selection:bg-[#111111] selection:text-[#faf7f3]">
        <SmoothScroll>
          <NoiseOverlay />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
