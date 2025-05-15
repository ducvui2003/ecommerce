'use client';

type MediaCardProps = {
  url: string;
};

const MediaCard = ({ url }: MediaCardProps) => {
  return (
    <div className="border-accent relative aspect-square rounded-xl border-2 p-1">
      <img src={url} className="size-full rounded-xl bg-white object-center" />
    </div>
  );
};

export default MediaCard;
