import { OptionModel } from '@shared/models/option.model';
import { ProductModel } from '@shared/models/product.model';

const CreateProductBodySchema = ProductModel.pick({
  name: true,
  description: true,
  categoryId: true,
}).extend({
  option: OptionModel.pick({}),
});
