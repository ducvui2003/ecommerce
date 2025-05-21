import type { NextConfig } from 'next';
import bundleAnalyzer from '@next/bundle-analyzer';
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

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);
