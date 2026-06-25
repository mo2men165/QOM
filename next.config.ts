import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  // better-sqlite3 uses native bindings — must not be bundled by webpack
  serverExternalPackages: ['better-sqlite3'],
};

export default nextConfig;
