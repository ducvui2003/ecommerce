import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type ListViewProps<T> = {
  data?: T[];
  render: (item: T, index: number) => ReactNode;
  loading?: boolean;
  loadingComponent?: ReactNode;
  orientation?: 'vertical' | 'horizontal';
  display?: 'flex' | 'grid';
} & React.ComponentProps<'div'>;

const ListView = <T,>({
  data,
  render,
  loading,
  loadingComponent,
  orientation,
  className,
  display = 'flex',
}: ListViewProps<T>) => {
  if (loading) {
    return loadingComponent ? (
      loadingComponent
    ) : (
      <Skeleton className="h-[300px] w-full" />
    );
  }
  return (
    <div
      className={cn(
        display,
        orientation && orientation === 'horizontal' ? 'flex' : 'flex-col',
        className,
      )}
    >
      {/*{data && data.map((item, index) => render(item, index))}*/}
      {Array.isArray(data) &&
        data.map((item, index) => render(item, index))}

    </div>
  );
};

export default ListView;
