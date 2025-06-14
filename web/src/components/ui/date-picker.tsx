'use client';

import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar, CalendarProps } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { formatDate } from 'date-fns';

type DatePickerWithPresetsProps = {
  date?: Date;
  setDate?: (date: Date | undefined) => void;
  className?: string;
  disabled?: boolean;
} & Pick<CalendarProps, 'onDayBlur'>;

export function DatePickerWithPresets({
  date,
  setDate,
  className,
}: DatePickerWithPresetsProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className={cn('w-48 justify-between font-normal', className)}
          >
            {date ? formatDate(date, 'PPP') : <span>Chọn ngày</span>}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate?.(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
