import { z } from 'zod';
import { Types } from 'mongoose';

export const reviewValidationSchema = z.object({
  comment: z.string().min(1, 'Comment is required'),
  product: z.string().refine((value) => Types.ObjectId.isValid(value), {
    message: 'Invalid product id',
  }),
  rating: z
    .number()
    .int()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5'),
});

export const ReviewValidations = {
  reviewValidationSchema,
};
