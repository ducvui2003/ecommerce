'use client';

import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import Link from 'next/link';

const SearchBar = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const [open, setOpen] = useState(false)

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
        <CommandInput placeholder="Tìm kiếm sản phẩm..." />
        <CommandList>
          <CommandEmpty>Không tìm thấy sản phẩm phù hợp!</CommandEmpty>
          <CommandItem asChild className='cursor-pointer data-[selected=true]:bg-transparent data-[selected=true]:hover:bg-primary data-[selected=true]:hover:text-white'>
            <Link href={`/product/detail/`}>Example</Link>
          </CommandItem>
          <CommandItem asChild className='cursor-pointer data-[selected=true]:bg-transparent data-[selected=true]:hover:bg-primary data-[selected=true]:hover:text-white'>
            <Link href={`/product/detail/`}>Example</Link>
          </CommandItem>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default SearchBar;
