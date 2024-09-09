import { NextFunction, Request, RequestHandler, Response } from 'express';

const catchAsync = (f: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(f(req, res, next)).catch((err) => next(err));
  };
};
export default catchAsync;
