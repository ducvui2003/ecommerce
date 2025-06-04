'use client';

import notFound from '@/app/not-found';
import ProductDescription from '@/app/product/detail/[id]/ProductDescription';
import RatingSummary from '@/app/product/detail/[id]/RatingSummary';
import WishlistButton from '@/components/button/WishlistButton';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAddCartItemMutation } from '@/features/cart/cart.api';
import { cn } from '@/lib/utils';
import { AddCartItemReqType } from '@/types/cart.type';
import { ProductDetailRespType } from '@/types/product.type';
import { AddCartItemSchema } from '@/types/schema/cart.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import React from 'react';
import {
  ControllerRenderProps,
  FieldErrors,
  FieldValues,
  useForm,
} from 'react-hook-form';
import { toast } from 'sonner';
import ProductImages from './ProductImages';
import ProductInfo from './ProductInfo';

type ProductDetailProps = {
  product: ProductDetailRespType;
};

export default function ProductDetail({ product }: ProductDetailProps) {
  if (!product) return notFound();
  const [addCartItem, { isLoading }] = useAddCartItemMutation();

  const productInfoData = {
    name: product.name,
    supplierName: product.supplier.name,
    productType: product.category.name,
    description: product.description,
    basePrice: product.basePrice,
    salePrice: product.salePrice,
  };

  const addCartItemForm = useForm<AddCartItemReqType>({
    resolver: zodResolver(AddCartItemSchema),
    defaultValues: {
      productId: product.id,
      quantity: 1,
      hasOption: product.option.length > 0,
    },
  });

  const handleInputQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<AddCartItemReqType, 'quantity'>,
  ) => {
    const inputQty = e.target.value;
    const numericQty = Number(inputQty);

    if (!isNaN(numericQty) && numericQty > 0) {
      field.onChange(numericQty);
    } else {
      field.onChange('');
      return;
    }
  };

  const handleInputQuantityChangeBlur = (
    field: ControllerRenderProps<AddCartItemReqType, 'quantity'>,
  ) => {
    if (!field.value || Number(field.value) < 1) {
      field.onChange(1);
    }
  };

  const onSummitAddCartItemForm = async (body: AddCartItemReqType) => {
    const { hasOption, ...data } = body;
    try {
      const result = await addCartItem(data);
      if (result.hasOwnProperty('data')) {
        toast.success('Thêm sản phẩm vào giỏ hàng thành công');
      }
    } catch (error) {
      return;
    }
  };

  const onInvalidAddCartItemForm = (
    errors: FieldErrors<AddCartItemReqType>,
  ) => {
    console.log(errors);
    Object.entries(errors).forEach(([_, error]) => {
      if (error?.message) {
        toast.error(error.message);
      }
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div>
          <ProductImages
            images={[
              ...(product.resources ?? []),
              ...(product.thumbnail ? [product.thumbnail] : []),
            ]}
          />
        </div>

        <Form {...addCartItemForm}>
          <form
            className="flex flex-col space-y-6"
            onSubmit={addCartItemForm.handleSubmit(
              onSummitAddCartItemForm,
              onInvalidAddCartItemForm,
            )}
          >
            <ProductInfo product={productInfoData} />
            {product.option.length > 0 && (
              <FormField
                control={addCartItemForm.control}
                name="optionId"
                render={({ field }: { field: FieldValues }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">
                      Dung tích
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => field.onChange(Number(value))}
                        defaultValue={field.value}
                      >
                        <FormItem className="mt-2 flex items-center space-y-0 space-x-3">
                          {product.option.map((option) => {
                            const isSelected =
                              String(option.id) === String(field.value);
                            return (
                              <FormItem
                                key={option.id}
                                className={cn(
                                  'flex h-10 w-16 items-center rounded-md border text-center shadow-xs',
                                  isSelected && 'border-primary border-2',
                                )}
                              >
                                <FormControl>
                                  <RadioGroupItem
                                    value={String(option.id)}
                                    className="sr-only"
                                  />
                                </FormControl>
                                <FormLabel className="size-full cursor-pointer place-content-center font-normal text-black">
                                  {option.name}
                                </FormLabel>
                              </FormItem>
                            );
                          })}
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={addCartItemForm.control}
              name="quantity"
              render={({ field, formState }) => (
                <FormItem className="flex w-fit items-center rounded-lg border p-1">
                  <Button
                    type="button"
                    size="icon"
                    onClick={() => field.onChange(field.value - 1)}
                    className="m-0 text-lg transition-all"
                    disabled={
                      field.value === formState.defaultValues!.quantity ||
                      !field.value
                    }
                  >
                    <Minus className="text-white" />
                  </Button>
                  <FormControl>
                    <Input
                      {...field}
                      className="m-0 size-9 border-0 p-0 text-center text-lg font-medium shadow-none focus-visible:ring-0"
                      onChange={(e) => handleInputQuantityChange(e, field)}
                      onBlur={() => handleInputQuantityChangeBlur(field)}
                      inputMode="numeric"
                    />
                  </FormControl>
                  <Button
                    size="icon"
                    type="button"
                    onClick={() => field.onChange(field.value + 1)}
                    className="m-0 text-lg transition-all"
                  >
                    <Plus className="text-white" />
                  </Button>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-2">
              <Button
                type="submit"
                className="gap-2 px-4 py-2 text-white disabled:opacity-50"
              >
                <ShoppingCart />
                <span>Thêm vào giỏ hàng</span>
              </Button>
              <WishlistButton productId={product.id} />
            </div>
          </form>
        </Form>
      </div>
      <div className="mt-5 lg:mt-10">
        <ProductDescription description={product.description} productId={product.id}/>
      </div>
      <RatingSummary />
    </div>
  );
}
