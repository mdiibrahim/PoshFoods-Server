import httpStatus from 'http-status';
import catchAsync from '../../utilis/catchAsync';
import { AuthServices } from './auth.services';
import sendResponse from '../../utilis/sendResponse';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken, user } = result;

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    token: accessToken,
    data: user,
  });
});

export const AuthControllers = {
  loginUser,
};
