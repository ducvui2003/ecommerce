import { cache } from 'react';
import ProductDetail from './ProductDetail';
import productService from '@/service/product.service';
import { notFound } from 'next/navigation';

type ProductPage = {
  params: Promise<{ id: string }>;
};

// cache
export const getProduct = cache(async (id: string) => {
  try {
    const res = await productService.getProductById(parseInt(id));
    return res;
  } catch (e) {
    notFound();
  }
});

export async function generateMetadata({ params }: ProductPage) {
  const { id } = await params;
  const product = await getProduct(id);
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPage) {
  const { id } = await params;
  const product = await getProduct(id);
  return <ProductDetail product={product} />;
}
