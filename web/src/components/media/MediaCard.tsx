'use client';

import { cn } from '@/lib/utils';

type MediaCardProps = {
  url: string;
  className?: string;
};

const MediaCard = ({ url, className }: MediaCardProps) => {
  return (
    <div
      className={cn(
        'border-accent relative aspect-square rounded-xl border-2 p-1',
        className,
      )}
    >
      <img src={url} className="size-full rounded-xl bg-white object-center" />
    </div>
  );
};

export default MediaCard;
