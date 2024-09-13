import { model, Schema } from 'mongoose';
import { IOrder } from './order.interface';
import { isOrdered } from './order.constant';

export const orderSchema = new Schema<IOrder>(
  {
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        _id: 0,
      },
    ],
    totalPrice: { type: Number, required: true },
    isOrdered: { type: String, enum: isOrdered, default: 'pending' },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Order = model<IOrder>('Order', orderSchema);
