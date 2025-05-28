export class Order {
  id: string;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  createdAt: Date;

  constructor(
    id: string,
    orderId: number,
    productId: number,
    quantity: number,
    price: number,
    createdAt: Date
  ) {
    this.id = id;
    this.orderId = orderId;
    this.productId = productId;
    this.quantity = quantity;
    this.price = price;
    this.createdAt = createdAt;
  }

}
