const OrderBy = {
  Asc: 'asc',
  Desc: 'desc',
} as const;

const SortBy = {
  Id: 'id',
  Price: 'price',
  CreatedAt: 'createdAt',
} as const;

type OrderByType = (typeof OrderBy)[keyof typeof OrderBy];
type SortByType = (typeof SortBy)[keyof typeof SortBy];

function isOrderBy(value: string): value is OrderByType {
  return Object.values(OrderBy).includes(value as OrderByType);
}

function isSortBy(value: string): value is SortByType {
  return Object.values(SortBy).includes(value as SortByType);
}

export type { OrderByType, SortByType };
export { OrderBy, SortBy, isOrderBy, isSortBy };
