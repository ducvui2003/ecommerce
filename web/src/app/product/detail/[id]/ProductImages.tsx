'use client';

import { useState } from "react";

type ProductImagesProps = {
    images: string[];
};

export default function ProductImages({ images }: ProductImagesProps) {
    const [selectedImage, setSelectedImage] = useState(images[0]);

    return (
        <div className="grid grid-cols-5 gap-4">
            <div className="flex flex-col gap-4 col-span-1">
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`sub-image-${index}`}
                        onClick={() => setSelectedImage(img)}
                        className={`w-20 h-20 object-cover cursor-pointer rounded ${
                            selectedImage === img ? 'ring-2 ring-black' : ''
                        }`}
                    />
                ))}
            </div>
            <div className="col-span-4">
                <img
                    src={selectedImage}
                    alt="selected"
                    className="w-full aspect-square object-cover rounded"
                />
            </div>
        </div>
    );
}
