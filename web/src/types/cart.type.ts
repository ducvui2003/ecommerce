type GetCartResType = {
  id: number,
  userId: number,
  cartItems: {
    id: string,
    quantity: number,
    product: {
      id: number,
      name: string,
      basePrice: number,
      salePrice: number,
    }
  }[],
}

type AddCartItemReqType = {
  productId: number,
  quantity: number,
}