import { model, Schema } from 'mongoose';
import { IOrder } from './order.interface';
import { isOrdered } from './order.constant';

export const orderSchema = new Schema<IOrder>(
  {
    email: { type: String, required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    transactionId: {
      type: String,
      required: false,
    },

    isOrdered: {
      type: String,
      enum: isOrdered,
      default: 'pending',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Order = model<IOrder>('Order', orderSchema);
