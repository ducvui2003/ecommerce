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
  // const response = await productService.getAllProducts({
  //   page: 1,
  //   size: 8,
  //   filters: {
  //     categoryId,
  //   },
  // });
  //
  // const data: ProductCardType[] = response.items.map((item) => ({
  //   ...item,
  //   thumbnail: item.media[0],
  // }));

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {/*{data.map((item, index) => (*/}
        {/*  <CarouselItem key={index}>*/}
        {/*    <div className="p-1">*/}
        {/*      <Card>*/}
        {/*        <CardContent className="p-3">*/}
        {/*          <ProductCard {...item} />*/}
        {/*        </CardContent>*/}
        {/*      </Card>*/}
        {/*    </div>*/}
        {/*  </CarouselItem>*/}
        {/*))}*/}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ProductRelation;
