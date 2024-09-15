// src/product/product.model.ts
import { model, Schema } from 'mongoose';
import { IProduct, IProductModel } from './product.interface';
const CATEGORIES = ['Fruits', 'Vegetables', 'Dessert', 'Meat'] as const;
const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: [true, 'Product title is required.'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required.'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required.'],
      min: [0, 'Price must be a positive number.'],
    },
    category: {
      type: String,
      enum: {
        values: CATEGORIES,
        message:
          'Category must be one of the following: Fruits, Vegetables, Dairy, Bakery, Meat.',
      },
      required: [true, 'Product category is required.'],
    },
    tags: {
      type: [String],
      default: [],
    },
    quantity: {
      type: Number,
      required: [true, 'Product quantity is required.'],
      min: [0, 'Quantity must be a positive number.'],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    isFlashSale: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false, // This field is now included in the schema
    },
    image: {
      type: String,
      required: [true, 'Product image URL is required.'],
      trim: true,
    },
    additionalImages: {
      type: [String],
      validate: {
        validator: (arr: string[]) =>
          arr.every((url) => /^https?:\/\//.test(url)),
        message: 'Each additional image URL must be valid.',
      },
      required: false,
    },
    features: {
      type: [String],
      default: [],
    },
    longDescription: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Add indexing for search optimization
productSchema.index({
  title: 'text',
  description: 'text',
  category: 'text',
  tags: 'text',
});

// Static method to check if a product already exists
productSchema.pre('find', function () {
  this.where({ isDeleted: false });
});

productSchema.pre('findOne', function () {
  this.where({ isDeleted: false });
});

export const Product = model<IProduct, IProductModel>('Product', productSchema);
