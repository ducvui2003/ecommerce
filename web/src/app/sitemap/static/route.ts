// app/sitemap/static/route.ts
import envConfig from '@/config/env.config';
import { NextResponse } from 'next/server';
export const dynamic = 'force-static';

export async function GET() {
  const baseUrl = envConfig.NEXT_PUBLIC_BASE_URL;
  const now = new Date().toISOString();
  const publicXml = ['/', '/home', '/about-us', '/contact-us', '/product']
    .map(
      (path) => `<url>
        <loc>${baseUrl}${path}</loc>
        <lastmod>${now}</lastmod>
    </url>`,
    )
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${publicXml}
  </urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=59',
    },
  });
}
