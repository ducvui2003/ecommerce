import { Transform } from 'class-transformer';

export function SplitStringToList(separator = ',') {
  return Transform(({ value }) => {
    if (typeof value !== 'string') return [];
    return value.split(separator).map((item) => item.trim());
  });
}
