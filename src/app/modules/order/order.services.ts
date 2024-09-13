import { JwtPayload } from 'jsonwebtoken';
import { Product } from '../product/product.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';

const createOrderInDB = async (orderData: IOrder, payload: JwtPayload) => {
  const { products, totalPrice } = orderData;
  const user = await User.isUserExists(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  // Check if products exist and update inventory
  for (const item of products) {
    const product = await Product.findById(item.productId);
    if (!product) {
      throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
    }

    // Check stock
    if (item.quantity > product.quantity) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Insufficient stock');
    }

    // Update inventory
    const newQuantity = product.quantity - item.quantity;
    product.quantity = newQuantity;
    if (newQuantity === 0) {
      product.inStock = false;
    }
    await product.save();
  }

  // Create the order
  const order = await Order.create({
    products,
    totalPrice,
    user: user._id,
    isOrdered: 'pending',
  });

  return order;
};

const getAllOrdersFromDB = async (email?: string | undefined) => {
  const result = email
    ? await Order.find({ email }, { _id: 0 }) // Retrieve All Orders
    : await Order.find({}, { _id: 0 }); // or Retrieve Orders by User Email
  if (result.length === 0) {
    throw new Error(
      email ? 'Orders not found for the provided email' : 'Orders not found',
    );
  }
  return result;
};

const getAUserOrdersFromDB = async (payload: JwtPayload) => {
  const { _id } = payload;
  const result = await Order.find({ user: _id })
    .populate('product')
    .populate('user');
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  return result;
};
const getAUserSingleOrderFromDB = async (id: string) => {
  const result = await Order.find({ _id: id })
    .populate('product')
    .populate('user');

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  return result;
};
const cancelOrderFromDB = async (id: string) => {
  const result = await Order.findByIdAndUpdate(
    id,
    {
      isOrdered: 'cancelled',
    },
    {
      new: true,
    },
  ).populate('product');
  return result;
};
const updateOrderStatusToDeliveredToDB = async (id: string, status: string) => {
  const result = await Order.findByIdAndUpdate(
    id,
    { isOrdered: status },
    { new: true },
  ).populate('product');
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not found');
  }
  return result;
};

export const OrderServices = {
  createOrderInDB,
  getAllOrdersFromDB,
  getAUserOrdersFromDB,
  getAUserSingleOrderFromDB,
  cancelOrderFromDB,
  updateOrderStatusToDeliveredToDB,
};
