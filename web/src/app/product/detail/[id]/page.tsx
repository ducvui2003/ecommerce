import ProductDetail from './ProductDetail';
import productService from '@/service/product.service';

type ProductPage = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductPage) {
  const { id } = await params;
  const product = await productService.getProductById(Number(id));
  return <ProductDetail product={product} />;
}
