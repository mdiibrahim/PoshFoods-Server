import { Types } from 'mongoose';

export type IIsOrdered = 'confirmed' | 'pending' | 'cancelled' | 'delivered';

export interface IOrder {
  email: string;
  product: Types.ObjectId;
  price: number;
  quantity: number;
  user: Types.ObjectId;
  transactionId?: string;
  isOrdered?: IIsOrdered;
}
