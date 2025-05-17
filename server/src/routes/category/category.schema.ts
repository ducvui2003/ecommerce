import { CategoryModel } from '@shared/models/category.model';
import { z } from 'zod';

const CategoryResSchema = z.array(
  CategoryModel.pick({
    id: true,
    name: true,
  }),
);

type CategoryResType = z.infer<typeof CategoryResSchema>;

export { CategoryResSchema };
export type { CategoryResType };
