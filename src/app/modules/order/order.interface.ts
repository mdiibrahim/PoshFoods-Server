import { Types } from 'mongoose';

export type IIsOrdered = 'confirmed' | 'pending' | 'cancelled' | 'delivered';

export interface IProductOrder {
  productId: Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrder {
  products: IProductOrder[];
  totalPrice: number;
  user: Types.ObjectId;
  isOrdered?: IIsOrdered;
}
