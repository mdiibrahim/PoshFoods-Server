import { Request, Response } from 'express';
import { UserServices } from './user.services';
import sendResponse from '../../utilis/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utilis/catchAsync';

const signUpUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const result = await UserServices.createUserInDB(user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User registered successfully',
    data: result,
  });
});

const getAUserDetails = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAUserDetailsFromDB(req.user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User retrieved successfully',
    data: result,
  });
});
export const UserController = {
  signUpUser,
  getAUserDetails,
};
