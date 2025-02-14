export interface IOrders {
  customerInfo: CustomerInfo;
  _id: string;
  email: string;
  orderInfo: OrderInfo[];
  totalPrice: number;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerInfo {
  name: string;
  number: string;
  city: string;
  clolony: string;
  postOffice: string;
  subDistrict: string;
}

export interface OrderInfo {
  productId: ProductId;
  orderedQuantity: number;
  _id: string;
}

export interface ProductId {
  _id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
}
