import CreateProductForm from '@/components/product/CreateProductForm';
import { ScrollArea } from '@radix-ui/react-scroll-area';

type CreateProductPageProps = {};

const CreateProductPage = ({}: CreateProductPageProps) => {
  return (
    <>
      <h2 className="bg-secondary overflow sticky top-0 z-20 mb-4 rounded-xl px-4 py-2">
        Tạo sản phẩm
      </h2>
      <CreateProductForm />
    </>
  );
};

export default CreateProductPage;
