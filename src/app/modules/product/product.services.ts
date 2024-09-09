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

const getAllProductsFromDB = async (searchTerm?: string) => {
  const query = searchTerm ? { $text: { $search: searchTerm } } : {};
  if (!query) {
    throw new Error('Product not found');
  }
  return await Product.find(query, { _id: 0 });
};

const getSingleProductFromDB = async (id: string) => {
  const product = await Product.findById(id, { _id: 0 });
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

  // check arrays like 'variants'
  if (productData.variants) {
    updatedProduct.variants = productData.variants;
  }

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
