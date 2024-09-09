import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
export interface IJwtPayload {
  email: string;
  role: string;
  _id: Types.ObjectId;
}
export const createToken = (
  jwtPayload: IJwtPayload,
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
