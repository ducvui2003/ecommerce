import CreateProductForm from '@/components/product/CreateProductForm';
import { ScrollArea } from '@radix-ui/react-scroll-area';

type CreateProductPageProps = {};

const CreateProductPage = ({}: CreateProductPageProps) => {
  return (
    <>
      <h2 className="bg-secondary mb-4 rounded-xl px-4 py-2">Tạo sản phẩm</h2>
      <ScrollArea className="h-[80vh]">
        <CreateProductForm />
      </ScrollArea>
    </>
  );
};

export default CreateProductPage;
