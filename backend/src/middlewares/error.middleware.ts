import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError.js';

const errorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  res.status(500).json({
    status: 'error',
    message: error.message,
  });
};

export default errorMiddleware;
