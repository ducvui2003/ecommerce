import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import ProductCard from '@/components/ProductCard';
import productService from '@/service/product.service';
import { ProductCardType } from '@/types/product.type';

type ProductRelationProps = {
  categoryId: number;
};

const ProductRelation = async ({ categoryId }: ProductRelationProps) => {
  const response = await productService.getAllProducts({
    page: 1,
    size: 8,
    categoryId,
  });
  if (response.items.length == 0) return null;
  return (
    <Carousel>
      <CarouselContent>
        {response.items.map((item, index) => (
          <CarouselItem key={index} className="basis-1/4">
            <ProductCard key={index} {...item} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ProductRelation;
