import FilterSlice from '@/app/product/filter-slice';
import PaginationProduct from '@/app/product/pagination';
import ListView from '@/components/ListView';
import ProductCard from '@/components/ProductCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import productService from '@/service/product.service';
import { PageReq } from '@/types/api.type';
import { ProductCardType, SearchParams } from '@/types/product.type';

const data: ProductCardType[] = Array(8).fill({
  name: 'The Bloom',
  basePrice: 300000,
  numSell: 100,
  star: 4.9,
  thumbnail: '/images/product.png',
  percentSale: 20,
});

type ProductPageProps = {
  searchParams: PageReq<SearchParams>;
};

const ProductPage = async ({ searchParams }: ProductPageProps) => {
  const searchParamsAsync = await searchParams;
  const query = searchParamsAsync || '';
  const currentPage = Number(searchParamsAsync?.page) || 1;
  const currentSize = Number(searchParamsAsync?.limit) || 5;

  const response = await productService.getAllProducts({
    ...searchParamsAsync,
    page: currentPage,
    limit: currentSize,
  });

  const data: ProductCardType[] = response.items.map((item) => ({
    ...item,
  }));

  const { limit, page, totalItems = 0, totalPages } = response.pagination;

  return (
    <div className="mt-10 flex gap-4">
      <div className="filter-left basis-[300px]">
        <h3 className="bg-primary px-5 py-2.5 text-center text-2xl">
          Lọc sản phẩm
        </h3>
        <FilterSlice />
      </div>
      <div className="flex-1">
        <div className="filter-header my-3 flex items-center justify-between">
          <span className="text-xl font-bold">
            Có {totalItems} sản phẩm hợp
          </span>
          <span>
            <span className="text-xl font-bold">Sắp xếp theo</span>
            <span className="ml-2">Bán chạy</span>
            <span className="ml-2">Giá</span>
          </span>
        </div>
        <ScrollArea className="h-3/4">
          <ListView<ProductCardType>
            display="grid"
            data={data}
            className="product grid-cols-4 gap-5"
            render={(item, index) => <ProductCard key={index} {...item} />}
          />
        </ScrollArea>
        <PaginationProduct currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default ProductPage;
