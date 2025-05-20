import UpdateProductForm from '@/components/product/UpdateProductForm';
import { notFound } from 'next/navigation';

type ProductDetailAdminPageProps = {
  params: Promise<{ id: string }>;
};

const ProductDetailAdminPage = async ({
  params,
}: ProductDetailAdminPageProps) => {
  const { id } = await params;
  if (!id) {
    return notFound();
  }
  return (
    <div>
      <UpdateProductForm id={parseInt(id)} />
    </div>
  );
};

export default ProductDetailAdminPage;
