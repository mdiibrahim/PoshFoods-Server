/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import config from '../../config';

export const initiatePayment = async (paymentData: any) => {
  try {
    const response = await axios.post(config.aamar_pay_url as string, {
      store_id: config.aamar_pay_store_id,
      signature_key: config.aamar_pay_signature_id,
      tran_id: paymentData.transactionId,
      success_url: `${config.server_url}/api/payment/success?transactionId=${paymentData.transactionId}&status=success`,
      fail_url: `${config.server_url}/api/payment/fail?status=failed`,
      cancel_url: config.client_url,
      amount: paymentData.totalPrice,
      currency: 'BDT',
      cus_name: paymentData.customerName,
      cus_email: paymentData.customerEmail,
      cus_add1: paymentData.customerAddress,
      cus_phone: paymentData.customerPhone,
      desc: 'Product Order Payment',
      type: 'json',
    });

    if (response.data.result) {
      return response.data;
    } else {
      throw new AppError(httpStatus.BAD_REQUEST, 'Payment initiation failed');
    }
  } catch (error) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Payment initiation failed. ',
    );
  }
};

export const verifyPayment = async (transactionId: string) => {
  try {
    // Send a request to Aamarpay's payment verification API
    const response = await axios.get(config.aamar_pay_verify_url as string, {
      params: {
        store_id: config.aamar_pay_store_id,
        signature_key: config.aamar_pay_signature_id,
        type: 'json',
        request_id: transactionId,
      },
    });

    return response.data;
  } catch (err) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Payment verification failed!');
  }
};
