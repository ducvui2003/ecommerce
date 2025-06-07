'use client';
import Image from 'next/image';
import image from '/public/images/brian.jpeg';
import ClientIcon from '@/components/ClientIcon';
import { ReactNode, useRef, useState } from 'react';
import mediaService from '@/service/media.service';
import spinner from 'public/90-ring.svg';
import { cn } from '@/lib/utils';
import userService from '@/service/user.service';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

type AvatarFormProps = {
  avatar?: string;
};

const AvatarForm = ({ avatar }: AvatarFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentAvatar, setCurrentAvatar] = useState<string | StaticImport>(
    avatar ?? image,
  );

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const nameWithoutExtension = file.name.replace(/\.[^/.]+$/, '');
      setIsLoading(true);
      mediaService
        .sign([
          {
            folder: 'user',
            publicId: nameWithoutExtension,
          },
        ])
        .then((response) => {
          return mediaService.uploadFileToCloudinary(file, {
            apiKey: response.apiKey,
            folder: response.properties[0].folder,
            signature: response.properties[0].signature,
            timestamp: response.timestamp,
            publicId: response.properties[0].publicId,
          });
        })
        .then((response) => {
          setCurrentAvatar(response.url);
          userService.updateAvatar(response.url);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className={'group relative block size-[150px]'}>
      <Image
        src={
          'http://res.cloudinary.com/yourstyle/image/upload/v1747746790/ecommerce/user/images.png'
        }
        alt="logo"
        fill
        className="overflow-hidden rounded-full object-center"
      />
      <div
        className={cn(
          'bg-secondary/80 absolute top-0 left-0 z-10 h-full w-full place-items-center rounded-full backdrop-sepia-70',
          isLoading ? 'grid' : 'hidden',
        )}
      >
        <Image src={spinner} width={20} height={20} alt="" />
      </div>
      <div
        className={cn(
          'bg-secondary/80 absolute top-0 left-0 hidden h-full w-full cursor-pointer place-items-center rounded-full backdrop-sepia-70',
          !isLoading && 'group-hover:grid',
        )}
        onClick={handleClick}
      >
        <ClientIcon icon={'bx:camera'} size={40} className="text-accent" />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default AvatarForm;
