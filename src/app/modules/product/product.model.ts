import { model, Schema } from 'mongoose';
import { IProduct, IProductModel } from './product.interface';

// Fixed grocery categories
const CATEGORIES = ['Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Meat'] as const;

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
          'Category must be one of the following: Fruits, Vegetables, Dairy, Bakery, Meat, Seafood, Beverages, Snacks.',
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
      default: false,
    },
    image: {
      type: String,
      required: [true, 'Product image URL is required.'],
      trim: true,
    },
    additionalImages: {
      type: [String], // Array of image URLs
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
productSchema.index({
  title: 'text',
  description: 'text',
  category: 'text',
  tags: 'text',
});

// static method for checking duplicate name in the database.
productSchema.statics.isProductExists = async function (title: string) {
  const existingProduct = await this.findOne({ title });
  return existingProduct;
};

export const Product = model<IProduct, IProductModel>('Product', productSchema);
