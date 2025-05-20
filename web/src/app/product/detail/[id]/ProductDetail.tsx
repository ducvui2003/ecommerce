import { ProductDetailRespType } from '@/types/product.type';
import ProductImages from './ProductImages';
import ProductInfo from './ProductInfo';
import ProductOption from './ProductOption';
import AddToCartTextButton from '@/components/button/AddToCartTextButton';
import WishlistButton from '@/components/button/WishlistButton';
import QuantitySelector from '@/components/QuantitySelector';
import ProductDescription from '@/app/product/detail/[id]/ProductDescription';
import RatingSummary from '@/app/product/detail/[id]/RatingSummary';
import ProductComment from '@/app/product/detail/[id]/ProductComment';
import ProductRelated from '@/app/product/detail/[id]/ProductRelated';
import ProductRelation from '@/app/product/detail/[id]/ProductRelation';

type ProductDetailProps = {
  product: ProductDetailRespType;
};

export default function ProductDetail({ product }: ProductDetailProps) {
  const productInfoData = {
    name: product.name,
    supplierName: product.supplier.name,
    productType: product.category.name,
    description: product.description,
    basePrice: product.basePrice,
    salePrice: product.salePrice,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div>
          <ProductImages images={product.resource} />
        </div>

        <div className="flex flex-col space-y-6">
          <ProductInfo product={productInfoData} />
          <ProductOption options={product.option} />
          <div className={'mt-2'}>
            <QuantitySelector />
          </div>
          <div className="flex items-center gap-4 pt-4">
            <AddToCartTextButton productId={product.id} />
            <WishlistButton />
          </div>
        </div>
      </div>
      <div className={'mt-5 lg:mt-10'}>
        <ProductDescription description={product.description} />
      </div>
      <RatingSummary />
      <ProductComment />
      <ProductRelation categoryId={product.category.id} />
    </div>
  );
}
