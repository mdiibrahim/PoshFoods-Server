import { Request, Response } from 'express';
import { OrderServices } from './order.services';

import catchAsync from '../../utilis/catchAsync';
import sendResponse from '../../utilis/sendResponse';
import httpStatus from 'http-status';

//creating order
const createOrder = catchAsync(async (req: Request, res: Response) => {
  const order = req.body;

  const result = await OrderServices.createOrderInDB(order);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Order created successfully!',
    data: result,
  });
  res.status(200).json({
    success: true,
    message: 'Order created successfully!',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.query;
  // Retrieve All Orders or Retrieve Orders by User Email
  const filter = email ? (email as string) : undefined;
  const result = await OrderServices.getAllOrdersFromDB(filter);
  const message = email
    ? 'Orders fetched successfully for user email!'
    : 'Orders fetched successfully!';
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message,
    data: result,
  });
});

const getAUserOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderServices.getAUserOrdersFromDB(req.user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Orders retrieved successfully',
    data: result,
  });
});
const getAUserSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrderServices.getAUserSingleOrderFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Order retrieved successfully',
    data: result,
  });
});
const cancelOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrderServices.cancelOrderFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Order cancelled successfully',
    data: result,
  });
});
const updateOrderStatusToDelivered = catchAsync(
  async (req: Request, res: Response) => {
    const { productId } = req.params;
    const { status } = req.body;
    const result = await OrderServices.updateOrderStatusToDeliveredToDB(
      productId,
      status,
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Order delivered successfully',
      data: result,
    });
  },
);
export const OrderController = {
  createOrder,
  getAllOrders,
  getAUserOrders,
  getAUserSingleOrder,
  cancelOrder,
  updateOrderStatusToDelivered,
};
