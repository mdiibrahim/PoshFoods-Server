import { z } from 'zod';
import { Types } from 'mongoose';

const objectIdValidationSchema = z
  .string()
  .refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
  });

const orderValidationSchema = z.object({
  email: z.string().email(),
  productId: objectIdValidationSchema,
  price: z.number().positive(),
  quantity: z.number().int().positive(),
});

export const OrderValidation = {
  orderValidationSchema,
};
