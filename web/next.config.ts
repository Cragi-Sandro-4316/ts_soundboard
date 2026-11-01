import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.1.9'],
  async rewrites() {
    return [
      { source: '/api/:path*',   destination: 'http://localhost:3001/api/:path*' },
      { source: '/sounds/:path*', destination: 'http://localhost:3001/sounds/:path*' },
      { source: '/images/:path*', destination: 'http://localhost:3001/images/:path*' }
    ]
  },
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
