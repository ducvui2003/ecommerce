'use client';
import Link from '@/components/Link';
import ListView from '@/components/ListView';
import { Button } from '@/components/ui/button';
import WishlistCard from '@/components/WishlistCard';
import { useFindAllWishlistsQuery } from '@/features/wishlist/wishlist.api';
import { WishlistResType } from '@/types/wishlist.type';

type WishlistPageProps = {};

const WishlistPage = ({}: WishlistPageProps) => {
  const { data = [], isFetching } = useFindAllWishlistsQuery();
  return (
    <ListView<WishlistResType>
      className="px-4 py-2"
      loading={isFetching}
      data={data ?? []}
      emptyComponent={
        <div className="bg-secondary grid h-[300px] place-items-center rounded-md">
          <div className="flex flex-col items-center gap-5">
            <span className="text-accent font-bold">
              Không có sản phẩm nào trong danh sách yêu thích
            </span>
            <Link href={'/product'}>
              <Button>
                <span className="text-sm">Sản phẩm </span>
              </Button>
            </Link>
          </div>
        </div>
      }
      render={(item) => <WishlistCard data={item} />}
    />
  );
};

export default WishlistPage;
