// app/sitemap/static/route.ts
import envConfig from '@/config/env.config';
import productService from '@/service/product.server.service';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function GET() {
  const baseUrl = envConfig.NEXT_PUBLIC_BASE_URL;

  let ids: { id: number; createdAt: Date }[] = [];

  try {
    ids = await productService.getSitemap();
  } catch (error) {
    console.error('❌ Failed to load sitemap product IDs:', error);
    // Optional: return empty sitemap instead of throwing
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
      {
        headers: {
          'Content-Type': 'application/xml',
        },
        status: 200,
      },
    );
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${ids
    .map((item) => {
      return `<url>
        <loc>${baseUrl}/product/detail/${item.id}</loc>
        <lastmod>${new Date(item.createdAt).toISOString()}</lastmod>
      </url>`;
    })
    .join('')}
</urlset>`;
  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=59',
    },
  });
}
