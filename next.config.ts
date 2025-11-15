import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  trailingSlash: false,
  images: {
    domains: ['localhost'],
  },
};

export default nextConfig;
