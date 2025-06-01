import { z } from 'zod';

const OrderBy = {
  Asc: 'asc',
  Desc: 'desc',
} as const;

const orderBySchema = z.enum([OrderBy.Asc, OrderBy.Desc]);
type OrderByType = (typeof OrderBy)[keyof typeof OrderBy];

function isOrderBy(value: string): value is OrderByType {
  return Object.values(OrderBy).includes(value as OrderByType);
}

export { OrderBy, orderBySchema, isOrderBy };
export type { OrderByType };
