'use client';
import { ReactNode } from 'react';
import image from 'public/images/banner.png';
import MediaCard from '@/components/media/MediaCard';
import { DndContext } from '@dnd-kit/core';

type SectionMediaProps = {
  children: ReactNode;
};

const ListViewMedia = () => {
  return (
    <DndContext>
      <div className="grid grid-cols-6 gap-2">
        <span className="col-span-2 row-span-2 aspect-square">
          <MediaCard url="/images/banner.png" className="size-full" />
        </span>
        {Array(5)
          .fill(false)
          .map(() => (
            <div className="aspect-square">
              <MediaCard url="/images/banner.png" className="size-full" />
            </div>
          ))}
      </div>
    </DndContext>
  );
};

export default ListViewMedia;
