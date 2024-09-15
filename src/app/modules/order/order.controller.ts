import { Request, Response } from 'express';
import { OrderServices } from './order.services';

import catchAsync from '../../utilis/catchAsync';
import sendResponse from '../../utilis/sendResponse';
import httpStatus from 'http-status';

//creating order
const createOrder = catchAsync(async (req: Request, res: Response) => {
  const order = req.body;
  const user = req.user;
  const result = await OrderServices.createOrderInDB(order, user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Order created successfully!',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderServices.getAllOrdersFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Orders retrieved successfully',
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
    const { id } = req.params;
    const { status } = req.body;
    const result = await OrderServices.updateOrderStatusToDeliveredToDB(
      id,
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
