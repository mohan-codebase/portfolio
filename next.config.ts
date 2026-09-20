import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
      },
    ],
  },
};

export default nextConfig;
