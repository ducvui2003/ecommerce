import { OrderBy, OrderByType } from '@shared/constants/search.constant';

const SortBy = {
  Id: 'id',
  Price: 'price',
  CreatedAt: 'createdAt',
} as const;

type SortByType = (typeof SortBy)[keyof typeof SortBy];

export type { OrderByType, SortByType };
export { OrderBy, SortBy };
