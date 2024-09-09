/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utilis/catchAsync';

const validateRequest = (zodSchema: any) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await zodSchema.parseAsync(req.body, req.cookies);
    next();
  });
};
export default validateRequest;
