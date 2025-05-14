import ProductDetail from './ProductDetail';
import productService from '@/service/product.service';

export default async function ProductPage({
                                            params,
                                          }: {
  params: { id: string };
}) {
  const { id } = params;
  const product = await productService.getProductById(Number(id));

  return <ProductDetail product={product} />;
}
