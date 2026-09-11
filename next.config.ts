import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    // One page, mostly first-time visitors: ship the ~13 KB of CSS inside the HTML
    // instead of a render-blocking request.
    inlineCss: true,
  },
};

export default nextConfig;
