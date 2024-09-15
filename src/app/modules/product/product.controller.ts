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
  const {
    searchTerm,
    category,
    isFlashSale,
    isPopular,
    priceMin,
    priceMax,
    rating,
    page = 1,
    limit = 10,
  } = req.query;

  const message = searchTerm
    ? `Products matching search term '${searchTerm}' fetched successfully!`
    : 'Products fetched successfully!';

  const filter: Record<string, any> = {};

  if (searchTerm) filter.$text = { $search: searchTerm };
  if (category) filter.category = category;
  if (isFlashSale !== undefined) filter.isFlashSale = isFlashSale === 'true';
  if (isPopular !== undefined) filter.isPopular = isPopular === 'true';
  if (priceMin !== undefined) filter.price = { $gte: +priceMin };
  if (priceMax !== undefined)
    filter.price = { ...filter.price, $lte: +priceMax };
  if (rating !== undefined) filter.rating = { $gte: +rating }; // Rating filter

  const { products, totalProducts } =
    await ProductServices.getAllProductsFromDB(filter, +page, +limit);

  res.status(201).json({
    success: true,
    statusCode: httpStatus.OK,
    message,
    data: products,
    totalProducts,
    totalPages: Math.ceil(totalProducts / +limit),
    currentPage: +page,
  });
});

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductServices.getSingleProductFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product retrieved successfully',
    data: result,
  });
});

const deleteSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductServices.deleteSingleProductFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product deleted successfully',
    data: result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const productData = req.body;
  const result = await ProductServices.updateProductInDB(id, productData);
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
