import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  trailingSlash: false,
  images: {
    domains: ['localhost'],
  },
  // Ensure Prisma files are included in standalone output
  experimental: {
    outputFileTracingIncludes: {
      '/api/**': ['./node_modules/.prisma/**', './node_modules/@prisma/**'],
    },
  },
};

export default nextConfig;
