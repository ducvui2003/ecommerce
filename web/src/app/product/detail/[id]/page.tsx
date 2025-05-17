import ProductDetail from './ProductDetail';
// import productService from '@/service/product.service';

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  // const product = await productService.getProductById(Number(id));
  const product = {
    id: 37,
    name: 'Tinh dầu tràm trà doTERRA',
    description:
      'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet ',
    basePrice: 500000,
    salePrice: 450000,
    category: {
      name: 'Lọ đựng tinh dầu',
    },
    supplier: {
      name: 'doTERRA',
    },
    media: [
      'https://res.cloudinary.com/yourstyle/image/upload/v1/ecommerce/test/kltn_logohbf7jOH7',
      'https://res.cloudinary.com/yourstyle/image/upload/v1/ecommerce/test/3QQD7-6VK',
    ],
    option: [
      {
        id: 5,
        name: '1111',
        price: 11110,
        media:
          'https://res.cloudinary.com/yourstyle/image/upload/v1/ecommerce/test/kltn_logohbf7jOH7',
      },
    ],
  };
  return <ProductDetail product={product} />;
}
