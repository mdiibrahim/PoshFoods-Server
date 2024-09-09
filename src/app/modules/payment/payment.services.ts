/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { initiatePayment, verifyPayment } from './payment.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Order } from '../order/order.model';

const initiatePaymentToDB = async (paymentData: any) => {
  try {
    const result = await initiatePayment(paymentData);
    if (result.result) {
      await Order.findByIdAndUpdate(
        paymentData.OrderId,
        {
          transactionId: paymentData.transactionId,
        },
        {
          new: true,
        },
      );
    }
    return result.payment_url;
  } catch (error) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Payment initiation failed.',
    );
  }
};

const confirmationService = async (transactionId: string) => {
  const verifyResponse = await verifyPayment(transactionId);
  let message = '';

  if (verifyResponse.pay_status === 'Successful') {
    await Order.findOneAndUpdate(
      { transactionId },
      {
        paymentStatus: 'paid',
        isBooked: 'confirmed',
      },
    );
    message = 'Successfully Paid!';
  } else {
    message = 'Payment Failed!';
  }

  return message;
};

const failedService = async (transactionId: string) => {
  const updatedOrder = await Order.findOneAndUpdate(
    { transactionId },
    {
      isBooked: 'pending',
    },
    { new: true },
  );

  if (!updatedOrder) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not found');
  }

  return updatedOrder;
};

export const PaymentServices = {
  initiatePaymentToDB,
  confirmationService,
  failedService,
};
