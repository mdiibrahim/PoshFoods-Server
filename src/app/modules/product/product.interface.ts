import { Model } from 'mongoose';
const CATEGORIES = ['Fruits', 'Vegetables', 'Dessert', 'Meat'] as const;
export interface IProduct {
  title: string;
  description: string;
  price: number;
  category: typeof CATEGORIES;
  tags: string[];
  quantity: number;
  inStock: boolean;
  isPopular?: boolean;
  isFlashSale?: boolean;
  isDeleted?: boolean;
  image: string;
  additionalImages?: string[];
  features?: string[];
  longDescription?: string;
}

export interface IProductModel extends Model<IProduct> {
  // eslint-disable-next-line no-unused-vars
  isProductExists(title: string): Promise<IProduct | null>;
}
