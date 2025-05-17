'use client';

import React, { useState } from 'react';

interface QuantitySelectorProps {
  initialQuantity?: number;
  onChange?: (quantity: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  initialQuantity = 1,
  onChange,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const updateQuantity = (newQty: number) => {
    if (newQty < 1) return;
    setQuantity(newQty);
    onChange?.(newQty);
  };

  const buttonStyle =
    'px-3 py-1 text-white rounded-md font-bold text-lg transition-all';
  const colorStyle = 'bg-[#FFAB66D1] hover:bg-[#FF9C50D1]';

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => updateQuantity(quantity - 1)}
        className={`${buttonStyle} ${colorStyle}`}
      >
        −
      </button>
      <span className="text-lg font-medium w-6 text-center">{quantity}</span>
      <button
        onClick={() => updateQuantity(quantity + 1)}
        className={`${buttonStyle} ${colorStyle}`}
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
