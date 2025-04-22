'use client';
import { cn, uuid } from '@/lib/utils';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

import React, { ReactNode } from 'react';
type MediaCardProps = {
  children?: ReactNode;
  url: string;
} & React.ComponentProps<'div'>;

const MediaCard = ({ url, className, ...props }: MediaCardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: uuid(),
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        'group outline-accent relative flex items-center rounded-xl outline-2 transition-opacity before:absolute before:inset-0 before:rounded-xl before:bg-black before:opacity-0 hover:cursor-pointer hover:before:opacity-55',
        className,
      )}
      {...props}
    >
      <span className="absolute top-2.5 left-2.5 size-5 rounded-md border-2 bg-white opacity-0 group-hover:opacity-100"></span>
      <img className="w-full" src={url} alt="" />
    </div>
  );
};

export default MediaCard;
