import { z } from 'zod';

const CATEGORIES = ['Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Meat'] as const;

export const productValidationSchema = z.object({
  title: z.string().min(1, 'Product title is required.'),
  description: z.string().min(1, 'Product description is required.'),
  price: z.number().min(0, 'Price must be a positive number.'),
  category: z.enum(CATEGORIES, {
    errorMap: () => ({
      message:
        'Invalid category. Must be one of Fruits, Vegetables, Dairy, Bakery, Meat, Seafood, Beverages, Snacks.',
    }),
  }),
  tags: z.array(z.string()).optional(),
  quantity: z.number().min(0, 'Quantity must be a positive number.'),
  inStock: z.boolean().default(true),
  isPopular: z.boolean().optional().default(false),
  isFlashSale: z.boolean().optional().default(false),
  isDeleted: z.boolean().optional().default(false),
  image: z.string().url('Product image must be a valid URL.'),
  additionalImages: z
    .array(z.string().url('Each additional image URL must be valid'))
    .optional(),
  features: z.array(z.string()).optional(),
  longDescription: z.string().optional(),
});

const updateProductValidationSchema = productValidationSchema
  .omit({
    isDeleted: true,
  })
  .partial();

export const ProductValidation = {
  productValidationSchema,
  updateProductValidationSchema,
};
