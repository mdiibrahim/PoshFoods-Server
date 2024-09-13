import { z } from 'zod';
import { Types } from 'mongoose';

const objectIdValidationSchema = z
  .string()
  .refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
  });

const orderValidationSchema = z.object({
  products: z.array(
    z.object({
      productId: objectIdValidationSchema,
      quantity: z.number().positive().int(),
      price: z.number().positive(),
    }),
  ),
  totalPrice: z.number().positive(),
});

export const OrderValidation = {
  orderValidationSchema,
};
