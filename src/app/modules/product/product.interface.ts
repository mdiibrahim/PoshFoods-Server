import { Model } from 'mongoose';
export interface IVariant {
  type: string;
  value: string;
}
export interface IInventory {
  quantity: number;
  inStock: boolean;
}
export interface IProduct {
  title: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: IVariant[];
  inventory: IInventory;
  isDeleted?: boolean;
}

export interface IProductModel extends Model<IProduct> {
  // eslint-disable-next-line no-unused-vars
  isProductExists(name: string): Promise<IProduct | null>;
}
