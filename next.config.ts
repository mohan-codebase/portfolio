import type { NextConfig } from 'next';

const isDevelopment = process.env.NODE_ENV === 'development';
// Static Next.js pages require inline bootstrap scripts. Keep that exception
// explicit; this policy is defense in depth, not a strict nonce-based XSS policy.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ''} https://va.vercel-scripts.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://framerusercontent.com",
  "font-src 'self'",
  `connect-src 'self' https://vitals.vercel-insights.com${isDevelopment ? ' ws://localhost:* ws://127.0.0.1:*' : ''}`,
  "object-src 'none'",
  "base-uri 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  ...(!isDevelopment ? ['upgrade-insecure-requests'] : []),
].join('; ');

const nextConfig: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  // The portfolio is a single page now; keep old section URLs working.
  async redirects() {
    return [
      { source: '/about', destination: '/#about', permanent: false },
      { source: '/services', destination: '/#services', permanent: false },
      { source: '/work', destination: '/#work', permanent: false },
      { source: '/contact', destination: '/#contact', permanent: false },
    ];
  },
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'Content-Security-Policy', value: contentSecurityPolicy },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ],
    }];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
