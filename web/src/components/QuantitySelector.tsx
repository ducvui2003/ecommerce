'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface QuantitySelectorProps {
  initialQuantity?: number;
  onChange?: (quantity: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  initialQuantity = 1,
  onChange,
}) => {
  const [quantity, setQuantity] = useState<number | ''>(initialQuantity);

  const handleButtonUpdateQuantityClick = (newQty: number) => {
    if (newQty < 1) return;
    setQuantity(newQty);
    onChange?.(newQty);
  };

  const handleInputQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputQty = e.target.value;
    const numericQty = Number(inputQty);

    if (!isNaN(numericQty) && numericQty > 0) {
      setQuantity(numericQty);
      onChange?.(numericQty);
    }else {
      setQuantity('');
      return;
    }
  };

  const handleInputQuantityChangeBlur = () => {
    if (!quantity || Number(quantity) < 1) {
      setQuantity(1);
      onChange?.(1);
    }
  };


  return (
    <div className="flex items-center">
      <Button
        size="icon"
        onClick={() => handleButtonUpdateQuantityClick(Number(quantity) - 1)}
        className='text-lg transition-all'
      >
        <Minus className="text-white"/>
      </Button>
      <Input
        className="size-9 p-0 border-0 shadow-none focus-visible:ring-0 text-center text-lg font-medium"
        value={quantity}
        onChange={handleInputQuantityChange}
        onBlur={handleInputQuantityChangeBlur}
        inputMode='numeric'
      />
      <Button
        size="icon"
        onClick={() => handleButtonUpdateQuantityClick(Number(quantity) + 1)}
        className='text-lg transition-all'
      >
        <Plus className="text-white"/>
      </Button>
    </div>
  );
};

export default QuantitySelector;
