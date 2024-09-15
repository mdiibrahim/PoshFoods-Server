// services
import { IProduct } from './product.interface';
import { Product } from './product.model';

const createProductInDB = async (product: IProduct) => {
  if (await Product.isProductExists(product.title)) {
    throw new Error('Product already exists!');
  }
  const createdProduct = await Product.create(product);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { _id, ...result } = createdProduct.toObject();
  return result;
};

const getAllProductsFromDB = async (
  filter: Record<string, any>,
  page: number,
  limit: number,
) => {
  const skip = (page - 1) * limit;
  const products = await Product.find(filter).skip(skip).limit(limit);

  const totalProducts = await Product.countDocuments(filter); // Get the total count for pagination
  return { products, totalProducts };
};

const getSingleProductFromDB = async (id: string) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};

const deleteSingleProductFromDB = async (id: string) => {
  const product = await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};

const updateProductInDB = async (
  id: string,
  productData: Partial<IProduct>,
) => {
  const updatedProduct = await Product.findById(id);
  if (!updatedProduct) {
    throw new Error('Product not found');
  }

  // Merge existing product data with new data
  Object.assign(updatedProduct, productData);

  await updatedProduct.save();

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { _id, ...result } = updatedProduct.toObject();
  return result;
};

export const ProductServices = {
  createProductInDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteSingleProductFromDB,
  updateProductInDB,
};
