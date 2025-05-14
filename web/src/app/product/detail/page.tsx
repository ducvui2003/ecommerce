import ProductImages from './ProductImages';
import ProductInfo from './ProductInfo';
import ProductPriceAndReview from './ProductPriceAndReview';
import ProductVolumeSelector from '@/app/product/detail/ProductVolumn';
import ProductComment from '@/app/product/detail/ProductComment';
import AddToCartButton from '@/components/button/AddToCartButton';

export default function ProductDetail() {
  return (
    <div>
      <ProductImages />
      <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
        <ProductInfo />
        <div>
          <ProductPriceAndReview />
          <ProductVolumeSelector />
          <div className={'mt-4 flex w-full items-center justify-between'}>
            <AddToCartButton productId={1}/>
          </div>
        </div>
      </div>
      <div className={"mx-16 px-4 flex justify-start"}>
        <ProductComment/>
      </div>
    </div>
  );
}