import { JwtPayload } from 'jsonwebtoken';
import { IReview } from './review.interface';
import { Review } from './review.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { Product } from '../product/product.model';

const createReviewInDB = async (review: IReview, payload: JwtPayload) => {
  const { product } = review;
  const user = await User.isUserExists(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  const productData = await Product.findById(product);
  if (!productData) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  // Create review
  const result = await Review.create({
    ...review,
    user: user._id,
  });
  return result;
};

const getAproductReviewsFromDB = async (product: string) => {
  const result = await Review.find({ product })
    .populate('user')
    .populate('product');
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  return result;
};
const getAllProductsReviewsFromDB = async () => {
  const result = await Review.find({}).populate('user').populate('product');
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  return result;
};
const getAUserReviewsFromDB = async (payload: JwtPayload) => {
  const { _id } = payload;
  const result = await Review.find({ user: _id })
    .populate('product')
    .populate('user');
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  return result;
};
export const ReviewServices = {
  createReviewInDB,
  getAproductReviewsFromDB,
  getAllProductsReviewsFromDB,
  getAUserReviewsFromDB,
};
