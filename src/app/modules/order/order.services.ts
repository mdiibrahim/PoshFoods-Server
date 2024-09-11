import { JwtPayload } from 'jsonwebtoken';
import { Product } from '../product/product.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createOrderInDB = async (order: IOrder) => {
  const orderedProduct = await Product.findOne(order.product);
  if (!orderedProduct) {
    throw new Error('Product not found');
  }

  if (order.quantity > orderedProduct?.inventory?.quantity) {
    throw new Error('Insufficient quantity available in inventory');
  }

  const newQuantity = orderedProduct.inventory.quantity - order.quantity;
  if (newQuantity === 0) {
    await Product.updateOne(
      { _id: order.product },
      { 'inventory.inStock': false },
    );
  }

  // Add delivery charge
  const deliveryCharge = 60;
  const totalPrice = order.price * order.quantity + deliveryCharge;

  await Product.updateOne(
    { _id: order.product },
    { 'inventory.quantity': newQuantity },
  );

  const createdOrder = await Order.create({
    ...order,
    totalPrice,
  });

  return createdOrder;
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
