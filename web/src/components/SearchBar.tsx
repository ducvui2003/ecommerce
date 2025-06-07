'use client';

import { cn } from '@/lib/utils';
import React, {  useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  Command,
  CommandDialog,
  CommandEmpty, CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import Link from 'next/link';
import { useSearchProductQuery } from '@/features/product/product.api';

const SearchBar =  ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const { data, isLoading } = useSearchProductQuery(inputValue);

  return (
    <div className="w-full">
      <div
        {...props}
        className={cn(
          'flex size-full items-center rounded-full border border-gray-200 bg-muted px-4 py-1 outline outline-transparent transition-all focus-within:border-slate-900 focus-within:bg-transparent',
          className,
        )}
      >
        <Input
          disabled={open}
          type="button"
          value="Tìm kiếm sản phẩm..."
          onClick={() => setOpen(true)}
          className="text-muted-foreground text-left h-fit w-full border-none bg-transparent pr-2 pl-0 shadow-none outline-none focus-visible:ring-0"
        />
        <Search className="text-muted-foreground focus-within:bg-primary focus-within:p-6" />
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Tìm kiếm sản phẩm..."
          value={inputValue}
          onValueChange={(name) => setInputValue(name)}
        />
        <CommandList>
          {!inputValue && <CommandEmpty>Kết quả tìm kiếm của bạn sẽ hiện thị tại đây</CommandEmpty>}
          {(inputValue && isLoading) && <CommandEmpty>Đang tìm kiếm ...</CommandEmpty>}
          {
            (inputValue && !isLoading) &&
            (
              data?.items.length === 0 ?
                <CommandEmpty>Không tìm thấy sản phẩm phù hợp</CommandEmpty> :
                <CommandGroup>
                  {
                    data?.items.map((item) => (
                      <CommandItem
                        key={item.id}
                        asChild
                        value={item.name}
                        className="cursor-pointer data-[selected=true]:bg-transparent data-[selected=true]:hover:bg-primary data-[selected=true]:hover:text-white"
                      >
                        <Link
                          href={`/product/detail/${item.id}`}
                          onClick={() => {
                            setOpen(false)
                            setInputValue('');
                          }}
                        >
                          {item.name}
                        </Link>
                      </CommandItem>
                    ))
                  }
                </CommandGroup>
            )
          }
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default SearchBar;