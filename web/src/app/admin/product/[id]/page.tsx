type ProductDetailAdminPageProps = {
  params: Promise<{ id: string }>;
};

const ProductDetailAdminPage = async ({
  params,
}: ProductDetailAdminPageProps) => {
  const { id } = await params;
  return <div>{id}</div>;
};

export default ProductDetailAdminPage;
