import mongoose from 'mongoose';
import { IErrorSources, IErrorResponse } from './error.interface';

const handleCastError = (err: mongoose.Error.CastError): IErrorResponse => {
  const errorSources: IErrorSources[] = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid ID',
    errorSources,
  };
};

export default handleCastError;
