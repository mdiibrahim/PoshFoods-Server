import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { JwtPayload } from 'jsonwebtoken';

const createUserInDB = async (user: IUser) => {
  const existingUser = await User.isUserExists(user.email);
  if (existingUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User already exists!!!');
  }
  const result = await User.create(user);

  return result;
};

const getAUserDetailsFromDB = async (payload: JwtPayload) => {
  const { _id } = payload;
  const result = await User.findById(_id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  return result;
};

const updateUserProfileInDB = async (
  payload: JwtPayload,
  updateData: Partial<IUser>,
): Promise<IUser | null> => {
  const { _id } = payload;
  const result = await User.findById(_id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No User Found');
  }
  const updatedUser = await User.findByIdAndUpdate(_id, updateData, {
    new: true,
  });

  return updatedUser;
};

export const UserServices = {
  createUserInDB,
  getAUserDetailsFromDB,
  updateUserProfileInDB,
};
