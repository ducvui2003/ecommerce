import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    domains: ['res.cloudinary.com', 'qr.sepay.vn'],
  },
  output: 'standalone',
};

export default nextConfig;
