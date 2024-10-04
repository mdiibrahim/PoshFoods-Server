import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import catchAsync from '../utilis/catchAsync';
import { User } from '../modules/user/user.model';
import { IRole } from '../modules/user/user.interface';

const auth = (...requiredRoles: IRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Extract the authorization header
    const authHeader = req.headers.authorization;

    // Check if the authorization header exists and is properly formatted
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'No access token provided');
    }

    // Get the token after 'Bearer '
    const token = authHeader.split(' ')[1];

    try {
      // Verify the token
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;

      const { role, email, exp } = decoded;

      // Optionally check if the token has expired
      if (exp && Date.now() >= exp * 1000) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Token has expired');
      }

      // Find the user by their email
      const user = await User.isUserExists(email);
      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
      }

      // Check if the user's role is one of the required roles
      if (requiredRoles.length && !requiredRoles.includes(role)) {
        throw new AppError(
          httpStatus.FORBIDDEN,
          'Insufficient permissions to access this route',
        );
      }

      // Attach user info to the request object
      req.user = decoded as JwtPayload;
      next(); // Call the next middleware
    } catch (error) {
      // If token verification fails, log the error
      console.error('Authentication Error:', error);

      // Return the error to the client
      throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid or expired token');
    }
  });
};

export default auth;
