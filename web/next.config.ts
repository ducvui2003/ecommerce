import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
  output: 'standalone',
};

export default nextConfig;
