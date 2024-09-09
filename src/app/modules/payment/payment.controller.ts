/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';

import { PaymentServices } from './payment.services';
import sendResponse from '../../utilis/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utilis/catchAsync';
import config from '../../config';

const initiatePaymentController = catchAsync(
  async (req: Request, res: Response) => {
    const paymentData = req.body;
    const paymentUrl = await PaymentServices.initiatePaymentToDB(paymentData);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Payment initiated successfully',
      data: { payment_url: paymentUrl },
    });
  },
);

const confirmationController = async (req: Request, res: Response) => {
  try {
    const { transactionId } = req.query;

    await PaymentServices.confirmationService(transactionId as string);
    res.redirect(`${config.client_url}/payment/success`);
  } catch (err) {
    res.redirect(`${config.client_url}/payment/success`);
  }
};

const failedController = async (req: Request, res: Response) => {
  const { transactionId } = req.query;

  try {
    await PaymentServices.failedService(transactionId as string);
    res.redirect(`${config.client_url}/payment/fail`);
  } catch (error) {
    res.redirect(`${config.client_url}/payment/fail`);
  }
};
export const PaymentControllers = {
  initiatePaymentController,
  confirmationController,
  failedController,
};
