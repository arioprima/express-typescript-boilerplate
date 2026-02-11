import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  // Default values
  let statusCode = 500;
  let message = 'Internal Server Error';
  let stack: string | undefined = undefined;

  if (err instanceof AppError) {
    // Error yang kita throw sendiri (expected)
    statusCode = err.statusCode;
    message = err.message;
  } else {
    // Error tidak terduga (bug)
    console.error('❌ Unexpected Error:', err);
  }

  // Tampilkan stack trace hanya di development
  if (process.env['NODE_ENV'] === 'development') {
    stack = err.stack;
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(stack && { stack }),
  });
}
