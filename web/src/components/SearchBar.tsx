import ClientIcon from '@/components/ClientIcon';
import { cn } from '@/lib/utils';
import React from 'react';

const SearchBar = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cn(
        'shadow-xl flex items-center rounded-3xl px-7  border-[0.5px] border-[#909090] ',
        className,
      )}
    >
      <input
        type="text"
        placeholder="Tìm kiếm"
        className="rounded-none border-none! outline-hidden! flex-1 py-4"
      />
      <ClientIcon icon={'lucide:search'} size={24} />
    </div>
  );
};

export default SearchBar;
