import { model, Schema } from 'mongoose';
import {
  IInventory,
  IProduct,
  IProductModel,
  IVariant,
} from './product.interface';

const variantsSchema = new Schema<IVariant>(
  {
    type: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false },
);

const inventorySchema = new Schema<IInventory>(
  {
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
  { _id: false },
);

const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    variants: {
      type: [variantsSchema],
      required: true,
    },
    inventory: {
      type: inventorySchema,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
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
