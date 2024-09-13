import { Request, Response } from 'express';
import { ProductServices } from './product.services';
import catchAsync from '../../utilis/catchAsync';
import sendResponse from '../../utilis/sendResponse';
import httpStatus from 'http-status';

//creating product
const createProduct = catchAsync(async (req: Request, res: Response) => {
  const product = req.body;
  const result = await ProductServices.createProductInDB(product);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product Created successfully',
    data: result,
  });
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const { searchTerm, category, isFlashSale, isPopular } = req.query;

  // Construct the message
  const message = searchTerm
    ? `Products matching search term '${searchTerm}' fetched successfully!`
    : 'Products fetched successfully!';

  // Build the filter object
  const filter: Record<string, any> = {};

  if (searchTerm) {
    filter.$text = { $search: searchTerm };
  }
  if (category) {
    filter.category = category;
  }
  if (isFlashSale !== undefined) {
    filter.isFlashSale = isFlashSale === 'true'; // Convert to boolean
  }
  if (isPopular !== undefined) {
    filter.isPopular = isPopular === 'true'; // Convert to boolean
  }

  // Retrieve products based on the filter
  const result = await ProductServices.getAllProductsFromDB(filter);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message,
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await ProductServices.getSingleProductFromDB(productId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product retrieved successfully',
    data: result,
  });
});

const deleteSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await ProductServices.deleteSingleProductFromDB(productId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product deleted successfully',
    data: result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const productData = req.body;
  const result = await ProductServices.updateProductInDB(
    productId,
    productData,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product updated successfully',
    data: result,
  });
});

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteSingleProduct,
  updateProduct,
};
